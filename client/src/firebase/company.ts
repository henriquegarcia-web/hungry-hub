// import {
//   auth,
//   database,
//   get,
//   ref,
//   onValue,
//   orderByChild,
//   equalTo,
//   query,
//   set,
//   off
// } from '@/firebase/firebase'

// import { toaster } from 'evergreen-ui'

// import { ICreateCompanyData, ICompanyData } from '@/@types/Auth'
// import { DataSnapshot } from 'firebase/database'

// // ============================================== VERIFY IF COMPANY EXISTS

// const validateIfCompanyExists = async (companyId: string): Promise<boolean> => {
//   try {
//     const companiesRef = ref(database, 'companies')

//     const snapshot = await get(companiesRef)
//     if (snapshot.exists()) {
//       const companiesData = snapshot.val()
//       return companyId in companiesData
//     }
//     return false
//   } catch (error) {
//     console.error('Erro ao verificar a empresa:', error)
//     return false
//   }
// }

// // ============================================== CREATE COMPANY DATA

// const createCompany = async ({
//   companyId,
//   companyName
// }: ICreateCompanyData): Promise<boolean> => {
//   const user = auth.currentUser

//   if (user) {
//     try {
//       const companyValidation = await validateIfCompanyExists(companyId)

//       if (companyValidation) {
//         toaster.danger('Já existe outra empresa criada com esse ID')
//         return false
//       }

//       const companyData = {
//         companyId: companyId,
//         companyName: companyName,
//         companyAdmin: user.uid
//       }

//       await set(ref(database, 'companies/' + companyId), companyData)

//       toaster.success('Empresa cadastrada com sucesso')
//       return true
//     } catch (error) {
//       console.error(error)
//       toaster.danger('Falha ao cadastrar empresa')
//       return false
//     }
//   }

//   toaster.danger('Usuário não logado')
//   return false
// }

// // ============================================== GET COMPANIES LIST

// const getAdminCompanies = (callback: (companies: ICompanyData[]) => void) => {
//   const user = auth.currentUser

//   if (!user) {
//     callback([])
//     toaster.danger('Usuário não logado')
//   }

//   const companiesRef = ref(database, 'companies')
//   const companiesQuery = query(
//     companiesRef,
//     orderByChild('companyAdmin'),
//     equalTo(user && user.uid)
//   )

//   const listener = (snapshot: DataSnapshot) => {
//     try {
//       const companies: ICompanyData[] = []

//       snapshot.forEach((companySnapshot) => {
//         const companyData = companySnapshot.val()
//         companies.push(companyData)
//       })

//       callback(companies)
//     } catch (error) {
//       toaster.danger('Falha ao obter empresas cadastradas')
//     }
//   }

//   onValue(companiesQuery, listener)

//   return () => {
//     off(companiesQuery, 'value', listener)
//   }
// }

// // ============================================== GET COMPANY DATA

// const getCompanyData = (
//   companyId: string | null,
//   callback: (companies: ICompanyData | null) => void
// ) => {
//   const user = auth.currentUser

//   if (!companyId) callback(null)
//   if (!user) callback(null)

//   const companyRef = ref(database, `companies/${companyId}`)

//   const listener = (snapshot: DataSnapshot | null) => {
//     try {
//       if (snapshot && snapshot.exists()) {
//         const companyData = snapshot.val()
//         callback(companyData)
//       } else {
//         callback(null)
//       }
//     } catch (error) {
//       toaster.danger('Falha ao obter dados da empresa')
//     }
//   }

//   onValue(companyRef, listener)

//   return () => {
//     off(companyRef, 'value', listener)
//   }
// }

// // -----------------------------------------------------------------

// export { createCompany, getAdminCompanies, getCompanyData }
