/* eslint-disable @typescript-eslint/no-explicit-any */

import { message } from 'antd'
import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  useCallback
} from 'react'

import { useAdminAuth } from './AdminAuthContext'

export type ThemeProps = 'default' | 'dark'

interface AdminContextData {
  adminTheme: ThemeProps
  isCompanyActive: boolean
  handleActiveCompany: () => void
  handleDesactiveCompany: () => void
  toogleThemeDark: (activeThemeDark: boolean) => void
}

// ===================================================================

export const AdminContext = createContext<AdminContextData>(
  {} as AdminContextData
)

const AdminProvider = ({ children }: { children: React.ReactNode }) => {
  const { companyHasAllDataFilledIn } = useAdminAuth()

  // =================================================================

  const [adminTheme, setAdminTheme] = useState<ThemeProps>('default')

  const [isCompanyActive, setIsCompanyActive] = useState<boolean>(false)

  // =================================================================

  const handleDesactiveCompany = () => setIsCompanyActive(false)

  const handleActiveCompany = useCallback(() => {
    if (!companyHasAllDataFilledIn) {
      message.open({
        type: 'warning',
        content:
          'Não é possível ativar o cardápio até que todos dados sejam preenchidos!'
      })
      return
    }

    setIsCompanyActive(true)
  }, [companyHasAllDataFilledIn])

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
      toogleThemeDark,
      isCompanyActive,
      handleActiveCompany,
      handleDesactiveCompany
    }
  }, [adminTheme, isCompanyActive, handleActiveCompany])

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
