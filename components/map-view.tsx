"use client"

import { useEffect, useRef, useState } from "react"
import type { BusStop } from "@/lib/types"
import { Loader, MapPin, AlertCircle, X, Eye, EyeOff } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"

interface MapViewProps {
  stops: BusStop[]
  selectedStopId: string | null
  onStopSelect: (stopId: string) => void
  searchedLocation: { lat: number; lng: number; name: string } | null
  onClearMap: () => void
  nearbyStops: BusStop[]
  campusColors?: { [key: string]: string }
}

export function MapView({
  stops,
  selectedStopId,
  onStopSelect,
  searchedLocation,
  onClearMap,
  nearbyStops,
  campusColors = {
    "tai-tam": "#4CAF50", // Green for Tai Tam
    "repulse-bay": "#2196F3", // Blue for Repulse Bay
  },
}: MapViewProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const googleMapRef = useRef<google.maps.Map | null>(null)
  const markersRef = useRef<Record<string, google.maps.Marker>>({})
  const searchMarkerRef = useRef<google.maps.Marker | null>(null)
  const infoWindowRef = useRef<google.maps.InfoWindow | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [mapError, setMapError] = useState<string | null>(null)
  const [showStops, setShowStops] = useState(true) // New state to track stop visibility

  // Initialize map
  useEffect(() => {
    if (!mapRef.current) return

    // Check if Google Maps API is available
    if (typeof window === "undefined" || !window.google || !window.google.maps) {
      setIsLoading(false)
      setMapError("Google Maps API is not available. Please check your API key.")
      return
    }

    try {
      setIsLoading(true)

      // Initialize the map
      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat: 22.2783, lng: 114.1747 }, // Center on Hong Kong
        zoom: 12,
        mapTypeControl: true,
        streetViewControl: false,
        // Restrict to Hong Kong bounds
        restriction: {
          latLngBounds: {
            north: 22.5664,
            south: 22.1953,
            east: 114.4294,
            west: 113.8257,
          },
          strictBounds: false,
        },
      })

      googleMapRef.current = map

      // Initialize info window
      infoWindowRef.current = new window.google.maps.InfoWindow()

      setIsLoading(false)
      setMapError(null)
    } catch (error) {
      console.error("Error initializing map:", error)
      setIsLoading(false)
      setMapError("Failed to initialize the map. Using basic view instead.")
    }
  }, [])

  // Clear all markers
  const clearAllMarkers = () => {
    if (!window.google || !window.google.maps) return

    // Clear bus stop markers
    Object.values(markersRef.current).forEach((marker) => marker.setMap(null))
    markersRef.current = {}

    // Clear search marker
    if (searchMarkerRef.current) {
      searchMarkerRef.current.setMap(null)
      searchMarkerRef.current = null
    }

    // Close info window
    if (infoWindowRef.current) {
      infoWindowRef.current.close()
    }
  }

  // Toggle bus stop visibility
  const toggleStopsVisibility = () => {
    setShowStops(!showStops)

    // Update marker visibility based on the new state
    if (!showStops) {
      // We're showing stops now
      Object.values(markersRef.current).forEach((marker) => marker.setMap(googleMapRef.current))
    } else {
      // We're hiding stops now
      Object.values(markersRef.current).forEach((marker) => marker.setMap(null))
    }
  }

  // Determine campus from stop location
  const determineCampus = (stop: BusStop): string => {
    // Approximate center points for each campus
    const taiTamCenter = { lat: 22.2626, lng: 114.2191 }
    const repulseBayCenter = { lat: 22.2359, lng: 114.1973 }

    // Calculate distances to each campus center
    const distToTaiTam = calculateDistance(stop.location.lat, stop.location.lng, taiTamCenter.lat, taiTamCenter.lng)

    const distToRepulseBay = calculateDistance(
      stop.location.lat,
      stop.location.lng,
      repulseBayCenter.lat,
      repulseBayCenter.lng,
    )

    // Return the campus that's closer
    return distToTaiTam < distToRepulseBay ? "tai-tam" : "repulse-bay"
  }

  // Helper function to calculate distance
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371 // Radius of the earth in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180
    const dLon = ((lon2 - lon1) * Math.PI) / 180
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
  }

  // Update markers when stops or searched location changes
  useEffect(() => {
    if (!googleMapRef.current || mapError || !window.google || !window.google.maps) return

    try {
      // Clear existing markers
      clearAllMarkers()

      // If there's a searched location, add it first
      if (searchedLocation) {
        const marker = new window.google.maps.Marker({
          position: { lat: searchedLocation.lat, lng: searchedLocation.lng },
          map: googleMapRef.current,
          title: searchedLocation.name,
          icon: {
            path: window.google.maps.SymbolPath.CIRCLE,
            fillColor: "#FF5722", // Orange for searched location
            fillOpacity: 1,
            strokeWeight: 2,
            strokeColor: "#FFFFFF",
            scale: 10,
          },
          zIndex: 1000, // Ensure it's on top of other markers
        })

        searchMarkerRef.current = marker

        marker.addListener("click", () => {
          if (infoWindowRef.current) {
            infoWindowRef.current.setContent(`
              <div style="padding: 8px;">
                <h3 style="margin: 0; font-weight: bold;">${searchedLocation.name}</h3>
                <p style="margin: 4px 0 0 0; font-size: 12px;">Searched Location</p>
              </div>
            `)
            infoWindowRef.current.open(googleMapRef.current, marker)
          }
        })
      }

      // Determine which stops to show
      const stopsToShow = stops

      // Add markers for each stop
      stopsToShow.forEach((stop) => {
        // Determine marker color based on campus
        const campus = determineCampus(stop)
        const color = campusColors[campus] || "#FF0000"

        const marker = new window.google.maps.Marker({
          position: stop.location,
          map: showStops ? googleMapRef.current : null, // Only show if showStops is true
          title: stop.name,
          icon: {
            path: window.google.maps.SymbolPath.CIRCLE,
            fillColor: color,
            fillOpacity: 1,
            strokeWeight: 1,
            strokeColor: "#FFFFFF",
            scale: 8,
          },
        })

        marker.addListener("click", () => {
          onStopSelect(stop.id)

          // Show info window with bus numbers
          if (infoWindowRef.current) {
            const content = `
              <div style="padding: 8px;">
                <h3 style="margin: 0 0 8px 0; font-weight: bold;">${stop.name}</h3>
                <div style="display: flex; flex-wrap: wrap; gap: 4px;">
                  ${stop.busNumbers
                    .map(
                      (num) =>
                        `<span style="padding: 2px 6px; background-color: rgba(0,0,0,0.1); border-radius: 9999px; font-size: 12px;">${num}</span>`,
                    )
                    .join("")}
                </div>
              </div>
            `
            infoWindowRef.current.setContent(content)
            infoWindowRef.current.open(googleMapRef.current, marker)
          }
        })

        markersRef.current[stop.id] = marker
      })

      // Set map bounds based on markers
      if (searchedLocation && nearbyStops.length > 0) {
        // If we have a searched location and nearby stops, fit bounds to include them
        const bounds = new window.google.maps.LatLngBounds()
        bounds.extend({ lat: searchedLocation.lat, lng: searchedLocation.lng })
        nearbyStops.forEach((stop) => {
          bounds.extend(stop.location)
        })
        googleMapRef.current.fitBounds(bounds)
      } else if (searchedLocation) {
        // Just center on the searched location
        googleMapRef.current.setCenter({ lat: searchedLocation.lat, lng: searchedLocation.lng })
        googleMapRef.current.setZoom(15)
      } else if (stops.length > 0) {
        // If there are stops, fit the map to show all of them
        const bounds = new window.google.maps.LatLngBounds()
        stops.forEach((stop) => {
          bounds.extend(stop.location)
        })
        googleMapRef.current.fitBounds(bounds)
      }
    } catch (error) {
      console.error("Error updating markers:", error)
      setMapError("Failed to update map markers.")
    }
  }, [stops, searchedLocation, nearbyStops, onStopSelect, mapError, campusColors, showStops])

  // Handle clear map button click
  const handleClearMap = () => {
    clearAllMarkers()
    onClearMap()

    // Reset map view to Hong Kong
    if (googleMapRef.current) {
      googleMapRef.current.setCenter({ lat: 22.2783, lng: 114.1747 })
      googleMapRef.current.setZoom(12)
    }
  }

  // Fallback view when map fails to load
  if (mapError || !window.google || !window.google.maps) {
    return (
      <div className="h-full flex flex-col">
        <Alert variant="destructive" className="m-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{mapError || "Google Maps API is not available."}</AlertDescription>
        </Alert>

        <div className="flex-1 overflow-auto p-4">
          <h3 className="font-medium mb-4">Bus Stop Locations:</h3>
          <ul className="space-y-2">
            {stops.map((stop) => (
              <li
                key={stop.id}
                className={`p-2 rounded border cursor-pointer ${selectedStopId === stop.id ? "bg-muted border-primary" : ""}`}
                onClick={() => onStopSelect(stop.id)}
              >
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span>{stop.name}</span>
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  Lat: {stop.location.lat.toFixed(4)}, Lng: {stop.location.lng.toFixed(4)}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }

  return (
    <div className="relative w-full h-full">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-10">
          <Loader className="h-8 w-8 animate-spin" />
        </div>
      )}
      <div ref={mapRef} className="w-full h-full" />

      {/* Map Control Buttons */}
      <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
        <Button variant="outline" size="sm" className="bg-white shadow-md" onClick={toggleStopsVisibility}>
          {showStops ? (
            <>
              <EyeOff className="h-4 w-4 mr-1" />
              Hide Stops
            </>
          ) : (
            <>
              <Eye className="h-4 w-4 mr-1" />
              Show Stops
            </>
          )}
        </Button>

        <Button variant="outline" size="sm" className="bg-white shadow-md" onClick={handleClearMap}>
          <X className="h-4 w-4 mr-1" />
          Clear Map
        </Button>
      </div>
    </div>
  )
}
