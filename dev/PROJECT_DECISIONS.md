# Project Decisions Log

這個檔保存項目的長期演進、決策、架構取捨與學習觀察 narrative。屬 warm 資料層 —— AI 開工**不需要讀**本檔。

🔹 短期 single-task project：本檔保持近空，你不需要 maintain
🔹 長期持續演進項目：AI 會自動 maintain；當你問「我們之前為何這樣做」時，AI 會在這裡找答案

不需要你手動寫 —— AI 在收工時自動 update。

---

## Evolution Timeline

任務需求演進的長期 narrative。Newest first。AI 觀察到 substantive task evolution 時 append。

- 2026-05-28 — APS 的 post-0.2.6 方向從「多人協作、watch、通知、Contacts selector」收窄為 0.2.7 Reliable Pair：先把二人交接做到可依賴，再把 Contacts selector、`_notify`、`aps watch`、桌面通知、平台排程、正式 Dropbox / OneDrive 支援與多收件人封包延後。這次演進降低了落地風險，也避免公開文件過早承諾真正多人平台能力。

- 2026-05-26 — APS 在 0.2.0 pre-release 發布後，立即進入本地 0.2.1 候選硬化：CLI 從最小收發閉環擴展到可修訂、可撤回未讀封包、可只讀診斷 Hub；技能與公開文件同步標明「0.2.0 已發布、0.2.1 仍未發布」的邊界。這次演進把「出錯補救」從人工文件指引推進到可驗證命令，但仍需正式外發前檢、提交決策及後續自然語言操作演練，才可考慮發布。

- 2026-05-26 — APS 從只公開 `bridge-pack` 的 0.1.1 版本，推進到已發布的 0.2.0 pre-release：CLI 新增 Claude Code / Codex 技能安裝、Hub 骨架生成、最小 publish / inbox / consume / close 流程；技能文件完成 setup-first 與日常收發首稿；隔離技能演練、零認知 throw-away-folder 流程、正式外發前檢、全面檢、一次 Adam ↔ Jay 真實 Google Drive 跨機往返、GitHub pre-release、npm publish 與發布後讀回均已完成。下一個決策點不是發布，而是 pre-release 硬化：自然語言日常操作、補救流程、Layer D 文檔重定位，以及新真實項目的逐項 Drive 驗證。

## Decisions Archive

由 SESSION_HANDOFF.md 的「Confirmed Decisions」或同類 decisions section 累積至 30+ 時，AI 自動 split 落這裡的舊條目。Newest first。

(empty)

## Architecture Choices

主要架構取捨與 rationale。AI 在 plan 涉及 multi-option trade-off 時 append，並等用戶 confirm。

- 2026-05-28 — 選擇 Reliable Pair 先行，而不是立即做真正多人平台、Contacts selector、watch、通知或平台排程。理由：當前最有價值的產品風險在 AI 是否能穩定完成二人交接的讀設定、診斷、草稿、確認、發包、收件摘要、補資料與共識流程；在這條主線未穩前加入多人與通知層，會擴大權限、狀態、同步與使用者期望風險。Contacts selector 保留為日後體驗層，不改變底層單收件封包模型。

## Insights & Learnings

累積式學習、反思、觀察。AI 觀察到多 session 累積 pattern 時 append。

- 2026-05-28 — 當預估成功率低於約七成時，這不是單純開發難度，而是產品範圍風險。對 APS 這類面向非技術用戶的工具，可靠的二人閉環比早期多人平台更重要；公開文件與 QC 必須阻止「可研究」被寫成「已支援」。
