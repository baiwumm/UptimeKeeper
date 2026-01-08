/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-09-10 15:37:41
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-01-06 13:48:12
 * @Description: 请求站点列表
 */
import { NextResponse } from 'next/server';

export async function GET() {
  const API_KEY = process.env.UPTIMEROBOT_API_KEY;
  const API_URL = process.env.UPTIMEROBOT_API_URL;
  const STATUS_API_URL = process.env.UPTIMEROBOT_STATUS_API_URL;

  if (!API_KEY) {
    return NextResponse.json(
      { error: '缺少 UptimeRobot API Key' },
      { status: 500 }
    );
  }

  try {
    // 请求站点列表
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

    const data = (await res.json())?.data || [];
    let result = [];
    let statistics = {};
    if (data?.length) {
      // 请求站点状态
      const statusRes = await fetch(STATUS_API_URL!, {
        method: 'GET'
      });
      const statusData = await statusRes.json();
      if (statusData?.statistics) {
        statistics = statusData?.statistics;
      }
      result = data.map((m) => {
        const monitor = statusData.data.find((s) => s.monitorId === m.id);
        return {
          ...m,
          monitor
        }
      })
    }
    return NextResponse.json({ data: result, statistics })
  } catch (error) {
    return NextResponse.json(
      { message: '服务器错误', error },
      { status: 500 }
    )
  }
}