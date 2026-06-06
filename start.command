#!/bin/zsh
cd "$(dirname "$0")"
BRICKPULSE_PORT="${BRICKPULSE_PORT:-4177}" python3 server.py
