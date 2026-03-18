import { apiClient } from './client'

export interface Marker {
  id: string
  title: string
  lat: number
  lng: number
  description?: string
}

export interface MarkerResponse {
  data: Marker | Marker[]
}

// 모든 마커 조회
export async function getMarkers(): Promise<Marker[]> {
  const response = await apiClient.get<any, Marker[]>('/markers')
  return response
}

// 특정 마커 조회
export async function getMarker(id: string): Promise<Marker> {
  const response = await apiClient.get<any, Marker>(`/markers/${id}`)
  return response
}

// 마커 생성
export async function createMarker(marker: Omit<Marker, 'id'>): Promise<Marker> {
  const response = await apiClient.post<any, Marker>('/markers', marker)
  return response
}

// 마커 업데이트
export async function updateMarker(id: string, marker: Partial<Omit<Marker, 'id'>>): Promise<Marker> {
  const response = await apiClient.put<any, Marker>(`/markers/${id}`, marker)
  return response
}

// 마커 삭제
export async function deleteMarker(id: string): Promise<void> {
  await apiClient.delete(`/markers/${id}`)
}
