'use client'

import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

// Dynamically import map components to avoid SSR issues
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false })
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false })
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false })
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false })

interface LocationMapProps {
  address: string
  companyName: string
  showDialog?: boolean
  onDialogClose?: () => void
  isClickable?: boolean
}

interface Coordinates {
  lat: number
  lng: number
}

export default function LocationMap({ 
  address, 
  companyName, 
  showDialog = false, 
  onDialogClose, 
  isClickable = true 
}: LocationMapProps) {
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [dialogOpen, setDialogOpen] = useState(showDialog)

  // Function to geocode address using Nominatim (OpenStreetMap)
  const geocodeAddress = async (addr: string): Promise<Coordinates | null> => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(addr)}&limit=1`
      )
      const data = await response.json()
      
      if (data && data.length > 0) {
        return {
          lat: parseFloat(data[0].lat),
          lng: parseFloat(data[0].lon)
        }
      }
      return null
    } catch (err) {
      console.error('Geocoding error:', err)
      return null
    }
  }

  useEffect(() => {
    const loadCoordinates = async () => {
      setIsLoading(true)
      setError(null)
      
      const coords = await geocodeAddress(address)
      if (coords) {
        setCoordinates(coords)
      } else {
        setError('Adresse konnte nicht gefunden werden')
        // Fallback to a default location (e.g., center of Germany)
        setCoordinates({ lat: 51.1657, lng: 10.4515 })
      }
      setIsLoading(false)
    }

    if (address) {
      loadCoordinates()
    }
  }, [address])

  useEffect(() => {
    // Import Leaflet CSS
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
    document.head.appendChild(link)

    // Add custom CSS to control z-index
    const style = document.createElement('style')
    style.textContent = `
      .leaflet-container {
        z-index: 1 !important;
      }
      .leaflet-pane,
      .leaflet-tile-pane,
      .leaflet-shadow-pane,
      .leaflet-overlay-pane,
      .leaflet-marker-pane,
      .leaflet-tooltip-pane,
      .leaflet-popup-pane {
        z-index: inherit !important;
      }
      .leaflet-control-container {
        z-index: 10 !important;
      }
      .footer-map .leaflet-container {
        z-index: 1 !important;
      }
      .dialog-map .leaflet-container {
        z-index: 9998 !important;
      }
    `
    document.head.appendChild(style)

    return () => {
      // Cleanup
      if (document.head.contains(link)) {
        document.head.removeChild(link)
      }
      if (document.head.contains(style)) {
        document.head.removeChild(style)
      }
    }
  }, [])

  const handleMapClick = () => {
    if (isClickable && !showDialog) {
      setDialogOpen(true)
      document.body.style.overflow = 'hidden'
    }
  }

  const closeDialog = () => {
    setDialogOpen(false)
    document.body.style.overflow = 'unset'
    if (onDialogClose) {
      onDialogClose()
    }
  }

  const renderMap = (isDialog: boolean = false) => {
    if (!coordinates) return null
    
    return (
      <MapContainer
        center={[coordinates.lat, coordinates.lng]}
        zoom={isDialog ? 16 : 15}
        style={{ 
          height: '100%', 
          width: '100%',
          zIndex: isDialog ? 9998 : 1,
          borderRadius: 'var(--radius-image)'
        }}
        attributionControl={false}
        zoomControl={isDialog}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        <Marker position={[coordinates.lat, coordinates.lng]}>
          <Popup>
            <div className="text-center">
              <h4 className="font-semibold">{companyName}</h4>
              <p className="text-sm text-gray-600">{address}</p>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    )
  }

  if (isLoading) {
    return (
      <div className="bg-gray-300 dark:bg-gray-600 h-48 flex items-center justify-center"
        style={{ borderRadius: 'var(--radius-image)' }}>
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-b-2 border-primary dark:border-accent mx-auto mb-2"
            style={{ borderRadius: 'var(--radius-full)' }}></div>
          <p className="text-gray-600 dark:text-gray-300 text-sm">Karte wird geladen...</p>
        </div>
      </div>
    )
  }

  if (error || !coordinates) {
    return (
      <div className="bg-gray-300 dark:bg-gray-600 h-48 flex items-center justify-center"
        style={{ borderRadius: 'var(--radius-image)' }}>
        <div className="text-center text-gray-600 dark:text-gray-300">
          <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
          </svg>
          <p className="text-sm">Karte nicht verfügbar</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <div 
        className={`footer-map overflow-hidden h-48 relative z-0`}
        style={{ borderRadius: 'var(--radius-image)' }}
      >
        {renderMap(false)}
        
        {/* Click Overlay - catches clicks before they reach the map */}
        {isClickable && !showDialog && (
          <div 
            className="absolute inset-0 cursor-pointer hover:bg-black/5 transition-all z-20"
            onClick={handleMapClick}
            title="Klicken für größere Ansicht"
          >
            {/* Click Hint */}
            <div className="absolute top-2 left-2 bg-black/60 text-white px-2 py-1 rounded text-xs pointer-events-none">
              Klicken für größere Ansicht
            </div>
          </div>
        )}
      </div>

      {/* Dialog Modal */}
      {dialogOpen && (
        <div 
          className="fixed inset-0 z-[9999] bg-black/80 flex items-center justify-center p-4"
          onClick={closeDialog}
        >
          {/* Map Dialog */}
          <div 
            className="dialog-map bg-white dark:bg-gray-800 overflow-hidden w-full max-w-4xl h-96 md:h-[500px] relative"
            style={{ borderRadius: 'var(--radius-modal)' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeDialog}
              className="absolute top-2 right-2 z-[10000] bg-white hover:bg-gray-100 rounded-full p-2 shadow-lg transition-all duration-200 hover:scale-110"
              title="Schließen"
            >
              <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>

            {/* Header */}
            <div className="bg-primary dark:bg-accent text-white p-4" style={{ backgroundColor: 'var(--color-primary)' }}>
              <h3 className="text-lg font-semibold">{companyName}</h3>
              <p className="text-sm opacity-90">{address}</p>
            </div>
            
            {/* Map */}
            <div className="h-full pb-16">
              {renderMap(true)}
            </div>
          </div>
        </div>
      )}
    </>
  )
} 