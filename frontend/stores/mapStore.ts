import { create } from 'zustand'
import type { IMapViewport } from '@/lib/map/types'

interface MapState {
  // 뷰포트
  viewport: IMapViewport
  setViewport: (viewport: IMapViewport) => void
  setCenter: (lat: number, lng: number) => void
  setZoom: (zoom: number) => void

  // 선택된 마커
  selectedMarkerId: string | null
  setSelectedMarkerId: (id: string | null) => void

  // 레이어 목록
  layers: { id: string; name: string; visible: boolean }[]
  toggleLayer: (id: string) => void
}

const defaultViewport: IMapViewport = {
  center: { lat: 37.5665, lng: 126.9780 },
  zoom: 13,
}

export const useMapStore = create<MapState>((set) => ({
  // 뷰포트 상태
  viewport: defaultViewport,
  setViewport: (viewport) => set({ viewport }),
  setCenter: (lat, lng) =>
    set((state) => ({
      viewport: {
        ...state.viewport,
        center: { lat, lng },
      },
    })),
  setZoom: (zoom) =>
    set((state) => ({
      viewport: {
        ...state.viewport,
        zoom,
      },
    })),

  // 선택된 마커
  selectedMarkerId: null,
  setSelectedMarkerId: (id) => set({ selectedMarkerId: id }),

  // 레이어
  layers: [
    { id: 'markers', name: '마커', visible: true },
    { id: 'roads', name: '도로', visible: true },
    { id: 'satellite', name: '위성', visible: false },
  ],
  toggleLayer: (id) =>
    set((state) => ({
      layers: state.layers.map((layer) =>
        layer.id === id ? { ...layer, visible: !layer.visible } : layer
      ),
    })),
}))
