/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-09-10 15:37:41
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-07-03 10:02:29
 * @Description: 请求站点列表
 */
import { uptimerobotFetch } from '@/lib/uptimerobot'
import { withApiHandler } from '@/lib/withApiHandler'

export const GET = withApiHandler(async () => {
  const result = await uptimerobotFetch('/monitors')
  return result?.data ?? []
})