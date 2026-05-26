# APS skill 對話 script — first draft

**日期:** 2026-05-23
**作者:** Adam Chan(本項目維護者)+ Claude Code(協同作者)
**狀態:** 長版維護稿 — Section 1-6 中文版 first draft;Section 7 英文版待後續 expand。此文件是 repo 內 dialogue companion 與目標體驗草稿,不是目前公開 npm CLI 已支援的 runtime 承諾。本地開發版 CLI 已通過最小 `publish` / `inbox` / `consume` / `close` 往返測試,但技能內自然語言操作與真實跨機 Google Drive 驗證仍未完成。npm package runtime 可讀之精簡 setup wording bank 已另放於 `skills/aps/references/setup-dialogue.md`。

---

## 用途

此文件為 `skills/aps/SKILL.md` 的長版 dialogue companion。SKILL.md body 屬 orchestration spec(對 Claude 的 instructions),此文件屬 repo 內長版 wording bank(對 Claude 的 wording reference)。兩者分工:SKILL.md 講「做甚麼 + 順序」,本文件講「具體怎樣說」。因 npm package 不 ship `docs/plans/`,實際隨 package 可讀之 setup 精簡稿須放在 `skills/aps/references/setup-dialogue.md`。

---

## 語言 + 語氣總則

- 一律當代繁體書面語。
- 第三人稱解釋當前處理(不用「我哋」「呢個」「嗰陣」等粵語色彩)。
- 句句自足(每一句獨立讀都成立、用戶讀完即知意義)。
- 不堆內部編號做主語(「Phase X」「Layer C」做 sentence 主體一律改寫)。
- 粵語 colloquial 字詞僅容於兩處:(a) verbatim 引述用戶原話的觸發短語(`「Hub 有新嘢」`、`「check Hub」` 等);(b) skill 為用戶生成的 WhatsApp 短訊 sample(配合用戶實際傳訊習慣)。其他位置一律書面語。
- Jargon(`packet` / `ack` / `lane` / `starter pack` 等)首次出現即括弧內一句平實定義(just-in-time inline)。

---

## 1. 設置子流程對話

### 1.1 起手 — Greeting + intent confirm

> 收到。我會帶你由零開始安裝 AI Public Squares — 此 skill 的全名,後面我會用「APS」簡寫。簡單講:我們會在你的電腦與對方的電腦之間,設立一個共用的雲端資料夾,作為兩部 AI 之間的中轉站。你發出一份檔案,對方那一邊就會收到;對方完成之後,你這邊就會見到對方的更新。
>
> 整個過程大約 10 至 15 分鐘,主要是你回答幾條問題,其餘檔案操作我自動處理。開始之前,我想先確認三件事:
>
> 一、你的雲端硬碟(例如 Google Drive 桌面版、OneDrive 等)是否已經安裝好、可以打開檔案?
> 二、你是否已經與對方溝通過用 APS,雙方都同意進行?
> 三、你想用哪一個雲端硬碟作為中轉?Google Drive、OneDrive,還是其他?
>
> 如果第二項你還未與對方溝通過,我建議你先傳一句給對方,例如:「我想我哋兩部機之間搞個 AI 對 AI 嘅協作機制,我會由我嗰邊先裝,大約 15 分鐘後 send 你一份 starter pack 連幾條 install 指令,你照做就得。」溝通完之後我再繼續。

### 1.2 先決條件 interactive 檢查

> 好,你已經與對方溝通過、雲端硬碟用的是 Google Drive。下一步我要快速確認兩件事:
>
> 第一件:Claude Code(也就是你現在使用的這個介面)。這一項已經就緒,我看到你在線。✓
>
> 第二件:Agent Handoff Kit。這是一個輔助 governance 工具,APS 需要以它作為底層基礎。如果你之前在其他項目用過「跟 Claude 持續合作」「跨 session 接駁」這類 workflow,通常已經安裝過。讓我檢查一下你項目目錄的 governance 文件 ── *[skill 用 Read tool 檢查 `AGENTS.md` 是否存在 + 開頭是否屬 kit-managed core]*。
>
> **分支 [A] — 已 init 過 ✓**:我繼續下一步。
>
> **分支 [B] — 尚未 init ✗**:你需要先跑一條命令安裝並 init kit:
>
> ```
> npx @adamchanadam/agent-handoff-kit@latest init
> ```
>
> 安裝指令的官方文檔在 [Agent Handoff Kit GitHub](https://github.com/Adamchanadam/agent-handoff-kit)。跑完之後告訴我「init 好了」,我再繼續。

### 1.3 T0 三項拍板

> 先決條件全部就緒。接下來是設置的核心:三件事需要你決定,每件大約 10 至 20 秒。
>
> **第一件 — 對方是誰?**
>
> 我需要兩個小資料:對方的名字(短一點就行,例如「Jay」「Sarah」,後面我會用它生成檔名 identifier);加上對方那部電腦的雲端硬碟根目錄路徑。第二項你可以稍後補,我會在 starter pack 內留位給對方自行填寫。請告訴我對方的名字。
>
> *[User: 「Jay」]*
>
> 收到,對方叫 Jay。
>
> **第二件 — 項目代號?**
>
> 你與 Jay 將合作的這個項目,我們要起一個短代號(用作雲端資料夾內的子文件夾名 + packet ID 的一部分)。建議全小寫英文 + 連字號,例如「mpedu-plus」「brand-refresh-2026」。請給我一個。
>
> *[User: 「brand-refresh」]*
>
> 收到,項目代號是 brand-refresh。
>
> **第三件 — 第一個 packet 由誰先發?**
>
> 跨機合作的第一輪需要其中一方先發出一個檔案做啟動。預設是你這邊先發(因為你正在裝),但如果你想 Jay 那邊先發,告訴我。
>
> *[User: 「我先」]*
>
> 好,你先發第一個 packet。

### 1.4 默認 4 件確認

> 三件主要事決定完成。另外有四件我會用預設值,如果你覺得 OK 就直接行,有意見告訴我:
>
> 一、你的 agent_id:預設用「adam」(取自你電腦 user folder 的名字)。
> 二、Jay 的 agent_id:預設用「jay」(取自你剛才告訴我的名字,全小寫)。
> 三、雲端硬碟掛載盤:預設用 Google Drive 桌面版的標準路徑「G:\我的雲端硬碟」(Windows 標準)。如果你的 Google Drive 掛載在不同的盤(例如「H:」或「My Drive」)告訴我。
> 四、Drive 共享權限:預設你建立的項目資料夾,你需要手動 share 給 Jay(編輯權限)。Skill 無法代你 share — 這一步要你自己在 Google Drive 網頁版操作。
>
> 預設 OK 嗎?(回「OK」「yes」「同意」等)或有任一件想改?告訴我哪一件 + 想改成甚麼。

### 1.5 執行檔案操作 + 進度回報

> 收到,預設全部接納。我現在開始執行設置,大約 30 秒至 1 分鐘:
>
> ⏳ 在你的雲端硬碟根目錄建立項目資料夾「brand-refresh」...
> ⏳ 建立子資料夾 `_hub` / `from_adam` / `from_jay` / `_ack` ...
> ⏳ 複製 PROTOCOL.md v1.0 到 `_hub` ...
> ⏳ 在你的項目目錄加 Bridge Pack 到 `dev/rules/aps-bridge.md` ...
> ⏳ 修改 `AGENTS.md` 加 APS routing 行 ...
> ⏳ 在 `SESSION_HANDOFF.md` 的 Durable Anchors 加 APS 接駁 entry ...
>
> 全部完成。✓

### 1.6 跨方 packaging — starter pack + WhatsApp 短訊

> 下一步是生成 Jay 的 starter pack(我自動為對方生成的安裝指引 + 已決定的代號 + Bridge Pack 副本一份)。目前目標格式是一份 markdown 指引,寫到雲端硬碟 `_hub` 內;若日後真的需要 zip,須先在 CLI 中實作並測試。
>
> 我亦會生成一段 WhatsApp 短訊,你 copy 後傳給 Jay,告訴他 starter pack 在哪 + 大致怎做:
>
> > 「APS 嗰邊我裝好咗。Starter pack 我已經放喺 Google Drive 我哋共用個 brand-refresh 資料夾入面的 `_hub` 子資料夾,你 sync 一陣就見到。內有 install 指令,你跑完之後喺 Claude Code 講『我同 Adam 一齊裝 APS』就會自動接續。有問題即傳我。」
>
> 以下是要傳給 Jay 的短訊。請手動複製後傳送;skill 不承諾直接操作系統 clipboard。

### 1.7 首次 dry-run + 收尾

> 設置完成 ✓。Starter pack 已 ship 到雲端硬碟,WhatsApp 短訊已準備好。
>
> 我想用一個 dry-run 確認接駁無問題:我會用 `npx aps publish` 生成一個 test packet(一個示範用的小交接包,內容:「APS 設置完成,這是第一個 test packet,正在等待對方收到並 ack(對方回的『收到』訊號)」),寫入 `from_adam/packets/` 並追加 `from_adam/outbox.log.md`。
>
> ⏳ 已寫入。包件 ID:`20260526T150306Z__setup_test` v1
>
> 接下來等對方那邊裝完、收到後回一個 ack,你就知道整條鏈通了。
>
> 暫時可以做的全部完成。等對方那邊完成之後,你可以回來說「check Hub」「Hub 有新嘢」「Jay 嗰邊有冇新嘢」等,我就會 route 到收件子流程,幫你看 Jay 的 ack 與最新 packet。

---

## 2. 發佈子流程對話

> 收到。你想交給 Jay 一份東西,我會用 APS CLI 包成一個 packet folder,寫入雲端硬碟的 `from_adam/packets/`,並在 `from_adam/outbox.log.md` 追加發佈記錄。Jay 那邊同步之後就會見到。
>
> 你想交給 Jay 的內容是甚麼?可以是:
> - 一份檔案 — 拖入此對話、或告訴我檔案路徑,我自動 copy
> - 一段文字 — 直接 paste 在對話內,我寫入 packet body
> - 兩者混合 — 告訴我,我打包
>
> 同時告訴我一個短 topic(例如「品牌指引 v2 draft」「Q1 文案修訂」)。我會轉成 lower_snake_case,用作 packet ID 的題目部分。
>
> *[User: 「Q1 文案 draft 1 我做完了,subject 叫『Q1 文案 draft 1』。內容係下面這段:[paste]」]*
>
> 收到,打包開始:
>
> ⏳ 將題目轉成 topic:`q1_copy_draft_1`
> ⏳ 執行 CLI:`npx aps publish --hub-root "<hub_root>" --project brand_refresh --from adam --to jay --topic q1_copy_draft_1 --body "<你提供的內容>"`
> ⏳ CLI 已建立 packet folder,並追加 `from_adam/outbox.log.md`
>
> 完成 ✓
>
> Packet ID:`20260526T150306Z__q1_copy_draft_1` v1
> 位置:`<hub_root>/brand_refresh/from_adam/packets/20260526T150306Z__q1_copy_draft_1__v1/packet.md`
>
> WhatsApp 短訊:
>
> > 「Jay,Q1 文案 draft 1 我啱啱 publish 咗去 APS Hub,你 sync 一陣就見到。Subject 係『Q1 文案 draft 1』,你方便嘅時候 review 完返一個 ack 我知就 OK 啦。」
>
> 等 Jay 那邊 ack 之後,你可以說「check Hub」或「Jay 嗰邊有冇 ack」,我會 route 到收件子流程。

---

## 3. 收件子流程對話

> 收到。我會用 CLI 檢查 Jay 的 outbox,並比對你自己的消化記錄。
>
> ⏳ 執行 CLI:`npx aps inbox --hub-root "<hub_root>" --project brand_refresh --agent-id adam --other-agent-id jay`
>
> 結果:
>
> **新 packet:1 件**
> - `20260526T164500Z__q1_copy_review` v1
>   - From: Jay → To: Adam
>   - Scope: Q1 文案 review feedback
>   - Version: 1 / 寫於 2026-05-23 16:45(UTC)— 距今約 25 分鐘前
>
> **新 ack:1 件**
> - Jay 確認收到你之前的 packet `20260526T150306Z__q1_copy_draft_1`(Q1 文案 draft 1)
> - Ack 時間 2026-05-23 16:40(UTC)
>
> Packet 內容預覽(頭 200 字):
>
> > 「Q1 文案 draft 1 已 review。整體 framing OK,以下三處建議調整:1. 第二段嘅 hook 想用更具體嘅 example...(下略)」
>
> 想我做甚麼?
> - **全部讀完** — 顯示完整 packet 內容,然後我寫一個 ack 入 `_ack/adam.ack.json` 確認你收到
> - **稍後讀** — 只 mark 為「已知 + 未消化」,等你之後再回來
> - **跳過** — 不 ack(只有當你想對方先撤回 packet 時才用此選項)
>
> *[User: 「全部讀完」]*
>
> *[完整 packet body 顯示]*
>
> ✓ 已消化:執行 `npx aps consume --hub-root "<hub_root>" --project brand_refresh --agent-id adam --packet-id 20260526T164500Z__q1_copy_review --version 1 --result "Read Q1 copy review feedback"`;`_ack/adam.ack.json` 已加入一行 consumed 記錄
> ⏳ Drive sync 中,Jay 那邊預計 1-3 分鐘後同步到此 ack
>
> 你接下來可能想:
> - 改 Q1 文案 draft 2 之後,告訴我「我有 draft 2 給 Jay」,我會 route 到發佈子流程
> - 暫停消化 review feedback,直接告訴我即可

---

## 4. 補救子流程 + 5 種 failure mode

### 4.1 起手 triage

> 收到。你提到有問題,我先快速診斷是哪一類:
>
> 1. **同步問題** — 你 publish 之後,Jay 一段時間後仍未見到 packet;或 Jay publish 之後,你 check Hub 仍未見;或 Drive 桌面版 sync icon 一直 spinning
> 2. **Conflict 問題** — Drive 顯示 lock file(`~$xxx.md`)或某檔案存在兩個 version
> 3. **Wrong-lane 問題** — 你或 Jay 將 packet 寫入錯了對方 lane(例如本應寫 `from_adam`,寫成 `from_jay`)
> 4. **Packet 格式問題** — 我或 Jay 那邊嘗試讀 packet 時,header 缺欄、body 損壞
> 5. **版本不對齊** — Bridge Pack 你與 Jay 兩邊不同 version,某條 routing 行為不一致
>
> 哪一類最像你現在撞到的?或者告訴我 Jay 撞到的具體錯誤訊息,我幫你 match。

### 4.2 Mode 1 — 同步問題

> *[User: 「我 publish 完已經 10 分鐘,Jay 話他那邊仍未見」]*
>
> 收到。同步延遲超過 5 分鐘是不正常的,可能有三種原因。
>
> 第一種 — 你這邊 Drive 桌面版尚未真正上載完。讓我看一下你最新 packet folder 的同步狀態。
>
> ⏳ Read `<hub_root>/brand_refresh/from_adam/packets/20260526T150306Z__q1_copy_draft_1__v1/packet.md` 並比對 mtime 與 Drive 之 sync 狀態...
>
> 結果:packet mtime 2026-05-23 14:23,當前時間 2026-05-23 14:33。Drive icon 顯示「pending upload」 — 即你這邊的 upload 仍未完成。
>
> **建議行動:** 在 Drive 桌面版右鍵 →「立即同步」,或在你的網絡狀況穩定後再等 2-3 分鐘。我可以等你,準備好之後告訴我「重 check」即可。
>
> 第二、第三種原因(Jay 那邊未開 offline-available / Jay 部機 Drive sync 停了)若上面 check 完仍未解決,我會接著 diagnose。

### 4.3 Mode 2 — Conflict

> *[User: 「Drive 顯示 lock file `~$packet-xxx.md`」]*
>
> 收到。Lock file(`~$xxx.md`)出現代表某一邊的 app 正在開啟該檔案。可能原因:
>
> - 你或 Jay 在對方仍未完成寫入時打開了檔案 review
> - 兩邊同時 publish 到同一 lane(極少數情況)
>
> 建議行動:關閉自己這邊所有打開了該檔案的 app(VS Code / Notepad 等);等 1-2 分鐘讓 Drive 自動 release lock。若仍在,我只會先列出 cleanup 計劃、目標路徑與影響範圍,取得你明確同意後才可處理。

### 4.4 Mode 3 — Wrong-lane

> *[User: 「我見到 `from_jay/` 內有一個 packet,但 sender 係 adam,我估自己寫錯地方」]*
>
> 收到。Wrong-lane 寫入會令 routing 失效 — Jay 那邊的 check Hub 不會 surface 此 packet。修正前我會先列出計劃:
>
> 1. 我幫你 read 該 packet,確認 header 內 sender 確實是 adam
> 2. 列出來源路徑與目標路徑,說明移動後哪一邊會看見此 packet
> 3. 通知 Jay 此 packet 原本應該在 `from_adam`,等 Drive sync
>
> 你確認之後,我才會做檔案移動;未確認前不改任何檔案。

### 4.5 Mode 4 — Packet 格式錯誤

> *[User: 「Jay 話他讀 packet 時 error」]*
>
> 收到。Packet 格式錯誤通常源於 header 缺欄或 body 損壞。我先 read 該 packet 看哪一處出錯。
>
> ⏳ *[skill 用 Read tool 檢視 packet]*
>
> 結果:packet header 缺 `version` 欄(本應為 `version: 1`)。可能 publish 時 packet 生成中途被中斷。
>
> **建議行動:** 優先由原發包一方用 `npx aps publish` 重發一個新 packet,不要直接改已發佈 packet。若需要標記舊有損壞 packet,我會先列出路徑與改名方案,取得你明確同意後才處理。

### 4.6 Mode 5 — 版本不對齊

> *[User: 「Jay 話他那邊 Bridge Pack 係 v0.9,我這邊係 v1.0,某 routing 行為唔同」]*
>
> 收到。兩邊不對齊會導致某些觸發短語或 routing 行為不一致。標準做法是雙方升級到同一版本。
>
> 我這邊是 v1.0,Jay 那邊是 v0.9。建議 Jay 跑:
>
> ```
> 目前尚未提供自動 update 命令。請先使用雙方確認過的同一份 Bridge Pack fixture;若 package 發佈後有正式更新命令,再依當時 README 或 release note 執行。
> ```
>
> 升級之後 v0.9 → v1.0,再驗證:雙方 Claude Code 重啟一次 session,確認觸發短語一致。
>
> 我可以為你生成一段 WhatsApp 短訊告訴 Jay 怎做嗎?

### 4.7 6 件 skill 不可代用戶執行的事(全程堅守)

1. WhatsApp 短訊由用戶手動發 — skill 只生成短訊文本
2. 對方電腦的 onboarding 不在當前 session 範圍 — 對方要在自己的 Claude Code 觸發 skill
3. 雲端硬碟同步延遲由用戶等 — skill 只 surface 狀態,不能加速 OS / Drive sync
4. Packet 內容由用戶 review 後寫入 — skill 不自行 paraphrase 用戶提供的 content
5. Sensitive payload 路由由用戶決定 — skill 偵測 credentials / API key / unredacted PII 即停手 + 提示改用 out-of-band channel
6. PROTOCOL.md 升級 sign-off 由用戶 review CHANGELOG — skill 偵測新版本即提示,不自行 apply

---

## 5. 概念 inject 順序圖

| 概念 | 首次在哪節 surface | 平實一句定義 |
|---|---|---|
| 中轉站 / 共用資料夾 / Hub | 1.1 | 「在你的電腦與對方的電腦之間,設立一個共用的雲端資料夾,作為兩部 AI 之間的中轉站」 |
| Governance 工具 / Agent Handoff Kit | 1.2 | 「APS 需要以它作為底層基礎的輔助 governance 工具」(僅在未 init 時 surface) |
| 對方名字 / agent_id | 1.3 第一件 | 「對方的名字,後面生成檔名 identifier」 |
| 項目代號 / slug | 1.3 第二件 | 「雲端資料夾內的子文件夾名 + packet ID 的一部分」 |
| Packet | 1.3 第三件 implicit + 1.5 + 2 | 「我打包成一個 packet 寫入雲端硬碟」(@2) |
| Lane / `from_adam` / `from_jay` / `_ack` | 1.5 進度回報 | file op trace 內 visible(`_hub/from_adam` 等 path) |
| Bridge Pack | 1.5 | 「在你的項目目錄加 Bridge Pack 到 `dev/rules/aps-bridge.md`」 |
| Starter pack | 1.6 | 「我自動為對方生成的安裝指引 + 已決定的代號 + Bridge Pack 副本一份」 |
| Test packet | 1.7 | 「一個示範用的小檔案,用來確認接駁鏈通暢」 |
| Ack | 1.7 + 2 結尾 + 3 主流程 | 「對方回的『收到』訊號」 |

---

## 6. 語氣指南(做與不做)

| 做 | 不做 |
|---|---|
| 句句自足 — 每句獨立讀都成立 | 堆內部編號做主語(「Phase X」「Layer C」做 sentence 主體) |
| 解釋接住意義不分開 — 概念出現之同句即補一句平實定義 | 假設用戶已知 jargon 而不解釋(`packet` / `ack` / `lane` 首次出現未定義) |
| Destructive 操作 confirm 之後才執行 | 默默 file op,無告知用戶當下進行甚麼 |
| 進度可見 — ⏳ 標記每個 sub-step | 一次性 wall-of-text instructions,無 turn-taking |
| Verbatim 引述用戶 / 外部 content,粵 colloquial 保留 | Skill 自身 explanation 用粵 colloquial「嘅 / 呢個 / 嗰 / 咗 / 唔」 |
| WhatsApp 短訊 sample 可用粵語(配合用戶實際傳訊習慣) | 真實對話 wording 一律當代繁體書面語 |
| 拒絕代用戶執行 6 件不可自動的事 | 自行決定 sensitive payload 應否經 Hub |

---

## 7. 英文版對應(defer)

待中文版 Section 1-6 voice locked 之後,整份做 English translation pass(預計 100-150 行 expand)。

預期挑戰:

- 英文無粵 / 書面 register tension,voice rule 比中文簡單。
- `starter pack` / `packet` / `ack` jargon 原本就是英文,中文版用 inline 定義策略可直接套用。
- WhatsApp short message sample 的 register — English version 是否同樣 casual(配合 Adam 與英文 partner 之 register)抑或全 formal,留待後續 voice review。

---

## Cross-link

- `skills/aps/SKILL.md` — SKILL.md body 之 orchestration spec 對應此 dialogue script
- `dev/qc/2026-05-22-zero-knowledge-funnel-audit.md` §6 — 對話 craft carve-out 之設計理據
- `docs/plans/2026-05-21-aps-phase4-plan.md` T0-T6 — 設置子流程之 file-op step spec
- `docs/guides/aps-onboarding-walkthrough.html` §3-§10 — 詳細設置教學(維護者層)
- Hub 上的 `_hub/PROTOCOL.md` v1.0 — packet / lane / ack 之契約

---

## 文件歷史

- 2026-05-23(初版)— Section 1-6 中文版 first draft;Section 7 英文版待後續 expand。Voice 規矩經 4 輪 iterate 鎖定(setup tweak / WhatsApp 短訊放寬 / jargon inline 定義 / 補救子流程 strict 書面)。
