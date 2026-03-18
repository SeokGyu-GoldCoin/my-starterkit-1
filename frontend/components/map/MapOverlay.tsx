'use client'

import { useState } from 'react'

interface MapOverlayProps {
  onSearch?: (query: string) => void
  onZoomIn?: () => void
  onZoomOut?: () => void
  onLocationClick?: () => void
}

export function MapOverlay({
  onSearch,
  onZoomIn,
  onZoomOut,
  onLocationClick,
}: MapOverlayProps) {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (onSearch) {
      onSearch(searchQuery)
    }
  }

  return (
    <>
      {/* 검색바 */}
      <div className="absolute left-1/2 top-4 w-80 -translate-x-1/2 transform">
        <form onSubmit={handleSearch} className="flex gap-2">
          <input
            type="text"
            placeholder="장소를 검색하세요"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm placeholder-gray-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
          />
          <button
            type="submit"
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            검색
          </button>
        </form>
      </div>

      {/* 줌 컨트롤 */}
      <div className="absolute bottom-6 right-6 flex flex-col gap-2">
        <button
          onClick={onZoomIn}
          className="flex h-10 w-10 items-center justify-center rounded-lg bg-white shadow-md hover:bg-gray-100 dark:bg-gray-900 dark:hover:bg-gray-800"
          aria-label="줌 확대"
        >
          +
        </button>
        <button
          onClick={onZoomOut}
          className="flex h-10 w-10 items-center justify-center rounded-lg bg-white shadow-md hover:bg-gray-100 dark:bg-gray-900 dark:hover:bg-gray-800"
          aria-label="줌 축소"
        >
          −
        </button>
        <button
          onClick={onLocationClick}
          className="flex h-10 w-10 items-center justify-center rounded-lg bg-white shadow-md hover:bg-gray-100 dark:bg-gray-900 dark:hover:bg-gray-800"
          aria-label="현재 위치"
        >
          ◎
        </button>
      </div>
    </>
  )
}
