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
    console.log('🗺️ Map clicked!', { isClickable, showDialog, dialogOpen })
    if (isClickable && !showDialog) {
      setDialogOpen(true)
      document.body.style.overflow = 'hidden'
      console.log('🗺️ Dialog opened')
    }
  }

  const closeDialog = () => {
    console.log('🗺️ Closing dialog')
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

      {/* Dialog Modal - SIMPLE VERSION */}
      {dialogOpen && (
        <div 
          id="map-modal-backdrop"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
            zIndex: 99999
          }}
          onClick={closeDialog}
        >
          {/* Map Dialog */}
          <div 
            id="map-modal-content"
            style={{
              backgroundColor: 'white',
              width: '100%',
              maxWidth: '900px',
              height: '500px',
              borderRadius: '12px',
              position: 'relative',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              zIndex: 100000
            }}
            onClick={(e) => e.stopPropagation()}
          >
          {/* Close Button */}
          <button
              id="map-modal-close"
            onClick={closeDialog}
              style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                backgroundColor: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                zIndex: 100001
              }}
              title="Schließen"
            >
              <svg width="20" height="20" fill="none" stroke="#374151" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>

             {/* Header */}
            <div style={{ backgroundColor: '#3b82f6', color: 'white', padding: '16px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', margin: 0 }}>{companyName}</h3>
              <p style={{ fontSize: '14px', opacity: 0.9, margin: '4px 0 0 0' }}>{address}</p>
             </div>
             
             {/* Map */}
            <div style={{ height: 'calc(100% - 80px)' }}>
               {renderMap(true)}
             </div>
           </div>
        </div>
      )}
    </>
  )
} 