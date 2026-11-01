#!/usr/bin/env bash
# EVERNE WOMAN — local owner-only Safari review, not a production deployment.
# Run: bash scripts/review-safari-mac.sh
# npm ci downloads normal development dependencies; the resulting preview itself
# uses local assets and does not connect to Shopify, suppliers or payment services.
set -euo pipefail

fail() {
  printf 'ERROR: %s\n' "$*" >&2
  exit 1
}

if [[ "$(uname -s)" != "Darwin" ]]; then
  fail "This convenience launcher is for macOS Safari only. CI runs npm run build:offline separately."
fi

script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
project_root="$(cd "$script_dir/.." && pwd)"
cd "$project_root"

[[ -f package.json && -f package-lock.json && -f SAFARI-ACCEPTANCE.md ]] ||
  fail "Run this launcher from an intact EVERNE source download."

command -v node >/dev/null 2>&1 || fail "Node.js 22 or newer must be installed."
command -v npm >/dev/null 2>&1 || fail "npm is required."
command -v zip >/dev/null 2>&1 || fail "macOS zip is required."
command -v unzip >/dev/null 2>&1 || fail "macOS unzip is required."
command -v shasum >/dev/null 2>&1 || fail "macOS shasum is required."
command -v open >/dev/null 2>&1 || fail "The macOS open command is required."

node_major="$(node -p "Number(process.versions.node.split('.')[0])")"
if [[ ! "$node_major" =~ ^[0-9]+$ ]] || (( node_major < 22 )); then
  fail "Node.js 22 or newer is required for the Vite build. Installed: $(node --version)"
fi

printf '\nEVERNE WOMAN — local, private Safari review\n'
printf 'Source directory: %s\n' "$project_root"
printf 'Node: %s\n' "$(node --version)"
printf 'No Shopify, supplier, payment, deployment or paid-app actions will be triggered.\n'
printf 'npm will only install the locked development dependencies and run build checks.\n\n'

# Use the exact checked-in dependency lock instead of floating npm versions.
npm ci --no-audit --no-fund
npm run build:offline

archive="$project_root/offline-review/everne-woman-safari-preview.zip"
index="$project_root/offline-review/everne-woman-safari-preview/index.html"
[[ -s "$archive" && -s "$index" ]] ||
  fail "Validated offline Safari files were not generated."

printf '\nValidated ZIP SHA-256:\n'
shasum -a 256 "$archive"
printf '\nOpening private Safari preview (file://).\n'
if ! open -a Safari "$index"; then
  printf 'Safari did not open automatically. Open this file manually:\n%s\n' "$index"
fi
printf '\nReal Safari checks are NOT automatically passed.\n'
printf 'Complete the 20-case SAFARI-ACCEPTANCE.md checklist with actual device results.\n'
printf 'For iPhone review, follow the trusted-private-Wi-Fi instructions in that document.\n'
printf 'Do not share, publish, deploy or enable checkout for this preview.\n'
