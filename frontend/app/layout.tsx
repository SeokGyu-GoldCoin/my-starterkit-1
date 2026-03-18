import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '지도 Starter Kit',
  description: '지도 중심 프로젝트 스타터킷',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body>
        {children}
      </body>
    </html>
  )
}
