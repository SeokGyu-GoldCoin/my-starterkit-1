export async function GET() {
  const locations = [
    { id: '1', name: '서울', lat: 37.5665, lng: 126.9780 },
    { id: '2', name: '경기', lat: 37.2756, lng: 127.0093 },
    { id: '3', name: '부산', lat: 35.1796, lng: 129.0756 },
    { id: '4', name: '대구', lat: 35.8794, lng: 128.5961 },
    { id: '5', name: '인천', lat: 37.4563, lng: 126.7052 },
  ]

  return Response.json({ data: locations })
}
