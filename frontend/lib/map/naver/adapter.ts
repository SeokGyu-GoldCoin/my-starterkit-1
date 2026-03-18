import type { IMapAdapter, IMapMarker, IMapViewport } from '../types'

// Naver Maps API 타입 (글로벌)
declare global {
  interface Window {
    naver?: any
  }
}

export class NaverMapAdapter implements IMapAdapter {
  private map: any = null
  private markers: Map<string, any> = new Map()
  private markerClickCallback?: (id: string) => void
  private mapClickCallback?: (lat: number, lng: number) => void

  private async loadNaverMaps(clientId: string) {
    return new Promise<void>((resolve, reject) => {
      const script = document.createElement('script')
      script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${clientId}`
      script.async = true
      script.onload = () => resolve()
      script.onerror = () => reject(new Error('Naver Maps API를 로드할 수 없습니다'))
      document.head.appendChild(script)
    })
  }

  async initialize(container: HTMLElement, options?: { zoom?: number; center?: { lat: number; lng: number } }) {
    // Naver Maps API 키 확인
    const clientId = process.env.NEXT_PUBLIC_NAVER_CLIENT_ID
    if (!clientId) {
      throw new Error('NEXT_PUBLIC_NAVER_CLIENT_ID 환경 변수가 설정되지 않았습니다')
    }

    // Naver Maps API 로드
    if (!window.naver) {
      await this.loadNaverMaps(clientId)
    }

    return new Promise<void>((resolve, reject) => {
      if (!window.naver) {
        reject(new Error('Naver Maps API를 로드할 수 없습니다'))
        return
      }

      try {
        const center = options?.center || { lat: 37.5665, lng: 126.9780 }
        const zoom = options?.zoom || 13

        this.map = new window.naver!.maps.Map(container, {
          center: new window.naver!.maps.LatLng(center.lat, center.lng),
          zoom,
        })

        // 지도 클릭 이벤트
        window.naver!.maps.event.addListener(this.map, 'click', (e: any) => {
          if (this.mapClickCallback) {
            this.mapClickCallback(e.coord.y, e.coord.x)
          }
        })

        resolve()
      } catch (error) {
        reject(error)
      }
    })
  }

  destroy() {
    this.markers.clear()
    this.map = null
  }

  addMarker(marker: IMapMarker) {
    if (!this.map || !window.naver) return

    const naverMarker = new window.naver.maps.Marker({
      position: new window.naver.maps.LatLng(marker.lat, marker.lng),
      map: this.map,
      title: marker.title,
    })

    // 마커 클릭 이벤트
    window.naver.maps.event.addListener(naverMarker, 'click', () => {
      if (this.markerClickCallback) {
        this.markerClickCallback(marker.id)
      }
    })

    this.markers.set(marker.id, naverMarker)
  }

  removeMarker(id: string) {
    const naverMarker = this.markers.get(id)
    if (naverMarker) {
      naverMarker.setMap(null)
      this.markers.delete(id)
    }
  }

  updateMarker(id: string, marker: Partial<IMapMarker>) {
    const naverMarker = this.markers.get(id)
    if (naverMarker && window.naver && marker.lat && marker.lng) {
      naverMarker.setPosition(new window.naver.maps.LatLng(marker.lat, marker.lng))
      if (marker.title) {
        naverMarker.setTitle(marker.title)
      }
    }
  }

  clearMarkers() {
    this.markers.forEach((naverMarker) => {
      naverMarker.setMap(null)
    })
    this.markers.clear()
  }

  setCenter(lat: number, lng: number) {
    if (!this.map || !window.naver) return
    this.map.setCenter(new window.naver.maps.LatLng(lat, lng))
  }

  setZoom(level: number) {
    if (!this.map) return
    this.map.setZoom(level)
  }

  getViewport(): IMapViewport {
    if (!this.map) {
      return { center: { lat: 37.5665, lng: 126.9780 }, zoom: 13 }
    }

    const center = this.map.getCenter()
    const zoom = this.map.getZoom()

    return {
      center: {
        lat: center.y,
        lng: center.x,
      },
      zoom,
    }
  }

  fitBounds(markers: IMapMarker[]) {
    if (!this.map || !window.naver || markers.length === 0) return

    const bounds = new window.naver.maps.LatLngBounds()

    markers.forEach((marker) => {
      bounds.extend(new window.naver!.maps.LatLng(marker.lat, marker.lng))
    })

    this.map.fitBounds(bounds)
  }

  onMarkerClick(callback: (id: string) => void) {
    this.markerClickCallback = callback
  }

  onMapClick(callback: (lat: number, lng: number) => void) {
    this.mapClickCallback = callback
  }
}
