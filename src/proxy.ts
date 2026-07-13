import { NextRequest, NextResponse } from 'next/server'

export default async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl
  const API_KEY = process.env.UPTIMEROBOT_API_KEY

  // 1. 不是 /api 直接放行
  if (!pathname.startsWith('/api')) {
    return NextResponse.next()
  }

  if (!API_KEY) {
    return NextResponse.json(
      { message: '缺少 UptimeRobot API Key' },
      { status: 500 }
    );
  }

  return NextResponse.next()
}