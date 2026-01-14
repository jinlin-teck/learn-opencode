---
title: 5.2c Agent 权限与安全
subtitle: 精确控制 Agent 能做什么
course: OpenCode 中文实战课
stage: 第五阶段
lesson: "5.2c"
duration: 20 分钟
practice: 15 分钟
level: 进阶
description: 精确控制 Agent 可以做什么、不可以做什么，确保 AI 操作的安全性。
tags:
  - Agent
  - 权限
  - 安全
prerequisite:
  - 5.2a Agent 快速入门
---

# 5.2c Agent 权限与安全

> 精确控制 Agent 可以做什么、不可以做什么。

## 📝 课程笔记

本课核心知识点整理：

<img src="/images/5-advanced/02c-agent-permissions-notes.mini.jpeg" alt="Agent权限与安全学霸笔记" data-zoom-src="/images/5-advanced/02c-agent-permissions-notes.jpeg" />

---

## 学完你能做什么

- 理解权限系统架构
- 配置 bash/edit/task/skill 权限
- 设计安全的 Agent 系统
- 实现最小权限原则

---

## 权限系统架构

### 三种权限动作

| 动作 | 说明 | 效果 |
|------|------|------|
| `allow` | 允许 | 直接执行，无需确认 |
| `ask` | 询问 | 弹出确认框，用户决定 |
| `deny` | 禁止 | 拒绝执行，Agent 收到错误 |

### 权限配置层级

```
默认权限（源码定义）
    ↓ 覆盖
全局配置 permission
    ↓ 覆盖
Agent 级别 permission
```

**后面的覆盖前面的**。

> 来源：`config.ts:418-447`，`agent.ts:194`

### 规则优先级：最后匹配获胜

这是最重要的规则！当多个规则都匹配时，**最后一个匹配的规则生效**。

```jsonc
{
  "permission": {
    "bash": {
      "*": "ask",           // 规则 1：所有命令需确认
      "git *": "allow",     // 规则 2：git 命令允许
      "git push*": "deny"   // 规则 3：git push 禁止
    }
  }
}
```

执行 `git push origin main`：
1. 匹配规则 1（`*`）→ ask
2. 匹配规则 2（`git *`）→ allow
3. 匹配规则 3（`git push*`）→ deny
4. **最终结果：deny**（规则 3 在最后）

> 来源：`agents.mdx:473`，`permissions.mdx:70`

---

## 可配置的权限类型

| 权限 | 匹配对象 | 说明 |
|------|---------|------|
| `read` | 文件路径 | 读取文件 |
| `edit` | 文件路径 | 所有文件修改（edit/write/patch/multiedit） |
| `glob` | glob 模式 | 文件搜索 |
| `grep` | 正则表达式 | 内容搜索 |
| `list` | 目录路径 | 列出目录内容 |
| `bash` | 命令字符串 | 执行 shell 命令 |
| `task` | subagent 名称 | 调用子 Agent |
| `skill` | skill 名称 | 加载技能 |
| `lsp` | - | LSP 查询（目前不支持细粒度） |
| `todoread` | - | 读取 Todo 列表 |
| `todowrite` | - | 更新 Todo 列表 |
| `webfetch` | URL | 获取网页内容 |
| `websearch` | 查询字符串 | 网页搜索 |
| `codesearch` | 查询字符串 | 代码搜索 |
| `external_directory` | - | 访问项目目录之外的路径 |
| `doom_loop` | - | 检测重复调用（同一工具连续调用 3 次相同输入） |

> 来源：`config.ts:418-447`

---

## 权限配置语法

### 简单语法：单一动作

```jsonc
{
  "permission": {
    "edit": "allow",      // 所有文件编辑允许
    "bash": "ask",        // 所有命令需确认
    "webfetch": "deny"    // 禁止获取网页
  }
}
```

### 全局设置

```jsonc
{
  "permission": "allow"   // 所有权限都允许
}
```

### 对象语法：细粒度控制

```jsonc
{
  "permission": {
    "bash": {
      "*": "ask",              // 默认需确认
      "git status": "allow",   // git status 允许
      "git log*": "allow",     // git log 开头的允许
      "rm -rf*": "deny"        // rm -rf 禁止
    }
  }
}
```

### 通配符

| 符号 | 含义 | 示例 |
|------|------|------|
| `*` | 匹配任意字符（0个或多个） | `git *` 匹配 `git status`、`git log` |
| `?` | 匹配单个字符 | `file?.txt` 匹配 `file1.txt` |

---

## bash 权限详解

<AdInArticle />

bash 权限匹配的是**解析后的命令字符串**。

### 常见配置

```jsonc
{
  "permission": {
    "bash": {
      "*": "ask",                    // 默认需确认

      // Git 命令
      "git status": "allow",
      "git log*": "allow",
      "git diff*": "allow",
      "git branch*": "allow",
      "git checkout*": "ask",        // 切换分支要确认
      "git push*": "ask",            // 推送要确认
      "git reset --hard*": "deny",   // 硬重置禁止

      // 包管理
      "npm install*": "allow",
      "npm run*": "allow",
      "npm publish*": "deny",        // 发布禁止

      // 危险命令
      "rm -rf*": "deny",
      "sudo*": "deny",
      "chmod 777*": "deny"
    }
  }
}
```

### Plan Agent 的最佳实践

```jsonc
{
  "agent": {
    "plan": {
      "permission": {
        "bash": {
          "*": "deny",               // 默认禁止
          "git log*": "allow",       // 只读命令允许
          "git diff*": "allow",
          "git status": "allow",
          "ls*": "allow",
          "cat*": "allow",
          "head*": "allow",
          "tail*": "allow"
        }
      }
    }
  }
}
```

---

## edit 权限详解

edit 权限控制**所有文件修改操作**，包括：
- `edit` 工具
- `write` 工具
- `patch` 工具
- `multiedit` 工具

### 常见配置

```jsonc
{
  "permission": {
    "edit": {
      "*": "allow",                    // 默认允许

      // 敏感文件
      "*.env": "deny",
      "*.env.*": "deny",
      "*.env.example": "allow",        // 示例文件允许
      ".env.local": "deny",

      // 系统文件
      "package-lock.json": "deny",     // 锁文件不要改
      "pnpm-lock.yaml": "deny",
      "yarn.lock": "deny",

      // 目录
      "node_modules/*": "deny",
      ".git/*": "deny",
      "dist/*": "deny"
    }
  }
}
```

### 只读 Agent 配置

```jsonc
{
  "agent": {
    "readonly-auditor": {
      "description": "只读代码审计，不修改任何文件",
      "mode": "subagent",
      "permission": {
        "edit": "deny"                 // 禁止所有编辑
      }
    }
  }
}
```

---

## task 权限：控制 subagent 调用

task 权限控制 **Agent 可以调用哪些 subagent**。

### 工作原理

当设置 `task: deny` 时：
1. 该 subagent 从 Task tool 的描述中**完全移除**
2. 模型不会尝试调用它（因为看不到）

> 注意：用户仍可通过 `@agent-name` 手动调用任何 subagent。task 权限只影响 Agent 自动调用。
> 
> 来源：`agents.mdx:557-565`

### 配置示例

```jsonc
{
  "agent": {
    "safe-orchestrator": {
      "description": "安全编排器，只能调用指定的 subagent",
      "mode": "primary",
      "permission": {
        "task": {
          "*": "deny",                   // 禁止所有
          "docs-writer": "allow",        // 允许文档
          "code-reviewer": "allow",      // 允许审查
          "dangerous-agent": "deny"      // 显式禁止
        }
      }
    }
  }
}
```

### 通配符使用

```jsonc
{
  "agent": {
    "orchestrator": {
      "permission": {
        "task": {
          "*": "deny",
          "safe-*": "allow",            // 所有 safe- 开头的允许
          "internal/*": "allow",        // 嵌套目录的允许
          "code-reviewer": "ask"        // 需要确认
        }
      }
    }
  }
}
```

---

## skill 权限：控制技能加载

skill 权限控制 Agent 可以加载哪些技能。

### 配置示例

```jsonc
{
  "agent": {
    "restricted-agent": {
      "description": "受限 Agent，只能使用指定技能",
      "mode": "subagent",
      "permission": {
        "skill": {
          "*": "deny",                   // 禁止所有技能
          "docs-writer": "allow",        // 只允许文档技能
          "translator": "allow"
        }
      }
    }
  }
}
```

> 来源：`skill.ts:15-21`

---

## 内置安全规则

OpenCode 默认配置了一些安全规则：

### .env 文件保护

```jsonc
// 内置默认配置
{
  "permission": {
    "read": {
      "*": "allow",
      "*.env": "deny",          // .env 文件禁止读取
      "*.env.*": "deny",        // .env.xxx 也禁止
      "*.env.example": "allow"  // 示例文件允许
    }
  }
}
```

> 来源：`agent.ts:51-56`

### doom_loop 检测

当同一工具被连续调用 3 次，且输入完全相同时，触发 doom_loop 检测。

```jsonc
{
  "permission": {
    "doom_loop": "ask"    // 默认值：提示用户确认
  }
}
```

### external_directory 保护

当 Agent 尝试访问项目目录之外的路径时：

```jsonc
{
  "permission": {
    "external_directory": "ask"    // 默认值：提示用户确认
  }
}
```

### 子代理的隐式限制

除了配置的权限外，子代理（无论 subagent 还是被调用的 all 模式）还受到以下**硬编码限制**：

1. **Todo 工具禁用**
   - 子代理**永远无法使用** `todowrite` 和 `todoread`。
   - 这是为了防止子代理干扰主 Agent 的任务列表管理。

2. **主代理专属工具禁用**
   - 配置在 `primary_tools` 中的工具，子代理无法使用。

3. **Task 嵌套限制**
   - 子代理默认**不能**再调用其他子代理（除非显式授予 `task` 权限）。
   - 例如：`explore` 无法调用 `general`，因为它的默认权限是 `*: deny`。

   **为什么这样设计？**
   - **防止无限递归**：避免子 agent 之间形成循环调用链，导致任务永远无法结束
   - **控制复杂度**：让任务执行路径更可预测、更易调试
   - **资源管控**：每次调用子 agent 都会创建新 session，消耗 token 和计算资源
   - **职责分离**：子 agent 应专注做一件事，编排工作交给主 agent

---

## Agent 级别权限覆盖

在 Agent 配置中设置的权限会**覆盖**全局权限。

### JSON 配置

```jsonc
{
  "permission": {
    "bash": {
      "*": "ask",
      "git status": "allow"
    }
  },
  "agent": {
    "build": {
      "permission": {
        "bash": {
          "git push": "allow"       // build agent 额外允许 push
        }
      }
    },
    "plan": {
      "permission": {
        "bash": {
          "*": "deny",              // plan agent 禁止所有命令
          "git log*": "allow"       // 除了查看日志
        }
      }
    }
  }
}
```

### Markdown 配置

```markdown
---
description: 只读审计 Agent
mode: subagent
permission:
  edit: deny
  bash:
    "*": deny
    "git log*": allow
    "git diff*": allow
  webfetch: deny
---

只分析代码，不做任何修改。
```

---

## 安全最佳实践

### 1. 最小权限原则

只授予 Agent 完成任务所需的最小权限。

```jsonc
// ❌ 不好：过于宽松
{
  "agent": {
    "my-agent": {
      "permission": "allow"
    }
  }
}

// ✅ 好：明确列出需要的权限
{
  "agent": {
    "my-agent": {
      "permission": {
        "read": "allow",
        "edit": {
          "docs/*": "allow"
        },
        "bash": "deny"
      }
    }
  }
}
```

### 2. 显式列出允许的命令

```jsonc
// ❌ 不好：允许所有，然后禁止危险的
{
  "permission": {
    "bash": {
      "*": "allow",
      "rm -rf*": "deny"
    }
  }
}

// ✅ 好：禁止所有，然后允许需要的
{
  "permission": {
    "bash": {
      "*": "deny",
      "git status": "allow",
      "npm test": "allow"
    }
  }
}
```

### 3. 敏感操作设为 ask

```jsonc
{
  "permission": {
    "bash": {
      "*": "allow",
      "git push*": "ask",        // 推送需确认
      "npm publish*": "ask",     // 发布需确认
      "docker *": "ask"          // Docker 操作需确认
    }
  }
}
```

### 4. 定期审查权限配置

检查清单：
- [ ] 是否有不再需要的权限？
- [ ] 敏感操作是否都设为 ask？
- [ ] 新增的 Agent 权限是否合理？

---

## 踩坑提醒

| 现象 | 原因 | 解决 |
|-----|-----|-----|
| 权限不生效 | 规则顺序错误 | `*` 放最前面，具体规则放后面 |
| subagent 仍能被调用 | 用户 @ 调用不受限 | task 权限只影响 Task tool |
| bash 命令匹配失败 | 匹配的是解析后的命令 | 检查实际命令格式（含参数） |
| .env 仍能读取 | 自定义规则覆盖了默认 | 记得保留 .env deny 规则 |
| 权限太严格 | 设了 `*: deny` 忘了允许必要的 | 逐条添加允许规则 |

---

## 与 5.5 权限管控的关系

本章专注于 **Agent 级别的权限配置**。

全局权限配置和更多细节，请参考 [5.5 权限管控](./05-permissions)。

---

## 本课小结

你学会了：

1. **权限系统架构**：三种动作、配置层级、最后匹配获胜
2. **12+ 权限类型**：bash、edit、task、skill 等
3. **细粒度控制**：使用对象语法和通配符
4. **内置安全规则**：.env 保护、doom_loop、external_directory
5. **安全最佳实践**：最小权限、显式允许、敏感操作 ask

---

## 下一课预告

> 配置好权限，还有更多高级技巧：工具接口设计、透传参数、调试方法。

**下一课**：[5.2d Agent 高级技巧](./02d-agent-advanced)
