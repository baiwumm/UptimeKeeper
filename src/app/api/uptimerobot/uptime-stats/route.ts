/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-09-10 15:37:41
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-07-08 11:53:53
 * @Description: 汇总运行时间统计
 */
import { type NextRequest } from 'next/server'

import { uptimerobotFetch } from '@/lib/uptimerobot'
import { withApiHandler } from '@/lib/withApiHandler'

export const GET = withApiHandler(async (request: NextRequest) => {
  const { searchParams } = request.nextUrl
  const timeFrame = searchParams.get('timeFrame')

  const result = await uptimerobotFetch(`/monitors/uptime-stats?timeFrame=${timeFrame}`)
  return result
})