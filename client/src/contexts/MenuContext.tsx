/* eslint-disable @typescript-eslint/no-explicit-any */

import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  useCallback
} from 'react'

import { message } from 'antd'

// ===================================================================

import { ICategory, IProduct } from '@/@types/Auth'
import { handleDeleteCategory, handleDeleteProduct } from '@/firebase/menu'

import { useAdminAuth } from './AdminAuthContext'

interface MenuContextData {
  categories: ICategory[]
  createProductCategory: ICategory | null
  setCreateProductCategory: React.Dispatch<
    React.SetStateAction<ICategory | null>
  >
  editProductCategory: ICategory | null
  setEditProductCategory: React.Dispatch<React.SetStateAction<ICategory | null>>

  editingCategory: ICategory | null
  setEditingCategory: React.Dispatch<React.SetStateAction<ICategory | null>>
  isEditingCategory: boolean
  setIsEditingCategory: React.Dispatch<React.SetStateAction<boolean>>

  isCreatingProduct: boolean
  editingProduct: IProduct | null
  setEditingProduct: React.Dispatch<React.SetStateAction<IProduct | null>>
  isEditingProduct: boolean
  setIsEditingProduct: React.Dispatch<React.SetStateAction<boolean>>

  handleCategoryEdit: ({
    category,
    setValue
  }: {
    category: ICategory
    setValue: any
  }) => void
  handleCategoryDelete: (categoryId: string) => void
  handleCancelEdit: (reset: any) => void

  handleProductDelete: (categoryId: string, productId: string) => void
  handleOpenCreateProductModal: (category: ICategory) => void
  handleCloseCreateProductModal: () => void
  handleOpenEditProductModal: (product: IProduct, category: ICategory) => void
  handleCloseEditProductModal: () => void
}

export const MenuContext = createContext<MenuContextData>({} as MenuContextData)

const MenuProvider = ({ children }: { children: React.ReactNode }) => {
  const { userData } = useAdminAuth()

  // =================================================================

  const [createProductCategory, setCreateProductCategory] =
    useState<ICategory | null>(null)
  const [editProductCategory, setEditProductCategory] =
    useState<ICategory | null>(null)

  const [editingCategory, setEditingCategory] = useState<ICategory | null>(null)
  const [isEditingCategory, setIsEditingCategory] = useState<boolean>(false)

  const [isCreatingProduct, setIsCreatingProduct] = useState<boolean>(false)

  const [editingProduct, setEditingProduct] = useState<IProduct | null>(null)
  const [isEditingProduct, setIsEditingProduct] = useState<boolean>(false)

  // =================================================================

  // ------------------------------------- CATEGORIES CONTROL

  const categories: ICategory[] = useMemo(() => {
    if (!userData?.adminCompanyInfo?.companyMenu) return []

    const companyMenu: any = userData?.adminCompanyInfo?.companyMenu
    const companyArray: ICategory[] = Object.keys(companyMenu).map((key) => ({
      id: key,
      ...companyMenu[key]
    }))

    return companyArray || []
  }, [userData])

  const handleCategoryEdit = ({
    category,
    setValue
  }: {
    category: ICategory
    setValue: any
  }) => {
    setEditingCategory(category)
    setIsEditingCategory(true)
    setValue('categoryName', category.name)
  }

  const handleCategoryDelete = useCallback((categoryId: string) => {
    handleDeleteCategory(categoryId)
  }, [])

  const handleCancelEdit = (reset: any) => {
    setIsEditingCategory(false)
    setEditingCategory(null)
    reset()
  }

  // ------------------------------------- PRODUCTS CONTROL

  // ------------------- CREATE PRODUCT

  const handleOpenCreateProductModal = (category: ICategory) => {
    setIsCreatingProduct(true)
    setCreateProductCategory(category)
  }

  const handleCloseCreateProductModal = () => {
    setIsCreatingProduct(false)
    setCreateProductCategory(null)
  }

  // ------------------- EDIT PRODUCT

  const handleOpenEditProductModal = (
    product: IProduct,
    category: ICategory
  ) => {
    setIsEditingProduct(true)
    setEditingProduct(product)
    setEditProductCategory(category)
  }

  const handleCloseEditProductModal = () => {
    setIsEditingProduct(false)
    setEditingProduct(null)
    setEditProductCategory(null)
  }

  // ------------------- DELETE PRODUCT

  const handleProductDelete = useCallback(
    (categoryId: string, productId: string) => {
      handleDeleteProduct(categoryId, productId)
    },
    []
  )

  // =================================================================

  const MenuContextValues = useMemo(() => {
    return {
      categories,
      createProductCategory,
      setCreateProductCategory,
      editProductCategory,
      setEditProductCategory,

      editingCategory,
      setEditingCategory,
      isEditingCategory,
      setIsEditingCategory,

      isCreatingProduct,
      editingProduct,
      setEditingProduct,
      isEditingProduct,
      setIsEditingProduct,

      handleCategoryEdit,
      handleCategoryDelete,
      handleCancelEdit,

      handleProductDelete,
      handleOpenCreateProductModal,
      handleCloseCreateProductModal,
      handleOpenEditProductModal,
      handleCloseEditProductModal
    }
  }, [
    categories,
    createProductCategory,
    editProductCategory,
    editingCategory,
    isCreatingProduct,
    editingProduct,
    handleCategoryDelete,

    handleProductDelete,
    isEditingCategory,
    isEditingProduct
  ])

  return (
    <MenuContext.Provider value={MenuContextValues}>
      {children}
    </MenuContext.Provider>
  )
}

function useMenu(): MenuContextData {
  const context = useContext(MenuContext)

  if (!context) throw new Error('useMenu must be used within a UserProvider')

  return context
}

export { MenuProvider, useMenu }
