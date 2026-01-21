---
title: 管理你的 AI 环境
subtitle: 掌控模型、账单与身份
course: OpenCode 中文实战课
stage: 第二阶段
lesson: "2.5"
duration: 10 分钟
practice: 5 分钟
level: 新手
description: 学会查看可用模型列表、检查 Token 消耗统计、管理身份凭证，做自己环境的主人。
tags:
  - 命令行
  - 统计
  - 模型管理
  - 账单
prerequisite:
  - 1.4 连接模型
---

# 管理你的 AI 环境

## 📝 课程笔记

本课核心知识点整理：

<img src="/images/2-daily/env-management-notes.mini.jpeg" 
     alt="管理你的 AI 环境学霸笔记" 
     data-zoom-src="/images/2-daily/env-management-notes.jpeg" />

---

## 学完你能做什么

- 👀 不进 TUI 也能快速查看到底有哪些模型可用
- 💰 知道自己用了多少 Token，哪个模型最烧钱
- 🔑 清楚自己登录了哪些账号，并能随时登出
- 🔄 当配置不生效时，知道怎么刷新缓存

---

## 1. 查看可用模型

当你配置了多个提供商（比如同时用了 DeepSeek 和 Claude），或者添加了新的 Key，你可能会问："我现在到底能用哪些模型？"

### 终端命令：`opencode models`

在终端直接运行：

```bash
opencode models
```

你会看到类似这样的列表：

```text
opencode/glm-4.7-free
anthropic/claude-3-5-sonnet-20241022
google/gemini-2.0-flash
ollama/deepseek-r1:7b
zhipuai-coding-plan/glm-4.7
...
```

每一行都是一个**模型 ID**（格式为 `提供商/模型名`）。你可以直接复制这个 ID，在启动时指定：

```bash
# 比如直接用智谱 GLM-4.7 启动
opencode --model zhipuai-coding-plan/glm-4.7
```

### 进阶技巧 1：只看特定厂商

列表太长眼花缭乱？你可以直接指定厂商名字：

```bash
# 只看 Anthropic 的模型
opencode models anthropic

# 只看 DeepSeek 的模型（前提是你已配置）
opencode models deepseek
```

这样就清爽多了，只显示你关心的模型。

### 进阶技巧 2：查看价格（查单价）

想知道某个模型具体的定价？加上 `--verbose` 参数：

```bash
opencode models --verbose
```

输出会包含详细的元数据，包括 `inputCost`（输入价格）和 `outputCost`（输出价格）：

```json
zhipuai-coding-plan/glm-4.7
{
  "id": "zhipuai-coding-plan/glm-4.7",
  "name": "GLM 4.7",
  "provider": "zhipuai-coding-plan",
  "inputCost": 0,    // 0元！
  "outputCost": 0    // 0元！
}
```

### 进阶技巧 3：刷新缓存

::: tip 💡 为什么我配了 Key 却没看到模型？
OpenCode 会缓存模型列表。如果你刚在 `opencode.json` 里加了新配置，或者刚申请了新模型的权限（例如刚下载了新的 Ollama 模型），列表可能没及时更新。
:::

这时候，你需要**强制刷新**：

```bash
opencode models --refresh
```

看到 `Models cache refreshed` 提示后，再运行 `opencode models` 就能看到了。

### 关键一步：把心仪的模型设为默认

查到了想用的模型 ID（例如 `zhipuai-coding-plan/glm-4.7`），总不能每次启动都手敲一遍吧？

打开你的配置文件（通常在 `~/.config/opencode/opencode.json`），把它填进去：

```json
{
  "model": "zhipuai-coding-plan/glm-4.7"
}
```

这样，下次直接输入 `opencode`，就是用你最爱的模型启动了。

---

## 2. 算算账：查看使用统计

"我这个月写代码用了多少钱？" "Claude 和 GPT-4 哪个我用得多？"

OpenCode 内置了一个漂亮的统计面板。

### 终端命令：`opencode stats`

运行：

```bash
opencode stats
```

你会看到一个详细的仪表盘。这是我使用了一个月后的真实数据：

```text
┌────────────────────────────────────────────────────────┐
│                       OVERVIEW                         │
├────────────────────────────────────────────────────────┤
│Sessions                                           948 │
│Messages                                        30,575 │
│Days                                                29 │
└────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────┐
│                    COST & TOKENS                       │
├────────────────────────────────────────────────────────┤
│Total Cost                                    $1232.56 │
│Avg Cost/Day                                    $42.50 │
│Input                                           530.6M │
│Output                                            9.9M │
│Cache Read                                      703.0M │
└────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────┐
│                      TOOL USAGE                        │
├────────────────────────────────────────────────────────┤
│ read               ████████████████████ 7270 (34.3%)   │
│ bash               ███████████          4074 (19.2%)   │
│ edit               ████████             3007 (14.2%)   │
└────────────────────────────────────────────────────────┘
```

### 关键指标解读

对于小白来说，只需要关注这几个数字：

1.  **Total Cost**：估算的美元费用。OpenCode 会根据各家厂商的公开定价计算。
2.  **Input vs Output**：
    *   `Input`（输入）：你发给 AI 的内容 + AI 读取的文件内容。量大但便宜。
    *   `Output`（输出）：AI 写的代码和回复。量小但贵。
3.  **Cache Read (上下文缓存)**：🔥 **核心省钱指标**！
    *   这是 OpenCode 帮你省下的钱。
    *   当你连续对话时，重复的文件内容会被缓存。
    *   `703.0M` 意味着有 7 亿 token 是直接读缓存的（费用通常只有输入的 1/10），大大降低了使用成本。

4.  **Tool Usage**：
    *   展示了 AI 最爱用什么工具。
    *   `read` (读文件) 通常排第一，说明 AI 在努力理解你的代码。
    *   `bash` (运行命令) 和 `edit` (改代码) 也是主力工具。

### 进阶：项目独立统计（需 Git）

::: info ☕ 给非程序员的建议
如果你**不懂 Git**，或者觉得"所有账单混在一起算"也没关系，**可以直接跳过这一节！**
这一节是为那些需要把"公司项目"和"私人项目"账单分得清清楚楚的进阶用户准备的。
:::

默认情况下，`opencode stats` 显示的是你所有项目的**总账单**。

如果你在一个 **Git 项目**里，想查看**仅属于该项目**的费用，可以加上 `--project ""` 参数：

```bash
# 只看当前项目的统计
opencode stats --project ""
```

**真实案例对比**（我正在 `opencode` 源码仓库中运行）：
- 我运行 `opencode stats`（总账）：显示花费 **$1232**。
- 我运行 `opencode stats --project ""`（当前 Git 项目）：显示花费 **$923**。

这意味着我有约 $300 的花费是在其他项目（或 Global 区域）里产生的。

::: tip 💡 核心逻辑：什么算一个“项目”？
OpenCode 依靠 Git 仓库的**第一条提交记录**来识别项目。
- **Project（独立账单）**：拥有至少一个 Commit 的 Git 仓库。
- **Global（全局账单）**：除此之外的所有情况（普通文件夹、空 Git 仓库）。

**⚠️ 避坑指南**：
如果你在普通文件夹下运行 `opencode stats --project ""`，显示的金额是**本机所有 Global 操作的总和**（比如你在 Downloads、Desktop 等所有非 Git 目录的消耗都会算在一起），而不仅仅是当前文件夹的消耗。

**想开启独立记账？**
只需三步（**不需要关联 GitHub，本地仓库即可**）：
1. `git init`
2. `git add .`
3. `git commit -m "init"` 👈 **这一步至关重要！**
:::

### 💡 隐藏功能：账单会自动"追溯"

你可能会担心："我在这个文件夹里已经写了好几天代码，花了不少 Token，但一直没用 Git。现在才初始化仓库，之前的账单是不是就丢了？"

OpenCode 比你想的更智能：**它会自动过户！**

当你在一个文件夹里成功创建 Git 项目（并提交）后，OpenCode 会自动扫描"全局账本"，把所有**属于这个文件夹路径**的历史会话，统统"过户"到这个新项目名下。

所以，放心大胆地用，不用纠结是"先开会员"还是"先买东西"的问题。

---

### 看看谁是"吃 Token 大户"

想知道哪个模型花了你最多钱？运行：

```bash
# 显示消耗最高的 5 个模型
opencode stats --models 5

# 显示所有模型的详细列表
opencode stats --models
```

这会列出 Top 5 的详细账单：

```text
┌────────────────────────────────────────────────────────┐
│                      MODEL USAGE                       │
├────────────────────────────────────────────────────────┤
│ anthropic/claude-opus-4-5-20251101                     │
│  Messages                                       12,548 │
│  Input Tokens                                   241.0M │
│  Cost                                       $1232.5613 │
├────────────────────────────────────────────────────────┤
│ zhipuai-coding-plan/glm-4.7                            │
│  Messages                                        3,023 │
│  Input Tokens                                    68.9M │
│  Cost                                          $0.0000 │
├────────────────────────────────────────────────────────┤
```

**一眼就能看出区别**：
- **Claude Opus**：按量计费，虽然强但真贵，烧了我 $1232。
- **智谱 GLM-4.7**：显示 $0.0000，**是因为我购买了 Coding Plan 包月套餐**。

::: tip 💡 省钱策略
这就是 OpenCode 统计功能的意义——它告诉你钱花哪儿了。
如果你发现某个模型用量巨大且昂贵，可以考虑换成支持包月的模型（如智谱）作为主力，把昂贵的按量模型留给最难的问题。
:::

所以，定期检查这个统计，能帮你优化模型组合，省下真金白银。

### 进阶技巧：只看最近几天的消耗

默认情况下，`stats` 显示的是历史累计总账。但你可能更关心："我今天花了多少？"或者"这周那个新模型烧了我多少钱？"

使用 `--days` 参数可以指定天数：

```bash
# 只看过去 24 小时的统计
opencode stats --days 1

# 查看最近 7 天
opencode stats --days 7
```

**🔥 强力组合技**：

把“时间限制”和“模型统计”结合起来，就能精准定位近期的"花钱大户"：

```bash
# 看看今天到底是谁在花钱（列出过去24小时的模型消耗）
opencode stats --days 1 --models
```

---

## 3. 查户口：管理身份凭证

随着时间推移，你可能试过很多模型，配置了很多 Key。现在你的 OpenCode 里到底存了哪些凭证？

### 查看凭证列表

```bash
opencode auth list
```

你会看到类似这样的树状图：

```text
Credentials ~/.local/share/opencode/auth.json
┌
●  Zhipu AI Coding Plan  api
│
●  Google  oauth
│
●  OpenAI  oauth
│
└  3 credentials
```

这个命令会告诉你：
1.  **认证方式**：
    *   `api`：通过输入 `sk-...` 密钥添加的。
    *   `oauth`：通过网页跳转登录授权的（如 Google, OpenAI）。
2.  **存储位置**：通常在 `~/.local/share/opencode/auth.json`。
    ::: warning ⚠️ 安全提示
    该文件以**明文 JSON 格式**存储你的 Key，请务必保护好你的电脑和该文件，不要将其上传到公开的代码仓库。
    :::

### 登出/删除凭证

如果你想删除某个旧的 Key（例如 key 泄露了或者过期了）：

```bash
opencode auth logout
```

然后按 <kbd>↑</kbd> <kbd>↓</kbd> 选择要删除的提供商，回车确认。

---

## 4. TUI 里的对应操作

以上都是在**终端**（不进入 OpenCode 界面）时的操作。如果你已经在 OpenCode 里了，也有对应的快捷指令：

| 你想做什么 | 终端命令              | TUI 斜杠命令            |
| ---------- | --------------------- | ----------------------- |
| 切换模型   | `opencode -m <id>`    | `/model` (或 `/models`) |
| 登录账号   | `opencode auth login` | `/connect`              |
| 查看统计   | `opencode stats`      | `/stats` (仅显示简报)   |
| 退出程序   | `Ctrl+C`              | `/exit`                 |

::: info 区别
TUI 里的 `/model` 命令不仅能看，还能**直接切换**当前会话的模型。
:::

---

## 检查点 ✅

- [ ] 运行 `opencode models`，确认看到了你配置的模型
- [ ] 运行 `opencode stats`，看了一眼自己的 Token 消耗（是不是比想象中少？）
- [ ] 运行 `opencode auth list`，清理掉不需要的旧凭证

---

## 附录：源码参考

<details>
<summary><strong>点击展开查看源码位置</strong></summary>

> 更新时间：2026-01-19

| 功能 | 文件路径 | 行号 |
|-----|---------|------|
| **查看模型** | [`src/cli/cmd/models.ts`](https://github.com/anomalyco/opencode/blob/dev/packages/opencode/src/cli/cmd/models.ts) | 全文件 |
| **统计逻辑** | [`src/cli/cmd/stats.ts`](https://github.com/anomalyco/opencode/blob/dev/packages/opencode/src/cli/cmd/stats.ts) | 107-301 |
| **项目 ID 识别** | [`src/project/project.ts`](https://github.com/anomalyco/opencode/blob/dev/packages/opencode/src/project/project.ts) | 50-170 |
| **Auth 列表** | [`src/cli/cmd/auth.ts`](https://github.com/anomalyco/opencode/blob/dev/packages/opencode/src/cli/cmd/auth.ts) | 170-215 |
| **Auth 存储** | [`src/auth/index.ts`](https://github.com/anomalyco/opencode/blob/dev/packages/opencode/src/auth/index.ts) | 38-73 |

**关键逻辑解析**：

1.  **项目 ID 生成 (`project.ts`)**：
    *   OpenCode 会向上查找 `.git` 目录。
    *   如果找到，尝试获取 `root commit` 哈希作为项目 ID。
    *   如果没有 `.git` 或没有 commit，则回退 ID 为 `"global"`。这就是为什么空文件夹共享同一个全局账单。

2.  **账单迁移机制 (`project.ts`)**：
    *   当 OpenCode 检测到当前项目 ID 不是 `global` 时，会触发 `migrateFromGlobal`。
    *   它会遍历所有 Global 会话，检查 `session.directory` 是否匹配当前工作区。
    *   如果匹配，自动将该会话的 `projectID` 更新为新项目的 ID，实现"账单过户"。

3.  **统计过滤 (`stats.ts`)**：
    *   默认情况下 (`projectFilter` 未定义)，统计所有 Session。
    *   只有显式传入 `--project ""`，才会调用 `getCurrentProject()` 获取当前目录 ID 并过滤。

3.  **凭证存储 (`auth/index.ts`)**：
    *   凭证存储在 `~/.local/share/opencode/auth.json`。
    *   代码直接使用 `JSON.stringify` 写入，未加密。
    *   仅设置了文件权限 `0o600`（仅当前用户可读写）作为安全措施。

</details>


环境管理好了，第二阶段的学习也到此结束。

接下来我们将进入 **第三阶段：高效工作流**。

下一课我们学习 **[3.1 Plan vs Build](../3-workflow/01-plan-build)**。

你会学到：
- 什么是 Plan（思考）模式
- 什么是 Build（执行）模式
- 如何在这两种模式间切换，让 AI 更聪明地工作
