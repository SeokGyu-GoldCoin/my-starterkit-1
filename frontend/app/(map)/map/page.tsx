'use client'

import { useState } from 'react'
import { MapContainer } from '@/components/map/MapContainer'
import { MapOverlay } from '@/components/map/MapOverlay'
import { SidePanel } from '@/components/map/SidePanel'

export default function MapPage() {
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(true)

  return (
    <div className="relative h-screen w-full overflow-hidden bg-gray-100">
      <MapContainer />
      <MapOverlay
        onZoomIn={() => console.log('줌 확대')}
        onZoomOut={() => console.log('줌 축소')}
        onLocationClick={() => console.log('현재 위치')}
      />
      <SidePanel
        isOpen={isSidePanelOpen}
        onToggle={() => setIsSidePanelOpen(!isSidePanelOpen)}
      />
    </div>
  )
}
