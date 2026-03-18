import type { IMapAdapter, IMapMarker, IMapViewport } from '../types'

// Kakao Maps API 타입 (글로벌)
declare global {
  interface Window {
    kakao?: any
  }
}

export class KakaoMapAdapter implements IMapAdapter {
  private map: any = null
  private markers: Map<string, any> = new Map()
  private markerClickCallback?: (id: string) => void
  private mapClickCallback?: (lat: number, lng: number) => void

  private async loadKakaoMaps(appKey: string) {
    return new Promise<void>((resolve, reject) => {
      const script = document.createElement('script')
      script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${appKey}&autoload=false&libraries=services,drawing`
      script.async = true
      script.onload = () => resolve()
      script.onerror = () => reject(new Error('Kakao Maps API를 로드할 수 없습니다'))
      document.head.appendChild(script)
    })
  }

  async initialize(container: HTMLElement, options?: { zoom?: number; center?: { lat: number; lng: number } }) {
    // Kakao Maps API 키 확인
    const appKey = process.env.NEXT_PUBLIC_KAKAO_APP_KEY
    if (!appKey) {
      throw new Error('NEXT_PUBLIC_KAKAO_APP_KEY 환경 변수가 설정되지 않았습니다')
    }

    // Kakao Maps API 로드
    if (!window.kakao) {
      await this.loadKakaoMaps(appKey)
    }

    return new Promise<void>((resolve, reject) => {
      if (!window.kakao) {
        reject(new Error('Kakao Maps API를 로드할 수 없습니다'))
        return
      }

      window.kakao.maps.load(() => {
        try {
          const center = options?.center || { lat: 37.5665, lng: 126.9780 }
          const zoom = options?.zoom || 13

          this.map = new window.kakao!.maps.Map(container, {
            center: new window.kakao!.maps.LatLng(center.lat, center.lng),
            level: zoom,
          })

          // 지도 클릭 이벤트
          window.kakao!.maps.event.addListener(this.map, 'click', ((e: any) => {
            if (this.mapClickCallback) {
              this.mapClickCallback(e.latLng.getLat(), e.latLng.getLng())
            }
          }) as any)

          resolve()
        } catch (error) {
          reject(error)
        }
      })
    })
  }

  destroy() {
    this.markers.clear()
    this.map = null
  }

  addMarker(marker: IMapMarker) {
    if (!this.map || !window.kakao) return

    const position = new window.kakao.maps.LatLng(marker.lat, marker.lng)
    const kakaoMarker = new window.kakao.maps.Marker({
      position,
      title: marker.title,
      clickable: true,
    })

    kakaoMarker.setMap(this.map)

    // 마커 클릭 이벤트
    window.kakao.maps.event.addListener(kakaoMarker, 'click', () => {
      if (this.markerClickCallback) {
        this.markerClickCallback(marker.id)
      }
    })

    this.markers.set(marker.id, kakaoMarker)
  }

  removeMarker(id: string) {
    const kakaoMarker = this.markers.get(id)
    if (kakaoMarker) {
      kakaoMarker.setMap(null)
      this.markers.delete(id)
    }
  }

  updateMarker(id: string, marker: Partial<IMapMarker>) {
    const kakaoMarker = this.markers.get(id)
    if (kakaoMarker && window.kakao && marker.lat && marker.lng) {
      const position = new window.kakao.maps.LatLng(marker.lat, marker.lng)
      kakaoMarker.setPosition(position)
      if (marker.title) {
        kakaoMarker.setTitle(marker.title)
      }
    }
  }

  clearMarkers() {
    this.markers.forEach((kakaoMarker) => {
      kakaoMarker.setMap(null)
    })
    this.markers.clear()
  }

  setCenter(lat: number, lng: number) {
    if (!this.map || !window.kakao) return

    const moveLatLng = new window.kakao.maps.LatLng(lat, lng)
    this.map.setCenter(moveLatLng)
  }

  setZoom(level: number) {
    if (!this.map) return
    this.map.setLevel(level)
  }

  getViewport(): IMapViewport {
    if (!this.map) {
      return { center: { lat: 37.5665, lng: 126.9780 }, zoom: 13 }
    }

    const center = this.map.getCenter()
    const zoom = this.map.getLevel()

    return {
      center: {
        lat: center.getLat(),
        lng: center.getLng(),
      },
      zoom,
    }
  }

  fitBounds(markers: IMapMarker[]) {
    if (!this.map || !window.kakao || markers.length === 0) return

    const bounds = new window.kakao.maps.LatLngBounds()

    markers.forEach((marker) => {
      const latlng = new window.kakao.maps.LatLng(marker.lat, marker.lng)
      bounds.extend(latlng)
    })

    this.map.setBounds(bounds)
  }

  onMarkerClick(callback: (id: string) => void) {
    this.markerClickCallback = callback
  }

  onMapClick(callback: (lat: number, lng: number) => void) {
    this.mapClickCallback = callback
  }
}
