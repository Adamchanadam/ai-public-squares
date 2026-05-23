---
name: aps
description: Sets up and runs cross-machine collaboration between two AI agents working on the same project, using a shared cloud-drive folder as the exchange. Use when the user wants to set up APS (also called AI Public Squares) on a new machine, resolve the pain of two people editing the same files from two different computers, start a partner workflow with someone on another machine, post or receive an inter-agent packet, check the shared folder for new items from the other side, or troubleshoot cross-machine sync issues. Triggers on phrases like "set up APS", "set up AI Public Squares", "教我用 APS", "教我用 AI Public Squares", "裝 APS", "裝 AI Public Squares", "啟動 AI Public Squares", "跨機合作", "想同 [對方] 兩部機合作", "兩部電腦改同一份嘢成日撞", "兩個人改緊同一份文件", "partner workflow", "cross-machine collab", "two AIs collaborating", "我有嘢俾 [對方]", "post to [對方]", "check Hub", "Hub 有新嘢", "[對方] 嗰邊有冇新嘢", "Drive 同步唔到", "[對方] 話收唔到", "sync stuck", "conflict".
---

# AI Public Squares — 跨機合作 skill

> **Status — 開發中:** Sections 4 至 8(設置 / 發佈 / 收件 / 補救子流程 + cross-link)展開中,將於下一個 commit 補齊。當前版本可供 review frontmatter + voice 規矩 + 起手 routing 三層;若 skill 此刻被 invoke,須先告知用戶「此 skill 仍在建構,完整的子流程尚未上線」,然後依當前可達的 actions 行事。

## 1. 此 skill 的職責

帶用戶行完跨機合作的整個生命周期:初次設置(與對方各自接駁一個共用的雲端資料夾)、日常一來一往(交檔、收檔)、出錯時的補救。用戶多數對協定內部結構毫無概念,亦不應該需要知道。Skill 的責任是將整套協定包成「用戶答幾條問題、其餘自動」的形態。**設置子流程以 5 至 7 條問題的對話完成,過程中由 skill 自動偵測先決條件(雲端硬碟桌面版、Claude Code 在線狀態、Agent Handoff Kit init 狀態),自動執行所有檔案操作,自動處理跨方 starter pack 的 packaging — 用戶不需要打開任何技術文檔。**

## 2. 對用戶輸出的 voice 規矩(嚴格遵守)

- 一律當代繁體書面語。
- 不堆砌技術詞與內部編號(「Phase X」「Layer C」「Stage 4」這類),亦不夾雜中英「半通不通」的片段語。
- 敍事與解釋並行:每一句獨立讀都自足、用戶讀完即知意義,而非要靠前後句拼湊或要打開另一份文件參考。
- 句可短,氣須足。用戶非技術背景,但是成年人,有自己的節奏與判斷力。
- 粵語 colloquial 字詞(「嘅」「嗰」「咗」「唔」「呢個」等)僅可出現於 verbatim 引述用戶原話的觸發短語(例如「Hub 有新嘢」「check Hub」),其他位置一律書面語。

## 3. 起手 routing

Skill 觸發之初,先判斷用戶 intent 屬以下哪一類,再進入對應子流程。**字面短語只是樣本;字面命中或語意命中,任一即足以 route 至該子流程。**

- **初次設置**:用戶語句出現「set up APS」「set up AI Public Squares」「教我用 APS」「教我用 AI Public Squares」「裝 APS」「裝 AI Public Squares」「啟動 AI Public Squares」「跨機合作」「想同 X 兩部機合作」「partner workflow」「cross-machine collab」「two AIs collaborating」「兩部電腦改同一份嘢成日撞」「兩個人改緊同一份文件」等,或語意指向「初次設置一個跨機合作機制」的同類語句 → 進入「設置子流程」(第 4 節)。
- **發佈**:用戶語句出現「我有嘢俾 X」「post to X」「交份嘢」「publish」「我做完份嘢,要俾 [對方]」等,或語意指向「將自己已完成的工作交給對方」的同類語句 → 進入「發佈子流程」(第 5 節)。
- **收件**:用戶語句出現「check Hub」「Hub 有新嘢」「X 嗰邊有冇新嘢」「check inbox」「未消化」「[對方] 整咗咩」等,或語意指向「查看對方有甚麼新東西交過來」的同類語句 → 進入「收件子流程」(第 6 節)。
- **出錯 / 補救**:用戶語句出現「Drive 同步唔到」「X 話收唔到」「sync stuck」「conflict」「出錯」「Claude Code 唔識個 skill」「Agent Handoff Kit 未 init」「對方未 share」等,或語意指向「跨機合作流程中的某環節出錯需要補救」的同類語句 → 進入「補救子流程」(第 7 節)。

意圖不明時(語句模糊或無明顯觸發短語),先以一句中性問題確認:「你是想由零開始裝 APS,還是已經裝過、現在想處理日常的發佈、收件這類動作?」再分流。**不要憑半個短語直接跳入子流程。**

## 4. 設置子流程

(展開中 — 待下一個 commit 補齊。當前若被 route 至此節,告知用戶子流程尚未上線,並引導至 `docs/guides/aps-onboarding-walkthrough.html` 作 manual fallback。)

## 5. 發佈子流程

(展開中 — 同上。)

## 6. 收件子流程

(展開中 — 同上。)

## 7. 補救子流程 + 6 件不可自動做的事

(展開中 — 待下一個 commit 補齊。但「不可自動做的事」此節展開之前亦須堅守 6 件邊界:WhatsApp 觸發短訊由用戶手動發、對方電腦的 onboarding 不在當前 session 範圍、雲端硬碟同步延遲由用戶等、packet 內容由用戶 review 後寫入、sensitive payload 路由由用戶決定、PROTOCOL.md 升級 sign-off 須用戶 review CHANGELOG。Skill 任何時候都不可代用戶執行以上 6 件。)

## 8. Cross-link

- `dev/qc/2026-05-22-zero-knowledge-funnel-audit.md` — funnel audit + Layer 設計理據
- `docs/guides/aps-onboarding-walkthrough.html` — 詳細設置教學(維護者 / 深入參考層)
- `docs/plans/2026-05-20-agent-public-square-design.md` — 協定設計文件
- Hub 上的 `_hub/PROTOCOL.md` — 協定 v1.0 契約
