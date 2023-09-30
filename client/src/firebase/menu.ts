import firebase from '@/firebase/firebase'

import { message } from 'antd'

import {
  ICategory,
  ICategoryManipulate,
  IProduct,
  IProductManipulate
} from '@/@types/Auth'

// // ============================================== VERIFY IF CATEGORY EXISTS

// const verifyIfCategoryExists = async (categoryId: string): Promise<boolean> => {
//   try {
//     const user = firebase.auth().currentUser

//     if (!user) return false

//     const categoriesRef = firebase
//       .database()
//       .ref(`adminAccounts/${user.uid}/adminCompanyInfo/companyMenu`)

//     const snapshot = await categoriesRef
//       .orderByChild('id')
//       .equalTo(categoryId)
//       .once('value')

//     const categoryExists = snapshot.exists()

//     return categoryExists
//   } catch (error: any) {
//     message.open({
//       type: 'error',
//       content: 'Erro ao verificar a existência da categoria.'
//     })

//     return false
//   }
// }

// // ============================================== CREATE CATEGORY

// const handleCreateCategory = async (
//   categoryData: ICategory
// ): Promise<boolean> => {
//   try {
//     const user = firebase.auth().currentUser

//     if (!user) return false

//     const categoriesRef = firebase
//       .database()
//       .ref(`adminAccounts/${user.uid}/adminCompanyInfo/companyMenu`)

//     const categoryExists = await verifyIfCategoryExists(categoryData.id)

//     if (categoryExists) {
//       message.open({
//         type: 'warning',
//         content: 'Já existe uma categoria com este ID!'
//       })
//       return false
//     }

//     await categoriesRef.push(categoryData)

//     message.open({
//       type: 'success',
//       content: 'Categoria criada com sucesso.'
//     })

//     return true
//   } catch (error: any) {
//     message.open({
//       type: 'error',
//       content: 'Erro ao criar a categoria.'
//     })

//     return false
//   }
// }

// // ============================================== EDIT CATEGORY

// export interface IEditCategoryForm {
//   categoryId: string
//   updatedCategoryData: ICategory
// }

// const handleEditCategory = async ({
//   categoryId,
//   updatedCategoryData
// }: IEditCategoryForm): Promise<boolean> => {
//   try {
//     const user = firebase.auth().currentUser

//     if (!user) return false

//     const categoriesRef = firebase
//       .database()
//       .ref(`adminAccounts/${user.uid}/adminCompanyInfo/companyMenu`)

//     const categoryExists = await verifyIfCategoryExists(updatedCategoryData.id)

//     if (categoryExists) {
//       message.open({
//         type: 'warning',
//         content: 'Já existe uma categoria com este ID!'
//       })
//       return false
//     }

//     const categorySnapshot = await categoriesRef
//       .orderByChild('id')
//       .equalTo(categoryId)
//       .once('value')

//     if (!categorySnapshot.exists()) {
//       message.open({
//         type: 'warning',
//         content: 'Categoria não encontrada.'
//       })
//       return false
//     }

//     const categoryKey = Object.keys(categorySnapshot.val())[0]

//     await categoriesRef.child(categoryKey).update(updatedCategoryData)

//     message.open({
//       type: 'success',
//       content: 'Categoria editada com sucesso.'
//     })

//     return true
//   } catch (error: any) {
//     message.open({
//       type: 'error',
//       content: 'Erro ao editar a categoria.'
//     })

//     return false
//   }
// }

// // ============================================== DELETE CATEGORY

// const handleDeleteCategory = async (categoryId: string): Promise<boolean> => {
//   try {
//     const user = firebase.auth().currentUser

//     if (!user) return false

//     const categoriesRef = firebase
//       .database()
//       .ref(`adminAccounts/${user.uid}/adminCompanyInfo/companyMenu`)

//     const snapshot = await categoriesRef
//       .orderByChild('id')
//       .equalTo(categoryId)
//       .once('value')

//     if (!snapshot.exists()) {
//       message.open({
//         type: 'error',
//         content: 'A categoria que você está tentando excluir não existe.'
//       })
//       return false
//     }

//     const categoryKey = Object.keys(snapshot.val())[0]

//     await categoriesRef.child(categoryKey).remove()

//     message.open({
//       type: 'success',
//       content: 'Categoria excluída com sucesso.'
//     })

//     return true
//   } catch (error: any) {
//     message.open({
//       type: 'error',
//       content: 'Erro ao excluir a categoria.'
//     })

//     return false
//   }
// }

// // ============================================== VERIFY IF PRODUCT EXISTS

// const verifyIfProductExists = async (
//   categoryId: string,
//   productId: string
// ): Promise<boolean> => {
//   try {
//     const user = firebase.auth().currentUser

//     if (!user) return false

//     const categoriesRef = firebase
//       .database()
//       .ref(`adminAccounts/${user.uid}/adminCompanyInfo/companyMenu`)

//     const categoriesSnapshot = await categoriesRef
//       .orderByChild('id')
//       .equalTo(categoryId)
//       .once('value')

//     const categories = categoriesSnapshot.val()

//     const categoryKey = Object.keys(categories).find(
//       (key) => categories[key].id === categoryId
//     )

//     if (!categoryKey) {
//       message.open({
//         type: 'error',
//         content: 'Categoria não encontrada.'
//       })
//       return false
//     }

//     const productsRef = firebase
//       .database()
//       .ref(
//         `adminAccounts/${user.uid}/adminCompanyInfo/companyMenu/${categoryKey}/products`
//       )

//     const productSnapshot = await productsRef
//       .orderByChild('productId')
//       .equalTo(productId)
//       .once('value')

//     const isCurrentUserProduct = productSnapshot.val() === productId

//     const productExists = productSnapshot.exists()

//     return productExists && isCurrentUserProduct
//   } catch (error: any) {
//     message.open({
//       type: 'error',
//       content: 'Erro ao verificar a existência do produto.'
//     })
//     return false
//   }
// }

// // ============================================== CREATE PRODUCT

// const handleCreateProduct = async (
//   categoryId: string,
//   productData: IProduct
// ): Promise<boolean> => {
//   try {
//     const user = firebase.auth().currentUser

//     if (!user) return false

//     const productExists = await verifyIfProductExists(
//       categoryId,
//       productData.productId
//     )

//     if (productExists) {
//       message.open({
//         type: 'warning',
//         content: 'Já existe um produto com este ID!'
//       })
//       return false
//     }

//     const categoriesRef = firebase
//       .database()
//       .ref(`adminAccounts/${user.uid}/adminCompanyInfo/companyMenu`)

//     const categoriesSnapshot = await categoriesRef
//       .orderByChild('id')
//       .equalTo(categoryId)
//       .once('value')

//     const categories = categoriesSnapshot.val()

//     const categoryKey = Object.keys(categories).find(
//       (key) => categories[key].id === categoryId
//     )

//     if (!categoryKey) {
//       message.open({
//         type: 'error',
//         content: 'Categoria não encontrada.'
//       })
//       return false
//     }

//     const productsRef = firebase
//       .database()
//       .ref(
//         `adminAccounts/${user.uid}/adminCompanyInfo/companyMenu/${categoryKey}/products`
//       )

//     const productsSnapshot = await productsRef.once('value')
//     const currentProducts = productsSnapshot.val() || []

//     currentProducts.push(productData)

//     await productsRef.set(currentProducts)

//     message.open({
//       type: 'success',
//       content: 'Produto criado com sucesso.'
//     })

//     return true
//   } catch (error: any) {
//     message.open({
//       type: 'error',
//       content: 'Erro ao criar o produto.'
//     })

//     return false
//   }
// }

// // ============================================== EDIT PRODUCT

// const handleEditProduct = async (
//   categoryId: string,
//   productId: string,
//   updatedProductData: IProduct
// ): Promise<boolean> => {
//   try {
//     const user = firebase.auth().currentUser

//     if (!user) return false

//     const productExists = await verifyIfProductExists(categoryId, productId)

//     if (productExists) {
//       message.open({
//         type: 'warning',
//         content: 'Já existe um produto com este ID!'
//       })
//       return false
//     }

//     const categoriesRef = firebase
//       .database()
//       .ref(`adminAccounts/${user.uid}/adminCompanyInfo/companyMenu`)

//     const categoriesSnapshot = await categoriesRef
//       .orderByChild('id')
//       .equalTo(categoryId)
//       .once('value')

//     const categories = categoriesSnapshot.val()

//     const categoryKey = Object.keys(categories).find(
//       (key) => categories[key].id === categoryId
//     )

//     if (!categoryKey) {
//       message.open({
//         type: 'error',
//         content: 'Categoria não encontrada.'
//       })
//       return false
//     }

//     const productsRef = firebase
//       .database()
//       .ref(
//         `adminAccounts/${user.uid}/adminCompanyInfo/companyMenu/${categoryKey}/products`
//       )

//     const productSnapshot = await productsRef
//       .orderByChild('productId')
//       .equalTo(productId)
//       .once('value')

//     const productKey = Object.keys(productSnapshot.val())[0]

//     await productsRef.child(productKey).update(updatedProductData)

//     message.open({
//       type: 'success',
//       content: 'Produto editado com sucesso.'
//     })

//     return true
//   } catch (error: any) {
//     message.open({
//       type: 'error',
//       content: 'Erro ao editar o produto.'
//     })
//     return false
//   }
// }

// // ============================================== DELETE PRODUCT

// const handleDeleteProduct = async (
//   categoryId: string,
//   productId: string
// ): Promise<boolean> => {
//   try {
//     const user = firebase.auth().currentUser

//     if (!user) return false

//     const categoriesRef = firebase
//       .database()
//       .ref(`adminAccounts/${user.uid}/adminCompanyInfo/companyMenu`)

//     const categoriesSnapshot = await categoriesRef.once('value')

//     const categories = categoriesSnapshot.val()

//     const categoryKey = Object.keys(categories).find(
//       (key) => categories[key].id === categoryId
//     )

//     const productsRef = firebase
//       .database()
//       .ref(
//         `adminAccounts/${user.uid}/adminCompanyInfo/companyMenu/${categoryKey}/products`
//       )

//     const productsSnapshot = await productsRef
//       .orderByChild('productId')
//       .equalTo(productId)
//       .once('value')

//     if (!productsSnapshot.exists()) {
//       message.open({
//         type: 'error',
//         content: 'O produto que você está tentando excluir não existe.'
//       })
//       return false
//     }

//     const productKey = Object.keys(productsSnapshot.val())[0]

//     await productsRef.child(productKey).remove()

//     message.open({
//       type: 'success',
//       content: 'Produto excluído com sucesso.'
//     })

//     return true
//   } catch (error: any) {
//     message.open({
//       type: 'error',
//       content: 'Erro ao excluir o produto.'
//     })

//     return false
//   }
// }

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
      ...categoryData
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
      ...productData
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
      content: 'Erro ao criar o produto.'
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

export {
  handleCreateCategory,
  handleEditCategory,
  handleDeleteCategory,
  handleCreateProduct,
  handleEditProduct,
  handleDeleteProduct
}
