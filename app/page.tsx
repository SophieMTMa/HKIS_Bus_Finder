"use client"

import { useState, useEffect, useMemo } from "react"
import type { BusStop, Campus } from "@/lib/types"
import { SearchBar } from "@/components/search-bar"
import { MapView } from "@/components/map-view"
import { BusStopList } from "@/components/bus-stop-list"
import { TimeSelector } from "@/components/time-selector"
import { CampusSelector } from "@/components/campus-selector"
import { FAQButton } from "@/components/faq-button"
import { getBusStops, getAllBusStops, searchBusStops, searchAllBusStops } from "@/lib/db-service"
import { GoogleMapsProvider } from "@/components/google-maps-provider"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { importBusData } from "@/lib/db-service"

// 5-minute walk is approximately 400 meters
const FIVE_MINUTE_WALK_METERS = 400

export default function Home() {
  const [selectedCampus, setSelectedCampus] = useState<Campus>("tai-tam")
  const [selectedTime, setSelectedTime] = useState<string>("3:15PM")
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<BusStop[]>([])
  const [selectedStop, setSelectedStop] = useState<string | null>(null)
  const [apiError, setApiError] = useState<string | null>(null)
  const [searchedLocation, setSearchedLocation] = useState<{ lat: number; lng: number; name: string } | null>(null)
  const showAllStops = true // Always show all stops

  // Load initial data - now load all stops from both campuses
  useEffect(() => {
    // Always load all stops initially for the map
    setSearchResults(getAllBusStops())
  }, [selectedCampus, showAllStops])

  // Add this effect after the other useEffect hooks
  useEffect(() => {
    // Check if we have bus data in localStorage
    const taiTamData = localStorage.getItem("tai-tam-bus-data")
    const repulseBayData = localStorage.getItem("repulse-bay-bus-data")

    // Import the data if available
    if (taiTamData) {
      try {
        const data = JSON.parse(taiTamData)
        importBusData("tai-tam", data)
        console.log("Loaded Tai Tam bus data from localStorage")
      } catch (error) {
        console.error("Error loading Tai Tam bus data:", error)
      }
    }

    if (repulseBayData) {
      try {
        const data = JSON.parse(repulseBayData)
        importBusData("repulse-bay", data)
        console.log("Loaded Repulse Bay bus data from localStorage")
      } catch (error) {
        console.error("Error loading Repulse Bay bus data:", error)
      }
    }
  }, [])

  // Calculate nearby stops when searchedLocation changes
  const nearbyStops = useMemo(() => {
    if (!searchedLocation) return []

    // Find stops within a 5-minute walk (approximately 400 meters)
    const stopsWithDistance = searchResults.map((stop) => {
      const distance = calculateDistance(
        searchedLocation.lat,
        searchedLocation.lng,
        stop.location.lat,
        stop.location.lng,
      )
      return { ...stop, distance: distance * 1000 } // Convert km to meters
    })

    // Filter stops within 5-minute walk and sort by distance
    return stopsWithDistance
      .filter((stop) => stop.distance <= FIVE_MINUTE_WALK_METERS)
      .sort((a, b) => a.distance - b.distance)
      .map(({ distance, ...stop }) => stop as BusStop)
  }, [searchedLocation, searchResults])

  const handleSearch = (query: string) => {
    setSearchQuery(query)

    // If query is empty, reset to all stops
    if (query.trim() === "") {
      if (showAllStops) {
        setSearchResults(getAllBusStops())
      } else {
        setSearchResults(getBusStops(selectedCampus))
      }
      return
    }

    // Search for bus stops by name or number across all campuses
    const busStopResults = showAllStops ? searchAllBusStops(query) : searchBusStops(selectedCampus, query)

    // If we found bus stops, use those results
    if (busStopResults.length > 0) {
      setSearchResults(busStopResults)
      // Clear the searched location since we're showing bus stops
      setSearchedLocation(null)
    }
    // Otherwise, keep the current results (which might be filtered by the location search)
  }

  const handleLocationSelect = (location: { lat: number; lng: number; name: string }) => {
    setSearchedLocation(location)
    // When a location is selected, show all bus stops so we can find the nearest ones
    if (showAllStops) {
      setSearchResults(getAllBusStops())
    } else {
      setSearchResults(getBusStops(selectedCampus))
    }
  }

  const handleTimeChange = (time: string) => {
    setSelectedTime(time)
  }

  const handleCampusChange = (campus: Campus) => {
    setSelectedCampus(campus)
    // Reset search when campus changes
    setSearchQuery("")
    setSearchedLocation(null)

    if (showAllStops) {
      setSearchResults(getAllBusStops())
    } else {
      setSearchResults(getBusStops(campus))
    }
  }

  const handleStopSelect = (stopId: string) => {
    setSelectedStop(stopId)
  }

  const handleClearMap = () => {
    setSearchedLocation(null)
    setSelectedStop(null)
  }

  const campusColors = {
    "tai-tam": "#4CAF50", // Green for Tai Tam
    "repulse-bay": "#2196F3", // Blue for Repulse Bay
  }

  return (
    <GoogleMapsProvider>
      <main className="min-h-screen p-4 max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">HKIS Bus Finder</h1>
          <FAQButton />
        </div>

        {apiError && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{apiError}</AlertDescription>
          </Alert>
        )}

        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-4">
          <div className="flex-1 w-full">
            <SearchBar onSearch={handleSearch} onLocationSelect={handleLocationSelect} onClear={handleClearMap} />
          </div>
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            <CampusSelector selectedCampus={selectedCampus} onCampusChange={handleCampusChange} />
            <TimeSelector selectedTime={selectedTime} onTimeChange={handleTimeChange} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border rounded-lg overflow-hidden h-[500px]">
            <MapView
              stops={searchResults}
              selectedStopId={selectedStop}
              onStopSelect={handleStopSelect}
              searchedLocation={searchedLocation}
              onClearMap={handleClearMap}
              nearbyStops={nearbyStops}
              campusColors={campusColors}
            />
          </div>
          <div className="border rounded-lg overflow-hidden h-[500px]">
            <BusStopList
              stops={searchResults}
              selectedStopId={selectedStop}
              onStopSelect={handleStopSelect}
              campus={selectedCampus}
              time={selectedTime}
              searchedLocation={searchedLocation}
              nearbyStops={nearbyStops}
            />
          </div>
        </div>
      </main>
    </GoogleMapsProvider>
  )
}

// Helper function to calculate distance between two points in kilometers
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371 // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1)
  const dLon = deg2rad(lon2 - lon1)
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c // Distance in km
}

function deg2rad(deg: number): number {
  return deg * (Math.PI / 180)
}
