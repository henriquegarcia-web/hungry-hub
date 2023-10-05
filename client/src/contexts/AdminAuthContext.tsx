/* eslint-disable @typescript-eslint/no-explicit-any */

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react'

import { message } from 'antd'

import firebase from '@/firebase/firebase'
import {
  handleDeleteAdminAccount,
  handleGetAdminData,
  handleLogoutAdmin
} from '@/firebase/auth'

import { IUserData } from '@/@types/Auth'

interface AdminAuthContextData {
  userId: string | null
  userData: IUserData | null
  isAdminLogged: boolean
  companyHasAllDataFilledIn: boolean
  isAdminPremium: boolean

  handleLogout: () => void
  handleDeleteAccount: () => void
}

// ===================================================================

export const AdminAuthContext = createContext<AdminAuthContextData>(
  {} as AdminAuthContextData
)

const AdminAuthProvider = ({ children }: { children: React.ReactNode }) => {
  // =================================================================

  const [userId, setUserId] = useState<string | null>(null)
  const [userData, setUserData] = useState<IUserData | null>(null)

  const isAdminLogged = useMemo(() => {
    return !!userId
  }, [userId])

  const isAdminPremium = useMemo(() => {
    return (
      !!userData &&
      (userData.adminSubscription?.planType === 'monthly_plan' ||
        userData.adminSubscription?.planType === 'annual_plan' ||
        userData.adminSubscription?.planType === 'lifetime_plan')
    )
  }, [userData])

  const companyHasAllDataFilledIn = useMemo(() => {
    if (!userData || !userData.adminCompanyInfo) {
      return false
    }

    const companyInfo = userData.adminCompanyInfo

    const isNameEmpty = !companyInfo.companyName
    const isIdEmpty = !companyInfo.companyId
    const isDescriptionEmpty = !companyInfo.companyDescription

    const hasSchedules =
      companyInfo.companySchedules && companyInfo.companySchedules.length > 0
    const hasLocation = companyInfo.companyLocation

    return (
      !isNameEmpty &&
      !isIdEmpty &&
      !isDescriptionEmpty &&
      !!hasSchedules &&
      !!hasLocation
    )
  }, [userData])

  // -----------------------------------------------------------------

  const handleLogout = useCallback(async () => {
    const response = await handleLogoutAdmin()
    if (!response) return

    setUserId(null)
    setUserData(null)
  }, [])

  const handleDeleteAccount = useCallback(async () => {
    const response = await handleDeleteAdminAccount()
    if (!response) return

    setUserId(null)
    setUserData(null)
  }, [])

  // -----------------------------------------------------------------

  useEffect(() => {
    const unsubscribe = firebase
      .auth()
      .onAuthStateChanged(async (user: any) => {
        if (user) {
          const uid = user.uid
          setUserId(uid)
        } else {
          setUserId(null)
          setUserData(null)
          handleLogout()
        }
      })

    return () => unsubscribe()
  }, [handleLogout])

  useEffect(() => {
    const unsubscribe = handleGetAdminData((accountData) => {
      setUserData(accountData)
    })

    if (unsubscribe) {
      return () => {
        unsubscribe()
      }
    }
  }, [userId])

  // =================================================================

  // useEffect(() => {
  //   console.log('LOGADO ======>', isAdminLogged, userId)
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [isAdminLogged])

  const AdminAuthContextValues = useMemo(() => {
    return {
      userId,
      userData,
      isAdminLogged,
      companyHasAllDataFilledIn,
      isAdminPremium,
      handleLogout,
      handleDeleteAccount
    }
  }, [
    userId,
    userData,
    isAdminLogged,
    companyHasAllDataFilledIn,
    isAdminPremium,
    handleLogout,
    handleDeleteAccount
  ])

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
