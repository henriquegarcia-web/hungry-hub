import firebase from '@/firebase/firebase'

import { message } from 'antd'

import {
  ICategoryManipulate,
  IProduct,
  IProductManipulate
} from '@/@types/Auth'

// ============================================== CREATE CATEGORY

const handleCreateCategory = async (
  categoryData: ICategoryManipulate
): Promise<boolean> => {
  try {
    const user = firebase.auth().currentUser

    if (!user) return false

    const categoriesRef = firebase
      .database()
      .ref(`adminAccounts/${user.uid}/adminCompanyInfo/companyMenu`)

    const newCategoryRef = categoriesRef.push()

    const categoryToSave = {
      id: newCategoryRef.key,
      ...categoryData,
      active: true
    }

    await newCategoryRef.set(categoryToSave)

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
  updatedCategoryData: ICategoryManipulate
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

    const categorySnapshot = await categoriesRef
      .orderByKey()
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

    const categorySnapshot = await categoriesRef
      .orderByKey()
      .equalTo(categoryId)
      .once('value')

    if (!categorySnapshot.exists()) {
      message.open({
        type: 'error',
        content: 'A categoria que você está tentando excluir não existe.'
      })
      return false
    }

    const categoryKey = Object.keys(categorySnapshot.val())[0]

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

// ============================================== ACTIVE CATEGORY

export interface IActiveCategoryForm {
  categoryId: string
  isActive: boolean
}

const handleActiveCategory = async ({
  categoryId,
  isActive
}: IActiveCategoryForm): Promise<boolean> => {
  try {
    const user = firebase.auth().currentUser

    if (!user) return false

    const categoriesRef = firebase
      .database()
      .ref(`adminAccounts/${user.uid}/adminCompanyInfo/companyMenu`)

    const categorySnapshot = await categoriesRef
      .orderByKey()
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
    const categoryRef = categoriesRef.child(`${categoryKey}/active`)

    await categoryRef.set(isActive)

    message.open({
      type: `${isActive ? 'success' : 'warning'}`,
      content: `A categoria agora está ${isActive ? 'ativa' : 'inativa'}.`
    })

    return true
  } catch (error) {
    console.error(error)

    message.open({
      type: 'error',
      content: 'Falha ao modificar status da categoria'
    })

    return false
  }
}

// ============================================== CREATE PRODUCT

const handleCreateProduct = async (
  categoryId: string,
  productData: IProductManipulate
): Promise<boolean> => {
  try {
    const user = firebase.auth().currentUser

    if (!user) return false

    const categoriesRef = firebase
      .database()
      .ref(`adminAccounts/${user.uid}/adminCompanyInfo/companyMenu`)

    const categorySnapshot = await categoriesRef
      .orderByKey()
      .equalTo(categoryId)
      .once('value')

    if (!categorySnapshot.exists()) {
      message.open({
        type: 'error',
        content: 'Categoria não encontrada.'
      })
      return false
    }

    const categoryKey = Object.keys(categorySnapshot.val())[0]
    const productsRef = categoriesRef.child(`${categoryKey}/products`)

    const productsSnapshot = await productsRef.once('value')
    const currentProducts = productsSnapshot.val() || []

    const newProductRef = productsRef.push()
    const productId = newProductRef.key

    const newProduct = {
      productId,
      productName: productData.productName,
      productPrice: productData.productPrice,
      productDescription: productData.productDescription,
      productImage: productData.productImage,
      productActive: true
    }

    currentProducts.push(newProduct)

    await productsRef.set(currentProducts)

    message.open({
      type: 'success',
      content: 'Produto criado com sucesso.'
    })

    return true
  } catch (error: any) {
    message.open({
      type: 'error',
      content: 'Falha ao criar o produto.'
    })

    return false
  }
}

// ============================================== EDIT PRODUCT

const handleEditProduct = async (
  categoryId: string,
  productId: string,
  updatedProductData: IProductManipulate
): Promise<boolean> => {
  try {
    const user = firebase.auth().currentUser

    if (!user) return false

    const categoriesRef = firebase
      .database()
      .ref(`adminAccounts/${user.uid}/adminCompanyInfo/companyMenu`)

    const categorySnapshot = await categoriesRef.child(categoryId).once('value')

    if (!categorySnapshot.exists()) {
      message.open({
        type: 'error',
        content: 'Categoria não encontrada.'
      })
      return false
    }

    const category = categorySnapshot.val()
    const products = category.products || []

    const productIndex = products.findIndex(
      (product: IProduct) => product.productId === productId
    )

    if (productIndex === -1) {
      message.open({
        type: 'error',
        content: 'O produto que você está tentando editar não existe.'
      })
      return false
    }

    products[productIndex] = { productId, ...updatedProductData }

    await categoriesRef.child(categoryId).update({ products })

    message.open({
      type: 'success',
      content: 'Produto editado com sucesso.'
    })

    return true
  } catch (error: any) {
    message.open({
      type: 'error',
      content: 'Erro ao editar o produto.'
    })

    return false
  }
}

// ============================================== DELETE PRODUCT

const handleDeleteProduct = async (
  categoryId: string,
  productId: string
): Promise<boolean> => {
  try {
    const user = firebase.auth().currentUser

    if (!user) return false

    const categoriesRef = firebase
      .database()
      .ref(`adminAccounts/${user.uid}/adminCompanyInfo/companyMenu`)

    const categorySnapshot = await categoriesRef.child(categoryId).once('value')

    if (!categorySnapshot.exists()) {
      message.open({
        type: 'error',
        content: 'Categoria não encontrada.'
      })
      return false
    }

    const category = categorySnapshot.val()
    const products = category.products || []

    const productIndex = products.findIndex(
      (product: IProduct) => product.productId === productId
    )

    if (productIndex === -1) {
      message.open({
        type: 'error',
        content: 'O produto que você está tentando excluir não existe.'
      })
      return false
    }

    products.splice(productIndex, 1)

    await categoriesRef.child(categoryId).update({ products })

    message.open({
      type: 'success',
      content: 'Produto excluído com sucesso.'
    })

    return true
  } catch (error: any) {
    message.open({
      type: 'error',
      content: 'Erro ao excluir o produto.'
    })

    return false
  }
}

// ============================================== ACTIVE CATEGORY

export interface IActiveProductForm {
  categoryId: string
  productId: string
  isActive: boolean
}

const handleActiveProduct = async ({
  categoryId,
  productId,
  isActive
}: IActiveProductForm): Promise<boolean> => {
  try {
    const user = firebase.auth().currentUser

    if (!user) return false

    const categoriesRef = firebase
      .database()
      .ref(`adminAccounts/${user.uid}/adminCompanyInfo/companyMenu`)

    const categorySnapshot = await categoriesRef.child(categoryId).once('value')

    if (!categorySnapshot.exists()) {
      message.open({
        type: 'warning',
        content: 'Categoria não encontrada.'
      })
      return false
    }

    const category = categorySnapshot.val()
    const products = category.products || []

    const productIndex = products.findIndex(
      (product: IProduct) => product.productId === productId
    )

    if (productIndex === -1) {
      message.open({
        type: 'error',
        content: 'O produto que você está tentando editar não existe.'
      })
      return false
    }

    products[productIndex].productActive = isActive

    await categoriesRef.child(categoryId).update({ products })

    message.open({
      type: `${isActive ? 'success' : 'warning'}`,
      content: `O produto agora está ${isActive ? 'ativo' : 'inativo'}.`
    })

    return true
  } catch (error) {
    console.error(error)

    message.open({
      type: 'error',
      content: 'Falha ao modificar status do produto'
    })

    return false
  }
}

export {
  handleCreateCategory,
  handleEditCategory,
  handleDeleteCategory,
  handleActiveCategory,
  handleCreateProduct,
  handleEditProduct,
  handleDeleteProduct,
  handleActiveProduct
}
