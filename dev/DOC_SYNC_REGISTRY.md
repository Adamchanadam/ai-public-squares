# Doc Sync Registry

Purpose: map change types to documents and checks. Keep this as rows, not long prose.

## Status Vocabulary

Use: `confirmed`, `unverified`, `pending`, `blocked`, `not_applicable`.

| Change type | Also check/update | Verification |
|---|---|---|
| New file or directory | `dev/PROJECT_INDEX.md` Directory Map | path listed |
| Stack or command change | `dev/PROJECT_INDEX.md` Stack / Entry Points | command verified or marked unverified |
| Public behavior change | README, public docs, changelog | docs mention current behavior |
| API or SDK behavior change | API docs, examples, tests | tests or documented reason |
| Runbook change | runbook path in `PROJECT_INDEX.md` | procedure still executable |
| Governance rule change | relevant pack/core, registry, README if public-facing | complexity budget checked |
| Closeout/startup contract change | `AGENTS.md`, `dev/SESSION_HANDOFF.md`, `dev/SESSION_LOG.md`, `dev/PROJECT_INDEX.md`, README quick usage | opening message schema + workspace identity present |
| Workspace identity change | `dev/SESSION_HANDOFF.md`, `dev/PROJECT_INDEX.md` | root/branch/commit/status recorded or marked unverified |
| Release | release notes, README version, changelog | release pack checklist |
| APS protocol / plan / verification change | `docs/plans/2026-05-20-*.md`, `docs/index.html` (status badge / Phase 4 status line), `G:\我的雲端硬碟\Adam 工作目錄\AI_Projects\AI_Public_Squares\_hub\PROTOCOL.md` + `_hub\CHANGELOG.md`, both demo workspaces' `dev/rules/aps-bridge.md` | doctor green; cross-doc consistency check across the four APS docs; PROTOCOL.md CHANGELOG sign-off; template version-anchor comments still match PROTOCOL version |
| APS round-trip session (live packet, ack, or close on the Drive Hub) | local `dev/SESSION_LOG.md` Sync field with `APS publish/consume/close: <packet_id> v<N>` line; `ack.json` in the agent's own lane | grep `^- \*\*Sync:\*\* APS` in SESSION_LOG returns ≥ 1 new line; `_ack/<me>.ack.json` `consumed[]` reflects any inbound packet acted on |
| APS user-facing docs change (`docs/index.html`, `docs/guides/**.html`) | the affected HTML files in `docs/` plus `dev/PROJECT_INDEX.md` Fact Base rows for any added/removed page; the inline `.site-nav` block must stay in sync across all HTML pages under `docs/` | manual link audit (index ↔ guides hub ↔ each walkthrough), site-nav `<a>` set identical across pages, Fact Base row exists for each guide HTML file |

## Registry Rule

If a change has no matching row, add a row before closeout or record why no durable sync rule is needed. At closeout, record sync status for every row touched by the session.
