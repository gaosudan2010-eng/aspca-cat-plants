# AI Daily Site（高颜值日报网站）

一个可本地直接运行的静态 AI 日报站点，包含：

- 高颜值 UI（暗色玻璃质感 + Aurora 背景）
- 列表页 + 详情页
- 筛选：关键词 / 公司 / 优先级（P0-P2）/ 归档月份
- 归档：按月分组，支持点击月份快速筛选
- 数据结构：每篇日报支持 **5 条头条（事实 + 解读 + 机会点）** + 行动建议
- 内置示例日报：至少 2 篇（见 `data.js`）
- 可访问性：保留键盘可达、焦点可见、语义化标签、跳转主内容

---

## 文件结构

```text
ai-daily-site/
├── index.html      # 列表页（筛选 + 归档）
├── detail.html     # 详情页（5条头条 + 行动建议）
├── data.js         # 日报数据
├── styles.css      # 视觉样式
└── README.md
```

---

## 本地启动

```bash
cd /Users/sudandan/.openclaw/workspace/reports/ai-daily-site
python3 -m http.server 8787
```

## 访问地址

- 列表页：<http://127.0.0.1:8787/index.html>
- 详情页示例 1：<http://127.0.0.1:8787/detail.html?id=2026-03-05-openai-google-anthropic>
- 详情页示例 2：<http://127.0.0.1:8787/detail.html?id=2026-03-04-baidu-alibaba-bytedance>

---

## 数据结构说明

`data.js` 中 `window.AI_DAILY_DATA` 每条建议字段：

- `id`: 唯一 ID
- `date`: `YYYY-MM-DD`
- `title`: 日报标题
- `company`: 公司/主体
- `priority`: `P0 | P1 | P2`
- `tags`: 标签数组
- `summary`: 摘要
- `headlines`: 长度建议 5，每条含：
  - `fact`
  - `insight`
  - `opportunity`
- `actions`: 行动建议数组

> 详情页会按 5 条头条渲染；不足 5 条会自动补“待补充”占位，避免结构断裂。
