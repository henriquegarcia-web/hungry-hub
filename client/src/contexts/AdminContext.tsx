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
import {
  handleActiveCompanyMenu,
  handleActiveCompanyMenuTestMode
} from '@/firebase/company'

export type ThemeProps = 'default' | 'dark'

interface AdminContextData {
  adminTheme: ThemeProps
  handleActiveMenu: (checked: boolean) => void
  handleActiveMenuTestMode: (checked: boolean) => void
  toogleThemeDark: (activeThemeDark: boolean) => void
}

// ===================================================================

export const AdminContext = createContext<AdminContextData>(
  {} as AdminContextData
)

const AdminProvider = ({ children }: { children: React.ReactNode }) => {
  const { isAdminPremium, companyHasAllDataFilledIn } = useAdminAuth()

  // =================================================================

  const [adminTheme, setAdminTheme] = useState<ThemeProps>('default')

  // =================================================================

  const handleActiveMenu = useCallback(
    (checked: boolean) => {
      if (!isAdminPremium) {
        message.open({
          type: 'warning',
          content: 'Você precisa ser premium para ativar o cardápio.'
        })
        return
      }

      if (!companyHasAllDataFilledIn) {
        message.open({
          type: 'warning',
          content:
            'Não é possível ativar o cardápio até que todos dados sejam preenchidos!'
        })
        return
      }

      handleActiveCompanyMenu(checked)
    },
    [isAdminPremium, companyHasAllDataFilledIn]
  )

  const handleActiveMenuTestMode = useCallback(
    (checked: boolean) => {
      if (!companyHasAllDataFilledIn) {
        message.open({
          type: 'warning',
          content:
            'Não é possível ativar o cardápio até que todos dados sejam preenchidos!'
        })
        return
      }

      handleActiveCompanyMenuTestMode(checked)
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
      handleActiveMenu,
      handleActiveMenuTestMode
    }
  }, [adminTheme, handleActiveMenu, handleActiveMenuTestMode])

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
