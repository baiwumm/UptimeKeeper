/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-07-10 16:23:43
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-07-10 16:52:21
 * @Description: 获取响应趋势
 */
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { type NextRequest, NextResponse } from 'next/server'

import { uptimerobotFetch } from '@/lib/uptimerobot'

dayjs.extend(utc)

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const { searchParams } = req.nextUrl
    let days = Number(searchParams.get('days') ?? 1)

    // 只允许 1、7、30
    days = [1, 7, 30].includes(days) ? days : 1

    // 转成 2025-01-01T00:00:00Z 格式
    const startTime = dayjs()
      .utc()
      .subtract(days, 'day')
      .format('YYYY-MM-DDTHH:mm:ss[Z]')
    console.log('id', id)
    console.log(111, startTime)
    const endTime = dayjs()
      .utc()
      .format('YYYY-MM-DDTHH:mm:ss[Z]')

    const result = await uptimerobotFetch(
      `/monitors/${id}/stats/response-time?from=${startTime}&to=${endTime}&includeTimeSeries=true`
    )
    return NextResponse.json(result)
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      return NextResponse.json(
        { message: '请求超时' },
        { status: 504 },
      )
    }
    return NextResponse.json(
      {
        message: error instanceof Error ? error.message : '服务器错误',
      },
      { status: 500 },
    )
  }
}