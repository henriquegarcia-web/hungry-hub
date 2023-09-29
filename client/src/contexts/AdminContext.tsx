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
import { handleActiveCompanyMenu } from '@/firebase/company'

export type ThemeProps = 'default' | 'dark'

interface AdminContextData {
  adminTheme: ThemeProps
  handleActiveMenu: (checked: boolean) => void
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

  // =================================================================

  const handleActiveMenu = useCallback(
    (checked: boolean) => {
      if (!companyHasAllDataFilledIn) {
        message.open({
          type: 'warning',
          content:
            'Não é possível ativar o cardápio até que todos dados sejam preenchidos!'
        })
        // handleActiveCompanyMenu(false)
        return
      }

      handleActiveCompanyMenu(checked)
    },
    [companyHasAllDataFilledIn]
  )

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
      handleActiveMenu
    }
  }, [adminTheme, handleActiveMenu])

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
