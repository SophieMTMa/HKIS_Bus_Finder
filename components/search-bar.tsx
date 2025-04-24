"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Search, X, MapPin } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { StandaloneSearchBox } from "@react-google-maps/api"

interface SearchBarProps {
  onSearch: (query: string) => void
  onLocationSelect: (location: { lat: number; lng: number; name: string }) => void
  onClear: () => void
}

// Declare google variable
declare global {
  interface Window {
    google?: any
  }
}

export function SearchBar({ onSearch, onLocationSelect, onClear }: SearchBarProps) {
  const [query, setQuery] = useState("")
  const [searchBox, setSearchBox] = useState<google.maps.places.SearchBox | null>(null)
  const [placesApiAvailable, setPlacesApiAvailable] = useState(false)
  const searchBoxRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    // Check if Places API is available
    if (
      typeof window !== "undefined" &&
      typeof window.google !== "undefined" &&
      window.google.maps &&
      window.google.maps.places
    ) {
      setPlacesApiAvailable(true)
    } else {
      setPlacesApiAvailable(false)
    }
  }, [])

  const onLoad = (ref: google.maps.places.SearchBox) => {
    setSearchBox(ref)

    // Set search bounds to Hong Kong region
    if (ref) {
      try {
        const hongKongBounds = new google.maps.LatLngBounds(
          new google.maps.LatLng(22.1953, 113.8257), // SW corner
          new google.maps.LatLng(22.5664, 114.4294), // NE corner
        )
        ref.setBounds(hongKongBounds)
      } catch (error) {
        console.error("Error setting bounds:", error)
      }
    }
  }

  const onPlacesChanged = () => {
    if (searchBox) {
      try {
        const places = searchBox.getPlaces()
        if (places && places.length > 0) {
          const place = places[0]
          if (place && place.name) {
            setQuery(place.name)
            onSearch(place.name)

            // If we have location data, pass it to the parent
            if (place.geometry && place.geometry.location) {
              onLocationSelect({
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng(),
                name: place.name,
              })
            }
          }
        }
      } catch (error) {
        console.error("Error getting places:", error)
        // Fall back to basic search
        onSearch(query)
      }
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(query)

    // Try to geocode the query if Places API is available but SearchBox failed
    if (
      placesApiAvailable &&
      typeof window.google !== "undefined" &&
      window.google.maps &&
      window.google.maps.Geocoder
    ) {
      try {
        const geocoder = new window.google.maps.Geocoder()

        // Restrict to Hong Kong
        geocoder.geocode(
          {
            address: query,
            region: "hk",
            bounds: new window.google.maps.LatLngBounds(
              new google.maps.LatLng(22.1953, 113.8257), // SW corner
              new google.maps.LatLng(22.5664, 114.4294), // NE corner
            ),
          },
          (results, status) => {
            if (status === "OK" && results && results[0]) {
              const location = results[0].geometry.location
              onLocationSelect({
                lat: location.lat(),
                lng: location.lng(),
                name: results[0].formatted_address,
              })
            }
          },
        )
      } catch (error) {
        console.error("Error geocoding:", error)
      }
    }
  }

  const handleClear = () => {
    setQuery("")
    onSearch("")
    onClear()
    if (searchBoxRef.current) {
      searchBoxRef.current.focus()
    }
  }

  // Render basic search input if Places API is not available
  if (!placesApiAvailable) {
    return (
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            ref={searchBoxRef}
            type="text"
            placeholder="Search for a location..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10 pr-20"
          />
        </div>
        {query && (
          <Button
            type="button"
            size="icon"
            variant="ghost"
            onClick={handleClear}
            className="absolute right-8 top-0 h-full"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Clear search</span>
          </Button>
        )}
        <Button type="submit" size="icon" variant="ghost" className="absolute right-0 top-0 h-full">
          <Search className="h-4 w-4" />
          <span className="sr-only">Search</span>
        </Button>
      </form>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="relative">
      <StandaloneSearchBox onLoad={onLoad} onPlacesChanged={onPlacesChanged}>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            ref={searchBoxRef}
            type="text"
            placeholder="Search for a location or bus number..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10 pr-20"
          />
        </div>
      </StandaloneSearchBox>
      {query && (
        <Button
          type="button"
          size="icon"
          variant="ghost"
          onClick={handleClear}
          className="absolute right-8 top-0 h-full"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Clear search</span>
        </Button>
      )}
      <Button type="submit" size="icon" variant="ghost" className="absolute right-0 top-0 h-full">
        <Search className="h-4 w-4" />
        <span className="sr-only">Search</span>
      </Button>
    </form>
  )
}
