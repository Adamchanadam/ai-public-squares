# Project Index

Purpose: give a stateless AI a compact map of the project before it reads or edits files.

## Stack

| Field | Value | Last verified |
|---|---|---|
| Agent Handoff Kit template version | 0.1.7 | 2026-05-21 |
| Runtime | Node.js ≥18 (for `bin/aps.js` placeholder CLI); static HTML for user-facing docs under `docs/` | 2026-05-22 |
| Framework | None — no build step; HTML hand-maintained; CLI is plain Node | 2026-05-22 |
| Package manager | npm (placeholder package `@adamchanadam/aps` 0.1.0; not yet published) | 2026-05-22 |
| Test command | `node bin/aps.js --help && node bin/aps.js init` smoke test; `agent-handoff-kit doctor` for governance; manual HTML link audit | 2026-05-22 |
| Build command | None — no build step | 2026-05-22 |
| Deploy command | `npm publish` (deferred until Phase X-2 真 `init` orchestration 落地);GitHub push via `git push origin main` (auto-auth via Windows Credential Manager) | 2026-05-22 |

## Directory Map

| Path | Role | Read when |
|---|---|---|
| `AGENTS.md` | primary Agent Handoff Kit entry and startup contract (kit-managed core v0.1.7) | session startup |
| `CLAUDE.md` | Claude Code bridge to the same startup path | Claude Code startup |
| `GEMINI.md` | Gemini CLI bridge to the same startup path | Gemini CLI startup |
| `START_NEXT_SESSION_PROMPT.txt` | convenience copy of next-session opening message (regenerated from `dev/SESSION_HANDOFF.md` per AGENTS.md §4 step 10) | session startup, when user pastes the opening block |
| `dev/` | governance state (handoff, log, index, sync registry) | session startup / closeout |
| `dev/rules/` | rule packs loaded per task signal from `dev/RULE_PACKS.md` | per task, per pack-loading routing rule |
| `dev/governance_migrations/<UTC>/` | kit upgrade backup + migration reports; one folder per `agent-handoff-kit upgrade` invocation | reference only; not for routine reads |
| `docs/plans/` | APS design, MVP implementation plan, MVP verification report, Phase 4 implementation plan | before any APS-related task; before declaring MVP scope complete; before opening or executing Phase 4 |
| `docs/index.html` | user-facing project entry page (Cantonese, hand-maintained); top-level nav links to guides hub and key plans | when explaining APS to a non-developer |
| `docs/guides/` | user-facing teaching pages (HTML); guides hub at `docs/guides/index.html` lists current + planned walkthroughs | when onboarding a user to APS or adding a new teaching page |
| `tools/` | APS onboarding helper script (and future tooling); `tools/aps-onboard.ps1` is the idempotent installer for Phase 4 plan T2-T5 | when onboarding a runtime to APS, or extending workspace tooling |
| `examples/` | Demo Bridge Pack fixtures shipped 入 repo,讀者 clone 後即可揾到 source。`examples/demo-agent-a/dev/rules/aps-bridge.md` (User A 角色) + `examples/demo-agent-b/dev/rules/aps-bridge.md` (User B 角色) + `examples/README.md`;procedural body 完全相同,只 Identity 角色標註不同 | 設置教學 §6 step 2 / §7 之 source path;將來新加 fixture 時擴展 |
| `bin/` | npm package executable entry; `bin/aps.js` is the placeholder CLI exposed as `npx @adamchanadam/aps init` (real orchestration deferred to Phase X-2 / X-3 per funnel audit roadmap) | when iterating on install / setup flow, or before npm publish |
| `package.json` | npm package manifest (`@adamchanadam/aps`, Apache-2.0, Node ≥18, bin entry `aps`) | when adjusting package metadata, version, or publish channel |
| `README.md` | GitHub first-impression entry — zero-knowledge friendly 痛點 hook + `npx @adamchanadam/aps init` + 3 步點用 + deep-dive references + Build status | when shipping a Layer A change (entry framing / install command / status table) |
| `LICENSE` | Apache License 2.0 (added via GitHub UI initial commit merge on 2026-05-22) | only when changing license (high-impact;needs Adam 拍板) |
| `.gitignore` | OS / editor / `.env` / `_*.txt` (per GENERIC_OPERATIONAL_RUNBOOK §5i convention) | when adding new file pattern that should not be tracked |
| `dev/qc/` | QC trigger vocabulary SSOT and per-tier checklists; `dev/qc/triggers.md` defines 🟢快檢 / 🟡外發前檢 / 🔴全面檢 | when user invokes a QC trigger keyword, or when designing new QC checks |
| `docs/qc/` | user-facing QC reference card; `docs/qc/governance-map.html` mirrors the SSOT for visual reading | when explaining the QC tier system to a human reader |

## Entry Points

| Entry | Path | Notes |
|---|---|---|
| App entry | `bin/aps.js` (npm package CLI; placeholder 0.1.0 — handlers for `init` / `--help` / unknown all functional) | when iterating on install / setup orchestration |
| Main config | `AGENTS.md` (kit-managed core block) | always — defines startup read order and closeout contract |
| Test suite | N/A — see Stack `Test command` for smoke test pattern | n/a |
| Runbook | `docs/plans/2026-05-20-aps-mvp-implementation.md` | when re-executing the MVP plan or auditing what was done |
| Public docs | `README.md` (GitHub first-impression) + `docs/index.html` (zero-knowledge entry page) | when introducing APS to a non-developer; first stop is README for repo visitors, then docs/index.html for hosted entry |
| Build roadmap | `dev/qc/2026-05-22-zero-knowledge-funnel-audit.md` (Stage 0-7 funnel + Layer A/B/C/D + 6-phase phase order) | when planning next build phase or auditing repo progress against zero-knowledge user vision |

## Fact Base

Reachable means the source can be found. It does not mean the source has been read in this session.

| Source | Role | Required before | Access method | Last verified |
|---|---|---|---|---|
| `docs/plans/2026-05-20-agent-public-square-design.md` | APS design rationale; SSOT for "why" | any APS protocol change | local path | 2026-05-21 |
| `docs/plans/2026-05-20-aps-mvp-implementation.md` | 15-task MVP step-by-step plan; SSOT for "what was built" | re-execution or audit of the MVP build | local path | 2026-05-21 |
| `docs/plans/2026-05-20-aps-mvp-verification.md` | MVP acceptance audit + Phase 4 open items | declaring MVP scope complete or planning Phase 4 | local path | 2026-05-21 |
| `docs/plans/2026-05-21-aps-phase4-plan.md` | Phase 4 implementation plan; T0 + Blocks 4A–4D + 10 tasks + acceptance criteria; SSOT for "how to take APS to real cross-machine runtime" | executing Phase 4; planning a Phase 4 verification report | local path | 2026-05-21 |
| `docs/index.html` | non-developer project explainer; user-maintained entry page | communicating APS state to humans, e.g. status updates to a counterpart or other stakeholders | local path | 2026-05-21 |
| `docs/guides/index.html` | guides hub listing current + planned user-facing walkthroughs | onboarding a user; adding a new guide | local path | 2026-05-21 |
| `docs/guides/aps-onboarding-walkthrough.html` | end-to-end User A + User B step-by-step Phase 4 onboarding teaching page (uses Adam/Jay as example narrative protagonists with disclaimer at §1) | first-time user reading; pairing with Phase 4 plan during execution | local path | 2026-05-21 |
| `dev/qc/triggers.md` | QC trigger vocabulary SSOT — 三 tier 定義 + 嵌套規矩 + 反問規矩 + 既有 mechanism mapping | any QC trigger invocation; designing new QC checks; resolving QC scope ambiguity | local path | 2026-05-21 |
| `docs/qc/governance-map.html` | user-facing QC reference card (mirrors SSOT for visual reading); shared site-nav across docs/ pages | explaining QC tier system to humans; onboarding new contributors to the QC discipline | local path | 2026-05-21 |
| `dev/qc/2026-05-22-zero-knowledge-funnel-audit.md` | Funnel-first audit — Stage 0-7 friction map + Layer A/B/C/D classification + 6-phase build roadmap + open questions + risks. SSOT for the zero-knowledge user vision pivot (2026-05-22 S9) | planning next build phase; auditing repo progress against zero-knowledge user vision; understanding Layer 分類 嘅 deliverable map | local path | 2026-05-22 |
| `README.md` | GitHub repo first-impression entry — zero-knowledge friendly 痛點 hook + `npx @adamchanadam/aps init` + 3 步點用 + deep-dive references + Build status table | first stop for any visitor to the GitHub repo; Layer A 嘅 primary deliverable | local path + https://github.com/Adamchanadam/ai-public-squares#readme | 2026-05-22 |

## External Sources

| Source | Role | Required before | Access method | Write-back rule | Last verified |
|---|---|---|---|---|---|
| APS Hub on Google Drive | runtime data store for cross-agent exchange — holds PROTOCOL.md, templates, lane data, packets, ack files | Phase 4 cross-machine handoff and any APS protocol or template change | per-machine local path (template; the maintainer's own machine sees it at `G:\…\AI_Public_Squares\`; other users' drive letters vary; offline-available required on every participating machine) | this workspace owns no agent lane; writes only to `_hub/` for protocol / template / CHANGELOG updates; never writes to any `<project_slug>/from_<agent>/` or `_ack/*.ack.json` | 2026-05-21 |
| Demo Agent workspace (User-A-side fixture) | MVP verification sandbox; canonical Bridge Pack source for downstream T2 | re-running the MVP demo, onboarding a third agent, or validating a PROTOCOL change | local path `C:\Users\adam\_claude_desktop\Demo_Agent_Adam_Public_Squares` (sibling directory; name reflects MVP fixture's example agent_id) | independent git repo; do NOT modify from this workspace | 2026-05-21 |
| Demo Agent workspace (User-B-side fixture) | same as above (mirror of User-A-side fixture; differs only in Identity section) | same | local path `C:\Users\adam\_claude_desktop\Demo_Agent_Jay_Public_Squares` (sibling directory; name reflects MVP fixture's example counterpart agent_id) | independent git repo; do NOT modify from this workspace | 2026-05-21 |
| User-chosen real runtime workspace(s) | Phase 4 target(s) — each user picks own | Phase 4 only — out of scope until that plan opens, and out-of-process for this template repo (real runtime exists on each user's own machine, not in this repo) | per-user absolute path (template; example shape: `MPEdu_Plus_Branding` from the read-only reference workspace used in S2-S7 sessions) | read-only reference from this workspace; never modify any user's real runtime from here | not verified — out of scope for template SSOT |
| GitHub remote `origin` | private repo hosting full git history + LICENSE + future release tarballs (Apache-2.0;may flip public after Layer A/B/C落地) | every push / pull during Layer A/B/C build; before any Phase X-2 publish | `https://github.com/Adamchanadam/ai-public-squares.git` (HTTPS;auth via Windows Credential Manager,auto-pass) | `git push origin main` (no force-push without Adam 明示);never push to non-main branches without explicit need | 2026-05-22 (10 commits pushed,latest `89b3012` site-nav brand sync) |
| npm registry — `@adamchanadam/aps` scope | distribution channel for the install command `npx @adamchanadam/aps init` | when ready to ship Phase X-2 真 `init` orchestration (publish 0.2.0+) | npm registry `https://www.npmjs.com/package/@adamchanadam/aps` (not yet published; package.json + bin/aps.js local 完成) | `npm publish` from this workspace root (Adam runs;requires `npm login`) | not yet published (0.1.0 placeholder local only; 0.2.0 將會係 first publish) |

## Local QC Commands

| Check | Command | Run before | Last verified |
|---|---|---|---|
| Agent Handoff Kit doctor | `npx @adamchanadam/agent-handoff-kit doctor` | every closeout, every governance file change, before declaring an `upgrade` complete per AGENTS.md §2.1 | 2026-05-21 (34/34 passed) |
| npm CLI smoke test | `node bin/aps.js --help && node bin/aps.js init && node bin/aps.js bogus 2>&1` | every time `bin/aps.js` changes, before committing the change | 2026-05-22 (3/3 paths pass) |
| Project governance check | N/A — kit doctor covers handoff / log / index / registry health; APS-specific governance is encoded in `docs/plans/2026-05-20-agent-public-square-design.md` and Hub `_hub/PROTOCOL.md` (no runnable script) | reference, not a runnable check | 2026-05-21 |

## Workspace Identity

Record this at closeout so the next AI can detect wrong-root or workspace drift.

| Field | Value | Last verified |
|---|---|---|
| Expected project root | `C:\Users\adam\_claude_desktop\AI_Public_Squares` | 2026-05-23 |
| Git root | same as above | 2026-05-23 |
| Branch / commit | `main` / latest pushed `01f748f`(S9 reconcile #2,2026-05-22);**S10 batch (此 closeout) uncommitted,將 push 為 23rd 累積 commit** | 2026-05-23 |
| Worktree or parallel workspace | none from this workspace; siblings `Demo_Agent_{Adam,Jay}_Public_Squares` (MVP fixtures) and the Drive Hub are independent stores; GitHub `origin` remote 已 public(Apache-2.0,2026-05-23 由 private 轉 public);GitHub Pages enabled at `https://adamchanadam.github.io/ai-public-squares/` (serving `/ (root)` of `main`) | 2026-05-23 |
| Uncommitted change summary | S10 batch — 10 files modified across npm package + 4 HTML + README + design doc + 2 governance file + START_NEXT_SESSION_PROMPT(plus 2 memory files out of repo)— will commit at end of this turn as single commit | 2026-05-23 |

## Change Hotspots

| Change type | Likely files | Required checks |
|---|---|---|
| APS protocol change | `G:\…\_hub\PROTOCOL.md` + `_hub/CHANGELOG.md` + both demo workspaces' `dev/rules/aps-bridge.md` + relevant section of `docs/plans/2026-05-20-agent-public-square-design.md` and `docs/plans/2026-05-20-aps-mvp-implementation.md` | inline-and-decouple consistency check across PROTOCOL ↔ Bridge Pack; doctor; template version-anchor comments updated; CHANGELOG entry with sign-off |
| APS plan or verification revision | `docs/plans/*.md`; possibly `docs/index.html` if user-visible state changed | re-read across the four APS docs to confirm cross-doc consistency; doctor |
| Kit upgrade | `AGENTS.md`, `dev/governance_migrations/<UTC>/` | doctor self-check; AGENTS.md health = clean (one heading, paired BEGIN/END markers, no sandwich); auto-run per AGENTS.md §2.1 |
| Governance state change | this file plus siblings `SESSION_HANDOFF.md`, `SESSION_LOG.md`, `DOC_SYNC_REGISTRY.md` | doctor; AGENTS.md §2 + §4 closeout contract satisfied for this workspace |
| User-facing entry page | `docs/index.html` | manual visual check; any updated state/badge reflects current reality |
| Closeout / startup contract | `AGENTS.md` (kit-managed; do not hand-edit inside BEGIN/END), `dev/SESSION_HANDOFF.md`, `dev/SESSION_LOG.md`, this file | opening message present + workspace identity current; doctor prompt-mirror check passes |

## External Services

| Service | Scope | Verification source | Last verified |
|---|---|---|---|
| Google Drive for Desktop | provides the Hub Root mount (any drive letter — `G:` / `H:` etc. per machine) for cross-machine APS sync; must be set "offline-available" on every participating machine (per design doc §12.1) | Drive for Desktop client status on each participating machine; design doc §12 verified facts with Google official documentation links | 2026-05-21 |
| `@adamchanadam/agent-handoff-kit` npm package | source of `AGENTS.md` managed core, governance file templates, doctor and upgrade commands | npm registry `https://www.npmjs.com/package/@adamchanadam/agent-handoff-kit`; installed via `npx @adamchanadam/agent-handoff-kit@latest upgrade` | 2026-05-21 (v0.1.7) |

## Maintenance Rule

Update this file when stack, commands, directory roles, entry points, external services, workspace identity, durable runbooks, or governance file map changes. Per AGENTS.md §4 step 3, an update here is a required part of full closeout whenever any of the above shifts.
