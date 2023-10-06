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
import api from '@/api'

interface AdminAuthContextData {
  userId: string | null
  userData: IUserData | null
  isAdminLogged: boolean
  companyHasAllDataFilledIn: boolean
  companyHasNoMenuRegistered: boolean
  isAdminPremium: boolean
  isDeletingAccount: boolean

  handleLogout: () => void
  handleDeleteAccount: (adminPassword: string) => Promise<boolean>
}

// ===================================================================

export const AdminAuthContext = createContext<AdminAuthContextData>(
  {} as AdminAuthContextData
)

const AdminAuthProvider = ({ children }: { children: React.ReactNode }) => {
  // =================================================================

  const [userId, setUserId] = useState<string | null>(null)
  const [userData, setUserData] = useState<IUserData | null>(null)

  const [isDeletingAccount, setIsDeletingAccount] = useState<boolean>(false)

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

  const companyHasNoMenuRegistered = useMemo(() => {
    if (
      !userData ||
      !userData.adminCompanyInfo ||
      !userData.adminCompanyInfo.companyMenu
    ) {
      return true
    }

    const companyMenu = userData.adminCompanyInfo.companyMenu

    const menuKeys = Object.keys(companyMenu)

    const hasActiveCategory = menuKeys.some(
      (categoryId: any) => companyMenu[categoryId].active
    )

    if (!hasActiveCategory) {
      return true
    }

    const hasActiveProduct = menuKeys.some(
      (categoryId: any) =>
        companyMenu[categoryId].products &&
        Object.values(companyMenu[categoryId].products).some(
          (product) => product.productActive
        )
    )

    return !hasActiveProduct
  }, [userData])

  // -----------------------------------------------------------------

  const handleLogout = useCallback(async () => {
    const response = await handleLogoutAdmin()
    if (!response) return

    setUserId(null)
    setUserData(null)
  }, [])

  const handleDeleteAccount = useCallback(
    async (adminPassword: string) => {
      setIsDeletingAccount(true)

      if (
        !isAdminPremium ||
        userData?.adminSubscription?.planType === 'lifetime_plan'
      ) {
        const deleteAccountResponse = await handleDeleteAdminAccount(
          adminPassword
        )

        setIsDeletingAccount(false)

        if (deleteAccountResponse) {
          setUserId(null)
          setUserData(null)

          return true
        }

        return false
      }

      try {
        const cancelSignatureResponse = await api.post(
          '/api/v1/cancel-subscription',
          {
            subscriptionId: userData?.adminSubscription?.planSubscriptionId
          }
        )

        if (cancelSignatureResponse.status !== 200) return false

        const deleteAccountResponse = await handleDeleteAdminAccount(
          adminPassword
        )

        setIsDeletingAccount(false)

        if (deleteAccountResponse) {
          setUserId(null)
          setUserData(null)

          return true
        }

        return false
      } catch (error) {
        message.open({
          type: 'error',
          content: 'Falha ao excluir a conta. Tente novamente mais tarde.'
        })
        console.log(error)
        setIsDeletingAccount(false)

        return false
      }
    },
    [isAdminPremium, userData]
  )

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
      companyHasNoMenuRegistered,
      isAdminPremium,
      isDeletingAccount,
      handleLogout,
      handleDeleteAccount
    }
  }, [
    userId,
    userData,
    isAdminLogged,
    companyHasAllDataFilledIn,
    companyHasNoMenuRegistered,
    isAdminPremium,
    isDeletingAccount,
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
