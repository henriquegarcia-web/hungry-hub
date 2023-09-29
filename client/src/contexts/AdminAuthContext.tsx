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
import { handleGetUserData, handleLogoutUser } from '@/firebase/auth'

import { IUserData } from '@/@types/Auth'

interface AdminAuthContextData {
  userId: string | null
  userData: IUserData | null
  isAdminLogged: boolean
  // isAdminPremium: boolean

  handleLogout: () => void
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

  // const isAdminPremium = useMemo(() => {
  //   return (
  //     !!userData &&
  //     (userData.adminSubscription?.planType === 'monthly_plan' ||
  //       userData.adminSubscription?.planType === 'annual_plan')
  //   )
  // }, [userData])

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
        }
      })

    return () => unsubscribe()
  }, [])

  useEffect(() => {
    const unsubscribe = handleGetUserData((accountData) => {
      setUserData(accountData)
    })

    if (unsubscribe) {
      return () => {
        unsubscribe()
      }
    }
  }, [userId])

  // -----------------------------------------------------------------

  const handleLogout = useCallback(async () => {
    const response = await handleLogoutUser()

    if (!response) {
      message.open({
        type: 'error',
        content: 'Falha ao fazer logout'
      })
      return
    }

    setUserId(null)
    setUserData(null)
  }, [])

  // =================================================================

  useEffect(() => {
    console.log('LOGADO ======>', isAdminLogged, userId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAdminLogged])

  const AdminAuthContextValues = useMemo(() => {
    return {
      userId,
      userData,
      isAdminLogged,
      handleLogout
    }
  }, [userId, userData, isAdminLogged, handleLogout])

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
