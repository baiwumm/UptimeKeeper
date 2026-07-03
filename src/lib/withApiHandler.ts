import { NextResponse } from 'next/server'

export function withApiHandler(
  handler: () => Promise<any>,
) {
  return async function () {
    try {
      const data = await handler()
      return NextResponse.json(data)
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
}