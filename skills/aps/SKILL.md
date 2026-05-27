---
name: aps
description: Sets up and runs cross-machine collaboration between two AI agents working on the same project, using a shared cloud-drive folder as the exchange. Use when the user wants to set up APS (also called AI Public Squares) on a new machine, resolve the pain of two people editing the same files from two different computers, start a partner workflow with someone on another machine, post or receive an inter-agent packet, check the shared folder for new items from the other side, or troubleshoot cross-machine sync issues. Triggers on phrases like "set up APS", "set up AI Public Squares", "教我用 APS", "教我用 AI Public Squares", "裝 APS", "裝 AI Public Squares", "啟動 AI Public Squares", "跨機合作", "想同 [對方] 兩部機合作", "兩部電腦改同一份嘢成日撞", "兩個人改緊同一份文件", "partner workflow", "cross-machine collab", "two AIs collaborating", "我有嘢俾 [對方]", "post to [對方]", "check Hub", "Hub 有新嘢", "[對方] 嗰邊有冇新嘢", "Drive 同步唔到", "[對方] 話收唔到", "sync stuck", "conflict".
---

# AI Public Squares — 跨機合作 skill

> **狀態(2026-05-26):** npm package `@adamchanadam/aps` v0.2.0 pre-release 提供 `bridge-pack`、`init` 技能安裝、初始 Hub skeleton、Bridge Pack 與 starter pack。已發佈版本有最小 `publish` / `inbox` / `consume` / `close` 指令,並通過本地一次性 Hub 往返測試與一次 Adam ↔ Jay 真實 Google Drive 跨機往返驗證。本 repo 本地 v0.2.1 候選版已再加入 `revise`、`withdraw` 與只讀 `doctor`;未發佈前不得對外聲稱 npm latest 已有這三條新命令。技能內自然語言日常操作與補救流程仍為前期測試。此檔是可隨 npm package 發出的 skill runtime 規格草稿。設置對話 wording 的精簡隨包版本見 `references/setup-dialogue.md`;repo 內長版維護稿見 `docs/plans/2026-05-23-aps-skill-dialogue-script.md`。

## 1. 此 skill 的職責

帶用戶行完整個跨機合作生命周期:初次設置、日常交接、收取對方回覆、出錯補救。用戶多數對協定內部結構沒有預備知識,亦不應需要知道。Skill 的目標是將整套協定包成「用戶回答少量問題,AI 代理處理其餘步驟」的形態。**目前此檔是 runtime 規格草稿,不是已通過真實用戶流程測試的能力清單;已由 CLI 驗證的範圍包括本地一次性 Hub 的發佈、修訂、收件、消化、撤回、收結與只讀診斷。技能內自然語言操作、starter pack 對方落地、補救動作與真實跨機 Drive 同步,實作前仍須以當前 CLI 與 bundled files 重新驗證。**

## 2. 對用戶輸出的 voice 規矩(嚴格遵守)

- 一律使用當代繁體書面語。
- 不堆砌技術詞與內部編號,亦不夾雜中英「半通不通」的片段語。
- 敍事與解釋並行:每一句獨立讀都自足,用戶讀完即知意義,而非要靠前後句拼湊或要打開另一份文件參考。
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

觸發來源:第 3 節「初次設置」路由命中。先讀 bundled reference `references/setup-dialogue.md`,再按下列順序執行。若此 skill 是從 npm package 安裝,不要依賴 repo 內 `docs/plans/` 檔案,因為它們不在 npm tarball 內。

1. **打招呼 + 意圖確認**:問三件事 — 雲端硬碟是否已裝、是否已與對方溝通過、用哪一個雲端硬碟。若第二件未完成,提供短訊 sample 給用戶傳給對方,等用戶溝通完之後再繼續。
2. **先決條件 interactive 檢查**:
   - Claude Code:skill 被觸發即代表已在線,毋須額外 check。
   - Agent Handoff Kit:用 Read tool 檢查 `AGENTS.md` 是否存在 + 開頭是否屬 kit-managed core。分支 [A] 已 init → 繼續;分支 [B] 未 init → 提供安裝命令,等用戶完成之後再繼續。
   - 雲端硬碟:skill 無法直接 detect Drive 桌面版狀態,透過用戶口頭確認 + 第 5 步寫入時的 io error 偵測雙重保險。
3. **三項決定**:逐項問,接著記入內部狀態(對方 agent_id / 項目代號 / 第一個交接包發起方)。
4. **預設值確認**:列預設值,等用戶回「OK」或指明想改哪一件 + 改成甚麼。
5. **執行檔案操作**— 進度逐步回報,每步用短句標記:
   - 用 Write tool 在用戶雲端硬碟 root 建立 `<slug>/_hub/`、`<slug>/from_<own-agent-id>/`、`<slug>/from_<other-agent-id>/`、`<slug>/_ack/` 4 個資料夾(Write 自動建 parent dir)。
   - 複製 PROTOCOL.md v1.0 到 `<slug>/_hub/PROTOCOL.md`。本地下一版 npm tarball 已包含 `resources/protocol/PROTOCOL.md` 與 `resources/protocol/templates/`;若執行環境找不到該 source,不得假裝此資源已存在。
   - Write Bridge Pack 到用戶項目 `dev/rules/aps-bridge.md`(source:`examples/demo-agent-<a|b>/dev/rules/aps-bridge.md`,依用戶角色 A 或 B 揀)。
   - Edit `AGENTS.md` 加 APS routing 行(具體格式詳見 PROTOCOL.md)。
   - Edit `dev/SESSION_HANDOFF.md` 的 Durable Anchors 加 APS 接駁 entry(寫入 slug + Hub root path + 對方 agent_id + 第一個 packet 發起方)。
6. **對方 starter pack**:
   - 生成 starter pack 內容(install 指引 + 已決定的 slug / agent_id / Hub root path + Bridge Pack 副本):Write 到 `<slug>/_hub/starter-pack-<對方 agent_id>.md`。此處只要求 markdown starter pack,不要求 zip。
   - 生成 WhatsApp 短訊文本,輸出到 chat 顯示給用戶 copy(skill 不直接寫入 clipboard — OS clipboard API 非 Claude Code 標準 tool;改為明確 surface「以下短訊請 copy 傳給對方」+ blockquote 包圍)。
7. **首次 dry-run**:
   - 用當前 CLI 生成一個最小測試交接包,而不是手寫舊式單檔 packet。
   - 指令形態:
     ```text
     npx aps publish --hub-root "<hub_root>" --project <project_slug> --from <own_agent_id> --to <other_agent_id> --topic setup_test --body "APS setup test from <own_agent_id>."
     ```
   - 指令成功後,記下輸出的 `<packet_id>` 與 v1。提醒用戶把通知短訊傳給對方,等對方用 `check Hub` 或同類語句收件。

設置完成之後,skill 不主動跟進 — 等用戶下次觸發其他子流程。

## 5. 發佈子流程

觸發來源:第 3 節「發佈」路由命中。底層 CLI 已有最小 `publish` 指令,可寫入 v1 packet folder 並追加 outbox。**此節是技能自然語言包裝規格:可以調用已驗證 CLI;0.2.0 已完成一次 Adam ↔ Jay 真實 Google Drive 往返,但每個新項目仍要各自驗證 Hub 路徑、離線存取與同步狀態。**

1. **讀取接駁設定**:從本項目既有交接紀錄、Bridge Pack 或用戶回答取得 `hub_root`、`project_slug`、`own_agent_id`、`other_agent_id`。缺任一項時,只問缺的項目;不要要求用戶重新讀整份教學。
2. **接收內容 + topic**:
   - 問用戶要交給對方的內容。可以是直接貼上的文字,或是一個要先讀取的檔案。
   - 問一個短 topic,並轉為 lower_snake_case。若用戶給中文題目,先提出轉換建議,例如「品牌指引第二稿」→ `brand_guide_v2`,等用戶確認。
   - 目前 CLI 只支援文字 body。若用戶要交檔案,先 Read 檔案內容並告知會把文字摘要或全文放入 body;附件型交付留待後續版本。
3. **敏感資料檢查**:寫入前掃描 body 是否含 credentials / API key / unredacted PII。若可疑,停手,說明原因,請用戶改用安全管道或提供已遮蔽版本。
4. **確認寫入**:用一句話列出即將寫入的四件事:Hub root、project、from→to、topic。取得用戶同意後才執行 CLI。
5. **執行 CLI**:
   ```text
   npx aps publish --hub-root "<hub_root>" --project <project_slug> --from <own_agent_id> --to <other_agent_id> --topic <topic> --body "<body>"
   ```
   成功輸出會包含 `Published <packet_id> v1` 與 packet folder 路徑。把兩者回報給用戶。
6. **生成通知短訊**:輸出給用戶手動傳給對方。短訊只說有新交接包、topic、請對方打開自己的 AI 工具並說「check Hub」。skill 不代發 WhatsApp,不操作 clipboard。
7. **提示下一步**:告訴用戶稍後可說「check Hub」查看對方回覆或確認是否已消化。

失敗處理:
- 若 CLI 回報 `outbox not found`,代表 Hub 尚未以 `aps init --hub-root ...` 建好或 project slug / agent id 錯。不要自行建立散落檔案;回到設置子流程補齊。
- 若 topic 格式錯誤,向用戶提供一個 lower_snake_case 建議後重試。
- 若 Drive 路徑不存在或無權寫入,列出實際路徑與錯誤,請用戶先修正 Drive 掛載 / 權限。

## 6. 收件子流程

觸發來源:第 3 節「收件」路由命中。底層 CLI 已有最小 `inbox` 與 `consume` 指令,可計算對方 outbox 的待處理項並寫入自己的 ack。**此節是技能自然語言包裝規格:可以調用已驗證 CLI;0.2.0 已完成一次 Adam ↔ Jay 真實 Google Drive 往返,但每個新項目仍要各自驗證 Hub 路徑、離線存取與同步狀態。**

1. **讀取接駁設定**:同發佈子流程,取得 `hub_root`、`project_slug`、`own_agent_id`、`other_agent_id`。
2. **執行待辦檢查**:
   ```text
   npx aps inbox --hub-root "<hub_root>" --project <project_slug> --agent-id <own_agent_id> --other-agent-id <other_agent_id>
   ```
3. **呈現結果**:
   - 若 CLI 顯示 `no pending items`,用一句話告訴用戶目前沒有新交接包。
   - 若 CLI 顯示 pending item,逐項列出 `packet_id`、version、scope、items。不要只貼原始終端輸出;要轉成用戶可讀摘要。
4. **讓用戶決定是否消化**:
   - **讀取並消化**:先 Read 對應 `packet.md` 全文,顯示重點與原文位置;用戶確認後才寫入 ack。
   - **稍後再讀**:不寫 ack。告訴用戶下次再說「check Hub」仍會看到它。
   - **請對方撤回或修正**:不寫 ack。生成一段通知短訊,請原發包一方用 `npx aps revise ...` 或 `npx aps withdraw ...` 處理;若目前使用的是 npm 0.2.0 而這兩條命令不存在,請原發包一方另發新包,不要手寫 outbox。
5. **寫入消化記錄**:
   ```text
   npx aps consume --hub-root "<hub_root>" --project <project_slug> --agent-id <own_agent_id> --packet-id <packet_id> --version <version> --result "<one-line result>"
   ```
   `result` 必須是具體一句話,例如 `Read kickoff and preparing reply`;不要只寫 `done`。
6. **如要回覆**:用戶若要回包,轉入發佈子流程,topic 可用 `<原 topic>_reply`。
7. **如要收結自己之前的包**:只有在用戶是原發包者,且對方已回覆或明確完成後,才進入收結動作:
   ```text
   npx aps close --hub-root "<hub_root>" --project <project_slug> --agent-id <own_agent_id> --packet-id <packet_id> --reason "<reason>"
   ```
   `close` 只可關閉自己 outbox 內的 packet;CLI 會拒絕不存在或已關閉的 packet。向用戶說明 close 代表「這條交接線已完成,之後啟動時不再列為待辦」。

失敗處理:
- 若 `inbox` 失敗,先檢查 Hub root、project slug、agent id 是否與設置紀錄一致。
- 若 `consume` 回報 ack file 不存在,不要手寫 JSON;回到設置子流程補建 Hub skeleton。
- 若 `close` 回報 packet 不在自己的 outbox,不要代用戶關閉對方 packet;請用戶確認 packet id 或改由原發包一方操作。

## 7. 補救子流程 + 6 件不可自動做的事

觸發來源:第 3 節「出錯 / 補救」路由命中。此子流程優先使用只讀 `npx aps doctor ...` 診斷 Hub skeleton、ack、outbox 與衝突檔名;不自動刪除、移動、重命名或覆寫任何檔案。任何結構性檔案操作,均須先列出目標路徑、影響範圍與可回復方式,再取得用戶明確確認。

### 7.1 起手 triage

問用戶 5 種 failure mode 屬哪一類。若用戶語句已暗示某類(例如「sync 唔到」 → Mode 1),skill 跳過 triage 直接進入該 mode。

### 7.2 5 種 failure mode 之對應行動

| Mode | 偵測 | 行動 | dialogue ref |
|---|---|---|---|
| 1. 同步問題 | 先跑 `npx aps doctor ...` 與 `inbox`;若對方仍未見,請用戶查看 Drive 桌面版同步狀態 | 提示用戶在 Drive 桌面版「立即同步」,等 2-3 分鐘後用戶說「重 check」即重做 doctor / inbox check | §4.2 |
| 2. Conflict(lock file) | 用戶報告 `~$xxx.md` 存在 | 提示關閉打開該檔之 app + 等 1-2 分鐘 Drive auto release;若仍在,只列出 cleanup 計劃與目標路徑,取得明確確認後才可用安全檔案操作處理 | §4.3 |
| 3. Wrong-lane | Read 該 packet header,比對 sender 欄 vs 所在 lane 資料夾名 | 先列出來源路徑、目標路徑與影響範圍;取得明確確認後才可移動 packet;通知用戶傳 WhatsApp 告訴對方 | §4.4 |
| 4. Packet 格式錯誤 | Read 該 packet,parse header;若缺欄(`packet_id` / `version` / `from` / `to` / `project` / `level` / `created_at` 之一)即 invalid | 先提出修復計劃;優先請原發包一方用 `revise` 發新版本,或在未被消化前用 `withdraw` 撤回;不要直接改已發佈 packet | §4.5 |
| 5. 版本不對齊 | 用戶報告兩邊 Bridge Pack 不同 version | 提示雙方使用同一份已驗證 Bridge Pack fixture。目前尚未實作自動更新命令;不得建議用戶執行不存在的命令。skill 可代生成 WhatsApp 短訊告訴對方改用目前有效的更新方式 | §4.6 |

### 7.3 6 件 skill 不可代用戶執行的事(全程堅守)

完整長版說明見 repo 內 dialogue script §4.7;若此 skill 由 npm package 安裝,只依本節要點執行,不得假設 `docs/plans/` 檔案存在。要點:

1. WhatsApp 短訊由用戶手動發 — skill 只生成短訊文本。
2. 對方電腦的 onboarding 不在當前 session 範圍。
3. 雲端硬碟同步延遲由用戶等。
4. Packet 內容由用戶 review 後寫入。
5. Sensitive payload 路由由用戶決定 — 偵測 credentials / API key / unredacted PII 即停手 + 提示用戶改用 out-of-band channel。
6. PROTOCOL.md 升級 sign-off 由用戶 review CHANGELOG。

## 8. Cross-link

- `references/setup-dialogue.md` — bundled setup wording bank;npm package runtime 可讀
- `docs/plans/2026-05-23-aps-skill-dialogue-script.md` — repo 內長版 dialogue companion / 維護稿
- `dev/qc/2026-05-22-zero-knowledge-funnel-audit.md` — funnel audit + Layer 設計理據
- `docs/guides/aps-onboarding-walkthrough.html` — 詳細設置教學(維護者 / 深入參考層)
- `docs/plans/2026-05-20-agent-public-square-design.md` — 協定設計文件
- Hub 上的 `_hub/PROTOCOL.md` — 協定 v1.0 契約
