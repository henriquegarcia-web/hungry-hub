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

import { ICategory, IProduct } from '@/pages/Admin/Views/Menu/@types'

interface MenuContextData {
  categories: ICategory[]
  setCategories: React.Dispatch<React.SetStateAction<ICategory[]>>
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

  editingProduct: IProduct | null
  setEditingProduct: React.Dispatch<React.SetStateAction<IProduct | null>>
  isEditingProduct: boolean
  setIsEditingProduct: React.Dispatch<React.SetStateAction<boolean>>

  handleEditCategory: (data: ICreateCategoryForm) => void
  handleCreateCategory: (data: ICreateCategoryForm) => void
  handleCategoryEdit: ({
    category,
    setValue
  }: {
    category: ICategory
    setValue: any
  }) => void
  handleCategoryDelete: (categoryId: string) => void
  handleCancelEdit: ({ reset }: { reset: any }) => void

  handleOpenCreateProductModal: (category: ICategory) => void
  handleOpenEditProductModal: (product: IProduct, category: ICategory) => void
  handleCloseEditProductModal: () => void
}

interface ICreateCategoryForm {
  categoryName: string
}

export const MenuContext = createContext<MenuContextData>({} as MenuContextData)

const MenuProvider = ({ children }: { children: React.ReactNode }) => {
  // =================================================================

  const [categories, setCategories] = useState<ICategory[]>([])
  const [createProductCategory, setCreateProductCategory] =
    useState<ICategory | null>(null)
  const [editProductCategory, setEditProductCategory] =
    useState<ICategory | null>(null)

  const [editingCategory, setEditingCategory] = useState<ICategory | null>(null)
  const [isEditingCategory, setIsEditingCategory] = useState<boolean>(false)

  const [editingProduct, setEditingProduct] = useState<IProduct | null>(null)
  const [isEditingProduct, setIsEditingProduct] = useState<boolean>(false)

  // =================================================================

  // ------------------------------------- CATEGORIES CONTROL

  const handleEditCategory = useCallback(
    (data: ICreateCategoryForm) => {
      if (!editingCategory) return

      const updatedCategory: ICategory = {
        ...editingCategory,
        name: data.categoryName
      }

      const updatedCategories = categories.map((category) =>
        category.id === updatedCategory.id ? updatedCategory : category
      )

      setCategories(updatedCategories)
      setIsEditingCategory(false)
      setEditingCategory(null)
    },
    [categories, editingCategory]
  )

  const handleCreateCategory = useCallback(
    (data: ICreateCategoryForm) => {
      if (data.categoryName.trim() === '') {
        return
      }

      const isCategoryExists = categories.some(
        (category) => category.name === data.categoryName
      )

      if (isCategoryExists) {
        message.open({
          type: 'warning',
          content: 'Já existe uma categoria com esse nome!'
        })
        return
      }

      const id = data.categoryName
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '')

      const newCategory: ICategory = {
        id,
        name: data.categoryName,
        products: []
      }

      setCategories([...categories, newCategory])
    },
    [categories]
  )

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

  const handleCategoryDelete = useCallback(
    (categoryId: string) => {
      const updatedCategories = categories.filter(
        (category) => category.id !== categoryId
      )
      setCategories(updatedCategories)
    },
    [categories]
  )

  const handleCancelEdit = ({ reset }: { reset: any }) => {
    setIsEditingCategory(false)
    setEditingCategory(null)
    reset()
  }

  // ------------------------------------- PRODUCTS CONTROL

  const handleOpenCreateProductModal = (category: ICategory) => {
    setCreateProductCategory(category)
  }

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

  // =================================================================

  const MenuContextValues = useMemo(() => {
    return {
      categories,
      setCategories,
      createProductCategory,
      setCreateProductCategory,
      editProductCategory,
      setEditProductCategory,

      editingCategory,
      setEditingCategory,
      isEditingCategory,
      setIsEditingCategory,

      editingProduct,
      setEditingProduct,
      isEditingProduct,
      setIsEditingProduct,

      handleEditCategory,
      handleCreateCategory,
      handleCategoryEdit,
      handleCategoryDelete,
      handleCancelEdit,

      handleOpenCreateProductModal,
      handleOpenEditProductModal,
      handleCloseEditProductModal
    }
  }, [
    categories,
    createProductCategory,
    editProductCategory,
    editingCategory,
    editingProduct,
    handleCategoryDelete,
    handleCreateCategory,
    handleEditCategory,
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
