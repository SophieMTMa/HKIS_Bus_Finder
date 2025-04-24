"use client"

import { type ReactNode, useState, useEffect } from "react"
import { LoadScript } from "@react-google-maps/api"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

interface GoogleMapsProviderProps {
  children: ReactNode
}

const libraries = ["places"]

export function GoogleMapsProvider({ children }: GoogleMapsProviderProps) {
  const [loadError, setLoadError] = useState<string | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  // Use environment variable properly
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""

  // Check if API key is valid
  useEffect(() => {
    if (!apiKey || apiKey.trim() === "") {
      setLoadError("Google Maps API key is missing. Using basic search functionality instead.")
    }
  }, [apiKey])

  const handleError = (error: Error) => {
    console.error("Google Maps API error:", error)
    setLoadError("Failed to load Google Maps. Using basic search functionality instead.")
  }

  const handleLoaded = () => {
    setIsLoaded(true)
  }

  // If there's no API key, render children without LoadScript
  if (!apiKey || apiKey.trim() === "") {
    return (
      <>
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Maps API Error</AlertTitle>
          <AlertDescription>Google Maps API key is missing. Please check your environment variables.</AlertDescription>
        </Alert>
        {children}
      </>
    )
  }

  return (
    <>
      {loadError && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Maps API Error</AlertTitle>
          <AlertDescription>{loadError}</AlertDescription>
        </Alert>
      )}

      <LoadScript
        googleMapsApiKey={apiKey}
        libraries={libraries as any}
        onError={handleError}
        onLoad={handleLoaded}
        loadingElement={<div className="p-4 text-center">Loading Google Maps...</div>}
      >
        {children}
      </LoadScript>
    </>
  )
}
