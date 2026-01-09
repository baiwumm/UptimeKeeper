/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-01-09 13:40:32
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-01-09 14:46:43
 * @Description: 获取监控详情
 */

import { NextResponse } from 'next/server';

export async function GET(_, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const API_KEY = process.env.UPTIMEROBOT_API_KEY;
  const STATUS_API_URL = process.env.UPTIMEROBOT_STATUS_API_URL;
  const STATUS_API_KEY = process.env.UPTIMEROBOT_STATUS_API_KEY;

  if (!API_KEY) {
    return NextResponse.json(
      { error: '缺少 UptimeRobot API Key' },
      { status: 500 }
    );
  }

  try {
    // 请求站点列表
    const res = await fetch(`${STATUS_API_URL}/getMonitor/${STATUS_API_KEY}?m=${id}`, {
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

    const data = await res.json();
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { message: '服务器错误', error },
      { status: 500 }
    )
  }
}