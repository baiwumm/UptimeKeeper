/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-09-10 15:37:41
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-01-05 16:43:11
 * @Description: 请求站点列表
 */
import { NextResponse } from 'next/server';

import { generateTimeRanges, ResponseDays } from '@/lib/utils'

export async function GET() {
  const API_KEY = process.env.UPTIMEROBOT_API_KEY;
  const API_URL = process.env.UPTIMEROBOT_API_URL;

  if (!API_KEY) {
    return NextResponse.json(
      { error: '缺少 UptimeRobot API Key' },
      { status: 500 }
    );
  }

  try {
    const res = await fetch(API_URL!, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      // 可选：Next.js 缓存策略
      cache: 'no-store', // 实时监控数据，建议不缓存
    })

    if (!res.ok) {
      const text = await res.text()
      return NextResponse.json(
        { message: 'UptimeRobot API error', detail: text },
        { status: res.status }
      )
    }

    const data = await res.json()

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { message: '服务器错误', error },
      { status: 500 }
    )
  }
}