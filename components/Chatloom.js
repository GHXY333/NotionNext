import { siteConfig } from '@/lib/config'
import ExternalScript from './ExternalScript'

/**
 * Chatloom 聊天机器人挂件
 * 在页面右下角加载官方 widget，外观、语言、欢迎语都在 Chatloom 后台配置，
 * 这里只需要一个公开的 agent id。
 * @see https://chatloom.app/zh/docs/api
 */
export default function Chatloom() {
  // 只接受非空字符串类型的 agent id
  const agentId = siteConfig('CHATLOOM_AGENT_ID')
  if (typeof agentId !== 'string' || agentId.trim() === '') {
    return null
  }

  // ExternalScript 会把除 src 以外的参数转成 script 的属性
  // 注意：官方参数名是 data-agent-id，不是 data-id
  return (
    <ExternalScript
      id='chatloom-widget'
      src='https://chatloom.app/widget.js'
      data-agent-id={agentId.trim()}
    />
  )
}
