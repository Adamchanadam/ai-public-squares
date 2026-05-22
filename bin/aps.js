#!/usr/bin/env node
/**
 * APS — AI Public Squares
 * Bootstrap CLI for setting up cross-machine AI agent collaboration.
 *
 * Status: placeholder release 0.1.0 (Phase X-2 build in progress).
 * Real `init` orchestration: detect Claude Code → install skill → greet.
 *
 * Roadmap: dev/qc/2026-05-22-zero-knowledge-funnel-audit.md in repo.
 */

const subcommand = process.argv[2];

if (!subcommand || subcommand === '--help' || subcommand === '-h') {
  console.log(`
APS — AI Public Squares
Two-machine AI agent collaboration via a shared Google Drive folder.

Usage:
  npx @adamchanadam/aps init     Set up APS in current workspace
  npx @adamchanadam/aps --help   Show this help

Status: placeholder release 0.1.0. Full \`init\` orchestration coming.
Repo: https://github.com/Adamchanadam/ai-public-squares
`);
  process.exit(0);
}

if (subcommand === 'init') {
  console.log(`
APS init — coming soon (placeholder release 0.1.0).

The full \`init\` command will:
  1. Detect your Claude Code installation.
  2. Install the APS skill into .claude/skills/aps/.
  3. Greet you with a setup conversation (Cantonese or English).
  4. Walk you through your shared Drive folder, project name,
     and partner-machine onboarding starter pack.

For now, see the manual setup walkthrough at:
  https://github.com/Adamchanadam/ai-public-squares/blob/main/docs/guides/aps-onboarding-walkthrough.html

Build status + roadmap:
  https://github.com/Adamchanadam/ai-public-squares/blob/main/dev/qc/2026-05-22-zero-knowledge-funnel-audit.md
`);
  process.exit(0);
}

console.error(`Unknown subcommand: ${subcommand}`);
console.error('Try: npx @adamchanadam/aps --help');
process.exit(1);
