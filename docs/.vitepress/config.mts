import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'OpenCode 中文教程',
  titleTemplate: ':title - AI 编程助手实战指南',
  description: 'OpenCode 是终端 AI 编程助手，本教程从零基础到进阶，教你用 AI 写代码、改 Bug、自动化办公。支持智谱、DeepSeek 等国产模型，完全免费开源。',
  lang: 'zh-CN',

  // 站点地图
  sitemap: {
    hostname: 'https://learnopencode.com',
  },

  head: [
    // 基础
    ['link', { rel: 'icon', href: '/favicon.png', type: 'image/png' }],
    ['meta', { name: 'theme-color', content: '#10b981' }],
    ['meta', { name: 'author', content: 'OpenCode 中文社区' }],
    ['meta', { name: 'keywords', content: 'OpenCode,AI编程,AI编程助手,OpenCode教程,AI写代码,智谱,DeepSeek,Claude' }],

    // Open Graph
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:locale', content: 'zh_CN' }],
    ['meta', { property: 'og:site_name', content: 'OpenCode 中文教程' }],
    ['meta', { property: 'og:title', content: 'OpenCode 中文教程 - AI 编程助手实战指南' }],
    ['meta', { property: 'og:description', content: 'OpenCode 是终端 AI 编程助手，本教程从零基础到进阶，教你用 AI 写代码、改 Bug、自动化办公。支持智谱、DeepSeek 等国产模型，完全免费开源。' }],
    ['meta', { property: 'og:image', content: 'https://learnopencode.com/og-image.png' }],
    ['meta', { property: 'og:image:width', content: '1200' }],
    ['meta', { property: 'og:image:height', content: '630' }],

    // Twitter Card
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:title', content: 'OpenCode 中文教程 - AI 编程助手实战指南' }],
    ['meta', { name: 'twitter:description', content: 'OpenCode 是终端 AI 编程助手，本教程从零基础到进阶，教你用 AI 写代码、改 Bug、自动化办公。' }],
    ['meta', { name: 'twitter:image', content: 'https://learnopencode.com/og-image.png' }],

    // 结构化数据 JSON-LD
    ['script', { type: 'application/ld+json' }, JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "OpenCode 中文教程",
      "alternateName": "OpenCode 中文实战课",
      "url": "https://learnopencode.com",
      "description": "OpenCode 是终端 AI 编程助手，本教程从零基础到进阶，教你用 AI 写代码、改 Bug、自动化办公。",
      "inLanguage": "zh-CN",
      "publisher": {
        "@type": "Organization",
        "name": "OpenCode 中文社区",
        "logo": {
          "@type": "ImageObject",
          "url": "https://learnopencode.com/logo.svg"
        }
      }
    })],

    // Google AdSense
    ['script', {
      async: 'true',
      src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1238777311285568',
      crossorigin: 'anonymous'
    }],

    // Google Analytics
    ['script', { async: 'true', src: 'https://www.googletagmanager.com/gtag/js?id=G-1R6TQGK2HZ' }],
    ['script', {}, `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'G-1R6TQGK2HZ');
    `],

    // Baidu Analytics
    ['script', {}, `
      var _hmt = _hmt || [];
      (function() {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?3a4b4bd517386d99b8badbdd25bafb7b";
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(hm, s);
      })();
    `],
  ],

  transformHead({ pageData }) {
    const canonicalUrl = `https://learnopencode.com/${pageData.relativePath}`
      .replace(/index\.md$/, '')
      .replace(/\.md$/, '.html')

    return [
      ['link', { rel: 'canonical', href: canonicalUrl }],
      ['meta', { property: 'og:url', content: canonicalUrl }],
    ]
  },

  markdown: {
    config(md) {
      const originalFence = md.renderer.rules.fence
      md.renderer.rules.fence = (...args) => {
        const html = originalFence ? originalFence(...args) : ''
        return html
          .replace(/<div class="language-/g, '<div v-pre class="language-')
          .replace(/<code(?![^>]*v-pre)/g, '<code v-pre')
      }

      const originalInline = md.renderer.rules.code_inline
      md.renderer.rules.code_inline = (...args) => {
        const html = originalInline ? originalInline(...args) : ''
        return html.replace(/<code(?![^>]*v-pre)/g, '<code v-pre')
      }
    },
  },

  themeConfig: {
    logo: {
      light: '/logo-light.png',  // 浅色主题 → 浅色背景 logo
      dark: '/logo-dark.png',    // 深色主题 → 深色背景 logo
    },

    nav: [
      { text: '开始学习', link: '/1-start/' },
      { text: '场景实战', link: '/4-scenarios/' },
      { text: '进阶手册', link: '/5-advanced/' },
      { text: '速查手册', link: '/appendix/' },
      { text: '加入社群', link: '/community' },
    ],

    sidebar: [
      {
        text: '🚀 快速起步',
        collapsed: false,
        items: [
          { text: '阶段导读', link: '/1-start/' },
          { text: '1.1 这是什么', link: '/1-start/01-intro' },
          {
            text: '1.2 安装',
            collapsed: true,
            items: [
              { text: '安装：5 分钟搞定', link: '/1-start/02-install' },
              { text: '备用安装方式', link: '/1-start/02a-install-alternatives' },
              { text: '装不上怎么办？', link: '/1-start/02b-install-troubleshoot' },
            ]
          },
          { text: '1.3 网络配置', link: '/1-start/03-network' },
          {
            text: '1.4 连接模型',
            collapsed: true,
            items: [
              { text: '总览：第一次对话', link: '/1-start/04-connect' },
              { text: '免费模型（OpenCode Zen）', link: '/1-start/04a-free-models' },
              { text: '[推荐] 智谱 GLM-4.7', link: '/1-start/04c-zhipu' },
              { text: 'DeepSeek', link: '/1-start/04b-deepseek' },
              { text: 'MiniMax', link: '/1-start/04d-minimax' },
              { text: 'Claude（Anthropic）', link: '/1-start/04e-claude' },
              { text: 'Claude Code 中转', link: '/1-start/04f-claudecode-relay' },
              { text: 'Ollama（本地）', link: '/1-start/04g-ollama' },
              { text: 'OpenAI（GPT / Codex）', link: '/1-start/04h-openai' },
              { text: '通义千问', link: '/1-start/04i-alibaba' },
            ]
          },
          { text: '1.5 自动更新', link: '/1-start/05-update' },
        ]
      },
      {
        text: '💪 日常使用',
        collapsed: false,
        items: [
          { text: '阶段导读', link: '/2-daily/' },
          { text: '2.1 界面与操作', link: '/2-daily/01-interface' },
          { text: '2.2 管理对话', link: '/2-daily/02-sessions' },
          { text: '2.3 常用快捷键', link: '/2-daily/03-shortcuts' },
          { text: '2.4 全局提示词', link: '/2-daily/04-global-rules' },
        ]
      },
      {
        text: '⚡ 高效工作流',
        collapsed: false,
        items: [
          { text: '阶段导读', link: '/3-workflow/' },
          { text: '3.1 Plan vs Build', link: '/3-workflow/01-plan-build' },
          { text: '3.2 认识 Agent', link: '/3-workflow/02-agents' },
          { text: '3.3 项目初始化', link: '/3-workflow/03-init' },
        ]
      },
      {
        text: '🎯 场景实战',
        collapsed: false,
        items: [
          { text: '选择你的路线', link: '/4-scenarios/' },
          {
            text: '✍️ 内容创作',
            collapsed: false,
            items: [
              { text: 'A1 创作工作流', link: '/4-scenarios/writer-workflow' },
              { text: 'A2 公众号创作', link: '/4-scenarios/writer-wechat' },
              { text: 'A3 小红书运营', link: '/4-scenarios/writer-xiaohongshu' },
              { text: 'A4 营销文案', link: '/4-scenarios/writer-copywriting' },
              { text: 'A5 翻译润色', link: '/4-scenarios/writer-translate' },
              { text: 'A6 小说创作', link: '/4-scenarios/writer-novel' },
              { text: 'A7 剧本写作', link: '/4-scenarios/writer-script' },
              { text: 'A8 网文创作', link: '/4-scenarios/writer-webnovel' },
              { text: 'A9 创作工作站', link: '/4-scenarios/writer-workstation' },
            ]
          },
          {
            text: '💻 我是程序员',
            collapsed: false,
            items: [
              { text: 'B1 开发日常', link: '/4-scenarios/coder-daily' },
              { text: 'B2 重构与测试', link: '/4-scenarios/coder-refactor' },
              { text: 'B3 文档与 Git', link: '/4-scenarios/coder-docs-git' },
              { text: 'B4 CI/CD 集成', link: '/4-scenarios/coder-cicd' },
              { text: 'B5 专属 Agent', link: '/4-scenarios/coder-agents' },
            ]
          },
          {
            text: '📊 效率提升',
            collapsed: false,
            items: [
              { text: 'C1 文件整理', link: '/4-scenarios/office-files' },
              { text: 'C2 数据处理', link: '/4-scenarios/office-data' },
              { text: 'C3 AI 学编程', link: '/4-scenarios/office-learn' },
              { text: 'C4 自动化脚本', link: '/4-scenarios/office-automation' },
            ]
          },
        ]
      },
      {
        text: '🔧 进阶手册',
        collapsed: false,
        items: [
          { text: '阶段导读', link: '/5-advanced/' },
          { 
            text: '5.1 配置全解',
            collapsed: true,
            items: [
              { text: '5.1a 配置基础', link: '/5-advanced/01a-config-basics' },
              { text: '5.1b 配置进阶', link: '/5-advanced/01b-config-advanced' },
            ]
          },
          { 
            text: '5.2 Agent 系统',
            collapsed: true,
            items: [
              { text: '5.2a 快速入门', link: '/5-advanced/02a-agent-quickstart' },
              { text: '5.2b 设计模式', link: '/5-advanced/02b-agent-patterns' },
              { text: '5.2c 权限与安全', link: '/5-advanced/02c-agent-permissions' },
              { text: '5.2d 高级技巧', link: '/5-advanced/02d-agent-advanced' },
            ]
          },
          { 
            text: '5.3 Skill',
            collapsed: true,
            items: [
              { text: '5.3a Skill 基础', link: '/5-advanced/03a-skills-basics' },
              { text: '5.3b Skill 进阶', link: '/5-advanced/03b-skills-advanced' },
            ]
          },
          { text: '5.4 快捷命令', link: '/5-advanced/04-commands' },
          { text: '5.5 权限管控', link: '/5-advanced/05-permissions' },
          { 
            text: '5.6 主题与快捷键',
            collapsed: true,
            items: [
              { text: '5.6a 主题系统', link: '/5-advanced/06a-themes' },
              { text: '5.6b 快捷键', link: '/5-advanced/06b-keybinds' },
            ]
          },
          { text: '5.7 MCP 扩展', 
            collapsed: true,
            items: [
              { text: '5.7a MCP 基础', link: '/5-advanced/07a-mcp-basics' },
              { text: '5.7b MCP 进阶', link: '/5-advanced/07b-mcp-advanced' },
            ]
          },
          {
            text: '5.8 IDE 集成',
            collapsed: true,
            items: [
              { text: '5.8a VS Code 扩展', link: '/5-advanced/08a-ide-vscode' },
              { text: '5.8b ACP 协议', link: '/5-advanced/08b-acp' },
            ]
          },
          { 
            text: '5.9 远程模式',
            collapsed: true,
            items: [
              { text: '5.9a 远程基础', link: '/5-advanced/09a-remote-basics' },
              { text: '5.9b API 参考', link: '/5-advanced/09b-remote-api' },
            ]
          },
          { 
            text: '5.10 SDK 开发',
            collapsed: true,
            items: [
              { text: '5.10a SDK 基础', link: '/5-advanced/10a-sdk-basics' },
              { text: '5.10b API 参考', link: '/5-advanced/10b-sdk-reference' },
            ]
          },
          { text: '5.11 企业版', link: '/5-advanced/11-enterprise' },
          { 
            text: '5.12 插件开发',
            collapsed: true,
            items: [
              { text: '5.12a 插件基础', link: '/5-advanced/12a-plugins-basics' },
              { text: '5.12b 插件进阶', link: '/5-advanced/12b-plugins-advanced' },
              { text: '5.12c Hook 教程', link: '/5-advanced/12c-hooks' },
            ]
          },
          { text: '5.13 自定义工具', link: '/5-advanced/13-custom-tools' },
          { text: '5.14 GitHub 集成', link: '/5-advanced/14-github' },
          { text: '5.15 GitLab 集成', link: '/5-advanced/15-gitlab' },
          { text: '5.16 会话分享', link: '/5-advanced/16-share' },
          { text: '5.17 内置工具', link: '/5-advanced/17-tools' },
          { text: '5.18 代码格式化器', link: '/5-advanced/18-formatters' },
          { text: '5.19 LSP 服务器', link: '/5-advanced/19-lsp' },
          { text: '5.20 上下文压缩', link: '/5-advanced/20-compaction' },
        ]
      },
      {
        text: '📚 速查手册',
        collapsed: false,
        items: [
          { text: '速查总览', link: '/appendix/' },
          { text: 'A. 快捷键速查', link: '/appendix/keybinds' },
          { text: 'B. 斜杠命令', link: '/appendix/commands' },
          { text: 'C. CLI 参考', link: '/appendix/cli' },
          { text: 'D. 配置选项', link: '/appendix/config-ref' },
          { text: 'E. 模型提供商', link: '/appendix/providers' },
          { text: 'F. Prompt 模板库', link: '/appendix/prompts' },
          { text: 'G. 常见问题', link: '/appendix/faq' },
          { text: 'H. 故障排除', link: '/appendix/troubleshoot' },
          { text: 'I. 生态系统', link: '/appendix/ecosystem' },
          { text: 'J. 迁移指南', link: '/appendix/migration' },
          { text: 'K. OpenCode Zen', link: '/appendix/zen' },
        ]
      },
      {
        text: '📝 OpenCode 更新日志',
        collapsed: true,
        items: [
          { text: '更新日志', link: '/changelog/' },
          { text: 'v1.1.16', link: '/changelog/v1.1.16' },
          { text: 'v1.1.15', link: '/changelog/v1.1.15' },
          { text: 'v1.1.14', link: '/changelog/v1.1.14' },
          { text: 'v1.1.13', link: '/changelog/v1.1.13' },
          { text: 'v1.1.12', link: '/changelog/v1.1.12' },
          { text: 'v1.1.11', link: '/changelog/v1.1.11' },
          { text: 'v1.1.10', link: '/changelog/v1.1.10' },
          { text: 'v1.1.8', link: '/changelog/v1.1.8' },
          { text: 'v1.1.7', link: '/changelog/v1.1.7' },
          { text: 'v1.1.6', link: '/changelog/v1.1.6' },
          { text: 'v1.1.4', link: '/changelog/v1.1.4' },
          { text: 'v1.1.3', link: '/changelog/v1.1.3' },
        ]
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vbgate/learn-opencode' },
    ],

    footer: {
      message: `<span title="未经授权，禁止将本站内容用于付费课程、付费专栏、出版物或其他商业用途。">本教程采用 <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh-hans" target="_blank" rel="noopener">CC BY-NC-SA 4.0</a> 许可协议 | <a href="/privacy">隐私政策</a> | © ${new Date().getFullYear()} LearnOpenCode</span>`,
    },

    // 本地搜索
    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: { buttonText: '搜索文档', buttonAriaLabel: '搜索文档' },
              modal: {
                noResultsText: '无法找到相关结果',
                resetButtonTitle: '清除查询条件',
                footer: { selectText: '选择', navigateText: '切换' },
              },
            },
          },
        },
      },
    },

    // 文档页脚导航
    docFooter: {
      prev: '上一课',
      next: '下一课',
    },

    outline: {
      label: '本页目录',
      level: [2, 3],
    },

    lastUpdated: {
      text: '最后更新',
    },

    editLink: {
      pattern: 'https://github.com/vbgate/learn-opencode/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页',
    },
  },

  // 多语言预留
  locales: {
    root: {
      label: '简体中文',
      lang: 'zh-CN',
    },
    en: {
      label: 'English',
      lang: 'en-US',
      link: '/en/',
      themeConfig: {
        nav: [
          { text: 'Start', link: '/en/1-start/' },
          { text: 'Scenarios', link: '/en/4-scenarios/' },
          { text: 'Advanced', link: '/en/5-advanced/' },
          { text: 'Reference', link: '/en/appendix/' },
          { text: 'Community', link: '/en/community' },
        ],
        sidebar: [
          {
            text: '🚀 Quick Start',
            collapsed: false,
            items: [
               { text: 'Phase Guide', link: '/en/1-start/' },
               // Add more items as pages are translated
            ]
          },
          {
            text: '🎯 Scenarios',
            collapsed: false,
            items: [
              { text: 'Choose Your Path', link: '/en/4-scenarios/' },
            ]
          }
        ],
        footer: {
          message: 'Released under the <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank">CC BY-NC-SA 4.0</a> License. | <a href="/en/privacy">Privacy Policy</a> | © 2024 LearnOpenCode',
        },
        docFooter: {
          prev: 'Previous',
          next: 'Next',
        },
        outline: {
          label: 'On this page',
        },
        lastUpdated: {
          text: 'Last updated',
        },
        editLink: {
          pattern: 'https://github.com/vbgate/learn-opencode/edit/main/docs/:path',
          text: 'Edit this page on GitHub',
        },
      }
    },
  },
})
