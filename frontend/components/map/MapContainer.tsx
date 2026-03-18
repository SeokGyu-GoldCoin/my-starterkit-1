'use client'

import { useEffect, useRef, useState } from 'react'
import { KakaoMapAdapter } from '@/lib/map/kakao/adapter'
import { NaverMapAdapter } from '@/lib/map/naver/adapter'
import { VWorldMapAdapter } from '@/lib/map/vworld/adapter'
import type { IMapAdapter } from '@/lib/map/types'

const mapProviders = {
  kakao: KakaoMapAdapter,
  naver: NaverMapAdapter,
  vworld: VWorldMapAdapter,
}

interface MapContainerProps {
  provider?: 'kakao' | 'naver' | 'vworld'
  zoom?: number
  center?: { lat: number; lng: number }
  onMapReady?: (adapter: IMapAdapter) => void
}

export function MapContainer({
  provider = 'kakao',
  zoom = 13,
  center = { lat: 37.5665, lng: 126.9780 },
  onMapReady,
}: MapContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const adapterRef = useRef<IMapAdapter | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const initializeMap = async () => {
      try {
        setIsLoading(true)
        setError(null)

        // 환경변수에서 공급자 선택
        const selectedProvider =
          (process.env.NEXT_PUBLIC_MAP_PROVIDER as 'kakao' | 'naver' | 'vworld') ||
          provider

        const AdapterClass = mapProviders[selectedProvider]

        if (!AdapterClass) {
          throw new Error(`지도 공급자를 찾을 수 없습니다: ${selectedProvider}`)
        }

        adapterRef.current = new AdapterClass()
        await adapterRef.current.initialize(containerRef.current!, {
          zoom,
          center,
        })

        if (onMapReady) {
          onMapReady(adapterRef.current)
        }

        setIsLoading(false)
      } catch (err) {
        console.error('지도 초기화 실패:', err)
        setError(err instanceof Error ? err.message : '지도 초기화 실패')
        setIsLoading(false)
      }
    }

    initializeMap()

    return () => {
      if (adapterRef.current) {
        adapterRef.current.destroy()
        adapterRef.current = null
      }
    }
  }, [provider, zoom, center, onMapReady])

  return (
    <div
      ref={containerRef}
      className="h-full w-full bg-gray-100"
    >
      {isLoading && (
        <div className="flex h-full items-center justify-center">
          <p className="text-gray-500">지도 로딩 중...</p>
        </div>
      )}
      {error && (
        <div className="flex h-full items-center justify-center">
          <div className="text-center">
            <p className="mb-2 text-red-500">지도 로드 실패</p>
            <p className="text-sm text-gray-600">{error}</p>
          </div>
        </div>
      )}
    </div>
  )
}
