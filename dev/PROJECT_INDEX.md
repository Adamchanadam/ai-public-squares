# Project Index

Purpose: give a stateless AI a compact map of the project before it reads or edits files.

## Stack

| Field | Value | Last verified |
|---|---|---|
| Agent Handoff Kit template version | 0.1.7 | 2026-05-21 |
| Runtime | N/A — governance + documentation workspace, no code execution | 2026-05-21 |
| Framework | N/A — static HTML for user-facing docs under `docs/`; no build step | 2026-05-21 |
| Package manager | N/A — same reason | 2026-05-21 |
| Test command | N/A — no test suite; verification via `agent-handoff-kit doctor` plus manual acceptance per plan; HTML link audit by hand | 2026-05-21 |
| Build command | N/A — same | 2026-05-21 |
| Deploy command | N/A — same; not published | 2026-05-21 |

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

## Entry Points

| Entry | Path | Notes |
|---|---|---|
| App entry | N/A — no runtime in this workspace | n/a |
| Main config | `AGENTS.md` (kit-managed core block) | always — defines startup read order and closeout contract |
| Test suite | N/A — see Stack `Test command` | n/a |
| Runbook | `docs/plans/2026-05-20-aps-mvp-implementation.md` | when re-executing the MVP plan or auditing what was done |
| Public docs | `docs/index.html` | when introducing APS to a non-developer; user-maintained |

## Fact Base

Reachable means the source can be found. It does not mean the source has been read in this session.

| Source | Role | Required before | Access method | Last verified |
|---|---|---|---|---|
| `docs/plans/2026-05-20-agent-public-square-design.md` | APS design rationale; SSOT for "why" | any APS protocol change | local path | 2026-05-21 |
| `docs/plans/2026-05-20-aps-mvp-implementation.md` | 15-task MVP step-by-step plan; SSOT for "what was built" | re-execution or audit of the MVP build | local path | 2026-05-21 |
| `docs/plans/2026-05-20-aps-mvp-verification.md` | MVP acceptance audit + Phase 4 open items | declaring MVP scope complete or planning Phase 4 | local path | 2026-05-21 |
| `docs/plans/2026-05-21-aps-phase4-plan.md` | Phase 4 implementation plan; T0 + Blocks 4A–4D + 10 tasks + acceptance criteria; SSOT for "how to take APS to real cross-machine runtime" | executing Phase 4; planning a Phase 4 verification report | local path | 2026-05-21 |
| `docs/index.html` | non-developer project explainer; user-maintained entry page | communicating APS state to humans, e.g. status updates to Jay or other stakeholders | local path | 2026-05-21 |
| `docs/guides/index.html` | guides hub listing current + planned user-facing walkthroughs | onboarding a user; adding a new guide | local path | 2026-05-21 |
| `docs/guides/aps-onboarding-walkthrough.html` | end-to-end Adam + Jay step-by-step Phase 4 onboarding teaching page | first-time user reading; pairing with Phase 4 plan during execution | local path | 2026-05-21 |

## External Sources

| Source | Role | Required before | Access method | Write-back rule | Last verified |
|---|---|---|---|---|---|
| APS Hub on Google Drive | runtime data store for cross-agent exchange — holds PROTOCOL.md, templates, lane data, packets, ack files | Phase 4 cross-machine handoff and any APS protocol or template change | local path `G:\我的雲端硬碟\Adam 工作目錄\AI_Projects\AI_Public_Squares\` (Drive for Desktop, offline-available on Adam's machine; Jay-side mirror pending) | this workspace owns no agent lane; writes only to `_hub/` for protocol / template / CHANGELOG updates; never writes to `mpedu_plus_branding/from_*/` or `_ack/*.ack.json` | 2026-05-21 |
| Demo Agent Adam workspace | sibling demo testbed; not a runtime | re-running the MVP demo, onboarding a third agent, or validating a PROTOCOL change | local path `C:\Users\adam\_claude_desktop\Demo_Agent_Adam_Public_Squares` | independent git repo; do NOT modify from this workspace | 2026-05-21 |
| Demo Agent Jay workspace | same as above | same | local path `C:\Users\adam\_claude_desktop\Demo_Agent_Jay_Public_Squares` | independent git repo; do NOT modify from this workspace | 2026-05-21 |
| Real `MPEdu_Plus_Branding` runtime (Adam) | Phase 4 target | Phase 4 only — out of scope until that plan opens | local path `C:\Users\adam\_claude_desktop\Work_MP\明報教育Plus\MP - 明報教育服務\MPEdu_Plus_Branding\` | read-only reference from this workspace; never modify | not verified — not in scope this session |

## Local QC Commands

| Check | Command | Run before | Last verified |
|---|---|---|---|
| Agent Handoff Kit doctor | `npx @adamchanadam/agent-handoff-kit doctor` | every closeout, every governance file change, before declaring an `upgrade` complete per AGENTS.md §2.1 | 2026-05-21 (34/34 passed) |
| Project governance check | N/A — kit doctor covers handoff / log / index / registry health; APS-specific governance is encoded in `docs/plans/2026-05-20-agent-public-square-design.md` and Hub `_hub/PROTOCOL.md` (no runnable script) | reference, not a runnable check | 2026-05-21 |

## Workspace Identity

Record this at closeout so the next AI can detect wrong-root or workspace drift.

| Field | Value | Last verified |
|---|---|---|
| Expected project root | `C:\Users\adam\_claude_desktop\AI_Public_Squares` | 2026-05-21 |
| Git root | same as above | 2026-05-21 |
| Branch / commit | `main` / current HEAD via `git log -1 --format=%h` (prior commit before this fill-in was `ca7bac2 chore(kit): upgrade agent-handoff-kit to 0.1.7`) | 2026-05-21 |
| Worktree or parallel workspace | none from this workspace; siblings `Demo_Agent_{Adam,Jay}_Public_Squares` and the Drive Hub are independent stores | 2026-05-21 |
| Uncommitted change summary | clean (this commit lands the governance fill-in) | 2026-05-21 |

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
| Google Drive for Desktop | provides the Hub Root mount on `G:` for cross-machine APS sync; must be set "offline-available" on every participating machine (per design doc §12.1) | Drive for Desktop client status on Adam's machine; design doc §12 verified facts with Google official documentation links | 2026-05-21 |
| `@adamchanadam/agent-handoff-kit` npm package | source of `AGENTS.md` managed core, governance file templates, doctor and upgrade commands | npm registry `https://www.npmjs.com/package/@adamchanadam/agent-handoff-kit`; installed via `npx @adamchanadam/agent-handoff-kit@latest upgrade` | 2026-05-21 (v0.1.7) |

## Maintenance Rule

Update this file when stack, commands, directory roles, entry points, external services, workspace identity, durable runbooks, or governance file map changes. Per AGENTS.md §4 step 3, an update here is a required part of full closeout whenever any of the above shifts.
