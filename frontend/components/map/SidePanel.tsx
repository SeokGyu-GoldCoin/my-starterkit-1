'use client'

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs'

interface SidePanelProps {
  isOpen?: boolean
  onToggle?: () => void
  children?: React.ReactNode
}

export function SidePanel({ isOpen = true, onToggle }: SidePanelProps) {
  return (
    <>
      {/* 패널 토글 버튼 */}
      <button
        onClick={onToggle}
        className="absolute left-0 top-1/2 z-20 -translate-y-1/2 rounded-r-lg bg-white p-2 shadow-md hover:bg-gray-100 dark:bg-gray-900 dark:hover:bg-gray-800"
        aria-label="사이드 패널 토글"
      >
        {isOpen ? '«' : '»'}
      </button>

      {/* 사이드 패널 */}
      <div
        className={`absolute bottom-0 left-0 top-0 w-72 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } overflow-y-auto rounded-r-lg bg-white shadow-lg dark:bg-gray-900`}
      >
        <Tabs defaultValue="layers" className="h-full">
          <TabsList className="flex w-full gap-0 rounded-none border-b border-gray-200 dark:border-gray-800">
            <TabsTrigger value="layers" className="flex-1">
              레이어
            </TabsTrigger>
            <TabsTrigger value="search" className="flex-1">
              검색
            </TabsTrigger>
            <TabsTrigger value="detail" className="flex-1">
              상세
            </TabsTrigger>
          </TabsList>

          <TabsContent value="layers" className="p-4">
            <h3 className="font-semibold">레이어</h3>
            <div className="mt-4 space-y-2">
              <label className="flex items-center gap-2">
                <input type="checkbox" defaultChecked className="rounded" />
                <span className="text-sm">마커</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" defaultChecked className="rounded" />
                <span className="text-sm">도로</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded" />
                <span className="text-sm">위성</span>
              </label>
            </div>
          </TabsContent>

          <TabsContent value="search" className="p-4">
            <h3 className="font-semibold">장소 검색</h3>
            <div className="mt-4">
              <input
                type="text"
                placeholder="검색어 입력"
                className="w-full rounded border border-gray-300 px-2 py-1 text-sm dark:border-gray-700 dark:bg-gray-800"
              />
              <div className="mt-4 space-y-2">
                <div className="rounded border border-gray-200 p-2 dark:border-gray-700">
                  <p className="text-sm font-medium">검색 결과 없음</p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="detail" className="p-4">
            <h3 className="font-semibold">마커 상세</h3>
            <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              선택된 마커가 없습니다
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}
