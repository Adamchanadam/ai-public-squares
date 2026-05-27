# Project Index

Purpose: give a stateless AI a compact map of the project before it reads or edits files.

## Stack

| Field | Value | Last verified |
|---|---|---|
| Agent Handoff Kit template version | 0.3.11 | 2026-05-26 |
| Runtime | Node.js ≥18 (for `bin/aps.js` CLI); static HTML for user-facing docs under `docs/` | 2026-05-26 |
| Framework | None — no build step; HTML hand-maintained; CLI is plain Node | 2026-05-22 |
| Package manager | npm (`@adamchanadam/aps` 0.2.1 published as latest and marked as ⚠️ pre-release;published CLI includes `revise`, `withdraw`, and read-only `doctor`; isolated skill rehearsal, throw-away zero-knowledge flow, and one real Adam ↔ Jay Google Drive round-trip passed for the 0.2.x release scope) | 2026-05-27 |
| Test command | `node bin/aps.js --help`, `node bin/aps.js init --dry-run`, `node bin/aps.js bridge-pack --role B`, disposable Hub `publish` → `inbox` → `revise` → `inbox` → `withdraw` → `inbox` → `publish` → `consume` → `close` → `doctor`, throw-away zero-knowledge tarball install flow, and `node bin/aps.js bogus` smoke test; local v0.3.11 `agent-handoff-kit doctor --root <path>` for governance; manual HTML link audit | 2026-05-26 |
| Build command | None — no build step | 2026-05-22 |
| Deploy command | `npm publish --access public`; GitHub push via `git push origin main` (auto-auth via Windows Credential Manager) | 2026-05-26 |

## Directory Map

| Path | Role | Read when |
|---|---|---|
| `AGENTS.md` | primary Agent Handoff Kit entry and startup contract (kit-managed core v0.1.7) | session startup |
| `CLAUDE.md` | Claude Code bridge to the same startup path | Claude Code startup |
| `GEMINI.md` | Gemini CLI bridge to the same startup path | Gemini CLI startup |
| `START_NEXT_SESSION_PROMPT.txt` | convenience copy of next-session opening message (regenerated from `dev/SESSION_HANDOFF.md` per AGENTS.md §4 step 10) | session startup, when user pastes the opening block |
| `dev/` | governance state (handoff, log, index, sync registry) | session startup / closeout |
| `dev/SESSION_LOG_archive/` | archived raw session-log entries moved out of the hot log by the SESSION_LOG N-rule | when tracing older session evidence no longer kept in the hot log |
| `dev/rules/` | rule packs loaded per task signal from `dev/RULE_PACKS.md` | per task, per pack-loading routing rule |
| `dev/release-notes/` | GitHub release note source files for tagged APS releases | before creating or reviewing a GitHub release |
| `dev/governance_migrations/<UTC>/` | kit upgrade backup + migration reports; one folder per `agent-handoff-kit upgrade` invocation | reference only; not for routine reads |
| `dev/qc/evidence/` | local QC evidence artifacts such as screenshots, temporary Hub fixtures, startup trace scripts, and throw-away zero-knowledge flow folders; generated browser profiles are ignored | when checking a completed QC report's supporting evidence |
| `docs/plans/` | APS design, MVP implementation plan, MVP verification report, Phase 4 implementation plan | before any APS-related task; before declaring MVP scope complete; before opening or executing Phase 4 |
| `docs/index.html` | user-facing project entry page (Cantonese, hand-maintained); top-level nav links to guides hub and key plans | when explaining APS to a non-developer |
| `docs/guides/` | user-facing teaching pages (HTML); guides hub at `docs/guides/index.html` lists current + planned walkthroughs | when onboarding a user to APS or adding a new teaching page |
| `tools/` | APS onboarding helper script (and future tooling); `tools/aps-onboard.ps1` is the idempotent installer for Phase 4 plan T2-T5 | when onboarding a runtime to APS, or extending workspace tooling |
| `examples/` | Demo Bridge Pack fixtures shipped 入 repo,讀者 clone 後即可揾到 source。`examples/demo-agent-a/dev/rules/aps-bridge.md` (User A 角色) + `examples/demo-agent-b/dev/rules/aps-bridge.md` (User B 角色) + `examples/README.md`;procedural body 完全相同,只 Identity 角色標註不同 | 設置教學 §6 step 2 / §7 之 source path;將來新加 fixture 時擴展 |
| `bin/` | npm package executable entry; `bin/aps.js` exposes `aps`; current verified published path is `npm install --save-dev @adamchanadam/aps` then `npx aps ...`;published 0.2.1 pre-release includes `bridge-pack`, `init` skill installation for Claude Code / Codex, initial Hub skeleton / Bridge Pack / starter pack generation, minimal CLI `publish` / `inbox` / `consume` / `close` round-trip, `revise`, `withdraw`, and read-only `doctor` | when iterating on install / setup flow, CLI packet flow, or before npm publish |
| `skills/` | APS skill source — `skills/aps/SKILL.md` 是 target orchestration spec;`skills/aps/references/setup-dialogue.md` 是隨 npm package 出貨的 setup wording bank;`init` copies this folder into supported AI tool skill directories. Setup and daily publish / inbox / consume / close are aligned to the published 0.2.1 pre-release CLI;recovery wording uses `revise`, `withdraw`, and `doctor`. Natural-language daily operation and recovery are still not production-complete | 設計或修改 skill 觸發詞、子流程 orchestration、voice 規矩之前 |
| `resources/` | APS bundled runtime resources — `resources/protocol/PROTOCOL.md` and `resources/protocol/templates/*` are package sources used by `aps init` to create `_hub/PROTOCOL.md`, `_hub/CHANGELOG.md`, templates, ack files, lane skeletons, Bridge Pack, and starter pack | when changing protocol skeleton, Hub setup output, or package file list |
| `package.json` | npm package manifest (`@adamchanadam/aps`, Apache-2.0, Node ≥18, bin entry `aps`) | when adjusting package metadata, version, or publish channel |
| `README.md` | GitHub first-impression entry — zero-knowledge friendly 痛點 hook + pre-release boundary;documents the current 0.2.1 CLI-first path (`npm install --save-dev @adamchanadam/aps` then `npx aps init --dry-run` / `npx aps init --hub-root ...`) and marks natural-language daily use as not production-complete | when shipping a Layer A change (entry framing / install command / status table) |
| `LICENSE` | Apache License 2.0 (added via GitHub UI initial commit merge on 2026-05-22) | only when changing license (high-impact;needs Adam 拍板) |
| `.gitignore` | OS / editor / `.env` / `_*.txt` (per GENERIC_OPERATIONAL_RUNBOOK §5i convention) | when adding new file pattern that should not be tracked |
| `dev/qc/` | QC trigger vocabulary SSOT and per-tier checklists; `dev/qc/triggers.md` defines 🟢快檢 / 🟡外發前檢 / 🔴全面檢 | when user invokes a QC trigger keyword, or when designing new QC checks |
| `docs/qc/` | user-facing QC reference card; `docs/qc/governance-map.html` mirrors the SSOT for visual reading | when explaining the QC tier system to a human reader |

## Entry Points

| Entry | Path | Notes |
|---|---|---|
| App entry | `bin/aps.js` (npm package CLI; published 0.2.1 pre-release has `bridge-pack`, `init --target claude|codex|both` + `--dry-run` skill installer, `--hub-root --project --agent-id --other-agent-id --role` Hub skeleton setup, plus minimal `publish` / `inbox` / `consume` / `close`, `revise`, `withdraw`, and read-only `doctor`) | when iterating on install / setup orchestration |
| Main config | `AGENTS.md` (kit-managed core block) | always — defines startup read order and closeout contract |
| Test suite | N/A — see Stack `Test command` for smoke test pattern | n/a |
| Runbook | `docs/plans/2026-05-20-aps-mvp-implementation.md` | when re-executing the MVP plan or auditing what was done |
| Public docs | `README.md` (GitHub first-impression) + `docs/index.html` (zero-knowledge entry page) | when introducing APS to a non-developer; first stop is README for repo visitors, then docs/index.html for hosted entry |
| Build roadmap | `dev/qc/2026-05-22-zero-knowledge-funnel-audit.md` (Stage 0-7 funnel + Layer A/B/C/D + 6-phase phase order) | when planning next build phase or auditing repo progress against zero-knowledge user vision |
| APS consistency audit | `dev/qc/2026-05-25-aps-full-consistency-audit.md` | when checking public promise drift across README / docs HTML / CLI / skill / Bridge Pack fixtures before continuing APS feature work |
| APS full audit | `dev/qc/2026-05-27-aps-full-audit.md` (0.2.1 full audit plus push / tag / GitHub pre-release / npm publish readback); `dev/qc/2026-05-26-aps-full-audit.md` remains the 0.2.0 pre-release full audit, real Drive verification, and post-publish readback | when checking whether APS can be treated as fully verified before cross-workspace work, protocol promotion, public release, or new-agent introduction |

## Fact Base

Reachable means the source can be found. It does not mean the source has been read in this session.

| Source | Role | Required before | Access method | Last verified |
|---|---|---|---|---|
| `docs/plans/2026-05-20-agent-public-square-design.md` | APS design rationale; SSOT for "why" | any APS protocol change | local path | 2026-05-21 |
| `docs/plans/2026-05-20-aps-mvp-implementation.md` | 15-task MVP step-by-step plan; SSOT for "what was built" | re-execution or audit of the MVP build | local path | 2026-05-21 |
| `docs/plans/2026-05-20-aps-mvp-verification.md` | MVP acceptance audit + Phase 4 open items | declaring MVP scope complete or planning Phase 4 | local path | 2026-05-21 |
| `docs/plans/2026-05-21-aps-phase4-plan.md` | Phase 4 implementation plan; T0 + Blocks 4A–4D + 10 tasks + acceptance criteria; SSOT for "how to take APS to real cross-machine runtime" | executing Phase 4; planning a Phase 4 verification report | local path | 2026-05-21 |
| `docs/index.html` | non-developer project explainer; user-maintained entry page;current status reflects 0.2.1 pre-release CLI-first setup and one completed maintainer-run Drive verification | communicating APS state to humans, e.g. status updates to a counterpart or other stakeholders | local path | 2026-05-27 |
| `docs/guides/index.html` | guides hub listing current + planned user-facing walkthroughs | onboarding a user; adding a new guide | local path | 2026-05-21 |
| `docs/guides/aps-onboarding-walkthrough.html` | end-to-end User A + User B step-by-step onboarding teaching page;now uses the 0.2.1 CLI-first setup path and marks day-to-day flow as pre-release trial use | first-time user reading; pairing with Phase 4 plan during execution | local path | 2026-05-27 |
| `dev/qc/triggers.md` | QC trigger vocabulary SSOT — 三 tier 定義 + 嵌套規矩 + 反問規矩 + 既有 mechanism mapping | any QC trigger invocation; designing new QC checks; resolving QC scope ambiguity | local path | 2026-05-21 |
| `docs/qc/governance-map.html` | user-facing QC reference card (mirrors SSOT for visual reading); shared site-nav across docs/ pages | explaining QC tier system to humans; onboarding new contributors to the QC discipline | local path | 2026-05-21 |
| `dev/qc/2026-05-22-zero-knowledge-funnel-audit.md` | Funnel-first audit — Stage 0-7 friction map + Layer A/B/C/D classification + 6-phase build roadmap + open questions + risks. SSOT for the zero-knowledge user vision pivot (2026-05-22 S9) | planning next build phase; auditing repo progress against zero-knowledge user vision; understanding Layer 分類 嘅 deliverable map | local path | 2026-05-22 |
| `docs/plans/2026-05-23-aps-skill-dialogue-script.md` | APS skill dialogue companion — `skills/aps/SKILL.md` 之 wording bank reference;Setup / 發佈 / 收件 / 補救 4 子流程 sample dialogue now aligned to the published 0.2.1 pre-release CLI packet folder / outbox / ack model(中文版 land,英文版 defer);概念 inject 順序圖 + 語氣指南(做與不做) | 設計或修改 skill 觸發後對用戶之 voice / 對話順序 / 概念解釋之前 | local path | 2026-05-27 |
| `dev/qc/2026-05-25-aps-full-consistency-audit.md` | APS product consistency audit — root-fix record for public promise drift across README / docs HTML / CLI / skill / dialogue script / Bridge Pack fixtures | before continuing APS feature work after public entry, CLI, or skill promise changes | local path | 2026-05-25 |
| `dev/qc/2026-05-26-aps-full-audit.md` | Latest APS full audit report for 0.2.0 pre-release — records release-prep checks, same-machine regression, cross-workspace read-only audit, real Adam ↔ Jay Drive verification, GitHub pre-release, npm publish, Pages readback, and install probe | before changing 0.2.x release state or claiming production readiness | local path | 2026-05-26 |
| `dev/qc/2026-05-27-aps-full-audit.md` | Latest APS full audit report for 0.2.1 pre-release — records nested release-check, cross-workspace read-only audit, local revise / withdraw / doctor regression, HTML preview, push / tag / GitHub pre-release / npm publish readback, and remaining pre-release boundaries | before claiming 0.2.1 release health or production readiness | local path | 2026-05-27 |
| `dev/qc/2026-05-25-aps-full-audit.md` | Historical APS full audit report — records which full-check items passed, which remained unverified at that time, and why the result was not yet a complete pass | historical reference | local path | 2026-05-25 |
| `README.md` | GitHub repo first-impression entry — zero-knowledge friendly 痛點 hook + pre-release boundary + current 0.2.1 CLI-first path + deep-dive references | first stop for any visitor to the GitHub repo; Layer A primary deliverable | local path + https://github.com/Adamchanadam/ai-public-squares#readme | 2026-05-27 |

## External Sources

| Source | Role | Required before | Access method | Write-back rule | Last verified |
|---|---|---|---|---|---|
| APS Hub on Google Drive | runtime data store for cross-agent exchange — holds PROTOCOL.md, templates, lane data, packets, ack files | Phase 4 cross-machine handoff and any APS protocol or template change | per-machine local path (template; the maintainer's own machine sees it at `G:\…\AI_Public_Squares\`; other users' drive letters vary; offline-available required on every participating machine) | this workspace owns no agent lane; writes only to `_hub/` for protocol / template / CHANGELOG updates; never writes to any `<project_slug>/from_<agent>/` or `_ack/*.ack.json` | 2026-05-21 |
| Demo Agent workspace (User-A-side fixture) | MVP verification sandbox; canonical Bridge Pack source for downstream T2 | re-running the MVP demo, onboarding a third agent, or validating a PROTOCOL change | local path `C:\Users\adam\_claude_desktop\Demo_Agent_Adam_Public_Squares` (sibling directory; name reflects MVP fixture's example agent_id) | independent git repo; do NOT modify from this workspace | 2026-05-21 |
| Demo Agent workspace (User-B-side fixture) | same as above (mirror of User-A-side fixture; differs only in Identity section) | same | local path `C:\Users\adam\_claude_desktop\Demo_Agent_Jay_Public_Squares` (sibling directory; name reflects MVP fixture's example counterpart agent_id) | independent git repo; do NOT modify from this workspace | 2026-05-21 |
| User-chosen real runtime workspace(s) | Phase 4 target(s) — each user picks own | Phase 4 only — out of scope until that plan opens, and out-of-process for this template repo (real runtime exists on each user's own machine, not in this repo) | per-user absolute path (template; example shape: `MPEdu_Plus_Branding` from the read-only reference workspace used in S2-S7 sessions) | read-only reference from this workspace; never modify any user's real runtime from here | not verified — out of scope for template SSOT |
| GitHub remote `origin` | public repo hosting full git history, release tags, GitHub Pages, and Apache-2.0 license | every push / pull; before any GitHub release or Pages verification | `https://github.com/Adamchanadam/ai-public-squares.git` (HTTPS;auth via Windows Credential Manager,auto-pass) | `git push origin main` and version tag pushes only with explicit release intent;no force-push without Adam 明示 | 2026-05-27 (`main` pushed after 0.2.1 release;tag `v0.2.1` points to `d9dd1aa1acf2b2f5c863056382543922c5c0aeb4`) |
| npm registry — `@adamchanadam/aps` scope | distribution channel for the APS CLI package | before documenting npm commands or changing package version | npm registry `https://www.npmjs.com/package/@adamchanadam/aps` (`latest` = 0.2.1 verified 2026-05-27) | `npm publish --access public` from this workspace root; verify with `npm view @adamchanadam/aps version dist-tags.latest bin dist.fileCount --json` | 2026-05-27 |
| GitHub release `v0.2.1` | public pre-release record for APS package version 0.2.1 | before telling users v0.2.1 is released through GitHub | `https://github.com/Adamchanadam/ai-public-squares/releases/tag/v0.2.1` | create / update only with explicit release intent | 2026-05-27 (`isPrerelease=true`) |
| GitHub Pages | hosted public HTML entry surface | after pushing public docs changes | `https://adamchanadam.github.io/ai-public-squares/docs/index.html` | writes happen via `main` branch push only | 2026-05-27 (needs post-state-sync readback for `0.2.1` after final push) |

## Installed Integrations` | read-back required / manual only / no write | TBD |

> `via` column 紀律：每行 External Sources 必引用 `## Installed Integrations` 嘅 entry 名稱（譬如 `Notion Connector`、`Drive Connector`），確認該 source 經邊個 integration 訪問；無 declared Integration 嘅 source 用 `manual paste`。Cross-section consistency 由 doctor + qa:release 強制 enforce。

## Installed Integrations

> ⚠️ **機密分離原則**：本 section 只記錄 **項目使用紀錄** + **公開參考座標**（Notion DB 名 / URL / folder path 等），**絕對不記錄 API key / OAuth token / 任何 credential value**。Credential 應由 AI 工具自身 secure storage 管理（譬如 Claude Desktop Extensions 嘅 OS Keychain / Claude Code MCP config）。AI 寫入本 section 前必 self-check 確認無 credential leak；doctor 對本 section + SESSION_HANDOFF + SESSION_LOG 強制 grep credential prefix patterns（`sk-` / `ntn_` / `ya29.` / `xoxp-` / `ghp_` / `sl.` / `AKIA` / `AIza` 等）。

> 用途：新 AI session 開工讀本 section 知道項目可用嘅外部工具能力 + 各自分工。Declare 一次後跨 session AI 都會 leverage；每個 entry 必含 `Declared` + `Last Verified` 防漂移。

### Connectors（Anthropic 官方 vetted）

| Tool | Project Usage | Access Scope | Specific Instance | Credential Location | Declared | Last Verified |
|------|---------------|--------------|-------------------|---------------------|----------|---------------|
| TBD | TBD（譬如 DB Index 記真源 path / 持久化參考檔儲存） | read / read+write | TBD（譬如 DB 名 + URL / folder path） | TBD（譬如 `Claude Desktop Extensions`） | TBD | TBD |

### MCPs（community / custom）

| Server | Source | Project Usage | Credential Location | Declared | Last Verified |
|--------|--------|---------------|---------------------|----------|---------------|
| TBD | TBD（譬如 GitHub repo URL） | TBD | TBD（譬如 `Claude Code MCP config + env var`） | TBD | TBD |
| Codex `chrome-devtools` | `chrome-devtools-mcp@latest` | Chrome / DevTools browser inspection in future Codex sessions;usage statistics disabled | Codex global MCP config (`~/.codex/config.toml`);no project credential | 2026-05-26 | 2026-05-26 |
| Codex `context7` | `@upstash/context7-mcp` | current library / framework / SDK documentation lookup in future Codex sessions | Codex global MCP config (`~/.codex/config.toml`);no API key stored | 2026-05-26 | 2026-05-26 |

### Plugins（Claude Code plugin bundle）

| Name | Bundle Content（Skills + MCP + hooks） | When Triggered | Last Verified |
|------|----------------------------------------|----------------|---------------|
| TBD | TBD | TBD | TBD |

### Skills（SKILL.md instruction set）

| Name | Source | When Triggered | Last Verified |
|------|--------|----------------|---------------|
| TBD | TBD（譬如 plugin bundle / user-level install） | TBD | TBD |

### Source-of-truth Architecture（多層持久化組合）

> 當項目用多個整合構成 source-of-truth 架構（譬如 Notion DB Index + 本機真源 + Drive 參考檔），本表描述每層分工，避免 AI 跨層越界。

| Layer | Surface（具體 instance） | Role | Write Direction |
|-------|--------------------------|------|-----------------|
| 真源（source of truth） | TBD（譬如 本機 `~/project/reference/`） | 原始可審計 reference 內容 | 用戶手動置入；AI 不直接寫入 |
| Index | TBD（譬如 Notion DB「Project Index」） | 登記每份真源檔 metadata + 摘要 + tag | AI 經 Connector 直接讀寫 |
| 持久化參考檔（mirror） | TBD（譬如 Drive folder「Project Reference/」） | 防本機 disk failure / 跨裝置 access | 用戶手動同步；AI 唔自動 push |
| Working draft | TBD（譬如 本機 `~/project/output/`） | AI 寫 task output | AI 直接 read + write 本機 |

## Local QC Commands

| Check | Command | Run before | Last verified |
|---|---|---|---|
| Agent Handoff Kit doctor | `node C:\Users\adam\_claude_desktop\_Prompt_Template\ai-session-governance_v2\bin\agent-handoff-kit.mjs doctor --root <path>` (local v0.3.11 CLI;avoids fresh npm execution) | every closeout, every governance file change, before declaring an `upgrade` complete per AGENTS.md §2.1 | 2026-05-26 (main root rechecked after prompt regeneration;demo Adam and demo Jay passed 46/46) |
| npm CLI smoke test | `node bin/aps.js --help`; `node bin/aps.js init --dry-run`; `node bin/aps.js bridge-pack --role B`; disposable Hub `publish` → `inbox` → `revise` → `inbox` → `withdraw` → `inbox` → `publish` → `consume` → `close` → `doctor`; throw-away zero-knowledge tarball install flow; `node bin/aps.js bogus`; post-publish install probe | every time `bin/aps.js` changes, before committing the change | 2026-05-27 (source path, packed-tarball path, isolated skill-level rehearsal, throw-away zero-knowledge flow, formal 🟡 外發前檢, 🔴 全面檢, real Drive round-trip, npm publish, install probe, local 0.2.1 `revise` / `withdraw` / `doctor` smoke pass, and formal 0.2.1 外發前檢 passed) |
| Project governance check | N/A — kit doctor covers handoff / log / index / registry health; APS-specific governance is encoded in `docs/plans/2026-05-20-agent-public-square-design.md` and Hub `_hub/PROTOCOL.md` (no runnable script) | reference, not a runnable check | 2026-05-21 |

## Workspace Identity

Record this at closeout so the next AI can detect wrong-root or workspace drift.

| Field | Value | Last verified |
|---|---|---|
| Expected project root | `C:\Users\adam\_claude_desktop\AI_Public_Squares` | 2026-05-26 |
| Git root | same as above | 2026-05-26 |
| Branch / commit | `main` / current `HEAD` is post-publish state-sync closeout work;0.2.1 release commit `d9dd1aa1acf2b2f5c863056382543922c5c0aeb4`;tag `v0.2.1` points to release commit | 2026-05-27 |
| Worktree or parallel workspace | none from this workspace; siblings `Demo_Agent_{Adam,Jay}_Public_Squares` are independent stores and both pass v0.3.11 doctor, but each has its own uncommitted governance upgrade files; GitHub Pages enabled at `https://adamchanadam.github.io/ai-public-squares/` | 2026-05-26 |
| Execution environment note | `C:\tmp` is not writable in the current Codex desktop execution environment. For temporary evidence or QC artifacts, use a project-local path such as `dev/qc/evidence/<date>-<scope>/` unless the user explicitly authorizes another writable location. | 2026-05-25 |
| Uncommitted change summary | Post-publish state-sync files are part of the current closeout commit;after push, `git status --short` should be clean;`dev/qc/evidence/` is ignored local evidence;`adamchanadam-aps-*.tgz` generated by `npm pack` should not be committed unless Adam explicitly wants to keep a tarball artifact | 2026-05-27 |

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
| `@adamchanadam/agent-handoff-kit` npm package | source of `AGENTS.md` managed core, governance file templates, doctor and upgrade commands | npm registry `https://www.npmjs.com/package/@adamchanadam/agent-handoff-kit`;local CLI source at `C:\Users\adam\_claude_desktop\_Prompt_Template\ai-session-governance_v2\bin\agent-handoff-kit.mjs` | 2026-05-26 (npm latest and local CLI v0.3.11) |

## Maintenance Rule

Update this file when stack, commands, directory roles, entry points, external services, workspace identity, durable runbooks, or governance file map changes. Per AGENTS.md §4 step 3, an update here is a required part of full closeout whenever any of the above shifts.
