import { type NextRequest, NextResponse } from 'next/server'

type ApiHandler = (
  req: NextRequest
) => Promise<unknown>

export function withApiHandler(handler: ApiHandler) {
  return async function (req: NextRequest) {
    try {
      const data = await handler(req)
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