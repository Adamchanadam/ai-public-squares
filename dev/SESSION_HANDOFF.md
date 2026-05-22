# Session Handoff

Last Updated: 2026-05-21 (session S5 closeout: Layer 3 — PowerShell onboarding helper `tools/aps-onboard.ps1`)

<!-- ack:section:durable-anchors -->
## Durable Anchors

Stable facts that should survive across sessions. Update only when they change, but verify they still match reality at closeout.

1. Project root and boundary: `C:\Users\adam\_claude_desktop\AI_Public_Squares` — design / plan / verification SSOT workspace for the Agent Public Square (APS) project. Not a product runtime; carries the protocol design, the implementation plan, the MVP verification report, and the user-facing project entry page.
2. Product/system identity: Agent Public Square (APS) — a cross-machine, cross-SSOT collaboration protocol for two (or more) AI agents working on the same project. Uses a Google-Drive-synced Hub Root with single-writer lanes, immutable versioned packets, an append-only ledger, and a thin Bridge Pack that wires inbox detection into each agent's agent-handoff-kit startup.
3. Governance model: Agent Handoff Kit v0.1.7 managed-core block at `AGENTS.md` lines 1-127. External skill flows (superpowers chain), subagent plans, and demo-workspace closeouts are subordinate evidence per AGENTS.md §2 and §5; only the active project root's kit persistence completes a task.
4. Source-of-truth ownership: this workspace owns the APS design + implementation plan + verification report + project entry HTML; the Drive Hub at `G:\我的雲端硬碟\Adam 工作目錄\AI_Projects\AI_Public_Squares\` owns runtime `PROTOCOL.md` + templates + lane data + CHANGELOG; the two Demo Agent workspaces (`C:\Users\adam\_claude_desktop\Demo_Agent_{Adam,Jay}_Public_Squares\`) own their per-agent Bridge Pack and round-trip session evidence.
5. Release / publish boundary: none yet — APS is pre-Phase 4; not yet integrated into any production runtime; not yet published to a public registry.

<!-- ack:section:closeout-reconciled-state -->
## Closeout-Reconciled State

This is the current-state area. At every full closeout, rewrite or explicitly confirm every section below. Do not append a new state snapshot under an old one.

<!-- ack:section:current-baseline -->
## Current Baseline

1. Project root: `C:\Users\adam\_claude_desktop\AI_Public_Squares` (Windows; git branch `main`; check `git log -1 --format=%h` for current HEAD).
2. Product/system state: APS MVP complete and round-trip-verified on same-machine simulation. Phase 4 (real cross-machine handoff between Adam's `MPEdu_Plus_Branding` runtime and Jay's machine) **planned in full** (`docs/plans/2026-05-21-aps-phase4-plan.md`, including T0b Bridge Pack Layer 1 polish prerequisite + Layer 2 T0 restructure + Layer 3 Tooling shortcut) but **execution not started**. All three layers of user-flow simplification landed in this workspace's docs and tooling: Layer 1 (S3 — voice / trigger / auto-scan polish), Layer 2 (S4 — T0 3+4 split + daily-default flip), Layer 3 (S5 — `tools/aps-onboard.ps1` PowerShell helper for T2-T5).
3. Governance state: Agent Handoff Kit v0.1.7 managed-core in place; `AGENTS.md` clean; kit doctor self-check 34/34 passing as of last verified run; this file plus `SESSION_LOG.md`, `PROJECT_INDEX.md`, `DOC_SYNC_REGISTRY.md` all reflect current state as of 2026-05-21. Demo workspaces (`Demo_Agent_{Adam,Jay}_Public_Squares`) confirmed by user as aligned to kit v0.1.7 (Risk #3 closed this session).
4. Source-of-truth notes: APS design + MVP plan + MVP verification + Phase 4 plan under `docs/plans/`; user-facing entry at `docs/index.html`; user-facing teaching pages under `docs/guides/` (hub at `docs/guides/index.html`; first guide at `docs/guides/aps-onboarding-walkthrough.html`). No code; this workspace is governance + documentation only.

<!-- ack:section:task-understanding-summary -->
## Task Understanding Summary

<!-- ack:field:user-intent -->
- User intent: build a reusable cross-machine AI-agent collaboration protocol (APS) that removes the manual file-shuffle and context-relay burden when Adam (branding text) and Jay (visual design) work together on the same project from two different machines.
<!-- ack:field:task-essence -->
- Task essence: design + implement + verify a protocol whose core failure modes (Drive conflicted copies, wrong-version reference, SSOT contamination) are eliminated by structure rather than by user discipline.
- User value: future cross-machine handoffs need only one fixed WhatsApp template line; everything else (file shuffle, context re-explain, status sync) is carried by the protocol.
<!-- ack:field:success-criteria -->
- Success criteria: (1) two-agent same-machine round-trip executed end-to-end without human relay; (2) zero Drive conflicted copies; (3) both demo workspaces' kit governance done per kit standard; (4) this workspace's kit governance done per AGENTS.md v0.1.7 §2 closeout contract; (5) user-facing entry page exists for non-developer reference.
- Key background already read: AGENTS.md v0.1.7 managed core; the four APS docs under `docs/plans/`; both demo Bridge Packs; Hub `_hub/PROTOCOL.md` v1.0 + `_hub/CHANGELOG.md`.
- Background still unread or blocked: real `MPEdu_Plus_Branding` runtime workspace state on Adam's machine (not in scope this session); Jay's machine setup (requires Jay's cooperation; not yet contacted).
- Non-goals / boundaries: this workspace owns Phase 4 plan + user-facing docs, **NOT** the real-runtime onboarding execution itself. When Phase 4 starts, the Adam-side execution happens in `C:\Users\adam\_claude_desktop\Work_MP\明報教育Plus\MP - 明報教育服務\MPEdu_Plus_Branding\` (a separate workspace; opens a new session there) and the Jay-side execution happens on Jay's machine. This workspace remains the SSOT for the plan + the verification report. Do NOT push to any remote (none configured). Do NOT touch demo workspaces' files except as referenced (they are stable v0.1.7 sandboxes).

<!-- ack:section:active-objective -->
## Active Objective

APS MVP is complete and verified. Three-layer user-flow simplification fully landed (S3 / S4 / S5, all 2026-05-21):
- Layer 1 (S3) — canonical mid-session trigger `check Hub` + 2 fuzzy synonyms; daily WhatsApp short `Hub 有新嘢`; Bridge Pack auto-scans Drive conflict files at startup; UTC time-recording + manual `find` marked first-cross-machine verification only.
- Layer 2 (S4) — T0 parameter pinning split into 3 explicit user decisions + 4 documented defaults (with Drive-share edge case noted); §8 daily-flow default trigger flipped to mid-session `check Hub` (open-new-session demoted to fallback).
- Layer 3 (S5) — `tools/aps-onboard.ps1` PowerShell idempotent installer automates Phase 4 plan T2-T5; T6 stays manual; Tooling shortcut section in Phase 4 plan + walkthrough §4/§5 callouts spec the usage; written ahead of staged pre-4B deadline.

**Next user-driven actions** (3 independent threads):

- **T0b execution** in `Demo_Agent_Adam_Public_Squares` + `Demo_Agent_Jay_Public_Squares` sessions — apply two Bridge Pack startup behaviours (conflict auto-scan + canonical `check Hub`) per Phase 4 plan T0b. Each runs in its own demo workspace session per AGENTS.md §2 active-project-root rule.
- **Phase 4 Block 4A** (Adam real `MPEdu_Plus_Branding` runtime onboarding) — independent of Jay; new session in that workspace. Pre-state polished: Layer 1 + Layer 2 + Layer 3 (with Tooling shortcut + helper script) inherited via教學頁 + Phase 4 plan; T0b once done means Bridge Pack auto-inherits via demo-pack copy step. Block 4A's first real run will also be the helper script's first insertion-path verification.
- **T0 parameter lock with Jay** — 3 user decisions (PROJECT / Jay 部機路徑 / T10) per Phase 4 plan T0 / walkthrough §3. Can happen here (plan SSOT workspace) or in parallel with 4A T1.

Phase 4 execution itself has not started. Block 4B / 4C / 4D unchanged from S2-S4 — wait for Jay or for upstream blocks.

<!-- ack:section:completed-this-session -->
## Completed This Session

Record only work actually completed in the current session (S5, 2026-05-21 latest same day).

1. Landed Layer 3 of the three-layer simplification plan (one new PowerShell helper + cross-doc references; ahead of pre-Block-4B staged deadline):
   - New file `tools/aps-onboard.ps1` (~225 lines): PowerShell idempotent installer automating Phase 4 plan T2-T5 (Bridge Pack copy + Identity substitute / RULE_PACKS routing row / PROJECT_INDEX External Sources row / DOC_SYNC_REGISTRY two sync rows). T6 (SESSION_HANDOFF Durable Anchors) intentionally manual. Has `-DryRun` flag, inline `Get-Help` documentation, bilingual T6 reminder, doctor reminder on completion.
   - Phase 4 plan: new "Tooling shortcut" section hoisted above Phase 4 scope (spec'd once, with usage examples for both Adam-side and Jay-side, execution-policy guidance, and explicit "insertion-path verification deferred to Block 4A first run" caveat); T2/T3/T4/T5 each gained a one-line cross-link pointer (avoids 4-place spec duplication per §19 防漂移); file history appended with S4 back-fill + S5 entry.
   - Walkthrough §4 + §5: each gained a `.callout` mentioning `tools/aps-onboard.ps1` by filename inline and linking to plan Tooling shortcut.
   - `dev/PROJECT_INDEX.md`: Directory Map gained `tools/` row.
2. Self-audit-before-execution discipline applied: user flagged initial five-zone plan as「自檢不足，深入檢查」; re-audit surfaced 13 gaps across critical-tech / structure / minor / timing / verification categories. All 13 addressed in revised plan, then executed cleanly. Detailed gap list in `dev/SESSION_LOG.md` S5 entry.
3. Script verified: `[scriptblock]::Create` parse-check PARSE_OK; dry-run against `Demo_Agent_Adam_Public_Squares` (already onboarded) reported 4 SKIPs + T6 bilingual reminder. PowerShell tool used directly for invocation (Bash had backtick-interpolation issue).
4. In-flight fix: initial walkthrough callouts mentioned "helper script" without filename inline → Test #4 failed at 0 hits → filename added inline in both §4 and §5 callouts → re-run hit 2 (passing).
5. Updated governance state files (this file, `SESSION_LOG.md` S5 entry at top, `PROJECT_INDEX.md` Directory Map row), regenerated `START_NEXT_SESSION_PROMPT.txt`.

Note: S4 (Layer 2 polish), S3 (Layer 1 polish), S2 (Phase 4 plan + user-facing docs), and S1 (APS design / MVP build / verification / kit upgrade chain) details remain in `dev/SESSION_LOG.md` 2026-05-21 + 2026-05-20 entries; not duplicated here.

<!-- ack:section:next-priorities -->
## Next Priorities

Priority labels reflect dependencies after S5 closeout. All three simplification layers done. T0b + Block 4A + T0 lock with Jay are the only three independent threads remaining in this workspace's purview. Block 4A's first real run is also `tools/aps-onboard.ps1`'s first insertion-path verification.

1. **T0b execution** (in `Demo_Agent_Adam_Public_Squares` + `Demo_Agent_Jay_Public_Squares` sessions; preferred before Block-4A) — apply two Bridge Pack startup behaviours (conflict auto-scan + canonical `check Hub` trigger) per Phase 4 plan T0b. Each demo workspace's own session per AGENTS.md §2 active-project-root rule. If T0b is skipped, Phase 4 plan acceptance #1b dictates the two behaviours applied inline at T2 / T8 of Block 4A / 4B.
2. **Phase 4 Block 4A execution** — Adam's real `MPEdu_Plus_Branding` runtime onboarding (Phase 4 plan T1-T6). Independent of Jay. Executes in `C:\Users\adam\_claude_desktop\Work_MP\明報教育Plus\MP - 明報教育服務\MPEdu_Plus_Branding\` (new session there, per active-project-root rule). Three options for T2-T5 execution: (a) run `tools/aps-onboard.ps1 -DryRun` first to preview, then without `-DryRun` to apply; (b) follow manual T2-T5 steps from Phase 4 plan; (c) hybrid — script for T2-T5, manual for T6. Inherits Layer 1-3 polish via教學頁 + Phase 4 plan; Bridge Pack inherits T0b polish via demo-pack copy step (script does this for you if T0b done first).
3. **T0 parameter lock with Jay** — 3 user decisions per Phase 4 plan T0 / walkthrough §3: `<PROJECT>` (new slug recommended) + `<RUNTIME_JAY>` & `<RUNTIME_JAY_HUB>` (Jay reports) + T10 in/out. 4 defaults sit at their inherited values unless deviating. May happen here (plan SSOT workspace) or in parallel with 4A T1.
4. **Phase 4 Block 4B** — Jay-machine prerequisite checklist + Bridge Pack install. Requires Jay's availability; Adam relays `tools/aps-onboard.ps1` + the demo-Jay starter pack (with Layer 1 + T0b polish baked in) via WhatsApp / Drive.
5. **Phase 4 Block 4C** — first live cross-machine round-trip. Depends on Block 4A + 4B done.
6. **Phase 4 Block 4D** (optional but recommended before first real >50 MB asset) — externalization dry-run.
7. **Phase 4 verification report** — after Block 4C closes, write `docs/plans/2026-MM-DD-aps-phase4-verification.md` (mirror MVP verification report structure).
8. **Class-C placeholder audit** (deferred from S2 iteration 5) — two cross-workspace reviews of `_hub/PROTOCOL.md` and both demo packs' procedural sections. Each audit runs in the owning workspace's own session per AGENTS.md §2.

<!-- ack:section:next-task-required-reading -->
## Next Task Required Reading

Before acting on the next task, read or mark blocked:

| Source | Why required | Status |
|---|---|---|
| `AGENTS.md` (this workspace) | Active governance contract v0.1.7 | confirmed |
| `dev/SESSION_HANDOFF.md` (this file) | Current state | confirmed |
| `dev/PROJECT_INDEX.md` | Workspace map and entry points | confirmed |
| `docs/plans/2026-05-21-aps-phase4-plan.md` | Phase 4 implementation plan; SSOT for next session's execution | confirmed |
| `docs/plans/2026-05-20-aps-mvp-verification.md` | What was done in MVP; Phase 4 carry-over items | confirmed |
| `docs/index.html` | User-facing project explainer | confirmed |
| `docs/guides/aps-onboarding-walkthrough.html` | User-facing teaching page; Adam + Jay can read alongside the Phase 4 plan during execution | confirmed |
| `G:\我的雲端硬碟\Adam 工作目錄\AI_Projects\AI_Public_Squares\_hub\PROTOCOL.md` | APS runtime contract v1.0 | confirmed |
| `C:\Users\adam\_claude_desktop\Work_MP\明報教育Plus\MP - 明報教育服務\MPEdu_Plus_Branding\` | Target for Phase 4 Block 4A; will be the active project root when 4A executes (not from THIS workspace) | pending — Phase 4 Block 4A entry |
| Jay's machine state (Drive mount, kit version, `<RUNTIME_JAY>` path) | Required for Phase 4 Block 4B + 4C | blocked — requires Jay |

<!-- ack:section:risks-blockers -->
## Risks / Blockers

1. **Jay's machine setup unconfirmed** — design doc §12.3 still flags "Jay 本機: 同一資料夾 mount 並設「可離線存取」 (尚未確認)". Phase 4 Block 4B + 4C cannot run without it. Walkthrough §2 has the prerequisite checklist Jay needs to satisfy.
2. **Cross-machine Drive sync latency unknown under real load** — MVP round-trip was same-machine simulation only. Block 4C T9b is where this gets measured (acceptance threshold: ≤ 5 minutes).
3. ~~Demo workspaces at older kit version~~ — **CLOSED 2026-05-21**: user confirmed both `Demo_Agent_{Adam,Jay}_Public_Squares` aligned to kit v0.1.7.
4. **No remote git configured anywhere** — this workspace and both demo workspaces are local-only repos. Single-disk single-point-of-failure. Remote setup is recommended before Phase 4 Block 4C produces real protocol-evidence commits.
5. **Real-runtime kit version unknown** — `MPEdu_Plus_Branding` workspace's current kit version not inspected this session (out of scope; read-only reference). Phase 4 T1 is exactly the read-only inspection that surfaces this.

<!-- ack:section:validation-qc -->
## Validation / QC

- Checks run this session (S5, 2026-05-21 latest):
  - Script PowerShell parse-check (Test #2): `[scriptblock]::Create((Get-Content tools/aps-onboard.ps1 -Raw))` → PARSE_OK.
  - Script dry-run (Test #6): run against `Demo_Agent_Adam_Public_Squares` (already onboarded) reported 4 SKIPs (T2/T3/T4/T5 idempotency-skip path) + T6 bilingual reminder. Confirms idempotency logic works.
  - Grep tests #1/#3/#5/#8: all pass on first run.
  - Grep test #4: failed first run (0 hits in walkthrough) → walkthrough callouts patched to mention `tools/aps-onboard.ps1` filename inline → re-run hit 2 (passing).
  - Tests deferred: #7 section-missing error path (requires fake/empty workspace not built in this session); #9 insertion-path real verification (deferred to Block 4A first real run per五區段 boundary).
  - Self-audit-before-execution: original五區段 flagged by user as「自檢不足，深入檢查」; refined plan caught 13 omissions across 5 categories (critical-tech 5: newline / execution-policy / section-missing / substitution-verify / cross-doc consistency; structure 3: hoist-vs-repeat / PROJECT_INDEX row spec / sync mapping; minor 3: non-root validation / doctor reminder / bilingual T6; timing 1: pre-4B not pre-4A; verification 1: parse-check method). All 13 addressed in revised plan, then executed.
  - HTML preview-panel render: clean after each Edit step.
  - Voice / terminology discipline: walkthrough §4 + §5 callouts kept Cantonese-narrative voice; `aps-onboard.ps1` appears as `<code>` reference (inline pointer, not sentence subject).
  - PowerShell tool used directly for parse + dry-run; Bash had backtick-interpolation issue with PowerShell-style heredocs.
  - PII / secrets scan: none introduced.
- Checks run earlier (S4, 2026-05-21):
  - 10 grep acceptance checks per the refined five-zone plan: all pass on first run. Notable: "講 check Hub" count = 4 (predicted ≥ 2) — both SVG `<text>` element and adjacent `<!-- comment -->` line in §8 contain the phrase for each of two steps; expected and reinforces self-documenting code.
  - Self-audit-before-execution: original五區段 flagged by user as「自檢不足」; refined plan caught 8 omissions (Drive sharing edge case / lede time / preserved pointer / Acceptance text spec / column header / missing test / boundary gap / Confirmed parameters re-order). Documented in SESSION_LOG S4 entry.
  - HTML preview-panel render: clean after each Edit step.
  - Voice / terminology discipline: §3 + §8 patches use everyday written Chinese; column header「幾時要改默認」純中文 (rejected initial「override」alien-English).
  - Cross-doc consistency: walkthrough §3 "3 decisions" rows match Phase 4 plan T0 "Decide" rows one-to-one; walkthrough §3 "4 defaults" match T0 "Defaults" rows; bottom Confirmed parameters table aligns with T0 mid-section's 3+4 grouping (with explicit lead-in clarifying Adam hub_root + permissions is inherited).
  - PII / secrets scan: none introduced.
- Checks run earlier (S3, 2026-05-21):
  - 6 grep acceptance checks per the five-zone plan: 5 pass as predicted; the 6th (`APS Hub has new traffic` count: predicted 1, actual 3) — all 3 hits are legitimate 教學 references (§6 has two templates for direction symmetry; §8 callout references §6 by quoting the opening line as a pointer). Test intent ("long template not in 日常 usage") satisfied.
  - HTML preview-panel render: clean after each Edit step (visible to user during execution).
  - Voice / terminology discipline: re-scanned walkthrough Layer 1 patches; no internal codes as sentence subjects in user-facing prose. T0b in Phase 4 plan uses internal label per legitimate technical-doc naming convention.
  - PII / secrets scan: none introduced.
  - Structural deviation flagged: original five-zone plan said "T2 / T8 inline notes" for Bridge Pack startup spec; executed as cleaner T0b prerequisite section. Documented in 3 places (`SESSION_LOG.md` S3 entry, Phase 4 plan file history, this Validation/QC block).
- Checks run earlier (S2, 2026-05-21):
  - Cross-doc consistency: Phase 4 plan task numbers (T0, T1–T10) mirror walkthrough section narrative (sections 3–7). Confirmed by author cross-read.
  - HTML link audit (manual): three-way nav `index.html` ↔ `guides/index.html` ↔ `aps-onboarding-walkthrough.html` resolves on local filesystem; markdown plan links resolve via the user's markdown viewer / IDE.
  - File path accuracy: all absolute paths in walkthrough verified against `dev/PROJECT_INDEX.md` Fact Base + Demo Adam / Demo Jay `dev/rules/aps-bridge.md` references.
  - PII / secrets scan: no credentials, no API keys in any new file (Phase 4 plan, guides hub, walkthrough).
  - Voice / terminology discipline check (post-rewrite, this session iteration 2): grep for `Block 4`, `Bridge Pack`, `round-trip` across both guides pages returns 0 sentence-subject hits; `PROTOCOL.md` and `Phase 4` retained only as path / link metadata, not as subjects. Conforms to CLAUDE.md §17 用語紀律 hard rule.
  - SVG flow-diagram count in walkthrough: 4 (overview / cross-machine handover swimlane / daily 7-step / error-recovery decision tree); all inline, no JS, Adam-blue / Jay-orange / 雙方-purple palette aligned with existing role chips.
  - Iteration 3 actor disambiguation check: walkthrough header `meta` now lists 4 chip variants (Adam 用戶 / Agent Adam / Agent Jay / Jay 用戶); cross-machine handover SVG uses solid-border lanes for humans and dashed-border lanes for agent programs; design doc §11 now contains the canonical Actor 區分 definition + two parallel channel mapping (Hub IO channel between two agent programs; WhatsApp channel between two human users).
  - Section count in walkthrough: 11 (was 10; new Section 9 "中間想交換,唔等對話收結" added for mid-session exchange).
  - Design doc patch verification: §11 Actor 區分 sub-section grep'd present;§4 cross-ref to §11 grep'd present;§7 mid-session trigger caveat grep'd present;file-history 2026-05-21 entry grep'd present.
- Checks deferred to user / next session:
  - `npx @adamchanadam/agent-handoff-kit doctor` — to be run by user at convenience; expected 34/34 still passes since AGENTS.md managed core untouched and only governance files reconciled + new docs added under `docs/plans/` and `docs/guides/`.
  - Phase 4 execution acceptance checks — by definition Phase 4 itself.
- Handoff evidence location: this file (durable continuity), `dev/SESSION_LOG.md` 2026-05-21 entry (this session's evidence), `docs/plans/2026-05-21-aps-phase4-plan.md` (forward execution contract).

<!-- ack:section:workspace-identity -->
## Workspace Identity

Expected project root: `C:\Users\adam\_claude_desktop\AI_Public_Squares`
Git root: same
Branch: `main`
Commit (post-S5 bundle): single commit bundling S2 + S3 + S4 + S5 work plus the handoff reconciliation edit. Message: `docs(aps): three-layer user-flow simplification + onboarding helper`. 8 files, 784 insertions, 91 deletions; `tools/aps-onboard.ps1` created. Prior HEAD before this bundle was `9a29348`. Run `git log -1 --format='%h %s'` to see current HEAD (intentionally not hardcoded here — any specific hash inside the commit it describes would be self-referentially stale by one amend cycle).
Worktree / parallel workspace status: none (no `git worktree add`); two sibling demo workspaces (`Demo_Agent_Adam_Public_Squares`, `Demo_Agent_Jay_Public_Squares`) and the Drive Hub are separate repos / data stores; Adam's real `MPEdu_Plus_Branding` runtime is a separate workspace (Phase 4 Block 4A executes there).
Uncommitted changes summary: working tree clean as of the post-S5 bundle commit. No outstanding edits, no untracked files (other than `dev/governance_migrations/<UTC>/` historical backups which are kept as-is).

<!-- ack:section:sync-status -->
## Sync Status

Use statuses from `dev/DOC_SYNC_REGISTRY.md`: `confirmed`, `unverified`, `pending`, `blocked`, `not_applicable`.

- Project index: `confirmed` (this session — Directory Map gained `tools/` row).
- Doc sync registry: `confirmed` (no change this session — `tools/` covered by existing "New file or directory" row → PROJECT_INDEX Directory Map listing).
- Public docs / README: `not_applicable` — no README; user-facing entry is `docs/index.html` with guides hub at `docs/guides/index.html`, intentional.
- External knowledge tools: `confirmed` — Drive Hub offline-available on Adam's side; Jay-side mirror `blocked` (Phase 4 Block 4B T7 prerequisite).
- APS plan / verification docs: `confirmed` — Phase 4 plan gained Tooling shortcut section + T2-T5 cross-links + file history entries (S4 back-fill + S5); T0b, Layer 2 T0 split, acceptance criteria all carry forward unchanged.
- APS user-facing docs (`docs/index.html` + `docs/guides/`): `confirmed` (this session — walkthrough §4 + §5 each gained `.callout` referencing `tools/aps-onboard.ps1` by filename inline and linking to plan Tooling shortcut; S3 + S4 patches carry forward; site-nav unchanged; Fact Base unchanged).
- Tooling: `confirmed` — new `tools/aps-onboard.ps1` PowerShell helper; parse-check PARSE_OK; dry-run against demo Adam shows 4 idempotency-SKIP; insertion-path real verification deferred to Block 4A first run.

<!-- ack:section:state-reconciliation-check -->
## State Reconciliation Check

At full closeout, complete this check after updating the state sections above.

- Reconciled at: 2026-05-21 S2 closeouts (iterations 1-5); 2026-05-21 same-day S3 closeout (Layer 1 polish); 2026-05-21 same-day S4 closeout (Layer 2 polish); 2026-05-21 same-day S5 closeout (Layer 3 — `tools/aps-onboard.ps1` + Phase 4 plan Tooling shortcut + walkthrough §4/§5 callouts + PROJECT_INDEX `tools/` row; 13-gap self-audit before execution).
<!-- ack:field:state-sections-rewritten-or-confirmed -->
- State sections rewritten or confirmed current (S5 pass): Last Updated header (S5); Durable Anchors (still current; verified); Current Baseline (§2 product state updated — all three layers done); Task Understanding Summary (still current; verified); Active Objective (rewritten — three-layer simplification fully done, next-action list narrowed to 3 independent threads); Completed This Session (replaced with S5 work; S4 + S3 + S2 + S1 archived in SESSION_LOG); Next Priorities (rewritten 8 entries; T0b + Block 4A + T0 at top, Layer 3 removed since done); Next Task Required Reading (still current); Risks (still current — no new risks introduced by tooling addition; `tools/aps-onboard.ps1` is idempotent + dry-run-capable + manual-fallback-available, so surface is bounded); Validation/QC (S5 checks added on top, S4 + S3 + S2 retained); Workspace Identity (commit + uncommitted summary updated for S5); Sync Status (refreshed + Tooling row added); State Reconciliation Check (this field); Handoff Sufficiency Check (re-confirmed); Next Session Opening Message (regenerated for S5).
<!-- ack:field:stale-snapshots-left -->
- Stale snapshots left in this handoff: none. S4 + S3 + S2 + S1 details preserved in `dev/SESSION_LOG.md` 2026-05-21 + 2026-05-20 entries.
<!-- ack:field:opening-message-matches-current-state -->
- Opening message matches current state: yes — `START_NEXT_SESSION_PROMPT.txt` regenerated from the fenced block below as part of this closeout.
<!-- ack:field:next-ai-can-continue -->
- Next AI can continue from `AGENTS.md`, this handoff, `dev/PROJECT_INDEX.md` (with `tools/`), `docs/plans/2026-05-21-aps-phase4-plan.md` (with Tooling shortcut + T0b + Layer 2 T0 split), and needed rule packs without searching old log history: yes — Active Objective (3 independent next-action threads), Next Priorities (8 entries), Risks (5 entries unchanged), and Required Reading (10 sources) are all in this file; Phase 4 plan is self-contained; `tools/aps-onboard.ps1` has inline `Get-Help`.

If any answer is no, blocked, or uncertain, fix this handoff before declaring handoff ready.

<!-- ack:section:handoff-sufficiency-check -->
## Handoff Sufficiency Check

Can the next AI continue from `AGENTS.md`, this handoff, `dev/PROJECT_INDEX.md`, and needed rule packs without searching old log history?

Answer: yes.
If no, update this handoff before closeout.

Continuity rule: this file carries current state and next action. `dev/SESSION_LOG.md` carries recent evidence only. Archive old detail only when needed; do not create an archive directory by default.

<!-- ack:section:next-session-opening-message -->
## Next Session Opening Message

📋 Next session: copy and paste the whole block below

```text
Work in C:\Users\adam\_claude_desktop\AI_Public_Squares (Phase 4 plan SSOT). Most actual Phase 4 execution happens elsewhere — Adam real runtime at C:\Users\adam\_claude_desktop\Work_MP\明報教育Plus\MP - 明報教育服務\MPEdu_Plus_Branding\ and Jay's machine. If you intend to execute Phase 4 Block 4A, open a new session inside that real runtime workspace instead of this one. If you intend to apply Bridge Pack T0b polish, do it inside Demo_Agent_Adam_Public_Squares / Demo_Agent_Jay_Public_Squares sessions (one each).

Read in order:
1. AGENTS.md
2. dev/SESSION_HANDOFF.md
3. dev/SESSION_LOG.md
4. dev/PROJECT_INDEX.md
5. dev/RULE_PACKS.md
6. docs/plans/2026-05-21-aps-phase4-plan.md

Read dev/DOC_SYNC_REGISTRY.md before file changes or closeout.

If this root does not match the expected project root, stop and ask for confirmation.

Current state (as of 2026-05-21 S5 closeout): APS MVP verified; both demo workspaces at kit v0.1.7; Phase 4 plan complete with T0b Bridge Pack prerequisite + Layer 2 T0 restructure (3 decisions + 4 defaults) + Layer 3 Tooling shortcut introducing tools/aps-onboard.ps1; user-facing walkthrough refined under all three layers — canonical mid-session trigger `check Hub` + 2 synonyms; daily WhatsApp short `Hub 有新嘢`; mid-session `check Hub` is the 默認嘅日常 primary pattern; auto-conflict-scan moved to Bridge Pack; UTC/find marked first-cross-machine verification only; T0 parameter decision burden cut from 5+ to 3; PowerShell helper script tools/aps-onboard.ps1 covers T2-T5 idempotently (T6 stays manual).

Next user-driven actions (3 independent threads):
- T0b execution in Demo_Agent_Adam + Demo_Agent_Jay sessions: apply two Bridge Pack startup behaviours per Phase 4 plan T0b.
- Block 4A in MPEdu_Plus_Branding real runtime: Layer 1 + Layer 2 + Layer 3 (with Tooling shortcut) + T0b pre-state ready. Block 4A first run is also the script's first real insertion-path verification.
- T0 parameter lock with Jay: 3 user decisions (PROJECT / Jay 部機路徑 / T10) per Phase 4 plan T0 / walkthrough §3.

User-facing walkthrough at docs/guides/aps-onboarding-walkthrough.html. Phase 4 technical plan at docs/plans/2026-05-21-aps-phase4-plan.md. PowerShell helper at tools/aps-onboard.ps1 with inline `Get-Help` documentation.

After reading, summarize current objective, confirmed decisions, pending work, risks, and the next recommended action.
```
