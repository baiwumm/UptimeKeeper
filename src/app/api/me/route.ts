/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-07-08 10:25:26
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-07-08 10:25:36
 * @Description: 获取用户信息
 */
import { uptimerobotFetch } from '@/lib/uptimerobot'
import { withApiHandler } from '@/lib/withApiHandler'

export const GET = withApiHandler(async () => {
  const result = await uptimerobotFetch('/user/me')
  return result
})