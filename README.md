# AI Public Squares

兩個人各自喺自己部機、用 AI 工具合作整一個項目 — 但 file 黎黎去去成日撞、context 講完又要再講?

呢個 repo 係一個跨機協作 protocol 嘅 template,目標係將「兩部機 + 兩個用戶 + 兩個 AI agent」嘅合作做得乾淨、可追溯、唔需要每次重新解釋上文下理。

---

## 而家狀態:正喺重整入面 ⚙️

本 repo 啱啱(2026-05-22)由「對 APS 有認知背景嘅用戶」入手嘅 onboarding 模式,重整做「零認知背景用戶都用得到」嘅入口。

呢份 README、入口頁同 setup 流程仲喺 design 階段。如果你 stumble 到上嚟,而家最完整嘅入口係:

- [`docs/index.html`](docs/index.html) — 項目介紹頁(目標讀者:對 APS 有基本認識嘅 user;將來會用 zero-knowledge friendly 版重寫)
- [`docs/guides/aps-onboarding-walkthrough.html`](docs/guides/aps-onboarding-walkthrough.html) — 完整落地 walkthrough(技術 reference;非首讀文件)
- [`docs/plans/2026-05-21-aps-phase4-plan.md`](docs/plans/2026-05-21-aps-phase4-plan.md) — Phase 4 cross-machine 落地計劃(技術 spec)

正喺寫:`dev/qc/2026-05-22-zero-knowledge-funnel-audit.md` — funnel 入口層 → install / bootstrap 層 → skill orchestration 層 → protocol spec 層 嘅完整 build roadmap。寫完之後本 README 同入口頁會跟住重新整。

---

## License

[Apache License 2.0](LICENSE)。私人 repo,但 license 已預設好,將來轉 public 即時生效。
