import type { BusRoute, BusStop, Campus, FAQ } from "./types"
import { sampleTaiTamData, sampleRepulseBayData } from "./sample-data"

// In-memory storage for bus data
const busStopsData: Record<Campus, BusStop[]> = {
  "tai-tam": sampleTaiTamData.stops,
  "repulse-bay": sampleRepulseBayData.stops,
}

const busRoutesData: Record<Campus, BusRoute[]> = {
  "tai-tam": sampleTaiTamData.routes,
  "repulse-bay": sampleRepulseBayData.routes,
}

// FAQ data
const faqs: FAQ[] = [
  {
    question: "Where are the buses?",
    answer: "They are parked at the middle school parking lot.",
  },
  {
    question: "Who runs them?",
    answer: "Kwoon Chung Motors Co. LTD.",
  },
  {
    question: "Who can I talk to about bus problems?",
    answer: "Tel: 3913 9383 / Email: hkis@kcm.com.hk",
  },
]

// Import data functions
export function importBusData(campus: Campus, data: { routes: BusRoute[]; stops: BusStop[] }) {
  busStopsData[campus] = data.stops
  busRoutesData[campus] = data.routes
  return { success: true }
}

// Query functions
export function getBusStops(campus: Campus): BusStop[] {
  return busStopsData[campus]
}

// Get all bus stops from both campuses
export function getAllBusStops(): BusStop[] {
  return [...busStopsData["tai-tam"], ...busStopsData["repulse-bay"]]
}

export function getBusRoutes(campus: Campus, time?: string): BusRoute[] {
  return busRoutesData[campus].filter((route) => (time ? route.departureTime === time : true))
}

export function searchBusStops(campus: Campus, query: string): BusStop[] {
  const lowerQuery = query.toLowerCase()
  return busStopsData[campus].filter(
    (stop) =>
      stop.name.toLowerCase().includes(lowerQuery) ||
      stop.busNumbers.some((num) => num.toLowerCase().includes(lowerQuery)),
  )
}

// Search across all bus stops from both campuses
export function searchAllBusStops(query: string): BusStop[] {
  const lowerQuery = query.toLowerCase()
  return getAllBusStops().filter(
    (stop) =>
      stop.name.toLowerCase().includes(lowerQuery) ||
      stop.busNumbers.some((num) => num.toLowerCase().includes(lowerQuery)),
  )
}

export function getBusStopById(campus: Campus, id: string): BusStop | undefined {
  return busStopsData[campus].find((stop) => stop.id === id)
}

// Get bus stop by ID from either campus
export function getBusStopByIdFromAnyCampus(id: string): BusStop | undefined {
  const taiTamStop = busStopsData["tai-tam"].find((stop) => stop.id === id)
  if (taiTamStop) return taiTamStop

  return busStopsData["repulse-bay"].find((stop) => stop.id === id)
}

export function getBusRouteById(campus: Campus, id: string): BusRoute | undefined {
  return busRoutesData[campus].find((route) => route.id === id)
}

export function getBusRoutesByStop(campus: Campus, stopId: string): BusRoute[] {
  return busRoutesData[campus].filter((route) => route.stops.some((stop) => stop.stopId === stopId))
}

export function getFAQs(): FAQ[] {
  return faqs
}
