---
title: 全局提示词
subtitle: 让 AI 记住你的工作习惯
course: OpenCode 中文实战课
stage: 第二阶段
lesson: "2.4"
duration: 12 分钟
practice: 15 分钟
level: 新手
description: 用规则文件让 AI 永久记住你的偏好，不用每次对话都重复。
tags:
  - 规则
  - 提示词
  - 个性化
  - 日常使用
prerequisite:
  - 2.1 界面与操作
---

# 全局提示词

> 💡 **一句话总结**：创建一个规则文件，AI 每次发消息都会读取，不用重复说"用中文回复"。

## 📝 课程笔记

本课核心知识点整理：

<img src="/images/2-daily/04-global-rules-notes.mini.jpeg" 
     alt="全局提示词学霸笔记" 
     data-zoom-src="/images/2-daily/04-global-rules-notes.jpeg" />

---

## 学完你能做什么

- 让 AI 永久记住"用中文回复"
- 设置你的编码规范（缩进、命名风格等）
- 定义项目特定的规则
- 跨项目复用你的偏好设置

---

## 你现在的困境

- 每次新对话都要说"请用中文回复"
- AI 总是忘记你喜欢的代码风格
- 项目有特定规范，AI 总是不遵守
- 换个项目就得重新教 AI

---

## 什么时候用这一招

- 当你需要：让 AI 遵守一些固定的规则
- 而且不想：每次对话都重复

---

## 🎒 开始前的准备

> 确保你已经完成以下事项：

- [ ] 完成了 [2.1 界面与操作](./01-interface)
- [ ] 能正常和 AI 对话

---

## 核心思路

### 什么是"规则文件"？

规则文件就是一个 Markdown 文件，里面写着你希望 AI 遵守的规则。OpenCode 会自动读取这个文件，把内容加到系统提示词里。

**好处**：
- 不用每次对话都重复
- 规则可以很长、很详细
- 可以用 Markdown 格式，方便组织

### 规则是热加载的！

::: warning ⚡ 重要知识点
规则文件修改后**立即生效**，不需要重启 OpenCode，也不需要新建会话！
:::

OpenCode 在**每次发送消息时**都会重新读取规则文件。这意味着：

| 操作 | 是否需要 |
|------|---------|
| 修改规则后重启 OpenCode | ❌ 不需要 |
| 修改规则后新建会话 | ❌ 不需要 |
| 修改规则后发下一条消息 | ✅ 这就够了 |

**实际效果**：你让 AI 帮你更新了规则文件后，直接发下一条消息，新规则就会生效。

### 三种作用域

OpenCode 支持三种作用域的规则，满足不同场景：

| 作用域 | 位置 | 适用场景 |
|-------|------|---------|
| **全局规则** | `~/.config/opencode/AGENTS.md` | 所有项目通用的偏好 |
| **项目规则** | 项目根目录 `AGENTS.md` | 项目特定的规范 |
| **配置文件** | `opencode.json` 的 `instructions` 字段 | 引用多个规则文件 |

::: info 🤔 为什么叫 AGENTS.md？
OpenCode 同时支持 `AGENTS.md` 和 `CLAUDE.md`（兼容 Claude Code）。推荐用 `AGENTS.md`，这是 OpenCode 的标准名称。
:::

### 规则加载顺序

规则按以下顺序加载，后加载的会**补充**（不是覆盖）前面的：

```
1. 全局 ~/.config/opencode/AGENTS.md
2. 全局 ~/.claude/CLAUDE.md（兼容模式）
3. 项目目录向上查找 AGENTS.md / CLAUDE.md
4. 配置文件 instructions 指定的文件
```

**结果**：所有规则都会生效，合并在一起。

---

## 跟我做

<AdInArticle />

::: tip 💡 核心理念
**不用离开 OpenCode**！直接让 AI 帮你创建规则文件，这是最简单的方式。
:::

### 第 1 步：让 AI 帮你创建全局规则

**为什么**  
既然已经在用 OpenCode，直接让 AI 帮你写文件最方便。

在 OpenCode 输入框里输入：

```
帮我创建全局规则文件 ~/.config/opencode/AGENTS.md，内容是：

始终使用简体中文回复
```

**你应该看到**：AI 会帮你创建目录和文件，并写入规则。

::: details 📦 AI 会做什么？
AI 会执行类似这样的操作：
1. 检查 `~/.config/opencode/` 目录是否存在
2. 如果不存在，创建目录
3. 创建 `AGENTS.md` 文件并写入你的规则

你不需要手动输入任何命令！
:::

### 第 2 步：验证规则生效

**为什么**  
确认 OpenCode 读取了规则。

直接在当前会话输入 `hello`

**你应该看到**：AI 用中文回复你

::: tip 💡 规则立即生效
因为规则是热加载的，AI 帮你创建文件后，下一条消息就会遵守新规则。不需要新建会话！
:::

::: details 📦 验证技巧
问 AI："你现在遵守哪些规则？"它会列出系统提示词里的规则。
:::

### 第 3 步：完善你的规则

**为什么**  
一条规则太少，加些实用的。

在 OpenCode 里继续说：

```
帮我更新全局规则文件 ~/.config/opencode/AGENTS.md，改成：

## 语言和风格

- 始终使用简体中文回复
- 直接回答问题，不要客套话
- 代码注释也用中文

## 代码规范

- 使用 2 空格缩进
- 变量名用驼峰命名（camelCase）
- 函数名用动词开头（如 getUserById）

## 工作习惯

- 修改代码前先阅读相关文件
- 不确定时先问，不要猜测
- 每次只做最小必要的修改
```

**你应该看到**：AI 更新了规则文件。

### 第 4 步：（可选）创建项目规则

**为什么**  
有些规则只对特定项目有效。

在项目目录里启动 OpenCode，然后说：

```
帮我在项目根目录创建 AGENTS.md，内容是：

# 项目规则

## 技术栈
- 前端：React + TypeScript
- 后端：NestJS
- 数据库：PostgreSQL

## 代码规范
- 使用项目的 ESLint 配置
- 组件文件用 PascalCase 命名
- API 路由用 kebab-case
```

**你应该看到**：在这个项目里，AI 会同时遵守全局规则和项目规则。

### 第 5 步：（可选）用 /init 自动生成项目规则

**为什么**  
如果你不知道该写什么规则，让 AI 分析项目自动生成。

在 OpenCode 输入：

```
/init
```

**你应该看到**：AI 会分析你的项目结构、技术栈、代码风格，自动生成一份 `AGENTS.md`。

::: info 🤔 /init 生成的内容
AI 会分析：
- 项目的构建/测试命令
- 代码风格（缩进、命名规范等）
- 使用的框架和库
- 已有的 Cursor/Copilot 规则（如果有）

生成的规则大约 150 行，涵盖项目最重要的规范。
:::

---

## 实用规则示例

以下是一些实战中验证有效的规则，可以直接复制使用：

### 通用开发规则

```markdown
## 工作态度

- 每次工作都要用严谨的工作态度，保证完美的质量标准

## 沟通风格

- 直接输出代码或方案，禁止客套话（"抱歉"、"我明白了"等）
- 除非明确要求，否则不提供代码摘要

## 求真原则（禁止瞎猜）

- 不确定/信息不足时先查证或提问澄清
- 对环境/配置/源码/行为的结论必须有证据
- 回答里把"事实"和"推测/假设"分开写
```

### 代码质量规则

```markdown
## 代码质量原则

- 优先代码可读性，做最简单的修改
- 禁止使用 `eslint-disable` 或 `@ts-ignore` 绕过问题
- 禁止使用 `any` 类型，必须定义明确的类型
- 不要为了向后兼容而保留废弃代码
- 删除未使用的代码，不要注释掉

## 复用优先

- 编写新代码前，先确认项目中是否已有类似实现
- 优先复用现有组件和工具函数，而非新建
```

### 工作流程规则

```markdown
## 执行规范

- 任何非平凡任务，先制定计划再动手
- 修改代码前必须先阅读相关文件
- 修改完成后自行运行测试验证

## 子代理调度策略

- 尽可能调用子代理完成任务
- 能派给专家的就派，不要什么都自己干
```

---

## 高级用法：配置文件引用

如果你的规则分散在多个文件，可以用配置文件统一引用：

```json
// opencode.json
{
  "instructions": [
    "CONTRIBUTING.md",
    "docs/coding-standards.md",
    ".cursor/rules/*.md",
    "~/my-rules/common.md"
  ]
}
```

**支持的格式**：
- 相对路径：`docs/rules.md`
- 绝对路径：`~/my-rules/common.md`
- Glob 模式：`.cursor/rules/*.md`
- URL：`https://example.com/rules.md`

::: tip 💡 兼容其他工具
如果你之前用过 Cursor，可以直接引用 `.cursor/rules/*.md`，规则直接复用。
:::

---

## 检查点 ✅

> 全部通过才能继续

- [ ] 让 AI 创建了 `~/.config/opencode/AGENTS.md` 文件
- [ ] 文件中至少有一条规则
- [ ] 发送消息后，AI 遵守了规则（如用中文回复）

---

## 踩坑提醒

| 现象 | 原因 | 解决 |
|-----|-----|-----|
| 规则没生效 | 文件路径错误 | 确认是 `~/.config/opencode/AGENTS.md`，不是 `~/.opencode/` |
| 部分规则被忽略 | 规则太长，被截断 | 精简规则，只保留重要的 |
| 规则冲突 | 全局和项目规则矛盾 | 项目规则写得更具体，覆盖全局 |
| 中文乱码 | 文件编码不是 UTF-8 | 用 UTF-8 编码保存文件 |

---

## 本课小结

你学会了：

1. **直接让 AI 写规则**：在 OpenCode 里说"帮我创建规则文件"，最简单
2. **规则是热加载的**：修改后立即生效，不需要重启或新建会话
3. **三种作用域**：全局（`~/.config/opencode/`）、项目（项目根目录）、配置文件
4. **规则叠加**：多个规则文件会合并，不会覆盖
5. **`/init` 命令**：自动分析项目生成规则

---

## 想要更多？

- [5.1b 配置进阶](../5-advanced/01b-config-advanced) - 更多配置文件用法
- [附录/常见问题](../appendix/faq) - "如何让 AI 记住我的偏好"

---

## 下一课预告

> 下一课我们将进入高效工作流阶段，学习 Plan 和 Build 两种模式的区别和用法。

---

## 附录：源码参考

<details>
<summary><strong>点击展开查看源码位置</strong></summary>

> 更新时间：2026-01-13

| 功能 | 文件路径 | 行号 |
|-----|---------|------|
| 规则文件查找逻辑 | [`src/session/system.ts`](https://github.com/anomalyco/opencode/blob/dev/packages/opencode/src/session/system.ts#L65-L137) | 65-137 |
| 每次消息都读取规则 | [`src/session/prompt.ts`](https://github.com/anomalyco/opencode/blob/dev/packages/opencode/src/session/prompt.ts#L596) | 596 |
| 配置 instructions 字段 | [`src/config/config.ts`](https://github.com/anomalyco/opencode/blob/dev/packages/opencode/src/config/config.ts) | instructions Schema |

**热加载原理**：
- `SessionPrompt.prompt()` 在每次用户发消息时调用
- 调用链：`prompt()` → `loop()` → `processor.process()` → `SystemPrompt.custom()`
- `SystemPrompt.custom()` 每次都重新读取文件，没有缓存

**支持的文件名**（按优先级）：
- `AGENTS.md` - OpenCode 标准
- `CLAUDE.md` - 兼容 Claude Code
- `CONTEXT.md` - 已废弃，仍支持

**全局规则查找顺序**：
1. `$OPENCODE_CONFIG_DIR/AGENTS.md`（如设置了环境变量）
2. `~/.config/opencode/AGENTS.md`
3. `~/.claude/CLAUDE.md`

**项目规则查找**：从当前目录向上逐级查找，直到找到文件或到达根目录。

</details>
