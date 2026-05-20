# Agent Public Square — MVP Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a runnable MVP of the Agent Public Square (APS) cross-machine handoff protocol, end-to-end, using two local demo agent workspaces and a Google-Drive-synced Hub Root, validated by a full round-trip exchange.

**Architecture:** Markdown + tiny JSON files on a Google-Drive-mirrored folder. Single-writer lanes per agent. Immutable versioned packets. Append-only ledger. Bridge Pack rule files wire the Hub check into each agent's `agent-handoff-kit` startup and closeout. No code execution, no API, no MCP — Claude Code reads/writes local paths directly.

**Tech stack:** Markdown, YAML frontmatter, JSON. Google Drive for Desktop (mirror/offline mode). agent-handoff-kit conventions (rule packs, `RULE_PACKS.md`, `PROJECT_INDEX.md`, `DOC_SYNC_REGISTRY.md`).

**Reference SSOT:** `docs/plans/2026-05-20-agent-public-square-design.md` (this workspace). All section references below cite that design.

---

## Workspaces touched by this plan

| Role | Absolute path | Git? |
|---|---|---|
| Design / plan SSOT (this workspace) | `C:\Users\adam\_claude_desktop\AI_Public_Squares` | yes (already init'd, branch `main`) |
| Demo Agent Adam | `C:\Users\adam\_claude_desktop\Demo_Agent_Adam_Public_Squares` | will `git init` in Task 4 |
| Demo Agent Jay | `C:\Users\adam\_claude_desktop\Demo_Agent_Jay_Public_Squares` | will `git init` in Task 10 |
| Hub Root (Drive) | `G:\我的雲端硬碟\Adam 工作目錄\AI_Projects\AI_Public_Squares\` | no (runtime data store, not source) |

**Notation in tasks:** `<HUB>` = `G:\我的雲端硬碟\Adam 工作目錄\AI_Projects\AI_Public_Squares`. `<DEMO_ADAM>` and `<DEMO_JAY>` similarly.

**MVP scope:** Phase 1 (Hub structure) + Phase 2 (Bridge Pack in both demos) + Phase 3 (round-trip verification). Phase 4 (real runtime adoption) is deferred to a future plan once MVP is proven.

**Generic parameters for MVP:** `agents` = (`adam`, `jay`); `project_slug` = `mpedu_plus_branding`. These are the only values hardcoded; the protocol itself is generic.

---

# Phase 1 — Hub Root structure on Google Drive

Goal: a clean, generic Hub on Drive with the contract, templates, and an initial empty lane skeleton, ready for any agent pair to use.

---

### Task 1: Write the Hub PROTOCOL contract

**Why:** PROTOCOL.md is the runtime contract every agent reads when joining the Hub. It must be self-contained, terse, and survive without the full design doc. Per design §15.1.

**Files:**
- Create: `<HUB>\_hub\PROTOCOL.md`

**Step 1: Write the PROTOCOL.md content**

```markdown
# Agent Public Square — Runtime Protocol

Version: 1.0 (2026-05-20)
Full rationale: see design doc `2026-05-20-agent-public-square-design.md` in the APS repo.

## One-line definition

APS is a neutral exchange zone on a Google-Drive-synced folder. It carries packets between agents; it does not own truth and does not write into any agent's SSOT.

## Hub layout

```text
<hub_root>/
  _hub/
    PROTOCOL.md          # this file
    templates/           # packet / ledger / ack templates
  <project_slug>/
    from_<agent_a>/      # only agent_a writes
      outbox.log.md
      packets/<UTC>__<topic>__v<N>/
        packet.md
        attachments/
    from_<agent_b>/      # only agent_b writes
    _ack/
      <agent_a>.ack.json # only agent_a writes
      <agent_b>.ack.json # only agent_b writes
```

## Three iron rules

1. **Single-writer lane.** `from_<X>/` and `_ack/<X>.ack.json` are written only by agent X. Reading is free. No file has two writers.
2. **Immutable packet.** Once a packet folder is published, its contents are never edited. Revisions are new `__v<N+1>` folders with `supersedes` pointing to the prior version.
3. **No SSOT contamination.** A packet contains snapshots, not live links. `ssot_refs` are pointers into the sender's repo, included so the receiver can locate context if needed — never to be auto-pulled.

## packet.md required YAML frontmatter

```yaml
---
packet_id: <UTC-yyyymmddThhmmssZ>__<short_snake_topic>
version: <int >= 1>
from: <agent_id>
to: <agent_id>
project: <project_slug>
level: L1-fyi | L2-handoff | L3-urgent
supersedes: null | <packet_id>__v<N>
created_at: <ISO-8601 UTC>
ssot_refs: [ <string>, ... ]
scope: <single-line description of what this packet is and is not>
items:
  - id: <stable_id>
    status: pending | in_progress | done | needs_clarification | fyi_align
    owner: <agent_id>
    title: <short string>
---
```

Body is freeform natural language. Attachments live under `attachments/`.

## outbox.log.md format

Append-only. One event per line. Never edit existing lines.

```text
<ISO-8601-UTC> | <verb> | <packet_id> v<N> | k:v | k:v
```

Verbs: `publish` | `revise` | `close` | `withdraw`. `close` carries `reason:`. `withdraw` is rare and carries `reason:` and is only valid if the receiver has not yet ack'd consumption.

## ack.json schema

```json
{
  "agent": "<agent_id>",
  "project": "<project_slug>",
  "consumed": [
    { "packet_id": "...", "version": 1, "at": "<ISO-8601 UTC>", "result": "<one line>" }
  ],
  "open_questions": [
    { "ref": "<id or section>", "need": "<one line>" }
  ]
}
```

## Receiver computation (startup)

Pending for me = (all `publish` and `revise` events in `from_<other>/outbox.log.md` whose latest version is not yet `close`d) ⊖ (entries in my own `_ack/<me>.ack.json` whose `packet_id` and `version` match).

## Sender duties (closeout, only if producing)

1. Mint a new immutable `packets/<UTC>__<topic>__v<N>/` folder. Never overwrite.
2. Append one line to your `from_<me>/outbox.log.md`.
3. Update your own `_ack/<me>.ack.json` if this packet consumes any of the receiver's prior packets.

## Sensitive data

Packets must not contain credentials, API keys, unredacted personal data, or unpublished financials. If any of these need to cross, do not use APS; use a secure out-of-band channel and reference it abstractly in the packet body.

## Triggering the receiver

Human sends one fixed line on their preferred channel (WhatsApp, etc.):

```text
APS Hub has new traffic. Open a new session and paste this to your agent:
"Read <hub_root>/<project_slug>, follow APS PROTOCOL, process unconsumed items in from_<sender>."
```

## Protocol changes

Any change to this PROTOCOL.md is logged in `_hub/CHANGELOG.md` and requires both agent owners' written sign-off in that changelog.
```

**Step 2: Verify the file landed**

Run from bash:
```bash
ls -la "/g/我的雲端硬碟/Adam 工作目錄/AI_Projects/AI_Public_Squares/_hub/"
wc -l "/g/我的雲端硬碟/Adam 工作目錄/AI_Projects/AI_Public_Squares/_hub/PROTOCOL.md"
```

Expected: `PROTOCOL.md` exists, line count > 60.

**Step 3: Commit (in this workspace, plan SSOT)**

This file lives on Drive (not in this git repo). No commit here. Track in Task 13 final summary.

---

### Task 2: Create Hub templates

**Why:** Templates make packet/ledger/ack creation reliable across agents. They live under `_hub/templates/` and are copied (not symlinked) at the start of each project.

**Files:**
- Create: `<HUB>\_hub\templates\packet.md.template`
- Create: `<HUB>\_hub\templates\outbox.log.md.template`
- Create: `<HUB>\_hub\templates\ack.json.template`

**Step 1: Write `packet.md.template`**

```markdown
---
packet_id: REPLACE_WITH_UTC_yyyymmddThhmmssZ__short_snake_topic
version: 1
from: REPLACE_WITH_SENDER_AGENT_ID
to: REPLACE_WITH_RECEIVER_AGENT_ID
project: REPLACE_WITH_PROJECT_SLUG
level: L2-handoff
supersedes: null
created_at: REPLACE_WITH_ISO8601_UTC
ssot_refs:
  - "REPLACE: repo-relative path or anchor; remove this template line if none"
scope: "REPLACE: one-line description of what this packet covers and what it does not"
items:
  - id: REPLACE_ID
    status: pending
    owner: REPLACE_WITH_RECEIVER_AGENT_ID
    title: "REPLACE_WITH_TITLE"
---

# REPLACE_WITH_TOPIC_HEADING

<!--
  Body is natural language. Reference items by their id when needed.
  Attachments go under ./attachments/ relative to this packet folder.
  After publish, this file is frozen. Revisions = a new __v2 folder with supersedes set.
-->
```

**Step 2: Write `outbox.log.md.template`**

```markdown
# Outbox Ledger

Append-only. One event per line. Never edit existing lines.

Format:
`<ISO-8601-UTC> | <verb> | <packet_id> v<N> | <key>:<value> | <key>:<value>`

Verbs: publish | revise | close | withdraw

<!-- sample lines below (delete before publish) -->
<!-- 2026-05-20T10:30:00Z | publish | 20260520T103000Z__sample_topic v1 | to:other_agent | items:A1,A2 -->
<!-- 2026-05-20T16:00:00Z | close   | 20260520T103000Z__sample_topic v1 | reason:receiver ack'd -->
```

**Step 3: Write `ack.json.template`**

```json
{
  "agent": "REPLACE_WITH_AGENT_ID",
  "project": "REPLACE_WITH_PROJECT_SLUG",
  "consumed": [],
  "open_questions": []
}
```

**Step 4: Verify**

```bash
ls "/g/我的雲端硬碟/Adam 工作目錄/AI_Projects/AI_Public_Squares/_hub/templates/"
```

Expected: three files listed.

---

### Task 3: Create the `mpedu_plus_branding` lane skeleton on Hub

**Why:** A real project lane to test against. Empty but structurally correct.

**Files:**
- Create: `<HUB>\mpedu_plus_branding\from_adam\outbox.log.md` (copy of template, ledger header only)
- Create: `<HUB>\mpedu_plus_branding\from_adam\packets\.gitkeep` — actually skip `.gitkeep` since this is Drive, not git. Create the empty `packets\` directory with a small `README.md` instead.
- Create: `<HUB>\mpedu_plus_branding\from_jay\outbox.log.md`
- Create: `<HUB>\mpedu_plus_branding\from_jay\packets\README.md`
- Create: `<HUB>\mpedu_plus_branding\_ack\adam.ack.json` (filled with adam + project)
- Create: `<HUB>\mpedu_plus_branding\_ack\jay.ack.json` (filled with jay + project)

**Step 1: Create `from_adam/outbox.log.md`**

Content: copy `_hub/templates/outbox.log.md.template` verbatim. Sample lines stay as comments.

**Step 2: Create `from_adam/packets/README.md`**

```markdown
# from_adam packets

This directory holds immutable packet folders authored by agent `adam`.
Each packet folder is named `<UTC-yyyymmddThhmmssZ>__<short_snake_topic>__v<N>/`.
After publish, packets are never edited. Revisions add a new __v<N+1>/ folder.

See `<hub_root>/_hub/PROTOCOL.md`.
```

**Step 3: Create `from_jay/outbox.log.md` and `from_jay/packets/README.md`**

Identical structure to `from_adam/`, swap `adam` → `jay` in the README.

**Step 4: Create `_ack/adam.ack.json`**

```json
{
  "agent": "adam",
  "project": "mpedu_plus_branding",
  "consumed": [],
  "open_questions": []
}
```

**Step 5: Create `_ack/jay.ack.json`**

```json
{
  "agent": "jay",
  "project": "mpedu_plus_branding",
  "consumed": [],
  "open_questions": []
}
```

**Step 6: Verify whole Phase 1 structure**

```bash
find "/g/我的雲端硬碟/Adam 工作目錄/AI_Projects/AI_Public_Squares" -type f -not -name "desktop.ini" -not -name "*.txt" -not -path "*/to_Agent_Jay/*"
```

Expected (order may differ):
```
.../AI_Public_Squares/_hub/PROTOCOL.md
.../AI_Public_Squares/_hub/templates/packet.md.template
.../AI_Public_Squares/_hub/templates/outbox.log.md.template
.../AI_Public_Squares/_hub/templates/ack.json.template
.../AI_Public_Squares/mpedu_plus_branding/from_adam/outbox.log.md
.../AI_Public_Squares/mpedu_plus_branding/from_adam/packets/README.md
.../AI_Public_Squares/mpedu_plus_branding/from_jay/outbox.log.md
.../AI_Public_Squares/mpedu_plus_branding/from_jay/packets/README.md
.../AI_Public_Squares/mpedu_plus_branding/_ack/adam.ack.json
.../AI_Public_Squares/mpedu_plus_branding/_ack/jay.ack.json
```

The pre-existing `to_Agent_Jay/` folder is left untouched (Adam's prior manual workflow archive).

---

# Phase 2 — Bridge Pack into both demo agents

Goal: each demo agent's `agent-handoff-kit` knows how to check the Hub at startup and how to publish at closeout, without modifying kit core.

---

### Task 4: Initialize git in Demo Agent Adam workspace

**Why:** Track Bridge Pack changes from a clean baseline.

**Step 1: Init**

```bash
cd "/c/Users/adam/_claude_desktop/Demo_Agent_Adam_Public_Squares" && git init -b main
```

**Step 2: Baseline commit**

```bash
git add AGENTS.md CLAUDE.md GEMINI.md dev/
git status --short
```

Expected: no untracked, all staged.

```bash
git commit -m "$(cat <<'EOF'
chore: import agent-handoff-kit baseline for demo

Initial state of the Demo Agent Adam workspace before APS Bridge Pack
is layered on. All governance state files are template defaults.
EOF
)"
```

**Step 3: Verify**

```bash
git log --oneline
```

Expected: 1 commit.

---

### Task 5: Write the Bridge Pack for Demo Agent Adam

**Why:** This is the rule pack the agent loads when APS-related work appears. Defines startup-read and closeout-publish steps.

**Files:**
- Create: `<DEMO_ADAM>\dev\rules\aps-bridge.md`

**Step 1: Write `aps-bridge.md`**

```markdown
# APS Bridge Pack

Source-of-truth contract: `<hub_root>/_hub/PROTOCOL.md` (Drive).
Architectural rationale: see APS design doc in `AI_Public_Squares` repo,
`docs/plans/2026-05-20-agent-public-square-design.md`.

## Identity (fill once per agent, per project)

- agent_id: `adam`
- project_slug: `mpedu_plus_branding`
- hub_root: `G:\我的雲端硬碟\Adam 工作目錄\AI_Projects\AI_Public_Squares`

## When this pack is loaded

Trigger phrases (any one): "APS Hub", "讀 AI_Public_Squares", "process unconsumed",
"未消化", "Hub 有新嘢", "跟 APS 協定".

Also auto-engage as the last step of standard startup read order — see "Startup
addendum" below.

## Startup addendum (cheap inbox check)

After the kit's normal startup reads finish, before reporting the startup card:

1. Read `<hub_root>/<project_slug>/from_<other>/outbox.log.md`. If file does
   not exist, report "APS Hub: no lane yet" and stop.
2. Read `<hub_root>/<project_slug>/_ack/<agent_id>.ack.json`.
3. For each non-comment line in the other agent's outbox, parse: timestamp,
   verb, packet_id, version, key:value pairs. Track latest version per packet_id
   and whether a `close` event exists for it.
4. Pending = packets where (a) latest event is publish or revise, AND (b) no
   `close` event, AND (c) (packet_id, latest_version) not present in my
   `ack.consumed`.
5. Report:
   - If empty: one line "APS Hub: no pending items for <agent_id>".
   - If non-empty: a bullet list of `packet_id v<N>` with the packet's `scope`
     and item count read from the packet's `packet.md` YAML. Ask the user
     whether to open each packet now or defer.

This step reads at most two small files when there is no pending work.

## Closeout addendum (publish if producing)

If this session produced material that needs to cross to the other agent:

1. Choose a `packet_id` of form `<UTC-yyyymmddThhmmssZ>__<short_snake_topic>`.
   Topic is lower_snake, max 40 chars, no Chinese punctuation in slug.
2. Create folder `<hub_root>/<project_slug>/from_<agent_id>/packets/<packet_id>__v1/`.
3. Inside, create `packet.md` from the template at `<hub_root>/_hub/templates/`
   with all REPLACE_ tokens filled. Items list is required (use `items: []`
   if pure FYI).
4. If attachments are needed, place them under `./attachments/` inside the
   packet folder. No file > 50MB (use external Drive path and reference
   abstractly if larger).
5. Append exactly one line to `<hub_root>/<project_slug>/from_<agent_id>/outbox.log.md`.
6. If this packet consumes any prior packet from the other agent, update
   `<hub_root>/<project_slug>/_ack/<agent_id>.ack.json` accordingly.
7. Update local `dev/DOC_SYNC_REGISTRY.md` row "APS packet publish" with
   confirmed status and the packet_id.

## Boundaries (hard rules)

- NEVER write to `from_<other>/...`. NEVER write to `_ack/<other>.ack.json`.
- NEVER edit any file inside a published packet folder. Mistakes are corrected
  by publishing a new `__v<N+1>` packet with `supersedes` set.
- NEVER edit existing lines in `outbox.log.md`. Append only.
- NEVER copy the other agent's SSOT files into your own SSOT. Reference by
  packet_id, do not absorb.
- If an unknown file appears in your own lane that you did not author this
  session, STOP, report it to the user, do not auto-clean.

## Sensitive data

Per PROTOCOL.md: no credentials, no API keys, no unredacted personal data,
no unpublished financials. If any of these need to cross, use a secure
out-of-band channel and reference it abstractly.

## Closeout side-effect on local kit files

When publishing a packet at closeout, also record in `dev/SESSION_LOG.md`
the packet_id under "Sync" so future sessions can audit cross-machine traffic.
```

**Step 2: Verify length and structure**

```bash
wc -l "/c/Users/adam/_claude_desktop/Demo_Agent_Adam_Public_Squares/dev/rules/aps-bridge.md"
grep -c "^## " "/c/Users/adam/_claude_desktop/Demo_Agent_Adam_Public_Squares/dev/rules/aps-bridge.md"
```

Expected: line count > 50; section header count >= 6.

**Step 3: Commit**

```bash
cd "/c/Users/adam/_claude_desktop/Demo_Agent_Adam_Public_Squares" && git add dev/rules/aps-bridge.md && git commit -m "$(cat <<'EOF'
feat(aps): add APS Bridge Pack rule file

Defines startup inbox check and closeout publish duties for this agent
in the Agent Public Square protocol. References Hub PROTOCOL.md on Drive
as the runtime contract.
EOF
)"
```

---

### Task 6: Wire Bridge Pack into Adam's `RULE_PACKS.md` router

**Files:**
- Modify: `<DEMO_ADAM>\dev\RULE_PACKS.md`

**Step 1: Read current state**

The router is a markdown table. Add one row.

**Step 2: Edit**

Add a row to the routing table:

```markdown
| Cross-machine handoff, APS, packet, lane, ack, Hub, 共享 inbox | `dev/rules/aps-bridge.md` | check Hub inbox at startup, publish packet at closeout |
```

Insert as the last row of the existing table (before the "## Routing Rule" section).

**Step 3: Verify**

```bash
grep -n "aps-bridge.md" "/c/Users/adam/_claude_desktop/Demo_Agent_Adam_Public_Squares/dev/RULE_PACKS.md"
```

Expected: one match in the routing table.

**Step 4: Commit**

```bash
cd "/c/Users/adam/_claude_desktop/Demo_Agent_Adam_Public_Squares" && git add dev/RULE_PACKS.md && git commit -m "$(cat <<'EOF'
feat(aps): register APS Bridge Pack in RULE_PACKS router
EOF
)"
```

---

### Task 7: Add APS Hub as External Source in Adam's `PROJECT_INDEX.md`

**Files:**
- Modify: `<DEMO_ADAM>\dev\PROJECT_INDEX.md`

**Step 1: Find the External Sources table**

It's the table under `## External Sources`. Currently has one TBD row.

**Step 2: Replace the TBD row with**

```markdown
| APS Hub | shared exchange zone with other agent | every session startup; closeout if producing | `G:\我的雲端硬碟\Adam 工作目錄\AI_Projects\AI_Public_Squares\` (Google Drive, offline-available) | single-writer per lane; never write `from_jay/` or `_ack/jay.ack.json` | 2026-05-20 |
```

**Step 3: Update the Maintenance Rule section** if needed — no change required; APS Hub falls under "external services" naturally.

**Step 4: Verify**

```bash
grep -n "APS Hub" "/c/Users/adam/_claude_desktop/Demo_Agent_Adam_Public_Squares/dev/PROJECT_INDEX.md"
```

Expected: one match.

**Step 5: Commit**

```bash
cd "/c/Users/adam/_claude_desktop/Demo_Agent_Adam_Public_Squares" && git add dev/PROJECT_INDEX.md && git commit -m "$(cat <<'EOF'
docs(aps): register APS Hub as external source in PROJECT_INDEX
EOF
)"
```

---

### Task 8: Add APS sync rows to Adam's `DOC_SYNC_REGISTRY.md`

**Files:**
- Modify: `<DEMO_ADAM>\dev\DOC_SYNC_REGISTRY.md`

**Step 1: Add two rows to the registry table**

After the existing "Release" row, before "## Registry Rule":

```markdown
| APS packet publish | `<hub_root>/<project_slug>/from_<me>/packets/...`, `from_<me>/outbox.log.md`, local `SESSION_LOG.md` Sync line | packet folder exists, outbox.log has matching line, ack.json updated if consuming |
| APS packet consume | local `_ack/<me>.ack.json`, local `SESSION_LOG.md` Sync line | ack.consumed contains (packet_id, version); result string set |
```

**Step 2: Verify**

```bash
grep -n "APS packet" "/c/Users/adam/_claude_desktop/Demo_Agent_Adam_Public_Squares/dev/DOC_SYNC_REGISTRY.md"
```

Expected: two matches.

**Step 3: Commit**

```bash
cd "/c/Users/adam/_claude_desktop/Demo_Agent_Adam_Public_Squares" && git add dev/DOC_SYNC_REGISTRY.md && git commit -m "$(cat <<'EOF'
docs(aps): add APS publish/consume rows to DOC_SYNC_REGISTRY
EOF
)"
```

---

### Task 9: Update Adam's `SESSION_HANDOFF.md` Active Objective

**Why:** So a fresh session opening this demo dir sees that APS Bridge is in scope.

**Files:**
- Modify: `<DEMO_ADAM>\dev\SESSION_HANDOFF.md`

**Step 1: Set fields**

Change Last Updated to `2026-05-20`. Under `## Durable Anchors`:
- Project root and boundary: `C:\Users\adam\_claude_desktop\Demo_Agent_Adam_Public_Squares` (demo workspace; not a real product)
- Product/system identity: `Demo Agent Adam — APS protocol MVP testbed`
- Governance model: `agent-handoff-kit baseline + APS Bridge Pack (dev/rules/aps-bridge.md)`
- Source-of-truth ownership: `local kit owns governance; APS Hub owns cross-agent exchange`
- Release / publish boundary: `none (testbed)`

Under `## Active Objective`:
```
APS MVP round-trip with Demo Agent Jay via Hub at G:\...\AI_Public_Squares\mpedu_plus_branding\.
Acts as the "Adam" lane in protocol terms. Outbound packets go to from_adam/.
```

Other TBD fields can stay TBD for now; they'll get reconciled at first real closeout.

**Step 2: Verify**

```bash
grep -n "APS" "/c/Users/adam/_claude_desktop/Demo_Agent_Adam_Public_Squares/dev/SESSION_HANDOFF.md"
```

Expected: multiple matches in Durable Anchors and Active Objective.

**Step 3: Commit**

```bash
cd "/c/Users/adam/_claude_desktop/Demo_Agent_Adam_Public_Squares" && git add dev/SESSION_HANDOFF.md && git commit -m "$(cat <<'EOF'
docs(aps): set Durable Anchors and Active Objective for APS MVP testbed
EOF
)"
```

---

### Task 10: Mirror Tasks 4–9 for Demo Agent Jay

**Files:**
- Same six file changes in `<DEMO_JAY>\` instead of `<DEMO_ADAM>\`.

**Differences from Adam's setup:**

- agent_id is `jay`, not `adam`.
- In `aps-bridge.md`, swap `adam` → `jay` everywhere in the Identity section. The "boundaries" section becomes "never write `from_adam/` or `_ack/adam.ack.json`".
- In `PROJECT_INDEX.md` External Sources, write-rule row becomes "never write `from_adam/` or `_ack/adam.ack.json`".
- In `SESSION_HANDOFF.md` Active Objective, "Acts as the 'Jay' lane in protocol terms. Outbound packets go to from_jay/."

**Step 1–6:** Repeat Tasks 4 through 9 with the substitutions above, in the Jay workspace.

**Step 7: Verify both demos parallel**

```bash
diff -u "/c/Users/adam/_claude_desktop/Demo_Agent_Adam_Public_Squares/dev/rules/aps-bridge.md" "/c/Users/adam/_claude_desktop/Demo_Agent_Jay_Public_Squares/dev/rules/aps-bridge.md" | head -40
```

Expected: differences only in the Identity section (`adam` ↔ `jay` swap) and Boundaries section.

---

# Phase 3 — Round-trip verification

Goal: prove the protocol carries a real exchange end-to-end with no human searching, no Drive conflicted copies, no SSOT contamination.

I (Claude) will simulate both agents — switching workspace per task — using only what's authored in Phase 1/2. The user observes.

---

### Task 11: Adam publishes Packet #1

**Why:** First real packet from Adam to Jay. Topic chosen for low risk: a small "kickoff hello" so failures are easy to diagnose before testing with real branding material.

**Files:**
- Create: `<HUB>\mpedu_plus_branding\from_adam\packets\<UTC>__aps_kickoff__v1\packet.md`
- Append-only: `<HUB>\mpedu_plus_branding\from_adam\outbox.log.md`
- Maybe update: `<HUB>\mpedu_plus_branding\_ack\adam.ack.json` (no consumption yet → no change)
- Modify: `<DEMO_ADAM>\dev\SESSION_LOG.md` (append Sync line with packet_id)

**Step 1: Generate UTC timestamp**

```bash
date -u +"%Y%m%dT%H%M%SZ"
```

Use the returned value as `<UTC>`.

**Step 2: Create the packet folder and packet.md**

`packet.md` content (fill `<UTC>` and `created_at`):

```markdown
---
packet_id: <UTC>__aps_kickoff
version: 1
from: adam
to: jay
project: mpedu_plus_branding
level: L1-fyi
supersedes: null
created_at: <ISO-8601 UTC>
ssot_refs: []
scope: "First APS round-trip test packet. No real branding content; protocol shakedown only."
items:
  - id: kickoff_ack
    status: pending
    owner: jay
    title: "Acknowledge APS Bridge round-trip by publishing a v1 reply packet to from_jay/"
---

# APS Kickoff — round-trip shakedown

This is the first packet across APS. Purpose: verify that the receiving agent
(Jay) detects this packet at session startup, reads scope and items without
human prompting, and produces a reply packet completing the loop.

No branding content here. If anything in the protocol breaks, surface the
exact symptom before any retry.
```

**Step 3: Append to `from_adam/outbox.log.md`**

One line (replace `<UTC>` and `<ISO>` with actual values):

```text
<ISO> | publish | <UTC>__aps_kickoff v1 | to:jay | items:kickoff_ack
```

**Step 4: Append a Sync line to `<DEMO_ADAM>\dev\SESSION_LOG.md`**

Add the current date's session entry stub if missing, with a Sync line:

```markdown
## 2026-05-20 — APS MVP round-trip Task 11

- Sync: APS packet publish <UTC>__aps_kickoff v1 → from_adam/. Status: confirmed.
```

**Step 5: Verify all four artefacts exist and are consistent**

```bash
ls "/g/我的雲端硬碟/Adam 工作目錄/AI_Projects/AI_Public_Squares/mpedu_plus_branding/from_adam/packets/"
tail -1 "/g/我的雲端硬碟/Adam 工作目錄/AI_Projects/AI_Public_Squares/mpedu_plus_branding/from_adam/outbox.log.md"
```

Expected: one packet folder; one new line in outbox log mentioning `aps_kickoff v1`.

**Step 6: Commit (in Demo Adam)**

```bash
cd "/c/Users/adam/_claude_desktop/Demo_Agent_Adam_Public_Squares" && git add dev/SESSION_LOG.md && git commit -m "$(cat <<'EOF'
log(aps): publish aps_kickoff v1 to from_adam lane (round-trip Task 11)
EOF
)"
```

(Hub files are not git-tracked; only the SESSION_LOG entry records the act.)

---

### Task 12: Jay detects pending packet at startup

**Why:** Validate the cheap startup check from the Bridge Pack actually surfaces the new packet without human prompting.

**Workspace:** Switch to Demo Agent Jay.

**Step 1: Run the Bridge Pack startup procedure**

Read in order:
1. `<HUB>\mpedu_plus_branding\from_adam\outbox.log.md` — find non-comment lines, parse latest version per packet_id.
2. `<HUB>\mpedu_plus_branding\_ack\jay.ack.json` — read consumed list (currently empty).
3. Compute pending: `{ <UTC>__aps_kickoff v1 }`.
4. Open that packet's `packet.md`, read YAML, surface `scope` and `items`.

**Step 2: Report to user (in Demo Jay session output)**

```text
APS Hub: 1 pending item for jay.
  - <UTC>__aps_kickoff v1 (from adam, L1-fyi)
    scope: First APS round-trip test packet. No real branding content; protocol shakedown only.
    items:
      - kickoff_ack [pending, owner: jay]: Acknowledge APS Bridge round-trip by publishing a v1 reply packet to from_jay/
```

**Step 3: Verify no conflicted copy was created**

```bash
find "/g/我的雲端硬碟/Adam 工作目錄/AI_Projects/AI_Public_Squares" -iname "*conflict*" -o -iname "*conflicted*"
```

Expected: no output.

**Step 4: Note in Demo Jay's `dev/SESSION_LOG.md`**

```markdown
## 2026-05-20 — APS MVP round-trip Task 12

- Sync: APS detected pending packet <UTC>__aps_kickoff v1 at startup. No conflicted copy. Proceeding to reply (Task 13).
```

**Step 5: Commit (in Demo Jay)**

```bash
cd "/c/Users/adam/_claude_desktop/Demo_Agent_Jay_Public_Squares" && git add dev/SESSION_LOG.md && git commit -m "$(cat <<'EOF'
log(aps): detect aps_kickoff v1 inbound at startup (round-trip Task 12)
EOF
)"
```

---

### Task 13: Jay publishes reply Packet and ACKs Adam's packet

**Files:**
- Create: `<HUB>\mpedu_plus_branding\from_jay\packets\<UTC>__aps_kickoff_reply__v1\packet.md`
- Append-only: `<HUB>\mpedu_plus_branding\from_jay\outbox.log.md`
- Modify: `<HUB>\mpedu_plus_branding\_ack\jay.ack.json` (add consumed entry)
- Modify: `<DEMO_JAY>\dev\SESSION_LOG.md`

**Step 1: Generate UTC timestamp** (new value, > Task 11's timestamp).

**Step 2: Create the reply packet.md**

```markdown
---
packet_id: <UTC_REPLY>__aps_kickoff_reply
version: 1
from: jay
to: adam
project: mpedu_plus_branding
level: L1-fyi
supersedes: null
created_at: <ISO-8601 UTC>
ssot_refs: []
scope: "Reply to <UTC_KICKOFF>__aps_kickoff v1. Confirms round-trip works."
items:
  - id: roundtrip_done
    status: done
    owner: adam
    title: "APS round-trip is functional; both lanes carry packets without conflicted copies."
---

# APS Kickoff Reply

Received Adam's aps_kickoff v1 at session startup, parsed scope and items
without human relay. No conflicted copies on Drive. Round-trip complete.
```

**Step 3: Append to `from_jay/outbox.log.md`**

```text
<ISO_REPLY> | publish | <UTC_REPLY>__aps_kickoff_reply v1 | to:adam | items:roundtrip_done
```

**Step 4: Update `_ack/jay.ack.json`**

```json
{
  "agent": "jay",
  "project": "mpedu_plus_branding",
  "consumed": [
    {
      "packet_id": "<UTC_KICKOFF>__aps_kickoff",
      "version": 1,
      "at": "<ISO_REPLY>",
      "result": "Detected at startup; published reply <UTC_REPLY>__aps_kickoff_reply v1."
    }
  ],
  "open_questions": []
}
```

**Step 5: Append Sync line to Demo Jay `dev/SESSION_LOG.md`**

```markdown
- Sync: APS packet publish <UTC_REPLY>__aps_kickoff_reply v1 → from_jay/. ack.json updated.
```

**Step 6: Verify**

```bash
ls "/g/我的雲端硬碟/Adam 工作目錄/AI_Projects/AI_Public_Squares/mpedu_plus_branding/from_jay/packets/"
tail -1 "/g/我的雲端硬碟/Adam 工作目錄/AI_Projects/AI_Public_Squares/mpedu_plus_branding/from_jay/outbox.log.md"
cat "/g/我的雲端硬碟/Adam 工作目錄/AI_Projects/AI_Public_Squares/mpedu_plus_branding/_ack/jay.ack.json"
```

Expected: reply packet folder, new outbox line, ack.json with one consumed entry.

**Step 7: Commit (in Demo Jay)**

```bash
cd "/c/Users/adam/_claude_desktop/Demo_Agent_Jay_Public_Squares" && git add dev/SESSION_LOG.md && git commit -m "$(cat <<'EOF'
log(aps): publish aps_kickoff_reply v1 + ack adam's kickoff v1 (round-trip Task 13)
EOF
)"
```

---

### Task 14: Adam detects Jay's reply at next startup

**Workspace:** Switch back to Demo Agent Adam.

**Step 1: Re-run Bridge Pack startup procedure**

1. Read `<HUB>\mpedu_plus_branding\from_jay\outbox.log.md`.
2. Read `<HUB>\mpedu_plus_branding\_ack\adam.ack.json` (still empty consumed).
3. Pending = `{ <UTC_REPLY>__aps_kickoff_reply v1 }`.
4. Open the packet, surface scope and items.

**Step 2: Report**

```text
APS Hub: 1 pending item for adam.
  - <UTC_REPLY>__aps_kickoff_reply v1 (from jay, L1-fyi)
    scope: Reply to <UTC_KICKOFF>__aps_kickoff v1. Confirms round-trip works.
    items:
      - roundtrip_done [done, owner: adam]: APS round-trip is functional; both lanes carry packets without conflicted copies.
```

**Step 3: Adam consumes the reply (close the loop)**

- Update `<HUB>\mpedu_plus_branding\_ack\adam.ack.json` adding a `consumed` entry for `<UTC_REPLY>__aps_kickoff_reply v1`.
- Append a `close` event to Adam's OWN `from_adam/outbox.log.md` for the original `aps_kickoff v1` (verb: `close`, reason: "jay ack'd"). This signals to any future reader that the conversation thread is settled.

```text
<ISO_CLOSE> | close | <UTC_KICKOFF>__aps_kickoff v1 | reason:jay ack'd and replied
```

**Step 4: Verify no conflicted copies anywhere on Hub**

```bash
find "/g/我的雲端硬碟/Adam 工作目錄/AI_Projects/AI_Public_Squares" \( -iname "*conflict*" -o -iname "*conflicted*" \)
```

Expected: empty.

**Step 5: Append final Sync line to Demo Adam `dev/SESSION_LOG.md`**

```markdown
## 2026-05-20 — APS MVP round-trip Task 14 — round-trip closed

- Sync: APS consumed <UTC_REPLY>__aps_kickoff_reply v1 (Jay→Adam). Closed <UTC_KICKOFF>__aps_kickoff v1 in own ledger. ack.json updated.
- Result: round-trip complete. Both lanes carried packets in both directions. No conflicted copies. No human searching or upload steps required mid-protocol.
```

**Step 6: Commit (in Demo Adam)**

```bash
cd "/c/Users/adam/_claude_desktop/Demo_Agent_Adam_Public_Squares" && git add dev/SESSION_LOG.md && git commit -m "$(cat <<'EOF'
log(aps): consume jay's reply v1, close aps_kickoff v1 (round-trip Task 14)

Round-trip MVP complete:
- adam → from_adam/aps_kickoff v1 → drive sync
- jay startup auto-detect, parse, publish from_jay/aps_kickoff_reply v1 + ack
- adam startup auto-detect, parse, consume + close ledger entry
- no conflicted copies on hub, no human relay during protocol
EOF
)"
```

---

### Task 15: Write the MVP verification report

**Files:**
- Create: `C:\Users\adam\_claude_desktop\AI_Public_Squares\docs\plans\2026-05-20-aps-mvp-verification.md` (this workspace)

**Step 1: Content**

```markdown
# APS MVP — Verification Report

Date: 2026-05-20
Plan executed: `2026-05-20-aps-mvp-implementation.md`

## Tasks completed

(Tabulate Task 1 through Task 14 with status and commit hash where applicable.)

## Verification checklist (run by hand)

- [ ] Both lanes carry a v1 packet (`from_adam/aps_kickoff`, `from_jay/aps_kickoff_reply`).
- [ ] Both outbox.log.md files have exactly one `publish` line each, plus a `close` line in Adam's for the round-trip.
- [ ] `_ack/adam.ack.json` has 1 consumed entry; `_ack/jay.ack.json` has 1 consumed entry.
- [ ] `find` for `*conflict*` returns empty.
- [ ] Neither demo workspace's SSOT got contaminated by the other agent's packet content. (Grep each demo's `dev/` and `ssot/` if it exists.)
- [ ] Two startup detections (Task 12 and Task 14) surfaced pending items without human prompting.

## Findings

- (Fill in: what worked, what surprised.)

## Open questions for next plan (Phase 4: real runtime adoption)

- (Fill in: Codex CLI behavior, large attachment policy, N-party expansion, Notion read-only dashboard, etc.)
```

**Step 2: Commit (in this workspace)**

```bash
cd "/c/Users/adam/_claude_desktop/AI_Public_Squares" && git add docs/plans/2026-05-20-aps-mvp-verification.md && git commit -m "$(cat <<'EOF'
docs(aps): MVP verification report for round-trip test
EOF
)"
```

---

# Acceptance criteria (whole plan)

The plan is considered done when ALL of the following hold:

1. Hub Root on Drive has: PROTOCOL.md, 3 templates, `mpedu_plus_branding/` skeleton with both lanes and both ack files.
2. Both demo workspaces have: `aps-bridge.md` rule pack, RULE_PACKS row, PROJECT_INDEX External Source row, DOC_SYNC_REGISTRY two rows, SESSION_HANDOFF Durable Anchors filled.
3. One full round-trip executed: Adam publish → Jay detect at startup → Jay reply → Adam detect at startup → Adam close.
4. Both `ack.json` files have exactly one consumed entry referencing the other's packet.
5. `find` for `*conflict*` on Hub returns empty.
6. Neither demo workspace's SSOT directory absorbed the other agent's packet content (no copy-paste, only `ssot_refs` strings).
7. Verification report committed to `AI_Public_Squares` workspace.

## Out of scope (deferred)

- Phase 4: integrating Bridge Pack into the real `MPEdu_Plus_Branding` runtime (separate plan after MVP proves out).
- Codex CLI behavior parity (separate validation cycle).
- N-party lanes (>2 agents per project).
- Notion read-only dashboard mirror.
- Automated `outbox.log.md` parser (current MVP relies on the agent reading and parsing by hand each session).

## Risks specific to executing this plan

| Risk | Mitigation |
|---|---|
| Drive sync delay between Adam-publish and Jay-detect | If Task 12 sees empty, wait 30s and retry. If still empty, check Drive client status before any other diagnosis. |
| Bash on Windows tripping on Chinese path chars | Use forward-slash paths (`/g/我的雲端硬碟/...`) with quotes. Prefer Read/Write tools over `cat`/`echo` for content. |
| Author writes content into wrong lane | Bridge Pack `Boundaries` section is the guardrail. If detected mid-execution, do not delete; publish a `withdraw` event with reason. |
| Plan executed partially then resumed in new session | Each task's commit log is the resumption marker; new session reads commit history first. |
| Hub PROTOCOL.md not yet in place when Tasks 5/10 are written | Tasks are ordered: Phase 1 must finish before Phase 2 references PROTOCOL.md. |

---

## Skills referenced

- @superpowers:executing-plans — run this plan task-by-task with review checkpoints.
- @superpowers:verification-before-completion — verify each acceptance criterion before marking the plan done.
- @superpowers:using-git-worktrees — optional, if executor wants isolation from `main` while running Phase 2 changes. Note: only this workspace is git-controlled; the two demo workspaces and the Hub on Drive are separate and won't be in any worktree this workspace creates.
