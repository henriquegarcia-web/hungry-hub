import firebase from '@/firebase/firebase'

import { message } from 'antd'

import { ICategory } from '@/pages/Admin/Views/Menu/@types'

// ============================================== VERIFY IF CATEGORY EXISTS

const verifyIfCategoryExists = async (categoryId: string): Promise<boolean> => {
  try {
    const user = firebase.auth().currentUser

    if (!user) return false

    const categoriesRef = firebase
      .database()
      .ref(`adminAccounts/${user.uid}/adminCompanyInfo/companyMenu`)

    const snapshot = await categoriesRef
      .orderByChild('id')
      .equalTo(categoryId)
      .once('value')

    const categoryExists = snapshot.exists()

    return categoryExists
  } catch (error: any) {
    message.open({
      type: 'error',
      content: 'Erro ao verificar a existência da categoria.'
    })

    return false
  }
}

// ============================================== CREATE CATEGORY

const handleCreateCategory = async (
  categoryData: ICategory
): Promise<boolean> => {
  try {
    const user = firebase.auth().currentUser

    if (!user) return false

    const categoriesRef = firebase
      .database()
      .ref(`adminAccounts/${user.uid}/adminCompanyInfo/companyMenu`)

    const categoryExists = await verifyIfCategoryExists(categoryData.id)

    if (categoryExists) {
      message.open({
        type: 'warning',
        content: 'Já existe uma categoria com este ID!'
      })
      return false
    }

    await categoriesRef.push(categoryData)

    message.open({
      type: 'success',
      content: 'Categoria criada com sucesso.'
    })

    return true
  } catch (error: any) {
    message.open({
      type: 'error',
      content: 'Erro ao criar a categoria.'
    })

    return false
  }
}

// ============================================== EDIT CATEGORY

export interface IEditCategoryForm {
  categoryId: string
  updatedCategoryData: ICategory
}

const handleEditCategory = async ({
  categoryId,
  updatedCategoryData
}: IEditCategoryForm): Promise<boolean> => {
  try {
    const user = firebase.auth().currentUser

    if (!user) return false

    const categoriesRef = firebase
      .database()
      .ref(`adminAccounts/${user.uid}/adminCompanyInfo/companyMenu`)

    const categoryExists = await verifyIfCategoryExists(updatedCategoryData.id)

    if (categoryExists) {
      message.open({
        type: 'warning',
        content: 'Já existe uma categoria com este ID!'
      })
      return false
    }

    const categorySnapshot = await categoriesRef
      .orderByChild('id')
      .equalTo(categoryId)
      .once('value')

    if (!categorySnapshot.exists()) {
      message.open({
        type: 'warning',
        content: 'Categoria não encontrada.'
      })
      return false
    }

    const categoryKey = Object.keys(categorySnapshot.val())[0]

    await categoriesRef.child(categoryKey).update(updatedCategoryData)

    message.open({
      type: 'success',
      content: 'Categoria editada com sucesso.'
    })

    return true
  } catch (error: any) {
    message.open({
      type: 'error',
      content: 'Erro ao editar a categoria.'
    })

    return false
  }
}

// ============================================== DELETE CATEGORY

const handleDeleteCategory = async (categoryId: string): Promise<boolean> => {
  try {
    const user = firebase.auth().currentUser

    if (!user) return false

    const categoriesRef = firebase
      .database()
      .ref(`adminAccounts/${user.uid}/adminCompanyInfo/companyMenu`)

    const snapshot = await categoriesRef
      .orderByChild('id')
      .equalTo(categoryId)
      .once('value')

    if (!snapshot.exists()) {
      message.open({
        type: 'error',
        content: 'A categoria que você está tentando excluir não existe.'
      })
      return false
    }

    const categoryKey = Object.keys(snapshot.val())[0]

    await categoriesRef.child(categoryKey).remove()

    message.open({
      type: 'success',
      content: 'Categoria excluída com sucesso.'
    })

    return true
  } catch (error: any) {
    message.open({
      type: 'error',
      content: 'Erro ao excluir a categoria.'
    })

    return false
  }
}

const handleGetCategoriesData = (
  callback: (categoriesData: ICategory | null) => void
) => {
  const user = firebase.auth().currentUser

  if (!user) {
    callback(null)
    return
  }

  const categoriesRef = firebase
    .database()
    .ref(`adminAccounts/${user.uid}/adminCompanyInfo/companyMenu`)

  const listener = (snapshot: any) => {
    try {
      if (snapshot) {
        const categoriesData = snapshot.val()
        callback(categoriesData)
      } else {
        callback(null)
      }
    } catch (error) {
      message.open({
        type: 'error',
        content: 'Failed to fetch category data'
      })
    }
  }

  const offCallback = () => {
    categoriesRef.off('value', listener)
  }

  categoriesRef.on('value', listener)

  return offCallback
}

// ============================================== VERIFY IF PRODUCT EXISTS

const verifyIfProductExists = async (categoryId: string): Promise<boolean> => {
  return true
}

// ============================================== CREATE PRODUCT

const handleCreateProduct = async (): Promise<boolean> => {
  return true
}

// ============================================== EDIT PRODUCT

const handleEditProduct = async (): Promise<boolean> => {
  return true
}

export {
  verifyIfCategoryExists,
  handleCreateCategory,
  handleEditCategory,
  handleDeleteCategory,
  handleGetCategoriesData,
  verifyIfProductExists,
  handleCreateProduct,
  handleEditProduct
}
