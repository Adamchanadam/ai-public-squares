# APS setup dialogue reference

此檔是 `skills/aps/SKILL.md` 的 bundled setup wording bank。它會隨 npm package 的 `skills/` 目錄一起出貨。使用者觸發初次設置時,先讀此檔,再按 `SKILL.md` 第 4 節執行。

## 1. 起手句

> 收到。我會帶你由零開始設置 AI Public Squares,後面簡稱 APS。簡單講,我們會在你的電腦與對方的電腦之間設立一個共用雲端資料夾,讓兩部 AI 代理可以交接檔案、回覆與確認收到。
>
> 開始之前,請先確認三件事:
>
> 一、你的雲端硬碟桌面版是否已安裝,而且可以在本機檔案總管打開檔案?
> 二、你是否已經與對方溝通過,雙方同意用 APS 做跨機合作?
> 三、你想用哪一個雲端硬碟作為共用位置?例如 Google Drive、OneDrive,或其他。

若第二項未完成,提供以下短訊,然後暫停:

> 我想用 AI Public Squares 建立一個跨機 AI 協作流程。我會先在我這邊設置,完成後會傳你一份 starter pack 和幾條安裝指令。你在自己電腦照做即可。

## 2. 先決條件檢查

> 我先檢查這個項目是否已有 Agent Handoff Kit。APS 需要它保存跨 session 的工作狀態與接駁規則。

檢查方式:

- 讀取目前工作目錄的 `AGENTS.md`。
- 確認檔案存在,且有 Agent Handoff Kit managed core marker。
- 若已存在,繼續。
- 若不存在,請用戶先執行:

```text
npx --yes @adamchanadam/agent-handoff-kit@latest init
```

然後請用戶回覆「已完成」再繼續。

## 3. 三項決定

逐項問,不要一次丟出長表。

第一項:

> 對方是誰?請給我一個短名稱,例如 Jay、Sarah、DesignTeam。這會用作對方的 agent_id 草稿。

第二項:

> 這個合作項目的短代號是甚麼?建議用小寫英文、數字和底線,例如 `brand_refresh_2026`。

第三項:

> 第一個交接包由誰先發?預設由你這邊先發,因為你正在設置。若你想對方先發,直接說明即可。

## 4. 預設值確認

> 我會用以下預設值。若你接受,回覆「OK」。若要改,請指出要改哪一項。
>
> 一、你的 agent_id:根據你的名字或使用者資料夾生成。
> 二、對方的 agent_id:根據剛才的短名稱生成。
> 三、共用資料夾位置:使用你提供的雲端硬碟路徑。
> 四、共享權限:你需要親自在雲端硬碟中把資料夾分享給對方,並給予編輯權限。AI 不會代你更改雲端權限。

## 5. 檔案操作進度句

每一步只報一件事。

```text
正在建立共用資料夾。
正在建立協定資料夾。
正在寫入橋接規則包。
正在更新本項目的啟動規則。
正在記錄本項目的 APS 接駁資料。
```

0.2.0 pre-release package 會隨包提供 `resources/protocol/PROTOCOL.md` 與 `resources/protocol/templates/`。若執行環境缺少 PROTOCOL source,不要假裝已複製。使用以下阻擋句:

> 目前執行環境找不到 PROTOCOL source 檔案。這一步不能假裝完成。需要先確認 package 是否完整安裝,或由已驗證的 Hub template source 讀取。

## 6. 對方 starter pack

完成本機設置後,生成一份 markdown starter pack,位置建議:

```text
<hub_root>/<project_slug>/_hub/starter-pack-<other_agent_id>.md
```

聊天中輸出短訊:

> APS 這邊已設置好。Starter pack 已放在共用雲端資料夾的 `_hub` 子資料夾。你同步後打開該檔,按裡面的安裝指令在自己的工作目錄執行;完成後告訴我即可。

## 7. 首次 dry-run

> 我會用 CLI 建立一個測試交接包,只用來確認兩邊能否看見同一個共用資料夾。內容不包含正式工作資料。

指令形態:

```text
npx aps publish --hub-root "<hub_root>" --project <project_slug> --from <own_agent_id> --to <other_agent_id> --topic setup_test --body "APS setup test from <own_agent_id>."
```

完成後:

> 設置完成。測試交接包已建立。接下來等對方設置完成並回覆。之後你可以說「check Hub」或「Hub 有新嘢」,我會檢查對方是否有新交接包或確認訊號。

## 8. 不可承諾

- 不承諾直接發 WhatsApp。
- 不承諾更改雲端硬碟分享權限。
- 不承諾對方電腦已完成設置。
- 不承諾自然語言日常操作、補救流程或真實跨機 Google Drive 驗證已完成;目前只可說本地 CLI 最小往返已驗證。
- 不承諾 PROTOCOL source 可用;實作時必須先驗證 package 內 `resources/protocol/` 存在。
