import { mockMarkers } from '@/lib/mock-data/markers'

// 메모리에서 관리하는 마커 상태
let markers = [...mockMarkers]

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id
  const marker = markers.find((m) => m.id === id)

  if (!marker) {
    return Response.json({ error: '마커를 찾을 수 없습니다' }, { status: 404 })
  }

  return Response.json({ data: marker })
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id
  const body = await request.json()

  const markerIndex = markers.findIndex((m) => m.id === id)

  if (markerIndex === -1) {
    return Response.json({ error: '마커를 찾을 수 없습니다' }, { status: 404 })
  }

  markers[markerIndex] = { ...markers[markerIndex], ...body }
  return Response.json({ data: markers[markerIndex] })
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id
  const markerIndex = markers.findIndex((m) => m.id === id)

  if (markerIndex === -1) {
    return Response.json({ error: '마커를 찾을 수 없습니다' }, { status: 404 })
  }

  const deletedMarker = markers[markerIndex]
  markers = markers.filter((m) => m.id !== id)
  return Response.json({ data: deletedMarker })
}
