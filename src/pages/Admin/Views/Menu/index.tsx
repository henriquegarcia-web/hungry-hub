import { useEffect, useState } from 'react'

import * as S from './styles'
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  CloseOutlined
} from '@ant-design/icons'

import {
  Input,
  Button,
  List,
  Space,
  Modal,
  Popconfirm,
  message,
  Empty
} from 'antd'

import { Controller, useForm } from 'react-hook-form'

const Menu = () => {
  return (
    <S.Menu>
      <S.MenuWrapper>
        <S.CreateCategoryContainer>
          <CreateCategory />
        </S.CreateCategoryContainer>
        <S.CategoriesListContainer>
          <CategoriesList />
        </S.CategoriesListContainer>
      </S.MenuWrapper>
    </S.Menu>
  )
}

export default Menu

// ========================================== CREATE CATEGORY

interface ICategory {
  id: string
  name: string
  products: any[]
}

interface ICreateCategory {}

const CreateCategory = ({}: ICreateCategory) => {
  const [categories, setCategories] = useState<ICategory[]>([])

  const [editingCategory, setEditingCategory] = useState<ICategory | null>(null)
  const [isEditing, setIsEditing] = useState(false)

  const { control, handleSubmit, watch, setValue, reset } = useForm()

  const handleCategoryCreate = (data: any) => {
    if (isEditing) {
      if (editingCategory) {
        const updatedCategory: ICategory = {
          ...editingCategory,
          name: data.categoryName
        }

        const updatedCategories = categories.map((category) =>
          category.id === updatedCategory.id ? updatedCategory : category
        )

        setCategories(updatedCategories)
        setIsEditing(false)
        setEditingCategory(null)
      }
    } else {
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
    }

    reset()
  }

  const handleCategoryEdit = (category: ICategory) => {
    setEditingCategory(category)
    setIsEditing(true)
    setValue('categoryName', category.name)
  }

  const handleCategoryDelete = (categoryId: string) => {
    const updatedCategories = categories.filter(
      (category) => category.id !== categoryId
    )
    setCategories(updatedCategories)
  }

  const handleCancelEdit = () => {
    setIsEditing(false)
    setEditingCategory(null)
    reset()
  }

  const emptyDataComponent = (
    <S.CategoriesListEmptyData>
      {Empty.PRESENTED_IMAGE_SIMPLE}
      Sem dados
    </S.CategoriesListEmptyData>
  )

  return (
    <S.CreateCategory>
      <S.CreateCategoryHeader>Categorias do cardápio</S.CreateCategoryHeader>
      <S.CreateCategoryWrapper>
        <List
          style={{ width: '100%' }}
          dataSource={categories}
          locale={{ emptyText: emptyDataComponent }}
          renderItem={(category) => (
            <List.Item
              actions={[
                <Space style={{ columnGap: '5px', rowGap: '10px' }}>
                  <Button
                    size="small"
                    icon={<EditOutlined />}
                    onClick={() => handleCategoryEdit(category)}
                  />
                  <Popconfirm
                    placement="right"
                    title={'Tem certeza de que deseja excluir esta categoria?'}
                    description={'Essa ação não pode ser desfeita.'}
                    onConfirm={() => handleCategoryDelete(category.id)}
                    okText="Sim"
                    cancelText="Não"
                  >
                    <Button size="small" icon={<DeleteOutlined />} />
                  </Popconfirm>
                </Space>
              ]}
            >
              {category.name}
            </List.Item>
          )}
        />
      </S.CreateCategoryWrapper>
      <S.CreateCategoryFooter onSubmit={handleSubmit(handleCategoryCreate)}>
        {isEditing ? (
          <>
            <Controller
              name="categoryName"
              control={control}
              rules={{ required: 'Este campo é obrigatório' }}
              render={({ field }) => (
                <Input
                  {...field}
                  defaultValue={
                    editingCategory ? editingCategory.name : 'asdasd'
                  }
                  placeholder="Nome da categoria"
                  style={{ width: 'calc(100% - 74px)' }}
                />
              )}
            />
            <Button type="primary" htmlType="submit" icon={<EditOutlined />} />
            <Button icon={<CloseOutlined />} onClick={handleCancelEdit} />
          </>
        ) : (
          <>
            <Controller
              name="categoryName"
              control={control}
              rules={{ required: 'Este campo é obrigatório' }}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Nome da categoria"
                  style={{ width: 'calc(100% - 37px)' }}
                />
              )}
            />
            <Button type="primary" htmlType="submit" icon={<PlusOutlined />} />
          </>
        )}
      </S.CreateCategoryFooter>
    </S.CreateCategory>
  )
}

// ========================================== CATEGORY LIST

interface ICategoriesList {}

const CategoriesList = ({}: ICategoriesList) => {
  return <S.CategoriesList>Listagem</S.CategoriesList>
}
