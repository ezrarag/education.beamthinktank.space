import { getNearestCity, type CityData } from './cities'

export interface UserLocation {
  city: string
  region: string
  state: string
  country: string
  coordinates?: {
    lat: number
    lng: number
  }
  detected: boolean
  method: 'ip' | 'browser' | 'manual' | 'default'
}

export interface IPLocationResponse {
  city: string
  region: string
  state: string
  country: string
  lat: number
  lng: number
}

// IP-based geolocation using ipapi.co (free tier)
export async function getLocationByIP(): Promise<UserLocation | null> {
  try {
    const response = await fetch('https://ipapi.co/json/')
    if (!response.ok) throw new Error('IP lookup failed')
    
    const data: IPLocationResponse = await response.json()
    
    // Find the nearest supported city
    const nearestCity = getNearestCity(data.lat, data.lng)
    
    return {
      city: nearestCity.name,
      region: nearestCity.region,
      state: nearestCity.state,
      country: nearestCity.country,
      coordinates: { lat: data.lat, lng: data.lng },
      detected: true,
      method: 'ip'
    }
  } catch (error) {
    console.warn('IP-based location detection failed:', error)
    return null
  }
}

// Browser geolocation API
export async function getLocationByBrowser(): Promise<UserLocation | null> {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve(null)
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        const nearestCity = getNearestCity(latitude, longitude)
        
        resolve({
          city: nearestCity.name,
          region: nearestCity.region,
          state: nearestCity.state,
          country: nearestCity.country,
          coordinates: { lat: latitude, lng: longitude },
          detected: true,
          method: 'browser'
        })
      },
      (error) => {
        console.warn('Browser geolocation failed:', error)
        resolve(null)
      },
      {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes
      }
    )
  })
}

// Fallback to default location (Miami)
export function getDefaultLocation(): UserLocation {
  return {
    city: 'Miami',
    region: 'Miami',
    state: 'Florida',
    country: 'USA',
    detected: false,
    method: 'default'
  }
}

// Main location detection function
export async function detectUserLocation(): Promise<UserLocation> {
  // Try browser geolocation first (more accurate)
  const browserLocation = await getLocationByBrowser()
  if (browserLocation) {
    return browserLocation
  }

  // Fall back to IP-based detection
  const ipLocation = await getLocationByIP()
  if (ipLocation) {
    return ipLocation
  }

  // Final fallback to default
  return getDefaultLocation()
}

// Store location in localStorage
export function saveLocationToStorage(location: UserLocation): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('beamUserLocation', JSON.stringify(location))
  }
}

// Retrieve location from localStorage
export function getLocationFromStorage(): UserLocation | null {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('beamUserLocation')
    if (stored) {
      try {
        return JSON.parse(stored)
      } catch {
        return null
      }
    }
  }
  return null
}

// Manual location selection
export function setManualLocation(city: string, region: string, state: string, country: string): UserLocation {
  const location: UserLocation = {
    city,
    region,
    state,
    country,
    detected: false,
    method: 'manual'
  }
  
  saveLocationToStorage(location)
  return location
}
