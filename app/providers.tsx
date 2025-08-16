'use client'

import { createContext, useContext, useState } from 'react'

// Create context without external dependencies
const AppContext = createContext<{
  supabase: any
  stripe: any
  user: any
  loading: boolean
}>({
  supabase: null,
  stripe: null,
  user: null,
  loading: false,
})

export const useApp = () => useContext(AppContext)

export function Providers({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  return (
    <AppContext.Provider value={{ 
      supabase: null, 
      stripe: null, 
      user, 
      loading 
    }}>
      {children}
    </AppContext.Provider>
  )
}
