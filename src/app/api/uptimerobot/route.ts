/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-09-10 15:37:41
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-09-11 11:02:34
 * @Description: 请求站点列表
 */
import { NextResponse } from 'next/server';

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
    const now = Math.floor(Date.now() / 1000);
    const start = now - 24 * 60 * 60;
    const response = await fetch(API_URL as string, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        api_key: API_KEY, // API 密钥（必填）
        format: 'json', // json 或 xml
        response_times: '1', // 1=返回响应时间点
        logs: '1', // 1=返回日志
        custom_uptime_ratios: '30', // 如 '7-30'，正常运行时间百分比
        response_times_average: '30', // 每 30 分钟取一次响应时间
        response_times_start_date: start.toString(),
        response_times_end_date: now.toString(),
      }),
    });

    if (!response.ok) {
      throw new Error(`UptimeRobot API 接口报错: ${response.status}`);
    }

    const data = await response.json();
    // 检查返回状态
    if (data?.stat === 'ok') {
      return NextResponse.json(data.monitors);
    } else {
      throw new Error(`API 请求失败: ${data?.message || '未知错误'}`);
    }
  } catch (error) {
    throw new Error(`UptimeRobot API 接口报错: ${(error as Error).message}`);
  }
}