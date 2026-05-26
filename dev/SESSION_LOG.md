# Session Log

Add new session entries at the top. Record what actually happened in the session; do not copy old completed work forward as new work.

This log carries recent evidence, not current state. Put the current objective, next action, risks, and workspace identity in `dev/SESSION_HANDOFF.md`.

Keep recent entries concise. If older entries no longer affect the next action, reduce them to short dated indexes that point to the durable source of truth. Archive long error output, validation detail, or research trails only when needed; do not create an archive directory by default.

Before closeout, check whether older log detail should be kept, summarized, or archived. Do not remove validation evidence, unresolved risks, or the latest opening message.

## 2026-05-26 (S18, latest) — 0.2.0 pre-release published

- **ID:** S18
- **Summary:** Adam authorized commit and continuation through npm publish. The 0.2.0 pre-release candidate was committed, pushed, tagged, released on GitHub as a pre-release, published to npm, and then read back from the registry, GitHub release, GitHub Pages, and a fresh install probe.
- **Changed:** This workspace and external release surfaces.
  - Commit `47bf2d29c8bae7339730d9b655dadbf0b8da64da` (`release: prepare APS 0.2.0 pre-release`) was pushed to `origin/main`.
  - Tag `v0.2.0` was pushed and points to the release commit.
  - GitHub release `v0.2.0` was created as a pre-release: `https://github.com/Adamchanadam/ai-public-squares/releases/tag/v0.2.0`.
  - npm package `@adamchanadam/aps@0.2.0` was published with `latest = 0.2.0`.
  - Post-publish state files were updated: `dev/SESSION_HANDOFF.md`, `dev/SESSION_LOG.md`, `dev/PROJECT_INDEX.md`, `START_NEXT_SESSION_PROMPT.txt`, and `dev/qc/2026-05-26-aps-full-audit.md`.
- **QC:** `npm view @adamchanadam/aps version dist-tags.latest bin dist.fileCount --json` confirms version `0.2.0`, latest `0.2.0`, bin `aps`, fileCount 14. GitHub release readback confirms `isPrerelease=true` and `isDraft=false`. GitHub Pages returned HTTP 200 and contains `0.2.0` plus pre-release wording. Published-package install probe passed via the documented path: install package first, then use `node_modules\.bin\aps.cmd --help` and `aps.cmd bridge-pack --role B`. One-off `npx @adamchanadam/aps@0.2.0 --help` remains unreliable and is not the documented path.
- **Result:** 0.2.0 is now published and verified, but the project remains ⚠️ pre-release. Natural-language daily operation and recovery orchestration are still hardening work, not production-complete claims.
- **Sync:** Existing `dev/DOC_SYNC_REGISTRY.md` rows for npm package change, release, public behavior change, closeout/startup contract, workspace identity, and APS product consistency cover this update;no new registry row is needed.

## 2026-05-26 (S17) — full-check before 0.2.0 publish decision

- **ID:** S17
- **Summary:** Ran 🔴 全面檢 for the local `@adamchanadam/aps@0.2.0` candidate as the conservative gate before any publish decision. This included the nested quick-check and release-check surface, cross-workspace read-only checks, same-machine protocol regression, startup addendum behavior trace, and self-review.
- **Changed:** This workspace only.
  - New: `dev/qc/2026-05-26-aps-full-audit.md` — full audit report for the 0.2.0 release-prep decision.
  - Modified: `dev/PROJECT_INDEX.md` — latest APS full audit now points to the 2026-05-26 report; historical 2026-05-25 report remains listed.
  - New evidence folder: `dev/qc/evidence/2026-05-26-full-check-regression-2/` — independent disposable workspace, fake home, Hub skeleton, Bridge Pack, ack files, outbox logs, and final no-pending inbox evidence.
- **QC:** Main workspace doctor passed 46 checks with only the existing SESSION_LOG N-rule warning. Demo Adam and demo Jay workspace doctors passed 46 checks each. `npm view` confirms published latest remains 0.1.1. GitHub Pages readback passed after approved network escalation: HTTP 200 and contained 0.1.1 plus the verified install wording. `node --check bin/aps.js`, `npm test`, `npm pack --dry-run --json`, `node bin/aps.js --help`, target-specific init dry-runs, and negative `bogus` path passed. Disposable same-machine regression completed publish → inbox → consume → reply → consume → close and ended with no pending items for Adam or Jay. Real Google Drive cross-machine verification also completed: Adam published `20260526T173931Z__drive_sync_check`;Jay replied from her own machine with `20260526T175057Z__drive_sync_reply`;Adam read Jay outbox / packet / ack back from the Drive Hub, consumed it, closed both packets, and final inbox checks returned no pending items for Adam or Jay.
- **Important correction during QC:** The first regression attempt was run from the repo root and produced an unwanted untracked `dev/rules/aps-bridge.md`;that generated file was removed, and the regression was rerun from an isolated disposable workspace successfully.
- **Result:** Evidence side is clear for 0.2.0 release-prep, including one real Adam ↔ Jay two-machine Google Drive round-trip. Full-check procedural gate is not complete until this report and the candidate changes are committed;commit / push / tag / release / npm publish all require Adam's explicit instruction.

## 2026-05-26 (S16) — formal release-check and packaged-template cleanup

- **ID:** S16
- **Summary:** Ran the formal 🟡 外發前檢 (`release-check`) for the local `@adamchanadam/aps@0.2.0` candidate after the throw-away zero-knowledge flow. The check found real package-surface drift in shipped examples, fixed it, then reran the relevant audits.
- **Changed:** This workspace only.
  - Modified: `resources/protocol/templates/ack.json.example` — replaced the old `mpedu_plus_branding` example with generic `example_project` / `example_agent` values and neutral example packet wording.
  - Modified: `examples/demo-agent-a/dev/rules/aps-bridge.md` and `examples/demo-agent-b/dev/rules/aps-bridge.md` — replaced the old MVP project slug example with `example_project` while keeping User A / User B role examples.
  - Generated evidence: `dev/qc/evidence/2026-05-26-release-check-html/` holds DevTools screenshots for `docs/index.html`, `docs/guides/aps-onboarding-walkthrough.html`, and `docs/qc/governance-map.html`.
- **QC:** Agent Handoff Kit doctor passed 46 checks with only the existing SESSION_LOG N-rule warning for next closeout. `node --check bin/aps.js`, `node bin/aps.js --help`, `node bin/aps.js init --dry-run --target both`, `npm test`, `npm pack --dry-run --json`, `git diff --check`, npm registry readback, packaged-surface placeholder scan, public-doc voice scan, and secrets sweep were run. DevTools rendered all three HTML pages and reported no console messages. `npm view @adamchanadam/aps ...` still confirms published latest is `0.1.1`;the local candidate remains unpublished.
- **Result:** Formal 🟡 外發前檢 is clear for the local 0.2.0 candidate in this workspace. This is not 🔴 全面檢: real cross-machine Google Drive verification and committed full-audit report remain separate pending work.
- **Sync:** Existing `dev/DOC_SYNC_REGISTRY.md` rows for npm package change, APS product consistency, public docs, and QC vocabulary cover this change type;no new registry row is needed.

## 2026-05-26 (S15) — QC terminology consolidation root-fix

- **ID:** S15
- **Summary:** Investigated why the throw-away zero-knowledge flow was treated too strongly for release decisioning. Root cause was not a missing QC rule: `dev/qc/triggers.md` already defines 🟡 外發前檢 / `release-check` as the single source of truth. The drift came from handoff / prompt / index wording using `local release-check` for a local package smoke-check bundle, which collided with the formal QC alias.
- **Changed:** This workspace only.
  - Modified: `dev/SESSION_HANDOFF.md` — renamed the local check evidence to `local package smoke check`, stated it is not the formal 🟡 外發前檢 / `release-check`, and reset the active objective to run formal 外發前檢 before any commit / push / release / publish decision.
  - Modified: `START_NEXT_SESSION_PROMPT.txt` — mirrored the same wording so next startup does not inherit the ambiguous `local release-check` phrase.
  - Modified: `dev/PROJECT_INDEX.md` — clarified the npm CLI smoke-test row so local package smoke checks are not confused with formal release-check.
- **QC:** No new QC rule was added. `dev/qc/triggers.md` remains the single source of truth for QC tiers; `docs/qc/governance-map.html` remains the public reference card. This is a consolidation / terminology fix, not rule expansion.
- **Pending:** Run formal 🟡 外發前檢 (`release-check`) for the local 0.2.0 candidate before deciding commit / push / release / publish.
- **Risks:** Formal 外發前檢 and 🔴 全面檢 still have not been run for 0.2.0; throw-away flow remains useful evidence but not a release gate.

## 2026-05-26 (S14) — throw-away zero-knowledge flow for local 0.2.0 candidate

- **ID:** S14
- **Summary:** Ran the recommended throw-away-folder zero-knowledge flow against the local `@adamchanadam/aps@0.2.0` candidate tarball before any commit, push, release, or npm publish.
- **Changed:** This workspace only.
  - New evidence folder: `dev/qc/evidence/2026-05-26-zero-knowledge-flow/` with fresh workspace, fake home, project-local npm cache, and local Hub fixture.
  - Modified continuity files: `dev/SESSION_HANDOFF.md`, `dev/SESSION_LOG.md`, `dev/PROJECT_INDEX.md`, and `START_NEXT_SESSION_PROMPT.txt` are refreshed to record the new evidence.
  - Generated artifact: `adamchanadam-aps-0.2.0.tgz` was created in the repo root by `npm pack`;it should not be committed.
- **QC:** `npm pack --json` produced local `@adamchanadam/aps@0.2.0` with 14 package files. Fresh workspace `npm install` from the tarball passed after approved escalation;initial sandboxed install hit EPERM creating the project-local npm cache, and one rerun used an incorrect relative tarball path before being corrected to the absolute tarball path. With `USERPROFILE` / `HOME` redirected to the fake home, `aps init --dry-run` showed both Claude Code and Codex skill install paths;`aps init --hub-root ... --project launch_notes --agent-id adam --other-agent-id jay --role A` installed both skill folders, created Hub skeleton, Bridge Pack, ack files, and starter pack. The daily flow completed Adam publish → Jay inbox → Jay consume → Jay reply → Adam inbox → Adam consume → Adam close → Jay close;final inbox checks returned no pending items for Adam or Jay.
- **Pending:** Adam release decision remains: commit / push / release / publish the 0.2.0 candidate, or hold for additional real cross-machine Drive evidence. Phase X-5 Layer D document repositioning remains pending.
- **Risks:** Real cross-machine Google Drive evidence remains pending;this throw-away flow proves fresh local package setup and CLI use in a disposable workspace, not actual Drive propagation across two machines.
- **Sync:** Evidence is reflected in `dev/SESSION_HANDOFF.md`, `dev/PROJECT_INDEX.md`, `START_NEXT_SESSION_PROMPT.txt`, and this log. Existing `dev/DOC_SYNC_REGISTRY.md` npm package and public promise rows cover this change type;no new registry row is needed.

## 2026-05-26 (S13) — Phase X-3 local 0.2.0 candidate and skill rehearsal

- **ID:** S13
- **Summary:** Continued into Phase X-3 by turning `skills/aps/SKILL.md` from a broad target spec into setup-first and daily-use runtime drafts, adding the local 0.2.0 CLI / protocol package work, completing isolated skill rehearsal, and passing local package smoke checks without publishing.
- **Changed:** This workspace only.
  - Modified: `bin/aps.js` — `init` is now a local skill installer supporting `--target claude|codex|both` and `--dry-run`;it copies bundled `skills/aps/` into Claude Code / Codex personal skill directories, refuses to overwrite existing installs, and treats existing-file safe skips as exit 0 while preserving non-zero exits for true failures.
  - Modified: `bin/aps.js` — added minimal `publish`, `inbox`, `consume`, and `close` commands on top of the generated Hub skeleton;publish now requires an existing outbox, packet scope escapes YAML quotes, outbox uses `items:none`, and close verifies the sender owns the packet and has not already closed it before appending a close event.
  - New: `resources/protocol/PROTOCOL.md` and `resources/protocol/templates/*` — bundled runtime protocol source and templates used by `aps init` to create Hub skeletons.
  - Modified: `package.json` — version bumped to `0.2.0` candidate;description and keywords now mention Claude Code + Codex support.
  - Modified: `README.md` — fixed the npm README URL bug by changing the Agent Handoff Kit bare URL into a Markdown link;updated `init` status to skill-installer / Hub setup / minimal CLI round-trip boundary instead of full production setup.
  - Modified: `docs/index.html` and `docs/guides/aps-onboarding-walkthrough.html` — public status now says local next-version `init` supports Claude Code / Codex skill installation plus initial Hub skeleton / Bridge Pack / starter pack generation;local CLI has a minimal round-trip, while natural-language daily use, recovery, and real cross-machine Google Drive verification remain unfinished.
  - Modified: `dev/qc/evidence/.gitignore` — local disposable installer smoke-test folders are ignored so duplicated skill copies are not committed.
  - Modified: `skills/aps/SKILL.md` — updated current boundary to v0.1.1, routed setup wording to bundled `references/setup-dialogue.md`, marks only the bottom-level CLI round-trip as verified, and now wires skill-level publish / inbox / consume / close first-pass instructions to the verified CLI while keeping real user-flow and cross-machine Drive evidence pending.
  - New / modified: `skills/aps/references/setup-dialogue.md` — compact setup wording bank for npm-installed skill runtime;first setup dry-run now uses `npx aps publish` instead of old test-file wording.
  - Modified: `docs/plans/2026-05-23-aps-skill-dialogue-script.md` — repositioned as repo long-form maintenance draft;the runtime-readable compact reference now lives under `skills/aps/references/`;publish / inbox / recovery examples now use packet folders, outbox, ack, and CLI commands instead of old single-file packet examples.
  - Modified: `dev/DOC_SYNC_REGISTRY.md` — package-change checks now cover `init --dry-run`, target-specific dry runs, Hub setup, and disposable Hub `publish` → `inbox` → `consume` → reply → `close` checks.
  - Modified: `dev/PROJECT_INDEX.md` — records the bundled setup wording bank, the local next-version `init` installer boundary, and the minimal CLI round-trip boundary.
  - Modified: `.gitignore` — added `node_modules/` after a failed disposable npm install attempt briefly created local install artifacts in the repo root;the artifacts were removed.
  - Modified: `dev/SESSION_HANDOFF.md`, `dev/SESSION_LOG.md`, `START_NEXT_SESSION_PROMPT.txt` — closeout continuity refreshed.
- **QC:** `node --check bin/aps.js` passed;`node bin/aps.js --help` passed;`node bin/aps.js init --dry-run`, `node bin/aps.js init --target claude --dry-run`, `node bin/aps.js init --target codex --dry-run`, and setup dry-run with `--hub-root --project --agent-id --other-agent-id --role` passed;`node bin/aps.js bridge-pack --role B` passed;`node bin/aps.js bogus`, invalid `--target banana`, invalid `--role C`, invalid snake_case, incomplete setup flags, bad packet id, and missing outbox paths failed with exit 1 as expected;`npm pack --dry-run --json` passed for local `@adamchanadam/aps@0.2.0` candidate and includes 14 files including `skills/aps/references/setup-dialogue.md`, `resources/protocol/PROTOCOL.md`, and protocol templates;`git diff --check` has no whitespace errors beyond LF→CRLF warnings;precise HTML `.md` hyperlink grep returned 0 hits. Disposable install smoke test with HOME / USERPROFILE redirected to `dev/qc/evidence/2026-05-26-init-installer-smoke/home` installed both Claude Code and Codex skill folders;second run refused overwrite;installed `SKILL.md` hashes match source. Local tarball install test also passed: tarball installed into disposable workspace with project-local npm cache;workspace `npx aps init --dry-run`, `npx aps init`, and `npx aps bridge-pack --role B` work;second workspace `npx aps init` exits 1 and refuses overwrite;installed `SKILL.md` hashes match source. Source and tarball-installed Hub setup tests created expected Hub skeletons, ack files, Bridge Pack, and starter pack, and second runs refused overwrite. Source CLI round-trip under `dev/qc/evidence/2026-05-26-roundtrip-cli-20260526-155532/` and packed-tarball round-trip under `dev/qc/evidence/2026-05-26-roundtrip-cli-20260526-160305/` both completed Adam publish → Jay inbox → Jay consume → Jay reply → Adam inbox → Adam consume → Adam close;final inbox checks for both agents returned no pending items. Isolated skill-level rehearsal under `dev/qc/evidence/2026-05-26-skill-rehearsal-20260526-162256/` installed the local package, used a fake `USERPROFILE` for Claude Code / Codex skill dirs, completed setup → publish → inbox → consume → reply → inbox → consume → close for both sides, and ended with no pending inbox items. Source `init` safe-skip rerun now exits 0 after the CLI fix.
- **Sync:** Skill source change, npm package file inclusion, isolated skill rehearsal, and local package smoke checks are reflected in `dev/PROJECT_INDEX.md`, `dev/SESSION_HANDOFF.md`, `START_NEXT_SESSION_PROMPT.txt`, and this log. Existing `dev/DOC_SYNC_REGISTRY.md` rows already cover this change type.
- **Pending:** Adam decision remains pending: commit / push / release / publish the 0.2.0 candidate now, or run one more throw-away-folder user-flow first. Phase X-5 Layer D document repositioning remains pending. npm latest 0.1.1 does not contain this local `init` installer / Hub setup generator / minimal CLI round-trip / skill daily-use first pass.
- **Risks:** Real cross-machine Drive evidence remains pending;the isolated skill rehearsal proves local package and skill-command flow, not actual Google Drive propagation between Adam and Jay machines.
- **Log maintenance:** prepending this S13 entry makes the oldest hot-layer entry exceed the 10-entry target, so S2 is moved to `dev/SESSION_LOG_archive/archive_002_2026-05-21_to_2026-05-21.md` and indexed.

## 2026-05-26 (S12) — v0.1.1 release closeout + MCP setup + kit consistency check

- **ID:** S12
- **Summary:** Completed the APS v0.1.1 release path and then performed a formal wrap-up because `START_NEXT_SESSION_PROMPT.txt` had drifted from `dev/SESSION_HANDOFF.md`. Also installed two Codex MCP servers and checked Agent Handoff Kit v0.3.11 consistency across the main APS root and both demo roots.
- **Changed:** This workspace only for wrap-up continuity.
  - Modified: `dev/SESSION_HANDOFF.md` — current release state, MCP state, v0.3.11 doctor evidence, next objective, risks, sync status, and opening message refreshed.
  - Modified: `dev/SESSION_LOG.md` — this entry.
  - Modified: `dev/PROJECT_INDEX.md` — release state, workspace identity, doctor command, npm / GitHub / MCP facts refreshed.
  - Regenerated: `START_NEXT_SESSION_PROMPT.txt` from the handoff opening message.
- **External actions completed earlier in this session:** npm publish `@adamchanadam/aps@0.1.1`;git commit `838d85a`;push `origin/main`;tag push `v0.1.1`;GitHub release `https://github.com/Adamchanadam/ai-public-squares/releases/tag/v0.1.1`;GitHub Pages readback.
- **MCP setup:** Codex global MCP config now includes `chrome-devtools` (`chrome-devtools-mcp@latest`, usage statistics disabled) and `context7` (`@upstash/context7-mcp`, no API key stored). Both package help commands launched successfully after forcing npm out of offline mode. Tool availability may require a new Codex session or Codex Desktop restart.
- **QC:** `npm view @adamchanadam/aps ...` confirms `latest = 0.1.1`;`npm pack --dry-run --json` confirms 8 expected package files;remote `main` and `v0.1.1` both point to `838d85a`;GitHub release verified non-draft and non-prerelease;GitHub Pages returned HTTP 200 and contained `0.1.1` plus the verified install command. Agent Handoff Kit v0.3.11 doctor passed for both demo workspaces;main workspace doctor is re-run after prompt regeneration in this wrap-up.
- **Pending:** Phase X-3 skill setup subflow + dialogue script remains next substantive work;throw-away-folder user-flow test still pending;Phase X-5 Layer D document repositioning remains pending;real cross-machine Drive round-trip evidence remains pending.
- **Sync:** Closeout/startup contract, workspace identity, release, npm package, and MCP setup are reflected in handoff / index / prompt copy. No product files changed in this wrap-up.

## 2026-05-25 (S11) — APS public promise consistency root-fix

- **ID:** S11
- **Summary:** 按 Adam 指示,本次 QC 聚焦 AI Public Squares 本身,不審 Agent Handoff Kit 治理層。先建立 `dev/qc/2026-05-25-aps-full-consistency-audit.md`,再逐項 root-fix 5 個 blocker:repo public 狀態漂移、npm 未 publish 與 walkthrough 命令衝突、`aps init` 目標體驗被寫似已可用、skill / dialogue script 含未實作承諾、walkthrough doctor `34 / 34` 過時數字。
- **Changed:** This workspace only.
  - Modified: `README.md` — 改為 repo 已公開;明確 npm package 尚未 publish;「開始使用」改為「目前可以怎樣試」+「目標體驗」分離。
  - Modified: `docs/index.html` — 同步 public repo / npm 未 publish / `init` coming-soon 邊界;狀態表新增 registry 未發佈邊界。
  - Modified: `docs/guides/aps-onboarding-walkthrough.html` — `bridge-pack` 改為正式 publish 後使用 npm;前期測試只供維護者以 clone 後本地 `node bin/aps.js bridge-pack` 測試;doctor 驗收改用 `Status: passed`。
  - Modified: `skills/aps/SKILL.md` — 標為 target orchestration spec,不是 current runtime guarantee;未實作 update / bundled PROTOCOL source / zip 承諾全部改成邊界語句。
  - Modified: `docs/plans/2026-05-23-aps-skill-dialogue-script.md` — 標為 wording bank + 目標體驗草稿;移除 clipboard / zip / update 作為已可執行承諾。
  - Modified: `dev/DOC_SYNC_REGISTRY.md` — 新增 APS product consistency audit / public promise drift row。
  - Modified: `dev/PROJECT_INDEX.md` — 新增 APS consistency audit entry;README / skill rows 改成 current-vs-target boundary。
  - Modified: `dev/qc/2026-05-25-aps-full-consistency-audit.md` — 追加 root-fix pass 與重跑驗收結果。
  - Modified: `dev/qc/triggers.md` — 將 APS 全面檢深化為三條主線:公開承諾一致性、發佈前可信度、協定 runtime 正確性;新增四條主 user journey 走通要求。
  - Modified: `docs/qc/governance-map.html` — 同步三條主線與四條 journey,將公開 reference card 對齊 SSOT。
  - Modified: `docs/index.html` + `docs/guides/index.html` + `docs/guides/aps-onboarding-walkthrough.html` — 公開入口、教學中心、完整落地教學加入 APS 驗收機制與 journey 定位;日期同步至 2026-05-25。
  - Modified: `dev/DOC_SYNC_REGISTRY.md` — APS product consistency audit row 擴充為三條主線 + 四條 journey 之同步規則。
  - Modified: `docs/index.html` + `docs/guides/index.html` + `docs/guides/aps-onboarding-walkthrough.html` + `docs/qc/governance-map.html` + `dev/qc/triggers.md` + `dev/DOC_SYNC_REGISTRY.md` — 按 Adam 要求將剛加入的快速溝通語與英文工作語改為公開文檔可用的當代繁體書面語:「journey」→「流程」,「runtime」→「實際運行」,「SSOT」→「單一真源」,「actor」→「參與者」,「trace / evidence」→「操作記錄 / 證據」。
- **QC:** `node bin/aps.js --help` pass;`node bin/aps.js init` pass and still coming soon;`node bin/aps.js bridge-pack --role B` pass;`node bin/aps.js bogus` negative path pass(exit 1);`npm pack --dry-run --json` pass;`npm view @adamchanadam/aps ...` still E404 and now documented as publish timing boundary;grep `private repo|私人 repo|34 / 34|34/34|C:\Users\adam|href=.*\.md` on README + public docs = 0 hit;grep `npx @adamchanadam/aps update|copy 到 clipboard|protocol-v1.0.md` = 0 hit;secret sweep found only safety-rule mentions, no actual credential;`npx @adamchanadam/agent-handoff-kit doctor` pass(46 checks),with non-blocking note that tool / npm latest v0.3.11 differs from project record v0.3.10. Later same session:APS 全面檢 governance deepening added and re-verified by grep across `dev/qc/triggers.md`,4 個入口 HTML,plus `.md` hyperlink audit.
- **Sync:** DOC_SYNC_REGISTRY updated with durable rule for future APS public promise drift checks. No GitHub push, npm publish, Pages deployment, or external write performed.
- **Pending:** npm publish remains Adam-controlled; until publish, public docs must keep the registry-not-published boundary. Next substantive work may proceed to skill / setup / dialogue design, using the corrected boundary.
- **Continuation — full audit requested by Adam:** Created `dev/qc/2026-05-25-aps-full-audit.md` and indexed it in `dev/PROJECT_INDEX.md`. This stricter full audit separates public/document consistency from actual cross-workspace proof. Result: local public surface + CLI checks pass, but the full audit is not a complete pass because doctor, browser render, Class-C cross-workspace audit, round-trip regression, Bridge Pack startup behavior trace, and report commit remain unverified or explicitly not performed in this workspace session. Browser render was attempted through the local JavaScript environment, but `playwright` is unavailable.
- **Environment note added:** `C:\tmp` is not writable in the current Codex desktop execution environment. Recorded in `dev/PROJECT_INDEX.md` Workspace Identity and this audit report; subsequent QC evidence for this session uses project-local `dev/qc/evidence/2026-05-25-full-audit/`.
- **Root-fix continuation:** Public wording cleanup removed mixed-language phrases from README + HTML entry surfaces. HTML preview evidence was generated with Microsoft Edge headless and saved under `dev/qc/evidence/2026-05-25-full-audit/`. A project-local temporary Hub regression completed Adam publish → Jay ack → Jay reply → Adam ack → Adam close, and `startup-trace-check.cjs` confirmed both Adam and Jay have no pending items after close. Doctor remains blocked because sandbox execution lacks npm cache and sandbox-out execution of npm code was rejected by safety review.
- **Release continuation (2026-05-26):** Published `@adamchanadam/aps@0.1.0`, then immediately found that one-off `npx @adamchanadam/aps@0.1.0 ...` was not a reliable verified path in this Windows/npm environment. Root-fix landed as `0.1.1`: public docs + CLI help now use the verified flow `npm install --save-dev @adamchanadam/aps` then `npx aps ...`. Published `@adamchanadam/aps@0.1.1`; `npm view` confirms `latest` = 0.1.1, bin = `aps`, fileCount = 8; a temporary install probe confirms `aps.cmd --help` and `aps.cmd bridge-pack --role B` work.

## 2026-05-23 (S10) — Repo public + GitHub Pages + npm bridge-pack + Layer D HTML strip + audit cascade

- **ID:** S10
- **Summary:** 跨多輪 audit + scope expansion 嘅累積 batch。核心拍板:Adam 提出 「HTML 入面 .md hyperlink 屬 broken UX(瀏覽器顯示 plain text);若內容係新手必讀就放 HTML 頁,放 HTML 範圍嘅必須係 HTML,非 .md」 之 design principle。Strip 全部公開面 .md hyperlink 並重新定位 「設計理據 + 跨機接駁計劃」 為 「AI / 維護者層 spec source」(Layer D)。順手做 audit cascade — 日期 / brand sync / Agent Handoff Kit 網址 fix / 設計理據 §13 階段 1-3 reframe / npm package 加 `bridge-pack` sub-command 取代 clone repo prereq / 設置教學 §2 由 4 件先決事改 3 件(取消 clone)/ pre-release banner / repo 轉 public / GitHub Pages enable / README 嘅 HTML link 改 absolute GitHub Pages URL。Voice rewrite scope 擴至包含 `docs/guides/index.html` + `docs/qc/governance-map.html`(原 Tier 3 deferred items)。
- **Adam principle 確立(documentation governance):** HTML = 公開人類面 polished surface;Notion = Adam 個人 R&D 知識庫;.md(`docs/plans/`、`dev/`)= AI / 維護者 spec substrate。HTML site-nav 不 link 任何 .md;HTML body 如要 reference .md,strip hyperlink 留 plain `<span class="path">` 顯示。
- **Changed:** This workspace + 2 memory files.
  - Modified: `bin/aps.js` — 加 `bridge-pack` sub-command(支援 `--role A/B`);help text + init text 對齊新 capability。
  - Modified: `package.json` — files 加 `"examples/"`(npm tarball ship Bridge Pack fixture)。
  - Modified: `README.md` — pre-release banner(「⚠️ 前期測試階段」)+ 「想深入了解」 list 分兩層 + 3 個 HTML link 改 absolute GitHub Pages URL + Agent Handoff Kit 網址 fix。
  - Modified: `docs/index.html` — site-nav strip 2 .md;body table 3 row + 正文 funnel audit hyperlink strip 改 plain path + (AI / 維護者層 .md) 標記;site-nav hint + hero meta + footer 日期 → 2026-05-23;Agent Handoff Kit 網址 fix;加 pre-release banner;voice 已 align。
  - Modified: `docs/guides/index.html` — site-nav strip 2 .md;site-nav hint + footer 日期 → 2026-05-23;footer brand 「AI Public Squares」 sync;3 sections / 12 處粵語 colloquial reword(原 voice scope 漏網)。
  - Modified: `docs/guides/aps-onboarding-walkthrough.html` — site-nav strip 2 .md;body callout × 2 + table × 1 hyperlink strip + 加 (AI / 維護者層 .md) 標記;site-nav hint + footer 日期 → 2026-05-23;Agent Handoff Kit 網址 fix;§2 4 件 → 3 件先決事(取消 clone repo prereq + 加 npm bridge-pack callout);§6 step 2 全 rewrite(由 clone path → `npx @adamchanadam/aps bridge-pack` command);§7 Adam 預先準備 + 1.1 / 2.3 / 5-bullet reframe + cascade 「4 件」 → 「3 件」 across TOC / §3 lede / §6 step 1 head / §7 step 1 / 1.1 head / accept 句;§5 / §3 callout 之 「你哋」 → 「你們」 voice fix(原 voice scope 漏網)。
  - Modified: `docs/qc/governance-map.html` — site-nav strip 2 .md;site-nav hint → 2026-05-23;footer brand + `<title>` brand 「AI Public Squares」 sync;13 處粵語 colloquial reword(原 voice scope 漏網 Tier 3 F6)。
  - Modified: `docs/plans/2026-05-20-agent-public-square-design.md` — §13 階段 1 + 3 + 4 全 reframe(`Adam` / `Jay` → User A / B + `mpedu_plus_branding` → `<project_slug>` placeholder)。
  - Modified: `dev/DOC_SYNC_REGISTRY.md` — 新 row 「HTML 公開面 .md hyperlink strip」;npm package change row smoke test 涵蓋 `bridge-pack` 加 files `examples/`。
  - Modified (memory): `MEMORY.md` + `reference-agent-handoff-kit-prerequisite.md` — Agent Handoff Kit 網址 由 `adamchanadam.github.io/agent-handoff-kit`(錯誤,不存在)改 `https://github.com/Adamchanadam/agent-handoff-kit`(repo URL,正確)。
- **External actions by Adam (out of session):**
  - GitHub repo `Adamchanadam/ai-public-squares` 由 private 轉 public(2026-05-23)。
  - GitHub Pages enable(`Settings → Pages → Source: Deploy from a branch, Branch: main, Folder: / (root)`)。
  - Pages URL `https://adamchanadam.github.io/ai-public-squares/` 可達(Adam confirmed with screenshot)。
- **QC: 🟡 外發前檢 + inner 🟢 — 5/5 items 全綠:**
  - 🟢 quick-check: kit doctor baseline maintained;grep acceptance 全綠(`.md` hyperlink × 0 hit on `docs/**/*.html` / `Agent Public Square` × 0 hit on `docs/**/*.html` / `2026-05-2[12]` 剩餘 hits 為 filename date 或 「建立日期」 intentional history)。
  - 🟡 release-check 5 items:
    - **Placeholder audit ✅** active 公開面 0 hit `MPEdu_Plus_Branding`;historical files(MVP plan / verification / S8 audit report)hits 屬 S8 governance-clean labelled,acceptable expose since repo public。
    - **Cross-read ✅** 跨 7 個 user-facing 檔 narrative consistency 一致:site-nav brand / 日期 / 「3 件先決事」 cascade / npm bridge-pack command 路徑 / README ↔ docs/index.html ↔ walkthrough 對齊。
    - **HTML preview render ✅** 各 HTML 經 Launch preview visible;banner + nav + table 結構 visual confirmed;無 broken markup。
    - **PII / secrets sweep ✅** 0 actual leak(`i.adamchan.uk` / `password=` / `secret=` / `api_key` / `client_secret` 0 hit,剩 2 hits 屬 historical scan record meta-mention)。
    - **Voice discipline scan ✅** 7 個讀者面 HTML / MD 全 align(verbatim user trigger phrase quote 內保留 per voice rule)。
  - 🔴 全面檢 NOT triggered(此 batch 無 protocol 改動,無 cross-workspace 範圍變更)。
- **npm smoke test ✅:** `node bin/aps.js [--help|init|bridge-pack|bridge-pack --role B|bogus]` 5 paths exit code 對應預期(前 4 exit 0,bogus exit 1);`bridge-pack` output 開首 `# APS Bridge Pack`;`npm pack --dry-run` ship `examples/demo-agent-{a,b}/dev/rules/aps-bridge.md` 雙 fixture(各 6.6 KB)。
- **Sync:**
  - HTML 公開面 .md hyperlink strip change: confirmed(4 個 HTML site-nav + body link 全 strip;新 DOC_SYNC_REGISTRY row)。
  - npm package change: confirmed(`bridge-pack` sub-command + files 含 `examples/`;Adam 將自跑 `npm publish` 出 0.2.0)。
  - Repo entry layer change(Layer A): confirmed(README + docs/index.html 加 pre-release banner;README HTML link 改 absolute GitHub Pages URL)。
  - APS user-facing docs change: confirmed(跨 4 HTML site-nav 對齊 + voice 對齊 + 日期 sync)。
- **Pending:**
  - npm publish 0.2.0(Adam 自跑 `npm login + npm publish`)— publish 後 `npx @adamchanadam/aps bridge-pack` 命令真實 work。
  - Phase X-3 起手 — `skills/aps/SKILL.md` + setup subflow + dialogue script。
  - 真實 user-flow test:Adam 可於 throw-away folder 跟 walkthrough §2 → §3 → §6 真做一次(npm bridge-pack 路徑下測試)。
  - Phase X-5 Layer D 文檔重新定位(設置教學 §1 disclaimer 加「想 AI 帶你做就講 set up APS」 + Phase 4 plan 加 「Skill-driven UX layer」 cross-reference 一節)。
  - Phase X-4 Layer C 日常使用 + recovery subflow。
  - Phase X-6 自動升級機制。
- **Risks (updated):**
  - npm 0.2.0 未 publish — `npx @adamchanadam/aps bridge-pack` 即時試會 404 until publish。Mitigation:README + docs/index.html banner 已標 pre-release。
  - 設置教學 npm bridge-pack 路徑未經真實使用者跑一次驗證(無 user-flow test acceptance)。
  - 設計理據 §12.3 + §9 仍保留 Adam-Jay specific path 加 `G:\…\Adam 工作目錄` 個人 Drive path(有 header disclaimer 標明 example narrative);repo 已 public,呢個 path 已 expose(屬 acceptable expose since header disclaimer cover example narrative scope)。
  - Historical SESSION_LOG / HANDOFF entries 含 `MPEdu_Plus_Branding` / Adam-specific path / `i.adamchan.uk` historical scan reference / `Adam Chan` 等 — repo 已 public,呢類 historical content 已 expose;將來如想徹底 cleanup 須 `git filter-repo` rewrite history(destructive,需 Adam 明示批准)。
  - Previously closed risks unchanged。
- **Log maintenance:** kept;new entry at top;S9 demoted from `latest` tag。

### Next Session Opening Message

(regenerated in `dev/SESSION_HANDOFF.md` — see there. Convenience copy at `START_NEXT_SESSION_PROMPT.txt`.)

## 2026-05-22 (S9) — Funnel-first vision shift + Layer A entry + npm bootstrap + GitHub remote

- **ID:** S9
- **Summary:** Major vision shift triggered by Adam: 「對 APS 零認知背景嘅用戶都用得到,本 repo 才算成功」. Repo 嘅 success criterion reframed 由「technical correctness」 → 「zero-knowledge user 5-minute outcome」. Three substantial deliverables landed:
  1. Funnel-first audit doc + 6-phase build roadmap
  2. GitHub remote + private repo bootstrap (Apache-2.0 license)
  3. Layer A entry rewrite (README + docs/index.html 全 reframed) + npm package skeleton (`@adamchanadam/aps` v0.1.0 placeholder)
- **Changed:** This workspace only.
  - New: `dev/qc/2026-05-22-zero-knowledge-funnel-audit.md` (436 lines, Stage 0-7 funnel + Layer A/B/C/D map + 6-phase roadmap + 5 open question + 3 risk)
  - New: `package.json` (npm scope @adamchanadam, bin entry `aps`, Apache-2.0, engines node ≥18)
  - New: `bin/aps.js` (placeholder CLI: init / --help / unknown handlers, all functional)
  - New: `.gitignore` (OS / editor / `.env` + `_*.txt` per GENERIC_OPERATIONAL_RUNBOOK §5i)
  - New: `README.md` (placeholder → zero-knowledge entry: 痛點 hook + `npx @adamchanadam/aps init` + 3 步點用 + deep-dive references + Build status table)
  - New: `LICENSE` (Apache-2.0 via GitHub UI initial commit merge)
  - Rewritten: `docs/index.html` (maintainer dashboard → zero-knowledge entry; +95 / −182 lines; cover h1 + footer 「Agent Public Square」 → 「AI Public Squares」)
  - Modified: 3 docs HTML (guides/index, walkthrough, governance-map) — site-nav brand text sync 「Agent Public Square」 → 「AI Public Squares」 (align README + repo name + npm scope)
- **Distribution channel decision:** npm package (Adam confirmed). `@adamchanadam/aps` scope reserved; npm publish 留到真 `init` 邏輯落地一齊 publish 0.2.0
- **Git history this session(10 commits, all pushed to origin/main):**
  - `65456c0` — S8 stage 1 generic-template pivot + audit report
  - `3cc0b13` — walkthrough audit 9 fixes (Adam/Jay agent_id defaults / asterisk render / step count / 試演 assumption cleanup)
  - `5f8d46e` — GitHub bootstrap (.gitignore + README placeholder)
  - `3d1f716` — Merge GitHub Initial commit (Apache-2.0 LICENSE)
  - `5b0b94f` — README License section align Apache 2.0
  - `8a86dcb` — .gitignore add `_*.txt` per runbook convention
  - `62878d5` — zero-knowledge funnel audit (Stage 0-7 + Layer A/B/C/D + roadmap)
  - `e6e38fd` — npm package bootstrap (@adamchanadam/aps v0.1.0 placeholder)
  - `b0255c1` — docs/index.html rewrite as zero-knowledge entry
  - `89b3012` — cross-doc site-nav brand sync (4 files)
- **Sensitive content scan(pre-first-push):** clean — `i.adamchan.uk` 0 hit;`password|secret|api_key|.env` 全部 meta-reference (0 actual leak);`MPEdu`/`明報` hits 屬 labelled historical reference (S8 governance-clean) + historical SESSION_LOG audit trail (留底). Push-ready 無 mandatory scrub.
- **QC:**
  - Push verification: every push confirmed via remote ref update (10/10 success)
  - GitHub credential auto-passed (Windows Credential Manager, no token prompt)
  - npm CLI smoke test: `node bin/aps.js` with `--help` / `init` / unknown 3 path 全 work
  - Cross-doc brand sync: 0 stale, 4 new across 4 docs HTML files
  - Stale terminology purge in docs/index.html rewrite: 0 hit for Phase 4 / Block 4 / T0b / mpedu / 焙入啟動 / 不可變交接包 / from_adam / from_jay
  - New install command (1 hit) + funnel audit reference (2 hits) present in docs/index.html
  - PII / secrets scan: 0 introduced
- **Sync:**
  - APS user-facing docs change: confirmed (README + docs/index.html 全 rewrite + site-nav sync 4 file)
  - New file or directory: confirmed (`bin/`, `package.json`, `LICENSE`, funnel audit doc — covered by existing registry rows + new entry layer row)
  - Distribution channel: confirmed (npm @adamchanadam/aps;reserve; publish deferred)
- **Pending(per funnel audit roadmap):**
  - Phase X-2 真 `init` orchestration: detect Claude Code → install skill → greet (placeholder release 仲喺度;真實邏輯未做)
  - Phase X-3 `skills/aps/SKILL.md` + setup subflow + dialogue script (conversational craft sub-deliverable)
  - Phase X-4 daily-use subflow (publish / inbox-check / troubleshoot)
  - Phase X-5 Layer D doc re-position (walkthrough §1 disclaimer + Phase 4 plan cross-reference)
  - Phase X-6 auto-update mechanism
- **Risks(updated):**
  - npm publish 仲未做 — `npx @adamchanadam/aps init` 即時試會 404 until publish;acceptable trade-off (等真 `init` 邏輯齊一齊 publish 0.2.0,避免出 deceptive placeholder release)
  - Distribution channel 拍板 done (npm); Phase X-2 unblocked
  - Walkthrough Layer D re-position 仲未落 — 用戶可能仲會 stumble 入去當必讀(目前緊靠 README + docs/index.html 嘅 「deeper-dive reference」 framing 引導)
  - Previously closed risks unchanged: demo workspaces kit alignment, generic-template pivot, no remote git
- **Log maintenance:** kept;new entry at top;S8-S1 retained as-is.

### S9 Continuation (2026-05-22 later, same session) — Voice rewrite × 5 + walkthrough concrete + demo fixtures + design doc reframe

User Adam 於 S9 reconcile #1(`230503d`)之後 持續推進。下 8 個 commits 之 work:

| 範圍 | Commit | 主要內容 |
|---|---|---|
| 主頁 README v1 | `166e1b3` | 站讀者立場 + 前置 Agent Handoff Kit(初版仍粵語) |
| 主頁 README v2 | `d1013bc` | 全當代繁體書面語(Adam 三度 escalate「不得硬砌中文詞語,全面用當代繁體書面語」之後) |
| 入口頁 docs/index.html | `fcc61ed` | 全 voice + 5 個核心設計 plain reframe + 加 Agent Handoff Kit prereq section |
| 內部檢討 funnel audit | `cc8790a` | 全 voice;框架代號(Stage / Layer / Phase)留內部 SSOT;Phase X-1 標記已完成、Q1 npm distribution 拍板 |
| 設置教學 walkthrough 第一輪 | `3636f7b` | 第一次 voice rewrite + ship `examples/demo-agent-{a,b}/dev/rules/aps-bridge.md` + `examples/README.md` |
| §5 step 1 sample | `e92962d` | Concrete rewrite sample(Adam pattern preview) |
| Walkthrough batch concrete | `2d9d40f` | Adam confirm sample pattern 之後:加 §3 工作目錄 + cascade renumber(11→13 sections)+ §6 全 6 step + §7 全 step concrete rewrite(子步驟 + prompt + expected output 表 + 失敗處理 callout + acceptance) |
| 設計理據 design doc | `78b52eb` | 全 voice;header「第一個落地實例」→「example narrative」;§12.3 加「2026-05-20 歷史快照」 disclaimer;Bridge Pack reference 路徑保留不變 |

**累積成果:**

- 5 份人讀文檔(主頁、入口頁、設置教學、內部檢討、設計理據)全部當代繁體書面語化
- Walkthrough wall 修補:新 §3「準備你嘅項目工作目錄」 + 修 §5 step 1 wrong instruction(「睇 AGENTS.md 頭幾行記低版本」 → 「執行 doctor 自動報版本」)+ ship demo fixtures(讀者 clone repo 即可揾到,不再依賴 maintainer 機嘅 sibling path)+ 每 step concrete actionable form
- 新 memory file:`feedback-doc-voice.md`(三度 escalate 後 strict 「全用當代繁體書面語」 rule);`reference-agent-handoff-kit-prerequisite.md`(所有入門文件明寫 Agent Handoff Kit 前置)
- Verbatim 用戶觸發句保留於 `<code>` blocks 內(「Hub 有新嘢」 / 「check Hub」 / 「未消化」 / 「睇下 Hub 有冇新嘢」)
- 跨文檔 narrative consistency:Adam / Jay disclaimer / 痛點 → 安裝 → 使用 → 深入 之 pattern 一致

**Git history this session 累積(19 commits, all pushed to origin/main):**

- S8 + walkthrough audit + GitHub bootstrap(10 commits):`65456c0` / `3cc0b13` / `5f8d46e` / `3d1f716` / `5b0b94f` / `8a86dcb` / `62878d5` / `e6e38fd` / `b0255c1` / `89b3012`
- S9 reconcile #1:`230503d`
- S9 continuation(8 commits):`166e1b3` / `d1013bc` / `fcc61ed` / `cc8790a` / `3636f7b` / `e92962d` / `2d9d40f` / `78b52eb`

**QC:**

- 每 voice rewrite 後 grep 確認粵語 colloquial marker 0 hit(除 verbatim user trigger phrase 於 code blocks)
- 跨文檔 narrative consistency 驗證:README + docs/index.html + walkthrough §1 disclaimer 之 「Adam / Jay = User A / User B」 framing 一致;§2 安裝先決事項 對齊;Agent Handoff Kit prereq wording 對齊
- 8 個 push 全部 verify by remote ref update
- Walkthrough §6 step 1 sample(`e92962d`)Adam confirmed pattern OK,後續 batch concrete rewrite 之 §6 / §7 跟同樣 pattern

**Pending:**

- Phase X-2 真 `init` orchestration 仍待建構
- Phase X-3 skill setup subflow 仍未起手
- 真實 user-flow test:Adam 可於 throw-away folder 嘗試跟 walkthrough §2 → §3 → §6 真做一次,撞 wall surface
- Phase X-5 walkthrough §1 disclaimer 待 skill 落地後加「想 AI 帶你做就講 set up APS」 reframe

**Risks(updated):**

- Walkthrough §6 step 2-6 + §7 雖 concrete rewrite,但仍待真實 user 跑一次驗證 wording / pattern 是否真係跟得到 — 即係 sample pattern Adam confirmed OK,但全 batch 仲待 acceptance test
- 設計理據 §12.3 仍保留 Adam-Jay specific path(有 disclaimer 標明 historical),將來如轉 public 應 sanitize

### Next Session Opening Message

(regenerated in `dev/SESSION_HANDOFF.md` — see there. Convenience copy at `START_NEXT_SESSION_PROMPT.txt`.)

## Entry Template

````markdown
## <YYYY-MM-DD> — <short session title>

- **ID:** <agent_or_session_id>
- **Summary:** <one sentence>
- **Changed:** <files changed, or none>
- **Done:** <work completed this session>
- **QC:** <checks run and results, or why not run>
- **Sync:** <doc/external sync status>
- **Pending:** <next work>
- **Risks:** <known risks or none>
- **Log maintenance:** <kept/summarized/archived/not_needed and why>

### Next Session Opening Message

📋 Next session: copy and paste the whole block below

```text
Work in <absolute project root>.

Read in order:
1. AGENTS.md
2. dev/SESSION_HANDOFF.md
3. dev/SESSION_LOG.md
4. dev/PROJECT_INDEX.md
5. dev/RULE_PACKS.md

Read dev/DOC_SYNC_REGISTRY.md before file changes or closeout.

If this root does not match the expected project root, stop and ask for confirmation.

After reading, summarize current objective, confirmed decisions, pending work, risks, and the next recommended action.
```
````
