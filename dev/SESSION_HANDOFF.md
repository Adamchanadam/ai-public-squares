# Session Handoff

Last Updated: 2026-05-21 (session S2 closeout: Phase 4 plan + user-facing docs)

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
2. Product/system state: APS MVP complete and round-trip-verified on same-machine simulation. Phase 4 (real cross-machine handoff between Adam's `MPEdu_Plus_Branding` runtime and Jay's machine) **planned in full** (`docs/plans/2026-05-21-aps-phase4-plan.md`) but **execution not started**.
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

APS MVP is complete and verified. Phase 4 plan + user-facing docs landed this session: full `docs/plans/2026-05-21-aps-phase4-plan.md` (10 tasks, T0 + Blocks 4A–4D), plus `docs/guides/index.html` + `docs/guides/aps-onboarding-walkthrough.html` (Adam + Jay step-by-step). Demo workspaces confirmed at kit v0.1.7. **Next user-driven action is Phase 4 execution itself**: Block 4A (Adam real runtime `MPEdu_Plus_Branding`, independent, can start any time on Adam's machine in a new session there); Block 4B (Jay's machine, requires Jay's availability); Block 4C live cross-machine round-trip (depends on 4A + 4B); Block 4D large-attachment dry-run (optional, before any real >50 MB asset). Phase 4 execution has not started.

<!-- ack:section:completed-this-session -->
## Completed This Session

Record only work actually completed in the current session (S2, 2026-05-21).

1. Authored `docs/plans/2026-05-21-aps-phase4-plan.md` — Phase 4 implementation plan, ≈ 360 lines: T0 lock-parameters + Block 4A (T1–T6, Adam runtime onboarding) + Block 4B (T7–T8, Jay runtime onboarding) + Block 4C (T9a/b/c, live cross-machine round-trip) + Block 4D (T10, large-attachment dry-run) + 10-point acceptance criteria + Phase 5+ out-of-scope register + Phase-4-specific risk table.
2. Created user-facing teaching layer under `docs/guides/`:
   - `docs/guides/index.html` — guides hub with shared site nav, current-guide card, 7 planned-guide entries, and "how to add a new guide" section.
   - `docs/guides/aps-onboarding-walkthrough.html` — first guide: 10 sections + TOC, Adam / Jay / 雙方 chip pattern, real WhatsApp templates, real file paths, ✓ accept boxes, error-recovery section covering 5 failure modes.
3. Updated `docs/index.html`: inserted shared `.site-nav` block (now consistent across all three HTML pages); reflected demo workspaces at v0.1.7; replaced Phase 4 placeholder with Block 4A–D summary linked to plan; appended Phase 4 plan + guides hub rows to "項目入口" table; added callout linking to guides hub; refreshed cover meta + footer to 2026-05-21.
4. Updated governance state files: `dev/SESSION_LOG.md` (S2 entry at top), `dev/PROJECT_INDEX.md` (`docs/guides/` directory row + 3 Fact Base rows + Stack note refresh), `dev/DOC_SYNC_REGISTRY.md` (new row for APS user-facing docs change type), this `SESSION_HANDOFF.md` (reconciliation: Active Objective updated, Risks #3 closed, Next Priorities reshuffled, opening message regenerated), `START_NEXT_SESSION_PROMPT.txt` (regenerated from new opening message).
5. After in-session user feedback that voice / terminology discipline was breached in the user-facing guides, rewrote both `docs/guides/index.html` and `docs/guides/aps-onboarding-walkthrough.html` end-to-end. Walkthrough rewrite added four inline SVG flow diagrams (接駁五階段總覽 / 首次跨機交接 swimlane / 日常七步 / 出錯處理判斷). Verified by grep that internal codes (`Block 4*` / `Bridge Pack` / `round-trip`) no longer appear as sentence subjects anywhere in either page. Renamed shared nav link text "Phase 4 計劃" → "跨機接駁計劃" across all three HTML pages.
6. After further user feedback (actor disambiguation + mid-session exchange question), rewrote walkthrough end-to-end again with four explicit actors (Adam 用戶 / Agent Adam 程式 / Agent Jay 程式 / Jay 用戶); 4-lane swimlane SVG for cross-machine handover; 10-step actor-explicit daily flow SVG; added Section 9 "中間想交換,唔等對話收結" covering mid-session publish + three manual trigger phrases (`check Hub` / `未消化` / `睇下 Hub 有冇新嘢`); explained the design trade-off (user-triggered polling vs. auto-push). Lightweight patches to `docs/plans/2026-05-20-agent-public-square-design.md` §11 (Actor 區分 sub-section + two parallel channels), §4 (cross-ref), §7 (mid-session manual-trigger caveat), and file-history entry. Protocol design itself unchanged.
7. Iteration 4 UI ergonomic: added a `.copy-block` wrapper (CSS + inline `<script>`) to the walkthrough that auto-wraps every `<pre>` with a label + 複製 button. Click writes to `navigator.clipboard`; fallback auto-selects content for manual Ctrl+C on contexts that block the clipboard API. Annotation spans in the Identity YAML pre blocks were moved out into `.copy-block__note` paragraphs so the copied text is clean and paste-able straight. No external dependency; runs on `file://`.
8. Iteration 5 placeholder discipline (took multiple sub-passes after consecutive user catches): user flagged that demo slug `mpedu_plus_branding` must not be hardcoded in user-facing prompts / templates. Audit started with lowercase grep (4 hardcode hits fixed in walkthrough Identity YAML + WhatsApp templates); follow-up catch surfaced camelcase variant `MPEdu_Plus_Branding` (3 more hits fixed); strict-discipline catch surfaced the convention callout's own meta-statement plus parenthesized demo references in notes / parameter table (6 more hits cleared — walkthrough now has zero `mpedu` hits at all). Extended audit caught 3 additional hardcoded `hub_root` paths in copy-paste content (Adam Identity YAML, big-attachment ssot_refs sample, Externalized notice) — all swapped to `[Adam 部機嘅共享資料夾絕對路徑]` / `[Hub 絕對路徑]` placeholders. Demo-slug references kept only in instance-specific docs (plans, verification, governance, `docs/index.html`). Cross-doc consistency audit (13 cross-checks against PROTOCOL.md / design doc / Bridge Pack) found 11 aligned; surfaced 2 gaps and patched by adding two new Section-6 callouts: "敏感資料禁區" (no credentials / API keys / unpublished financials in packets) and "用戶決定,Agent 執行 — 之間有一格" (agent proposes, user decides, agent executes; no auto-apply from packet body). Class-C audit deferred for cross-workspace work: Hub `_hub/PROTOCOL.md` placeholder leak check + both demo workspaces' Bridge Pack procedural-step audit.

Note: prior session (2026-05-20, S1) authored the APS design + MVP build + MVP verification + initial `docs/index.html` + kit upgrade chain to v0.1.7 + first governance fill-in. Those items remain in `dev/SESSION_LOG.md`'s 2026-05-20 entry, not duplicated here.

<!-- ack:section:next-priorities -->
## Next Priorities

1. **Phase 4 execution Block 4A** — Adam's real `MPEdu_Plus_Branding` runtime onboarding. Independent (no Jay dependency). Must be executed FROM that workspace (new session opened in `C:\Users\adam\_claude_desktop\Work_MP\明報教育Plus\MP - 明報教育服務\MPEdu_Plus_Branding\`), per AGENTS.md §2 active-project-root rule. Plan: `docs/plans/2026-05-21-aps-phase4-plan.md` Block 4A (6 tasks T1–T6).
2. **Phase 4-Pre / T0 — Lock canonical parameters with Jay** (`<PROJECT>`, agent ids, `<RUNTIME_JAY>`, demo-data handling, T10 status). Should precede or run in parallel with T1–T6.
3. **Phase 4 execution Block 4B** — Jay-machine prerequisite checklist + Bridge Pack install. Requires Jay's availability; Adam relays the demo-Jay starter file + onboarding note via WhatsApp.
4. **Phase 4 execution Block 4C** — first live cross-machine round-trip. Depends on 4A + 4B done.
5. **Phase 4 execution Block 4D** (optional but recommended before first real >50 MB asset) — externalization dry-run.
6. **Phase 4 verification report** — after Block 4C closes, write `docs/plans/2026-MM-DD-aps-phase4-verification.md` (mirror MVP verification report structure).
7. **Class-C placeholder audit** (deferred from iteration 5) — two cross-workspace reviews:
   - `G:\…\AI_Public_Squares\_hub\PROTOCOL.md` on Drive: confirm `mpedu_plus_branding` only appears in example schemas with explicit "demo / illustration" context, not in core procedural / contract text. If any hardcoded slug found in non-example sections, replace with `<project_slug>` placeholder.
   - Demo Adam (`C:\Users\adam\_claude_desktop\Demo_Agent_Adam_Public_Squares\dev\rules\aps-bridge.md`) and Demo Jay (same path under `Demo_Agent_Jay_Public_Squares\`): confirm Identity section's `mpedu_plus_branding` is the only hardcode (by design, per-instance config), and that procedural steps below Identity use placeholder form (`<project_slug>`, `<me>`, `<other>`, etc.). If procedural steps hardcode the slug, replace.
   - Each audit must run in the owning workspace's own session (per AGENTS.md §2 active-project-root rule), not from this plan SSOT workspace.

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

- Checks run this session (S2, 2026-05-21):
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
Commit: pending — this session's work (Phase 4 plan + guides + governance reconciliation) is currently uncommitted. Run `git status` then `git log -1 --format=%h` to see current HEAD.
Worktree / parallel workspace status: none (no `git worktree add`); two sibling demo workspaces (`Demo_Agent_Adam_Public_Squares`, `Demo_Agent_Jay_Public_Squares`) and the Drive Hub are separate repos / data stores; Adam's real `MPEdu_Plus_Branding` runtime is a separate workspace (Phase 4 Block 4A executes there).
Uncommitted changes summary: ≈ 10 files touched this session — 3 new (`docs/plans/2026-05-21-aps-phase4-plan.md`, `docs/guides/index.html`, `docs/guides/aps-onboarding-walkthrough.html`) + 6 governance / cross-doc edits (`docs/index.html`, `docs/plans/2026-05-20-agent-public-square-design.md`, `dev/SESSION_LOG.md`, this file, `dev/PROJECT_INDEX.md`, `dev/DOC_SYNC_REGISTRY.md`) + 1 regenerated (`START_NEXT_SESSION_PROMPT.txt`). Both guides pages rewritten end-to-end in iteration 2 (voice-discipline feedback) and walkthrough rewritten again in iteration 3 (actor disambiguation + mid-session section). Design doc gained one extra file touch in iteration 3 (§11 Actor 區分 sub-section + §4 cross-ref + §7 mid-session caveat + file-history entry).

<!-- ack:section:sync-status -->
## Sync Status

Use statuses from `dev/DOC_SYNC_REGISTRY.md`: `confirmed`, `unverified`, `pending`, `blocked`, `not_applicable`.

- Project index: `confirmed` (this session — `docs/guides/` row + 3 Fact Base rows added).
- Doc sync registry: `confirmed` (this session — added APS user-facing docs change type row).
- Public docs / README: `not_applicable` — no README; user-facing entry is `docs/index.html` with guides hub at `docs/guides/index.html`, intentional.
- External knowledge tools: `confirmed` — Drive Hub offline-available on Adam's side; Jay-side mirror `blocked` (Phase 4 Block 4B T7 prerequisite).
- APS plan / verification docs: `confirmed` — Phase 4 plan added; MVP plans + verification unchanged.
- APS user-facing docs (`docs/index.html` + `docs/guides/`): `confirmed` (this session) — three HTML pages share inline site-nav; manual link audit done.

<!-- ack:section:state-reconciliation-check -->
## State Reconciliation Check

At full closeout, complete this check after updating the state sections above.

- Reconciled at: 2026-05-21 (S2 closeout — Phase 4 plan + user-facing docs, iteration 1), same-day iteration 2 closeout (guides rewrite + SVG flow diagrams + nav rename), same-day iteration 3 closeout (walkthrough actor disambiguation rewrite + mid-session section + design doc §11/§4/§7 patches), same-day iteration 4 closeout (copy-to-clipboard ergonomic on walkthrough `<pre>` blocks), and same-day iteration 5 closeout (placeholder discipline — 4 walkthrough hardcode fixes + Section 1 convention callout + class-C audit deferred).
<!-- ack:field:state-sections-rewritten-or-confirmed -->
- State sections rewritten or confirmed current: Durable Anchors (§2 product state + §3 governance + §4 SSOT notes refreshed); Current Baseline (§2 product state updated); Task Understanding Summary (Non-goals expanded); Active Objective (rewritten); Completed This Session (replaced with S2 work, S1 archived in SESSION_LOG); Next Priorities (rewritten 6 entries); Next Task Required Reading (Phase 4 plan + walkthrough added); Risks (Risk #3 closed, #5 added); Validation/QC (S2 checks recorded); Workspace Identity (commit status + uncommitted summary updated); Sync Status (rewritten 6 lines); State Reconciliation Check (this field); Handoff Sufficiency Check (re-confirmed); Next Session Opening Message (regenerated).
<!-- ack:field:stale-snapshots-left -->
- Stale snapshots left in this handoff: none. S1 details preserved in `dev/SESSION_LOG.md` 2026-05-20 entry.
<!-- ack:field:opening-message-matches-current-state -->
- Opening message matches current state: yes — `START_NEXT_SESSION_PROMPT.txt` regenerated from the fenced block below as part of this closeout.
<!-- ack:field:next-ai-can-continue -->
- Next AI can continue from `AGENTS.md`, this handoff, `dev/PROJECT_INDEX.md`, `docs/plans/2026-05-21-aps-phase4-plan.md`, and needed rule packs without searching old log history: yes — Active Objective, Next Priorities (6 entries), Risks (5 entries), and Required Reading (10 sources) are all in this file; Phase 4 plan is self-contained.

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
Work in C:\Users\adam\_claude_desktop\AI_Public_Squares (Phase 4 plan SSOT). Most actual Phase 4 execution will happen elsewhere — in C:\Users\adam\_claude_desktop\Work_MP\明報教育Plus\MP - 明報教育服務\MPEdu_Plus_Branding\ (Adam real runtime) and on Jay's machine — once Phase 4 starts. If you intend to execute Phase 4 Block 4A, open a new session inside that real runtime workspace instead of this one.

Read in order:
1. AGENTS.md
2. dev/SESSION_HANDOFF.md
3. dev/SESSION_LOG.md
4. dev/PROJECT_INDEX.md
5. dev/RULE_PACKS.md
6. docs/plans/2026-05-21-aps-phase4-plan.md

Read dev/DOC_SYNC_REGISTRY.md before file changes or closeout.

If this root does not match the expected project root, stop and ask for confirmation.

Current state (as of 2026-05-21): APS MVP verified on same-machine simulation; both demo workspaces aligned to Agent Handoff Kit v0.1.7; Phase 4 implementation plan complete; user-facing docs expanded with guides hub + onboarding walkthrough. Next task is Phase 4 execution itself — Block 4A (Adam real runtime; independent; new session there) is the first move; Block 4B (Jay machine) waits for Jay; Block 4C round-trip depends on both; Block 4D large-attachment dry-run optional.

User-facing walkthrough at docs/guides/aps-onboarding-walkthrough.html — written in everyday Cantonese-blended written Chinese (no internal codes as sentence subjects per user voice discipline), with four inline SVG flow diagrams (overview / cross-machine handover / daily 7-step / error-recovery decision). Phase 4 technical plan at docs/plans/2026-05-21-aps-phase4-plan.md. Shared nav link to the plan reads "跨機接駁計劃" across all three HTML pages.

After reading, summarize current objective, confirmed decisions, pending work, risks, and the next recommended action.
```
