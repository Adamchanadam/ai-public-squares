# AI Public Squares 公開產品路線 — Reliable Pair first 與無雲端 API 原則

建立日期：2026-05-28
狀態：產品需求與技術方向草案；未代表功能已實作
適用範圍：AI Public Squares 通用模板與 npm package 後續版本

---

## 一、撰寫原因

APS 0.2.x 已完成二人最小交接路徑：安裝、初始化、Hub skeleton、packet、inbox、ack、revise、withdraw、close、doctor 與自然語言日常使用的前期規格。近期 UAT 暴露兩個產品判斷：

1. 真正最有價值、也最有機會做穩的近期目標，是把二人交接做到可靠。
2. 使用者仍會需要更自然的「選對方」體驗，但這不應搶在 Reliable Pair 穩定之前進入 0.2.7 範圍。

因此，本文件最新口徑收斂為 **Reliable Pair first**：先把二人交接、升級、發送前確認、收件總覽、補交、共識確認、回覆與收結做到穩。Contacts selector / 選對方體驗保留為後續階段；真正多人平台、`_notify`、`watch`、桌面通知與平台排程全部延後。

---

## 二、核心決策

| 決策 | 內容 |
|---|---|
| 近期主線是 Reliable Pair | 先完成可靠二人交接：安裝、升級、doctor、發包、收件、補交、共識確認、回覆、收結與 UAT。 |
| Contacts 延後 | 聯絡名單與群組別名只可作後續選對方輔助；不屬 0.2.7 Reliable Pair 範圍，不等同真正多人平台。 |
| 共享層仍用同步資料夾 | 核心只依賴使用者已掛載到本機的 Google Drive、Dropbox、OneDrive 或其他同步資料夾。 |
| 不把雲端 API 作為核心依賴 | 不要求 Google Drive API、Dropbox API、OneDrive API、OAuth app、雲端 token 或平台開發者設定。 |
| Google Drive 是已驗證路徑 | 目前維護者實測與文件主要驗證 Google Drive for Desktop；其他同步資料夾可作實驗路徑，不能先寫成正式支援。 |
| 真正多人協作延後 | 多人只是長線方向；近期不做多方共用收件箱、不做多人同一 packet、不做聊天室式公共目錄。 |
| 摘要式人類通知屬 Reliable Pair | 近期必須產生 copy-ready 摘要式通知與手動 `check Hub` 下一步；通知可以經 Telegram、WhatsApp、Email 或其他渠道由人傳送,但只通知人,不自動觸發對方 AI。 |
| `_notify` / watch / 自動代發延後 | 檔案式 `_notify`、`aps watch`、桌面通知、平台排程、背景檢查與 Telegram bot 自動代發都不是 Reliable Pair 核心。若日後做 Telegram,也只可作 opt-in 人類通知渠道,不可控制對方 AI。 |
| 人類可保留打斷控制權 | 通知必須讓收件人先讀懂重點與注意事項,再由收件人本人決定何時叫 AI 介入;不得因通知自動 consume、close、revise 或 withdraw。 |
| 群組只是發送別名 | 群組不等於一個可寫 lane，除非它真是一個獨立 agent。向群組發送時，工具應展開成個別 agent 收件對象或要求使用者選擇。 |
| 第一版 Contacts 不做多收件人 packet | 群組發送先展開為多個單收件 packet；每個收件人各有自己的 packet / ack 狀態，避免在 v1.0 語義下暗改 `to` 欄位。 |
| APS 不提供資料夾權限隔離 | 同步資料夾內的可見性由雲端資料夾權限與本機檔案系統決定；APS 只能標示本機可見資料，不聲稱能限制誰讀哪條 lane。 |

---

## 三、近期產品終點畫面

近期理想日常流程不是「多人平台」，也不是 Contacts selector，而是可靠二人交接：

```text
幫我將當前任務整理成 APS 交接包給對方。
```

AI 應完成以下事情：

1. 讀取本地 APS 設定,確認本機 agent、對方 agent、project slug 與 Hub root。
2. 使用 `.aps/config.json` 內的 `otherAgentId` 作為 Reliable Pair 的收件對象;Contacts selector 不在近期流程內。
3. 執行健康檢查與收件狀態檢查。
4. 整理共同目標、本方任務、對方任務、交叉點、請對方做的事、證據與風險。
5. 做發送前完整性預檢。
6. 向使用者顯示摘要、對象、topic、寫入位置與預檢結果。
7. 取得明確確認後才寫入 Hub。
8. 寫入後產生 copy-ready 通知文字，包含項目、來源、主題、交接編號、重點摘要、注意事項與 `check Hub` 下一步，讓使用者透過既有渠道通知對方。

若使用者輸入的是群組名稱，例如 `launch_team`，近期 Reliable Pair 不應嘗試展開群組或建立 `from_launch_team`。正確做法是提醒 Contacts selector 尚未進入當前版本,並要求使用 `.aps/config.json` 內已設定的單一 `otherAgentId`。後續 Contacts selector 才會處理群組名稱、成員展示與多個單收件 packet。

接收方的理想流程應是：

```text
check Hub
```

中期若加入 `watch`，也只應先做前景只讀提醒，例如：

```text
APS 有 2 個新交接包：1 個來自 adam，1 個來自 research_agent。
```

AI 應先顯示總覽，再列細節；不完整或不一致時，先要求補交或共識確認，不預設 consume。背景自動通知、桌面通知、平台排程不屬近期版本。

收件方輸入 `check Hub` 後,AI 不應只列出交接包 ID。它要產生一份可快速閱讀的收件報告:先摘要交接重點,再做完整性預檢與本機對接檢查,核對本機 `.aps/config.json`、任務要求、已讀文件、證據位置與版本狀態是否能接上。只有交接內容完整、與收件方本機狀態一致,才建議開工或標記已消化;否則先發補交需求或共識確認包。

### 3.1 發送方 UX：從一句話到可交出的包

發送方的核心體驗不是「填表」,而是「AI 先整理,人最後批准」。Adam / 發送方只需要說明想交給誰與交甚麼;AI 需要把散落背景整理成可由對方 AI 接手的結構。

發送流程應固定為:

1. **識別任務與對方** — AI 先讀 `.aps/config.json`,確認本機 agent、對方 agent、project slug 與 Hub root。若用戶說的是人名或暱稱,近期 Reliable Pair 只用既有 `otherAgentId`,不引入 Contacts selector。
2. **收集上下文** — AI 從目前對話、已讀檔案、最近任務狀態與用戶明示內容整理草稿;不要求用戶手填所有欄位。
3. **整理交接包正文** — 正文必須分清共同目標、本方任務、對方任務或「未確認」、交叉點、請對方做的事、不應誤解的事、證據位置、風險 / 未決事項。
4. **發送前預檢** — AI 用表格標示哪些欄位已齊、哪些由上下文推得、哪些仍未確認。缺關鍵資料時先停下問;非關鍵資料可寫成未確認,不得假裝已知。
5. **人手確認** — AI 必須同時請用戶確認三件事:內容完整 / 正確、topic 正確、可以寫入 APS Hub。未確認前不得 publish。
6. **寫入 Hub** — 長正文使用 `--body-file`,避免 shell 引號與多行文字出錯。寫入成功只代表本機同步資料夾已產生 packet,不代表對方已同步。
7. **產生摘要式通知** — 通知不可只列 packet id。它必須幫收件人先看懂「這是甚麼、為何要看、要注意甚麼、何時叫 AI 介入」。
8. **交給人發送** — 發送渠道可以是 Telegram、WhatsApp、Email 或其他工具;APS 不代替人決定何時打擾對方,也不把通知寫成遠端控制 AI 的指令。

發送完成畫面應包含:

```text
✅ 已發佈
📦 交接包: <packet_id> v<N>
🔎 重點摘要: <一至三句>
⚠️ 注意事項: <風險 / 未決 / 不應誤解>
🚀 下一步: 把下方通知貼給對方,由對方本人決定何時 check Hub
```

### 3.2 收件方 UX：從通知到可開工判斷

收件方的核心體驗不是「看到新包就照做」,而是「AI 先對接本機現況,人再批准開工」。Jay / 收件方收到 Telegram、WhatsApp 或 Email 後,只需要在自己的 AI 工具輸入 `check Hub`;之後由 AI 負責檢查。

收件流程應固定為:

1. **讀本機設定** — AI 先讀 Jay 電腦上的 `.aps/config.json`,不可使用 Adam 通知內的本機路徑。
2. **健康檢查** — 跑 `doctor` 或等效檢查,確認 Hub、雙方 lane、ack、outbox 與衝突檔名狀態。
3. **收件總覽** — 跑 inbox,先列待處理項目數量、來源、主題、版本與建議狀態;多個新件時先讓使用者選處理順序。
4. **讀取交接內容** — 讀 packet 全文,但不要直接把全文倒出;先整理重點摘要。
5. **完整性預檢** — 檢查共同目標、任務邊界、請本方做的事、證據位置、風險 / 未決事項是否足夠。缺資料時先發補交需求。
6. **本機對接檢查** — 核對交接內容與收件方本機文件、任務要求、已知狀態、檔案版本、可讀證據位置是否一致。若出現發送方本機路徑、舊版本、任務方向衝突或資料未同步,不得開工。
7. **一致性判斷** — 若交接要求與本機理解不一致,先產生共識確認包;若一致但有小風險,列出風險並請 Jay 決定是否先做局部工作。
8. **人手決定下一步** — AI 提供清楚選項:開始處理、稍後再讀、要求補交、發共識確認、標記已讀但等待資料。除非 Jay 明確要求,不得寫 ack。
9. **回覆或收結** — 需要回覆時用 APS 發新 packet 或 revise;事情完成後才建議收結,不可用 consume 代替真正完成。

收件報告應固定使用此順序:

```text
📬 收件總覽
<來源 / 主題 / 版本 / 建議狀態>

🔎 交接重點
<一至三句說清楚對方交來甚麼、要本方做甚麼>

✅ 完整性預檢
<共同目標 / 任務邊界 / 請本方做的事 / 證據 / 風險>

📌 本機對接檢查
<設定 / 版本 / 文件可讀性 / 任務一致性 / 本機路徑風險>

⚠️ 需要確認
<缺漏、矛盾或同步風險;沒有則寫「暫無」>

🚀 建議下一步
<開始處理 / 補交需求 / 共識確認 / 稍後再讀 / 標記已讀>
```

此流程的驗收點是:收件方可以在三十秒內理解對方交來甚麼、自己應否開工、哪裡有風險、下一步選項是甚麼。AI 不得把 `check Hub` 簡化成 `npx aps inbox` 的原始輸出。

---

## 四、資料模型方向

### 4.1 目前可保留的基礎

現有設計文件已把 APS 定義為可支援「兩個或多個 AI agent」的中介層，且已採用單寫道、不可變 packet、追加 outbox 與 ack。這些原則仍然成立。

現有二人結構：

```text
<hub_root>/<project_slug>/
  from_<agent_a>/
  from_<agent_b>/
  _ack/
    <agent_a>.ack.json
    <agent_b>.ack.json
```

長線多人結構不需要推翻，只是擴展為「每個真正 agent 一條 lane」。後續 Contacts selector 不要求立即建立多人結構，只需要確保未來可相容：

```text
<hub_root>/<project_slug>/
  from_<agent_a>/
  from_<agent_b>/
  from_<agent_c>/
  _ack/
    <agent_a>.ack.json
    <agent_b>.ack.json
    <agent_c>.ack.json
```

`design_team` 只有在它是一個真正會獨立登入、收件、回覆、維護 ack 的 agent 時，才可成為 `from_design_team/`。若它只是多人的稱呼，應放在群組別名，不應建立 lane。

### 4.2 需要新增的聯絡名單

Contacts selector 應新增可機讀、可人工檢查的聯絡名單。為保留單寫道原則，不建議把所有人同時寫進同一個大型 JSON。較穩妥的方向是每個 agent 自己維護一張聯絡卡，再由工具讀取整個目錄：

```text
<hub_root>/<project_slug>/_contacts/
  agents/
    <agent_id>.json
  groups/
    <owner_agent_id>.groups.json
```

agent 聯絡卡草案：

```json
{
  "project": "example_project",
  "agent_id": "adam",
  "display_name": "Adam",
  "role": "owner",
  "lane": "from_adam",
  "status": "active",
  "contact_state": "confirmed",
  "updated_at": "2026-05-28T00:00:00Z"
}
```

群組別名草案：

```json
{
  "project": "example_project",
  "owner_agent_id": "adam",
  "groups": [
    {
      "group_id": "launch_team",
      "display_name": "Launch Team",
      "members": ["adam", "design_agent"]
    }
  ],
  "updated_at": "2026-05-28T00:00:00Z"
}
```

設計原則：

- `agent_id` 仍是穩定機器識別碼，不一定等於真人姓名。
- `display_name` 只為人類閱讀。
- 群組只是發送輔助，不改變每個 agent 單寫自己 lane 的規則。
- 每張聯絡卡由該 agent 自己寫；每份群組檔由 `owner_agent_id` 寫。
- 若同一個 group id 被不同 owner 定義，工具必須顯示衝突並要求使用者選擇，不可靜默合併。
- 舊版二人 `.aps/config.json` 仍應可運作；沒有 `_contacts/` 時，工具可由 `agentId` / `otherAgentId` 暫時生成一個唯讀視圖。

聯絡卡生命週期：

| 狀態 | 寫入責任 | 用途 |
|---|---|---|
| `provisional` | 邀請者可建立候選草稿 | 尚未確認的新成員；只可用於顯示邀請計劃，不可視為已可收件 agent。 |
| `confirmed` | 該 agent 首次 `init` / `join` 後自己寫入或確認 | 正式可用的 agent；可建立 lane、ack 與日常收件狀態。 |
| `inactive` | 原 owner 或該 agent 明確標示 | 保留歷史資料，不再作為新交接預設收件人。 |

邀請者不得替對方建立 confirmed 聯絡卡。若對方尚未加入，AI 應把它標為候選對象，並生成 starter pack / 通知文字，而不是假裝對方已可收件。

### 4.3 收件計算方向

現有 `inbox` 可計算「對方給我」的 pending。後續 Contacts selector 只需要支援選對方與排錯總覽；長線多人後才擴展更多查詢方向：

| 指令方向 | 用途 |
|---|---|
| `aps inbox` | 看指名給本 agent 的新件 |
| `aps inbox --all` | 顯示本機可見 lane 的總覽，供排錯與人工核對 |
| `aps inbox --from <agent_id>` | 只看某個來源 |
| `aps inbox --for <agent_id>` | 以指定 agent 身份計算 pending，用於測試與維護 |
| `aps contacts` | 顯示本項目的可用 agent / group |
| `aps contacts check` | 檢查聯絡卡、群組與 lane / ack 是否一致 |

Contacts selector 發送的收件計算仍以 `(packet_id, version)`、`to`、ack 與 outbox 事件為準。第一版 Contacts 不支援同一 packet 多個收件人；群組發送會展開成多個單收件 packet，讓每個收件人各自 ack、補交、回覆與收結。若未來支援多收件人，`to` 欄位應明確定義為單值或陣列，並需要協定版本升級；不可在現有 v1.0 語義下暗改。

`aps inbox --all` 不是權限功能。它只表示「本機同步資料夾目前可讀到的 lane 總覽」。若雲端共享資料夾本身讓使用者看見某些檔案，APS 不應聲稱可以在工具層阻止閱讀；真正權限仍由雲端資料夾分享設定與作業系統檔案權限決定。

---

## 五、通知渠道與 watch 的延後方向

同步資料夾本身不能保證「即時彈窗」或「自動喚醒 AI」。本文件把通知拆成兩層:摘要式人類通知是 Reliable Pair 必做 UX;檔案式 `_notify`、`watch`、桌面通知、平台排程、背景檢查與 Telegram bot 自動代發屬延後或 opt-in 方向。近期核心只保留手動 `check Hub` 與 copy-ready 人類通知。Telegram、WhatsApp、Email 都只是把摘要式通知送到人手上,不是控制對方 AI 的渠道。通知內容必須包含重點摘要與注意事項,不能只列交接包 ID。以下方向只作中期設計備忘。

中期若新增通知層，方向應是：

```text
<hub_root>/<project_slug>/from_<sender_agent_id>/
  notify/
    events.log.md
```

用途：

- 發包時由發送方追加一條「給誰、有甚麼 packet、是否需要回覆」的輕量事件到自己的 lane。
- 接收方的 `aps watch` 或定期任務掃描本機可見的 `from_*/notify/events.log.md`、outbox 與 ack，快速判斷是否有新件。
- notify log 只是提醒索引，不是 packet 真相；packet 仍以 `from_<agent>/packets/` 為準。

通知事件草案：

```text
2026-05-28T12:00:00Z | packet_available | from:adam | to:design_agent | packet:20260528T120000Z__site_copy v1 | requires:reply
```

通知層規則：

- `events.log.md` 只可由該 `from_<sender_agent_id>` lane 的擁有者追加；不得為了通知而寫入收件人的 lane。
- 通知事件不可代替 outbox 事件；若兩者不一致，以 outbox + packet 為準，並由 doctor / watch 顯示警告。
- `watch` 看到通知只代表「可能有新件」，不代表已讀、不代表已處理。
- 任何自動化不得因為看到通知就自動 consume、close、revise 或 withdraw。

不可承諾：

- 不承諾雲端即時推送。
- 不承諾對方電腦關機時仍可本機通知。
- 不承諾 AI 工具會在未開啟時自動回覆。

---

## 六、watch 與平台配合的延後方向

近期版本不做背景自動檢查。中期若要做，APS 核心應先提供純本機、純檔案、前景執行的指令：

```text
npx aps inbox
npx aps inbox --all
npx aps watch
npx aps watch --interval 60
```

其中 `watch` 的最小版本只需在本機前景輪詢 Hub，看到新件時輸出摘要。之後才逐步加平台適配。

`watch` 的輸出應先總覽，後細節：

```text
APS watch: 找到 2 個可能需要處理的新項目

| 來源 | 對象 | 主題 | 狀態 |
|---|---|---|---|
| adam | design_agent | site_copy | 未讀 |
| research_agent | adam | reference_update | 需補交 |
```

`watch` 的最小權限應是只讀；若要建立 ack、發補交需求或回覆 packet，必須回到明確使用者確認流程。

`watch` 顯示的狀態必須先對齊 packet state vocabulary，不可即興創造 UI 狀態。初始建議如下：

| 狀態 | 判斷來源 | 含義 |
|---|---|---|
| `pending` | packet + outbox 存在，收件方 ack 尚未 consumed | 有新件等待處理。 |
| `needs-info` | 收件方明確建立補交需求或 ack result 標示等待補充 | 已讀到，但資料不足。 |
| `needs-alignment` | 收件方明確建立共識確認需求 | 已讀到，但共同目標、版本或任務理解不一致。 |
| `consumed` | `_ack/<agent>.ack.json` 有對應 consumed entry | 收件方已標記消化。 |
| `closed` | outbox 有 close event，且沒有更新版本重開 | 已收結。 |

若現有 runtime 未支援某一狀態，公開 UI 不可先顯示該狀態；只能列為 roadmap。

| 層級 | 可行方向 | 邊界 |
|---|---|---|
| 純 CLI | `aps watch` 前景執行，定期讀本機同步資料夾 | 不自動喚醒 AI，不做桌面通知 |
| 作業系統排程 | Windows 工作排程器、macOS launch agent、Linux systemd timer / cron | 需要本機開機與使用者授權 |
| AI 平台排程 | Claude Code scheduled tasks / Desktop scheduled tasks / Routines、Codex automations、Antigravity scheduled tasks | 各平台能力與權限不同，必須分開驗證 |
| 桌面通知 | Windows toast、macOS notification、Linux desktop notification | 屬後期體驗層；需清楚列權限與關閉方法 |

---

## 七、外部平台研究摘要

以下資料於 2026-05-28 以官方文件或官方儲存庫核對，只作後續適配參考，不作 APS 核心依賴。

| 平台 | 已核對能力 | 對 APS 的啟示 |
|---|---|---|
| Telegram Bot API | 官方 Bot API 提供 HTTPS bot 介面、`sendMessage`、`getUpdates` 與 webhook；它能把訊息送到人手上或接收 bot 訊息,但不會天然喚醒收件人本機 AI。 | 可作摘要式通知渠道,但應保持 human in loop。APS 不應把 Telegram 通知寫成「自動控制 Jay 的 AI」。 |
| Claude Code Channels | 官方 Channels 文件列出 Telegram plugin 可把外部訊息推入已運行的 Claude Code session,但屬 opt-in / research preview,需要 session 開着、用戶配置與 allowlist。 | 只可作熟手進階路線參考;Reliable Pair 主路徑仍應是人收到通知後,自行在本機 AI 輸入 `check Hub`。 |
| Claude Code | 官方文件列出 scheduled tasks、Desktop scheduled tasks、Routines、headless `claude -p`、hooks。Session-scoped tasks 只在 Claude Code 執行且閒置時觸發；長期無人值守可用 Desktop scheduled tasks 或 Routines。 | 適合做 `check Hub` 定期任務與本機 watch 適配，但不能假設所有使用者都有同一種排程能力。 |
| OpenAI Codex | 官方 Codex 文件列出 non-interactive mode；Codex App 文件導覽亦有 Automations。 | 可研究以非互動模式執行 `aps inbox` 摘要，但實際排程與通知需按 Codex App / CLI 當前能力分開驗證。 |
| Google Antigravity | 官方文件列出 CLI、subagents、scheduled tasks。 | 可作後續多 agent / 定期任務適配候選，但目前不應成為 APS 主路徑依賴。 |

參考來源：

- https://code.claude.com/docs/en/scheduled-tasks
- https://core.telegram.org/bots/api
- https://code.claude.com/docs/en/channels
- https://code.claude.com/docs/en/headless
- https://code.claude.com/docs/en/hooks
- https://code.claude.com/docs/en/web-scheduled-tasks
- https://developers.openai.com/codex/noninteractive
- https://www.antigravity.google/docs/cli-getting-started
- https://antigravity.google/docs/features?app=antigravity

### 7.1 同類工具參考與可吸收原則

以下資料於 2026-05-28 以官方文件或官方 GitHub 儲存庫核對。它們多數使用 HTTP、API、SDK、伺服器、webhook 或專用 runtime，不能照搬為 APS 核心依賴；但其設計原則可轉化成「同步資料夾 + 本機 CLI + AI skill」的低門檻版本。

| 參考 | 可學習的設計 | 轉化到 APS 的做法 | 不照搬的部分 |
|---|---|---|---|
| A2A protocol | 使用 Agent Card 做能力與身份發現；任務、訊息、artifact、狀態更新分開；push notification 屬可選能力，未宣告支援時必須回錯。 | `_contacts/agents/<agent_id>.json` 應接近本地 Agent Card；packet / outbox / ack / notify 要分工清楚；`watch` 必須是明確能力，不可假裝所有環境都支援。 | 不把 HTTP、JSON-RPC、webhook、OAuth 或 server endpoint 變成 APS 核心要求。 |
| OpenAI Agents SDK handoffs | 每個 handoff 目標要明確註冊；handoff metadata 可用結構化欄位記錄 reason、priority、summary；接收方可過濾上下文。 | 群組別名先展開為明確 agent id；交接包要保留 summary、reason、priority、requested action；發送前顯示 AI 將交給哪一位或哪幾位；第一版只建立多個單收件 packet。 | 不讓模型臨場猜收件人；不把 APS packet 混同於同一 session 內的 agent handoff。 |
| LangChain / LangGraph multi-agent | 多 agent 主要解決上下文管理、分工維護、平行化與流程約束；核心難點是 context engineering。 | APS 不應為了「多人」而多人；只有當同一 Hub 真的有多個協作者時才啟用聯絡名單。收件顯示先總覽後細節，避免把整段歷史塞給接收方。 | 不引入複雜 graph runtime 作為普通用戶安裝前提。 |
| Microsoft AutoGen | 分層架構、message passing、event-driven agents、兩人對話與 group chat 是常見模式；新舊版本演進需要明確維護狀態。 | APS 應保持協定層、CLI 層、skill 層、文檔層分開；group 模式要有 owner / manager 語義，不能只是把多人寫入同一檔。 | 不把 AutoGen runtime 或雲端部署作為 APS 依賴。 |
| CrewAI | crews、flows、tasks、guardrails、human-in-the-loop、persist / resume 是成熟產品會處理的基本面。 | APS 後續可把 packet state 明確分為 pending、needs-info、needs-alignment、consumed、closed；任何寫入 Hub 的自動流程都要有人類確認。 | 不採用需要平台帳號、API key 或 enterprise trigger 的做法作為核心流程。 |
| Model Context Protocol | 官方規格、schema、resource boundary、工具 / 資源分離是跨工具整合時的穩定做法。 | APS 的本機 root、Hub root、project slug、agent id 應像資源邊界一樣明確；doctor 必須檢查 AI 是否越界讀寫。 | 不把 MCP server 或 connector 設置變成 APS 必需條件。 |
| AgenticMail 類 agent inbox | 每個 agent 有獨立 inbox / credential；安全掃描與人類審批可防止 agent 外發敏感資料。 | APS 的 `from_<agent>/` lane 與 `_ack/<agent>.ack.json` 應維持隔離；發包前預檢必須保留敏感資料掃描與人類確認。 | 不採用 email server、SMS、API key、外部寄送能力作為核心通知路徑。 |

同類工具參考來源：

- https://a2a-protocol.org/latest/specification/
- https://openai.github.io/openai-agents-python/handoffs/
- https://docs.langchain.com/oss/python/langchain/multi-agent
- https://microsoft.github.io/autogen/stable/
- https://github.com/microsoft/autogen
- https://docs.crewai.com/en/concepts/crews
- https://modelcontextprotocol.io/specification/2025-06-18
- https://github.com/agenticmail/agenticmail

由以上參考轉化出的 APS 設計守則如下。數量不作硬性目標；只保留對 APS 的低門檻、可驗收、可相容方向有實際價值的原則。

| 守則 | 分析 | 落地方式 |
|---|---|---|
| 每個 agent 需要可機讀身份卡 | A2A 的 Agent Card 與 agent inbox 工具都顯示：多 agent 系統若沒有明確身份與能力描述，收件、權限與排錯會很快混亂。APS 需要這一層，但不能把身份卡變成機密或帳號系統。 | `_contacts/agents/<agent_id>.json` 只記 agent id、顯示名、能力、偏好通知方式與可讀路徑，不寫 OAuth token、API key 或個人帳號密碼。 |
| 群組只是收件對象展開 | OpenAI handoff 與 LangGraph handoff 都要求目的地明確。若 APS 把群組直接變成 lane，會破壞單寫道與責任追蹤。 | `design_team` 這類名稱先展開為具體 agent id；AI 顯示成員與發送範圍，取得確認後逐一建立單收件 packet。 |
| packet、outbox、ack、notify 不可互相代替 | A2A 把 task、artifact、status update 與 notification 分開，這可避免「看到提醒」被誤解為「已處理」。APS 也需要同樣分層。 | `notify` 只代表可能有新件；是否有效以 packet + outbox 為準，是否已消化以 ack 為準；notify 只寫發送方自己的 lane。 |
| 可選能力必須明示 | A2A 對 streaming / push notification 要求 capability validation；這點可防止產品誇大。APS 的 `watch`、桌面通知、平台排程也應同樣處理。 | `doctor` / `config` / `watch` 顯示目前是否啟用；未啟用時 AI 不得說會自動提醒；若狀態詞尚未由 runtime 支援，UI 不可先承諾。 |
| 長任務要有可恢復狀態，但寫入仍須人類確認 | CrewAI flows 與 LangGraph 強調狀態、恢復與 human-in-the-loop。APS 可吸收這一點，但不能讓背景任務自行 consume、close 或發包。 | 後續狀態可分為 pending、needs-info、needs-alignment、consumed、closed；任何寫入 Hub 的動作仍須使用者確認。 |
| 多人功能只在真有多人時啟用 | LangChain 文件提醒：不是所有複雜任務都需要多 agent。APS 若把二人用戶迫進聯絡名單概念，會增加認知負擔。 | 舊二人 `.aps/config.json` 繼續可用；沒有 `_contacts/` 時不要求用戶理解群組與多人命令。 |
| 接收方先看摘要、證據與請求 | 多 agent 系統的難點是 context engineering。把完整歷史全部丟給接收方會增加誤讀與成本。 | `inbox` / AI 回覆先顯示總表、摘要、請求、風險與證據位置，再列 packet 細節。 |
| 核心功能維持無雲端 API | AgenticMail、CrewAI 與 enterprise trigger 類工具功能較強，但引入帳號、API key、伺服器或平台設定。這與 APS 的低門檻定位相衝突。 | 核心仍只讀寫本機同步資料夾；Google Drive API、Dropbox API、OneDrive API、OAuth、webhook、伺服器只可作未來可選外掛，不可成為主路徑；APS 不聲稱提供同步資料夾以上的讀取權限隔離。 |

---

## 八、開發分期建議

### 第一段：APS Reliable Pair

目標：

- 完成 0.2.7 候選的 `upgrade`、`--body-file`、品牌版本分流與 UAT 修正。
- 發包前確認與收件後總覽要在真實 AI 使用中穩定。
- 完成補交、共識確認、回覆、收結與錯誤補救的自然語言路徑。
- 不新增 Contacts、多人、notify 或 watch，避免同時擴大多條戰線。

驗收：

- 新安裝與既有項目升級路徑都可用。
- 使用者一句話可產生 APS packet 草稿、預檢與確認流程。
- 長正文不再透過多行 shell 引號傳入。
- 收件方能先總覽、後細節；不完整時不預設 consume。
- 二人 UAT 可重複跑通。

### 第二段：APS Contacts selector

目標：

- 新增 `aps contacts`。
- 新增 `_contacts/agents/<agent_id>.json` 與 `_contacts/groups/<owner_agent_id>.groups.json` 草案落地。
- 新增既有項目的 contact 草稿生成與確認流程。
- 新增 `inbox --all`、`inbox --from` 作排錯和人工核對。
- 群組發送只展開為多個單收件 packet，不改 `to` 欄位語義。

驗收：

- 不破壞既有二人 `.aps/config.json`。
- 舊 project 可從 `.aps/config.json` 生成聯絡卡草稿，但必須先顯示計劃並取得確認。
- 邀請者只可建立 `provisional` contact；對方完成加入後才可成為 `confirmed` contact。
- 沒有 packet / outbox / ack 被覆寫。
- group 不會被誤建成 lane；除非它是被明確新增的 agent。
- `inbox --all` 只表達本機可見總覽，不表達 APS 權限控制。
- 使用者可說「發給 Jay」，AI 能顯示 Jay 對應的 agent id、lane、狀態與寫入計劃，確認後才發送。

### 第三段：只讀 watch 實驗

目標：

- 新增 `aps watch` 前景輪詢。
- AI skill 可解釋「看到通知」與「讀到 packet」的分別。
- 定義並測試 packet state vocabulary。
- 先直接掃描 packet / outbox / ack；只有證明需要時才加入 notify 層。

驗收：

- `watch` 可在前景顯示本機可見的新件總覽。
- `watch` 不寫入 Hub，除非使用者明確要求 consume 或回覆。
- Drive / Dropbox / OneDrive 同步延遲被描述為外部同步狀態，不被誤判為 APS 寫入失敗。
- packet、outbox、ack 不一致時，工具顯示警告而非自動修復。
- UI 顯示的所有狀態均可由 packet / outbox / ack / 明確補交或共識事件推導。

### 第四段：檔案式 notify 與平台適配

目標：

- 只有在 watch 實驗證明需要時，才新增發送方 lane 內的 notify 索引。
- Claude Code：研究 scheduled tasks / Desktop scheduled tasks / Routines 的最小可用設定。
- Codex：研究非互動模式與 Codex App automations 是否可穩定跑 `aps inbox`。
- Antigravity：研究 scheduled tasks 與 CLI 對本機資料夾的可用性。
- 作業系統：研究 Windows 工作排程器作為最低共同路徑。

驗收：

- 每個平台只在官方文件與本機實測通過後列為正式支援。
- 沒有平台適配能繞過使用者確認去發包、consume 或修改 Hub。
- notify 只可作提示索引，不可代替 packet、outbox 或 ack。

### 成功機率與取捨

| 目標 | 粗略成功機率 | 判斷 |
|---|---:|---|
| APS Reliable Pair | 80-85% | 已有 0.2.x 基礎，主要風險是 UX、升級、UAT 與文檔一致性。 |
| APS Contacts selector | 70-75% | 不做真正多人協定，只做選對方與單收件 packet，風險可控。 |
| 只讀 `watch` 前景輪詢 | 約 70% | 技術上可行，但同步延遲與狀態解讀要小心。 |
| 檔案式 notify + 平台排程 | 45-55% | 平台差異、權限與喚醒能力不穩，應延後。 |
| 真正多人平台 | 約 55% | 身份、責任、權限、狀態與同步語義都會放大風險，不應作近期主線。 |

因此，近期產品不應追求「多人平台」，亦不應在 0.2.7 同時加入選對方體驗。正確路線是先做 Reliable Pair：可靠二人交接、補交、共識確認、回覆、收結與 UAT；選對方體驗留待後續階段。

---

## 九、風險與防漂移要求

| 風險 | 防線 |
|---|---|
| 把延後工具寫成已實作 | README、docs、skill、CLI help 必須繼續標示真正多人、notify、watch 與平台排程為延後路線，直至通過實測。 |
| 把近期目標誤寫成多人平台或 Contacts selector | 近期主線只可寫成 Reliable Pair first；Contacts selector、真正多人、notify、watch、平台排程均屬延後方向。 |
| 引入雲端 API 設定負擔 | 核心功能禁止要求 OAuth app、API key 或雲端開發者專案。 |
| 聯絡名單多人同寫造成衝突 | 聯絡名單需有 owner 與更新規則；多人只新增 lane，不新增共寫檔案。 |
| 邀請者替對方偽造正式身份 | 新 agent 先以 `provisional` contact 表示；只有該 agent 首次加入或確認後才可成為 `confirmed`。 |
| 自動檢查變成自動打擾 | 預設仍是手動 `check Hub`；watch / scheduled task 必須由使用者明確啟用。 |
| 收到通知即誤當已讀 | notify 不是 ack；只有 `_ack/<agent>.ack.json` 的 consumed entry 才代表消化。 |
| 通知層破壞單寫道 | notify 只寫入發送方 lane；接收方 watch 掃描可見 notify / outbox，不寫對方檔案。 |
| 多人群組導致責任不清 | packet 必須明確 `to`、requested action、owner 或 group；缺責任分配時先要求澄清。 |
| 同一 packet 多收件人導致 ack / revise / withdraw 不清 | 第一版 Contacts 只建立多個單收件 packet；多收件人 packet 留待協定升級。 |
| 舊二人項目升級時破壞資料 | 升級只可新增聯絡卡 / 通知索引草稿，不可覆寫 packet、outbox、ack 或 Hub 協定檔。 |
| 誤把 `inbox --all` 當權限功能 | `inbox --all` 只表示本機可見資料總覽；真正權限由雲端分享設定與本機檔案權限決定。 |
| 平台排程權限過大 | OS scheduler 或 AI 平台任務預設只讀；任何寫入 Hub 的任務都需要更高級別設計與明確確認。 |

---

## 十、版本與相容性要求

下一階段不得一次跳到多人全功能。每個版本應維持下列相容性：

| 項目 | 要求 |
|---|---|
| 既有二人專案 | 沒有 `_contacts/`、沒有 `_notify/` 時仍可用現有 `.aps/config.json`、outbox 與 ack。 |
| 新增聯絡名單 | 只新增檔案，不改舊 packet，不改舊 outbox，不改舊 ack。 |
| 新增群組發送 | 先展開為多個單收件 packet，不改 `to` 欄位。 |
| 新增 watch | 先直接掃描 packet / outbox / ack；預設只讀，不產生 ack，不自動發包。 |
| 新增 notify | 必須晚於只讀 watch 實驗；只寫發送方 lane；接收方只讀掃描本機可見通知與 outbox。 |
| 新增平台排程 | 每個平台分開標示支援狀態；未驗證不可列入公開主路徑。 |
| 協定升級 | 若 `packet.md` 的 `to` 欄位要由單值改為多值，必須升協定版本並記錄遷移策略。 |

---

## 十一、深化檢查清單

後續開發前，至少回答以下問題：

1. `_contacts/` 是否完全遵守單寫道？
2. group alias 是否只是收件對象展開，不會變成多人共寫 lane？
3. Contacts selector 是否仍被標示為延後路線，而不是 0.2.7 目標？
4. Reliable Pair 的補交、共識確認、回覆、收結是否已能穩定 UAT？
5. `watch` 是否能保證只讀？
6. watch 是否可先不依賴 notify，只掃 packet / outbox / ack？
7. notify、outbox、ack 三者不一致時，誰是判斷真源？
8. 舊版二人 project 沒有 `_contacts/` 時，AI 如何向使用者解釋？
9. Dropbox / OneDrive 的本機同步行為是否已用實機驗證？
10. Claude Code / Codex / Antigravity 的排程適配是否逐平台記錄權限、限制與取消方法？
11. 公開頁是否仍清楚標示多人、notify 與 watch 是延後路線，而不是 0.2.x 已有功能？
12. provisional contact 何時轉為 confirmed contact？
13. 群組展開出的多個單收件 packet 如何命名與追蹤同一批次？
14. `inbox --all` 的文案是否清楚表明只代表本機可見資料？
15. watch UI 的每個狀態是否都能由 runtime 證據推導？

---

## 十二、下一步

本文件完成後，下一個開發步驟應保持保守：

1. 先完成並驗收 0.2.7 候選修正，不急於加入 Contacts、多人、notify 或 watch。
2. 將本文件登記至 `dev/PROJECT_INDEX.md` 與 `dev/DOC_SYNC_REGISTRY.md`。
3. 後續如要動 CLI / skill，先以本文件作需求真源，逐項拆成小版本。
4. 任何公開文檔只可說近期方向是 Reliable Pair first；Contacts selector、真正多人、notify、watch、自動檢查是延後路線，不可寫成 0.2.x 已支援。

---

## 文件歷史

- 2026-05-28：初版。基於 0.2.6 UAT 之後的產品方向討論，整理多人 APS、聯絡名單、檔案式通知、watch、平台排程適配與無雲端 API 原則。
- 2026-05-28：深化設計。補上 group 不等於 lane、聯絡卡分檔、群組別名、notify / watch 只讀邊界、升級相容性與深化檢查清單。
- 2026-05-28：外部參考吸收。核對 A2A、OpenAI Agents SDK、LangChain / LangGraph、AutoGen、CrewAI、MCP、AgenticMail 類 agent inbox 設計,轉化為 APS 的身份卡、明確收件人、狀態分層、只讀 watch、human-in-the-loop 與無雲端 API 守則。
- 2026-05-28：全面重檢修補。收口 `_notify` 寫入責任、多收件人語義、`inbox --all` 權限邊界、provisional / confirmed contact 生命週期與 watch 狀態詞，避免未實作能力先污染產品承諾。
- 2026-05-28：產品策略再收斂。按使用者最新定案,把近期主線改為 Reliable Pair first；Contacts selector / 選對方體驗延後,真正多人、notify、watch、桌面通知、平台排程與 Dropbox / OneDrive 正式支援延後。
