/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { createContext, useContext, useMemo, useState } from 'react'

interface AdminContextData {
  isLoading: boolean
}

// ===================================================================

export const AdminContext = createContext<AdminContextData>(
  {} as AdminContextData
)

const AdminProvider = ({ children }: { children: React.ReactNode }) => {
  // =================================================================

  const [isLoading, setIsLoading] = useState<boolean>(false)

  // =================================================================

  const AdminContextValues = useMemo(() => {
    return {
      isLoading
    }
  }, [isLoading])

  return (
    <AdminContext.Provider value={AdminContextValues}>
      {children}
    </AdminContext.Provider>
  )
}

function useAdmin(): AdminContextData {
  const context = useContext(AdminContext)

  if (!context) throw new Error('useAdmin must be used within a UserProvider')

  return context
}

export { AdminProvider, useAdmin }
