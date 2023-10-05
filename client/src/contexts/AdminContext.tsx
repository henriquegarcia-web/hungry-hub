/* eslint-disable @typescript-eslint/no-explicit-any */

import { message } from 'antd'
import React, {
  createContext,
  useContext,
  useMemo,
  useCallback,
  useState,
  useEffect
} from 'react'

import { useAdminAuth } from './AdminAuthContext'
import {
  handleActiveCompanyMenu,
  handleActiveCompanyMenuTestMode
} from '@/firebase/company'
import { handleChangeAdminTheme } from '@/firebase/auth'

export type ThemeProps = 'default' | 'dark'
import { AdminTheme } from '@/@types/Auth'

interface AdminContextData {
  adminTheme: ThemeProps
  adminTempTheme: ThemeProps
  showPremiumAnnouncement: boolean
  handleClosePremiumAnnouncement: () => void
  handleActiveMenu: (checked: boolean) => void
  handleActiveMenuTestMode: (checked: boolean) => void
  toogleThemeDark: (activeThemeDark: boolean) => Promise<void>
  toogleTempThemeDark: (activeThemeDark: boolean) => void
}

// ===================================================================

export const AdminContext = createContext<AdminContextData>(
  {} as AdminContextData
)

const AdminProvider = ({ children }: { children: React.ReactNode }) => {
  const { userData, isAdminLogged, isAdminPremium, companyHasAllDataFilledIn } =
    useAdminAuth()

  // =================================================================

  const [showPremiumAnnouncement, setShowPremiumAnnouncement] = useState(false)

  const [adminTempTheme, setAdminTempTheme] = useState<AdminTheme>('default')

  const adminTheme: AdminTheme = useMemo(() => {
    if (!isAdminLogged || !userData) return adminTempTheme

    return userData?.adminPreferences?.adminTheme || adminTempTheme
  }, [isAdminLogged, userData, adminTempTheme])

  // =================================================================

  useEffect(() => {
    if (!isAdminPremium) {
      setShowPremiumAnnouncement(true)
      return
    }

    setShowPremiumAnnouncement(false)
  }, [isAdminPremium])

  const handleClosePremiumAnnouncement = () => {
    setShowPremiumAnnouncement(false)
  }

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

  const toogleThemeDark = async (activeThemeDark: boolean) => {
    if (activeThemeDark) {
      await handleChangeAdminTheme('dark')
    } else {
      await handleChangeAdminTheme('default')
    }
  }

  const toogleTempThemeDark = (activeThemeDark: boolean) => {
    if (activeThemeDark) {
      setAdminTempTheme('dark')
    } else {
      setAdminTempTheme('default')
    }
  }

  // ------------------------------------------------------------------

  // =================================================================

  const AdminContextValues = useMemo(() => {
    return {
      adminTheme,
      adminTempTheme,
      showPremiumAnnouncement,
      toogleThemeDark,
      toogleTempThemeDark,
      handleActiveMenu,
      handleActiveMenuTestMode,
      handleClosePremiumAnnouncement
    }
  }, [
    adminTheme,
    adminTempTheme,
    showPremiumAnnouncement,
    handleActiveMenu,
    handleActiveMenuTestMode
  ])

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
