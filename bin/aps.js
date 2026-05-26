#!/usr/bin/env node
/**
 * APS — AI Public Squares
 * Bootstrap CLI for setting up cross-machine AI agent collaboration.
 *
 * Status: bridge-pack fixture provision available;
 * full `init` orchestration (Phase X-2) still in progress.
 *
 * Roadmap: dev/qc/2026-05-22-zero-knowledge-funnel-audit.md in repo.
 */

const path = require('path');
const fs = require('fs');

const subcommand = process.argv[2];

if (!subcommand || subcommand === '--help' || subcommand === '-h') {
  console.log(`
APS — AI Public Squares
Two-machine AI agent collaboration via a shared Google Drive folder.

Usage:
  npx aps init                    Set up APS in current workspace (placeholder)
  npx aps bridge-pack             Print Bridge Pack fixture (User A default)
  npx aps bridge-pack --role B    Print Bridge Pack fixture for User B role
  npx aps --help                  Show this help

bridge-pack writes fixture content to stdout — redirect to your workspace's
Bridge Pack location, e.g.:
  npx aps bridge-pack > dev/rules/aps-bridge.md

Local source test:
  node bin/aps.js bridge-pack > dev/rules/aps-bridge.md

Status: bridge-pack is available. Full \`init\` orchestration is still coming.
Repo: https://github.com/Adamchanadam/ai-public-squares
`);
  process.exit(0);
}

if (subcommand === 'init') {
  console.log(`
APS init — coming soon (full orchestration in Phase X-2).

The full \`init\` command will:
  1. Detect your Claude Code installation.
  2. Install the APS skill into .claude/skills/aps/.
  3. Greet you with a setup conversation (Cantonese or English).
  4. Walk you through your shared Drive folder, project name,
     and partner-machine onboarding starter pack.

For now:
  - Install the package with \`npm install --save-dev @adamchanadam/aps\`.
  - Use \`npx aps bridge-pack\` to get the Bridge Pack fixture.
  - Maintainers can also run \`node bin/aps.js bridge-pack\` inside this repo.
  - See the manual setup walkthrough at:
    https://github.com/Adamchanadam/ai-public-squares/blob/main/docs/guides/aps-onboarding-walkthrough.html

Build status + roadmap:
  https://github.com/Adamchanadam/ai-public-squares/blob/main/dev/qc/2026-05-22-zero-knowledge-funnel-audit.md
`);
  process.exit(0);
}

if (subcommand === 'bridge-pack') {
  const roleFlag = process.argv.indexOf('--role');
  const roleArg = (roleFlag >= 0 && process.argv[roleFlag + 1])
    ? process.argv[roleFlag + 1].toUpperCase()
    : 'A';
  if (roleArg !== 'A' && roleArg !== 'B') {
    console.error(`Invalid --role value: must be 'A' or 'B' (got '${process.argv[roleFlag + 1]}').`);
    process.exit(1);
  }
  const fixtureDir = roleArg === 'B' ? 'demo-agent-b' : 'demo-agent-a';
  const fixturePath = path.join(__dirname, '..', 'examples', fixtureDir, 'dev', 'rules', 'aps-bridge.md');
  try {
    process.stdout.write(fs.readFileSync(fixturePath, 'utf8'));
    process.exit(0);
  } catch (err) {
    console.error(`Failed to read Bridge Pack fixture at ${fixturePath}: ${err.message}`);
    process.exit(1);
  }
}

console.error(`Unknown subcommand: ${subcommand}`);
console.error('Try: npx aps --help');
process.exit(1);
