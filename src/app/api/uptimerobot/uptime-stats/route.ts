/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-09-10 15:37:41
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-07-03 10:20:51
 * @Description: 汇总运行时间统计
 */
import { uptimerobotFetch } from '@/lib/uptimerobot'
import { withApiHandler } from '@/lib/withApiHandler'

export const GET = withApiHandler(async () => {
  const result = await uptimerobotFetch('/monitors/uptime-stats?timeFrame=DAYS_30')
  return result
})