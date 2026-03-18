// @ts-nocheck
import type { IMapAdapter, IMapMarker, IMapViewport } from '../types'

// OpenLayers 타입 (동적 로드용)
declare global {
  interface Window {
    ol?: {
      Map: any
      View: any
      control: any
      layer: any
      source: any
      Feature: any
      geom: any
      style: any
    }
  }
}

export class VWorldMapAdapter implements IMapAdapter {
  private map: any = null
  private markers: Map<string, any> = new Map()
  private vectorSource: any = null
  private markerClickCallback?: (id: string) => void
  private mapClickCallback?: (lat: number, lng: number) => void

  private async loadOpenLayers() {
    // OpenLayers CSS 로드
    if (!document.querySelector('link[href*="openlayers"]')) {
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = 'https://cdn.jsdelivr.net/npm/ol@v10.0.0/ol.css'
      document.head.appendChild(link)
    }

    // OpenLayers JS 로드
    return new Promise<void>((resolve, reject) => {
      const script = document.createElement('script')
      script.src = 'https://cdn.jsdelivr.net/npm/ol@v10.0.0/dist/ol.js'
      script.async = true
      script.onload = () => resolve()
      script.onerror = () => reject(new Error('OpenLayers를 로드할 수 없습니다'))
      document.head.appendChild(script)
    })
  }

  async initialize(container: HTMLElement, options?: { zoom?: number; center?: { lat: number; lng: number } }) {
    // OpenLayers가 필요하므로, 동적으로 로드
    if (typeof window === 'undefined') {
      throw new Error('브라우저 환경에서만 실행 가능합니다')
    }

    // OpenLayers 라이브러리 동적 로드
    if (!window.ol) {
      await this.loadOpenLayers()
    }

    // @ts-ignore
    const ol = window.ol!
    const center = options?.center || { lat: 37.5665, lng: 126.9780 }
    const zoom = options?.zoom || 13

    // VWORLD 기본 레이어
    const vworldLayer = new ol.layer.Tile({
      source: new ol.source.XYZ({
        url: 'http://xdworld.vworld.kr:8080/2d/Base/202002/{z}/{x}/{y}.png',
      }),
    })

    // 벡터 소스 (마커용)
    this.vectorSource = new ol.source.Vector()

    const vectorLayer = new ol.layer.Vector({
      source: this.vectorSource,
    })

    // 지도 초기화
    this.map = new ol.Map({
      target: container,
      layers: [vworldLayer, vectorLayer],
      view: new ol.View({
        center: ol.proj.fromLonLat([center.lng, center.lat]),
        zoom,
      }),
    })

    // 지도 클릭 이벤트
    this.map.on('click', (e: any) => {
      if (this.mapClickCallback) {
        const coord = ol.proj.toLonLat(e.coordinate)
        this.mapClickCallback(coord[1], coord[0])
      }
    })
  }

  destroy() {
    this.markers.clear()
    if (this.map) {
      this.map.setTarget(undefined)
      this.map = null
    }
  }

  addMarker(marker: IMapMarker) {
    if (!this.map || !this.vectorSource || !window.ol) return

    const ol = window.ol
    const feature = new ol.Feature({
      geometry: new ol.geom.Point(
        ol.proj.fromLonLat([marker.lng, marker.lat])
      ),
      id: marker.id,
      title: marker.title,
    })

    // 마커 스타일
    const markerStyle = new ol.style.Style({
      image: new ol.style.Circle({
        radius: 6,
        fill: new ol.style.Fill({ color: '#4F46E5' }),
        stroke: new ol.style.Stroke({
          color: '#ffffff',
          width: 2,
        }),
      }),
      text: new ol.style.Text({
        text: marker.title.substring(0, 1),
        fill: new ol.style.Fill({ color: '#ffffff' }),
      }),
    })

    feature.setStyle(markerStyle)
    this.vectorSource.addFeature(feature)

    // 마커 클릭 이벤트
    this.map.on('click', (e: any) => {
      this.map.forEachFeatureAtPixel(e.pixel, (feature: any) => {
        const id = feature.get('id')
        if (id && this.markerClickCallback) {
          this.markerClickCallback(id)
        }
      })
    })

    this.markers.set(marker.id, feature)
  }

  removeMarker(id: string) {
    const feature = this.markers.get(id)
    if (feature && this.vectorSource) {
      this.vectorSource.removeFeature(feature)
      this.markers.delete(id)
    }
  }

  updateMarker(id: string, marker: Partial<IMapMarker>) {
    if (!window.ol) return
    const feature = this.markers.get(id)
    if (feature && marker.lat && marker.lng) {
      const ol = window.ol
      feature.setGeometry(
        new ol.geom.Point(
          ol.proj.fromLonLat([marker.lng, marker.lat])
        )
      )
      if (marker.title) {
        feature.set('title', marker.title)
      }
    }
  }

  clearMarkers() {
    if (this.vectorSource) {
      this.vectorSource.clear()
    }
    this.markers.clear()
  }

  setCenter(lat: number, lng: number) {
    if (!this.map || !window.ol) return

    const ol = window.ol
    const view = this.map.getView()
    view.setCenter(ol.proj.fromLonLat([lng, lat]))
  }

  setZoom(level: number) {
    if (!this.map) return
    const view = this.map.getView()
    view.setZoom(level)
  }

  getViewport(): IMapViewport {
    if (!this.map || !window.ol) {
      return { center: { lat: 37.5665, lng: 126.9780 }, zoom: 13 }
    }

    const ol = window.ol
    const view = this.map.getView()
    const center = ol.proj.toLonLat(view.getCenter())
    const zoom = view.getZoom()

    return {
      center: {
        lat: center[1],
        lng: center[0],
      },
      zoom: zoom || 13,
    }
  }

  fitBounds(markers: IMapMarker[]) {
    if (!this.map || !window.ol || markers.length === 0) return

    const ol = window.ol
    const view = this.map.getView()
    const extent = ol.extent.createEmpty()

    markers.forEach((marker) => {
      const point = ol.proj.fromLonLat([marker.lng, marker.lat])
      ol.extent.extend(extent, point)
    })

    view.fit(extent, { padding: [50, 50, 50, 50] })
  }

  onMarkerClick(callback: (id: string) => void) {
    this.markerClickCallback = callback
  }

  onMapClick(callback: (lat: number, lng: number) => void) {
    this.mapClickCallback = callback
  }
}
