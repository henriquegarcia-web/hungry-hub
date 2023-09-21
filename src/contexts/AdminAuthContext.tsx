/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { createContext, useContext, useMemo, useState } from 'react'

interface AdminAuthContextData {
  isAdminLogged: boolean
}

// ===================================================================

export const AdminAuthContext = createContext<AdminAuthContextData>(
  {} as AdminAuthContextData
)

const AdminAuthProvider = ({ children }: { children: React.ReactNode }) => {
  // =================================================================

  // const [isLoading, setIsLoading] = useState<boolean>(false)

  const isAdminLogged = useMemo(() => {
    return true
  }, [])

  // =================================================================

  const AdminAuthContextValues = useMemo(() => {
    return {
      isAdminLogged
    }
  }, [isAdminLogged])

  return (
    <AdminAuthContext.Provider value={AdminAuthContextValues}>
      {children}
    </AdminAuthContext.Provider>
  )
}

function useAdminAuth(): AdminAuthContextData {
  const context = useContext(AdminAuthContext)

  if (!context)
    throw new Error('useAdminAuth must be used within a UserProvider')

  return context
}

export { AdminAuthProvider, useAdminAuth }
