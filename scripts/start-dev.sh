#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

require_command() {
  local cmd="$1"
  if ! command -v "$cmd" >/dev/null 2>&1; then
    echo "Missing required command: $cmd"
    exit 1
  fi
}

require_command npm

if command -v python >/dev/null 2>&1; then
  PYTHON_CMD="python"
elif command -v python3 >/dev/null 2>&1; then
  PYTHON_CMD="python3"
else
  echo "Missing required command: python or python3"
  exit 1
fi

cleanup() {
  echo ""
  echo "Stopping Orion services..."
  kill "${PIDS[@]}" >/dev/null 2>&1 || true
}

PIDS=()
trap cleanup EXIT INT TERM

echo "Starting mock-system-api on :3001"
(cd "$ROOT_DIR/mock-system-api" && npm start) &
PIDS+=($!)

echo "Starting orion-api on :8000"
(cd "$ROOT_DIR/orion-api" && "$PYTHON_CMD" manage.py runserver) &
PIDS+=($!)

echo "Starting orion-web on :4200"
(cd "$ROOT_DIR/orion-web" && npm run start) &
PIDS+=($!)

echo "Orion services started. Press Ctrl+C to stop all services."

wait -n "${PIDS[@]}"
