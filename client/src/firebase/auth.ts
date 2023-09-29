import firebase from '@/firebase/firebase'

import { handleTranslateFbError } from '@/utils/functions/firebaseTranslateErrors'

import { message } from 'antd'

import { ISigninUser, ISignupUser, IUserData } from '@/@types/Auth'

// ============================================== CREATE ADMIN DATA

const createAdminAccount = async (adminData: IUserData): Promise<boolean> => {
  try {
    const adminAccountsRef = firebase
      .database()
      .ref('adminAccounts/' + adminData.adminId)

    await adminAccountsRef.set(adminData)

    message.open({
      type: 'success',
      content: 'Credenciais salvas com sucesso'
    })
    return true
  } catch (error) {
    message.open({
      type: 'error',
      content: 'Falha ao salvar credenciais'
    })
    return false
  }
}

// ============================================== LOGIN

const handleSigninAdmin = async ({
  adminEmail,
  adminPassword
}: ISigninUser): Promise<boolean> => {
  try {
    await firebase.auth().signInWithEmailAndPassword(adminEmail, adminPassword)

    return true
  } catch (error: any) {
    const errorCode = error.code
    const traslatedError = handleTranslateFbError(errorCode)

    message.open({
      type: 'error',
      content: traslatedError
    })
    return false
  }
}

const handleSignupAdmin = async ({
  adminName,
  adminEmail,
  adminPhone,
  adminPassword
}: ISignupUser): Promise<boolean | string> => {
  try {
    // ----------------------------------

    const adminAccountsRef = firebase.database().ref('adminAccounts')

    const adminQuery = adminAccountsRef
      .orderByChild('adminEmail')
      .equalTo(adminEmail)

    const adminQuerySnapshot = await adminQuery.get()

    if (adminQuerySnapshot.exists()) {
      message.open({
        type: 'warning',
        content:
          'Essa conta já possuí cadastro, faça login para acessar o sistema'
      })
      return false
    }

    // ----------------------------------

    const userCredential = await firebase
      .auth()
      .createUserWithEmailAndPassword(adminEmail, adminPassword)

    if (userCredential.user) {
      await userCredential.user.updateProfile({
        displayName: adminName
      })

      const adminData: IUserData = {
        adminId: userCredential.user.uid,
        adminName: adminName,
        adminEmail: adminEmail,
        adminPhone: adminPhone,
        adminRegisteredAt: Date.now()
      }

      const adminDataResponse = await createAdminAccount(adminData)

      if (!adminDataResponse) {
        message.open({
          type: 'error',
          content: 'Falha ao realizar cadastro'
        })
        return false
      }
    }

    message.open({
      type: 'success',
      content: 'Conta criada com sucesso'
    })
    return true
  } catch (error: any) {
    const errorCode = error.code

    const traslatedError = handleTranslateFbError(errorCode)

    message.open({
      type: 'error',
      content: traslatedError
    })
    return false
  }
}

// ============================================== LOGOUT

const handleLogoutUser = async (): Promise<boolean> => {
  try {
    await firebase.auth().signOut()

    return true
  } catch (error: any) {
    const errorCode = error.code
    const errorMessage = error.message
    console.error('Erro ao deslogar usuário: ', errorMessage, errorCode)

    return false
  }
}

// ============================================== HANDLE GET USER DATA

const handleGetUserData = (
  callback: (accountData: IUserData | null) => void
) => {
  const user = firebase.auth().currentUser

  if (!user) {
    callback(null)
    return
  }

  const adminsRef = firebase.database().ref('adminAccounts/' + user.uid)

  const listener = (snapshot: any) => {
    try {
      if (snapshot && snapshot.exists()) {
        const companyData = snapshot.val()
        callback(companyData)
      } else {
        callback(null)
      }
    } catch (error) {
      message.open({
        type: 'error',
        content: 'Falha ao obter dados da empresa'
      })
    }
  }

  const offCallback = () => {
    adminsRef.off('value', listener)
  }

  adminsRef.on('value', listener)

  return offCallback
}

// -----------------------------------------------------------------

export {
  handleSigninAdmin,
  handleSignupAdmin,
  handleLogoutUser,
  handleGetUserData
}
