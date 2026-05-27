# Session Handoff

Last Updated: 2026-05-27 (0.2.2 pre-release published; local HTML onboarding flow rechecked and corrected; project remains ⚠️ pre-release)

<!-- ack:section:durable-anchors -->
## Durable Anchors

Stable facts that should survive across sessions. Update only when they change, but verify they still match reality at closeout.

1. Project root and boundary: `C:\Users\adam\_claude_desktop\AI_Public_Squares` — design / plan / verification SSOT workspace for the AI Public Squares (APS) project. Not a product runtime;carries the protocol design, implementation plans, MVP verification report, user-facing entry pages (README + docs/index.html), npm package source (`@adamchanadam/aps`), and zero-knowledge funnel build roadmap。
2. Product / system identity: AI Public Squares (formerly "Agent Public Square") — a cross-machine collaboration protocol for two AI agents working on the same project, distributed as an npm package (`@adamchanadam/aps`, Apache-2.0)。Uses a Google-Drive-synced Hub Root with single-writer lanes, immutable versioned packets, an append-only ledger, and a thin Bridge Pack that wires inbox detection into each agent's agent-handoff-kit startup。Current verified package path: `npm install --save-dev @adamchanadam/aps`, then `npx aps init --dry-run`, then `npx aps init --hub-root ... --project ... --agent-id ... --other-agent-id ... --role A|B` for pre-release setup。
3. Governance model: Agent Handoff Kit v0.3.11 managed-core block at `AGENTS.md`。External skill flows, subagent plans, and demo-workspace closeouts are subordinate evidence per AGENTS.md §2 and §5;only the active project root's kit persistence completes a task。
4. Source-of-truth ownership: this workspace owns the APS design + implementation plan + verification report + project entry HTML + README + npm package source (`bin/aps.js`) + zero-knowledge funnel audit roadmap;the Drive Hub at `G:\我的雲端硬碟\Adam 工作目錄\AI_Projects\AI_Public_Squares\` owns runtime `PROTOCOL.md` + templates + lane data + CHANGELOG;the two Demo Agent workspaces (`C:\Users\adam\_claude_desktop\Demo_Agent_{Adam,Jay}_Public_Squares\`) own their per-agent Bridge Pack and round-trip session evidence。GitHub remote `origin` at `https://github.com/Adamchanadam/ai-public-squares.git` (public,Apache-2.0)。
5. Release / publish boundary: GitHub repo public since 2026-05-23;GitHub Pages enabled (`Settings → Pages → Source: Deploy from a branch, Branch: main, Folder: / (root)`)。npm `@adamchanadam/aps` 0.2.2 pre-release is published and verified as latest;tag `v0.2.2` points to `b8883cbaab63f3aa42162d66679424e8155b461b`;GitHub release `v0.2.2` is live as pre-release at `https://github.com/Adamchanadam/ai-public-squares/releases/tag/v0.2.2`。0.2.2 includes `bridge-pack`, `init` skill installer for Claude Code / Codex, initial Hub skeleton / Bridge Pack / starter pack generation, minimal CLI `publish` / `inbox` / `consume` / `close` round-trip, `revise`, `withdraw`, read-only `doctor`, saved `.aps/config.json`, `config`, and short daily command defaults。Project remains ⚠️ pre-release:natural-language daily use and recovery orchestration are not production-complete;each real project still needs its own Drive verification。

<!-- ack:section:closeout-reconciled-state -->
## Closeout-Reconciled State

This is the current-state area. At every full closeout, rewrite or explicitly confirm every section below. Do not append a new state snapshot under an old one.

**Note:** S10 (2026-05-23) **formal closeout reconcile**。S9(2026-05-22)累積之 funnel-first vision shift + Layer A entry + voice rewrite 全完成並 push;S10 跨多輪 audit + scope expansion(HTML 公開面 .md hyperlink strip + npm bridge-pack sub-command + 設置教學 取消 clone repo prereq + repo 轉 public + GitHub Pages enable + README absolute URL + voice 額外 scope + Agent Handoff Kit 網址 fix)。SESSION_LOG S10 entry 記錄完整 work。

<!-- ack:section:current-baseline -->
## Current Baseline

1. Project root: `C:\Users\adam\_claude_desktop\AI_Public_Squares` (Windows;git branch `main`;repo public since 2026-05-23;0.2.1 release commit `d9dd1aa1acf2b2f5c863056382543922c5c0aeb4` pushed;tag `v0.2.1` and GitHub pre-release complete)。
2. Product / system state: APS MVP complete + zero-knowledge entry work continuing。npm package `@adamchanadam/aps` 0.2.2 pre-release is published and verified as latest;CLI supports `bridge-pack`, `init`, Hub skeleton setup, minimal `publish` / `inbox` / `consume` / `close` commands, immutable packet `revise`, unconsumed `withdraw`, read-only Hub `doctor`, saved `.aps/config.json`, `config`, and short daily command defaults。After setup, `doctor`, `inbox`, `publish`, `consume`, `revise`, `withdraw`, and `close` can omit Hub / project / agent long flags。Published install probe passed using the documented path (`npm install --save-dev @adamchanadam/aps@0.2.2`, then `npx aps --help`)。`README.md`, `docs/index.html`, `docs/guides/index.html`, and `docs/guides/aps-onboarding-walkthrough.html` point first-time users to the CLI-first setup path and keep the project marked as pre-release。Local README, `docs/index.html`, and `docs/guides/aps-onboarding-walkthrough.html` now explicitly tell users that Agent Handoff Kit `init` prints a write plan and requires typing `yes` before `doctor` can pass。README quick-start uses `aps init --dry-run` followed by full `aps init --hub-root ...` setup, matching the HTML path。`skills/aps/SKILL.md` has setup, daily publish / inbox / consume / close, and recovery guidance aligned to the 0.2.2 CLI surface。S10 documentation governance remains in force:HTML public pages do not link `.md`;`.md` remains AI / maintainer spec substrate。
3. Governance state: Agent Handoff Kit v0.3.11 managed-core in place。`Demo_Agent_Adam_Public_Squares` and `Demo_Agent_Jay_Public_Squares` both pass v0.3.11 doctor(46 checks)。This main workspace had one prompt-mirror drift before wrap-up;this closeout regenerates `START_NEXT_SESSION_PROMPT.txt` from this handoff and re-runs doctor。
4. Source-of-truth notes: `dev/qc/2026-05-22-zero-knowledge-funnel-audit.md` remains funnel-first build roadmap;`README.md` + `docs/index.html` describe the published 0.2.2 pre-release boundary;`package.json` + `bin/aps.js` are npm CLI source;`examples/demo-agent-{a,b}/dev/rules/aps-bridge.md` are Bridge Pack fixture canonical source shipped in npm tarball;`skills/aps/references/setup-dialogue.md` is the bundled setup wording bank for npm-installed skill runtime;`docs/plans/2026-05-23-aps-skill-dialogue-script.md` remains the repo long-form maintenance draft;`LICENSE` is Apache-2.0。

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

Current active objective after this pass:**run real Adam ↔ Jay short-command rehearsal using npm latest 0.2.2 before any production claim.** 0.2.2 push / tag / GitHub pre-release / npm publish / registry readback / Pages readback are complete。

Funnel audit doc (`dev/qc/2026-05-22-zero-knowledge-funnel-audit.md`) 嘅 6 phase build order:
- ✅ Phase X-1 Layer A entry (README rewrite + docs/index.html rewrite + cross-doc site-nav brand sync) — **done**
- ✅ Phase X-2 npm package + install path — **0.2.1 pre-release published** with `bridge-pack`, `init`, Hub skeleton, skill installer, minimal packet CLI, `revise`, `withdraw`, and read-only `doctor`
- 🔄 Phase X-3 skill setup subflow + dialogue script — **setup + daily-use first pass drafted and published as pre-release** (`skills/aps/SKILL.md` + bundled `skills/aps/references/setup-dialogue.md`;dialogue script aligned to CLI packet folder / outbox / ack model)
- 🔄 Phase X-4 skill daily-use + recovery subflow — **0.2.2 pre-release adds saved config + short daily commands;natural-language operation and recovery remain pre-release**
- ✅ Phase X-5 Layer D doc re-position — walkthrough §1 now tells users they can say `set up APS` / 「教我用 APS」;Phase 4 plan now contains the skill-driven UX cross-reference
- ⏳ Phase X-6 auto-update mechanism

之前 S8 嘅 3 個 independent thread (T0b execution / Block 4A / T0 lock with User B) 仍然有效但 **deferred**:Phase X-3 (skill setup subflow) 落地之後,Bridge Pack T0b polish 可以由 skill 自動處理 (skill 第一次跑時自動 patch demo workspace 嘅 Bridge Pack) — 即係 T0b 唔再係 manual thread,變 skill 嘅 first step。Block 4A 同 T0 lock 都會由 skill orchestrate。

<!-- ack:section:completed-this-session -->
## Completed This Session

Record only work actually completed in the current session.

1. **Setup-first skill draft landed** — `skills/aps/SKILL.md` now states the current 0.2.0 pre-release boundary, points runtime wording to bundled `references/setup-dialogue.md`, and marks the verified CLI flow separately from still-hardening natural-language operation / recovery capability。
2. **Bundled setup dialogue reference added** — new `skills/aps/references/setup-dialogue.md` contains setup wording for greeting, prerequisite checks, three setup decisions, default confirmation, starter pack, first dry-run, and hard boundaries。It is included by `npm pack --dry-run`, unlike repo-only `docs/plans/` files。
3. **Long-form dialogue script repositioned** — `docs/plans/2026-05-23-aps-skill-dialogue-script.md` now identifies itself as repo long-form maintenance draft, while the npm-readable compact runtime reference lives under `skills/aps/references/`。
4. **Project index updated** — `dev/PROJECT_INDEX.md` now records the bundled setup wording bank under `skills/` and keeps `init` marked as not fully runtime-tested。
5. **Safety boundary tightened** — recovery draft no longer instructs direct Bash deletion or move operations;it now requires path / impact / recovery disclosure and explicit user confirmation before any destructive or structural file operation。
6. **`init` skill installer implemented locally** — `bin/aps.js init` now supports `--target claude|codex|both` and `--dry-run`, installs from bundled `skills/aps/` into personal skill directories, and refuses to overwrite an existing `aps` skill directory。
7. **README npm URL bug fixed** — the Agent Handoff Kit bare URL in README is now a Markdown link, so npm's README renderer should not include trailing punctuation in the URL。
8. **Public status wording updated** — README and `docs/index.html` now say the local next version supports Claude Code / Codex skill installation while Google Drive Hub setup and cross-machine flow remain unfinished。
9. **Disposable install smoke test completed** — with HOME / USERPROFILE redirected to `dev/qc/evidence/2026-05-26-init-installer-smoke/home`, `node bin/aps.js init` installed both `.claude/skills/aps` and `.codex/skills/aps`;a second run correctly refused to overwrite;installed `SKILL.md` hashes match the source。
10. **Local tarball install test completed** — `npm pack` tarball installed into disposable workspace with project-local npm cache;workspace `npx aps init --dry-run`, `npx aps init`, and `npx aps bridge-pack --role B` all work;second `npx aps init` correctly exits 1 when skill dirs already exist;installed `SKILL.md` hashes match source。
11. **Initial Hub setup implemented and verified** — bundled `resources/protocol/PROTOCOL.md` + templates added;`init --hub-root ... --project ... --agent-id ... --other-agent-id ... --role A|B` creates `_hub/`, templates, lane skeletons, ack files, local `dev/rules/aps-bridge.md`, and counterpart starter pack。Source and tarball-installed package paths both passed disposable Hub setup tests。
12. **Minimal CLI round-trip implemented** — `bin/aps.js` now exposes `publish`, `inbox`, `consume`, and `close` commands;`publish` requires an existing lane outbox, writes immutable v1 packet folders, and appends outbox events;`inbox` computes pending items from the other side's outbox and local ack;`consume` writes local ack entries;`close` verifies the packet exists in the sender's own outbox and is not already closed before appending a close event。
13. **Round-trip evidence captured** — source CLI and packed-tarball CLI both completed Adam publish → Jay inbox → Jay consume → Jay reply → Adam inbox → Adam consume → Adam close;final inbox checks returned no pending items for both agents。Evidence roots are under ignored `dev/qc/evidence/2026-05-26-roundtrip-cli-*` directories。
14. **Public promise boundary updated** — README, `docs/index.html`, walkthrough, skill spec, dialogue script, project index, and sync registry now say the local development version has a minimal CLI round-trip, while natural-language daily use, recovery orchestration, and real cross-machine Google Drive use remain unverified。
15. **Package version bumped and published** — `package.json` is now `0.2.0`, matching the published pre-release package on npm。
16. **Skill-level daily-use first pass drafted** — `skills/aps/SKILL.md` now routes publish / inbox / consume / close through the verified CLI commands;publish requires user confirmation before writing;inbox summarizes CLI output before consume;consume writes a concrete result;close is limited to the sender's own outbox;recovery remains non-destructive diagnostics unless the user explicitly confirms a listed file operation。
17. **Dialogue references aligned** — bundled `skills/aps/references/setup-dialogue.md` now uses `npx aps publish` for first setup dry-run;repo long-form dialogue script now uses packet folders, outbox, ack, and CLI commands instead of old single-file packet examples。
18. **Isolated skill-level rehearsal passed** — disposable workspace `dev/qc/evidence/2026-05-26-skill-rehearsal-20260526-162256/` installed the local package, redirected `USERPROFILE` to a fake home, installed both Claude Code and Codex skill folders, created a local Hub, completed Adam publish → Jay inbox → Jay consume → Jay reply → Adam inbox → Adam consume → Adam close → Jay close, and ended with no pending inbox items for either agent。
19. **`init` rerun semantics fixed** — `bin/aps.js init` now treats existing skill / Hub / Bridge Pack files as safe skips with exit 0;only true install failures return non-zero。
20. **Throw-away zero-knowledge flow passed** — fresh workspace `dev/qc/evidence/2026-05-26-zero-knowledge-flow/workspace` installed local `@adamchanadam/aps@0.2.0` tarball, used fake home skill directories, ran `init --dry-run`, created Hub `launch_notes`, completed Adam publish → Jay inbox → Jay consume → Jay reply → Adam inbox → Adam consume → both close, and ended with no pending inbox items for either agent。First `npm install` failed inside sandbox cache creation and then passed with approved escalation;one rerun used a wrong relative tarball path and was corrected to an absolute tarball path。
21. **Formal 🟡 外發前檢 run and fixed package-surface drift** — `resources/protocol/templates/ack.json.example` and shipped demo Bridge Pack examples no longer contain the old `mpedu_plus_branding` slug in package-facing surfaces;they now use generic `example_project` / `example_agent` values。
22. **HTML preview evidence captured** — DevTools rendered `docs/index.html`, `docs/guides/aps-onboarding-walkthrough.html`, and `docs/qc/governance-map.html` with no console messages;full-page screenshots are under `dev/qc/evidence/2026-05-26-release-check-html/`。
23. **Formal 🔴 全面檢 run for 0.2.0 release-prep** — `dev/qc/2026-05-26-aps-full-audit.md` records the nested checks, cross-workspace read-only audit, same-machine protocol regression, startup addendum trace, real Adam ↔ Jay Google Drive round-trip evidence, and the remaining commit-before-publish gate。
24. **Real cross-machine Google Drive verification passed** — Adam published `20260526T173931Z__drive_sync_check` on the true Drive Hub project `aps_real_drive_check`;Jay replied from her own machine with `20260526T175057Z__drive_sync_reply`;Adam read Jay's outbox / packet / ack back from Drive, consumed it, closed both packets, and final inbox checks returned no pending items for Adam or Jay。
25. **0.2.0 pre-release published** — Adam authorized commit / publish;release commit `47bf2d29c8bae7339730d9b655dadbf0b8da64da` was pushed to `origin/main`;tag `v0.2.0` was pushed;GitHub release `v0.2.0` was created as pre-release;`npm publish --access public` published `@adamchanadam/aps@0.2.0` and registry readback confirms latest = `0.2.0` with 14 files。
26. **Post-publish readback completed** — GitHub release readback confirms `isPrerelease=true`;GitHub Pages returned HTTP 200 and contains `0.2.0` plus pre-release wording;published package install probe passed with the documented install path. One-off `npx @adamchanadam/aps@0.2.0 --help` remains unreliable and is not the documented user path。
27. **Internal document alignment check completed** — post-publish drift scan classified history logs, old audit reports, release notes, governance migration backups, and security-rule phrases as historical / false-positive;current-state fixes were applied to `dev/PROJECT_DECISIONS.md`, `dev/PROJECT_INDEX.md`, `skills/aps/SKILL.md`, `skills/aps/references/setup-dialogue.md`, and `docs/index.html` so they no longer imply that 0.2.0 is unpublished or that no real Drive verification exists。
28. **Public new-user walkthrough / UX wording corrected** — README, `docs/index.html`, `docs/guides/index.html`, and `docs/guides/aps-onboarding-walkthrough.html` now use the 0.2.0 CLI-first setup path, remove stale manual-first / not-yet-available framing, mark day-to-day use as pre-release trial use, and route correction requests through maintainer / issue flow。
29. **0.2.1 CLI hardening implemented and published** — `package.json` is now 0.2.1;`bin/aps.js` adds `revise`, `withdraw`, and read-only `doctor`;CLI success messages now surface next-step guidance;`.gitignore` ignores `dev/qc/evidence/`;`dev/DOC_SYNC_REGISTRY.md` and `dev/PROJECT_INDEX.md` now include the expanded smoke path;npm readback confirms `@adamchanadam/aps` latest = `0.2.1`。
30. **Layer D repositioning completed locally** — walkthrough §1 now points skill users to `set up APS` / 「教我用 APS」;Phase 4 plan now has a “Skill-driven UX layer” section explaining that the long-form plan is maintainer substrate, not the only first-user path。
31. **0.2.1 pre-release published** — Adam authorized push / tag / GitHub release / npm publish;`main` was pushed, tag `v0.2.1` was pushed, GitHub release `v0.2.1` was created as a pre-release, and npm `@adamchanadam/aps@0.2.1` was published. Registry readback confirms latest = `0.2.1` with bin `aps` and 14 files。
32. **0.2.2 short-command candidate implemented** — `package.json` became 0.2.2;`bin/aps.js init --hub-root ...` writes `.aps/config.json`;new `aps config` can view or update local APS config;daily commands can now omit Hub / project / agent long flags and use saved defaults。Throw-away workspace evidence under `dev/qc/evidence/2026-05-27-config-shortcmd-*` passed init → config → doctor → publish → inbox → consume → revise → publish → withdraw → inbox → close → doctor。
33. **Formal 🟡 外發前檢 for 0.2.2 passed** — `dev/qc/triggers.md` was used as the single source of truth;doctor passed 46 checks;package / CLI checks passed;HTML `.md` hyperlink audit, stale long-command scan, false published-0.2.2 scan, and stale 0.2.0 public wording scan all returned 0 hits after correction;headless Chrome rendered the current HTML surfaces and screenshots were saved under `dev/qc/evidence/2026-05-27-release-check-022-*`。
34. **0.2.2 pre-release published and read back** — `main` was pushed through commit `b8883cb`;tag `v0.2.2` was pushed and points to `b8883cbaab63f3aa42162d66679424e8155b461b`;GitHub release `v0.2.2` was created as pre-release;`npm publish --access public` published `@adamchanadam/aps@0.2.2`;registry readback confirms latest = `0.2.2`, bin `aps`, fileCount 14;documented install path probe passed;GitHub Pages returned HTTP 200 with `0.2.2` and pre-release wording。
35. **Local README / HTML onboarding flow rechecked and corrected** — a throw-away run showed Agent Handoff Kit `init` requires the user to type `yes` after reviewing the write plan;the upstream Agent Handoff Kit README was then read back and confirmed the official command form is `npx --yes @adamchanadam/agent-handoff-kit@latest init`。Local README, `docs/index.html`, and `docs/guides/aps-onboarding-walkthrough.html` now use this upstream-aligned form;README quick-start now uses `aps init --dry-run` plus the full `aps init --hub-root ...` command;the walkthrough wording also changed “5 / 6 governance files” claims to “關鍵入口檔案” plus `doctor status passed`, matching Agent Handoff Kit v0.3.11 behavior。An isolated rerun with `yes` passed: init created 20 required files and `doctor` passed 46 checks。This correction is local until committed and pushed。

<!-- ack:section:next-priorities -->
## Next Priorities

Per funnel audit roadmap 順序,update for post-S9 mid-session reconcile:

1. **Run real Adam ↔ Jay short-command rehearsal** with npm latest 0.2.2: both sides install from npm, run setup, then test `npx aps inbox`, `npx aps doctor`, `npx aps publish --topic ... --body ...`, consume, reply, and close。
2. **Natural-language daily-use and recovery hardening**:0.2.2 reduces CLI friction, but skill-mediated natural-language operation still needs real Adam ↔ Jay rehearsal before any production claim。
3. **Auto-update mechanism**:`npx aps update` + skill startup auto-check Bridge Pack version can be deferred。
4. **Per-project Drive verification**:the Adam ↔ Jay true Drive test passed for the maintained test project;new real projects still need their own path / sync / offline-available checks。
5. **Keep pre-release boundary**:0.2.2 is published as pre-release;natural-language daily operation / recovery remains hardening work, not production-ready。

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
| Claude Code skill install convention official docs | `.claude/skills/<name>/SKILL.md` structure;cross-OS path;skill discovery mechanism | confirmed — official Claude Code skills docs read on 2026-05-26;key point: `description` is the main trigger, supporting files can live under the skill directory |
| `C:\Users\adam\_claude_desktop\GENERIC_OPERATIONAL_RUNBOOK.md` | Future GitHub 操作嘅 patterns;npm publish reference | mental load 已入返 (S9 reconcile) |

<!-- ack:section:risks-blockers -->
## Risks / Blockers

Updated after 0.2.2 pre-release publish:

1. **Project remains ⚠️ pre-release** — 0.2.2 is published and reduces CLI friction, but natural-language daily operation / recovery orchestration are not production-complete。
2. **Per-project Drive checks remain required** — Adam ↔ Jay true Drive verification passed for `aps_real_drive_check`;other real projects must still verify their own Hub path, offline availability, and packet propagation。
3. **0.2.2 short commands need real Adam ↔ Jay rehearsal** — throw-away workspace evidence passed, but Jay real-machine rehearsal has not yet repeated the saved-config short-command flow。
4. **Public history exposure accepted with caveat** — the GitHub repo is public since 2026-05-23. Historical references such as `MPEdu_Plus_Branding`, Adam-specific paths, and scan records are already exposed and treated as accepted historical evidence; a full history rewrite would be destructive and requires Adam's explicit approval。
5. **Published package install path boundary** — documented path is `npm install --save-dev @adamchanadam/aps` then `npx aps ...`;one-off version-qualified `npx @adamchanadam/aps@<version> --help` remains unreliable in this Windows/npm environment。
6. **Real-runtime kit version remains per-project** — each user's project must be checked by its own `agent-handoff-kit doctor` or skill startup check。
7. **New MCP availability is next-session dependent** — `chrome-devtools` and `context7` are registered in Codex global MCP config, but the current thread's active tool list may not hot-load them。

Closed or reclassified risks: GitHub repo private state is closed; no remote git is closed; S9 npm-channel decision is implemented via `@adamchanadam/aps`;npm publish timing is closed for 0.2.1 pre-release;GitHub release, npm registry readback, GitHub Pages readback, and real Adam ↔ Jay Drive verification are closed for this release scope。

<!-- ack:section:validation-qc -->
## Validation / QC

Current wrap-up QC summary:

- **Package inclusion**: `npm pack --dry-run --json` and registry readback confirm package `@adamchanadam/aps@0.2.1` with 14 package files, including `skills/aps/SKILL.md`, `skills/aps/references/setup-dialogue.md`, `resources/protocol/PROTOCOL.md`, and all protocol templates。
- **CLI smoke test**: `node --check bin/aps.js` passes;`node bin/aps.js --help`, `node bin/aps.js init --dry-run`, `node bin/aps.js init --target claude --dry-run`, `node bin/aps.js init --target codex --dry-run`, and `node bin/aps.js bridge-pack --role B` pass;invalid `--target`, bad packet id, missing outbox paths, and `bogus` fail with exit 1 as expected。
- **Disposable install smoke test**: `node bin/aps.js init` with HOME / USERPROFILE redirected to `dev/qc/evidence/2026-05-26-init-installer-smoke/home` installs both Claude Code and Codex skill folders;second run exits 1 and refuses overwrite;SHA256 hash for installed `SKILL.md` matches source for both targets。
- **Local tarball install test**: `npm pack` output installed into disposable workspace with project-local npm cache;workspace `npx aps init --dry-run` and `npx aps init` pass with HOME / USERPROFILE redirected to `package-home`;workspace `npx aps bridge-pack --role B` passes;second `npx aps init` exits 1 and refuses overwrite;installed `SKILL.md` hashes match source。
- **Hub setup smoke test**: source `node bin/aps.js init --hub-root <tmp> --project branding_2026 --agent-id adam --other-agent-id jay --role A` creates expected Hub skeleton and local Bridge Pack;second run exits 1 and refuses overwrite。Tarball-installed workspace `npx aps init --hub-root <tmp> --project launch_plan --agent-id adam --other-agent-id jay --role A` also creates expected Hub skeleton;`npm pack --dry-run` confirms 14 package files including `resources/protocol/PROTOCOL.md` and all protocol templates。
- **Source CLI round-trip**: disposable Hub under `dev/qc/evidence/2026-05-26-roundtrip-cli-20260526-155532/` completed Adam publish → Jay inbox → Jay consume → Jay reply → Adam inbox → Adam consume → Adam close;final inbox checks for both agents returned no pending items。
- **Packed tarball round-trip**: `npm pack` output was extracted and executed directly from `package/bin/aps.js`;disposable Hub under `dev/qc/evidence/2026-05-26-roundtrip-cli-20260526-160305/` completed the same round-trip;final inbox checks for both agents returned no pending items。This verifies the shipped tarball contents, not only the source tree。
- **HTML `.md` hyperlink audit**: precise grep `href=["'][^"']+\.md` across `docs/**/*.html` returned 0 hits。
- **Skill boundary scan**: grep confirms no stale unpublished-state wording in the edited skill and dialogue files;no `Bash 刪除` / `Bash mv` recovery instructions remain。
- **Skill daily-use alignment scan**: `SKILL.md`, bundled setup dialogue, and long-form dialogue script no longer reference old `packet-test-001` / `packet-q1-*` single-file packet paths;publish / inbox / consume / close examples now use current CLI commands and packet folder / outbox / ack vocabulary。
- **Isolated skill-level rehearsal**: disposable workspace `dev/qc/evidence/2026-05-26-skill-rehearsal-20260526-162256/` completed setup → publish → inbox → consume → reply → inbox → consume → close for both sides;final inbox checks returned no pending items for Adam or Jay. `init` safe-skip rerun now exits 0 after the CLI fix。
- **Throw-away zero-knowledge flow**: fresh workspace `dev/qc/evidence/2026-05-26-zero-knowledge-flow/workspace` installed local tarball `@adamchanadam/aps@0.2.0`, redirected `USERPROFILE` / `HOME` to `dev/qc/evidence/2026-05-26-zero-knowledge-flow/home`, ran `aps init --dry-run`, ran `aps init --hub-root ... --project launch_notes --agent-id adam --other-agent-id jay --role A`, completed Adam publish → Jay inbox → Jay consume → Jay reply → Adam inbox → Adam consume → Adam close → Jay close, and final inbox checks returned no pending items for Adam or Jay。The first sandboxed `npm install` hit EPERM on the project-local npm cache, then passed with approved escalation;one rerun used an incorrect relative tarball path and was corrected with an absolute tarball path。
- **Formal 🟡 外發前檢**: after the throw-away flow, `dev/qc/triggers.md` was used as the single source of truth. Inner quick-check passed;the five external checks passed after fixing package-facing drift: packaged placeholder scan now has no `mpedu_plus_branding` / MPEdu hits in `resources/`, `examples/`, README, public HTML, skill, package, or CLI;cross-read of README / public docs / skill / CLI / package boundary stayed consistent;DevTools rendered index / walkthrough / governance-map with no console messages and screenshots saved under `dev/qc/evidence/2026-05-26-release-check-html/`;secrets scan found only safety-policy mentions, no credential values;voice scan hits are limited to quoted trigger phrases or explicit voice-rule examples。`npm pack --dry-run --json` confirms the 14-file 0.2.0 package includes the corrected resources and examples。
- **Formal 🔴 全面檢**: `dev/qc/2026-05-26-aps-full-audit.md` created and updated with real Drive evidence and post-publish readback。Main workspace doctor passed 46 checks with only the existing SESSION_LOG N-rule warning;Demo Adam and Demo Jay doctors passed 46 checks each;same-machine protocol regression under `dev/qc/evidence/2026-05-26-full-check-regression-2/` completed publish → inbox → consume → reply → consume → close and ended with no pending items for Adam or Jay。Real cross-machine Drive test also passed: Adam packet `20260526T173931Z__drive_sync_check`, Jay reply `20260526T175057Z__drive_sync_reply`, both consumed / closed, no pending items for either side。Post-publish checks confirm GitHub release pre-release status, npm latest `0.2.0`, GitHub Pages `0.2.0` wording, and published package install probe。
- **0.2.0 publish verification**: release commit `47bf2d29c8bae7339730d9b655dadbf0b8da64da` was pushed;tag `v0.2.0` was pushed and points to the release commit;GitHub release `v0.2.0` readback confirms `isPrerelease=true` and `isDraft=false`;`npm view @adamchanadam/aps version dist-tags.latest bin dist.fileCount --json` confirms version `0.2.0`, latest `0.2.0`, bin `aps`, fileCount 14;GitHub Pages readback returned HTTP 200 and contains `0.2.0` plus pre-release wording;published package install probe passed via the documented install path。
- **Voice scan**: colloquial markers in `skills/aps/SKILL.md` and `skills/aps/references/setup-dialogue.md` only appear inside trigger-phrase examples or the explicit voice rule;the new setup reference prose is written in standard Traditional Chinese。
- **Whitespace check**: `git diff --check` reports no whitespace errors;only existing LF→CRLF warnings for touched markdown files。
- **Local 0.2.1 CLI hardening smoke test**: disposable Hub under `dev/qc/evidence/2026-05-26-devtasks-*` completed `init` with fake HOME / USERPROFILE, `publish`, `inbox`, `revise`, second `inbox`, `withdraw`, third `inbox` returning no pending items, second `publish`, `consume`, `close`, and read-only `doctor` with `status: passed`。A focused rerun under `dev/qc/evidence/2026-05-26-devtasks-rerun2-*` confirmed that `withdraw --version 1` fails once latest is v2, latest withdraw succeeds, duplicate withdraw fails, and `doctor` still passes。
- **Local 0.2.1 package preview**: `npm pack --dry-run --json` confirms package id `@adamchanadam/aps@0.2.1`, 14 files, and inclusion of `bin/aps.js`, `skills/aps/SKILL.md`, `skills/aps/references/setup-dialogue.md`, `resources/protocol/PROTOCOL.md`, protocol templates, examples, README, and LICENSE。
- **Formal 🟡 外發前檢 for 0.2.1**: passed on 2026-05-27 after correcting stale `待提交` / `34/34` wording. Inner quick-check passed;package / CLI checks passed;placeholder audit left only A-class historical / explicit example hits;HTML `.md` hyperlink audit returned 0 hits;secrets sweep hits are policy text only;DevTools rendered `docs/index.html`, walkthrough, and governance-map with no console messages and screenshots under `dev/qc/evidence/2026-05-27-release-check-html/`。
- **0.2.1 publish verification**: release commit `d9dd1aa1acf2b2f5c863056382543922c5c0aeb4` was pushed;tag `v0.2.1` was pushed and points to the release commit;GitHub release `v0.2.1` readback confirms `isPrerelease=true` and `isDraft=false`;`npm view @adamchanadam/aps version dist-tags.latest bin dist.fileCount --json` confirms version `0.2.1`, latest `0.2.1`, bin `aps`, fileCount 14。
- **0.2.2 smoke test**: `node --check bin/aps.js`, `node bin\aps.js --help`, `node bin\aps.js config` without local config, malformed `.aps/config.json` error handling, `npm test`, `npm pack --dry-run --json`, `git diff --check`, HTML `.md` hyperlink audit, stale long-command scans, and false published-0.2.2 wording scans passed。Throw-away workspace `dev/qc/evidence/2026-05-27-config-shortcmd-20260527-051056/` passed init with `.aps/config.json`, `config`, short-command `doctor`, `publish`, counterpart `inbox`, counterpart `consume`, `revise`, second `publish`, `withdraw`, post-withdraw `inbox`, `close`, and final `doctor`。Separate evidence `dev/qc/evidence/2026-05-27-config-command-20260527-051449/` passed `config --dry-run`, `config` write, and config readback。
- **Formal 🟡 外發前檢 for 0.2.2**: passed on 2026-05-27 after correcting stale 0.2.0 public guide wording and one CLI next-step long-command hint。Nested quick-check passed: Agent Handoff Kit doctor passed 46 checks, prompt mirror matched, and `git status --short` matched the then-current 0.2.2 change summary。Package / CLI checks passed: `node --check bin/aps.js`, `node bin\aps.js --help`, `npm test`, `npm pack --dry-run --json` (`@adamchanadam/aps@0.2.2`, 14 files), and `git diff --check` with LF→CRLF warnings only。Cross-read / drift scans passed: HTML `.md` hyperlink audit 0 hits;old long daily-command scan 0 hits;false published-0.2.2 scan 0 hits;stale 0.2.0 public wording scan 0 hits;placeholder hits are A-class examples;secrets sweep hits are policy text only。Headless Chrome screenshots were saved for `docs/index.html`, `docs/guides/index.html`, `docs/guides/aps-onboarding-walkthrough.html`, and `docs/qc/governance-map.html` under `dev/qc/evidence/2026-05-27-release-check-022-*`。

- **Prior release verification**: commit `838d85a`, tag `v0.1.1`, and GitHub release `AI Public Squares v0.1.1` remain historical release records。
- **Current npm verification**: `npm view @adamchanadam/aps version dist-tags.latest bin dist.fileCount --json` confirms version `0.2.1`, `latest = 0.2.1`, bin `aps`, fileCount 14。
- **0.2.2 publish verification**: release prep commit `b8883cbaab63f3aa42162d66679424e8155b461b` was pushed;tag `v0.2.2` was pushed and points to that commit;GitHub release `v0.2.2` readback confirms `isPrerelease=true` and `isDraft=false`;`npm view @adamchanadam/aps version dist-tags.latest bin dist.fileCount --json` confirms version `0.2.2`, latest `0.2.2`, bin `aps`, fileCount 14。Published package install probe passed via documented path: `npm install --save-dev @adamchanadam/aps@0.2.2`, then `npx aps --help`。
- **Local HTML onboarding verification**: `npx @adamchanadam/agent-handoff-kit@latest init` was rerun in isolated evidence folder with `yes` piped into the interactive confirmation;init exit 0, doctor exit 0, 20 required files created, and 46 doctor checks passed。`npm view @adamchanadam/aps version dist-tags.latest bin dist.fileCount --json` reconfirmed version `0.2.2`, latest `0.2.2`, bin `aps`, fileCount 14。HTML scans returned 0 hits for `.md` links, stale unpublished 0.2.2 wording, stale 0.2.1 wording, and old “5 / 6 governance” wording。Chrome DevTools opened the three local file URLs;the corrected `yes` wording appeared on `docs/index.html` and the walkthrough, and the walkthrough had no console messages。
- **Prior release CLI smoke test**: `node bin/aps.js --help`, `node bin/aps.js init`, and `node bin/aps.js bridge-pack --role B` passed before release commit。
- **GitHub Pages verification**: after the post-publish state-sync push, Pages returned HTTP 200 and contained `0.2.1` plus pre-release / 前期測試 wording。
- **Agent Handoff Kit v0.3.11 doctor**: demo Adam and demo Jay workspaces passed 46 checks;main workspace prompt mirror is repaired in this closeout and rechecked after `START_NEXT_SESSION_PROMPT.txt` regeneration。
- **MCP setup verification**: `codex mcp list` shows `chrome-devtools` and `context7` enabled;`npx chrome-devtools-mcp@latest --help` and `npx -y @upstash/context7-mcp --help` both launched successfully after forcing npm out of offline mode。

Checks deferred to next substantive session:
- Skill conversational quality review and recovery rehearsal。
- Per-project Drive checks for any new real project。

Handoff evidence location: this file (durable continuity);`dev/SESSION_LOG.md` latest entry (session evidence);`dev/qc/2026-05-27-aps-full-audit.md` (0.2.1 full audit and post-publish evidence);GitHub release `https://github.com/Adamchanadam/ai-public-squares/releases/tag/v0.2.1`。

<!-- ack:section:workspace-identity -->
## Workspace Identity

Expected project root: `C:\Users\adam\_claude_desktop\AI_Public_Squares`
Git root: same
Branch: `main`
Latest local commit: current `HEAD` after 0.2.2 post-publish state-sync commit;check exact hash with `git log -1 --oneline`。
Latest release commit: `b8883cbaab63f3aa42162d66679424e8155b461b` (`chore: prepare APS 0.2.2 release`;tag `v0.2.2`)。
Remote: `origin` = `https://github.com/Adamchanadam/ai-public-squares.git` (**public repo since 2026-05-23**, Apache-2.0, HTTPS via Windows Credential Manager;GitHub Pages enabled serving `/ (root)` 之 `main` branch)。
Worktree / parallel workspace status: none (no `git worktree add`);siblings (`Demo_Agent_{Adam,Jay}_Public_Squares` MVP fixtures + Drive Hub) 仍 independent stores;real runtime workspaces 仲喺 each user's own machine (out of repo)。
Uncommitted changes summary: local doc-flow correction pending commit / push (`docs/index.html`, `docs/guides/aps-onboarding-walkthrough.html`, and governance persistence files)。Disposable install / round-trip / skill rehearsal / throw-away flow evidence under `dev/qc/evidence/2026-05-26-*` and `dev/qc/evidence/2026-05-27-*` is ignored and kept local。`adamchanadam-aps-*.tgz` generated by `npm pack` should not be committed unless Adam explicitly wants a tarball artifact.

<!-- ack:section:sync-status -->
## Sync Status

Use statuses from `dev/DOC_SYNC_REGISTRY.md`: `confirmed`, `unverified`, `pending`, `blocked`, `not_applicable`.

- Project index: `confirmed` (this pass — 0.2.2 published short-command state, npm 0.2.2 latest boundary, and evidence paths reflected)。
- Doc sync registry: `confirmed` (npm package change row now includes `config` and short-command smoke path;existing rows cover skill source change, public behavior, closeout/startup contract, and APS public promise consistency)。
- Public docs / README: `confirmed` locally (README and public docs show published 0.2.2 pre-release boundary;README + local HTML now include the Agent Handoff Kit `yes` confirmation step;GitHub / GitHub Pages will need commit / push to receive this latest wording)。
- External knowledge tools: `confirmed` — Drive Hub true Adam ↔ Jay check passed for `aps_real_drive_check`;per-project Drive checks remain required for new real projects。
- APS plan / verification docs: `confirmed` (Phase 4 plan records the skill-driven user experience layer;current docs preserve the published 0.2.2 pre-release boundary)。
- APS user-facing docs (`README.md` + `docs/index.html` + `docs/guides/`): `confirmed` locally (this pass — CLI-first setup, Agent Handoff Kit `yes` confirmation, saved config, short-command daily flow, pre-release trial-use boundary, and 0.2.2 published boundary are aligned)。
- Tooling: `confirmed` — published `bin/aps.js` 0.2.2 exposes verified `init --dry-run` skill installer paths, Hub setup, `bridge-pack`, minimal packet commands, `revise`, `withdraw`, read-only `doctor`, saved `.aps/config.json`, `config`, and short daily command defaults。Throw-away short-command smoke test, config command test, and published install probe passed on 2026-05-27。
- QC vocabulary: `confirmed` (no change this turn)。
- npm package: `confirmed` (`@adamchanadam/aps` 0.2.2 published and verified as latest;fileCount 14;bin `aps`)。
- GitHub remote: `confirmed` (`v0.2.2` tag points to `b8883cbaab63f3aa42162d66679424e8155b461b`;GitHub release published as pre-release)。
- Codex MCP config: `confirmed` (`chrome-devtools` and `context7` registered globally;tool availability requires new Codex session / restart if not hot-loaded)。

<!-- ack:section:state-reconciliation-check -->
## State Reconciliation Check

At full closeout, complete this check after updating the state sections above.

- Reconciled at: 2026-05-27 local HTML onboarding flow correction — 0.2.2 npm / GitHub release state remains current;local `yes` confirmation wording and throw-away Agent Handoff Kit init / doctor verification recorded;prompt mirror to be rechecked after this persistence pass.
<!-- ack:field:state-sections-rewritten-or-confirmed -->
- State sections rewritten or confirmed current: Last Updated;Current Baseline;Active Objective;Completed This Session;Next Priorities;Next Task Required Reading;Risks / Blockers;Validation / QC;Workspace Identity;Sync Status;State Reconciliation Check;Handoff Sufficiency Check;Next Session Opening Message;SESSION_LOG N-rule archive advanced.
<!-- ack:field:stale-snapshots-left -->
- Stale snapshots left in this handoff: historical S10 and S11 narratives remain in archived logs and selected background lines;current-state sections above supersede them. Older raw 2026-05-20 / 2026-05-21 / 2026-05-22 / 2026-05-23 / 2026-05-25 log entries have been moved to `dev/SESSION_LOG_archive/archive_001_2026-05-20_to_2026-05-20.md`, `archive_002_2026-05-21_to_2026-05-21.md`, `archive_003_2026-05-21_to_2026-05-21.md`, `archive_004_2026-05-22_to_2026-05-22.md`, `archive_005_2026-05-23_to_2026-05-23.md`, and `archive_006_2026-05-25_to_2026-05-25.md`.
<!-- ack:field:lifecycle-conflicts-resolved -->
- Completed / pending / risk / opening-message lifecycle conflicts resolved or explicitly reclassified: yes — setup-first draft, skill installer, Hub setup generator, minimal CLI round-trip, skill-level daily-use first pass, isolated rehearsal, throw-away flow, formal 🟡 外發前檢, 🔴 全面檢, real Adam ↔ Jay Drive check, GitHub pre-release, npm publish, public walkthrough correction, 0.2.1 CLI hardening, document repositioning, 0.2.1 commit, formal 0.2.1 外發前檢, 0.2.1 publish, post-publish Pages readback, 0.2.2 short-command implementation, formal 0.2.2 外發前檢, and 0.2.2 publish readback are completed;real Adam ↔ Jay short-command rehearsal, natural-language recovery hardening, auto-update mechanism, and per-project Drive checks remain explicitly listed as next work.
<!-- ack:field:opening-message-matches-current-state -->
- Opening message matches current state: yes — `START_NEXT_SESSION_PROMPT.txt` regenerated from this handoff and doctor verified the prompt mirror.
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

Current closeout (2026-05-27): `@adamchanadam/aps` v0.2.2 is published to npm and verified as latest, while the project remains ⚠️ 前期測試階段(pre-release). Release commit `b8883cbaab63f3aa42162d66679424e8155b461b` and tag `v0.2.2` are pushed;GitHub release is live as a pre-release at https://github.com/Adamchanadam/ai-public-squares/releases/tag/v0.2.2. 0.2.2 adds project-local `.aps/config.json`, `npx aps config`, and short daily commands after setup, so `doctor`, `inbox`, `publish`, `consume`, `revise`, `withdraw`, and `close` can use saved Hub / project / agent defaults. Local throw-away evidence passed init → config → doctor → publish → inbox → consume → revise → publish → withdraw → inbox → close → doctor;config command evidence passed dry-run, write, and readback;formal 🟡 外發前檢 passed;published install probe passed via `npm install --save-dev @adamchanadam/aps@0.2.2` then `npx aps --help`;GitHub Pages readback contains `0.2.2` and pre-release wording. Local README / HTML onboarding flow was rechecked after this release: upstream Agent Handoff Kit README confirms `npx --yes @adamchanadam/agent-handoff-kit@latest init`;README, `docs/index.html`, and `docs/guides/aps-onboarding-walkthrough.html` now use that command and tell users to type `yes` after the write plan;README quick-start uses `aps init --dry-run` then full `aps init --hub-root ...`;isolated rerun created 20 required files and doctor passed 46 checks. This latest wording is local until committed / pushed.

Prior release state: v0.1.1, v0.2.0, and v0.2.1 remain historical releases;v0.2.2 is the current npm latest and current GitHub pre-release.

Codex global MCP config now includes `chrome-devtools` (`chrome-devtools-mcp@latest`, usage statistics disabled) and `context7` (`@upstash/context7-mcp`, no API key stored). They may require a new Codex session or Codex Desktop restart before appearing in the active tool list.

Agent Handoff Kit v0.3.11 status: main APS workspace doctor passes after this wrap-up;`Demo_Agent_Adam_Public_Squares` and `Demo_Agent_Jay_Public_Squares` also pass v0.3.11 doctor(46 checks each). Demo workspaces still have their own uncommitted governance upgrade files;do not edit them from this APS root unless explicitly asked.

Read in order:
1. AGENTS.md
2. dev/SESSION_HANDOFF.md
3. dev/SESSION_LOG.md(含 2026-05-27 local HTML onboarding flow correction entry at top)
4. dev/PROJECT_INDEX.md
5. dev/RULE_PACKS.md
6. dev/qc/2026-05-22-zero-knowledge-funnel-audit.md (Phase X-3 spec source)

Read dev/DOC_SYNC_REGISTRY.md before file changes or closeout.

QC vocabulary (S6): if user invokes 「跑快檢 / 跑外發前檢 / 跑全面檢」 (or English aliases quick-check / release-check / full-check), load dev/qc/triggers.md and run the specified tier. If user uses 含混詞 (「做 QC / 跑驗收 / 整體 audit / QC」), stop and ask 「你指快檢 / 外發前檢 / 全面檢?」.

If this root does not match the expected project root, stop and ask for confirmation.

GitHub remote `origin` at https://github.com/Adamchanadam/ai-public-squares.git (public, Apache-2.0, HTTPS via Windows Credential Manager auto-auth);GitHub Pages serving `/ (root)` of `main` branch at https://adamchanadam.github.io/ai-public-squares/。

Voice hard rule (per memory feedback-doc-voice + feedback-plain-language):所有寫畀人睇嘅文檔嚴格用當代繁體書面語;粵語 colloquial(嘅 / 嗰 / 咗 / 唔 / 呢個 等)只容許於 verbatim 用戶觸發句 quote 之內(「Hub 有新嘢」 / 「check Hub」 等)。Chat reply 同樣 plain,internal framework name(Phase X / Layer A/B/C/D / Stage 0-7)不做句子主體。

Documentation governance hard rule (per S10 Adam principle):HTML 內(site-nav / body callout / body table)不 link 任何 .md 檔(瀏覽器顯示 plain text,broken UX);如要 reference .md 用 plain `<span class="path">` 顯示。.md 屬 AI / 維護者層 spec source。

Next active objective: **run real Adam ↔ Jay short-command rehearsal using npm latest 0.2.2 before any production claim**。Pending:natural-language daily operation and recovery hardening;auto-update mechanism;per-project Drive verification for any new real project.

User-facing entry: README.md + docs/index.html (hosted via GitHub Pages at https://adamchanadam.github.io/ai-public-squares/docs/index.html)。Current public install path: first run `npm install --save-dev @adamchanadam/aps`, then run `npx aps ...`;npm latest 0.2.2 remains pre-release。Funnel audit roadmap: dev/qc/2026-05-22-zero-knowledge-funnel-audit.md。

After reading, summarize current objective, confirmed decisions, pending work, risks, and the next recommended action.
```
