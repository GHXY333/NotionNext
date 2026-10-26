'use client'

import Script from 'next/script'
import { siteConfig } from '@/lib/config'

/**
 * Chatloom 聊天机器人挂件
 *
 * 参数以 Chatloom 后台「部署 → 嵌入」页面给出的代码为准。
 * 该后台代码会随你的颜色、位置等配置自动更新（含 data-v 版本号），
 * 若小部件突然不显示，第一件事是回后台对照这串代码里的参数。
 *
 * 官方 Next.js 集成指南建议使用 next/script 的 afterInteractive 策略。
 * @see https://chatloom.app/zh/docs/api
 */
export default function Chatloom() {
  // 配置项名为 CHATLOOM_AGENT_ID，对应官方代码里的 project-id
  const projectId = siteConfig('CHATLOOM_AGENT_ID')
  if (typeof projectId !== 'string' || projectId.trim() === '') {
    return null
  }

  // data-* 属性名必须与官方代码完全一致（连字符写法），
  // next/script 会把这些属性原样输出到 <script> 标签上。
  return (
    <Script
      id='chatloom-widget'
      src='https://chatloom.app/widget.min.js'
      strategy='afterInteractive'
      data-project-id={projectId.trim()}
      data-api-url='https://chatloom.app'
      data-v='16'
      data-launcher-position='bottom-right'
      onError={() => console.warn('[Chatloom] widget 脚本加载失败')}
    />
  )
}
