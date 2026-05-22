# AI Public Squares

兩個人,各自喺自己部機,用 AI 一齊整一份品牌指引、寫一份報告、做一個設計。

最常撞嘅問題:

- 「最新版啲檔喺邊?」
- 「我嗰部 AI 唔記得我哋傾過咩,要再講過一次」
- Google Drive 出咗衝突副本,唔知 keep 邊個
- 每次來回都要 WhatsApp 講一次、再喺新對話從頭交代上下文

呢個工具想做嘅:**一條命令裝好,之後喺對話入面用日常廣東話 / 英文操作就得**。背後嘅檔案、版本、待辦、衝突避免,工具自己孭。

```
npx @adamchanadam/aps init
```

> **而家狀態**:呢條命令嘅後台仲喺起緊。試行版跑落會出一段「未起好」嘅訊息,引你去設置教學手動裝。完整可以用之前,本頁同設置教學會逐步補返。

---

## 用之前要裝啲咩

呢個工具有兩件先決事要做。

### 第一件 — 裝 Agent Handoff Kit(治理基礎)

呢個 repo 同 Agent Handoff Kit 互相配合。Agent Handoff Kit 提供基本嘅交接、紀錄、健康檢查;APS 喺呢個基礎上加跨機協作嘅功能。

**冇先裝 Agent Handoff Kit,APS 嘅檔案結構自己孭唔住。**

去 https://adamchanadam.github.io/agent-handoff-kit 跟佢嘅指引裝。一條命令:

```
npx @adamchanadam/agent-handoff-kit init
```

### 第二件 — 基本前提

- 部機要裝咗 Google Drive 桌面版(去 https://www.google.com/drive/download/ 裝),簽入之後個共享資料夾要設「離線存取」
- 部機要裝咗 Claude Code(去 https://claude.com/code 裝)
- 同你嘅 partner 要可以 WhatsApp 通到

唔識上面任何一條?各個官方網頁都有逐步指引。先裝好,再返嚟跑下面條命令。

---

## 點開始

裝完上面三樣嘢之後:

1. 喺你想做呢個項目嘅資料夾入面跑:`npx @adamchanadam/aps init`
2. 工具會問你幾條問題:用咩 Google Drive 資料夾做共享、項目叫咩名、partner 嘅 ID 等
3. 跑完之後,喺 Claude Code 對話入面講日常廣東話 / 英文:
   - 「我有嘢俾 Jay」 → 工具自動將你嘢入包,生成一句 WhatsApp 通知句畀你發
   - 「Jay 嗰邊有冇新嘢?」 → 工具自動由共享資料夾撿包,列待辦畀你睇
   - 「Google Drive 同步唔到」 → 工具偵測 + 提出修返嘅方法

全程唔需要先讀任何技術文檔。

---

## 點解需要呢樣嘢

兩個人 — 可能係朋友、同事,或者隔住一個太平洋嘅 partner — 一齊整嘅工作(品牌指引、廣告文案、設計系統、報告)通常嘅痛點:

- **搬檔嘅功夫** — 每次更新都要 WhatsApp 講一次,Google Drive 個資料夾一邊整一邊覆
- **解釋上下文嘅功夫** — partner 開新 AI 對話,要再交代過一次「上次傾到邊」
- **同步衝突** — 兩邊同時 save,Google Drive 出個「(conflict)」副本,唔知邊個係最新
- **每次來回都重做** — partner 回包又要倒返,搬檔、解釋、再講一次

呢個工具嘅諗法:**Google Drive 上一個共享資料夾,加一套寫入規矩 = 兩部機嘅 AI 自動知道對方做緊咩**;新嘢自動彈出畀你睇到;衝突由結構性避免。冇 server,冇外加雲端帳號,冇自動彈通知(故意 — 用戶決定幾時被打斷,唔係 AI 主動 ping)。

---

## 想睇深入啲

下面幾份文係技術參考,**唔需要先讀就用得到**。想深入了解設計理由 / 自己手做某一步 / 出咗錯想查,先入嚟睇。

- [入口頁(docs/index.html)](docs/index.html) — 由零認知講起嘅項目簡介
- [設置教學](docs/guides/aps-onboarding-walkthrough.html) — 完整落地步驟(由前置到日常用)
- [跨機接駁實作計劃](docs/plans/2026-05-21-aps-phase4-plan.md) — 跨機跑通嘅技術步驟
- [協定點解咁設計](docs/plans/2026-05-20-agent-public-square-design.md) — 5 個設計取捨嘅理由
- [內部嘅檢討文件](dev/qc/2026-05-22-zero-knowledge-funnel-audit.md) — 「呢個 repo 要畀零認知讀者都用得到」 嘅檢討 + 修返嘅路線

---

## License + 反饋

[Apache License 2.0](LICENSE)。私人 repo 但 license 已預設,將來如轉 public 即時生效。

撞到 bug / 想試用 / 有 feature 想要?去 [GitHub issues](https://github.com/Adamchanadam/ai-public-squares/issues) 留低。
