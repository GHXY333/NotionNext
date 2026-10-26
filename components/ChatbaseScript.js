'use client'

import { useEffect } from 'react'

/**
 * Chatbase 机器人脚本注入
 *
 * 从 ExternalPlugins 中抽出来是为了让脚本的插入与移除成对出现：
 * React 在客户端不会执行 JSX 中以字面量形式动态渲染的 <script>，
 * 而直接挂在 document 上的标签又会在路由切换时残留，导致重复初始化。
 * 这里用 createElement + 卸载时移除的方式保证幂等。
 *
 * @see https://www.chatbase.co/
 */
export default function ChatbaseScript({ chatbotId }) {
  useEffect(() => {
    if (!chatbotId || typeof document === 'undefined') {
      return
    }

    // 先设置全局配置，再加载脚本，顺序不能反
    window.chatbaseConfig = {
      ...window.chatbaseConfig,
      chatbotId: String(chatbotId)
    }

    // 同一页面内若已注入过，直接复用，不重复插入
    const src = 'https://www.chatbase.co/embed.min.js'
    const existed = document.querySelector(`script[src="${src}"]`)
    if (existed) {
      return () => {}
    }

    const script = document.createElement('script')
    script.src = src
    script.defer = true
    // 用 id 标记，便于调试时定位本组件注入的标签
    script.setAttribute('data-notionnext', 'chatbase')
    document.body.appendChild(script)

    return () => {
      // 组件卸载时移除本组件插入的标签，避免路由切换后残留
      script.remove()
    }
  }, [chatbotId])

  return null
}
