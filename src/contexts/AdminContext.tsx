/* eslint-disable @typescript-eslint/no-explicit-any */

import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  useCallback
} from 'react'

export type ThemeProps = 'default' | 'dark'

interface AdminContextData {
  adminTheme: ThemeProps
  isLoading: boolean
  toogleThemeDark: (activeThemeDark: boolean) => void
}

// ===================================================================

export const AdminContext = createContext<AdminContextData>(
  {} as AdminContextData
)

const AdminProvider = ({ children }: { children: React.ReactNode }) => {
  // =================================================================

  const [adminTheme, setAdminTheme] = useState<ThemeProps>('default')

  const [isLoading, setIsLoading] = useState<boolean>(false)

  // =================================================================

  // ------------------------------------------------------------------

  const toogleThemeDark = (activeThemeDark: boolean) => {
    if (activeThemeDark) {
      setAdminTheme('dark')
    } else {
      setAdminTheme('default')
    }
  }

  // ------------------------------------------------------------------

  // =================================================================

  const AdminContextValues = useMemo(() => {
    return {
      adminTheme,
      isLoading,
      toogleThemeDark
    }
  }, [adminTheme, isLoading])

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
