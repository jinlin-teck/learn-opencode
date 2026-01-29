---
title: CLI 命令参考
description: OpenCode 命令行工具完整参考
---

# CLI 命令参考

> `opencode` 命令行工具的所有命令和选项

## 📝 课程笔记

本课核心知识点整理：

<img src="/images/appendix/cli-notes.mini.jpeg"
     alt="CLI 命令参考学霸笔记"
     data-zoom-src="/images/appendix/cli-notes.jpeg" />

---

## 命令速览

| 命令 | 功能 |
|------|------|
| `opencode` | 启动 TUI 交互界面 |
| `opencode run` | 非交互模式执行任务 |
| `opencode serve` | 启动无头服务器 |
| `opencode web` | 启动 Web 界面 |
| `opencode attach` | 连接远程服务器 |
| `opencode auth` | 认证管理 |
| `opencode models` | 列出可用模型 |
| `opencode agent` | Agent 管理 |
| `opencode mcp` | MCP 服务器管理 |
| `opencode session` | 会话管理 |
| `opencode stats` | 使用统计 |
| `opencode export` | 导出会话 |
| `opencode import` | 导入会话 |
| `opencode github` | GitHub 集成 |
| `opencode acp` | ACP 服务器 |
| `opencode upgrade` | 升级版本 |
| `opencode uninstall` | 卸载 OpenCode |

---

## 主要命令

### opencode

启动 TUI 交互界面。

```bash
opencode [project]
```

**选项**：
| 选项 | 短选项 | 说明 |
|------|--------|------|
| `--continue` | `-c` | 继续上次会话 |
| `--session` | `-s` | 指定会话 ID |
| `--prompt` | | 初始提示语 |
| `--model` | `-m` | 指定模型（格式：provider/model） |
| `--agent` | | 指定 Agent |
| `--port` | | 监听端口 |
| `--hostname` | | 监听地址 |

**示例**：
```bash
# 启动 TUI
opencode

# 带初始提示语启动
opencode --prompt "帮我分析这个项目的代码结构"

# 使用特定模型
opencode -m anthropic/claude-sonnet-4-20250514

# 继续上次会话
opencode -c
```

---

### opencode run

非交互模式执行任务，适合脚本和 CI/CD。

```bash
opencode run [message..]
```

**选项**：
| 选项 | 短选项 | 说明 |
|------|--------|------|
| `--command` | | 要执行的命令，使用 message 作为参数 |
| `--continue` | `-c` | 继续上次会话 |
| `--session` | `-s` | 指定会话 ID |
| `--share` | | 分享会话 |
| `--model` | `-m` | 指定模型（格式：provider/model） |
| `--agent` | | 指定 Agent |
| `--file` | `-f` | 附加文件（可多个） |
| `--format` | | 输出格式：default（格式化）或 json（原始 JSON） |
| `--title` | | 会话标题 |
| `--attach` | | 连接运行中的服务器（如 `http://localhost:4096`） |
| `--port` | | 本地服务器端口（默认随机） |
| `--variant` | | 模型变体（推理力度：high、max、minimal） |

**示例**：
```bash
# 基本使用
opencode run "修复 src/main.ts 中的类型错误"

# 指定模型
opencode run -m anthropic/claude-sonnet-4-5 "Review this code"

# 附加文件（支持多文件）
opencode run -f src/main.ts -f package.json "Analyze this project"

# 继续上一个会话
opencode run -c "What else needs to be done?"

# 使用 JSON 格式输出（适合脚本）
opencode run --format json "List all TypeScript files"

# 连接到远程服务器（避免 MCP 冷启动）
opencode serve  # 在另一个终端启动
opencode run --attach http://localhost:4096 "Explain async/await"

# 使用自定义命令
opencode run --command explain --file code.ts "How does this work?"

# 指定模型变体（推理力度）
opencode run -m anthropic/claude-opus-4-5 --variant max "Analyze entire codebase"

# 自动分享会话
opencode run --share "Generate project documentation"

# 指定会话标题
opencode run --title "Bug Fix" "Fix the login issue"

# 从 stdin 读取输入
echo "Count lines of code" | opencode run "Analyze"
```

---

### opencode serve

启动无头服务器模式，提供 API 访问。

```bash
opencode serve
```

**选项**：
| 选项 | 说明 |
|------|------|
| `--port` | 监听端口 |
| `--hostname` | 监听地址 |
| `--mdns` | 启用 mDNS 发现 |
| `--cors` | 允许的 CORS 源 |

**示例**：
```bash
# 默认配置启动
opencode serve

# 指定端口和允许远程访问
opencode serve --port 4096 --hostname 0.0.0.0
```

---

### opencode web

启动 Web 界面。

```bash
opencode web
```

**选项**：
| 选项 | 说明 |
|------|------|
| `--port` | 监听端口 |
| `--hostname` | 监听地址 |
| `--mdns` | 启用 mDNS 发现 |
| `--cors` | 允许的 CORS 源 |

**示例**：
```bash
# 启动 Web 界面
opencode web

# 指定端口
opencode web --port 4096
```

---

### opencode attach

连接到远程 OpenCode 服务器。

```bash
opencode attach [url]
```

**选项**：
| 选项 | 短选项 | 说明 |
|------|--------|------|
| `--dir` | | TUI 工作目录 |
| `--session` | `-s` | 指定会话 ID |

**示例**：
```bash
# 在一个终端启动服务器
opencode web --port 4096 --hostname 0.0.0.0

# 在另一个终端连接
opencode attach http://10.20.30.40:4096
```

---

## 管理命令

<AdInArticle />

### opencode auth

管理认证和 API Key。凭证存储在 `~/.local/share/opencode/auth.json`。

```bash
opencode auth <subcommand>
```

| 子命令 | 功能 |
|--------|------|
| `login` | 登录（交互式选择提供商） |
| `list` / `ls` | 列出已认证的提供商 |
| `logout` | 登出提供商 |

**示例**：
```bash
# 交互式登录
opencode auth login

# 列出已认证的提供商
opencode auth list

# 登出
opencode auth logout
```

---

### opencode models

列出可用模型。

```bash
opencode models [provider]
```

**选项**：
| 选项 | 说明 |
|------|------|
| `--refresh` | 刷新模型缓存 |
| `--verbose` | 显示详细信息（包括成本等元数据） |

**示例**：
```bash
# 列出所有可用模型
opencode models

# 只列出 Anthropic 的模型
opencode models anthropic

# 刷新模型列表
opencode models --refresh
```

---

### opencode agent

管理 Agent 配置。

```bash
opencode agent <subcommand>
```

| 子命令 | 功能 |
|--------|------|
| `list` | 列出所有 Agent |
| `create` | 创建新 Agent（交互式） |

**示例**：
```bash
# 列出 Agent
opencode agent list

# 创建新 Agent
opencode agent create
```

---

### opencode mcp

管理 MCP 服务器。

```bash
opencode mcp <subcommand>
```

| 子命令 | 功能 |
|--------|------|
| `list` / `ls` | 列出 MCP 服务器及连接状态 |
| `add` | 添加 MCP 服务器（交互式） |
| `auth [name]` | OAuth 认证 |
| `auth list` / `auth ls` | 列出支持 OAuth 的服务器及认证状态 |
| `logout [name]` | 移除 OAuth 凭证 |
| `debug <name>` | 调试 OAuth 连接问题 |

**示例**：
```bash
# 列出 MCP 服务器
opencode mcp list

# 添加新服务器
opencode mcp add

# OAuth 认证
opencode mcp auth context7

# 列出 OAuth 状态
opencode mcp auth ls

# 调试连接
opencode mcp debug context7
```

---

### opencode session

管理会话。

```bash
opencode session <subcommand>
```

| 子命令 | 功能 |
|--------|------|
| `list` | 列出会话 |

**选项**（list）：
| 选项 | 短选项 | 说明 |
|------|--------|------|
| `--max-count` | `-n` | 限制最近 N 个会话 |
| `--format` | | 输出格式：table 或 json |

**示例**：
```bash
# 列出会话
opencode session list

# 列出最近 10 个会话
opencode session list -n 10

# 输出为 JSON
opencode session list --format json
```

---

### opencode stats

查看使用统计。

```bash
opencode stats
```

**选项**：
| 选项 | 说明 |
|------|------|
| `--days` | 最近 N 天的统计 |
| `--tools` | 显示的工具数量 |
| `--models` | 显示模型使用明细（传入数字显示 Top N） |
| `--project` | 按项目筛选（空字符串表示当前项目） |

**示例**：
```bash
# 查看统计
opencode stats

# 查看最近 7 天
opencode stats --days 7

# 显示模型使用 Top 5
opencode stats --models 5
```

---

### opencode export

导出会话数据为 JSON。

```bash
opencode export [sessionID]
```

如果不指定会话 ID，会提示选择。

**示例**：
```bash
opencode export abc123
```

---

### opencode import

导入会话数据。

```bash
opencode import <file>
```

支持从本地文件或 OpenCode 分享 URL 导入。

**示例**：
```bash
# 从文件导入
opencode import session.json

# 从分享 URL 导入
opencode import https://opncd.ai/s/abc123
```

---

### opencode github

GitHub 集成管理。

```bash
opencode github <subcommand>
```

| 子命令 | 功能 |
|--------|------|
| `install` | 安装 GitHub Actions 工作流 |
| `run` | 运行 GitHub Agent（用于 Actions） |

**run 选项**：
| 选项 | 说明 |
|------|------|
| `--event` | GitHub mock 事件 |
| `--token` | GitHub 个人访问令牌 |

**示例**：
```bash
# 安装 Actions
opencode github install
```

---

### opencode acp

启动 ACP（Agent Client Protocol）服务器。

```bash
opencode acp
```

通过 stdin/stdout 使用 nd-JSON 通信。

**选项**：
| 选项 | 说明 |
|------|------|
| `--cwd` | 工作目录 |
| `--port` | 监听端口 |
| `--hostname` | 监听地址 |

---

### opencode upgrade

升级到最新版本或指定版本。

```bash
opencode upgrade [target]
```

**选项**：
| 选项 | 短选项 | 说明 |
|------|--------|------|
| `--method` | `-m` | 安装方式：curl、npm、pnpm、bun、brew |

**示例**：
```bash
# 升级到最新
opencode upgrade

# 升级到指定版本
opencode upgrade v1.0.5

# 降级到 0.x
opencode upgrade 0.15.31
```

---

### opencode uninstall

卸载 OpenCode 并删除相关文件。

```bash
opencode uninstall
```

**选项**：
| 选项 | 短选项 | 说明 |
|------|--------|------|
| `--keep-config` | `-c` | 保留配置文件 |
| `--keep-data` | `-d` | 保留会话数据和快照 |
| `--dry-run` | | 只显示将删除的内容 |
| `--force` | `-f` | 跳过确认提示 |

**示例**：
```bash
# 完全卸载
opencode uninstall

# 保留配置
opencode uninstall --keep-config

# 预览删除内容
opencode uninstall --dry-run
```

---

## 全局选项

所有命令都支持以下全局选项：

| 选项 | 短选项 | 说明 |
|------|--------|------|
| `--help` | `-h` | 显示帮助 |
| `--version` | `-v` | 显示版本号 |
| `--print-logs` | | 打印日志到 stderr |
| `--log-level` | | 日志级别：DEBUG、INFO、WARN、ERROR |

---

## 环境变量

| 变量 | 类型 | 说明 |
|------|------|------|
| `OPENCODE_CONFIG` | string | 配置文件路径 |
| `OPENCODE_CONFIG_DIR` | string | 配置目录路径 |
| `OPENCODE_CONFIG_CONTENT` | string | 内联 JSON 配置 |
| `OPENCODE_PERMISSION` | string | 内联 JSON 权限配置 |
| `OPENCODE_AUTO_SHARE` | boolean | 自动分享会话 |
| `OPENCODE_DISABLE_AUTOUPDATE` | boolean | 禁用自动更新检查 |
| `OPENCODE_DISABLE_PRUNE` | boolean | 禁用旧数据清理 |
| `OPENCODE_DISABLE_TERMINAL_TITLE` | boolean | 禁用终端标题更新 |
| `OPENCODE_DISABLE_DEFAULT_PLUGINS` | boolean | 禁用默认插件 |
| `OPENCODE_DISABLE_LSP_DOWNLOAD` | boolean | 禁用 LSP 服务器自动下载 |
| `OPENCODE_DISABLE_AUTOCOMPACT` | boolean | 禁用自动上下文压缩 |
| `OPENCODE_ENABLE_EXPERIMENTAL_MODELS` | boolean | 启用实验性模型 |
| `OPENCODE_ENABLE_EXA` | boolean | 启用 Exa 网页搜索 |
| `OPENCODE_CLIENT` | string | 客户端标识（默认 `cli`） |
| `OPENCODE_GIT_BASH_PATH` | string | Windows Git Bash 路径 |

### 提供商 API Key

各提供商的 API Key 通过对应环境变量设置：

| 变量 | 说明 |
|------|------|
| `ANTHROPIC_API_KEY` | Anthropic API Key |
| `OPENAI_API_KEY` | OpenAI API Key |
| `DEEPSEEK_API_KEY` | DeepSeek API Key |
| `GROQ_API_KEY` | Groq API Key |

### 实验性变量

> 来源：[cli.mdx](https://github.com/anomalyco/opencode/blob/dev/packages/web/src/content/docs/cli.mdx)

| 变量 | 类型 | 说明 |
|------|------|------|
| `OPENCODE_EXPERIMENTAL` | boolean | 启用所有实验性功能 |
| `OPENCODE_EXPERIMENTAL_ICON_DISCOVERY` | boolean | 启用图标发现 |
| `OPENCODE_EXPERIMENTAL_DISABLE_COPY_ON_SELECT` | boolean | 禁用 TUI 中选中即复制 |
| `OPENCODE_EXPERIMENTAL_BASH_MAX_OUTPUT_LENGTH` | number | Bash 最大输出长度 |
| `OPENCODE_EXPERIMENTAL_BASH_DEFAULT_TIMEOUT_MS` | number | Bash 默认超时（毫秒） |
| `OPENCODE_EXPERIMENTAL_OUTPUT_TOKEN_MAX` | number | LLM 最大输出 token |
| `OPENCODE_EXPERIMENTAL_FILEWATCHER` | boolean | 启用目录文件监听 |
| `OPENCODE_EXPERIMENTAL_OXFMT` | boolean | 启用 oxfmt 格式化器 |
| `OPENCODE_EXPERIMENTAL_LSP_TOOL` | boolean | 启用实验性 LSP 工具 |

---

## 相关资源

- [配置选项参考](./config-ref) - 配置文件详解
- [斜杠命令速查表](./commands) - TUI 内命令
- [模型提供商列表](./providers) - 可用模型
