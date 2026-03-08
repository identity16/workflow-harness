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

# Pre-install MCP server packages from .mcp.json
# This ensures MCP servers can start immediately when Claude Code activates them.
if [ -f ".mcp.json" ] && command -v node &>/dev/null; then
  echo "Pre-installing MCP server packages..."
  node -e "
    const cfg = JSON.parse(require('fs').readFileSync('.mcp.json', 'utf8'));
    const servers = cfg.mcpServers || {};
    for (const [name, server] of Object.entries(servers)) {
      if (server.command === 'npx') {
        const args = server.args || [];
        // Find the package name: skip flags like '-y', '--yes'
        const pkg = args.find(a => !a.startsWith('-'));
        if (pkg) console.log(pkg);
      }
    }
  " | while read -r pkg; do
    echo "  Installing MCP package: $pkg"
    npm install -g "$pkg" 2>/dev/null || npx -y "$pkg" --help >/dev/null 2>&1 || true
  done
fi
