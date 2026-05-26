# Session Handoff

Last Updated: 2026-05-26 (wrap-up: npm `@adamchanadam/aps` 0.1.1 published; GitHub commit/tag/release/push complete; MCP tools installed; prompt mirror repaired)

<!-- ack:section:durable-anchors -->
## Durable Anchors

Stable facts that should survive across sessions. Update only when they change, but verify they still match reality at closeout.

1. Project root and boundary: `C:\Users\adam\_claude_desktop\AI_Public_Squares` — design / plan / verification SSOT workspace for the AI Public Squares (APS) project. Not a product runtime;carries the protocol design, implementation plans, MVP verification report, user-facing entry pages (README + docs/index.html), npm package source (`@adamchanadam/aps`), and zero-knowledge funnel build roadmap。
2. Product / system identity: AI Public Squares (formerly "Agent Public Square") — a cross-machine collaboration protocol for two AI agents working on the same project, distributed as an npm package (`@adamchanadam/aps`, Apache-2.0)。Uses a Google-Drive-synced Hub Root with single-writer lanes, immutable versioned packets, an append-only ledger, and a thin Bridge Pack that wires inbox detection into each agent's agent-handoff-kit startup。Current verified package path: `npm install --save-dev @adamchanadam/aps` then `npx aps bridge-pack`; zero-knowledge target remains `npx aps init` after orchestration lands。
3. Governance model: Agent Handoff Kit v0.3.11 managed-core block at `AGENTS.md`。External skill flows, subagent plans, and demo-workspace closeouts are subordinate evidence per AGENTS.md §2 and §5;only the active project root's kit persistence completes a task。
4. Source-of-truth ownership: this workspace owns the APS design + implementation plan + verification report + project entry HTML + README + npm package source (`bin/aps.js`) + zero-knowledge funnel audit roadmap;the Drive Hub at `G:\我的雲端硬碟\Adam 工作目錄\AI_Projects\AI_Public_Squares\` owns runtime `PROTOCOL.md` + templates + lane data + CHANGELOG;the two Demo Agent workspaces (`C:\Users\adam\_claude_desktop\Demo_Agent_{Adam,Jay}_Public_Squares\`) own their per-agent Bridge Pack and round-trip session evidence。GitHub remote `origin` at `https://github.com/Adamchanadam/ai-public-squares.git` (public,Apache-2.0)。
5. Release / publish boundary: GitHub repo public since 2026-05-23;GitHub Pages enabled (`Settings → Pages → Source: Deploy from a branch, Branch: main, Folder: / (root)`)。npm `@adamchanadam/aps` 0.1.1 已 publish 並驗證 latest = 0.1.1;current package supports `bridge-pack`,while full `init` orchestration remains pending。Walkthrough Layer D re-position(§1 disclaimer 「想 AI 帶你做」 reframe)留 Phase X-5 落地之後處理。

<!-- ack:section:closeout-reconciled-state -->
## Closeout-Reconciled State

This is the current-state area. At every full closeout, rewrite or explicitly confirm every section below. Do not append a new state snapshot under an old one.

**Note:** S10 (2026-05-23) **formal closeout reconcile**。S9(2026-05-22)累積之 funnel-first vision shift + Layer A entry + voice rewrite 全完成並 push;S10 跨多輪 audit + scope expansion(HTML 公開面 .md hyperlink strip + npm bridge-pack sub-command + 設置教學 取消 clone repo prereq + repo 轉 public + GitHub Pages enable + README absolute URL + voice 額外 scope + Agent Handoff Kit 網址 fix)。SESSION_LOG S10 entry 記錄完整 work。

<!-- ack:section:current-baseline -->
## Current Baseline

1. Project root: `C:\Users\adam\_claude_desktop\AI_Public_Squares` (Windows;git branch `main`;repo public since 2026-05-23;release commit `838d85a` pushed;tag `v0.1.1` and GitHub release complete)。
2. Product / system state: APS MVP complete + Layer A entry done + Layer B partial: npm package `@adamchanadam/aps` 0.1.1 published and verified;`bridge-pack` works after package install;full `init` orchestration still placeholder。S10 documentation governance remains in force:HTML public pages do not link `.md`;`.md` remains AI / maintainer spec substrate。
3. Governance state: Agent Handoff Kit v0.3.11 managed-core in place。`Demo_Agent_Adam_Public_Squares` and `Demo_Agent_Jay_Public_Squares` both pass v0.3.11 doctor(46 checks)。This main workspace had one prompt-mirror drift before wrap-up;this closeout regenerates `START_NEXT_SESSION_PROMPT.txt` from this handoff and re-runs doctor。
4. Source-of-truth notes: `dev/qc/2026-05-22-zero-knowledge-funnel-audit.md` remains funnel-first build roadmap;`README.md` + `docs/index.html` describe the current 0.1.1 package boundary;`package.json` + `bin/aps.js` are npm CLI source;`examples/demo-agent-{a,b}/dev/rules/aps-bridge.md` are Bridge Pack fixture canonical source shipped in npm tarball;`LICENSE` is Apache-2.0。

<!-- ack:section:task-understanding-summary -->
## Task Understanding Summary

<!-- ack:field:user-intent -->
- User intent (refined 2026-05-22): originally 「build a reusable cross-machine AI-agent collaboration protocol」;**S9 vision shift refined**: 「對 APS 零認知背景嘅用戶都用得到,本 repo 才算成功 — AI 工具係畀非技術人員用先有價值」。即係 protocol-correctness 唔再係 success criterion;zero-knowledge user 嘅 5-minute setup-to-daily-use outcome 先係 final yardstick。
<!-- ack:field:task-essence -->
- Task essence: protocol design + MVP done (S1-S8 work);funnel-first product layer build (S9+ work) — 由 「technical doc + manual walkthrough」 升級做 「`npx ... init` + skill 帶 setup + natural language daily ops」。
- User value: zero-knowledge user 唔需要先讀 walkthrough / Phase 4 plan / Bridge Pack 等 deep-dive doc;一條命令 install + skill 自動引導。Walkthrough / plan / Bridge Pack / PROTOCOL.md 變 Layer D (protocol spec) — 維護者 reference,user invisible。
<!-- ack:field:success-criteria -->
- Success criteria (updated S9): (1) Layer A entry — README + docs/index.html 對 zero-knowledge user 30 秒 hook + actionable;(2) Layer B install — 一行 command 跑得;(3) Layer C skill — setup 5-7 條 plain-words 問題完成 setup + 日常 natural language ops;(4) Layer D 維持 protocol spec audit trail 嘅 governance integrity。
- Key background already read: AGENTS.md v0.1.7 managed core;4 個 APS docs;both demo Bridge Packs;Hub `_hub/PROTOCOL.md` v1.0 + `_hub/CHANGELOG.md`;`GENERIC_OPERATIONAL_RUNBOOK.md` (Cowork / Claude Desktop 環境參考)。
- Background still unread or blocked: 真實 user runtime workspace state (各 user 自己機,out of scope for template SSOT);Claude Code skill install convention 的 official spec (Phase X-2 / X-3 之前要查實)。
- Non-goals / boundaries: 本 workspace 不處理對方 user 機 onboarding (out of scope);GitHub `origin` push 已 enabled 但 **不做 force-push / non-main branch push without Adam 明示**。

<!-- ack:section:active-objective -->
## Active Objective

S9 mid-session reconcile 之後嘅 active objective:**入 Phase X-3 build,起 `skills/aps/SKILL.md` + setup subflow + dialogue script first draft**。

Funnel audit doc (`dev/qc/2026-05-22-zero-knowledge-funnel-audit.md`) 嘅 6 phase build order:
- ✅ Phase X-1 Layer A entry (README rewrite + docs/index.html rewrite + cross-doc site-nav brand sync) — **done**
- 🔄 Phase X-2 npm package + install path — **0.1.1 published with `bridge-pack`**;**real `init` orchestration pending** (detect Claude Code → install skill → greet)
- ⏳ Phase X-3 skill setup subflow + dialogue script (conversational craft sub-deliverable) — **next**
- ⏳ Phase X-4 skill daily-use + recovery subflow
- ⏳ Phase X-5 Layer D doc re-position (walkthrough §1 disclaimer + Phase 4 plan cross-reference)
- ⏳ Phase X-6 auto-update mechanism

之前 S8 嘅 3 個 independent thread (T0b execution / Block 4A / T0 lock with User B) 仍然有效但 **deferred**:Phase X-3 (skill setup subflow) 落地之後,Bridge Pack T0b polish 可以由 skill 自動處理 (skill 第一次跑時自動 patch demo workspace 嘅 Bridge Pack) — 即係 T0b 唔再係 manual thread,變 skill 嘅 first step。Block 4A 同 T0 lock 都會由 skill orchestrate。

<!-- ack:section:completed-this-session -->
## Completed This Session

Record only work actually completed in the current session.

1. **APS v0.1.1 release completed** — `@adamchanadam/aps` 0.1.1 published to npm;`npm view` confirms `latest = 0.1.1`, bin `aps`, fileCount 8。Release commit `838d85a` pushed to `origin/main`;tag `v0.1.1` pushed;GitHub release created at `https://github.com/Adamchanadam/ai-public-squares/releases/tag/v0.1.1`。
2. **Verified install path documented and shipped** — public docs and CLI now use `npm install --save-dev @adamchanadam/aps` followed by `npx aps bridge-pack`;full `npx aps init` orchestration remains placeholder and is stated as such。
3. **GitHub Pages verified after release push** — `https://adamchanadam.github.io/ai-public-squares/docs/index.html` returned HTTP 200 and contained both `0.1.1` and `npm install --save-dev @adamchanadam/aps`。
4. **Codex MCP tools installed** — global Codex MCP config now includes `chrome-devtools` (`chrome-devtools-mcp@latest`, usage statistics disabled) and `context7` (`@upstash/context7-mcp`, no API key stored)。These tools normally require a new Codex session or app restart before they appear in the active tool list。
5. **Agent Handoff Kit v0.3.11 consistency checked across three APS-related roots** — demo Adam and demo Jay workspaces pass doctor;main workspace had prompt mirror drift because this session had not yet performed formal wrap-up。This closeout repairs the mirror and re-verifies。

<!-- ack:section:next-priorities -->
## Next Priorities

Per funnel audit roadmap 順序,update for post-S9 mid-session reconcile:

1. **Phase X-3 起手 — `skills/aps/SKILL.md` + setup subflow first draft + dialogue script** (next big substantive work)。Sub-deliverables:
   - SKILL.md frontmatter (`name` / `description` 用 plain-words trigger broad / multi-trigger)
   - Setup subflow conversational flow first pass (greeting + intent confirm + prerequisite interactive + T0 3 decisions + T1-T6 file ops + cross-side packaging + first-use dry-run test)
   - Dialogue script (Cantonese + English 雙語;tone guide;5-7 條 plain-word 問題嘅 wording + variants;概念 inject 順序 map)
2. **Phase X-2 完整 — 真 `init` orchestration**:detect Claude Code → install skill → greet (currently `bin/aps.js` `init` 係 placeholder)。Phase X-3 同 X-2 之間有 dependency 互動 — skill 邏輯先 design 完,init 命令再 wire up。可考慮並行 first-pass。
3. **Phase X-4 — daily-use subflow** (publish / inbox-check / troubleshoot):natural language routing。
4. **Phase X-5 — Layer D doc re-position**:walkthrough §1 disclaimer 加 「想 AI 帶你做就講 set up APS」 + Phase 4 plan 加 「Skill-driven UX layer (Layer C)」 cross-reference 一節。
5. **Phase X-6 — auto-update mechanism**:`npx aps update` + skill startup auto-check Bridge Pack version (可延後)。
6. **Walkthrough re-positioning** (Phase X-5 sub):由 「user 必讀 + 跟做」 → 「protocol 深入了解 + 維護者 reference」 嘅 framing shift。
7. **Demo workspace T0b polish** (deferred):skill 落地後由 skill 自動執行,唔再係 manual thread。如果想 preview,可手做於 Demo_Agent_Adam + Demo_Agent_Jay sessions。

<!-- ack:section:next-task-required-reading -->
## Next Task Required Reading

Before acting on the next task (Phase X-3 — SKILL.md + setup subflow), read or mark blocked:

| Source | Why required | Status |
|---|---|---|
| `AGENTS.md` (this workspace) | Active governance contract v0.1.7 | confirmed |
| `dev/SESSION_HANDOFF.md` (this file) | Current state | confirmed |
| `dev/PROJECT_INDEX.md` | Workspace map and entry points | confirmed |
| `dev/qc/2026-05-22-zero-knowledge-funnel-audit.md` | Funnel-first build roadmap SSOT — Phase X-3 spec | confirmed |
| `bin/aps.js` (current placeholder) | Phase X-2 entry — Phase X-3 嘅 skill 要 install / be triggered by 呢個 CLI | confirmed |
| `docs/guides/aps-onboarding-walkthrough.html` (especially §3 T0 拍板 + §4-§5 T2-T6 steps + §9 mid-session trigger + §10 recovery) | Skill setup subflow 嘅 source content (要 reframe 做 conversational dialogue) | confirmed |
| `docs/plans/2026-05-21-aps-phase4-plan.md` T0 / T0b / T2-T5 sections | Skill setup subflow 嘅 spec source | confirmed |
| `G:\我的雲端硬碟\Adam 工作目錄\AI_Projects\AI_Public_Squares\_hub\PROTOCOL.md` | APS runtime contract v1.0 — skill output 要對齊 | confirmed |
| Claude Code skill install convention 嘅 official docs | `.claude/skills/<name>/SKILL.md` 結構;cross-OS path;skill discovery 機制 | pending — first read pending Phase X-3 entry |
| `C:\Users\adam\_claude_desktop\GENERIC_OPERATIONAL_RUNBOOK.md` | Future GitHub 操作嘅 patterns;npm publish reference | mental load 已入返 (S9 reconcile) |

<!-- ack:section:risks-blockers -->
## Risks / Blockers

Updated for S10 closeout and v0.3.8 kit doctor repair:

1. **Real user-flow test still pending** — the 0.1.1 package path in the walkthrough still needs one throw-away-folder test beyond the install probe evidence.
2. **Phase X-3 remains next build work** — `skills/aps/SKILL.md`, setup subflow, and dialogue script are still the next substantive task.
3. **Phase X-5 Layer D repositioning remains pending** — walkthrough §1 and the Phase 4 plan still need the clearer skill-driven framing.
4. **Public history exposure accepted with caveat** — the GitHub repo is public since 2026-05-23. Historical references such as `MPEdu_Plus_Branding`, Adam-specific paths, and scan records are already exposed and treated as accepted historical evidence; a full history rewrite would be destructive and requires Adam's explicit approval.
5. **Cross-machine runtime assumptions remain untested under real load** — counterpart setup and Drive sync latency still need real execution evidence.
6. **Real-runtime kit version remains per-project** — each user's project must be checked by its own `agent-handoff-kit doctor` or skill startup check.
7. **New MCP availability is next-session dependent** — `chrome-devtools` and `context7` are registered in Codex global MCP config, but the current thread's active tool list may not hot-load them.

Closed or reclassified risks: GitHub repo private state is closed; no remote git is closed; S9 npm-channel decision is implemented via `@adamchanadam/aps` 0.1.1;npm publish timing is closed for the current `bridge-pack` scope;GitHub release and Pages verification are closed for v0.1.1.

<!-- ack:section:validation-qc -->
## Validation / QC

Current wrap-up QC summary:

- **Release verification**: commit `838d85a` pushed to `origin/main`;tag `v0.1.1` pushed;GitHub release `AI Public Squares v0.1.1` created and verified as non-draft / non-prerelease;remote `main` and tag both point to `838d85a`。
- **npm verification**: `npm view @adamchanadam/aps version dist-tags.latest bin dist.fileCount --json` confirms version `0.1.1`, `latest = 0.1.1`, bin `aps`, fileCount 8。
- **Package verification**: `npm pack --dry-run --json` confirms the tarball contains only the expected 8 package files。
- **CLI smoke test**: `node bin/aps.js --help`, `node bin/aps.js init`, and `node bin/aps.js bridge-pack --role B` passed before release commit。
- **GitHub Pages verification**: `https://adamchanadam.github.io/ai-public-squares/docs/index.html` returned HTTP 200 and contained `0.1.1` plus the verified install command。
- **Agent Handoff Kit v0.3.11 doctor**: demo Adam and demo Jay workspaces passed 46 checks;main workspace prompt mirror is repaired in this closeout and rechecked after `START_NEXT_SESSION_PROMPT.txt` regeneration。
- **MCP setup verification**: `codex mcp list` shows `chrome-devtools` and `context7` enabled;`npx chrome-devtools-mcp@latest --help` and `npx -y @upstash/context7-mcp --help` both launched successfully after forcing npm out of offline mode。

Checks deferred to next substantive session:
- Phase X-3 skill conversational quality review。
- Throw-away-folder user-flow test using the published `0.1.1` install path。
- Real cross-machine execution evidence under Drive sync conditions。

Handoff evidence location: this file (durable continuity);`dev/SESSION_LOG.md` latest entry (session evidence);`dev/qc/2026-05-25-aps-full-audit.md` (full audit evidence);GitHub release `https://github.com/Adamchanadam/ai-public-squares/releases/tag/v0.1.1`。

<!-- ack:section:workspace-identity -->
## Workspace Identity

Expected project root: `C:\Users\adam\_claude_desktop\AI_Public_Squares`
Git root: same
Branch: `main`
Latest pushed commit: `838d85a` (`release: 發佈 AI Public Squares v0.1.1`, pushed to `origin/main`;tag `v0.1.1` pushed)。
Remote: `origin` = `https://github.com/Adamchanadam/ai-public-squares.git` (**public repo since 2026-05-23**, Apache-2.0, HTTPS via Windows Credential Manager;GitHub Pages enabled serving `/ (root)` 之 `main` branch)。
Worktree / parallel workspace status: none (no `git worktree add`);siblings (`Demo_Agent_{Adam,Jay}_Public_Squares` MVP fixtures + Drive Hub) 仍 independent stores;real runtime workspaces 仲喺 each user's own machine (out of repo)。
Uncommitted changes summary: current wrap-up only updates governance continuity files (`dev/SESSION_HANDOFF.md`, `dev/SESSION_LOG.md`, `dev/PROJECT_INDEX.md`, and regenerated `START_NEXT_SESSION_PROMPT.txt`) unless Adam separately asks to commit them。

<!-- ack:section:sync-status -->
## Sync Status

Use statuses from `dev/DOC_SYNC_REGISTRY.md`: `confirmed`, `unverified`, `pending`, `blocked`, `not_applicable`.

- Project index: `confirmed` (this wrap-up — package, release, workspace identity, local doctor command, external service, and MCP notes refreshed)。
- Doc sync registry: `confirmed` (existing rows cover closeout/startup contract, workspace identity, release, npm package change, and APS public promise consistency;no new row needed)。
- Public docs / README: `confirmed` (v0.1.1 release wording already pushed;GitHub Pages checked after push)。
- External knowledge tools: `confirmed` — Drive Hub 仍 offline-available on Adam's side;Jay-side mirror `blocked` (real cross-machine onboarding pending Phase X-3 落地後 skill orchestrate)。
- APS plan / verification docs: `confirmed` (no change this session — S5 Tooling shortcut + S4 T0 split + S3 T0b carry forward;Phase 4 plan 仍 valid spec reference for skill setup subflow)。
- APS user-facing docs (`docs/index.html` + `docs/guides/` + README): `confirmed` (this turn — docs/index.html zero-knowledge rewrite;cross-doc brand sync;README zero-knowledge entry rewrite)。
- Tooling: `confirmed` — `tools/aps-onboard.ps1` from S5 unchanged;`bin/aps.js` new (Phase X-2 placeholder);`tools/` 同 `bin/` 平行存在(`tools/` 處理 governance file ops;`bin/` 係 npm CLI)。
- QC vocabulary: `confirmed` (no change this turn)。
- npm package: `confirmed` (`@adamchanadam/aps` 0.1.1 published and verified as latest)。
- GitHub remote: `confirmed` (`origin/main` and tag `v0.1.1` point to `838d85a`;GitHub release published)。
- Codex MCP config: `confirmed` (`chrome-devtools` and `context7` registered globally;tool availability requires new Codex session / restart if not hot-loaded)。

<!-- ack:section:state-reconciliation-check -->
## State Reconciliation Check

At full closeout, complete this check after updating the state sections above.

- Reconciled at: 2026-05-26 wrap-up — v0.1.1 npm publish / commit / tag / push / GitHub release / GitHub Pages verification complete;Codex `chrome-devtools` and `context7` MCP servers registered;Agent Handoff Kit v0.3.11 checked across main + demo workspaces;prompt mirror regenerated.
<!-- ack:field:state-sections-rewritten-or-confirmed -->
- State sections rewritten or confirmed current: Last Updated;Durable Anchors governance version;Current Baseline;Completed This Session;Next Priorities;Risks / Blockers;Validation / QC;Workspace Identity;Sync Status;State Reconciliation Check;Handoff Sufficiency Check;Next Session Opening Message;SESSION_LOG N-rule archive.
<!-- ack:field:stale-snapshots-left -->
- Stale snapshots left in this handoff: historical S9/S10 narrative remains in `dev/SESSION_LOG.md` and selected background lines;current-state sections above supersede it. S1 raw log was moved to `dev/SESSION_LOG_archive/archive_001_2026-05-20_to_2026-05-20.md`.
<!-- ack:field:lifecycle-conflicts-resolved -->
- Completed / pending / risk / opening-message lifecycle conflicts resolved or explicitly reclassified: yes — v0.1.1 release, push, GitHub release, and Pages verification are closed;user-flow test, Phase X-3, Phase X-5, and real cross-machine runtime checks remain explicitly listed as next work.
<!-- ack:field:opening-message-matches-current-state -->
- Opening message matches current state: yes — `START_NEXT_SESSION_PROMPT.txt` regenerated from this handoff at wrap-up and verified by doctor.
<!-- ack:field:next-ai-can-continue -->
- Next AI can continue from `AGENTS.md`, this handoff, `dev/PROJECT_INDEX.md`, `dev/qc/2026-05-22-zero-knowledge-funnel-audit.md`, and needed rule packs without searching old log history: yes — current objective, release state, MCP boundary, remaining risks, and required reading are in this file.

If any answer is no, blocked, or uncertain, fix this handoff before declaring handoff ready.

Lifecycle consistency rule: compare `Completed This Session`, `Validation / QC`, `Next Priorities`, `Risks / Blockers`, and `Next Session Opening Message`. A completed or verified item must not remain as an unresolved next priority, active risk, or startup instruction unless it is explicitly reclassified as monitor-only, follow-up scope, blocked, or reopened with the missing evidence or trigger condition stated.

<!-- ack:section:handoff-sufficiency-check -->
## Handoff Sufficiency Check

Can the next AI continue from `AGENTS.md`, this handoff, `dev/PROJECT_INDEX.md`, and needed rule packs without searching old log history?

Answer: yes. The next session can start from the opening message below plus the startup read order.

If no, update this handoff before closeout.

Continuity rule: this file carries current state and next action。`dev/SESSION_LOG.md` carries recent evidence only。Archive old detail only when needed;do not create an archive directory by default。

<!-- ack:section:next-session-opening-message -->
## Next Session Opening Message

📋 Next session: copy and paste the whole block below

```text
Work in C:\Users\adam\_claude_desktop\AI_Public_Squares (template SSOT — pure generic APS template;not bound to any specific project;published as `@adamchanadam/aps` npm package + GitHub repo Adamchanadam/ai-public-squares — **public since 2026-05-23**;GitHub Pages enabled at https://adamchanadam.github.io/ai-public-squares/).

Current closeout (2026-05-26): `@adamchanadam/aps` v0.1.1 is published and verified as npm latest;commit `838d85a` is pushed to `origin/main`;tag `v0.1.1` is pushed;GitHub release is live at https://github.com/Adamchanadam/ai-public-squares/releases/tag/v0.1.1;GitHub Pages `docs/index.html` returned HTTP 200 and contains the v0.1.1 install wording. Current verified package path is `npm install --save-dev @adamchanadam/aps` then `npx aps bridge-pack`;full `npx aps init` orchestration remains pending.

Codex global MCP config now includes `chrome-devtools` (`chrome-devtools-mcp@latest`, usage statistics disabled) and `context7` (`@upstash/context7-mcp`, no API key stored). They may require a new Codex session or Codex Desktop restart before appearing in the active tool list.

Agent Handoff Kit v0.3.11 status: main APS workspace doctor passes after this wrap-up;`Demo_Agent_Adam_Public_Squares` and `Demo_Agent_Jay_Public_Squares` also pass v0.3.11 doctor(46 checks each). Demo workspaces still have their own uncommitted governance upgrade files;do not edit them from this APS root unless explicitly asked.

Read in order:
1. AGENTS.md
2. dev/SESSION_HANDOFF.md
3. dev/SESSION_LOG.md(含 2026-05-26 wrap-up entry at top)
4. dev/PROJECT_INDEX.md
5. dev/RULE_PACKS.md
6. dev/qc/2026-05-22-zero-knowledge-funnel-audit.md (Phase X-3 spec source)

Read dev/DOC_SYNC_REGISTRY.md before file changes or closeout.

QC vocabulary (S6): if user invokes 「跑快檢 / 跑外發前檢 / 跑全面檢」 (or English aliases quick-check / release-check / full-check), load dev/qc/triggers.md and run the specified tier. If user uses 含混詞 (「做 QC / 跑驗收 / 整體 audit / QC」), stop and ask 「你指快檢 / 外發前檢 / 全面檢?」.

If this root does not match the expected project root, stop and ask for confirmation.

GitHub remote `origin` at https://github.com/Adamchanadam/ai-public-squares.git (public, Apache-2.0, HTTPS via Windows Credential Manager auto-auth);GitHub Pages serving `/ (root)` of `main` branch at https://adamchanadam.github.io/ai-public-squares/。

Voice hard rule (per memory feedback-doc-voice + feedback-plain-language):所有寫畀人睇嘅文檔嚴格用當代繁體書面語;粵語 colloquial(嘅 / 嗰 / 咗 / 唔 / 呢個 等)只容許於 verbatim 用戶觸發句 quote 之內(「Hub 有新嘢」 / 「check Hub」 等)。Chat reply 同樣 plain,internal framework name(Phase X / Layer A/B/C/D / Stage 0-7)不做句子主體。

Documentation governance hard rule (per S10 Adam principle):HTML 內(site-nav / body callout / body table)不 link 任何 .md 檔(瀏覽器顯示 plain text,broken UX);如要 reference .md 用 plain `<span class="path">` 顯示。.md 屬 AI / 維護者層 spec source。

Next active objective: **Phase X-3 起手 — `skills/aps/SKILL.md` + setup subflow first draft + dialogue script first pass**。Other pending:real user-flow test in a throw-away folder using v0.1.1 install path;Phase X-5 Layer D document repositioning;real cross-machine Drive round-trip evidence.

User-facing entry: README.md + docs/index.html (hosted via GitHub Pages at https://adamchanadam.github.io/ai-public-squares/docs/index.html)。設置教學 walkthrough 已對齊 npm package 0.1.1 path;讀者先執行 `npm install --save-dev @adamchanadam/aps`,再執行 `npx aps bridge-pack > dev/rules/aps-bridge.md` 取得 fixture。Funnel audit roadmap: dev/qc/2026-05-22-zero-knowledge-funnel-audit.md。

After reading, summarize current objective, confirmed decisions, pending work, risks, and the next recommended action.
```
