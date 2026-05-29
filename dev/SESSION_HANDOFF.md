# Session Handoff

Last Updated: 2026-05-29 (S44 — published 0.2.11 peer-lifecycle root-fix to npm latest, readback confirmed; full closeout reconciliation still pending). Prior: 2026-05-28 S43 full closeout — Codex load-fix + 0.2.9 / 0.2.10 npm publishes + Jay real-machine UAT + 0.2.11 root-fix built local + user-docs rewrite + agreed humanize-onboarding design for 0.2.12.

<!-- ack:section:durable-anchors -->
## Durable Anchors

Stable facts that should survive across sessions. Update only when they change, but verify they still match reality at closeout.

1. Project root and boundary: `C:\Users\adam\_claude_desktop\AI_Public_Squares` is the design / implementation / documentation SSOT workspace for AI Public Squares (APS). It is not a product runtime workspace.
2. Product identity: AI Public Squares is a cross-machine collaboration protocol and npm package (`@adamchanadam/aps`, Apache-2.0) for AI agents exchanging structured packets through a locally synced shared folder. Current npm latest is `0.2.11` pre-release (peer-lifecycle root-fix; published 2026-05-29 S44 on top of the 0.2.9 Project Peers scope + hub-root bracket-validation fix + Codex skill load-fix; prior latest was 0.2.10).
3. Governance model: Agent Handoff Kit v0.3.12 doctor is the current governance health check for this root. External skill flows, demo workspaces, and other tool outputs are subordinate evidence;this root's handoff / log / index / registry are authoritative for this workspace.
4. Runtime storage boundary: the Google Drive Hub at `G:\我的雲端硬碟\Adam 工作目錄\AI_Projects\AI_Public_Squares\` owns runtime `_hub/`, templates, lane data, and ack files. This repo owns npm package source, public docs, plans, and QC truth.
5. Release boundary: GitHub repo is public since 2026-05-23. GitHub Pages serves from `main` root. GitHub pre-release `v0.2.8` exists and points to commit `136042c` (GitHub release unchanged); npm `@adamchanadam/aps@latest` is now `0.2.11` (pre-release peer-lifecycle root-fix, published 2026-05-29 S44). Project remains pre-release.

<!-- ack:section:closeout-reconciled-state -->
## Closeout-Reconciled State

This is the current-state area. At every full closeout, rewrite or explicitly confirm every section below. Do not append a new state snapshot under an old one.

<!-- ack:section:current-baseline -->
## Current Baseline

1. Workspace: `C:\Users\adam\_claude_desktop\AI_Public_Squares`, branch `main`, remote `origin=https://github.com/Adamchanadam/ai-public-squares.git`.
2. Public release: GitHub pre-release `v0.2.8` is published at `https://github.com/Adamchanadam/ai-public-squares/releases/tag/v0.2.8` (GitHub release stays `v0.2.8`, not re-tagged). npm latest is now `@adamchanadam/aps@0.2.11` (pre-release peer-lifecycle root-fix, published 2026-05-29 S44). The public npm user path remains `npm install --save-dev @adamchanadam/aps@latest`, then guided `npx aps init`; existing APS projects can run `npx aps upgrade`.
3. Release state: release commit `136042c` was pushed to `origin/main`; tag `v0.2.8` was pushed and points to that commit. S43 published 0.2.9 then a 0.2.10 patch (hub-root bracket-validation fix); S44 then published 0.2.11 (peer-lifecycle root-fix). All three are npm-only (no new commit / push / tag / GitHub release), so `origin/main` and tag `v0.2.8` are unchanged. npm readback confirms version/latest `0.2.11`, bin `aps`, fileCount 14; `npx --yes @adamchanadam/aps@latest --help` shows v0.2.11.
4. Product strategy state: Adam challenged the single-counterpart project model after v0.2.8 UAT. The current direction is **Reliable Peer Handoff**: one project may have multiple peers, but each packet remains single-recipient. v0.2.9 candidate scope is Project Peers + Sent Status, not a true multi-agent platform.
5. Documentation state: `docs/plans/2026-05-28-aps-public-product-multi-agent-roadmap.md` now says Project Peers + Sent Status is the next candidate direction. It also records Project Context Index as a later background-index layer only: useful for project-level workstreams, decisions, waiting items, risks, and recent packet references, but not execution truth and not a project-management system. `.aps/config.json` `otherAgentId` is a two-person compatibility path only. README now records the tested install preflight that Agent Handoff Kit must be initialized before APS. Public HTML should not advertise local 0.2.9 as shipped until release. Brand state: `AI Public Squares` and `Agent Public Squares` are the same brand / same product name variant;`APS` is the abbreviation.
6. Governance state: Handoff Kit v0.3.12 doctor passes in this root. `START_NEXT_SESSION_PROMPT.txt` mismatch is a closeout reminder, not a failure. S42 closeout advanced the SESSION_LOG N-rule by archiving S32-S19 into archive batch 009 and reducing the hot log to 10 entries.

<!-- ack:section:task-understanding-summary -->
## Task Understanding Summary

<!-- ack:field:user-intent -->
- User intent: build APS into a usable public pre-release product for non-technical users, with reliable natural-language AI-assisted cross-machine handoff. Adam wants strong product / UX judgment, not just protocol correctness.
<!-- ack:field:task-essence -->
- Task essence: APS already has a two-agent packet protocol and npm-distributed CLI. The next high-value work is extending that reliable base into project-level peers: one project can hand different parts to Jay, Fanny, Jackie, etc., while every packet remains one-to-one and human-approved.
<!-- ack:field:success-criteria -->
- Current success criteria: roadmap, index, registry, and handoff must agree that v0.2.8 is the published two-person baseline, while local 0.2.9 candidate work is Project Peers + Sent Status. Project Context Index is a post-Peers background-index direction only. Public user surfaces must not imply unshipped Project Peers or Project Context Index are already supported. `START_NEXT_SESSION_PROMPT.txt` is regenerated only at full closeout.

<!-- ack:section:active-objective -->
## Active Objective

Active program (locked 2026-05-29): 0.2.11 is published (item 1). The next release is **0.2.12 「正名與框架」** (item 2, IN PROGRESS). The humanize-onboarding work is split out to **0.2.13** (the design block below). Threads in priority order:

1. **(DONE 2026-05-29 S44) 0.2.11 published to unblock Jay.** Adam chose option A and explicitly authorized the publish; `@adamchanadam/aps@0.2.11` is now npm latest (readback confirmed: registry version/latest 0.2.11, bin `aps`, fileCount 14; `npx @latest --help` shows v0.2.11). Remaining end-to-end step: Jay reinstalls `@latest` on the Mac and retries his reply, then confirm the provisional-block is gone in practice.

2. **0.2.12 「正名與框架」 (LOCKED 2026-05-29; IN PROGRESS — Stage 1 done, decisions recorded).** Rebrand + vocabulary switch + multi-peer walkthrough rewrite, validated by an independent codex (gpt-5.5, read-only, high reasoning) review at `dev/qc/evidence/2026-05-29-codex-0212-naming-review/codex_review.txt`. Locked decisions:
   - **Rebrand** `AI Public Squares` → `Agent Public Squares` on all forward-facing surfaces + everything the npm tarball carries (README, `package.json` description/repository/bugs/homepage, `bin/aps.js` help/banner/generated route/starter pack, `skills/aps/SKILL.md`, `skills/aps/references/setup-dialogue.md`, `resources/protocol/PROTOCOL.md` title, `examples/**/aps-bridge.md`, `docs/**`, `docs/qc/governance-map.html`, `dev/qc/triggers.md`, `dev/DOC_SYNC_REGISTRY.md` current rows). `AI Public Squares` stays a recognized LEGACY trigger alias. Do NOT touch history (release notes, audits, migration backups, archived logs).
   - **npm name unchanged**: `@adamchanadam/aps` stays (abbreviation identical → zero install break, version continuity). Only the description prose changes.
   - **GitHub repo rename** `ai-public-squares` → `agent-public-squares`: Pages project URL changes (project site URLs do NOT auto-redirect; clone/fetch/push do redirect but update the local remote). Sync README / HTML / `package.json` URLs / release body.
   - **Local folder DEFERRED — do NOT rename** `C:\Users\adam\_claude_desktop\AI_Public_Squares`: zero public value; renaming would break the running session + every hardcoded governance path. Only in a dedicated no-session window, last, as its own path-migration task.
   - **Vocabulary**: trigger `check Hub` → `check Drive` (display); keep `check Hub` as a hidden recognized alias. Concept word `Hub / Google Drive Hub / APS Hub` → `共用 Drive 資料夾` in user-facing PROSE only. KEEP structural terms `hubRoot` / `--hub-root` / `_hub/` / `<hub_root>` / PROTOCOL schema+paths. Add one explanatory line (config / README / walkthrough) that the config key is still `hubRoot`.
   - **The trigger lives in code**: `check Drive` must be added to `skills/aps/SKILL.md` (frontmatter description trigger list + body §6) AND `bin/aps.js` generated strings (RULE_PACKS route registration, notification templates, starter pack). Re-measure SKILL.md description ≤1024 after edit (was 701). Doc-only change is a no-op; existing users need `npm i @latest` + `npx aps upgrade` + restart AI tool.
   - **0.2.12 must NOT promise 0.2.13's 3-question install**: walkthrough may adopt multi-peer framing but the install section must stay accurate to the current 0.2.12 CLI.
   - **Existing Hubs not auto-rewritten**: `aps init` writes-if-missing; 0.2.12 = new installs get the new name; existing Hub PROTOCOL/starter not force-rewritten unless a separate migration is planned.
   - **Staging**: (1) record decisions [DONE S44] → (2) local rewrite [DONE S44 — 7 parallel sub-agents + integration QC: `node --check` OK; skill description 729 ≤1024; `npm pack` 0.2.12 / 14 files; CLI banner = Agent Public Squares / 共用 Drive / v0.2.12, consistent with the skill brand card; `check Drive` added to RULE_PACKS route recognition with `check Hub` kept as alias; all 5 user docs `<section>` balanced; walkthrough reframed to multi-peer + flow-diagram recipient WITHOUT promising 0.2.13's 3-question install; PROTOCOL only title/intro rebranded, structure kept; examples needed no change] → (3) release-check [PARTIAL: mechanical + item-9 content/model deep review GREEN; PENDING = HTML browser render, new-install/`upgrade` smoke, PII/placeholder sweep] → (4) GitHub rename [LOCAL PART DONE S44: all 9 in-file `ai-public-squares`→`agent-public-squares` URLs synced (package.json 3 / README 6 / bin/aps.js 1 / docs/index.html 1; old-slug residual=0, node --check OK, package.json valid); `git remote set-url origin` → agent-public-squares confirmed. DONE S44: Adam renamed the repo on GitHub to `Adamchanadam/agent-public-squares` (PUBLIC, verified via `gh repo view`); `git ls-remote origin` reaches `main`@cde082b; new Pages URL `adamchanadam.github.io/agent-public-squares/docs/index.html` returns 200; old Pages URL returns 404 (expected — Pages project URLs do not redirect per GitHub docs). NOTE: the live Pages still shows the OLD brand "AI Public Squares" because Pages serves the pushed `main` commit and the 0.2.12 rebrand is still local/un-pushed — this resolves at stage 6 push, not a defect. Do not reuse the old repo name later or redirects break.] → (5) GATED npm publish 0.2.12 + readback → (6) GATED push docs/Pages + GitHub release body (name unchanged / repo renamed / `check Hub` still recognized / users must reinstall+upgrade+restart) → (7) clean UAT (`check Drive` routes / `check Hub` still routes / old `hubRoot` intact). Stages 4–6 each need Adam's explicit authorization. **PRE-STAGE-5 reconciliation**: version-status lines still say 0.2.8 (SKILL.md L8 status block says v0.2.8/0.2.9; README npm-latest) — reconcile with the public-framing decision before npm publish. **Flagged non-gating**: `tools/aps-onboard.ps1` (not in npm tarball, legacy Phase-4 helper) still uses `check Hub`; the shared Drive FOLDER name `AI_Public_Squares` was kept in docs as a path/compat token (decision point — keep for existing users vs rename suggestion for new installs).

3. **0.2.13 humanize-onboarding** (deferred to after 0.2.12; design consensus below).

### 0.2.13 — humanize-onboarding design (consensus; deferred to after 0.2.12)

- **Install asks only three things**: where the shared Drive folder is, the project name, and your own name. The counterpart's name is no longer required at install.
- **Do not stop at "installed"**: show a completable next step (invite someone / check the Drive / send a test handoff).
- **Add collaborators on-demand during use**: "邀請 Fanny" creates the candidate peer + starter pack; "把這部分交給 Fanny" requires Fanny confirmed first.
- **Vocabulary (Hub → Drive, outer layer only)**: user-facing prose uses 「共用 Drive 資料夾」 (not bare "Drive", to avoid confusion with the whole Google Drive). Promote the trigger 「check Drive」 but KEEP 「check Hub」 for compatibility. Internal `hubRoot` path stays; no global hard rename.
- **Setup-direction A/B demoted**: not a first question; inferred (opening a starter pack ⇒ joiner; counterpart activity in the Drive ⇒ a hint). Authorization never uses role.
- **Four changes MUST land together or the simplification is fake** (codex's key warning): (a) `doctor` must not fail when there is no counterpart — split into local-core health vs peer health; (b) `publish` with no default counterpart must prompt to choose / invite a peer, not fail silently; (c) old two-person `.aps/config.json` projects must still work; (d) starter pack is generated on "邀請 / peer starter", NOT at install.

Full design evidence: `dev/qc/evidence/2026-05-28-codex-skill-loadfix/codex_onboarding_design.txt` (plus the role and root-fix codex studies in the same folder). Project Context Index remains a later background-index direction only, behind the onboarding change and Project Peers UAT.

Deferred by explicit user agreement:

- True multi-agent platform.
- `_notify` layer.
- `aps watch`.
- Desktop notifications.
- OS / AI platform scheduled tasks.
- Dropbox / OneDrive formal support.
- Multi-recipient packet and permission model.
- Group alias expansion.
- Project Context Index runtime implementation until Project Peers UAT passes and its schema is reviewed.
- Telegram / WhatsApp / Email auto-send by the agent.

<!-- ack:section:completed-this-session -->
## Completed This Session

Record only work actually completed in the current session. (S43 full closeout; the S42 closeout work is preserved in `dev/SESSION_LOG.md`.)

1. Found a Codex-only release blocker via a headless `codex exec` probe: the published APS skill failed to load in Codex because the frontmatter `description` was 1052 chars, over Codex's 1024-char load cap, so Codex silently fell back to a stale 0.2.7 backup skill.
2. Fixed the repo skill source: `skills/aps/SKILL.md` `description` trimmed 1052→701 with the long trigger list moved to the body, and an interim YAML error (unquoted colon in `Example triggers:`) corrected to `Example triggers include`; the three brand entries and intent-group triggers are preserved.
3. Added explicit governance guards: `dev/qc/triggers.md` (release-check + full-check) and `dev/DOC_SYNC_REGISTRY.md` skill row now require `description` ≤1024 and valid YAML, noting Codex enforces this at load while Claude does not surface it.
4. Proved the fix: refreshed `~/.codex/skills/aps/SKILL.md` and confirmed via `codex exec 教我用 APS` that the official 0.2.9 skill loads with no invalid-description and no YAML error; deleted 11 stale `~/.codex/skills/aps.backup-*` (kept the live `aps`).
5. Ran a Claude-driven Project Peers acceptance against the real Hub test slug `aps_uat_claude_20260528`: peer add → provisional, provisional `publish --to` blocked, peer self-init → confirmed without downgrading the other card, `publish --to` confirmed peer succeeds, sender-only `status --packet-id` pending→consumed, receiver isolation (fanny never saw jay's packet), wrong-recipient consume rejected. 4 `codex_out*.txt` transcripts saved to `dev/qc/evidence/2026-05-28-codex-skill-loadfix/`; disposable scratch dir deleted; Hub left intact.
6. Synced this work into governance: this handoff, `dev/SESSION_LOG.md` S43 entry with S33 archived to batch 009, and `dev/PROJECT_INDEX.md`.
7. Ran the 🔴 full audit on the 0.2.9 candidate and wrote `dev/qc/2026-05-28-aps-full-audit-0.2.9-s43-codex-loadfix.md`: runtime, public-promise consistency, version boundary, and no-secrets all pass; human interactive UX UAT, two-physical-machine Drive round-trip, and Class-C demo-workspace audit remain 受阻 (so this is not a release pass).
8. Did release-prep and, on Adam's explicit authorization, published the 0.2.9 pre-release / UAT enablement build to npm — `@adamchanadam/aps@0.2.9` was set `latest` (readback confirmed). Wrote `dev/release-notes/v0.2.9.md`. No commit / push / git tag / GitHub release.
9. Real-machine UAT (Jay, Mac) surfaced a setup bug: `aps init` rejected a legitimate Hub-root path containing square brackets (`.../My Drive/[Project]/...`) because the placeholder guard rejected `[ ]`. Fixed `validateNoPlaceholder` in `bin/aps.js` (now rejects only `<...>` angle brackets and `...` ellipsis; snake_case fields still bracket-checked by validateSnakeCase), bumped to 0.2.10, wrote `dev/release-notes/v0.2.10.md`, added a release-check regression guard in `dev/qc/triggers.md`, ran release-check, and — on Adam's authorization — published 0.2.10 to npm `latest` (readback confirmed; the published 0.2.10 was verified via `init --dry-run` to accept Jay's bracketed path, so Jay can reinstall `@latest` and use his original path without renaming any folder). No commit / push / git tag / GitHub release.
10. Built the **0.2.11 peer-lifecycle root-fix** in `bin/aps.js` (local, NOT published): publishing / consuming now self-confirms the acting agent's own peer card; `publish --to` recipient gate is three-way (confirmed → send; provisional-but-active → send + warning; inactive / unregistered / no-activity → block); the setup "role A/B" question is reworded as setup-direction with a "you seem to be the joiner" hint after the Drive path is entered (no question reordering); `aps config` shows 設定起手方向 instead of 角色. Verified by `node --check`, `git diff --check`, and a controlled disposable-Hub regression (provisional-active reachable; no-activity / inactive blocked; self-confirm on publish + consume; counterpart card untouched). Updated roadmap §4.2, `dev/qc/triggers.md`, `dev/DOC_SYNC_REGISTRY.md`; bumped `package.json` to 0.2.11; wrote `dev/release-notes/v0.2.11.md`.
11. Rewrote the three user-facing HTML docs (`docs/index.html`, `docs/guides/index.html`, `docs/guides/aps-onboarding-walkthrough.html`) per an approved tone + direction: reframed from two-person to "one project, multiple peers, each handoff one-to-one"; replaced "your role A/B" with 設定起手方向; removed broken jargon fragments and hard version numbers (now 前期測試版); kept pre-release / human-in-loop boundaries; no local `.md` links; section tags balanced. Vocabulary (Hub → Drive) intentionally left for the agreed onboarding change. Maintainer pages not touched.
12. Reached the humanize-onboarding + Drive-vocabulary design consensus (see Active Objective), validated by two independent codex read-only reviews; codex studies saved under `dev/qc/evidence/2026-05-28-codex-skill-loadfix/`.

<!-- ack:section:next-priorities -->
## Next Priorities

1. **(DONE S44) 0.2.11 published.** Pre-publish preflight + release-check were green and the publish was authorized and done; npm latest is 0.2.11, readback confirmed. Remaining: Jay reinstalls `@latest` on the Mac and retries his reply; verify the provisional-block is gone end-to-end. The next active thread becomes the humanize-onboarding change (item 2).
2. **Implement the humanize-onboarding + Drive-vocabulary change** (the Active Objective design), with the four coupled changes landing together: `doctor` split (local-core vs peer health), `publish` prompt-to-choose-peer when none, old two-person compat, and starter-pack-on-invite (not at install). Then finalize the three user docs' vocabulary (「共用 Drive 資料夾」 + keep 「check Hub」, promote 「check Drive」) in the same version.
3. **Maintainer pages**: `docs/maintainers/index.html` and `docs/qc/governance-map.html` were not touched this session; align them separately when ready (different audience / tone).
4. **Jay continued UAT**: Jay can keep exercising daily flows on the Mac (status / 教我用 / receiver report) and feed back further findings; fold sibling findings into the onboarding change.
5. **Public-framing decision (still open)**: README / `docs/*.html` / GitHub Pages still say npm latest 0.2.8; decide how to present the published pre-release / UAT build, then update and (if wanted) push so Pages goes live.
6. **Project Context Index design review**: deferred until after the onboarding change and Project Peers UX UAT.

<!-- ack:section:next-task-required-reading -->
## Next Task Required Reading

Before acting on the next task, read or mark blocked:

| Source | Why required | Status |
|---|---|---|
| `AGENTS.md` | Active governance contract | confirmed |
| `dev/SESSION_HANDOFF.md` | Current state | confirmed |
| `dev/SESSION_LOG.md` latest entry | Current evidence; S42 records closeout, archive batch 009, and regenerated START; S41 records Agent Handoff Kit v0.3.12 doctor resolving the closeout-only START release-check blocker | confirmed |
| `dev/PROJECT_INDEX.md` | Workspace map and current source-of-truth pointers | confirmed |
| `dev/RULE_PACKS.md` | Task routing | confirmed |
| `dev/DOC_SYNC_REGISTRY.md` | Required sync rules before edits | confirmed |
| `dev/qc/triggers.md` | QC trigger vocabulary and Reliable Pair / deferred roadmap guardrails | confirmed |
| `docs/plans/2026-05-28-aps-public-product-multi-agent-roadmap.md` | Latest product strategy: Reliable Peer Handoff; Project Peers + Sent Status is v0.2.9 candidate direction; Project Context Index is a later background-index direction only | confirmed |
| `bin/aps.js` | local 0.2.9 Project Peers + Sent Status candidate runtime source | required before code / UAT |
| `skills/aps/SKILL.md` and `skills/aps/references/setup-dialogue.md` | Natural-language behavior source | required before skill wording changes |
| `README.md`, `docs/index.html`, `docs/guides/aps-onboarding-walkthrough.html` | Public UX promises | required before public docs changes |

<!-- ack:section:risks-blockers -->
## Risks / Blockers

1. **Project remains pre-release**: v0.2.8 is still a pre-release, not production-ready.
2. **AI behavior risk**: `claude -p` route probes passed, but before release Adam should still run a fresh interactive Claude / Codex UAT because real session behavior can differ from headless prompt mode.
3. **Public promise boundary**: Project Peers + Sent Status now ships in the published npm 0.2.10 pre-release / UAT build, but README and public HTML still say npm latest 0.2.8 and were NOT re-framed in S43. Public wording must present the published build as a UAT enablement build, not a release pass; how to phrase this publicly is a pending Adam decision.
4. **Starter pack / route**: the new-peer preflight and Agent Public Squares route discovery now ship in the published npm 0.2.10, so `npm install @latest` includes the Project Peers / starter pack / route changes.
5. **Deferred scope must stay deferred**: group alias expansion, watch, notify, platform scheduling, true multi-agent, multi-recipient packet, and Dropbox / OneDrive support are not current work.
6. **Per-project Drive verification remains required**: each real project must verify its own Hub path, offline availability, and sync propagation.
7. **Project Context Index authority risk**: context is useful only as a background index. If it conflicts with packet / outbox / ack, AI must treat context as stale and use the packet trail.
8. **Codex skill-load cap (fixed and now published)**: the APS skill frontmatter `description` must stay ≤1024 chars and be valid YAML, or Codex silently rejects it at load and falls back to a stale backup skill. Fixed (701 chars, colon removed), guarded in QC, and now shipped in the published npm 0.2.9 (bundled-tarball skill verified at 701). Any future skill edit must re-measure description length and YAML validity; Claude does not surface this, so it must be checked for the Codex target specifically.
9. **0.2.11 published (S44); Jay reinstall + retry still pending end-to-end**: the peer-lifecycle root-fix + role reframe + auto-detect hint are now npm latest `0.2.11` (readback confirmed). The unblock is not proven until Jay reinstalls `@latest` on the Mac and retries his reply; do not assume Jay's reply works until he has reinstalled and retried successfully.
10. **User docs uncommitted + vocabulary pending**: the three rewritten HTML pages are uncommitted and only go live on a push; their Hub → Drive vocabulary is deliberately deferred to the onboarding change. Do not push docs until the vocabulary is finalized and Adam approves the public-framing.
11. **Onboarding change is coupled**: the four changes (doctor split / publish prompt / two-person compat / starter-pack-on-invite) must land together; a partial build makes setup look simpler but stay stuck on the old model.
12. **Scratch on disk + real Hub**: `_aps_uat_adam_recv/` (adam receiver config + codex study transcripts) remains on disk; the real Hub keeps test slugs `aps_uat_0_2_9_jay/` (Jay↔Adam round-trip packets) and `aps_uat_claude_20260528/`, plus overwritten `_hub/starter-pack-{adam,fanny,jay}.md`. Clean up when the UAT thread closes (Adam asked to keep the Hub for now).

<!-- ack:section:validation-qc -->
## Validation / QC

Current closeout QC summary:

- Agent Handoff Kit doctor v0.3.12 passed in this root with `status: passed`, 46 checks, 0 failed, and no SESSION_LOG N-rule warning after archive batch 009. `START_NEXT_SESSION_PROMPT.txt` mismatch is expected to be resolved at closeout and is no longer a failure.
- `git diff --check` passed with LF→CRLF warnings only.
- `START_NEXT_SESSION_PROMPT.txt` was regenerated at closeout from this handoff opening message.
- `npm view @adamchanadam/aps version dist-tags.latest bin dist.fileCount --json` confirms npm latest is now `0.2.10` (bin `aps`, fileCount 14) after the S43 0.2.9 → 0.2.10 publishes; `npx --yes @adamchanadam/aps@latest --help` shows v0.2.10, and the published 0.2.10 was verified via `init --dry-run` to accept a Hub-root path containing square brackets while still rejecting `<...>` / `...` placeholders.
- `node --check bin\aps.js`, `node bin\aps.js --help`, `npm test`, and `npm pack --dry-run --json` passed during release-check; local package metadata is `0.2.10`.
- HTML render checks passed through Chrome DevTools MCP for `docs/index.html`, `docs/guides/index.html`, `docs/guides/aps-onboarding-walkthrough.html`, `docs/maintainers/index.html`, and `docs/qc/governance-map.html`; screenshots and snapshots are under `dev/qc/evidence/2026-05-28-release-check-html/`.
- Targeted scans passed: no HTML links to local `.md`; public beginner HTML does not expose local Project Peers CLI routes as shipped support; stale Kit v0.3.11 current-state wording remains only in archived / historical session-log evidence.
- S37-S39 UAT / full-audit evidence remains current: Adam / Jay / Fanny UAT passed after receiver isolation and route discovery fixes; future full audits must include Project Peers one-by-one handoff isolation.
- S43 Codex load-fix verification: `skills/aps/SKILL.md` `description` measured at 701 chars (≤1024); `node --check bin/aps.js` passed; `git diff --check` clean apart from repo-wide CRLF notices; `codex exec 教我用 APS` confirmed the official 0.2.9 skill loads with no invalid-description and no YAML error after the source fix, skill refresh, and removal of 11 stale `aps.backup-*`; Handoff Kit doctor rerun in this sync. A Claude-driven Project Peers round-trip on real Hub slug `aps_uat_claude_20260528` passed isolation, provisional/confirmed lifecycle, sender-only status, and wrong-recipient consume rejection.
- S43 0.2.11 verification: `node --check bin/aps.js` and `git diff --check` clean (repo-wide CRLF only); a controlled disposable-Hub regression confirmed the three-way publish gate (provisional-but-active reachable; no-activity / inactive / unregistered blocked), self-confirm on publish + consume, counterpart card untouched, and the interactive setup-direction "joiner" hint; Handoff Kit doctor `status: passed`.
- S44 0.2.11 publish (2026-05-29): pre-publish preflight green — `npm whoami`=adamchanadam, 0.2.11 not yet on npm, `node --check` OK, CLI shows v0.2.11, `package.json` 0.2.11, skill `description` 701 ≤1024, `npm pack --dry-run` 14 files incl. `skills/aps/SKILL.md`, `npm test` exit 0, Handoff Kit doctor `status: passed`. Published via `npm publish --access public`; readback confirms registry version/latest 0.2.11, bin `aps`, fileCount 14, and `npx --yes @adamchanadam/aps@latest --help` shows v0.2.11. No commit / push / tag / GitHub release / Pages change.
- S43 user-docs checks: 0 stale markers (version / role / two-person / jargon fragments), 0 local `.md` links, `<section>` open/close balanced (10/10, 3/3, 16/16) across the three pages. A visual browser render check is still advisable before any push.
- S43 real-machine UAT (Jay, Mac): cross-machine Google Drive round-trip works — Jay's `setup_test` packet synced to Adam's Hub and was consumed; Adam published a full reply packet back. Jay's receiver report on the Mac was complete and readable. Jay's formal reply was blocked by the provisional-publish gate (fixed in 0.2.11, pending publish).

<!-- ack:section:workspace-identity -->
## Workspace Identity

Expected project root: `C:\Users\adam\_claude_desktop\AI_Public_Squares`
Git root: same
Branch: `main`
Latest pushed release state: release commit `136042c` is pushed; tag `v0.2.8` points to `136042c`; GitHub pre-release `v0.2.8` exists (unchanged). npm latest is now `0.2.11` (S43 npm-only publishes of 0.2.9 then 0.2.10; S44 npm-only publish of 0.2.11; no new commit / push / git tag / GitHub release).
Remote: `origin` = `https://github.com/Adamchanadam/ai-public-squares.git` (public, Apache-2.0, HTTPS via Windows Credential Manager).
Worktree status: local Project Peers / Sent Status candidate edits, Project Context Index governance edits, starter pack preflight fix, receiver isolation fix, Agent Public Squares route fix, same-brand wording, closeout governance sync, SESSION_LOG archive batch 009, and the 0.2.9 full-audit report are uncommitted. Commit `127f55f` exists locally and is not pushed. S43 added further uncommitted edits: the Codex load-fix (`skills/aps/SKILL.md` description, `dev/qc/triggers.md`, `dev/DOC_SYNC_REGISTRY.md`) plus this governance sync (`dev/SESSION_HANDOFF.md`, `dev/SESSION_LOG.md`, `dev/PROJECT_INDEX.md`, archive batch 009 + INDEX). New ignored evidence under `dev/qc/evidence/2026-05-28-codex-skill-loadfix/`. The disposable local test scratch dir was deleted; the real Hub was left intact with test slug `aps_uat_claude_20260528` and overwritten `_hub/starter-pack-{adam,fanny,jay}.md` still present. S43 closeout adds further uncommitted changes: the 0.2.11 peer-lifecycle root-fix (`bin/aps.js`, `package.json` → 0.2.11, `dev/qc/triggers.md`, `dev/DOC_SYNC_REGISTRY.md`, roadmap §4.2, `dev/release-notes/v0.2.11.md`) and the three rewritten user docs (`docs/index.html`, `docs/guides/index.html`, `docs/guides/aps-onboarding-walkthrough.html`). Release notes `v0.2.9.md` / `v0.2.10.md` / `v0.2.11.md` and the S43 full-audit report are also uncommitted. npm latest is now 0.2.11 (published 2026-05-29 S44, npm-only; no new commit / push / tag / GitHub release). Scratch dir `_aps_uat_adam_recv/` (adam receiver `.aps/config.json` + codex study transcripts) remains on disk; the real Hub also keeps `aps_uat_0_2_9_jay/` (Jay ↔ Adam UAT round-trip).

<!-- ack:section:sync-status -->
## Sync Status

Use statuses from `dev/DOC_SYNC_REGISTRY.md`: `confirmed`, `unverified`, `pending`, `blocked`, `not_applicable`.

- Project index: `confirmed` locally; now points to Reliable Peer Handoff / Project Peers + Sent Status roadmap, records Project Context Index as a later background-index direction, records same-brand naming, and records the latest local 0.2.9 full-audit evidence.
- Doc sync registry: `confirmed` locally; roadmap / skill rows now state Project Peers + Sent Status is v0.2.9 candidate direction, Project Context Index is post-Peers background-only, true multi-agent / notify / watch remain deferred, and AI Public Squares / Agent Public Squares are same-brand product-name variants. QC trigger truth now explicitly requires multi-peer one-by-one handoff isolation for Project Peers full audits.
- Public docs / README: ⚠️ drift — npm latest is now 0.2.10 but README and public HTML still say npm latest 0.2.8 and were NOT updated in S43 (public-framing decision deferred to Adam). README still has the Agent Handoff Kit preflight and same-brand naming. Project Context Index remains unshipped; Project Peers now ships in the published build but as a pre-release / UAT build, so any public wording must frame it as a UAT enablement build, not a release pass.
- Maintainer docs / QC map / QC triggers: `confirmed` locally; they guard against overclaiming true multi-agent, notify, watch, platform scheduling, or cloud APIs.
- npm package: `confirmed` externally for latest `0.2.11` (S44 publish); npm readback confirmed version/latest `0.2.11`, bin `aps`, fileCount 14; `npx --yes @adamchanadam/aps@latest --help` shows v0.2.11. The published build ships the peer-lifecycle root-fix on top of the Codex load-fix skill (description 701) and the hub-root bracket-validation fix.
- GitHub / Pages: GitHub release stays `v0.2.8` (not re-tagged in S43) and `main` is unchanged; GitHub Pages still shows `npm latest 0.2.8` (not redeployed) and is therefore stale vs npm latest 0.2.10 — pending the deferred public-framing decision. `摘要式通知` and `不會自動觸發對方 AI` wording remains.
- SESSION_LOG archive: `confirmed` locally; S42 closeout moved S32-S19 into archive batch 009, and the S43 sync moved S33 into the same batch, keeping the hot log at 10 entries.
- Codex skill load-fix (S43): `confirmed`; `skills/aps/SKILL.md` `description` ≤1024 and valid YAML, `dev/qc/triggers.md` and `dev/DOC_SYNC_REGISTRY.md` carry the explicit Codex load check, and evidence lives under `dev/qc/evidence/2026-05-28-codex-skill-loadfix/`. Now published: npm latest 0.2.10 ships the fixed skill (bundled-tarball description verified 701).
- 0.2.11 peer-lifecycle root-fix: `confirmed` published (S44; npm latest 0.2.11, readback-verified); self-confirm on publish/consume, three-way `publish --to` gate, role reframe, auto-detect hint. roadmap §4.2 / `dev/qc/triggers.md` / `dev/DOC_SYNC_REGISTRY.md` updated; `dev/release-notes/v0.2.11.md` written.
- User docs rewrite (S43): `confirmed` locally for content alignment (one-project-multiple-peers, 設定起手方向, 前期測試版, no local `.md`, balanced structure); `pending` for the Hub → Drive vocabulary and the public-framing, both folded into the onboarding change. Uncommitted; not pushed.
- Humanize-onboarding design: `confirmed` as consensus (Claude + 2 independent codex reviews); `pending` implementation. Recorded in Active Objective and `dev/PROJECT_DECISIONS.md`.

<!-- ack:section:state-reconciliation-check -->
## State Reconciliation Check

At full closeout, complete this check after updating the state sections above.

- Reconciled at: 2026-05-28 S43 full closeout, covering the whole session: Codex skill load-fix, npm publishes of 0.2.9 then 0.2.10, Jay real-machine UAT, the local-only 0.2.11 peer-lifecycle root-fix, the three user-docs rewrite, and the agreed humanize-onboarding + Drive-vocabulary design for the next version. The Next Session Opening Message below and `START_NEXT_SESSION_PROMPT.txt` were regenerated from current state in this closeout.
<!-- ack:field:state-sections-rewritten-or-confirmed -->
- State sections rewritten or confirmed current: Last Updated; Durable Anchors (npm latest 0.2.10 confirmed; 0.2.11 unpublished); Current Baseline; Active Objective (new humanize-onboarding direction); Completed This Session (items 10-12 added); Next Priorities; Risks / Blockers (items 9-12 added); Validation / QC; Workspace Identity; Sync Status; State Reconciliation Check; Handoff Sufficiency Check; Next Session Opening Message (regenerated from current state).
<!-- ack:field:stale-snapshots-left -->
- Stale snapshots left in this handoff: no old detailed session snapshot is retained as current state. Historical details remain in `dev/SESSION_LOG.md` and `dev/SESSION_LOG_archive/*`.
<!-- ack:field:lifecycle-conflicts-resolved -->
- Completed / pending / risk / opening-message lifecycle conflicts resolved or explicitly reclassified: yes. npm 0.2.9 then 0.2.10 are published (latest = 0.2.10); 0.2.11 is implemented + release-checked but explicitly reclassified as PENDING publish (it is both a Next Priority and a Risk), so Jay's reply stays gated until it publishes. The user-docs rewrite is done for content, but its Hub → Drive vocabulary and public-framing are reclassified as pending the onboarding change. The humanize-onboarding design is consensus-only, reclassified as pending implementation. No completed item is left as an unresolved next priority without being marked pending.
<!-- ack:field:opening-message-matches-current-state -->
- Opening message matches current state: yes. `START_NEXT_SESSION_PROMPT.txt` was regenerated during this full closeout from the final opening message.
<!-- ack:field:next-ai-can-continue -->
- Next AI can continue from `AGENTS.md`, this handoff, `dev/PROJECT_INDEX.md`, and needed rule packs without searching old log history: yes.

If any answer is no, blocked, or uncertain, fix this handoff before declaring handoff ready.

Lifecycle consistency rule: compare `Completed This Session`, `Validation / QC`, `Next Priorities`, `Risks / Blockers`, and `Next Session Opening Message`. A completed or verified item must not remain as an unresolved next priority, active risk, or startup instruction unless it is explicitly reclassified as monitor-only, follow-up scope, blocked, or reopened with the missing evidence or trigger condition stated.

<!-- ack:section:handoff-sufficiency-check -->
## Handoff Sufficiency Check

Can the next AI continue from `AGENTS.md`, this handoff, `dev/PROJECT_INDEX.md`, and needed rule packs without searching old log history?

Answer: yes.

Continuity rule: this file carries current state and next action. `SESSION_LOG.md` carries recent evidence only; do not create an archive directory by default.

<!-- ack:section:next-session-opening-message -->
## Next Session Opening Message

📋 Next session: copy and paste the whole block below

```text
Work in C:\Users\adam\_claude_desktop\AI_Public_Squares (template SSOT for AI Public Squares; published as `@adamchanadam/aps`; GitHub repo Adamchanadam/ai-public-squares is public; GitHub Pages enabled).

Current state (2026-05-28, end of S43): npm latest is `@adamchanadam/aps@0.2.10` (pre-release / UAT build = 0.2.9 Project Peers + Sent Status scope + a hub-root bracket-validation fix + the Codex skill load-fix). GitHub release stays `v0.2.8`; `main` is unchanged; nothing was committed / pushed / tagged this session.

`0.2.11` is implemented, tested and release-checked LOCALLY but NOT published. It is the peer-lifecycle root-fix: publish / consume now self-confirm the acting agent's own peer card; `publish --to` is three-way (confirmed → send; provisional-but-active → send + warning; inactive / unregistered / no-activity → block); the setup `role A/B` question is reworded as setup-direction with a `you seem to be the joiner` hint; `aps config` shows 設定起手方向 not 角色. `package.json` is at 0.2.11; `dev/release-notes/v0.2.11.md` is written. Real-machine UAT (Jay on Mac): the cross-machine Google Drive round-trip works, but Jay's formal REPLY was blocked because Adam's peer card is still `provisional` on the published 0.2.10 — which is exactly what 0.2.11 fixes. Publishing 0.2.11 (then Jay reinstalls `@latest`) unblocks Jay. Reminder: `AI Public Squares` and `Agent Public Squares` are the same brand; `APS` is the abbreviation. Every packet stays single-recipient and human-approved; true multi-agent / `_notify` / `watch` / Project Context Index remain deferred and must not be promised as current support.

Docs state: the three user-facing HTML pages (`docs/index.html`, `docs/guides/index.html`, `docs/guides/aps-onboarding-walkthrough.html`) were rewritten this session — one-project-multiple-peers, 設定起手方向, 前期測試版, pre-release / human-in-loop boundaries kept, no local `.md` links. They are uncommitted; the Hub → Drive vocabulary was deliberately left for the onboarding change. README and GitHub Pages still say npm latest 0.2.8 (public-framing still open). Agent Handoff Kit v0.3.12 doctor passes; this is the S43 full closeout (hot log stays 10 entries).

Two threads to resume (priority order): (1) DECIDE & PUBLISH 0.2.11 (recommended first) to unblock Jay — preflight `npm whoami` = adamchanadam, confirm 0.2.11 not yet on npm, `npm publish --access public`, readback, then sync npm-latest → 0.2.11 in handoff / log / index. (2) IMPLEMENT the agreed `humanize onboarding + Drive vocabulary` change (next version, e.g. 0.2.12) — full design is in this handoff's `Active Objective`: install asks only 3 things (shared Drive folder / project / your own name), counterpart NOT required at install, add collaborators on-demand (`邀請 Fanny`), vocabulary 「共用 Drive 資料夾」 with 「check Drive」 promoted but 「check Hub」 kept, role A/B demoted, and the FOUR coupled changes must land together (doctor split / publish-prompt-when-no-peer / two-person compat / starter-pack-on-invite); then finalize the three docs' Drive vocabulary in the same version. Codex design study: `dev/qc/evidence/2026-05-28-codex-skill-loadfix/codex_onboarding_design.txt`. Also open: maintainer pages, public-framing of the published pre-release, Jay's continued UAT, and cleanup of scratch `_aps_uat_adam_recv/` + real-Hub test slugs `aps_uat_0_2_9_jay/` and `aps_uat_claude_20260528/` (keep the Hub for now). Local commit `127f55f` exists and is unpushed; the whole 0.2.9 → 0.2.11 candidate + docs + governance set is uncommitted.

Do not commit, push, tag, create a GitHub release, publish npm, or change GitHub Pages unless Adam explicitly asks.

Read in order:
1. AGENTS.md
2. dev/SESSION_HANDOFF.md
3. dev/SESSION_LOG.md (latest S43 entry)
4. dev/PROJECT_INDEX.md
5. dev/RULE_PACKS.md
6. dev/DOC_SYNC_REGISTRY.md
7. dev/qc/triggers.md
8. docs/plans/2026-05-28-aps-public-product-multi-agent-roadmap.md

If this root does not match the expected project root, stop and ask for confirmation.

Voice / writing hard rule: user-facing prose must be contemporary written Traditional Chinese. For documents (公文 tone): no piled-up technical terms or clause numbers as sentence subjects, no broken Chinese-English fragments, minimal English; weighty yet restrained. Colloquial Cantonese markers listed in `AGENTS.md` are allowed only inside verbatim user-trigger quotes. HTML must not link local `.md` files; use plain `<span class="path">` references for internal spec paths.

Expected next action: confirm with Adam whether to publish 0.2.11 first (recommended) to unblock Jay, then either continue Jay's UAT or start implementing the humanize-onboarding change per the Active Objective. Any commit / push / tag / GitHub release / npm publish needs Adam's explicit authorization. Do not implement Project Context Index until after the onboarding change and Project Peers UX UAT.

QC vocabulary: if Adam says 「跑快檢 / 跑外發前檢 / 跑全面檢」 or quick-check / release-check / full-check, load `dev/qc/triggers.md` and run that tier. If he says a vague QC term, ask 「你指快檢 / 外發前檢 / 全面檢?」.

External review note: for an independent read-only second opinion, `cmd /c codex exec --skip-git-repo-check -c sandbox_mode="read-only" -c approval_policy="never" "<bounded prompt, 只讀不改檔>" < /dev/null` works from this repo root (used three times this session for design cross-checks — role logic, peer-lifecycle root-fix, onboarding design). `cmd /c claude -p "..."` also works. Keep prompts short and file-scoped; if it times out, retry with a smaller scope before treating it as blocked.

After reading, summarize current objective, confirmed decisions, pending work, risks, and the next recommended action.
```
