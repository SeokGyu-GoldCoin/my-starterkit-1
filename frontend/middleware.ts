import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  // 프로덕션 환경에서 목 API 차단
  if (
    process.env.NODE_ENV === 'production' &&
    request.nextUrl.pathname.startsWith('/api/mock')
  ) {
    return NextResponse.json(
      { error: '목 API는 프로덕션에서 사용할 수 없습니다' },
      { status: 404 }
    )
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/api/mock/:path*',
}
