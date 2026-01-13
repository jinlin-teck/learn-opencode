---
title: 常用快捷键推荐
subtitle: 15 个让你效率翻倍的快捷键
course: OpenCode 中文实战课
stage: 第二阶段
lesson: "2.3"
duration: 8 分钟
practice: 10 分钟
level: 新手
description: 精选 15 个最实用的快捷键，让你的日常操作效率翻倍。
tags:
  - 快捷键
  - 效率
  - 日常使用
prerequisite:
  - 2.1 界面与操作
---

# 常用快捷键推荐

> 💡 **一句话总结**：记住这 15 个快捷键，日常操作效率翻倍。

## 📝 课程笔记

本课核心知识点整理：

<img src="/images/2-daily/03-shortcuts-notes.mini.jpeg" 
     alt="常用快捷键推荐学霸笔记" 
     data-zoom-src="/images/2-daily/03-shortcuts-notes.jpeg" />

---

## 学完你能做什么

- 用快捷键快速新建/切换会话
- 一键切换模型和 Agent
- 快速撤销、重做、复制消息
- 用翻页键浏览长对话

---

## 你现在的困境

- 每次新建会话都要打 `/new`
- 切换模型要输入 `/models`
- 想撤销操作不知道怎么做
- 长对话只能慢慢滚动

---

## 什么时候用这一招

- 当你需要：频繁在 OpenCode 中工作
- 而且不想：每次都打命令

---

## 🎒 开始前的准备

> 确保你已经完成以下事项：

- [ ] 完成了 [2.1 界面与操作](./01-interface)
- [ ] 能正常和 AI 对话

---

## 核心思路

### Leader 键机制（重要！）

OpenCode 使用 **Leader 键**（默认 <kbd>Ctrl</kbd>+<kbd>X</kbd>）作为快捷键前缀，避免与终端快捷键冲突。

::: info 🤔 什么是 Leader 键？
Leader 键类似于 Vim 的 `<Leader>` 或游戏里的"组合键"。它不是一个功能键，而是一个**前缀键**。

按下 Leader 键后，OpenCode 会等待你按下一个字母，两者组合起来才是一个完整的快捷键。
:::

**操作方式（三步法）**：

```
┌─────────────────────────────────────────────────────────────┐
│  第 1 步          第 2 步          第 3 步                   │
│  按下 Ctrl+X  →   松开所有键   →   按下字母键（如 N）        │
│                                                             │
│  ⚠️ 关键：第 2 步必须松开！不是同时按住三个键！              │
└─────────────────────────────────────────────────────────────┘
```

**举例说明**：

| 你想做什么 | 完整操作 | 错误操作 |
|-----------|---------|---------|
| 新建会话 | 按 Ctrl+X → 松开 → 按 N | ❌ 同时按 Ctrl+X+N |
| 打开会话列表 | 按 Ctrl+X → 松开 → 按 L | ❌ 按住 Ctrl 不放按 X 再按 L |
| 切换模型 | 按 Ctrl+X → 松开 → 按 M | ❌ 按太快没松开 |

::: tip 💡 练习技巧
刚开始可以**刻意放慢**：按 Ctrl+X 后，心里默数"1"，再按字母键。熟练后自然会快起来。
:::

### 本课精选标准

从 60+ 个快捷键中，按以下标准精选：

1. **高频使用** - 几乎每天都会用
2. **节省时间** - 比打命令快很多
3. **容易记忆** - 有规律可循

---

## 精选 15 个快捷键

<AdInArticle />

### 🔥 第一梯队：每天必用

这 8 个是最高频的，优先记住：

| 快捷键 | 功能 | 说明 |
|--------|------|------|
| <kbd>Enter</kbd> | 发送消息 | 回车发送 |
| <kbd>Shift</kbd>+<kbd>Enter</kbd> | **换行（不发送）** | 写多行提示词时用 |
| <kbd>Ctrl</kbd>+<kbd>C</kbd> | 清空输入 / 退出 | 输入框有内容时清空，没内容时退出 |
| <kbd>Escape</kbd> | 中断 AI 响应 | AI 在生成时按，立即停止 |
| <kbd>↑</kbd> / <kbd>↓</kbd> | 翻阅历史输入 | **输入框为空时**，按上下键可找回之前发过的消息 |
| <kbd>Tab</kbd> | 切换 Agent | 在 Plan/Build/不同 Agent 间切换 |
| <kbd>Ctrl</kbd>+<kbd>X</kbd> → <kbd>N</kbd> | 新建会话 | Leader 键 + N = **N**ew |
| <kbd>Ctrl</kbd>+<kbd>X</kbd> → <kbd>L</kbd> | 会话列表 | Leader 键 + L = **L**ist |

::: tip 💡 换行的多种方式
除了 <kbd>Shift</kbd>+<kbd>Enter</kbd>，还可以用：
- <kbd>Ctrl</kbd>+<kbd>Enter</kbd>
- <kbd>Alt</kbd>+<kbd>Enter</kbd>
- <kbd>Ctrl</kbd>+<kbd>J</kbd>

选一个顺手的记住就行。
:::

::: details 📦 Ctrl+C 的两种行为
- **输入框有内容时**：清空输入框（不退出）
- **输入框为空时**：退出 OpenCode（等同于 Ctrl+D）

这和终端的行为一致，程序员会很熟悉。
:::

### ⚡ 第二梯队：效率提升

这 5 个能显著提升效率：

| 快捷键 | 功能 | 记忆技巧 |
|--------|------|---------|
| <kbd>Ctrl</kbd>+<kbd>X</kbd> → <kbd>M</kbd> | 模型列表 | **M**odel |
| <kbd>F2</kbd> | 快速切换最近模型 | IDE 通用 |
| <kbd>Ctrl</kbd>+<kbd>X</kbd> → <kbd>U</kbd> | 撤销消息 | **U**ndo |
| <kbd>Ctrl</kbd>+<kbd>X</kbd> → <kbd>R</kbd> | 重做消息 | **R**edo |
| <kbd>Ctrl</kbd>+<kbd>P</kbd> | 命令面板 | 同 VS Code |

### 🎯 第三梯队：锦上添花

这 5 个在特定场景很有用：

| 快捷键 | 功能 | 使用场景 |
|--------|------|---------|
| <kbd>Ctrl</kbd>+<kbd>X</kbd> → <kbd>Y</kbd> | 复制消息 | 复制 AI 回复 |
| <kbd>Ctrl</kbd>+<kbd>X</kbd> → <kbd>C</kbd> | 压缩上下文 | 对话太长时 |
| <kbd>Ctrl</kbd>+<kbd>X</kbd> → <kbd>B</kbd> | 切换侧边栏 | 看会话树 |
| <kbd>PageUp</kbd> / <kbd>PageDown</kbd> | 翻页浏览 | 长对话翻阅 |
| <kbd>Ctrl</kbd>+<kbd>X</kbd> → <kbd>T</kbd> | 主题列表 | 换个心情 |

### 🧑‍💻 程序员专属：输入框快捷键

如果你用过终端或 Emacs，这些你会很熟悉：

| 快捷键 | 功能 | Readline 风格 |
|--------|------|--------------|
| <kbd>Ctrl</kbd>+<kbd>A</kbd> | 跳到行首 | ✅ |
| <kbd>Ctrl</kbd>+<kbd>E</kbd> | 跳到行尾 | ✅ |
| <kbd>Ctrl</kbd>+<kbd>K</kbd> | 删除光标到行尾 | ✅ |
| <kbd>Ctrl</kbd>+<kbd>U</kbd> | 删除光标到行首 | ✅ |
| <kbd>Ctrl</kbd>+<kbd>W</kbd> | 删除上一个单词 | ✅ |
| <kbd>Alt</kbd>+<kbd>B</kbd> | 后退一个单词 | ✅ |
| <kbd>Alt</kbd>+<kbd>F</kbd> | 前进一个单词 | ✅ |

::: details 📦 什么是 Readline 风格？
Readline 是 Unix/Linux 终端的标准输入库，定义了一套通用的快捷键。

几乎所有终端程序（bash、zsh、python REPL）都支持这套快捷键。如果你天天在终端工作，这些快捷键已经是肌肉记忆了。

OpenCode 完全兼容 Readline，让你在输入框里也能用熟悉的方式编辑文本。
:::

---

## 跟我做

### 第 1 步：练习换行输入

**为什么**  
写多行提示词时，你需要换行而不是发送。

1. 在输入框输入 `第一行`
2. 按 <kbd>Shift</kbd>+<kbd>Enter</kbd>
3. 输入 `第二行`

**你应该看到**：输入框中有两行文字，消息没有发送

::: warning ⚠️ 常见问题
如果按 <kbd>Shift</kbd>+<kbd>Enter</kbd> 不换行，直接发送了消息，说明你的终端不支持修饰键。解决方案：
- 改用 <kbd>Ctrl</kbd>+<kbd>J</kbd>（更通用）
- 或参考 [5.6b 快捷键](../5-advanced/06b-keybinds#终端兼容性) 配置终端
:::

### 第 2 步：练习历史记录

**为什么**  
想重新发送或修改之前的消息，不用重新打字。

1. 先发送一条消息：`你好`
2. 等 AI 回复后，确保输入框是空的
3. 按 <kbd>↑</kbd>（上箭头）

**你应该看到**：输入框自动填入了你刚才发送的 `你好`

继续按 <kbd>↑</kbd> 可以翻阅更早的历史记录，按 <kbd>↓</kbd> 回到更近的。

### 第 3 步：练习 Ctrl+C

**为什么**  
快速清空输入，或退出 OpenCode。

**场景 A - 清空输入**：
1. 在输入框输入一些文字
2. 按 <kbd>Ctrl</kbd>+<kbd>C</kbd>

**你应该看到**：输入框被清空

**场景 B - 退出应用**：
1. 确保输入框是空的
2. 按 <kbd>Ctrl</kbd>+<kbd>C</kbd>

**你应该看到**：OpenCode 退出

### 第 4 步：练习 Leader 键组合

**为什么**  
这是 OpenCode 最核心的快捷键机制。

**重要**：这是两步操作，不是同时按！

1. 按下 <kbd>Ctrl</kbd>+<kbd>X</kbd>
2. **松开所有键**（这一步很关键！）
3. 按下 <kbd>N</kbd>

**你应该看到**：创建了一个新会话

再试试打开会话列表：

1. 按下 <kbd>Ctrl</kbd>+<kbd>X</kbd>
2. **松开**
3. 按下 <kbd>L</kbd>

**你应该看到**：弹出会话列表

### 第 5 步：练习撤销重做

**为什么**  
AI 回复不满意时可以重来。

1. 发送一条消息给 AI
2. 等 AI 回复后，按 <kbd>Ctrl</kbd>+<kbd>X</kbd> → <kbd>U</kbd>

**你应该看到**：刚才的消息和回复被撤销了

再按 <kbd>Ctrl</kbd>+<kbd>X</kbd> → <kbd>R</kbd> 可以重做。

### 第 6 步：练习中断响应

**为什么**  
AI 回复太长或方向错误时及时止损。

1. 发送一个复杂问题
2. 在 AI 回复过程中按 <kbd>Escape</kbd>

**你应该看到**：AI 停止生成

---

## 检查点 ✅

> 全部通过才能继续

- [ ] <kbd>Shift</kbd>+<kbd>Enter</kbd> 能换行而不发送
- [ ] <kbd>↑</kbd> 能翻阅历史输入（输入框为空时）
- [ ] <kbd>Ctrl</kbd>+<kbd>C</kbd> 能清空输入
- [ ] <kbd>Ctrl</kbd>+<kbd>X</kbd> → <kbd>N</kbd> 能新建会话（注意要松开再按 N）
- [ ] <kbd>Ctrl</kbd>+<kbd>X</kbd> → <kbd>L</kbd> 能打开会话列表
- [ ] <kbd>Escape</kbd> 能中断 AI 响应

---

## 踩坑提醒

| 现象 | 原因 | 解决 |
|-----|-----|-----|
| Shift+Enter 不换行，直接发送 | 终端不发送修饰键 | 改用 <kbd>Ctrl</kbd>+<kbd>J</kbd>，或配置终端 |
| 按 Ctrl+X 然后按 N 没反应 | 没有松开 Ctrl+X 就按了 N | **必须先松开**，再按 N |
| 按 Ctrl+X 没反应 | 终端劫持了该按键 | 检查终端设置，或换个终端 |
| 上箭头没有出现历史记录 | 输入框不是空的 | 先清空输入框（Ctrl+C），再按上箭头 |
| Tab 没有切换 Agent | 在输入状态按的 | 先按 Escape 退出输入，再按 Tab |

---

## 快捷键速记口诀

```
回车发送，Shift 换行
上箭头翻历史，Ctrl+C 清输入
新建 N，列表 L，模型 M 要牢记
撤销 U，重做 R，复制 Y 不费力
Escape 中断响应快
Tab 切 Agent 真方便
```

---

## 本课小结

你学会了：

1. **换行技巧**：<kbd>Shift</kbd>+<kbd>Enter</kbd> 换行，<kbd>Enter</kbd> 发送
2. **历史记录**：输入框为空时，<kbd>↑</kbd>/<kbd>↓</kbd> 翻阅历史
3. **Ctrl+C**：清空输入（有内容）或退出（无内容）
4. **Leader 键机制**：<kbd>Ctrl</kbd>+<kbd>X</kbd> → 松开 → 字母键
5. **会话管理**：N（新建）、L（列表）、U（撤销）
6. **程序员福利**：Readline 风格快捷键全兼容

---

## 想要更多？

- [速查/快捷键速查表](../appendix/keybinds) - 完整 60+ 快捷键列表
- [5.6b 快捷键](../5-advanced/06b-keybinds) - 自定义快捷键教程

---

## 下一课预告

> 下一课我们学习 **[全局提示词](./04-global-rules)**，让 AI 永久记住你的工作习惯。
>
> 你会学到：
> - 创建规则文件，不用每次都说"用中文回复"
> - 全局规则 vs 项目规则的区别
> - 实用规则示例

---

## 附录：源码参考

<details>
<summary><strong>点击展开查看源码位置</strong></summary>

> 更新时间：2026-01-13

| 功能 | 文件路径 | 行号 |
|-----|---------|------|
| 快捷键默认值 | [`src/config/config.ts`](https://github.com/anomalyco/opencode/blob/dev/packages/opencode/src/config/config.ts#L616-L754) | 616-754 |
| 快捷键解析 | [`src/util/keybind.ts`](https://github.com/anomalyco/opencode/blob/dev/packages/opencode/src/util/keybind.ts) | 全文件 |

**关键默认值**（来自 `config.ts`）：
- `input_submit = "return"` - 发送消息（第 668 行）
- `input_newline = "shift+return,ctrl+return,alt+return,ctrl+j"` - 换行（第 669-673 行）
- `input_clear = "ctrl+c"` - 清空输入（第 666 行）
- `app_exit = "ctrl+c,ctrl+d,<leader>q"` - 退出应用（第 617 行）
- `history_previous = "up"` - 上一条历史（第 747 行）
- `history_next = "down"` - 下一条历史（第 748 行）
- `agent_cycle = "tab"` - 切换 Agent（第 663 行）
- `leader = "ctrl+x"` - Leader 键（第 616 行）
- `session_new = "<leader>n"` - 新建会话
- `session_list = "<leader>l"` - 会话列表
- `model_list = "<leader>m"` - 模型列表
- `messages_undo = "<leader>u"` - 撤销消息
- `messages_redo = "<leader>r"` - 重做消息

</details>
