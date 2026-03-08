#!/bin/bash
set -euo pipefail

# Only run in remote (web) sessions
if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

PROJECT_DIR="${CLAUDE_PROJECT_DIR:-$(cd "$(dirname "$0")/../.." && pwd)}"
cd "$PROJECT_DIR"

# Install Bun if not available
if ! command -v bun &>/dev/null; then
  echo "Installing Bun..."
  curl -fsSL https://bun.sh/install | bash
  export BUN_INSTALL="$HOME/.bun"
  export PATH="$BUN_INSTALL/bin:$PATH"

  # Persist for the session
  if [ -n "${CLAUDE_ENV_FILE:-}" ]; then
    echo "export BUN_INSTALL=\"$HOME/.bun\"" >> "$CLAUDE_ENV_FILE"
    echo "export PATH=\"$BUN_INSTALL/bin:\$PATH\"" >> "$CLAUDE_ENV_FILE"
  fi
fi

# Install project dependencies (idempotent)
if [ -f "package.json" ]; then
  echo "Installing dependencies with Bun..."
  bun install
fi
