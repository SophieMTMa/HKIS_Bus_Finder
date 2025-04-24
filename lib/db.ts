import type { BusRoute, BusStop, FAQ, Campus } from "./types"

// Sample data for bus stops
const busStops: BusStop[] = [
  {
    id: "elements-zara",
    name: "Elements Zara",
    location: { lat: 22.3048, lng: 114.1609 },
    busNumbers: ["1"],
  },
  {
    id: "olympian-city",
    name: "Olympian City (Bank of China Centre)",
    location: { lat: 22.3175, lng: 114.1603 },
    busNumbers: ["1", "31/51A"],
  },
  {
    id: "middle-rd-ymca",
    name: "Middle RD YMCA",
    location: { lat: 22.2995, lng: 114.1747 },
    busNumbers: ["1", "31/51"],
  },
  {
    id: "rosary-church",
    name: "Rosary Church",
    location: { lat: 22.3068, lng: 114.1723 },
    busNumbers: ["1"],
  },
  {
    id: "repulse-bay-rd-90",
    name: "Repulse Bay Rd #90",
    location: { lat: 22.2603, lng: 114.1927 },
    busNumbers: ["33A/53A", "37/57"],
  },
  {
    id: "hong-kong-parkview",
    name: "Hong Kong Parkview",
    location: { lat: 22.2636, lng: 114.1974 },
    busNumbers: ["9", "42/62"],
  },
  {
    id: "tai-tam-rd",
    name: "Tai Tam Rd",
    location: { lat: 22.2669, lng: 114.2193 },
    busNumbers: ["17", "38A/58A", "38/58"],
  },
  {
    id: "stanley-village-rd",
    name: "Stanley Village Rd",
    location: { lat: 22.2195, lng: 114.211 },
    busNumbers: ["19", "38B/58B"],
  },
  // More stops would be added here from the data
]

// Sample data for bus routes
const busRoutes: BusRoute[] = [
  {
    id: "1-315pm",
    busNumber: "1",
    departureTime: "3:15PM",
    campus: "tai-tam",
    stops: [
      { stopId: "elements-zara", order: 1 },
      { stopId: "olympian-city", order: 2 },
      { stopId: "middle-rd-ymca", order: 3 },
      { stopId: "rosary-church", order: 4 },
      // More stops would be added here
    ],
  },
  {
    id: "3-315pm",
    busNumber: "3",
    departureTime: "3:15PM",
    campus: "tai-tam",
    stops: [
      { stopId: "woodland-heights", order: 1 },
      { stopId: "wong-nai-chung-gap-rd-8", order: 2 },
      // More stops would be added here
    ],
  },
  // More routes would be added here from the data
]

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

export function getBusStops(): BusStop[] {
  return busStops
}

export function getBusRoutes(campus: Campus, time?: string): BusRoute[] {
  return busRoutes.filter((route) => route.campus === campus && (time ? route.departureTime === time : true))
}

export function searchBusStops(query: string): BusStop[] {
  const lowerQuery = query.toLowerCase()
  return busStops.filter(
    (stop) =>
      stop.name.toLowerCase().includes(lowerQuery) ||
      stop.busNumbers.some((num) => num.toLowerCase().includes(lowerQuery)),
  )
}

export function getBusStopById(id: string): BusStop | undefined {
  return busStops.find((stop) => stop.id === id)
}

export function getBusRouteById(id: string): BusRoute | undefined {
  return busRoutes.find((route) => route.id === id)
}

export function getBusRoutesByStop(stopId: string): BusRoute[] {
  return busRoutes.filter((route) => route.stops.some((stop) => stop.stopId === stopId))
}

export function getFAQs(): FAQ[] {
  return faqs
}
