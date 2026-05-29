# Session Handoff

Last Updated: 2026-05-29 (S47 full closeout — built/verified/committed **0.2.13 第三段+**: aligned all public surfaces (README + docs/index.html + walkthrough + maintainers) to the three-question / items / invite model, **unified the shared-folder default name `AI_Public_Squares` → `Agent_Public_Squares`** (scrubbed every user-facing default / example; existing folders untouched, compat), rewrote `starterPackContent()` into a short forwardable invite message + new **joiner page** `docs/guides/aps-join-invite.html`, plus **B4/B5** (peer-starter note + project-scoped starter-pack filename). One codex read-only review of the starter-pack design (gpt-5.5). **第四段 UAT GREEN** in an isolated sandbox. Two new commits this session: `3d1dcd1` (第三段+), `10bd98b` (B4/B5). **Nine local commits ahead of origin/main (`ff044e9`); working tree clean; NOTHING pushed, tagged, or published.** npm latest stays `0.2.12`; `package.json` still `0.2.12` (version bump is 第五段). Only 第五段 (gated release) remains.)

<!-- ack:section:durable-anchors -->
## Durable Anchors

Stable facts that should survive across sessions. Update only when they change, but verify they still match reality at closeout.

1. Project root and boundary: `C:\Users\adam\_claude_desktop\AI_Public_Squares` is the design / implementation / documentation SSOT workspace for Agent Public Squares (APS). It is not a product runtime workspace. The local working-folder name is still `AI_Public_Squares`; that rename AND the real Drive-hub folder rename are both DEFERRED to a separate no-live-session task (renaming a live folder mid-session breaks this session's cwd; renaming the shared Drive hub is an external + shared op). 0.2.13 (unreleased) changes only the DEFAULT shared-folder name for NEW installs to `Agent_Public_Squares` and scrubs the underscore `AI_Public_Squares` from user-facing defaults / examples; existing `AI_Public_Squares` folders + configs keep working; the `AI Public Squares` product alias (with a space) is retained.
2. Product identity: Agent Public Squares is a cross-machine collaboration protocol and npm package (`@adamchanadam/aps`, Apache-2.0) for AI agents exchanging structured packets through a locally synced shared folder. `AI Public Squares` is a recognized LEGACY alias; `APS` is the abbreviation; the npm package name stays `@adamchanadam/aps`. npm latest is `0.2.12` (pre-release, published S44). Nothing newer is published.
3. Governance model: Agent Handoff Kit doctor is the governance health check for this root. External skill flows, demo workspaces, and other tool outputs are subordinate evidence; this root's handoff / log / index / registry are authoritative for this workspace.
4. Runtime storage boundary: the shared Drive folder at `G:\我的雲端硬碟\Adam 工作目錄\AI_Projects\AI_Public_Squares\` owns runtime `_hub/`, templates, lane data, and ack files. This repo owns npm package source, public docs, plans, and QC truth. Structural tokens `hubRoot` / `--hub-root` / `_hub/` / `<hub_root>` / PROTOCOL schema / `setupHub` / `doctorHub` must NOT be renamed; only user-facing prose says 「共用 Drive 資料夾」.
5. Release boundary: GitHub repo `Adamchanadam/agent-public-squares` is public; Pages serves from `main` root. GitHub pre-release `v0.2.12` (tag `v0.2.12`→`c9e8057`) is the latest release; older `v0.2.8`→`136042c` retained. npm `@adamchanadam/aps@latest` = `0.2.12`. The receive trigger is `check Drive` (legacy `check Hub` still recognized as a hidden alias). Do not reuse the old repo name `ai-public-squares` (breaks GitHub redirects). Project remains pre-release.
6. Product scope decision (locked 2026-05-29 S45): the automation / background-notification / scheduling layer — `aps watch`, file-based `_notify`, OS / AI-platform scheduling, desktop notifications, Telegram-bot auto-send / auto-pushing into a running session — is **OUT OF APS SCOPE**, NOT deferred. APS is a manual, human-in-loop, synced-folder structured-handoff protocol: it produces a copy-ready human notification and the receiver runs `check Drive` by hand. Deferred (still in-scope future): true multi-agent platform, multi-recipient packet, group alias, Project Context Index, Dropbox / OneDrive formal support.
7. QC discipline (locked 2026-05-29 S46): `bin/aps.js` is the user-visible-behaviour truth source; `skills/aps/**` and public docs are teaching layers that must follow it. Structure-level checks (`description` ≤1024 / valid YAML / trigger phrases / section + link integrity) passing does NOT mean the behaviour / product model is aligned — the two are not interchangeable. When CLI behaviour changes (question count, flags, generated artifacts, command contracts, exit codes), the teaching layers must be re-aligned, or the divergence recorded as a blocking gate in Risks + release gate. SSOT for this rule: `dev/qc/triggers.md` 外發前檢 9(d); memory `feedback-structure-vs-behaviour-drift`.

<!-- ack:section:closeout-reconciled-state -->
## Closeout-Reconciled State

This is the current-state area. At every full closeout, rewrite or explicitly confirm every section below. Do not append a new state snapshot under an old one.

<!-- ack:section:current-baseline -->
## Current Baseline

1. Workspace: `C:\Users\adam\_claude_desktop\AI_Public_Squares`, branch `main`, remote `origin = https://github.com/Adamchanadam/agent-public-squares.git`. `origin/main` == `ff044e9` (S44 closeout). HEAD == `10bd98b` (S47 B4/B5). Local is **9 ahead** of origin/main; working tree clean; **NOT pushed**. The nine: `18caf2f` (S45), `387fc5e` / `ac1ab55` (0.2.13 第一段 CLI), `d67dbaa` (Kit 0.3.14), `afd7c3a` (QC 9(d) mechanism), `b9061c2` (0.2.13 第二段 skill), `3ff71b3` (S46 closeout), `3d1dcd1` (0.2.13 第三段+), `10bd98b` (0.2.13 B4/B5).
2. Public release: npm latest `@adamchanadam/aps@0.2.12`; GitHub pre-release `v0.2.12` latest. **`package.json` is still `0.2.12`** (version bump to 0.2.13 is 第五段). Nothing published / pushed / tagged / released. Public install path unchanged.
3. **0.2.13 progress: 第一段 (CLI) + 第二段 (skill) + 第三段+ (public surfaces + naming unification + starter-pack rewrite + joiner page) + B4/B5 DONE & committed locally; 第四段 UAT GREEN.** Only **第五段 (gated release)** remains: version bump 0.2.13 → release-check / full-check → npm publish → push → Pages → GitHub release (each external action needs Adam's explicit authorization).
4. **Naming unification (0.2.13, unreleased):** new installs default the shared folder to `Agent_Public_Squares`; the underscore `AI_Public_Squares` is scrubbed from every user-facing default / example (bin/aps.js init prompt, README, docs HTML, setup-dialogue, demo fixtures; bridge-pack placeholder token renamed neutral `<your_shared_drive_folder_absolute_path>`). The `AI Public Squares` product alias (space) + `check Hub` trigger stay recognized. Existing `AI_Public_Squares` folders / configs keep working. `docs/plans/*.md` keep the real-hub `…\AI_Public_Squares\` path as fact (not scrubbed).
5. **New joiner page** `docs/guides/aps-join-invite.html` (linked from the CLI starter pack + guides hub + `dev/PROJECT_INDEX.md`): non-technical invited-peer flow — Drive share + offline-sync, a separate local work folder, AI-guided install **with the three actual commands**, must-match project code, success check. `starterPackContent()` rewritten to a short forwardable written-Chinese invite message ending with this page's link; old inline commands / Bridge Pack section / raw publish command removed. B4/B5: `peer starter` prints a「未建立 peer」note; starter-pack filename is now project-scoped (`starter-pack-<project>-<peer>.md`).
6. Governance state: brand / vocab discipline holds. QC 9(d) behaviour-truth gate IN FORCE and now **PASSED for 0.2.13** (CLI ↔ skill ↔ public docs aligned; the prior public-HTML blocking item is cleared). Handoff Kit doctor re-run at this closeout (see Validation / QC).

<!-- ack:section:task-understanding-summary -->
## Task Understanding Summary

<!-- ack:field:user-intent -->
- User intent: build APS into a usable public pre-release product for non-technical users, with reliable natural-language AI-assisted cross-machine handoff. Adam wants strong product / UX judgment, fact-checkable delivery, and root-cause governance — not patch-stacking.
<!-- ack:field:task-essence -->
- Task essence: **0.2.13 humanize-onboarding is nearly complete.** 第一段 (CLI) / 第二段 (skill) / 第三段+ (public surfaces + naming unification `Agent_Public_Squares` + starter-pack rewrite + new joiner page) / B4/B5 are DONE & committed; 第四段 UAT is GREEN. Only **第五段 (gated release)** remains — version bump → release-check / full-check → npm publish → push → Pages → GitHub release, each external action needing Adam's explicit authorization.
<!-- ack:field:success-criteria -->
- Current success criteria: 0.2.13 lands every stage; the public surfaces + starter pack + joiner page are aligned to the shipped three-question / items / invite model (9(d) PASSED); the shared-folder default name is unified to `Agent_Public_Squares` for new installs without breaking existing `AI_Public_Squares` folders; automation stays out of scope; items stays an explicit contract. 第五段 release is the last gate; every external action is individually authorized.

<!-- ack:section:active-objective -->
## Active Objective

The active build is **0.2.13 「人性化上手」**, staged. 第一段–第四段 are DONE; only 第五段 (gated release) remains.

- **第一段 — CLI (DONE, `387fc5e` + `ac1ab55`).** Three-question `init` (no counterpart); `doctor` local-core vs peer split (solo passes); `publish` actionable no-recipient prompt + reachability gate (explicit `--to` blocks, config-default partner warns); starter pack moved init→`peer add`; items explicit contract (`--items` verbatim into frontmatter, frontmatter-only read, revise preserve / `--clear-items`); S45 truncation fix.
- **第二段 — skill (DONE, `b9061c2`).** `SKILL.md` + `setup-dialogue.md` aligned to three-question / items / invite; `description` 729 ≤1024 valid.
- **第三段+ — public surfaces + naming + starter pack + joiner page (DONE, `3d1dcd1`).** README + `docs/index.html` + walkthrough + maintainers aligned to three-question / items (cleared the 9(d) public-HTML blocking item); **shared-folder default name unified `AI_Public_Squares` → `Agent_Public_Squares`** + full user-facing scrub (CLI init prompt, docs, demo fixtures, neutral placeholder token); `starterPackContent()` rewritten to a short forwardable written-Chinese invite message + link to the new **`docs/guides/aps-join-invite.html`** (joiner page, with the three install commands so a fresh joiner's AI can install); new `dev/release-notes/v0.2.13.md`; setup-dialogue §6 + guides hub + PROJECT_INDEX aligned.
- **B4/B5 (DONE, `10bd98b`).** `peer starter` prints a「未建立 peer」note; starter-pack filename project-scoped (`starter-pack-<project>-<peer>.md`).
- **第四段 — UAT (DONE, GREEN this session).** Isolated sandbox (temp hub + redirected HOME; real Hub + real `~/.claude` untouched), local 0.2.13 code: three-question init (Agent_Public_Squares) ✅, doctor solo passes ✅, peer add project-scoped starter pack ✅, jay join→confirmed ✅, publish --to with items verbatim in frontmatter ✅, inbox ✅, publish-no-recipient prompt exit 1 ✅, revise preserve / --clear-items ✅, consume ✅, old two-person config publish-without-`--to` warns+sends (not hard-blocked) ✅.

**Next = 第五段 — GATED release (the only remaining stage).** Bump `package.json` 0.2.12 → 0.2.13; run 🟡 外發前檢 / 🔴 全面檢; then — each individually authorized by Adam — `npm publish --access public`, `git push origin main` (9 commits), Pages readback, GitHub release (tag `v0.2.13` + release notes). Post-publish: read back npm latest / `npx ...@latest --help` / Pages / remote.

Out of APS scope (NOT deferred): `aps watch`, file-based `_notify`, OS / AI-platform scheduling, desktop notifications, Telegram-bot auto-send. Deferred (in-scope future): true multi-agent platform, multi-recipient packet, group alias, Project Context Index, Dropbox / OneDrive formal support, the local dev-folder + Drive-hub rename.

<!-- ack:section:completed-this-session -->
## Completed This Session

Record only work actually completed in the current session (S47). Earlier S46/S45 work is in `dev/SESSION_LOG.md` and the archive.

1. **Built 0.2.13 第三段+** (commit `3d1dcd1`): aligned README + `docs/index.html` + walkthrough + `docs/maintainers/index.html` to the three-question / items / invite model (cleared the 9(d) public-HTML blocking item); **unified the shared-folder default name `AI_Public_Squares` → `Agent_Public_Squares`** and scrubbed the underscore name from every user-facing default / example (CLI init prompt, README, docs HTML, setup-dialogue, demo fixtures; bridge-pack placeholder token → neutral `<your_shared_drive_folder_absolute_path>`); rewrote `starterPackContent()` into a short forwardable written-Chinese invite message + link; created the new joiner page `docs/guides/aps-join-invite.html` (with the three install commands) + wired it into the guides hub + `dev/PROJECT_INDEX.md`; aligned setup-dialogue §6; wrote `dev/release-notes/v0.2.13.md`.
2. **B4/B5** (commit `10bd98b`): `peer starter` prints a「未建立 peer」note; starter-pack filename project-scoped (`starter-pack-<project>-<peer>.md`).
3. **One codex read-only review** (gpt-5.5) of the starter-pack gap analysis: confirmed all 13 identified gaps + found 6 more (work-folder ≠ Drive root, wrong path level, AI-guide safety frame, two-layer structure, peer-starter ambiguity, filename collision) — folded in. Evidence `dev/qc/evidence/2026-05-29-codex-starterpack-review/` (out.txt; not committed).
4. **第四段 UAT GREEN** (isolated sandbox; real Hub / real `~/.claude` untouched; local 0.2.13 code): all scenarios pass (see Active Objective + Validation / QC).
5. **Used a dynamic Workflow** (6 sub-agents) for the read-only 第三段 audit + plan, then verified everything against the real files myself (the workflow's line numbers drifted, so its output was a cross-check, not patch coordinates).
6. **Decisions**: fold the starter-pack rewrite + naming unification into 0.2.13; default folder name = `Agent_Public_Squares` (Adam's call); the work folder stays a separate local folder (NOT inside the shared hub); local dev-folder + Drive-hub rename deferred (no-live-session / external task); the real-hub content is disposable UAT (no migration concern) but renaming the shared Drive hub stays a manual external op.
7. **Two checkpoint commits this session** (`3d1dcd1`, `10bd98b`), each on Adam's explicit authorization; nothing pushed / published.
8. **S47 full closeout**: this handoff reconciled; S47 log entry + N-rule; PROJECT_INDEX workspace identity; PROJECT_DECISIONS appended; START regenerated.

<!-- ack:section:next-priorities -->
## Next Priorities

1. **Build 0.2.13 第五段 — gated release (the only remaining stage).** Bump `package.json` 0.2.12 → 0.2.13; run 🟡 外發前檢 then 🔴 全面檢; then EACH individually authorized by Adam: `npm publish --access public`, `git push origin main` (9 commits), Pages readback, GitHub release (`v0.2.13` tag + notes from `dev/release-notes/v0.2.13.md`). Post-publish read-backs (npm latest / `npx ...@latest --help` / Pages / remote) required before claiming done.
2. **Local dev-folder + real Drive-hub rename → `Agent_Public_Squares`** — deferred; both are no-live-session / external-manual tasks (do NOT do mid-session; renaming the live cwd folder breaks the session, the Drive hub is shared). A manual checklist can be produced when Adam is ready.
3. **Project Context Index design** — deferred until after 0.2.13.

<!-- ack:section:next-task-required-reading -->
## Next Task Required Reading

Before acting on the next task, read or mark blocked:

| Source | Why required | Status |
|---|---|---|
| `AGENTS.md` | Active governance contract | confirmed |
| `dev/SESSION_HANDOFF.md` | Current state | confirmed |
| `dev/SESSION_LOG.md` latest entry (S47) | Current evidence | confirmed |
| `dev/PROJECT_INDEX.md` | Workspace map + source-of-truth pointers | confirmed |
| `dev/RULE_PACKS.md` | Task routing | confirmed |
| `dev/qc/triggers.md` | 🟡 外發前檢 / 🔴 全面檢 definitions | required before 第五段 release-check |
| `dev/rules/release.md` | Release verification + evidence | required before any publish / push |
| `dev/DOC_SYNC_REGISTRY.md` | Release row: read back registry / release body / live page / remote after publish | required before / after release |
| `dev/release-notes/v0.2.13.md` | Drives the GitHub release body | confirmed (written S47) |
| `package.json` | version still 0.2.12 — bump to 0.2.13 is the first 第五段 step | required before release |
| `bin/aps.js` + `skills/aps/**` + README + `docs/**` | The shipped 0.2.13 behaviour + teaching (all aligned, 9(d) passed) | confirmed |

<!-- ack:section:risks-blockers -->
## Risks / Blockers

1. **Nine local commits unpushed** (`18caf2f` … `10bd98b`). Nothing pushed / published. Push / publish needs Adam's explicit per-action authorization (第五段).
2. **9(d) public-HTML blocking item is CLEARED.** README + docs HTML + skill + CLI now all teach the three-question / items / invite model; 第四段 UAT GREEN. At 第五段 release-check, re-run 外發前檢 #9 / 9(d) as a final confirmation before publish (it should pass).
3. **`package.json` still 0.2.12.** The version bump to 0.2.13 is the first step of 第五段; do not publish / tag before bumping. npm latest is still 0.2.12 — do not promise the three-question install as a SHIPPED behaviour on any public page until 0.2.13 actually publishes.
4. **`items` must use the explicit contract, never prose-parsing** (codex-validated, UAT-confirmed): sender declares `--items`; CLI records verbatim into frontmatter; reader reads frontmatter only; `revise` preserves prior items unless `--items` / `--clear-items`.
5. **Naming / rename discipline.** New installs default to `Agent_Public_Squares`; existing `AI_Public_Squares` folders + configs keep working — do NOT force-migrate. Underscore `AI_Public_Squares` scrubbed from user-facing defaults only; `docs/plans/*.md` keep the real-hub path as fact; `AI Public Squares` (space) product alias + `check Hub` trigger stay recognized. The local dev-folder + Drive-hub rename are DEFERRED and must NOT be done mid-session (live-cwd / shared-folder hazards); they are manual / no-live-session tasks.
6. **Automation stays out of scope**: never re-add `watch` / `_notify` / OS+platform scheduling / desktop notifications / Telegram-bot auto-send.
7. **Brand / structural discipline**: never rename `hubRoot` / `--hub-root` / `_hub/` / PROTOCOL schema / `setupHub` / `doctorHub`; never reuse `ai-public-squares`. Any skill frontmatter edit re-measures `description` ≤1024 + valid YAML (currently 729).
8. **codex / claude-p invocation**: call directly (NOT `cmd /c`); long / Chinese prompts via a UTF-8 prompt file + `"$(cat file)" < /dev/null`. Runbook `GENERIC_OPERATIONAL_RUNBOOK.md` §3i / §5k.
9. **Per-project Drive verification still required** for each real project (path, offline availability, sync).
10. **Real Hub / scratch**: the real Drive hub keeps UAT slugs (Jay's un-consumed feedback packet etc.); Adam confirmed the hub content is disposable UAT (no migration concern). The S47 UAT ran in an OS-temp sandbox (`%LOCALAPPDATA%\Temp\claude\tmp.L2ZSZPNfCZ`) with redirected HOME; left in place (not rm-rf'd per the destructive-command rule; OS cleans temp).
11. **QC discipline in force**: structure-pass ≠ behaviour-aligned; `bin/aps.js` is the behaviour truth; teaching layers follow; staged CLI-ahead-of-teaching is tracked as a blocking item in Risks + release gate (the prior public-HTML instance is now cleared). SSOT `dev/qc/triggers.md` 外發前檢 9(d); memory `feedback-structure-vs-behaviour-drift`.

<!-- ack:section:validation-qc -->
## Validation / QC

- 第三段+ : `node --check bin/aps.js` clean; **9(d) grep — onboarding/shipped surfaces show 0 underscore `AI_Public_Squares`, 0 old-model markers (五個值 / 設定起手方向 / 對方 agent id as init / 與角色 / 身份對調)**; HTML `<section>` balance (index 10/10, walkthrough 16/16, maintainers 5/5, join-page 7/7); 0 local `.md` hyperlinks in docs HTML; legacy aliases + structural tokens preserved; `git diff --check` clean.
- **第四段 UAT — GREEN** (local 0.2.13 code; isolated OS-temp sandbox; redirected HOME): three-question init (Agent_Public_Squares) exit 0; doctor solo passes (本機核心齊全) exit 0; peer add → project-scoped `starter-pack-branding_2026-jay.md` provisional; starter-pack content correct (Agent_Public_Squares / project / jay / join link; no AI_Public_Squares); jay join → confirmed; `publish --to jay --items` → frontmatter `- id:` verbatim ×2; inbox sees packet + items; publish no-recipient → actionable guidance exit 1; revise without `--items` preserves (v2 keeps 2 items), `--clear-items` empties (v3 `items: []`); consume writes ack; old two-person config publish-without-`--to` warns + sends (not hard-blocked). Real Hub + real `~/.claude` confirmed untouched (skill installed to redirected HOME).
- One codex read-only review (gpt-5.5) of the starter-pack design — all gaps confirmed + 6 more found; folded in.
- bridge-pack smoke: `bridge-pack --role A` substitutes the renamed neutral token; no old-name / old-token leak. B4/B5 smoke: `peer add` / `peer starter` dry-run show project-scoped filename + the new `peer starter` note; SKILL `description` 729.
- Agent Handoff Kit doctor: re-run at this closeout — result in the closeout card.
- `START_NEXT_SESSION_PROMPT.txt` regenerated at this closeout.

<!-- ack:section:workspace-identity -->
## Workspace Identity

Expected project root: `C:\Users\adam\_claude_desktop\AI_Public_Squares`
Git root: same
Branch: `main`
Latest pushed state: `origin/main` == `ff044e9` (S44 closeout). HEAD == `10bd98b` (S47 B4/B5). Local is **9 ahead** of origin/main, unpushed. The nine: `18caf2f` (S45), `387fc5e` / `ac1ab55` (0.2.13 第一段), `d67dbaa` (Kit 0.3.14), `afd7c3a` (QC 9(d)), `b9061c2` (0.2.13 第二段), `3ff71b3` (S46 closeout), `3d1dcd1` (0.2.13 第三段+), `10bd98b` (0.2.13 B4/B5). npm latest `0.2.12`; tag `v0.2.12`→`c9e8057`; GitHub pre-release `v0.2.12` latest. `package.json` still 0.2.12. **NO push / tag / release / npm publish / Pages this session.**
Remote: `origin = https://github.com/Adamchanadam/agent-public-squares.git` (public, Apache-2.0, HTTPS via Windows Credential Manager). GitHub auto-redirects old web+git URLs but NOT Pages — do not reuse the old slug.
Worktree status: **clean after the `10bd98b` commit.** Agent Handoff Kit recorded version `0.3.14`. Outside the repo (not git-tracked): memory files in `~/.claude/projects/.../memory/`; `GENERIC_OPERATIONAL_RUNBOOK.md`; `dev/qc/evidence/2026-05-29-codex-starterpack-review/` (codex review `out.txt`, not committed). The S47 UAT sandbox is in OS temp (`%LOCALAPPDATA%\Temp\claude\tmp.L2ZSZPNfCZ`), outside the repo. Local working folder still named `AI_Public_Squares` (rename deferred).
Execution environment note: Claude Code on Windows, git-bash Bash tool + PowerShell tool. Isolated-hub tests use `cygpath -w` Windows paths + redirected HOME (real Hub + real `~/.claude` skills untouched); the redirect (HOME / USERPROFILE) and REPO/UAT paths must be re-exported in every Bash call (shell env does not persist between calls). codex via direct call (never `cmd /c`).

<!-- ack:section:sync-status -->
## Sync Status

Use statuses from `dev/DOC_SYNC_REGISTRY.md`: `confirmed`, `unverified`, `pending`, `blocked`, `not_applicable`.

- `bin/aps.js`: `confirmed` (committed `3d1dcd1` / `10bd98b`, unpushed) — 0.2.13 CLI incl. `Agent_Public_Squares` default + rewritten `starterPackContent()` + B4/B5; UAT GREEN; not published.
- `skills/aps/**`: `confirmed` (committed) — SKILL.md body + setup-dialogue §6 aligned to the new starter-pack / joiner model; description 729 valid.
- Public surfaces (`README.md`, `docs/index.html`, walkthrough, maintainers, guides hub): `confirmed` (committed `3d1dcd1`) — aligned to three-question / items; **9(d) PASSED** (was `blocked`, now cleared). New `docs/guides/aps-join-invite.html` created + indexed.
- `dev/release-notes/v0.2.13.md`: `confirmed` (committed) — drives the GitHub release body at 第五段.
- demo fixtures + `examples/README.md`: `confirmed` (committed) — scrub + neutral placeholder token.
- `dev/PROJECT_INDEX.md`: `confirmed` (join-page Fact Base row added; workspace identity updated at this closeout).
- npm / GitHub / Pages: `confirmed` unchanged at 0.2.12 — no release this session. `package.json` 0.2.12 (bump at 第五段).
- Memories + runbook + codex evidence: `confirmed` (outside repo / not committed).
- SESSION_LOG archive: `confirmed` — S47 closeout prepended; N-rule applied (see log maintenance).
- 0.2.13: 第一–四段 done & committed; **第五段 (gated release) `pending`**. Design in Active Objective + `dev/PROJECT_DECISIONS.md` + roadmap §7.

<!-- ack:section:state-reconciliation-check -->
## State Reconciliation Check

At full closeout, complete this check after updating the state sections above.

- Reconciled at: 2026-05-29 S47 full closeout, covering: built + verified + committed 0.2.13 第三段+ (`3d1dcd1`: public surfaces aligned, naming unification `Agent_Public_Squares`, starter-pack rewrite, new joiner page) and B4/B5 (`10bd98b`); one codex read-only review of the starter-pack design; 第四段 UAT GREEN in an isolated sandbox. The Next Session Opening Message and `START_NEXT_SESSION_PROMPT.txt` were regenerated from this state.
<!-- ack:field:state-sections-rewritten-or-confirmed -->
- State sections rewritten or confirmed current: Last Updated; Durable Anchors (anchor #1 updated for the Agent_Public_Squares default + deferred renames; #2–7 confirmed); Current Baseline (rewritten — 9 commits, 第一–四段 done + UAT green, package.json still 0.2.12); Task Understanding; Active Objective (第一–四 done, 第五 next); Completed This Session (S47); Next Priorities (第五段 only); Next Task Required Reading (release-focused); Risks / Blockers (9(d) cleared; naming/rename discipline added); Validation / QC (UAT green); Workspace Identity (HEAD 10bd98b, 9 ahead); Sync Status; this check; Handoff Sufficiency Check; Next Session Opening Message.
<!-- ack:field:stale-snapshots-left -->
- Stale snapshots left in this handoff: none. Historical detail lives in `dev/SESSION_LOG.md` (S47 + recent) and `dev/SESSION_LOG_archive/*`.
<!-- ack:field:lifecycle-conflicts-resolved -->
- Completed / pending / risk / opening-message lifecycle conflicts resolved or explicitly reclassified: yes. 第三段+ / B4/B5 / 第四段 reclassified from pending to done. The 9(d) public-HTML blocking item (prior Risks #2) is CLEARED and reclassified as a final release-check re-confirmation, not an open blocker. No completed item remains as an unresolved next priority. The only open work is 第五段 (gated release), consistently stated across Active Objective / Next Priorities / Risks / opening message.
<!-- ack:field:opening-message-matches-current-state -->
- Opening message matches current state: yes. `START_NEXT_SESSION_PROMPT.txt` regenerated during this full closeout.
<!-- ack:field:next-ai-can-continue -->
- Next AI can continue from `AGENTS.md`, this handoff, `dev/PROJECT_INDEX.md`, and needed rule packs without searching old log history: yes.

If any answer is no, blocked, or uncertain, fix this handoff before declaring handoff ready.

Lifecycle consistency rule: compare `Completed This Session`, `Validation / QC`, `Next Priorities`, `Risks / Blockers`, and `Next Session Opening Message`. A completed or verified item must not remain as an unresolved next priority, active risk, or startup instruction unless explicitly reclassified as monitor-only, follow-up scope, blocked, or reopened with the missing evidence or trigger condition stated.

<!-- ack:section:handoff-sufficiency-check -->
## Handoff Sufficiency Check

Can the next AI continue from `AGENTS.md`, this handoff, `dev/PROJECT_INDEX.md`, and needed rule packs without searching old log history?

Answer: yes.

Continuity rule: this file carries current state and next action. `SESSION_LOG.md` carries recent evidence only. Archive old detail only when needed; do not create an archive directory by default.

<!-- ack:section:next-session-opening-message -->
## Next Session Opening Message

📋 Next session: copy and paste the whole block below

```text
Work in C:\Users\adam\_claude_desktop\AI_Public_Squares (template SSOT for Agent Public Squares; npm `@adamchanadam/aps`; GitHub repo Adamchanadam/agent-public-squares is public; Pages enabled). Local working-folder name is still `AI_Public_Squares` (rename deferred).

Current state (2026-05-29, end of S47): npm latest is `@adamchanadam/aps@0.2.12` (published pre-release); `package.json` is still `0.2.12` (bumping to 0.2.13 is the first step of the release). There are NINE local commits ahead of origin/main (`ff044e9`); working tree clean; NOTHING pushed, tagged, or published. The two newest: `3d1dcd1` (0.2.13 第三段+), `10bd98b` (0.2.13 B4/B5).

0.2.13 「人性化上手」: 第一段–第四段 are DONE & committed locally, and 第四段 UAT is GREEN. Only 第五段 (gated release) remains.
- 第一段 (bin/aps.js): three-question init (no counterpart), doctor local-core vs peer split (solo passes), publish actionable no-recipient prompt + reachability gate (explicit --to blocks / config-default partner warns), starter pack moved init→peer add, items explicit contract (--items verbatim into frontmatter, frontmatter-only read, revise preserve / --clear-items), S45 truncation fix.
- 第二段 (skills/aps): SKILL.md + setup-dialogue aligned to three-question / items / invite; description 729.
- 第三段+ (3d1dcd1): README + docs/index.html + walkthrough + maintainers aligned to three-question / items (cleared the 9(d) public-HTML blocker); UNIFIED the shared-folder default name AI_Public_Squares → Agent_Public_Squares and scrubbed the underscore name from every user-facing default/example (CLI init prompt, docs, demo fixtures; bridge-pack placeholder token → neutral <your_shared_drive_folder_absolute_path>); rewrote starterPackContent() into a short forwardable written-Chinese invite message + link to the NEW joiner page docs/guides/aps-join-invite.html (which carries the three install commands so a fresh joiner's AI can install); wrote dev/release-notes/v0.2.13.md; aligned setup-dialogue §6 + guides hub + PROJECT_INDEX.
- B4/B5 (10bd98b): peer starter prints a「未建立 peer」note; starter-pack filename project-scoped (starter-pack-<project>-<peer>.md).
- 第四段 UAT GREEN (isolated OS-temp sandbox, redirected HOME, real Hub + real ~/.claude untouched, local 0.2.13 code): three-question init Agent_Public_Squares; doctor solo passes; peer add → project-scoped starter pack; jay join→confirmed; publish --to jay --items → items verbatim in frontmatter; inbox; publish-no-recipient exit 1; revise preserve / --clear-items; consume; old two-person config publish-without-to warns+sends. All pass.

The approved next step is 0.2.13 第五段 — GATED release (the only remaining stage):
1. Bump package.json 0.2.12 → 0.2.13.
2. Run 🟡 外發前檢 (release-check) then 🔴 全面檢 (full-check) per dev/qc/triggers.md; re-confirm 外發前檢 #9 / 9(d) passes (it should — CLI ↔ skill ↔ docs already aligned).
3. Then EACH action individually authorized by Adam: `npm publish --access public`; `git push origin main` (9 commits); GitHub Pages readback; GitHub release (tag v0.2.13 + body from dev/release-notes/v0.2.13.md).
4. Post-publish read-backs before claiming done: `npm view @adamchanadam/aps version dist-tags.latest --json`, `npx --yes @adamchanadam/aps@latest --help` (expect v0.2.13), live Pages, remote branch/tag.

Do not commit, push, tag, release, publish, or change GitHub Pages unless Adam explicitly asks (each external action is its own authorization). Automation (watch / _notify / scheduling / desktop notif / bot auto-send) is OUT OF SCOPE — never re-add it. `items` uses the explicit contract, never prose-parsing; revise preserves prior items. New installs default the shared folder to Agent_Public_Squares; existing AI_Public_Squares folders keep working; the underscore name is scrubbed from user-facing defaults only (the `AI Public Squares` product alias with a space, and the `check Hub` trigger, stay recognized); the local dev-folder + Drive-hub rename are DEFERRED and must NOT be done mid-session.

Read in order:
1. AGENTS.md
2. dev/SESSION_HANDOFF.md
3. dev/SESSION_LOG.md (latest S47 entry)
4. dev/PROJECT_INDEX.md
5. dev/RULE_PACKS.md
6. dev/qc/triggers.md (🟡 外發前檢 / 🔴 全面檢; 9(d) behaviour-truth)
7. dev/rules/release.md (release verification + evidence)
8. dev/DOC_SYNC_REGISTRY.md (Release row: post-publish read-backs)
9. dev/release-notes/v0.2.13.md (GitHub release body source)
10. package.json (still 0.2.12 — bump first)
11. bin/aps.js + skills/aps/** + README + docs/** (the shipped 0.2.13 behaviour + teaching, all aligned)

If this root does not match the expected project root, stop and ask for confirmation.

Voice / writing hard rule: user-facing prose must be contemporary written Traditional Chinese; no piled-up technical terms or clause numbers as sentence subjects, no broken Chinese-English fragments, minimal English. Colloquial Cantonese only inside verbatim user-trigger quotes. HTML must not link local `.md` files; use plain `<span class="path">` for internal spec paths.

Brand / vocab discipline: display name `Agent Public Squares`; trigger `check Drive`; concept 「共用 Drive 資料夾」; new shared-folder default `Agent_Public_Squares`. `AI Public Squares` (space) and `check Hub` stay RECOGNIZED legacy aliases. Structural tokens `hubRoot` / `--hub-root` / `_hub/` / `<hub_root>` / PROTOCOL schema / `setupHub` / `doctorHub` must NOT be renamed. Do not reuse the old repo slug `ai-public-squares`. Any skill frontmatter edit re-measures `description` ≤1024 + valid YAML.

External review (read-only second opinion): call codex DIRECTLY, never via `cmd /c` (git bash MSYS mangles `/c`). Long/Chinese prompts: write a UTF-8 prompt file, then `codex exec --skip-git-repo-check -c sandbox_mode="read-only" -c approval_policy="never" "$(cat promptfile)" < /dev/null 2>&1 | tee out.txt`. Method recorded in C:\Users\adam\_claude_desktop\GENERIC_OPERATIONAL_RUNBOOK.md §3i / §5k.

QC vocabulary: if Adam says 跑快檢 / 跑外發前檢 / 跑全面檢 (quick-check / release-check / full-check), load dev/qc/triggers.md and run that tier; if vague, ask 「你指快檢 / 外發前檢 / 全面檢?」.

After reading, summarize current objective, confirmed decisions, pending work, risks, and the next recommended action.
```
