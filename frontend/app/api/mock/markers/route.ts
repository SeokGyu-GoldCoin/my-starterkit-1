import { mockMarkers } from '@/lib/mock-data/markers'

// 메모리에서 관리하는 마커 상태
let markers = [...mockMarkers]

export async function GET() {
  return Response.json(markers)
}

export async function POST(request: Request) {
  const body = await request.json()

  const newMarker = {
    id: crypto.randomUUID(),
    ...body,
  }

  markers.push(newMarker)
  return Response.json(newMarker, { status: 201 })
}
