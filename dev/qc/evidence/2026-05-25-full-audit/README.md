# 2026-05-25 Full Audit Evidence

This folder contains local evidence generated for the AI Public Squares full audit.

## HTML Preview

Generated with Microsoft Edge headless outside the sandbox after sandboxed Edge failed on Windows permission restrictions.

- `docs_index.png`
- `docs_guides_index.png`
- `docs_guides_aps-onboarding-walkthrough.png`
- `docs_qc_governance-map.png`

## Round-trip Regression

Temporary project-local Hub fixture:

- `roundtrip-hub/_hub/PROTOCOL.md`
- `roundtrip-hub/_hub/templates/packet.md`
- `roundtrip-hub/aps_full_audit_probe/from_adam/outbox.log.md`
- `roundtrip-hub/aps_full_audit_probe/from_jay/outbox.log.md`
- `roundtrip-hub/aps_full_audit_probe/_ack/adam.ack.json`
- `roundtrip-hub/aps_full_audit_probe/_ack/jay.ack.json`
- `roundtrip-hub/aps_full_audit_probe/from_adam/packets/20260525T201200Z__full_audit_probe__v1/packet.md`
- `roundtrip-hub/aps_full_audit_probe/from_jay/packets/20260525T201400Z__full_audit_probe_reply__v1/packet.md`

Regression path:

1. Adam published `20260525T201200Z__full_audit_probe v1`.
2. Jay consumed it and recorded it in `jay.ack.json`.
3. Jay published `20260525T201400Z__full_audit_probe_reply v1`.
4. Adam consumed the reply and recorded it in `adam.ack.json`.
5. Adam closed the original packet.

## Startup Trace

`startup-trace-check.cjs` implements the Bridge Pack pending calculation against the temporary fixture Hub.

Expected result:

```json
[
  {
    "agent": "adam",
    "other": "jay",
    "pending": []
  },
  {
    "agent": "jay",
    "other": "adam",
    "pending": []
  }
]
```

## npm Publish Probe

Release follow-up on 2026-05-26:

- `@adamchanadam/aps@0.1.0` was published first, but one-off `npx @adamchanadam/aps@0.1.0 ...` was not a reliable verified path in this Windows / npm 10 environment.
- `@adamchanadam/aps@0.1.1` was published as the corrected public version.
- `npm view @adamchanadam/aps version dist-tags.latest bin dist.fileCount --json` returned `latest = 0.1.1`, `bin.aps = bin/aps.js`, `dist.fileCount = 8`.
- A temporary install probe verified that after `npm install @adamchanadam/aps@0.1.1`, `node_modules/.bin/aps.cmd --help` and `node_modules/.bin/aps.cmd bridge-pack --role B` work.

Generated npm cache folders, install probes, and tarballs are ignored by `dev/qc/evidence/.gitignore`; this README records the durable result.
