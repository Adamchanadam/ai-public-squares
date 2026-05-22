# Agent Public Square — Phase 4 Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task when Phase 4 starts.

**Goal:** Move APS from same-machine simulation to true cross-machine production. Integrate the Bridge Pack into Adam's real `MPEdu_Plus_Branding` runtime workspace and Jay's equivalent on her own machine, run a first live round-trip across two physical machines, verify Drive sync latency, and confirm zero conflicted copies under real load.

**Architecture:** No protocol change. Phase 4 reuses APS `PROTOCOL.md` v1.0 unchanged. The only delta vs. MVP is: real workspaces on two physical machines replace the two demo workspaces on the same machine. The Hub Root on Drive stays the same physical folder.

**Tech stack:** No new tech vs. MVP. Same markdown + YAML + JSON over a Google-Drive-synced folder, same agent-handoff-kit baseline (v0.1.7 on this plan SSOT and on both demo workspaces; real runtime versions checked in T1 / T7), same Bridge Pack rule pack.

**Reference SSOT (read before executing this plan):**

- `docs/plans/2026-05-20-agent-public-square-design.md` — design rationale (why the protocol looks the way it does).
- `docs/plans/2026-05-20-aps-mvp-implementation.md` — MVP build steps; Block 4A mirrors MVP T4–T9, Block 4B mirrors MVP T10.
- `docs/plans/2026-05-20-aps-mvp-verification.md` — MVP acceptance + the four Phase 4 items the gate review deferred.
- `G:\我的雲端硬碟\Adam 工作目錄\AI_Projects\AI_Public_Squares\_hub\PROTOCOL.md` v1.0 — runtime contract; the authoritative tie-breaker if any Bridge Pack wording diverges.

---

## Workspaces touched

| Role | Absolute path | Owner | Git? |
|---|---|---|---|
| Plan SSOT (this workspace) | `C:\Users\adam\_claude_desktop\AI_Public_Squares` | Adam | yes (branch `main`) |
| Adam real runtime | `C:\Users\adam\_claude_desktop\Work_MP\明報教育Plus\MP - 明報教育服務\MPEdu_Plus_Branding\` | Adam | TBD — confirmed in T1 |
| Jay real runtime | TBD — confirmed in T7 (Jay decides her path; example shape: `D:\…\MPEdu_Plus_Branding_Jay\`) | Jay | TBD |
| Hub Root (Drive) | `G:\我的雲端硬碟\Adam 工作目錄\AI_Projects\AI_Public_Squares\` | Adam (owner) / Jay (collaborator, write-scoped to her own lane) | no (runtime data store) |
| Demo Agent Adam (sandbox) | `C:\Users\adam\_claude_desktop\Demo_Agent_Adam_Public_Squares` | Adam | yes (kit v0.1.7 as of 2026-05-21) |
| Demo Agent Jay (sandbox) | `C:\Users\adam\_claude_desktop\Demo_Agent_Jay_Public_Squares` | Adam | yes (kit v0.1.7 as of 2026-05-21) |

**Notation in tasks:**
- `<HUB>` = `G:\我的雲端硬碟\Adam 工作目錄\AI_Projects\AI_Public_Squares`.
- `<RUNTIME_ADAM>` = `C:\Users\adam\_claude_desktop\Work_MP\明報教育Plus\MP - 明報教育服務\MPEdu_Plus_Branding\`.
- `<RUNTIME_JAY>` = path confirmed in T7 (may include a different drive letter on Jay's machine, that is expected).
- `<PROJECT>` = `project_slug` chosen in T0.

---

## Tooling shortcut (added 2026-05-21 S5)

`tools/aps-onboard.ps1` automates T2-T5 in one idempotent invocation. T1 (read-only baseline check), T6 (SESSION_HANDOFF Durable Anchors — judgement-bearing), and T7-T8 prerequisites stay manual. The script was verified for the idempotency-skip path against `Demo_Agent_Adam_Public_Squares`; first real insertion-path verification will happen during Block 4A's first real run on `<RUNTIME_ADAM>`.

Adam-side usage example (substitute `<PROJECT>` from T0):

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File <path-to-this-workspace>\tools\aps-onboard.ps1 `
  -RuntimeRoot "<RUNTIME_ADAM>" `
  -ProjectSlug "<PROJECT>" `
  -AgentId "adam" `
  -OtherAgentId "jay" `
  -HubRoot "G:\我的雲端硬碟\Adam 工作目錄\AI_Projects\AI_Public_Squares" `
  -DemoPackPath "C:\Users\adam\_claude_desktop\Demo_Agent_Adam_Public_Squares\dev\rules\aps-bridge.md" `
  -DryRun  # remove this flag once dry-run output looks right
```

Jay-side invocation is symmetric: `-AgentId "jay" -OtherAgentId "adam"`, with the demo Jay pack as `-DemoPackPath`. Adam sends the script + the relevant demo pack to Jay via WhatsApp / Drive before Block 4B.

After the script: do T6 manually per walkthrough §4 step 6 (Adam) or §5 (Jay) of `docs/guides/aps-onboarding-walkthrough.html`, then run `npx @adamchanadam/agent-handoff-kit doctor` in the runtime workspace to verify governance health.

Manual fallback: the per-task steps below (T2-T5) remain authoritative. If PowerShell is unavailable or you prefer to see each edit, follow them by hand — the script's behaviour matches them line-for-line.

Execution-policy note: if PowerShell refuses to run unsigned scripts, the `-ExecutionPolicy Bypass` flag in the invocation above applies per-process only (does not change system policy).

---

## Phase 4 scope

Four blocks, ten tasks. Block A is Adam-machine-only (independent). Block B is Jay-machine-only (independent). Block C requires A + B. Block D is recommended before any real branding asset >50 MB crosses.

| Block | Title | Where executed | Depends on |
|---|---|---|---|
| Pre | Lock canonical parameters | Adam (consult Jay once) | — |
| 4A | Adam runtime onboarding | Adam machine, in `<RUNTIME_ADAM>` | T0 |
| 4B | Jay runtime onboarding | Jay machine, in `<RUNTIME_JAY>` | T0 |
| 4C | First live cross-machine round-trip | Hub + both runtimes | 4A + 4B |
| 4D | Large attachment dry-run (>50 MB) | Hub + both runtimes | 4C |

---

# Phase 4-Pre — Decisions before any file change

### T0 — Lock canonical parameters

**Why:** MVP used `project_slug = mpedu_plus_branding` against demo agents `adam` / `jay`. Real runtime may want a different slug (e.g. to distinguish from any future re-run on the same Hub); agent ids must be agreed before either runtime writes; Jay's runtime path is unknown to this plan.

**Owner:** Adam decides, Jay confirms via WhatsApp.

**Decide and write down (append to the "Confirmed parameters" block at the bottom of this plan when settled). Layer 2 polish (2026-05-21 S4): real decision burden is 3 categories; remaining 4 are defaults with sensible inheritance from MVP.**

**Decide (3 user decisions):**

| Parameter | Constraint | Initial proposal |
|---|---|---|
| `<PROJECT>` (project_slug for real runtime) | lower snake_case, ≤ 30 chars, unique on Hub | NEW slug recommended (e.g. `mpedu_branding_2026`); demo lane on Hub stays untouched. Reusing demo slug requires clearing demo lane data — extra step, usually not worth it. |
| `<RUNTIME_JAY>` + `<RUNTIME_JAY_HUB>` | Jay's machine: workspace reachable + writable + kit-init'd; Hub mount set offline-available | TBD — Jay picks (may use a different drive letter than Adam's `G:\`; expected) |
| T10 large-attachment dry-run | execute in Phase 4 / formally defer | Execute recommended before any real >50 MB asset. Acceptable to defer if near-term assets are all text. |

**Defaults (no decision needed unless deviating):**

| Parameter | Default | When to override |
|---|---|---|
| Adam's `agent_id` | `adam` (matches demo) | Almost never. |
| Jay's `agent_id` | `jay` (matches demo) | Same. |
| Demo slug data handling | Leave untouched (new-slug default means demo lane is independent) | Only relevant if reusing demo slug, in which case data must be cleared before T1 (see Acceptance below). |
| Adam's `hub_root` + Drive share permissions for Jay | Inherit from MVP setup (read on `<HUB>`; write scoped to `<HUB>/<PROJECT>/from_jay/...` and `<HUB>/<PROJECT>/_ack/jay.ack.json`) | If MVP Drive share was at slug-folder level (not the parent `AI_Public_Squares` root), the new slug needs a new explicit share. Otherwise inherit. Not recorded as a separate row in Confirmed parameters because it's purely inherited. |

**Acceptance:** 3 decisions settled (rows above) + 4 defaults confirmed (override only if needed); all 7 settled parameter slots recorded in the "Confirmed parameters" block at the bottom of this plan before T1 begins. If `<PROJECT>` reuses the demo slug `mpedu_plus_branding`, lane data on Hub from MVP round-trip must be cleared (delete or move the two existing packet folders and the two ack files; reset both `outbox.log.md` to template). If `<PROJECT>` is a new slug (recommended), just create a fresh lane skeleton on Hub.

---

### T0b — Bridge Pack Layer 1 polish (demo workspace prerequisite, added 2026-05-21)

**Why:** Two startup-side behaviours land in the demo packs first so T2 / T8's "copy demo pack verbatim" naturally inherits them. Avoids repeating the polish per real-runtime onboarding, and removes friction the live S3 review surfaced (user no longer has to remember a shell `find` command; one canonical mid-session trigger instead of three).

**Owner:** Adam. Executes in `Demo_Agent_Adam_Public_Squares` session, then mirrors to `Demo_Agent_Jay_Public_Squares` session. Independent of T0; can run any time before T2.

**Behaviours to add to Bridge Pack (`dev/rules/aps-bridge.md` in each demo workspace), between the existing Identity section and the existing closeout-side-effect section:**

1. **Conflict-file auto-scan.** On every session startup AND every `check Hub` mid-session trigger, the agent scans `<HUB>/<PROJECT>/` recursively for any filename containing `conflict` (case-insensitive). If any match, surface to user with the full path immediately. Never auto-delete; the existing user-recovery flow (walkthrough §10.1) handles the rest.

2. **Canonical mid-session trigger.** Accept `check Hub` (case-insensitive) as the official trigger phrase. Continue to recognise synonyms by fuzzy match: a user utterance containing `Hub` plus any of `新` / `未消化` / `check` (case-insensitive) fires the same handler. Walkthrough §9 carries the user-facing version of this contract.

**Acceptance:**

- Both demo packs include the two behaviours. `grep -c "conflict" Demo_Agent_Adam_Public_Squares/dev/rules/aps-bridge.md` ≥ 1 and same for demo Jay.
- Cross-pack diff (`diff -u <demo Adam pack> <demo Jay pack>`) shows only Identity-section differences (matches pre-Layer-1 baseline).
- Each demo workspace's own `dev/SESSION_LOG.md` records the patch session and commits.

**Note:** T2 step 1 ("Copy demo Adam's pack verbatim") and T8 step 1 inherit these once the demo packs are patched, so Block 4A / 4B do not need separate Bridge Pack code changes. If T0b is skipped or partially done, T2 / T8 must apply the two behaviours inline before the runtime onboarding is considered complete.

---

# Block 4A — Adam runtime onboarding

Mirrors MVP T4–T9 but runs against `<RUNTIME_ADAM>` instead of the demo workspace. Done entirely by Adam on Adam's machine. Jay's confirmation not required.

---

### T1 — Inspect Adam's real runtime baseline

**Why:** Read-only sanity check before any change. We need to know which kit version `<RUNTIME_ADAM>` carries, whether doctor passes there, whether the directory layout matches what the Bridge Pack assumes, and whether git is initialised.

**Steps:**

1. `cd <RUNTIME_ADAM>` and list root: confirm `AGENTS.md`, `dev/SESSION_HANDOFF.md`, `dev/RULE_PACKS.md`, `dev/PROJECT_INDEX.md`, `dev/DOC_SYNC_REGISTRY.md` exist.
2. Read first 10 lines of `<RUNTIME_ADAM>\AGENTS.md` — confirm managed-core marker `<!-- BEGIN Agent Handoff Kit managed core -->` and look for the version comment. If managed core is older than v0.1.7, schedule T1b (upgrade) before T2.
3. Run `npx @adamchanadam/agent-handoff-kit doctor` in `<RUNTIME_ADAM>`. Record pass/fail count.
4. Check git state: `git status`, `git log -1 --format=%h`.

**Acceptance:** a short note in the current Adam session log: kit version, doctor result, git state. **NO file changes in T1.**

**T1b (only if kit < 0.1.7):** run `npx @adamchanadam/agent-handoff-kit@latest upgrade` in `<RUNTIME_ADAM>`. Follow AGENTS.md §2.1 Upgrade Done Contract: AGENTS.md must reach clean state, doctor must pass 34/34. If upgrade fails, stop and route back here before T2.

---

### T2 — Install Bridge Pack into Adam's real runtime

> **Tooling shortcut:** this step (and T3-T5) can be done by `tools/aps-onboard.ps1` — see Tooling shortcut at top of plan. The manual steps below remain authoritative.

**Why:** Real runtime gets the same Bridge Pack as the demo, with one change: Identity values updated to real-runtime parameters from T0. PROTOCOL.md authoritative tie-breaker line preserved.

**Files:**
- Create: `<RUNTIME_ADAM>\dev\rules\aps-bridge.md` — start from `C:\Users\adam\_claude_desktop\Demo_Agent_Adam_Public_Squares\dev\rules\aps-bridge.md` as the proven baseline (it passed MVP T5 code review with 10 fixes applied).

**Step 1:** Copy demo Adam's pack verbatim to `<RUNTIME_ADAM>\dev\rules\aps-bridge.md`.

**Step 2:** Replace the Identity section with real-runtime values from T0:

```markdown
## Identity (fill once per agent, per project)

- agent_id: adam
- project_slug: <PROJECT chosen in T0>
- hub_root: G:\我的雲端硬碟\Adam 工作目錄\AI_Projects\AI_Public_Squares
- other_agent_id: jay
```

**Step 3:** Confirm the PROTOCOL.md-authoritative tie-breaker paragraph at the top of the pack is intact (it is the gate-review I3 fix from MVP — without it, the local pack could be read as overriding PROTOCOL.md when they diverge).

**Step 4:** No edits to procedural steps. The demo pack is the runtime contract for the local agent.

**Acceptance:** `diff -u <RUNTIME_ADAM>\dev\rules\aps-bridge.md <demo Adam pack>` shows only Identity-section changes (and possibly hub_root if it differs).

**Commit (in `<RUNTIME_ADAM>`):**

```
feat(aps): add APS Bridge Pack to real runtime

Wires the Agent Public Square inbox-check and publish steps into this
workspace's startup and closeout flow. Mirrors the proven demo-Adam pack
with only Identity section adapted to real runtime parameters.
```

---

### T3 — Wire Bridge Pack into Adam's `RULE_PACKS.md`

> **Tooling shortcut:** done by `tools/aps-onboard.ps1` — see Tooling shortcut at top of plan. The manual steps below remain authoritative.

Mirror MVP T6: add the routing row verbatim into `<RUNTIME_ADAM>\dev\RULE_PACKS.md` before the `## Routing Rule` section.

Routing row content (same as MVP):

```markdown
| Cross-machine handoff, APS, packet, lane, ack, Hub, 共享 inbox | `dev/rules/aps-bridge.md` | check Hub inbox at startup, publish packet at closeout |
```

**Acceptance:** `grep -n "aps-bridge.md" <RUNTIME_ADAM>\dev\RULE_PACKS.md` returns one match.

**Commit:** `feat(aps): register APS Bridge Pack in RULE_PACKS router`.

---

### T4 — Register Hub as External Source in Adam's `PROJECT_INDEX.md`

> **Tooling shortcut:** done by `tools/aps-onboard.ps1` — see Tooling shortcut at top of plan. The manual steps below remain authoritative.

Mirror MVP T7: add or update the External Sources row with the chosen `<PROJECT>` from T0.

Row content (substitute `<PROJECT>`):

```markdown
| APS Hub | shared exchange zone with Jay (other APS agent) | every session startup; closeout if producing | `G:\我的雲端硬碟\Adam 工作目錄\AI_Projects\AI_Public_Squares\` (Google Drive, offline-available) | single-writer per lane; never write `from_jay/` or `_ack/jay.ack.json`; project slug `<PROJECT>` | 2026-MM-DD |
```

**Acceptance:** one matching grep hit; date stamped at T4 execution day.

**Commit:** `docs(aps): register APS Hub as external source in PROJECT_INDEX`.

---

### T5 — Add APS sync rows to Adam's `DOC_SYNC_REGISTRY.md`

> **Tooling shortcut:** done by `tools/aps-onboard.ps1` — see Tooling shortcut at top of plan. The manual steps below remain authoritative.

Mirror MVP T8 — two rows added before the `## Registry Rule` section:

```markdown
| APS packet publish | `<hub_root>/<project_slug>/from_<me>/packets/...`, `from_<me>/outbox.log.md`, local `SESSION_LOG.md` Sync line | packet folder exists, outbox.log has matching line, ack.json updated if consuming |
| APS packet consume | local `_ack/<me>.ack.json`, local `SESSION_LOG.md` Sync line | ack.consumed contains (packet_id, version); result string set |
```

**Acceptance:** `grep -n "APS packet" <RUNTIME_ADAM>\dev\DOC_SYNC_REGISTRY.md` returns two matches.

**Commit:** `docs(aps): add APS publish/consume rows to DOC_SYNC_REGISTRY`.

---

### T6 — Update Adam's runtime `SESSION_HANDOFF.md`

**Why:** Future sessions opening `<RUNTIME_ADAM>` need to see that APS Bridge is active and the Hub lane belongs to this workspace.

**Changes:**

1. Under `## Durable Anchors`: append a row noting "APS Bridge Pack live; agent_id=`adam`; Hub at `<HUB>`; lane `<PROJECT>/from_adam/`; counterpart `jay`".
2. Under `## Active Objective` (or equivalent current-state section): add one line acknowledging APS Bridge is in startup/closeout duties.
3. If `## Sync Status` exists, mark "APS Hub" as `confirmed` (with Phase 4 onboarding date).

**Acceptance:** `grep -n "APS" <RUNTIME_ADAM>\dev\SESSION_HANDOFF.md` returns ≥ 2 matches (Durable Anchors + Active Objective).

**Commit:** `docs(aps): record APS Bridge activation in handoff`.

---

# Block 4B — Jay runtime onboarding

Mirrors MVP T10 on Jay's machine. Done by Jay with Adam relaying instructions and the Jay-side starter pack via WhatsApp / email / a one-shot Drive folder.

---

### T7 — Jay machine prerequisite checklist

**Owner:** Jay (Adam coaches via WhatsApp; Adam cannot run commands on Jay's machine).

| Item | How to check / set | Status |
|---|---|---|
| Google Drive for Desktop installed and signed in | Open Drive app; confirm Adam's `AI_Public_Squares` folder visible under shared Drive | TBD |
| Hub Root visible on Jay's machine | Note actual path; record as `<RUNTIME_JAY_HUB>` — may differ from Adam's `G:\…\` | TBD |
| Hub Root set to "Available offline" | Right-click → "Make available offline" (Google Drive UI) | TBD |
| `<RUNTIME_JAY>` workspace decided + kit-init'd | Jay creates the directory, runs `npx @adamchanadam/agent-handoff-kit init` if not already done | TBD |
| `<RUNTIME_JAY>` kit doctor green | `npx @adamchanadam/agent-handoff-kit doctor` returns all-passed | TBD |

**Acceptance:** all 5 rows checked off by Jay, reported back to Adam (one-line WhatsApp `T7 OK + path: <RUNTIME_JAY_HUB>` is enough).

---

### T8 — Jay-side Bridge Pack install

**Owner:** Jay (Adam sends her the demo-Jay pack as the starter).

**Source file Adam sends to Jay:** `C:\Users\adam\_claude_desktop\Demo_Agent_Jay_Public_Squares\dev\rules\aps-bridge.md`.

**Jay's steps on her machine:**

1. Save received file as `<RUNTIME_JAY>\dev\rules\aps-bridge.md`.
2. Open and update Identity section only:

```markdown
- agent_id: jay
- project_slug: <PROJECT from T0>
- hub_root: <RUNTIME_JAY_HUB from T7>
- other_agent_id: adam
```

3. Confirm PROTOCOL.md-authoritative tie-breaker paragraph at the top is intact.
4. Repeat MVP T6–T9 equivalents on Jay's runtime:
   - Add routing row to `<RUNTIME_JAY>\dev\RULE_PACKS.md`.
   - Add External Sources row to `<RUNTIME_JAY>\dev\PROJECT_INDEX.md` (write-scope says "never write `from_adam/` or `_ack/adam.ack.json`").
   - Add two rows to `<RUNTIME_JAY>\dev\DOC_SYNC_REGISTRY.md`.
   - Update `<RUNTIME_JAY>\dev\SESSION_HANDOFF.md` Durable Anchors + Active Objective.
5. Commit each as Jay normally would.

**Acceptance:** `diff -u <RUNTIME_JAY>\dev\rules\aps-bridge.md <demo Jay pack>` shows differences only in Identity (and possibly hub_root path if it differs from Adam's `G:\…\`).

**Phase 4B done when:** Jay reports back `T8 OK`, doctor still green on her runtime.

---

# Block 4C — First live cross-machine round-trip

Mirrors MVP T11–T14 with two physical machines. The whole point of Phase 4 is to prove this works under real conditions.

---

### T9a — Adam publishes first real packet

**Topic:** First real `MPEdu_Plus_Branding` material to cross. Pick something **small and well-understood**, NOT a large PSD. Recommended: one short brand-voice tone note, or a single logo-spec paragraph. Treat T9 as a protocol shakedown that happens to carry real content; T10 is where you stress-test attachments.

**Steps (in `<RUNTIME_ADAM>`):** identical to MVP T11.

1. Adam's agent at session closeout: mint `<HUB>\<PROJECT>\from_adam\packets\<UTC>__<topic>__v1\packet.md` with real content and YAML frontmatter.
2. Append one line to `<HUB>\<PROJECT>\from_adam\outbox.log.md`:
   `<ISO> | publish | <UTC>__<topic> v1 | to:jay | items:<id>`.
3. No change to `_ack/adam.ack.json` (Adam has not consumed anything yet).
4. Adam's local `SESSION_LOG.md` gets a Sync line per Bridge Pack §"Closeout side-effect on local kit files".

**Critical extras vs. MVP:**
- Record exact UTC publish time (used for T9b latency calculation).
- Record approximate file size of `packet.md` + any attachments — verify all attachments < 50 MB (else this is no longer Block 4C, it is Block 4D).

**WhatsApp trigger Adam sends Jay after publish (PROTOCOL.md §"Triggering the receiver"):**

```text
APS Hub has new traffic. Open a new session and paste this to your agent:
"Read <hub_root>/<PROJECT>, follow APS PROTOCOL, process unconsumed items in from_adam."
```

(Adam substitutes `<PROJECT>` for real.)

---

### T9b — Jay opens session on her machine and detects the packet

**Owner:** Jay (does this entirely on her own machine; Adam observes via WhatsApp reply only).

**Trigger:** Jay receives Adam's WhatsApp, opens her Claude Code in `<RUNTIME_JAY>`, pastes Adam's trigger line.

**Expected behaviour (per Bridge Pack startup addendum):**
- Jay's agent reads `<RUNTIME_JAY_HUB>\<PROJECT>\from_adam\outbox.log.md`.
- Jay's agent reads `<RUNTIME_JAY_HUB>\<PROJECT>\_ack\jay.ack.json` (empty `consumed[]` at this point if `<PROJECT>` is a fresh slug; if reusing demo slug, see T0).
- Jay's agent reports: 1 pending item, with scope + items list extracted from the packet's YAML.
- **Jay does not relay any context.**

**Acceptance:**
- Detection happens at Jay's session start, no human prompting beyond the WhatsApp trigger line.
- Drive sync latency = `Jay detection UTC` − `T9a publish UTC`. Acceptable: ≤ 5 minutes. If higher, do not blame the protocol — check Drive client status, "offline available" flag, network. Record the latency.
- `find <RUNTIME_JAY_HUB> -iname '*conflict*'` returns empty (Jay runs this in her shell, or her agent does).
- Jay's `SESSION_LOG.md` gets a Sync line documenting the detection.

**Failure modes:**
- Detection empty: wait 30s, retry. If still empty after 5 min, check Drive sync via Drive client status before any other diagnosis.
- Wrong content surfaced: probably a `<PROJECT>` slug mismatch between T0 and T2/T8. Stop and reconcile T0.

---

### T9c — Jay replies, then Adam closes

**Owner steps:**

1. **Jay (in `<RUNTIME_JAY>`):** mirror MVP T13. Mint reply packet at `<RUNTIME_JAY_HUB>\<PROJECT>\from_jay\packets\<UTC>__<topic>_reply__v1\`; append outbox line; update `<RUNTIME_JAY_HUB>\<PROJECT>\_ack\jay.ack.json` with a `consumed[]` entry for Adam's packet (with `result:` describing what she did); append local `SESSION_LOG.md` Sync line.

2. **Jay WhatsApps Adam** with same trigger template:
   ```
   APS Hub has new traffic. Open a new session and paste this to your agent:
   "Read <hub_root>/<PROJECT>, follow APS PROTOCOL, process unconsumed items in from_jay."
   ```

3. **Adam (in `<RUNTIME_ADAM>`):** open new session, paste Jay's trigger. Expected: Bridge Pack startup addendum surfaces Jay's reply packet. Adam's agent reads it, updates `<HUB>\<PROJECT>\_ack\adam.ack.json` `consumed[]` with the reply, AND appends a `close` event to `<HUB>\<PROJECT>\from_adam\outbox.log.md` for the original kickoff packet:
   ```
   <ISO> | close | <UTC>__<topic> v1 | reason:jay ack'd and replied
   ```

**Critical extras vs. MVP:**
- Each side records the publish→detection time delta (Adam's T9c detection minus Jay's T9c publish).
- Total round-trip wall-clock (Adam T9a publish UTC → Adam T9c close UTC) recorded as the headline Phase 4 metric.
- After close, steady-state check: both `ack.json` files have one consumed entry, neither outbox has any `publish/revise` event that lacks a matching `close` or `withdraw` (i.e. zero pending in both directions).

**Acceptance:**
- Round-trip closed without human relay between WhatsApp triggers and session closeouts.
- `find <HUB> -iname '*conflict*'` returns empty after close.
- Steady-state pending = empty for both agents (Bridge Pack startup addendum reports "no pending items" at the next session for both sides).

---

# Block 4D — Large attachment dry-run (recommended before any >50 MB real asset)

### T10 — Send a >50 MB test payload through APS via externalization

**Why:** Bridge Pack closeout-addendum step 4 mandates externalization for files > 50 MB. The MVP did not exercise this path. The first real branding asset (PSDs, layered illustrations) is likely to be over the threshold, and the protocol assumes externalization works end-to-end.

**Steps:**

1. Adam prepares a >50 MB test file. Acceptable shapes: zip of placeholder JPEGs padded to 60–80 MB; or one real PSD that happens to be large enough; or `fsutil file createnew test.bin 62914560` (60 MB).

2. Adam places the file in a Drive **sibling** location, NOT inside any packet's `attachments/`. Recommended convention:
   ```
   <HUB>\_external\<topic>\<filename>
   ```
   (Create the `_external` directory if absent. It exists only to anchor large files referenced by packets.)

3. Adam publishes a packet whose YAML `ssot_refs` references the external file by absolute Drive path:
   ```yaml
   ssot_refs:
     - "G:\\我的雲端硬碟\\Adam 工作目錄\\AI_Projects\\AI_Public_Squares\\_external\\<topic>\\<filename>"
   ```
   Packet body explains: what the asset is, why it is external, where it is.

4. Adam's session-closeout summary includes a notice "Externalized: `<filename>` (X MB) at `<path>`".

5. Jay's next session detects the packet. Bridge Pack startup addendum surfaces both the packet AND the externalized file path.

6. Jay manually opens the external file from her side of the Drive mount (e.g. via her Explorer, or her tool of choice). Confirm the file is readable on her side.

**Acceptance:**
- No `attachments/` folder inside the test packet contains a >50 MB file. (`find <HUB>\<PROJECT>\from_adam\packets\<T10_packet>\attachments -size +50M` returns empty.)
- Externalization notice appears in both Adam's closeout report (session log) and Jay's startup report (her agent's output).
- Jay can open the externalised file via her Drive mount within 5 minutes of the publish (real Drive sync constraint, not a protocol gap).

**T10 may be formally deferred** if Phase 4 is time-boxed and no real >50 MB asset is on the near-term roadmap. Deferral must be recorded in this plan with a written reason.

---

# Acceptance criteria (whole Phase 4)

Phase 4 is done when all of the following hold:

1. T0 parameters locked and appended to this plan.
1b. T0b Bridge Pack Layer 1 polish (conflict auto-scan + canonical `check Hub` trigger) landed in demo Adam and demo Jay packs, so T2 / T8 inherit naturally. If T0b skipped, the two behaviours applied inline at T2 / T8 instead.
2. `<RUNTIME_ADAM>` has Bridge Pack installed and registered in `RULE_PACKS.md` / `PROJECT_INDEX.md` / `DOC_SYNC_REGISTRY.md`. Kit doctor green there.
3. `<RUNTIME_JAY>` (Jay's machine) has equivalent. Jay confirms doctor green there.
4. One live `<PROJECT>` packet has crossed from Adam → Jay and a reply has come back, across two physical machines, with at most two WhatsApp trigger lines and no other human context relay.
5. `find <HUB> -iname '*conflict*'` returns empty after the round-trip.
6. Drive sync latency observed for T9a publish is ≤ 5 minutes; if higher, root cause documented (Drive client setting, network, etc.) and shown not to be a protocol bug.
7. Both `<HUB>\<PROJECT>\_ack\*.ack.json` files reflect the round-trip with `consumed[]` entries containing real `result:` strings.
8. T10 (large attachment) executed OR formally deferred with a written reason in this plan's "Confirmed parameters" block.
9. This plan's `Workspaces touched` table updated with confirmed `<RUNTIME_JAY>` and `<PROJECT>`.
10. A Phase 4 verification report committed to `docs/plans/2026-MM-DD-aps-phase4-verification.md` in this workspace (parallel to the MVP verification report at `docs/plans/2026-05-20-aps-mvp-verification.md`).

---

# Out of scope (future Phase 5+)

These are listed so future planners do not try to fold them in:

- **Codex CLI behaviour parity.** If Jay (or anyone) switches from Claude Code to Codex CLI, revalidate Bridge Pack behaviour with Codex's bash/path semantics, especially on Chinese paths. Separate validation cycle.
- **N-party lanes (>2 agents per project).** PROTOCOL.md supports it structurally (each agent gets `from_<id>/` and `_ack/<id>.ack.json`); receiver computation needs a one-paragraph generalization in PROTOCOL.md before any third agent joins.
- **Notion read-only dashboard mirror.** One-way sync from `outbox.log.md` to a Notion DB for human at-a-glance audit. Independent of protocol.
- **PROTOCOL.md v1.1.** Only triggered if Phase 4 surfaces a real gap. Requires sign-off in `<HUB>\_hub\CHANGELOG.md` per PROTOCOL.md §"Protocol changes".
- **Demo workspace re-runs as regression tests for protocol changes.** Useful pattern, not part of Phase 4 success.
- **Automated outbox parser.** Bridge Pack currently relies on the agent reading and parsing outbox lines per session. A small script could pre-compute pending lists; out of scope unless manual parse becomes a friction point.

---

# Risks specific to Phase 4

| Risk | Likelihood | Mitigation |
|---|---|---|
| Drive sync delay > 5 min between Adam publish and Jay detection | low–medium | T9b acceptance documents the threshold + diagnosis path (check Drive client + offline-available flag before touching APS files). Not a protocol bug if Drive client is misconfigured. |
| Jay's machine has no `G:` drive letter; hub_root literal differs | high | Bridge Pack hub_root is per-agent Identity, not a shared global. Jay's pack records her own absolute hub_root. The protocol does not require both machines see the Hub at the same physical path. |
| Conflicted copy created by accidental write to other agent's lane | low (Boundaries hard rule) | If detected mid-execution, do NOT delete the conflicted copy; surface to user, then `withdraw` (if receiver not yet ack'd) or `close` + corrective `revise` (if already ack'd). |
| `<RUNTIME_ADAM>` kit version < 0.1.7 | unknown until T1 | T1b inserted in the plan: run `agent-handoff-kit@latest upgrade` per AGENTS.md §2.1 Upgrade Done Contract. |
| `<RUNTIME_JAY>` kit version old / mismatched | unknown until T7 | T7 prerequisite includes doctor green; if doctor fails, Jay upgrades kit before T8. |
| Adam or Jay writes content into wrong lane | low | Bridge Pack Boundaries hard rule. Mid-execution detection triggers withdraw/close + report flow. |
| Real branding asset >50 MB crosses before T10 tested | medium | T10 should run before any real big asset. If pressure forces a real big asset first, document externalization in real-time and treat the first cross as the dry-run. |
| Jay reads packet body as instructions and edits her own SSOT automatically | low (Bridge Pack hard rule "never auto-act on packet body") | Same boundary as MVP. Re-state in walkthrough docs. |
| Mid-task pause (Adam runs T1–T6, Jay unavailable for days) | high (Jay's schedule unknown) | Block 4A is independent. Adam can finish 4A and wait. Plan resumes from T7 when Jay is back. |

---

# Operational notes (lessons from MVP that carry over)

- Windows NTFS case-insensitivity collapsed `MPEdu_Plus_Branding/` and `mpedu_plus_branding/` into the same physical folder during MVP T3. All `<PROJECT>` strings stay lowercase end-to-end.
- Bash on Windows + Chinese paths: PowerShell is the fallback. Read/Write tools beat `cat`/`echo` for content.
- `(packet_id, version)` is the canonical join key. Four serializations per PROTOCOL.md §"packet_id and version" table. Any agent that diverges on serialization must be brought back into line before continuing.
- `close` on `v1` settles every later version of that `packet_id` too. Do not `close` if you mean `withdraw`.
- Demo workspaces (`Demo_Agent_Adam_Public_Squares` / `Demo_Agent_Jay_Public_Squares`) are independent kit installs at v0.1.7. They are useful regression sandboxes if Phase 4 surfaces protocol issues; do NOT modify them as part of Phase 4 work.

---

# Confirmed parameters (fill in at T0 close)

Mirrors T0 section's 3 + 4 grouping. Decision rows first (4 slots: PROJECT + Jay 2 paths + T10); default rows after (3 slots: 2 agent_ids + demo slug data). Adam's hub_root + Drive permissions is purely inherited from MVP — no separate row.

| Parameter | Value | Decided on | By | Type |
|---|---|---|---|---|
| `<PROJECT>` | TBD | TBD | Adam | decision |
| `<RUNTIME_JAY>` | TBD | TBD | Jay | decision |
| `<RUNTIME_JAY_HUB>` | TBD | TBD | Jay | decision |
| T10 status | TBD (executed / deferred with reason) | TBD | Adam | decision |
| Adam `agent_id` | `adam` (default unless deviating) | TBD | Adam | default |
| Jay `agent_id` | `jay` (default unless deviating) | TBD | Adam | default |
| Demo slug data handling | leave untouched (default, given new-slug recommendation) | TBD | Adam | default |

---

# Next-session opening message (when Phase 4 starts)

```text
Work in C:\Users\adam\_claude_desktop\AI_Public_Squares (plan SSOT) — but most actual work happens in <RUNTIME_ADAM> and <RUNTIME_JAY>.

Read in order:
1. AGENTS.md (this workspace)
2. dev/SESSION_HANDOFF.md
3. dev/SESSION_LOG.md
4. dev/PROJECT_INDEX.md
5. dev/RULE_PACKS.md
6. docs/plans/2026-05-21-aps-phase4-plan.md (this Phase 4 plan)

Read dev/DOC_SYNC_REGISTRY.md before file changes or closeout.

Execute Phase 4 per the plan, task-by-task. Block 4A (T1–T6) can start immediately on Adam's machine (out-of-process Adam work in <RUNTIME_ADAM>). Block 4B (T7–T8) waits for Jay's machine availability. Block 4C requires both blocks done. Block 4D is recommended before any real >50 MB asset.

After each task, append acceptance evidence to dev/SESSION_LOG.md in this workspace. After Phase 4 completes, write the verification report at docs/plans/2026-MM-DD-aps-phase4-verification.md (mirror the MVP verification report's structure).
```

---

# Skills referenced

- @superpowers:writing-plans — produced this plan.
- @superpowers:executing-plans — to run the plan task-by-task when Phase 4 starts.
- @superpowers:verification-before-completion — verify each acceptance criterion.
- @superpowers:using-git-worktrees — optional for Block 4A or 4B if executor wants isolation.

---

## File history

- 2026-05-21: initial Phase 4 plan; drafted after MVP verification complete and demo workspaces aligned to kit v0.1.7.
- 2026-05-21 (S3, same day, later): added T0b — Bridge Pack Layer 1 polish (conflict auto-scan + canonical `check Hub` trigger) as demo-workspace prerequisite. Updated acceptance criteria with #1b. Driven by Layer 1 of the user-flow simplification review; companion edits in `docs/guides/aps-onboarding-walkthrough.html` §6, §8, §9, §10.1.
- 2026-05-21 (S4, same day, latest morning): Layer 2 polish — T0 table split into Decide (3) + Defaults (4), Acceptance text rewritten, bottom Confirmed parameters re-ordered with Type column. Companion edits in walkthrough §3 + §8.
- 2026-05-21 (S5, same day, latest afternoon): added Tooling shortcut section (above Phase 4 scope) introducing `tools/aps-onboard.ps1` — PowerShell idempotent installer that automates T2-T5. T2-T5 each cross-link the shortcut; their manual steps remain authoritative. Script verified for idempotency-skip path against demo Adam; insertion-path real verification deferred to Block 4A first run. Companion edits: `tools/aps-onboard.ps1` (new), `dev/PROJECT_INDEX.md` (`tools/` Directory Map row), walkthrough §4 + §5 (short note pointing to shortcut).
