<template>
  <!-- 只有启用时才渲染 -->
  <div v-if="isEnabled" class="ai-chat-container">
    <!-- 浮动按钮 -->
    <button
      class="ai-chat-fab"
      :class="{ 'is-open': isOpen }"
      @click="toggleChat"
      :aria-label="isOpen ? '关闭 AI 助手' : '打开 AI 助手'"
    >
      <svg v-if="!isOpen" class="ai-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z"/>
        <circle cx="7.5" cy="14.5" r="1.5"/>
        <circle cx="16.5" cy="14.5" r="1.5"/>
      </svg>
      <svg v-else class="close-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M18 6L6 18M6 6l12 12"/>
      </svg>
    </button>

    <!-- 聊天窗口 -->
    <Transition name="chat-window">
      <div v-if="isOpen" class="ai-chat-window">
        <!-- 头部 -->
        <div class="chat-header">
          <div class="header-title">
            <span class="header-icon">🤖</span>
            <span>AI 问答助手</span>
          </div>
          <span class="header-badge">Beta</span>
        </div>

        <!-- 消息列表 -->
        <div ref="messagesContainer" class="chat-messages">
          <!-- 欢迎消息 -->
          <div v-if="messages.length === 0" class="welcome-message">
            <div class="welcome-icon">👋</div>
            <div class="welcome-title">你好！我是 OpenCode 助手</div>
            <div class="welcome-desc">有任何关于 OpenCode 的问题，都可以问我</div>
            <div class="welcome-examples">
              <button
                v-for="example in exampleQuestions"
                :key="example"
                class="example-btn"
                @click="askExample(example)"
              >
                {{ example }}
              </button>
            </div>
          </div>

          <!-- 消息气泡 -->
          <div
            v-for="(msg, index) in messages"
            :key="index"
            class="message"
            :class="msg.role"
          >
            <div class="message-content" v-html="formatMessage(msg.content)"></div>
          </div>

          <!-- 加载指示器 -->
          <div v-if="isLoading" class="message assistant loading">
            <div class="typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>

        <!-- 输入区域 -->
        <div class="chat-input-area">
          <div class="input-wrapper">
            <textarea
              v-model="inputText"
              class="chat-input"
              placeholder="输入你的问题..."
              rows="1"
              @keydown.enter.exact.prevent="sendMessage"
              @input="autoResize"
              :disabled="isLoading"
            ></textarea>
            <button
              class="send-btn"
              @click="sendMessage"
              :disabled="!inputText.trim() || isLoading"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
              </svg>
            </button>
          </div>
          <div class="input-hint">按 Enter 发送，Shift+Enter 换行</div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue'

// 环境变量配置
// VITE_ 前缀的环境变量会在构建时注入
// 需要显式设置 VITE_AI_CHAT_ENABLED=true 才启用
const envEnabled = import.meta.env.VITE_AI_CHAT_ENABLED
const isEnabled = envEnabled === 'true'
const apiUrl = import.meta.env.VITE_AI_API_URL || '/api/ai/chat'

// 状态
const isOpen = ref(false)
const messages = ref<Array<{ role: 'user' | 'assistant'; content: string }>>([])
const inputText = ref('')
const isLoading = ref(false)
const messagesContainer = ref<HTMLElement | null>(null)

// 示例问题
const exampleQuestions = [
  'OpenCode 怎么安装？',
  '如何配置智谱模型？',
  '什么是 Agent？',
]

// 切换聊天窗口
function toggleChat() {
  isOpen.value = !isOpen.value
}

// 自动调整输入框高度
function autoResize(event: Event) {
  const textarea = event.target as HTMLTextAreaElement
  textarea.style.height = 'auto'
  textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px'
}

// 滚动到底部
function scrollToBottom() {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
  })
}

// HTML 转义（防止 XSS）
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

// 格式化消息（简单 Markdown 支持）
function formatMessage(content: string): string {
  // 先转义 HTML，防止 XSS 攻击
  let escaped = escapeHtml(content)

  return escaped
    // 代码块（转义后的内容中 ``` 仍然是 ```）
    .replace(/```(\w*)\n?([\s\S]*?)```/g, '<pre><code>$2</code></pre>')
    // 行内代码
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    // 粗体（转义后 ** 仍然是 **）
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    // 斜体
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    // 链接（需要反转义 URL 中的 &amp;）
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, text, url) => {
      const safeUrl = url.replace(/&amp;/g, '&')
      return `<a href="${safeUrl}" target="_blank" rel="noopener">${text}</a>`
    })
    // 换行
    .replace(/\n/g, '<br>')
}

// 发送示例问题
function askExample(question: string) {
  inputText.value = question
  sendMessage()
}

// 发送消息
async function sendMessage() {
  const text = inputText.value.trim()
  if (!text || isLoading.value) return

  // 添加用户消息
  messages.value.push({ role: 'user', content: text })
  inputText.value = ''
  isLoading.value = true
  scrollToBottom()

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: text }),
    })

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`)
    }

    const data = await response.json()
    messages.value.push({ role: 'assistant', content: data.answer })
  } catch (error) {
    console.error('AI Chat error:', error)
    messages.value.push({
      role: 'assistant',
      content: '抱歉，服务暂时不可用，请稍后再试。如果问题持续，请查看 [常见问题](/appendix/faq) 或 [加入社群](/community) 获取帮助。',
    })
  } finally {
    isLoading.value = false
    scrollToBottom()
  }
}
</script>

<style scoped>
/* ============================================
   AI Chat 浮动按钮 + 弹窗组件样式
   ============================================ */

.ai-chat-container {
  /* 容器不影响布局 */
}

/* ----------------------------------------
   浮动按钮
   ---------------------------------------- */
.ai-chat-fab {
  position: fixed;
  right: 24px;
  bottom: 24px;
  z-index: 100;
  width: 56px;
  height: 56px;
  border: none;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--vp-c-brand-1), var(--vp-c-brand-2));
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 16px rgba(16, 185, 129, 0.4);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.ai-chat-fab:hover {
  transform: scale(1.08);
  box-shadow: 0 6px 24px rgba(16, 185, 129, 0.5);
}

.ai-chat-fab.is-open {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.ai-chat-fab .ai-icon,
.ai-chat-fab .close-icon {
  width: 28px;
  height: 28px;
}

/* 脉冲动画 */
.ai-chat-fab:not(.is-open)::before {
  content: '';
  position: absolute;
  inset: -4px;
  border-radius: 50%;
  background: var(--vp-c-brand-1);
  opacity: 0;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 0.4;
  }
  100% {
    transform: scale(1.4);
    opacity: 0;
  }
}

/* ----------------------------------------
   聊天窗口
   ---------------------------------------- */
.ai-chat-window {
  position: fixed;
  right: 24px;
  bottom: 96px;
  z-index: 99;
  width: 420px;
  max-height: calc(100vh - 140px);
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  box-shadow: 0 12px 48px rgba(0, 0, 0, 0.15);
  overflow: hidden;
}

/* 窗口动画 */
.chat-window-enter-active,
.chat-window-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.chat-window-enter-from,
.chat-window-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.95);
}

/* ----------------------------------------
   头部
   ---------------------------------------- */
.chat-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
}

.header-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  font-size: 15px;
  color: var(--vp-c-text-1);
}

.header-icon {
  font-size: 20px;
}

.header-badge {
  font-size: 11px;
  font-weight: 500;
  padding: 2px 8px;
  border-radius: 10px;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
}

/* ----------------------------------------
   消息列表
   ---------------------------------------- */
.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  min-height: 300px;
  max-height: 400px;
}

/* 欢迎消息 */
.welcome-message {
  text-align: center;
  padding: 32px 16px;
}

.welcome-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.welcome-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 8px;
}

.welcome-desc {
  font-size: 14px;
  color: var(--vp-c-text-2);
  margin-bottom: 24px;
}

.welcome-examples {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.example-btn {
  padding: 10px 16px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;
  text-align: left;
}

.example-btn:hover {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
}

/* 消息气泡 */
.message {
  margin-bottom: 12px;
  display: flex;
}

.message.user {
  justify-content: flex-end;
}

.message.assistant {
  justify-content: flex-start;
}

.message-content {
  max-width: 85%;
  padding: 10px 14px;
  border-radius: 12px;
  font-size: 14px;
  line-height: 1.6;
  word-break: break-word;
}

.message.user .message-content {
  background: linear-gradient(135deg, var(--vp-c-brand-1), var(--vp-c-brand-2));
  color: white;
  border-bottom-right-radius: 4px;
}

.message.assistant .message-content {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  border-bottom-left-radius: 4px;
}

/* 消息内的代码样式 */
.message-content :deep(code) {
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 13px;
  font-family: var(--vp-font-family-mono);
}

.message.user .message-content :deep(code) {
  background: rgba(255, 255, 255, 0.2);
}

.message.assistant .message-content :deep(code) {
  background: var(--vp-c-bg-alt);
}

.message-content :deep(pre) {
  margin: 8px 0;
  padding: 12px;
  border-radius: 8px;
  background: var(--vp-c-bg-alt);
  overflow-x: auto;
}

.message-content :deep(pre code) {
  padding: 0;
  background: none;
}

.message-content :deep(a) {
  color: inherit;
  text-decoration: underline;
}

/* 加载指示器 */
.typing-indicator {
  display: flex;
  gap: 4px;
  padding: 8px 0;
}

.typing-indicator span {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--vp-c-text-3);
  animation: typing 1.4s infinite;
}

.typing-indicator span:nth-child(2) {
  animation-delay: 0.2s;
}

.typing-indicator span:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes typing {
  0%, 60%, 100% {
    transform: translateY(0);
    opacity: 0.4;
  }
  30% {
    transform: translateY(-8px);
    opacity: 1;
  }
}

/* ----------------------------------------
   输入区域
   ---------------------------------------- */
.chat-input-area {
  padding: 12px 16px 16px;
  border-top: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
}

.input-wrapper {
  display: flex;
  gap: 8px;
  align-items: flex-end;
}

.chat-input {
  flex: 1;
  padding: 10px 14px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  font-size: 14px;
  font-family: inherit;
  line-height: 1.5;
  resize: none;
  outline: none;
  transition: border-color 0.2s;
  max-height: 120px;
}

.chat-input:focus {
  border-color: var(--vp-c-brand-1);
}

.chat-input::placeholder {
  color: var(--vp-c-text-3);
}

.chat-input:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.send-btn {
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 10px;
  background: var(--vp-c-brand-1);
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  flex-shrink: 0;
}

.send-btn:hover:not(:disabled) {
  background: var(--vp-c-brand-2);
}

.send-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.send-btn svg {
  width: 18px;
  height: 18px;
}

.input-hint {
  margin-top: 8px;
  font-size: 11px;
  color: var(--vp-c-text-3);
  text-align: center;
}

/* ----------------------------------------
   响应式
   ---------------------------------------- */
@media (max-width: 768px) {
  .ai-chat-fab {
    right: 16px;
    bottom: 16px;
    width: 52px;
    height: 52px;
  }

  .ai-chat-window {
    right: 8px;
    left: 8px;
    bottom: 80px;
    width: auto;
    max-height: calc(100vh - 120px);
  }

  .chat-messages {
    min-height: 250px;
    max-height: calc(100vh - 280px);
  }
}
</style>
