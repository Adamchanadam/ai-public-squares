# Session Log

Add new session entries at the top. Record what actually happened in the session; do not copy old completed work forward as new work.

This log carries recent evidence, not current state. Put the current objective, next action, risks, and workspace identity in `dev/SESSION_HANDOFF.md`.

Keep recent entries concise. If older entries no longer affect the next action, reduce them to short dated indexes that point to the durable source of truth. Archive long error output, validation detail, or research trails only when needed; do not create an archive directory by default.

Before closeout, check whether older log detail should be kept, summarized, or archived. Do not remove validation evidence, unresolved risks, or the latest opening message.

## 2026-05-21 — Phase 4 plan + user-facing docs expansion

- **ID:** S2
- **Summary:** Authored Phase 4 implementation plan; expanded user-facing docs with a guides hub + complete onboarding walkthrough; added shared site navigation across the three HTML pages so future guide additions plug straight in.
- **Changed:** This workspace only — no demo workspace edits, no Hub edits, no real-runtime edits.
  - New: `docs/plans/2026-05-21-aps-phase4-plan.md` (Phase 4 implementation plan; T0 + Blocks 4A–4D + 10 tasks + acceptance criteria + risks + out-of-scope; ≈ 360 lines).
  - New: `docs/guides/index.html` (教學中心 hub; nav menu; current-guide card + 7 planned-guide entries + "how to add a new guide" section).
  - New: `docs/guides/aps-onboarding-walkthrough.html` (Adam + Jay dual-perspective step-by-step; 10 sections + TOC; role-chip pattern; real WhatsApp templates + file paths + accept boxes).
  - Modified: `docs/index.html` — inserted shared `.site-nav` block; reflected demo workspaces aligned to kit v0.1.7; replaced Phase 4 placeholder bullets with Block 4A–D summary linked to plan; appended Phase 4 plan + guides hub rows to "項目入口" entry table; added callout linking to guides; refreshed cover meta + footer to 2026-05-21.
  - Modified: `dev/SESSION_LOG.md` (this entry).
  - Modified: `dev/PROJECT_INDEX.md` (`docs/guides/` directory row + 2 Fact Base rows + verified-date refresh on relevant rows).
  - Modified: `dev/DOC_SYNC_REGISTRY.md` (new row for user-facing docs change type).
  - Modified: `dev/SESSION_HANDOFF.md` (closeout reconciliation: Phase 4 plan moved from pending → done; Risk #3 closed because user reported demo workspaces are at v0.1.7; Active Objective updated to "execute Phase 4 in real runtimes").
  - Regenerated: `START_NEXT_SESSION_PROMPT.txt` from the new fenced opening message in the handoff.
- **Done:**
  - Phase 4 plan: covers T0 lock-parameters block + Block 4A (Adam runtime, 6 tasks T1–T6) + Block 4B (Jay runtime, 2 tasks T7–T8) + Block 4C (live cross-machine round-trip, 3 sub-tasks T9a/b/c) + Block 4D (large-attachment dry-run, T10) + 10-point acceptance criteria for whole Phase 4 + Phase 5+ out-of-scope register + Phase-4-specific risk table + operational notes carry-over from MVP.
  - Walkthrough HTML: 10 sections with TOC anchors; Adam / Jay / 雙方 chip pattern enforces clear role assignment per step; pre-flight checklist, T0 parameter table, full T9 round-trip narrative, daily-use 7-step pattern post-Phase 4, error recovery (5 failure modes), reference table at end.
  - Three HTML pages share the same inline nav + design tokens; cross-page navigation tested by manual link audit.
- **In-session iteration after user feedback (same day):**
  - User flagged that `docs/guides/index.html` (and by extension the walkthrough) breached personal voice / terminology discipline — internal codes such as `Phase 4 Block 4D`, `Bridge Pack`, `PROTOCOL.md`, `round-trip` were sitting as sentence subjects in user-facing prose.
  - Rewrote `docs/guides/index.html` first as a low-cost language sample: removed maintainer-only "how to add a new guide" section; rewrote planned-guides list with day-language descriptions; replaced "Walkthrough" English word with "教學".
  - User confirmed voice OK and asked for SVG flow diagrams to replace dense step text in the walkthrough. Drew the overview SVG first as a visual sample; user confirmed visual style.
  - Full rewrite of `docs/guides/aps-onboarding-walkthrough.html` (now 973 lines): four inline SVG flow diagrams (overview / cross-machine handover swimlane / daily 7-step / error-recovery decision tree); prose tightened end-to-end; 0 residual internal codes as sentence subjects (`Block 4*` / `Bridge Pack` / `round-trip` all eliminated; `PROTOCOL.md` and `Phase 4` only remain as path or link metadata, not as subjects).
  - Renamed nav link text "Phase 4 計劃" → "跨機接駁計劃" across all three HTML pages for the same voice discipline.
- **In-session iteration 3 — actor separation (same day):**
  - User flagged conceptual ambiguity in the walkthrough: "Adam" / "Jay" were being used as single-actor labels, conflating the human user with the agent program running on each machine. The core design insight (Hub single-writer is the agent program, not the human; WhatsApp is human-to-human; two parallel channels) was getting buried.
  - User also surfaced a related question (prior turn): does mid-session exchange require closing the conversation? Answer: no — packet immutability tracks the publish moment, not session lifecycle; sender can publish mid-conversation, and receiver can manually trigger an inbox check via fixed phrases (`check Hub` / `未消化` / `睇下 Hub 有冇新嘢`). Auto-push notification would require a local daemon and exits the pure-file-based design envelope.
  - Full rewrite of `docs/guides/aps-onboarding-walkthrough.html` end-to-end with four explicit actors (Adam 用戶 / Agent Adam 程式 / Agent Jay 程式 / Jay 用戶): four chip variants in the legend; cross-machine handover SVG rebuilt as a 4-lane swimlane (solid border = human, dashed border = agent program); daily 7-step SVG restructured as 10 steps across the same 4 lanes; recovery decision tree gained "user decides + agent executes" annotations.
  - Added new Section 9 "中間想交換,唔等對話收結" covering mid-session publish (sender side) and the three manual trigger phrases (receiver side), with caveat that this is user-triggered polling and not auto-push.
  - Lightweight patches to design doc `docs/plans/2026-05-20-agent-public-square-design.md`: §11 gained an explicit Actor 區分 sub-section (4 actors + two parallel channels); §4 added cross-ref to §11; §7 added a mid-session manual-trigger caveat; file history entry appended. Protocol design itself unchanged.
- **In-session iteration 4 — copy-to-clipboard ergonomic (same day):**
  - User asked for code-fence style copy affordance on all prompts Adam / Jay actually paste into third-party tools (WhatsApp messages, agent chat).
  - Added `.copy-block` CSS + an inline browser script in the walkthrough that wraps every `<pre>` block under `<main>` with a `.copy-block` container (label + 複製 button + monospace body). Click writes to `navigator.clipboard`; falls back to auto-selecting the pre contents for manual Ctrl+C on browsers / contexts that block the clipboard API. No external dependency, no library, runs on `file://`.
  - Moved annotation spans (e.g. "← 用第 3 節拍板嗰個") out of the Identity YAML `<pre>` blocks into `.copy-block__note` paragraphs underneath, so the copied text is clean (paste-able straight into the small rule file without manually stripping annotation lines).
- **In-session iteration 5 — placeholder discipline (same day):**
  - User flagged a design-discipline concern: the demo slug `mpedu_plus_branding` is only an example, but the repo's user-facing teaching prose / templates must stay generic — no hardcode of the demo slug in places where the reader is meant to copy-paste into their own configuration.
  - Audited the workspace: ≈ 50 hits across plan / design / governance docs. Triaged into three classes — A (example with explicit "demo / illustration" context — kept as-is), B (user-facing prompt / template that gets copied into third-party tools — must change), C (out-of-scope: Hub `_hub/PROTOCOL.md` on Drive + the two demo workspaces' Bridge Pack files — audit reported for follow-up sessions).
  - Class-B fixes in `docs/guides/aps-onboarding-walkthrough.html`: 4 hardcoded `mpedu_plus_branding` occurrences swapped for the `[項目代號]` placeholder convention used elsewhere in the walkthrough (Adam Identity YAML, Jay Identity YAML, two WhatsApp templates). Each affected `.copy-block` now carries a paired `.copy-block__note` instructing the reader to substitute the placeholder before writing into a rule file or sending the message. Jay's Identity YAML also gained a second placeholder `[Jay 部機嘅共享資料夾絕對路徑]` (replacing the slightly hardcoded `H:\我的雲端硬碟\…\AI_Public_Squares` sample) for the same reason.
  - **Case-variant audit follow-up (same iteration, after user catch)**: initial grep only matched lowercase `mpedu_plus_branding` and missed the camelcase folder-name variant `MPEdu_Plus_Branding` (Adam's real-runtime folder). Re-grep surfaced 3 additional hits in the walkthrough: Section 2 Adam prerequisite, Section 3 Jay workspace candidate (`D:\Work\MPEdu_Plus_Branding_Jay\` → `D:\Work\[項目代號]_Jay\`), and Section 5 Jay-to-Adam WhatsApp sample (same). Placeholder convention unified — `[項目工作目錄]` (briefly introduced) collapsed into the existing `[工作目錄]` placeholder used in the Section 1 convention callout.
  - **Strict discipline pass (after second user catch)**: user pointed out that even the Section 1 convention callout's tail clause ("`mpedu_plus_branding` 只係之前 demo 嘅參考值, 教學入面出現嗰陣會明標係示例") was still leaking the demo slug. Re-grepped case-insensitively and found 6 occurrences across the walkthrough — including parenthesized "(沿用 demo 嘅 `mpedu_plus_branding` 或者改新)" in Identity YAML notes (Sections 4 & 5), the Section 3 parameter table's default candidate `mpedu_plus_branding` + alternative example `mpedu_branding_2026`, the Section 2 demo example reference, and the Section 1 callout meta-statement. Removed all six: Section 1 callout tail rewritten to generic "協定本身通用,教學文字唔列具體 value;具體 value 由你哋自己決定"; Section 2 prerequisite dropped the trailing demo-folder mention; Section 3 default cell became "沿用上次試演嘅項目代號" with the example slug removed; Identity YAML notes simplified to "換做第 3 節拍板嗰個值" without parenthesized demo references. After this pass, `grep -i "mpedu" docs/guides/aps-onboarding-walkthrough.html` returns zero hits — the walkthrough no longer mentions the demo slug at all. Demo-slug references remain only in instance-specific docs (plans, verification, governance, `docs/index.html` as the Adam-Jay instance dashboard), per the earlier A/B/C triage.
  - **Extended placeholder audit + cross-doc consistency pass (third user catch)**: user asked for two parallel audits — (i) other instance-value leaks in walkthrough beyond the slug (hub_root paths, agent_id, demo workspace paths), and (ii) cross-check walkthrough's procedural steps against the actual protocol logic (PROTOCOL.md, design doc, Bridge Pack). Audit (i) flagged 3 hardcoded hub_root paths in copy-paste content: Adam Identity YAML's `hub_root: G:\我的雲端硬碟\…` (→ `[Adam 部機嘅共享資料夾絕對路徑]`); the >50 MB sample `ssot_refs` YAML's absolute path (→ `[Hub 絕對路徑]\\_external\\…`); the "Externalized: … at G:\…" sample report line (→ `at [Hub 絕對路徑]\…`). Other instance values (G:\/H:\ disk-letter contrasts, reference-lookup paths, demo workspace baselines, narrative protagonist names `Adam`/`Jay`, `from_adam`/`from_jay` lane names mandated by protocol) kept as A-class with context. Audit (ii) ran 13 cross-checks against PROTOCOL.md/design doc/Bridge Pack: 11 aligned (receiver pending computation, `(packet_id, version)` join key + 4 serializations, 4 outbox verbs, WhatsApp template wording, 50 MB attachment rule, `close`/`withdraw` semantics, three iron rules, Hub layout, Drive offline-available requirement, Bridge Pack lane boundaries, WhatsApp triggering); 2 gaps surfaced and fixed by adding two new Section-6 callouts ahead of the handover SVG: "敏感資料禁區" (packet must not carry credentials / API keys / unpublished financials / unauthorised personal data; route sensitive payloads through a secure out-of-band channel and reference abstractly) and "用戶決定,Agent 執行 — 之間有一格" (agent surfacing a packet is a proposal, not an auto-apply: the user decides whether/when/how much, then instructs the agent — the human-in-the-loop step is intentional). One acceptable abstraction left unchanged: walkthrough's "登記消化" wording does not explicitly state that consume requires a non-empty `result` string per design doc §6.3 — flagged for a future-iteration polish but kept out of scope this pass.
  - **Placeholder example follow-up (fourth user catch)**: user noted that placeholders alone don't tell the reader what shape / convention a substitute value should take — `[項目代號]` could be anything to a first-time reader (case? length? Chinese? special chars?). Added a new "Placeholder 樣本 — 形狀同例" master callout in Section 1 immediately after the convention callout: enumerates each placeholder used in the walkthrough (`[項目代號]`, hub_root paths, `[工作目錄]`, `[題目]`, `[時間戳]`), gives shape rule (snake_case, length, character set), 2–4 hypothetical example values per placeholder (deliberately not the demo slug — `branding_2026`, `logo_refresh_q2`, `cobeing_website`, `G:\Cloud\AI_Public_Squares`, `D:\Work\AI_Public_Squares` etc.), and notes that NTFS case insensitivity is the reason slug stays lowercase. Section 3 parameter table's "項目代號" default cell additionally gained an inline example pair (`branding_2026` / `logo_refresh`) plus a pointer back to the Section 1 sample for full shape rules.
  - **Per-block inline example follow-up (same iteration)**: user opted to add inline examples to every `.copy-block__note` so readers don't have to scroll back to the Section 1 master table at operating time. Added one example value per placeholder in all 5 `.copy-block__note` entries: Adam Identity YAML (`[項目代號]` → `branding_2026`; `[Adam 部機嘅共享資料夾絕對路徑]` → `G:\Cloud\AI_Public_Squares`), Jay Identity YAML (`branding_2026` / `D:\Work\AI_Public_Squares`), Adam→Jay WhatsApp template (`branding_2026`), Jay→Adam WhatsApp template (`branding_2026`), big-attachment `ssot_refs` YAML (`G:\Cloud\AI_Public_Squares` for `[Hub 絕對路徑]` + new inline example `logo_convergence` for `[題目]`). Each note also gained a back-pointer "完整形狀規則見第 1 節「Placeholder 樣本」" so readers know where to find the full shape spec without each note repeating it.
  - Added a new warn-style callout in Section 1 documenting the global placeholder convention: all square-bracket short phrases (`[項目代號]`, `[題目]`, `[時間戳]`, `[工作目錄]`, `[Jay 部機嘅共享資料夾絕對路徑]`, etc.) are forcing-function placeholders; `mpedu_plus_branding` only ever appears as an explicitly-labelled demo reference. Single anchor point so subsequent placeholder additions don't need to re-explain.
  - Class-C follow-up audit list captured in handoff Next Priorities: `_hub/PROTOCOL.md` review for any leaked demo slug in non-example sections; demo Adam / Jay Bridge Pack review that Identity section is by-design hardcode but procedural steps use placeholders.
- **QC:**
  - Cross-doc consistency: Phase 4 plan task numbering (T0, T1–T10) is mirrored in walkthrough section narrative (sections 3–7); design / MVP plan / MVP verification doc paths in walkthrough match actual filesystem.
  - HTML link audit (manual): index.html ↔ guides/index.html ↔ aps-onboarding-walkthrough.html three-way nav round-trip resolves on local filesystem; markdown plan links open in any markdown-capable viewer.
  - kit doctor: to be run as part of closeout. Expected: 34/34 still passes (no file removed; only governance files reconciled + 3 new docs files added).
  - No file changes outside this workspace; AGENTS.md managed-core block untouched.
- **Sync:**
  - APS protocol / plan / verification change: confirmed — Phase 4 plan added to `docs/plans/`; cross-doc consistency verified.
  - APS guides / user-facing docs change (new sync row): confirmed — `docs/guides/` created; `docs/index.html` updated.
  - Demo workspaces at kit v0.1.7: confirmed by user, reflected in handoff (Risks #3 closed).
- **Pending:**
  - Phase 4 execution itself: Block 4A (Adam's real `MPEdu_Plus_Branding` workspace; can start any time on Adam's machine, no Jay dependency); Block 4B (Jay's machine, requires Jay's availability); Block 4C (depends on 4A + 4B); Block 4D (optional, before any real >50 MB asset).
  - Phase 4 verification report (`docs/plans/2026-MM-DD-aps-phase4-verification.md`) — created after Phase 4 done, mirrors MVP verification report structure.
  - 7 "之後會加" guides in `docs/guides/index.html` planned-list — each triggered by its corresponding Phase 5+ milestone.
- **Risks:**
  - Jay's machine setup still blocked on Jay's availability — unchanged.
  - Cross-machine Drive sync latency still unproven — unchanged (Phase 4 Block 4C is where this gets measured).
  - No remote git on any local workspace — unchanged.
  - Demo workspaces lacking v0.1.7 governance: CLOSED — user confirmed both demos aligned to v0.1.7.
- **Log maintenance:** kept; new entry added at top per file convention. Previous 2026-05-20 entry retained as-is — it carries MVP-build evidence still relevant to Phase 4 execution.

### Next Session Opening Message

📋 Next session: copy and paste the whole block below

```text
Work in C:\Users\adam\_claude_desktop\AI_Public_Squares (Phase 4 plan SSOT). Most actual Phase 4 execution will happen elsewhere — in C:\Users\adam\_claude_desktop\Work_MP\明報教育Plus\MP - 明報教育服務\MPEdu_Plus_Branding\ (Adam real runtime) and on Jay's machine — once Phase 4 starts.

Read in order:
1. AGENTS.md
2. dev/SESSION_HANDOFF.md
3. dev/SESSION_LOG.md
4. dev/PROJECT_INDEX.md
5. dev/RULE_PACKS.md
6. docs/plans/2026-05-21-aps-phase4-plan.md

Read dev/DOC_SYNC_REGISTRY.md before file changes or closeout.

Current state (as of 2026-05-21): APS MVP verified on same-machine simulation; both demo workspaces aligned to Agent Handoff Kit v0.1.7; Phase 4 implementation plan complete; user-facing docs expanded with guides hub + onboarding walkthrough. Next task is Phase 4 execution itself — Block 4A (Adam real runtime) is independent and can start any time; Block 4B (Jay's machine) requires Jay's availability; Block 4C round-trip depends on both; Block 4D (large-attachment dry-run) optional.

User-facing walkthrough at docs/guides/aps-onboarding-walkthrough.html. Phase 4 technical plan at docs/plans/2026-05-21-aps-phase4-plan.md.

After reading, summarize current objective, confirmed decisions, pending work, risks, and the next recommended action.
```

## 2026-05-20 — APS design, MVP build + verification, kit 0.1.5→0.1.7 upgrade chain

- **ID:** S1
- **Summary:** Created Agent Public Square (APS) — design, plan, MVP implementation, MVP verification, user-facing entry page; also restored kit governance hygiene on this workspace after three rounds of kit upgrade culminating in v0.1.7's `§2.1 Upgrade Done Contract`.
- **Changed:** Across three local workspaces plus one Drive Hub.
  - This workspace (`AI_Public_Squares`): `docs/plans/2026-05-20-{agent-public-square-design,aps-mvp-implementation,aps-mvp-verification}.md`, `docs/index.html`, `AGENTS.md` (cleaned by 0.1.7), `dev/SESSION_HANDOFF.md` (filled), `dev/SESSION_LOG.md` (this entry), `dev/PROJECT_INDEX.md` (filled), `dev/DOC_SYNC_REGISTRY.md` (+1 APS row), `START_NEXT_SESSION_PROMPT.txt` (regenerated from handoff), `NEXT_SESSION_HANDOFF_PROMPT.txt` (deleted 0-byte orphan), four `dev/governance_migrations/<UTC>/` folders.
  - Demo Agent Adam (`Demo_Agent_Adam_Public_Squares`): full kit governance + Bridge Pack + APS round-trip ledger across 9 commits.
  - Demo Agent Jay (`Demo_Agent_Jay_Public_Squares`): full kit governance + Bridge Pack mirrored from Adam (identity-only diff) + APS round-trip ledger across 8 commits.
  - Drive Hub `G:\我的雲端硬碟\Adam 工作目錄\AI_Projects\AI_Public_Squares\`: `_hub/PROTOCOL.md` v1.0, `_hub/CHANGELOG.md`, four templates, `mpedu_plus_branding/` lane skeleton + two real packets (kickoff + reply) + both `ack.json` files. (Drive files not git-tracked; runtime data store.)
- **Done:**
  - APS design (5-section brainstorm) → 15-task MVP implementation plan → full subagent-driven execution with per-task spec + code-quality review.
  - Complete same-machine round-trip with steady-state verification (both lanes pending = empty after close).
  - Gate review verdict "Approved for MVP" with 4 Important items: 3 fixed in-session (`_hub/CHANGELOG.md` created, PROTOCOL.md-authoritative tie-breaker added to Bridge Pack, verification report commit-count corrected); 1 deferred to Phase 4 (cross-machine validation, requires Jay's machine).
  - Three kit upgrades: 0.1.5 (appended sandwich-dup managed core), 0.1.6 (no-op due to dup-detection bug), 0.1.7 (replaced sandwich correctly + added `§2.1 Upgrade Done Contract` to prevent recurrence).
  - This workspace's governance fill-in to satisfy AGENTS.md v0.1.7 §2 — active project root must persist before task is complete.
- **QC:**
  - `npx @adamchanadam/agent-handoff-kit doctor` v0.1.7: 34/34 passed (17 files + 9 anchors + 7 schema + 1 prompt mirror) after 0.1.7 upgrade; re-checked after governance fill-in.
  - Spec + code-quality review per task across 16 MVP tasks; T1 PROTOCOL.md needed 6-fix re-review (C1/C2/C3 critical + 3 important); T5 Bridge Pack needed 10-fix re-review (3 critical + 5 important + safety addition).
  - Round-trip protocol-conformance PASS on both legs; zero conflicted copies on Drive Hub verified by `find ... -iname "*conflict*"` returning empty.
  - Acceptance checks for this governance fill-in: see Sync field below + the 8 grep tests in `docs/plans/2026-05-20-aps-mvp-implementation.md` §13 + 5-section plan check #4.
- **Sync:**
  - APS publish: 20260520T082121Z__aps_kickoff v1 (Adam → Jay).
  - APS reply / publish: 20260520T082642Z__aps_kickoff_reply v1 (Jay → Adam).
  - APS close: 20260520T082121Z__aps_kickoff v1 (Adam, after Jay's reply ack'd).
  - APS consume: both directions, each `ack.json` carries one consumed entry referencing the counterpart's packet.
  - Project index updated (this commit); doc sync registry updated with one APS row (this commit); `docs/index.html` + design/plan/verification docs created and committed in earlier commits this session; demo workspaces and Drive Hub recorded in `PROJECT_INDEX.md` External Services.
- **Pending:**
  - Phase 4 — real cross-machine handoff with Jay (separate plan; requires Jay's cooperation for her machine setup).
  - Bridge Pack integration into Adam's real `MPEdu_Plus_Branding` runtime workspace (single-machine task, can be done independently if Adam wants to be ready before Jay).
  - Large-attachment dry-run (>50 MB) to validate Bridge Pack externalization rule before real branding assets cross.
  - Optional kit upgrade for the two demo workspaces (still at pre-0.1.5; low priority since they're sandboxes).
- **Risks:**
  - Jay's machine setup unconfirmed (Drive mount + offline-available pending Jay's action).
  - Cross-machine Drive sync latency and conflict behavior unproven (same-machine simulation only so far).
  - No remote git on any of the three workspaces — single-disk single-point-of-failure.
  - Demo workspaces lack v0.1.7's skill-arbitration rule; not blocking since they're sandboxes, but worth tracking if they get reused.
- **Log maintenance:** kept; first real entry. Future Phase 4 sessions should add new entries at the top of this file, not amend this one.

### Next Session Opening Message

📋 Next session: copy and paste the whole block below

```text
Work in C:\Users\adam\_claude_desktop\AI_Public_Squares.

Read in order:
1. AGENTS.md
2. dev/SESSION_HANDOFF.md
3. dev/SESSION_LOG.md
4. dev/PROJECT_INDEX.md
5. dev/RULE_PACKS.md

Read dev/DOC_SYNC_REGISTRY.md before file changes or closeout.

If this root does not match the expected project root, stop and ask for confirmation.

Current state (as of 2026-05-21): APS MVP complete and verified on same-machine simulation. AGENTS.md is at kit v0.1.7 (clean, doctor 34/34 passing). Next task is Phase 4 — real cross-machine handoff with Jay; not yet started. See docs/plans/2026-05-20-aps-mvp-verification.md for the Phase 4 open items, and docs/index.html for the user-facing project explainer.

After reading, summarize current objective, confirmed decisions, pending work, risks, and the next recommended action.
```

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
