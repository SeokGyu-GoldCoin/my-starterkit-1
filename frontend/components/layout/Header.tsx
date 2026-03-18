import Link from 'next/link'
import { ModeToggle } from './ModeToggle'

export function Header() {
  return (
    <header className="border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
      <div className="flex items-center justify-between px-6 py-4">
        <Link href="/" className="text-xl font-bold text-gray-900 dark:text-white">
          지도 Starter Kit
        </Link>
        <nav className="flex items-center gap-6">
          <Link href="/map" className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
            지도
          </Link>
          <Link href="/examples/forms" className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
            폼
          </Link>
          <Link href="/examples/components" className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
            컴포넌트
          </Link>
          <ModeToggle />
        </nav>
      </div>
    </header>
  )
}
