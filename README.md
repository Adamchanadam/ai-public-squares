# AI Public Squares

兩個人各自喺自己部機、用 AI 工具合作整一個項目 — 但 file 黎黎去去成日撞、context 講完又要再講?

APS 係兩部機 + 兩個用戶 + 兩個 AI agent 嘅跨機協作骨架。設計目標:**一條命令裝好,之後喺對話入面用 plain 廣東話 / 英文操作**,工具自動處理 Hub 入面嘅檔案、版本、待辦、衝突避免。

```bash
npx @adamchanadam/aps init
```

> ⚠️ **而家狀態**:一行命令嘅後台仲喺起緊(2026-05-22 至今)。試行版 (`0.1.0`) 而家行緊,跑落會 print 「coming soon」 + 引你去 manual setup。完整可用 timeline 見 [funnel audit](dev/qc/2026-05-22-zero-knowledge-funnel-audit.md) 嘅 build roadmap。

---

## 點解需要呢樣嘢

兩個人(可能係朋友、同事、或者隔住一個太平洋嘅 partner)一齊整一個 brand book、寫文、做 design,各自用自己部機嘅 AI 工具。最常撞嘅問題:

- 「最新版啲檔喺邊?」
- 「我啱啱 update 咗,你要 sync 番」
- 「我嗰部 AI 唔知我哋之前傾過咩,要再從頭講」
- Drive 整咗 conflict file,唔知 keep 邊個

APS 嘅 design:**Drive 上一個 shared folder + 一套寫入規矩** = 兩部機嘅 AI 自動知道對方做緊咩,新嘢自動 surface,衝突結構性避免。冇 server、冇外加帳號、冇 push notification(故意),純粹 Drive 上嘅 file。

---

## 點開始(目標體驗,未完全 ready)

1. 喺你工作目錄(任何 folder)跑:`npx @adamchanadam/aps init`
2. 工具 ask 你幾條問題(用咩 Drive folder、項目叫咩名、partner 嘅名等)
3. 跑完之後喺 Claude Code 講 plain 廣東話 / 英文:
   - 「我有嘢俾 Jay」 → 工具出包 + 生成 partner WhatsApp 通知句
   - 「Jay 嗰邊有冇新嘢?」 → 工具撿包 + 列待辦
   - 「Drive 同步唔到」 → 工具偵測 + propose recovery

(全程 zero APS protocol knowledge required。)

---

## 而家可以睇咩(deep-dive references)

正式 setup 機制仲喺起緊。如果想理解工具背後個 protocol,以下 reference(全部係 deeper-dive,**唔需要先讀就用得到**):

- [docs/index.html](docs/index.html) — 項目介紹頁(將來會用 zero-knowledge friendly 版重寫)
- [docs/guides/aps-onboarding-walkthrough.html](docs/guides/aps-onboarding-walkthrough.html) — 完整落地 walkthrough(技術 reference)
- [docs/plans/2026-05-21-aps-phase4-plan.md](docs/plans/2026-05-21-aps-phase4-plan.md) — Phase 4 跨機落地計劃
- [docs/plans/2026-05-20-agent-public-square-design.md](docs/plans/2026-05-20-agent-public-square-design.md) — Protocol 設計理由

---

## Build status

| Phase | 內容 | Status |
|---|---|---|
| X-1 | Repo entry — README + entry page | 進行中(README ✅,entry page 待 rewrite) |
| X-2 | npm package + 一行 install 命令 | 進行中(skeleton ✅,real `init` orchestration pending) |
| X-3 | Skill 嘅 setup subflow + dialogue | 未起 |
| X-4 | Skill 嘅日常 subflow + recovery | 未起 |
| X-5 | Layer D doc re-position | 未起 |
| X-6 | Auto-update | 未起 |

詳細 phase plan 見 [funnel audit](dev/qc/2026-05-22-zero-knowledge-funnel-audit.md)。

---

## License

[Apache License 2.0](LICENSE)。私人 repo,但 license 已預設好,將來轉 public 即時生效。
