export type Campus = "repulse-bay" | "tai-tam"

export interface BusStop {
  id: string
  name: string
  location: {
    lat: number
    lng: number
  }
  busNumbers: string[]
}

export interface BusRoute {
  id: string
  busNumber: string
  departureTime: string
  campus: Campus
  stops: {
    stopId: string
    estimatedTime?: string
    order: number
  }[]
}

export interface FAQ {
  question: string
  answer: string
}
