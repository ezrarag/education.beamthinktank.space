'use client'

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { UserLocation, detectUserLocation, getLocationFromStorage, saveLocationToStorage } from '@/lib/location'
import { getCityByRegion, type CityData } from '@/lib/cities'

interface LocationContextType {
  userLocation: UserLocation | null
  cityData: CityData | null
  isLoading: boolean
  error: string | null
  refreshLocation: () => Promise<void>
  setManualLocation: (city: string, region: string, state: string, country: string) => void
  clearLocation: () => void
}

const LocationContext = createContext<LocationContextType | undefined>(undefined)

export function useLocation() {
  const context = useContext(LocationContext)
  if (context === undefined) {
    throw new Error('useLocation must be used within a LocationProvider')
  }
  return context
}

interface LocationProviderProps {
  children: ReactNode
}

export function LocationProvider({ children }: LocationProviderProps) {
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null)
  const [cityData, setCityData] = useState<CityData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refreshLocation = async () => {
    try {
      setIsLoading(true)
      setError(null)
      
      // Try to get stored location first
      let location = getLocationFromStorage()
      
      if (!location) {
        // Detect location if none stored
        location = await detectUserLocation()
        if (location) {
          saveLocationToStorage(location)
        }
      }
      
      if (location) {
        setUserLocation(location)
        const city = getCityByRegion(location.region)
        setCityData(city)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to detect location')
      console.error('Location detection error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSetManualLocation = (city: string, region: string, state: string, country: string) => {
    const location: UserLocation = {
      city,
      region,
      state,
      country,
      detected: false,
      method: 'manual'
    }
    
    setUserLocation(location)
    saveLocationToStorage(location)
    
    const cityData = getCityByRegion(region)
    setCityData(cityData)
  }

  const clearLocation = () => {
    setUserLocation(null)
    setCityData(null)
    if (typeof window !== 'undefined') {
      localStorage.removeItem('beamUserLocation')
    }
  }

  useEffect(() => {
    refreshLocation()
  }, [])

  const value: LocationContextType = {
    userLocation,
    cityData,
    isLoading,
    error,
    refreshLocation,
    setManualLocation: handleSetManualLocation,
    clearLocation
  }

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  )
}
