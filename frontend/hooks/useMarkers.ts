import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  createMarker,
  deleteMarker,
  getMarker,
  getMarkers,
  updateMarker,
  type Marker,
} from '@/lib/api/markers'

const MARKERS_KEY = ['markers']

// 모든 마커 조회
export function useMarkersQuery() {
  return useQuery({
    queryKey: MARKERS_KEY,
    queryFn: getMarkers,
  })
}

// 특정 마커 조회
export function useMarkerQuery(id: string) {
  return useQuery({
    queryKey: [...MARKERS_KEY, id],
    queryFn: () => getMarker(id),
  })
}

// 마커 생성
export function useCreateMarkerMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createMarker,
    onSuccess: (newMarker) => {
      queryClient.setQueryData(MARKERS_KEY, (oldData: Marker[] | undefined) => {
        return oldData ? [...oldData, newMarker] : [newMarker]
      })
    },
  })
}

// 마커 업데이트
export function useUpdateMarkerMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, marker }: { id: string; marker: Partial<Omit<Marker, 'id'>> }) =>
      updateMarker(id, marker),
    onSuccess: (updatedMarker) => {
      queryClient.setQueryData(MARKERS_KEY, (oldData: Marker[] | undefined) => {
        return oldData
          ? oldData.map((m) => (m.id === updatedMarker.id ? updatedMarker : m))
          : [updatedMarker]
      })
    },
  })
}

// 마커 삭제
export function useDeleteMarkerMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteMarker,
    onSuccess: (_, deletedId) => {
      queryClient.setQueryData(MARKERS_KEY, (oldData: Marker[] | undefined) => {
        return oldData ? oldData.filter((m) => m.id !== deletedId) : []
      })
    },
  })
}
