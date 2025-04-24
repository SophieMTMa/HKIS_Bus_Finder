import type { BusRoute, BusStop, Campus } from "./types"

interface ParsedStop {
  name: string
  busNumbers: string[]
  location?: {
    lat: number
    lng: number
  }
}

export function parseBusRouteData(
  data: string,
  campus: Campus,
): {
  routes: BusRoute[]
  stops: BusStop[]
} {
  const lines = data
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
  const routes: BusRoute[] = []
  const stopsMap: Record<string, ParsedStop> = {}

  let currentBusNumber = ""
  let currentDepartureTime = ""
  let isMorningRoute = true // Flag to determine if it's a morning or afternoon route

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    // Check for campus indicator
    if (line.includes("REPULSE BAY SCHOOL")) {
      isMorningRoute = false
    }

    // Check if this is a time header
    if (line.match(/TIME: \d+:\d+[AP]M/)) {
      currentDepartureTime = line.match(/\d+:\d+[AP]M/)![0]
      continue
    }

    // Check if this is a bus number line
    const busNumberMatch = line.match(/^(\d+[A-Za-z]?\/?\d*[A-Za-z]?[*]?)(.+)/)
    if (busNumberMatch) {
      currentBusNumber = busNumberMatch[1].trim()
      let routeDescription = busNumberMatch[2].trim()

      // If the route continues on the next line, append it
      while (
        i + 1 < lines.length &&
        !lines[i + 1].match(/^\d+[A-Za-z]?\/?\d*[A-Za-z]?[*]?/) &&
        !lines[i + 1].match(/TIME: \d+:\d+[AP]M/)
      ) {
        i++
        routeDescription += " - " + lines[i].trim()
      }

      // Extract stops from the route description
      const stopNames = routeDescription
        .split(" - ")
        .map((s) => s.trim())
        .filter((s) => s.length > 0)

      // Create a new route
      const route: BusRoute = {
        id: `${currentBusNumber}-${currentDepartureTime}`,
        busNumber: currentBusNumber,
        departureTime: currentDepartureTime,
        campus,
        stops: [],
      }

      // Process each stop
      stopNames.forEach((name, index) => {
        const stopId = generateStopId(name)

        // Add to stops map if not exists
        if (!stopsMap[stopId]) {
          stopsMap[stopId] = {
            name,
            busNumbers: [currentBusNumber],
          }
        } else if (!stopsMap[stopId].busNumbers.includes(currentBusNumber)) {
          stopsMap[stopId].busNumbers.push(currentBusNumber)
        }

        // Add to route
        route.stops.push({
          stopId,
          order: index + 1,
          // Estimate time based on order
          estimatedTime: estimateTime(currentDepartureTime, index, stopNames.length),
        })
      })

      routes.push(route)
    }
  }

  // Convert stops map to array with approximate locations
  const stops: BusStop[] = Object.entries(stopsMap).map(([id, data]) => ({
    id,
    name: data.name,
    location: data.location || generateApproximateLocation(data.name, campus),
    busNumbers: data.busNumbers,
  }))

  return { routes, stops }
}

// Helper function to generate a consistent ID for a stop
function generateStopId(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
}

// Helper function to estimate arrival time based on position in route
function estimateTime(departureTime: string, stopIndex: number, totalStops: number): string {
  const [hourStr, minuteStr] = departureTime.match(/(\d+):(\d+)/)!.slice(1, 3)
  const isPM = departureTime.includes("PM")

  let hour = Number.parseInt(hourStr)
  if (isPM && hour < 12) hour += 12

  const minute = Number.parseInt(minuteStr)

  // Estimate 2-3 minutes per stop
  const minutesPerStop = 2.5
  const additionalMinutes = Math.round(minutesPerStop * stopIndex)

  const totalMinutes = minute + additionalMinutes
  const newHour = (hour + Math.floor(totalMinutes / 60)) % 24
  const newMinute = totalMinutes % 60

  const formattedHour = newHour % 12 || 12
  const amPm = newHour >= 12 ? "PM" : "AM"

  return `${formattedHour}:${newMinute.toString().padStart(2, "0")} ${amPm}`
}

// Helper function to generate approximate locations for stops
function generateApproximateLocation(name: string, campus: Campus): { lat: number; lng: number } {
  // Base coordinates for Hong Kong
  const baseCoordinates = {
    "tai-tam": { lat: 22.2626, lng: 114.2191 },
    "repulse-bay": { lat: 22.2359, lng: 114.1973 },
  }

  // Known locations for some common areas
  const knownLocations: Record<string, { lat: number; lng: number }> = {
    central: { lat: 22.2799, lng: 114.1598 },
    "causeway bay": { lat: 22.2793, lng: 114.1837 },
    "repulse bay": { lat: 22.2359, lng: 114.1973 },
    stanley: { lat: 22.2195, lng: 114.211 },
    "tai tam": { lat: 22.2626, lng: 114.2191 },
    "kennedy town": { lat: 22.2847, lng: 114.1299 },
    "wan chai": { lat: 22.2773, lng: 114.1733 },
    admiralty: { lat: 22.2799, lng: 114.1647 },
    "north point": { lat: 22.2909, lng: 114.1951 },
    "quarry bay": { lat: 22.2885, lng: 114.2101 },
    taikoo: { lat: 22.2861, lng: 114.2183 },
    "happy valley": { lat: 22.2697, lng: 114.1839 },
    "mid-levels": { lat: 22.27, lng: 114.15 },
    "the peak": { lat: 22.2759, lng: 114.1455 },
    pokfulam: { lat: 22.2713, lng: 114.1299 },
    aberdeen: { lat: 22.2483, lng: 114.1539 },
    "wong chuk hang": { lat: 22.2478, lng: 114.1673 },
    "ocean park": { lat: 22.2334, lng: 114.1733 },
    "south horizons": { lat: 22.2433, lng: 114.1539 },
  }

  // Try to match the stop name with known locations
  const lowerName = name.toLowerCase()
  for (const [area, coords] of Object.entries(knownLocations)) {
    if (lowerName.includes(area)) {
      // Add a small random offset to avoid overlapping markers
      return {
        lat: coords.lat + (Math.random() - 0.5) * 0.005,
        lng: coords.lng + (Math.random() - 0.5) * 0.005,
      }
    }
  }

  // If no match, use the base coordinates with a larger random offset
  const base = baseCoordinates[campus]
  return {
    lat: base.lat + (Math.random() - 0.5) * 0.02,
    lng: base.lng + (Math.random() - 0.5) * 0.02,
  }
}
