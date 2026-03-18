import Link from 'next/link'

export function Sidebar() {
  return (
    <aside className="w-64 border-r border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900">
      <nav className="space-y-2 p-4">
        <div className="mb-4 text-xs font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-400">
          메뉴
        </div>
        <Link
          href="/map"
          className="block rounded-md px-3 py-2 text-sm hover:bg-gray-200 dark:hover:bg-gray-800"
        >
          지도
        </Link>
        <Link
          href="/examples/forms"
          className="block rounded-md px-3 py-2 text-sm hover:bg-gray-200 dark:hover:bg-gray-800"
        >
          폼 예제
        </Link>
        <Link
          href="/examples/components"
          className="block rounded-md px-3 py-2 text-sm hover:bg-gray-200 dark:hover:bg-gray-800"
        >
          컴포넌트 갤러리
        </Link>
      </nav>
    </aside>
  )
}
