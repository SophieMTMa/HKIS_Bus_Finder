"use client"

import { useState, useEffect } from "react"
import type { BusStop, Campus } from "@/lib/types"
import { getBusRoutesByStop, getBusStopByIdFromAnyCampus } from "@/lib/db-service"
import { MapPin, Bus, Clock, Navigation, ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface BusStopListProps {
  stops: BusStop[]
  selectedStopId: string | null
  onStopSelect: (stopId: string) => void
  campus: Campus
  time: string
  searchedLocation: { lat: number; lng: number; name: string } | null
  nearbyStops?: BusStop[]
}

export function BusStopList({
  stops,
  selectedStopId,
  onStopSelect,
  campus,
  time,
  searchedLocation,
  nearbyStops = [],
}: BusStopListProps) {
  const [expandedStopId, setExpandedStopId] = useState<string | null>(null)
  const [displayedStops, setDisplayedStops] = useState<BusStop[]>(stops)

  // When a stop is selected on the map, expand it in the list
  useEffect(() => {
    if (selectedStopId) {
      setExpandedStopId(selectedStopId)
    }
  }, [selectedStopId])

  // Update displayed stops when search location changes
  useEffect(() => {
    if (searchedLocation && nearbyStops.length > 0) {
      // Show nearby stops first, then the rest
      const nearbyIds = new Set(nearbyStops.map((stop) => stop.id))
      const otherStops = stops.filter((stop) => !nearbyIds.has(stop.id))
      setDisplayedStops([...nearbyStops, ...otherStops])
    } else {
      setDisplayedStops(stops)
    }
  }, [stops, searchedLocation, nearbyStops])

  const handleStopClick = (stopId: string) => {
    onStopSelect(stopId)
    setExpandedStopId(stopId === expandedStopId ? null : stopId)
  }

  // Determine campus from stop location
  const determineCampus = (stop: BusStop): Campus => {
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

  return (
    <div className="h-full overflow-auto">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Bus Stops</h2>
        <p className="text-sm text-muted-foreground">{stops.length} stops found</p>
      </div>

      {searchedLocation && nearbyStops.length > 0 && (
        <div className="p-3 bg-muted/30 border-b">
          <h3 className="text-sm font-medium mb-2 flex items-center">
            <Navigation className="h-3 w-3 mr-1" />
            Nearby Bus Stops to {searchedLocation.name}
          </h3>
          <div className="flex flex-wrap gap-2">
            {nearbyStops.map((stop) => (
              <Badge
                key={stop.id}
                variant={selectedStopId === stop.id ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => onStopSelect(stop.id)}
              >
                {stop.name}
              </Badge>
            ))}
          </div>
        </div>
      )}

      <div className="divide-y">
        {displayedStops.length === 0 ? (
          <div className="p-4 text-center text-muted-foreground">No bus stops found. Try a different search.</div>
        ) : (
          displayedStops.map((stop) => (
            <StopItem
              key={stop.id}
              stop={stop}
              isExpanded={stop.id === expandedStopId}
              isSelected={stop.id === selectedStopId}
              onClick={() => handleStopClick(stop.id)}
              campus={determineCampus(stop)}
              time={time}
              isNearby={nearbyStops.some((s) => s.id === stop.id)}
            />
          ))
        )}
      </div>
    </div>
  )
}

interface StopItemProps {
  stop: BusStop
  isExpanded: boolean
  isSelected: boolean
  onClick: () => void
  campus: Campus
  time: string
  isNearby: boolean
}

function StopItem({ stop, isExpanded, isSelected, onClick, campus, time, isNearby }: StopItemProps) {
  const routes = getBusRoutesByStop(campus, stop.id).filter((route) => route.departureTime === time)

  return (
    <div
      className={`p-4 cursor-pointer transition-colors ${
        isSelected ? "bg-muted" : isNearby ? "bg-muted/30 hover:bg-muted/50" : "hover:bg-muted/50"
      }`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-2">
          {isNearby ? (
            <Navigation className="h-4 w-4 text-primary mt-1" />
          ) : (
            <MapPin className="h-4 w-4 text-primary mt-1" />
          )}
          <div>
            <h3 className="font-medium">{stop.name}</h3>
            <p className="text-xs text-muted-foreground mt-1">
              {stop.location.lat.toFixed(4)}, {stop.location.lng.toFixed(4)}
            </p>
            <p className="text-xs text-muted-foreground">Campus: {campus === "tai-tam" ? "Tai Tam" : "Repulse Bay"}</p>
          </div>
        </div>
        <div className="flex flex-wrap justify-end gap-1 max-w-[50%]">
          {stop.busNumbers.map((busNum) => (
            <span key={busNum} className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full">
              {busNum}
            </span>
          ))}
        </div>
      </div>

      {isExpanded && (
        <div className="mt-4 space-y-4">
          <div>
            <h4 className="text-sm font-medium mb-2">Buses at this stop:</h4>
            {routes.length > 0 ? (
              <div className="space-y-2">
                {routes.map((route) => {
                  const stopInfo = route.stops.find((s) => s.stopId === stop.id)
                  return (
                    <div key={route.id} className="p-3 rounded-md bg-muted/50">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Bus className="h-4 w-4" />
                          <span className="font-medium">Bus {route.busNumber}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span className="text-xs">{stopInfo?.estimatedTime || route.departureTime}</span>
                        </div>
                      </div>

                      <div className="text-xs text-muted-foreground">
                        <div className="flex items-center gap-1 mb-1">
                          <span>From:</span>
                          <span className="font-medium">{route.stops[0].stopId}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span>To:</span>
                          <span className="font-medium">{route.stops[route.stops.length - 1].stopId}</span>
                        </div>
                      </div>

                      {stopInfo && stopInfo.order < route.stops.length && (
                        <div className="mt-2 pt-2 border-t border-muted">
                          <div className="text-xs font-medium mb-1">Next stops:</div>
                          <div className="flex flex-wrap gap-1">
                            {route.stops
                              .filter((s) => s.order > stopInfo.order)
                              .slice(0, 3)
                              .map((nextStop, index) => {
                                const stopData = getBusStopByIdFromAnyCampus(nextStop.stopId)
                                return stopData ? (
                                  <div key={nextStop.stopId} className="flex items-center">
                                    {index > 0 && <ArrowRight className="h-2 w-2 mx-1" />}
                                    <span className="text-xs">{stopData.name}</span>
                                  </div>
                                ) : null
                              })}
                            {route.stops.filter((s) => s.order > stopInfo.order).length > 3 && (
                              <span className="text-xs text-muted-foreground ml-1">
                                +{route.stops.filter((s) => s.order > stopInfo.order).length - 3} more
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No buses at this time.</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
