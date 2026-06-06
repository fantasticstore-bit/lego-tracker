#!/usr/bin/env python3
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlparse
import base64
import hashlib
import hmac
import json
import os
import random
import secrets
import time
import urllib.error
import urllib.parse
import urllib.request

SECRET_PATH = Path(".brickpulse.local.json")
USERS_PATH = Path(".brickpulse.users.json")


def read_json_file(path, fallback):
    try:
        return json.loads(path.read_text())
    except Exception:
        return fallback


def write_json_file(path, payload):
    path.write_text(json.dumps(payload, ensure_ascii=False, indent=2))
    try:
        path.chmod(0o600)
    except Exception:
        pass


def read_config():
    return read_json_file(SECRET_PATH, {})


def read_saved_key():
    return read_config().get("rebrickable_api_key", "").strip()


def read_bricklink_config():
    config = read_config()
    return {
        "consumer_key": config.get("bricklink_consumer_key", "").strip(),
        "consumer_secret": config.get("bricklink_consumer_secret", "").strip(),
        "token": config.get("bricklink_token", "").strip(),
        "token_secret": config.get("bricklink_token_secret", "").strip(),
    }


def read_users_db():
    data = read_json_file(USERS_PATH, {"users": {}, "sessions": {}})
    data.setdefault("users", {})
    data.setdefault("sessions", {})
    return data


def write_users_db(data):
    write_json_file(USERS_PATH, data)


def normalize_email(email):
    return email.strip().lower()


def hash_password(password, salt=None):
    salt = salt or secrets.token_hex(16)
    digest = hashlib.pbkdf2_hmac("sha256", password.encode("utf-8"), salt.encode("utf-8"), 220000)
    return salt, digest.hex()


def verify_password(password, salt, expected_hash):
    _, candidate = hash_password(password, salt)
    return hmac.compare_digest(candidate, expected_hash)


class BrickPulseHandler(SimpleHTTPRequestHandler):
    def log_message(self, format, *args):
        safe_args = tuple("[hidden]" if "key" in str(arg).lower() else arg for arg in args)
        super().log_message(format, *safe_args)

    def do_GET(self):
        parsed = urlparse(self.path)

        if parsed.path.startswith("/api/rebrickable/"):
            endpoint = parsed.path.removeprefix("/api/rebrickable/")
            self.proxy_rebrickable(endpoint, parsed.query)
            return

        if parsed.path == "/api/bricklink/price":
            self.proxy_bricklink_price(parsed.query)
            return

        if parsed.path == "/api/config":
            bricklink = read_bricklink_config()
            self.send_json(
                {
                    "hasRebrickableKey": bool(read_saved_key()),
                    "hasBrickLinkKey": all(bricklink.values()),
                },
                200,
            )
            return

        if parsed.path == "/api/auth/me":
            user_email = self.get_session_user()
            if not user_email:
                self.send_json({"authenticated": False}, 200)
                return
            self.send_json({"authenticated": True, "email": user_email}, 200)
            return

        if parsed.path == "/api/user/state":
            user_email = self.get_session_user()
            if not user_email:
                self.send_json({"detail": "Not authenticated"}, 401)
                return
            users_db = read_users_db()
            state = users_db["users"].get(user_email, {}).get("state", {})
            self.send_json(state, 200)
            return

        super().do_GET()

    def do_POST(self):
        parsed = urlparse(self.path)

        if parsed.path in {"/api/auth/signup", "/api/auth/login"}:
            self.handle_auth(parsed.path.endswith("signup"))
            return

        if parsed.path == "/api/auth/logout":
            self.handle_logout()
            return

        if parsed.path == "/api/user/state":
            self.handle_save_user_state()
            return

        self.send_json({"detail": "Endpoint not allowed"}, 404)

    def read_json_body(self):
        length = int(self.headers.get("Content-Length", "0") or "0")
        if length <= 0:
            return {}
        try:
            return json.loads(self.rfile.read(length).decode("utf-8"))
        except Exception:
            return {}

    def get_cookie_value(self, name):
        cookies = self.headers.get("Cookie", "")
        for part in cookies.split(";"):
            if "=" not in part:
                continue
            key, value = part.strip().split("=", 1)
            if key == name:
                return value
        return ""

    def get_session_user(self):
        token = self.get_cookie_value("brickpulse_session")
        if not token:
            return ""
        users_db = read_users_db()
        session = users_db.get("sessions", {}).get(token)
        if not session:
            return ""
        if session.get("expires", 0) < time.time():
            users_db["sessions"].pop(token, None)
            write_users_db(users_db)
            return ""
        return session.get("email", "")

    def handle_auth(self, is_signup):
        body = self.read_json_body()
        email = normalize_email(body.get("email", ""))
        password = body.get("password", "")

        if not email or "@" not in email or len(password) < 6:
            self.send_json({"detail": "Email o password non valide"}, 400)
            return

        users_db = read_users_db()
        user = users_db["users"].get(email)

        if is_signup:
            if user:
                self.send_json({"detail": "Account già esistente. Usa Accedi."}, 409)
                return
            salt, password_hash = hash_password(password)
            user = {
                "email": email,
                "salt": salt,
                "password_hash": password_hash,
                "created_at": int(time.time()),
                "state": {"portfolio": [], "watchlist": []},
            }
            users_db["users"][email] = user
        elif not user or not verify_password(password, user.get("salt", ""), user.get("password_hash", "")):
            self.send_json({"detail": "Email o password errate"}, 401)
            return

        token = secrets.token_urlsafe(32)
        users_db["sessions"][token] = {"email": email, "expires": time.time() + 60 * 60 * 24 * 30}
        write_users_db(users_db)

        self.send_json({"email": email, "state": user.get("state", {})}, 200, cookie=f"brickpulse_session={token}; HttpOnly; SameSite=Lax; Path=/; Max-Age=2592000")

    def handle_logout(self):
        token = self.get_cookie_value("brickpulse_session")
        users_db = read_users_db()
        if token:
            users_db["sessions"].pop(token, None)
            write_users_db(users_db)
        self.send_json({"ok": True}, 200, cookie="brickpulse_session=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0")

    def handle_save_user_state(self):
        user_email = self.get_session_user()
        if not user_email:
            self.send_json({"detail": "Not authenticated"}, 401)
            return

        body = self.read_json_body()
        state = {
            "portfolio": body.get("portfolio") if isinstance(body.get("portfolio"), list) else [],
            "watchlist": body.get("watchlist") if isinstance(body.get("watchlist"), list) else [],
            "updated_at": int(time.time()),
        }
        users_db = read_users_db()
        if user_email not in users_db["users"]:
            self.send_json({"detail": "User not found"}, 404)
            return
        users_db["users"][user_email]["state"] = state
        write_users_db(users_db)
        self.send_json({"ok": True}, 200)

    def proxy_rebrickable(self, endpoint, query):
        allowed = {"sets", "themes"}

        if endpoint not in allowed:
            self.send_json({"detail": "Endpoint not allowed"}, 404)
            return

        api_key = self.headers.get("X-Rebrickable-Key", "").strip() or read_saved_key()

        if not api_key:
            self.send_json({"detail": "Missing API key"}, 401)
            return

        url = f"https://rebrickable.com/api/v3/lego/{endpoint}/?{query}"
        request = urllib.request.Request(url, headers={"Authorization": f"key {api_key}"})

        try:
            with urllib.request.urlopen(request, timeout=30) as response:
                payload = response.read()
                status = response.status
        except urllib.error.HTTPError as error:
            payload = error.read() or json.dumps({"detail": str(error)}).encode("utf-8")
            status = error.code
        except Exception as error:
            self.send_json({"detail": str(error)}, 502)
            return

        self.send_response(status)
        self.send_header("Content-Type", "application/json")
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(payload)

    def proxy_bricklink_price(self, query):
        config = read_bricklink_config()

        if not all(config.values()):
            self.send_json({"detail": "Missing BrickLink credentials"}, 401)
            return

        params = dict(urllib.parse.parse_qsl(query, keep_blank_values=False))
        set_num = params.get("set_num", "").strip()

        if not set_num:
            self.send_json({"detail": "Missing set_num"}, 400)
            return

        safe_params = {
            "guide_type": params.get("guide_type", "sold"),
            "new_or_used": params.get("new_or_used", "N"),
        }

        if params.get("country_code"):
            safe_params["country_code"] = params["country_code"]

        path = f"/api/store/v1/items/SET/{urllib.parse.quote(set_num)}/price"
        url = f"https://api.bricklink.com{path}?{urllib.parse.urlencode(safe_params)}"
        request = urllib.request.Request(url, headers={"Authorization": self.bricklink_auth_header("GET", url, config)})

        try:
            with urllib.request.urlopen(request, timeout=30) as response:
                payload = response.read()
                status = response.status
        except urllib.error.HTTPError as error:
            payload = error.read() or json.dumps({"detail": str(error)}).encode("utf-8")
            status = error.code
        except Exception as error:
            self.send_json({"detail": str(error)}, 502)
            return

        self.send_response(status)
        self.send_header("Content-Type", "application/json")
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(payload)

    def bricklink_auth_header(self, method, url, config):
        oauth_params = {
            "oauth_consumer_key": config["consumer_key"],
            "oauth_token": config["token"],
            "oauth_nonce": hashlib.sha1(f"{time.time()}{random.random()}".encode("utf-8")).hexdigest(),
            "oauth_timestamp": str(int(time.time())),
            "oauth_signature_method": "HMAC-SHA1",
            "oauth_version": "1.0",
        }
        parsed = urllib.parse.urlparse(url)
        query_params = dict(urllib.parse.parse_qsl(parsed.query, keep_blank_values=True))
        signature_params = {**query_params, **oauth_params}
        encoded_params = urllib.parse.urlencode(sorted(signature_params.items()), quote_via=urllib.parse.quote)
        base_url = f"{parsed.scheme}://{parsed.netloc}{parsed.path}"
        base_string = "&".join(
            urllib.parse.quote(part, safe="")
            for part in [method.upper(), base_url, encoded_params]
        )
        signing_key = "&".join(
            urllib.parse.quote(part, safe="")
            for part in [config["consumer_secret"], config["token_secret"]]
        )
        signature = base64.b64encode(hmac.new(signing_key.encode("utf-8"), base_string.encode("utf-8"), hashlib.sha1).digest()).decode("utf-8")
        oauth_params["oauth_signature"] = signature
        header_params = ", ".join(
            f'{key}="{urllib.parse.quote(value, safe="")}"'
            for key, value in sorted(oauth_params.items())
        )
        return f"OAuth {header_params}"

    def send_json(self, payload, status, cookie=None):
        body = json.dumps(payload).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json")
        self.send_header("Cache-Control", "no-store")
        self.send_header("Content-Length", str(len(body)))
        if cookie:
            self.send_header("Set-Cookie", cookie)
        self.end_headers()
        self.wfile.write(body)


def main():
    port = int(os.environ.get("BRICKPULSE_PORT", "4177"))
    server = ThreadingHTTPServer(("127.0.0.1", port), BrickPulseHandler)
    print(f"BrickPulse disponibile su http://localhost:{port}")
    server.serve_forever()


if __name__ == "__main__":
    main()
