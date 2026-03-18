// 지도 마커 인터페이스
export interface IMapMarker {
  id: string
  title: string
  lat: number
  lng: number
  description?: string
}

// 지도 뷰포트 (중심 좌표 + 줌 레벨)
export interface IMapViewport {
  center: { lat: number; lng: number }
  zoom: number
}

// 지도 어댑터 인터페이스 (모든 GIS 공급자가 구현해야 함)
export interface IMapAdapter {
  // 초기화
  initialize(container: HTMLElement, options: any): Promise<void>

  // 정리 및 해제
  destroy(): void

  // 마커 관련
  addMarker(marker: IMapMarker): void
  removeMarker(id: string): void
  updateMarker(id: string, marker: Partial<IMapMarker>): void
  clearMarkers(): void

  // 뷰포트 관련
  setCenter(lat: number, lng: number): void
  setZoom(level: number): void
  getViewport(): IMapViewport
  fitBounds(markers: IMapMarker[]): void

  // 이벤트
  onMarkerClick(callback: (id: string) => void): void
  onMapClick(callback: (lat: number, lng: number) => void): void
}
