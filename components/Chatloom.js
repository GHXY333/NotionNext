import { siteConfig } from '@/lib/config'
import ExternalScript from './ExternalScript'

/**
 * Chatloom 聊天机器人挂件
 *
 * 外观（颜色、位置、语言、欢迎语）全部在 Chatloom 后台配置，
 * 后台「安装代码」给出的嵌入代码会随这些配置自动变化，因此本组件
 * 以官方代码为准，而不是 API 文档里的旧示例。
 *
 * 官方后台给出的嵌入代码（示例，ID 已打码）：
 * <script src="https://chatloom.app/widget.min.js" defer
 *         data-project-id="<your-project-id>"
 *         data-api-url="https://chatloom.app"
 *         data-v="10"
 *         data-launcher-position="bottom-right"></script>
 *
 * @see https://chatloom.app/zh/docs/api
 */
export default function Chatloom() {
  // 配置项名为 CHATLOOM_AGENT_ID，对应官方代码里的 project-id
  const projectId = siteConfig('CHATLOOM_AGENT_ID')
  if (typeof projectId !== 'string' || projectId.trim() === '') {
    return null
  }

  // ExternalScript 会把除 src 以外的参数原样 setAttribute 到 script 上，
  // 因此这里的 key 必须与官方代码的属性名完全一致（data-* 连字符写法）。
  return (
    <ExternalScript
      id='chatloom-widget'
      src='https://chatloom.app/widget.min.js'
      defer={true}
      data-project-id={projectId.trim()}
      data-api-url='https://chatloom.app'
      data-v='10'
      data-launcher-position='bottom-right'
    />
  )
}
