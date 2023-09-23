import { useEffect, useState } from 'react'

import * as S from './styles'
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  CloseOutlined
} from '@ant-design/icons'

import ImgCrop from 'antd-img-crop'
import {
  Input,
  Button,
  List,
  Space,
  Popconfirm,
  message,
  Empty,
  Modal,
  Upload,
  Form
} from 'antd'

import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface'
import type { UploadChangeParam } from 'antd/es/upload'
import {
  beforeUpload,
  getBase64,
  onPreview
} from '@/utils/functions/imageUpload'

import { Controller, useForm } from 'react-hook-form'

interface IProduct {
  productId: string
  productImage: string
  productName: string
  productPrice: string
  productDescription: string
}

interface ICategory {
  id: string
  name: string
  products: IProduct[]
}

const Menu = () => {
  const [categories, setCategories] = useState<ICategory[]>([])

  return (
    <S.Menu>
      <S.MenuWrapper>
        <S.CreateCategoryContainer>
          <CreateCategory
            categories={categories}
            setCategories={setCategories}
          />
        </S.CreateCategoryContainer>
        <S.CategoriesListContainer>
          <CategoriesList categories={categories} />
        </S.CategoriesListContainer>
      </S.MenuWrapper>
    </S.Menu>
  )
}

export default Menu

// ========================================== CREATE CATEGORY

interface ICreateCategory {
  categories: ICategory[]
  setCategories: React.Dispatch<React.SetStateAction<ICategory[]>>
}

interface ICreateCategoryForm {
  categoryName: string
}

const CreateCategory = ({ categories, setCategories }: ICreateCategory) => {
  const [editingCategory, setEditingCategory] = useState<ICategory | null>(null)
  const [isEditing, setIsEditing] = useState(false)

  const { control, handleSubmit, setValue, reset } =
    useForm<ICreateCategoryForm>()

  const handleCategoryCreate = (data: { categoryName: string }) => {
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

interface ICategoriesList {
  categories: ICategory[]
}

const CategoriesList = ({ categories }: ICategoriesList) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleOk = () => {
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  return (
    <>
      <S.CategoriesList>
        {categories.map((category: ICategory) => (
          <S.CategoryWrapper key={category.id}>
            <S.CategoryWrapperHeader>
              <S.CategoryTitle>{category.name}</S.CategoryTitle>
              <S.CategoryCounter>
                {category.products.length} produtos
              </S.CategoryCounter>
            </S.CategoryWrapperHeader>
            <S.CategoryWrapperContent>
              {category.products?.map((product: IProduct) => (
                <CategoriesProduct key={product.productId} product={product} />
              ))}
            </S.CategoryWrapperContent>
            <S.CategoryWrapperFooter>
              <Button type="primary" onClick={showModal}>
                Adicionar produto
              </Button>
            </S.CategoryWrapperFooter>
          </S.CategoryWrapper>
        ))}
      </S.CategoriesList>

      <Modal
        title="Criar produto"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancelar
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            Criar
          </Button>
        ]}
      >
        <CreateProductModal />
      </Modal>
    </>
  )
}

// ========================================== CREATE PRODUCT MODAL

interface ICreateProductModal {}

const CreateProductModal = ({}: ICreateProductModal) => {
  const [companyImage, setCompanyImage] = useState<string>()

  const handleChangeCompanyImage: UploadProps['onChange'] = (
    info: UploadChangeParam<UploadFile>
  ) => {
    getBase64(info.file.originFileObj as RcFile, (url) => {
      setCompanyImage(url)
    })
  }

  return (
    <S.CreateProductModal layout="vertical">
      <S.CreateProductModalImageForm>
        <ImgCrop rotationSlider>
          <Upload
            name="company-image"
            listType="picture-card"
            showUploadList={false}
            beforeUpload={beforeUpload}
            onChange={handleChangeCompanyImage}
            onPreview={onPreview}
            className="company_image"
          >
            {companyImage ? (
              <img
                src={companyImage}
                alt="avatar"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            )}
          </Upload>
        </ImgCrop>
      </S.CreateProductModalImageForm>
      <S.CreateProductModalMainForm>
        <Form.Item>
          <Space.Compact style={{ width: '100%', columnGap: '10px' }}>
            <Form.Item label="Nome do produto" style={{ width: '70%' }}>
              <Input
                placeholder="Ex. X-Veggie"
                style={{ borderRadius: '6px' }}
              />
            </Form.Item>
            <Form.Item label="Valor" style={{ width: '30%' }}>
              <Input placeholder="0,00" style={{ borderRadius: '6px' }} />
            </Form.Item>
          </Space.Compact>
        </Form.Item>
        <Form.Item label="Descrição do produto">
          <Input.TextArea
            placeholder="Ex. X para quem não come carne"
            rows={6}
            style={{ resize: 'none' }}
          />
        </Form.Item>
      </S.CreateProductModalMainForm>
    </S.CreateProductModal>
  )
}

// ========================================== CATEGORY PRODUCT

interface ICategoriesProduct {
  product: IProduct
}

const CategoriesProduct = ({ product }: ICategoriesProduct) => {
  return <S.CategoryProduct>PRODUTO</S.CategoryProduct>
}
