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
import { formatToCurrency } from '@/utils/functions/formatCurrency'

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
  const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(
    null
  )

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
          <CategoriesList
            categories={categories}
            setSelectedCategory={setSelectedCategory}
          />
        </S.CategoriesListContainer>
      </S.MenuWrapper>

      <Modal
        title="Criar produto"
        open={selectedCategory !== null}
        onOk={() => setSelectedCategory(null)}
        onCancel={() => setSelectedCategory(null)}
        footer={null}
      >
        <CreateProductModal
          categories={categories}
          setCategories={setCategories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </Modal>
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
  setSelectedCategory: any
}

const CategoriesList = ({
  categories,
  setSelectedCategory
}: ICategoriesList) => {
  const handleAddProductClick = (category: ICategory) => {
    setSelectedCategory(category)
  }

  return (
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
            <Button
              type="primary"
              onClick={() => handleAddProductClick(category)}
            >
              Adicionar produto
            </Button>
          </S.CategoryWrapperFooter>
        </S.CategoryWrapper>
      ))}
    </S.CategoriesList>
  )
}

// ========================================== CREATE PRODUCT MODAL

interface ICreateProductModal {
  categories: ICategory[]
  setCategories: any
  selectedCategory: ICategory | null
  setSelectedCategory: any
}

interface ICreateProductForm {
  productImage: string
  productName: string
  productPrice: string
  productDescription: string
}

const CreateProductModal = ({
  categories,
  setCategories,
  selectedCategory,
  setSelectedCategory
}: ICreateProductModal) => {
  const { control, handleSubmit, setValue, reset, formState } =
    useForm<ICreateProductForm>()

  const { isValid } = formState

  const [companyImage, setCompanyImage] = useState<string>('')

  const handleCreateProduct = (data: ICreateProductForm) => {
    if (selectedCategory) {
      const productId = data.productName
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '')

      const newProduct: IProduct = {
        productId: productId,
        productImage: data.productImage,
        productName: data.productName,
        productPrice: data.productPrice,
        productDescription: data.productDescription
      }

      const updatedCategory = {
        ...selectedCategory,
        products: [...selectedCategory.products, newProduct]
      }

      const updatedCategories = categories.map((category) =>
        category.id === selectedCategory.id ? updatedCategory : category
      )

      setCategories(updatedCategories)
      setSelectedCategory(null)
      reset()
      setCompanyImage('')
    }
  }

  const handleChangeCompanyImage: UploadProps['onChange'] = (
    info: UploadChangeParam<UploadFile>
  ) => {
    getBase64(info.file.originFileObj as RcFile, (url) => {
      setCompanyImage(url)
    })
  }

  const handleCancel = () => {
    setSelectedCategory(null)
    reset()
    setCompanyImage('')
  }

  const formIsValid = isValid

  return (
    <S.CreateProductModal
      layout="vertical"
      onFinish={handleSubmit(handleCreateProduct)}
    >
      <S.CreateProductModalFormContent>
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
              <Form.Item label="Nome do produto" style={{ width: '65%' }}>
                <Controller
                  name="productName"
                  control={control}
                  rules={{ required: 'Este campo é obrigatório' }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Ex. X-Veggie"
                      style={{ borderRadius: '6px' }}
                    />
                  )}
                />
              </Form.Item>
              <Form.Item label="Valor" style={{ width: '35%' }}>
                <Controller
                  name="productPrice"
                  control={control}
                  rules={{ required: 'Este campo é obrigatório' }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="0,00"
                      addonBefore="R$"
                      onChange={(e) => {
                        const { value } = e.target
                        const formattedValue = formatToCurrency(value)
                        field.onChange(formattedValue)
                      }}
                      style={{ borderRadius: '6px' }}
                    />
                  )}
                />
              </Form.Item>
            </Space.Compact>
          </Form.Item>
          <Form.Item label="Descrição do produto">
            <Controller
              name="productDescription"
              control={control}
              rules={{ required: 'Este campo é obrigatório' }}
              render={({ field }) => (
                <Input.TextArea
                  {...field}
                  placeholder="Ex. X para quem não come carne"
                  rows={6}
                  style={{ resize: 'none' }}
                />
              )}
            />
          </Form.Item>
        </S.CreateProductModalMainForm>
      </S.CreateProductModalFormContent>
      <S.CreateProductModalFormFooter>
        <Button key="back" onClick={handleCancel}>
          Cancelar
        </Button>
        <Button
          key="submit"
          type="primary"
          htmlType="submit"
          disabled={!formIsValid}
        >
          Criar
        </Button>
      </S.CreateProductModalFormFooter>
    </S.CreateProductModal>
  )
}

// ========================================== CATEGORY PRODUCT

interface ICategoriesProduct {
  product: IProduct
}

const CategoriesProduct = ({ product }: ICategoriesProduct) => {
  const handleProductEdit = (product: IProduct) => {
    // setEditingCategory(category)
    // setIsEditing(true)
    // setValue('categoryName', category.name)
  }

  const handleProductDelete = (productId: string) => {
    // const updatedCategories = categories.filter(
    //   (category) => category.id !== categoryId
    // )
    // setCategories(updatedCategories)
  }

  return (
    <S.CategoryProduct>
      <S.ProductImage>
        <img src={product.productImage} alt="" />
      </S.ProductImage>
      <S.ProductDetails>
        <S.ProductDetailsMainInfos>
          <S.ProductDetailsTitle>{product.productName}</S.ProductDetailsTitle>
          <S.ProductDetailsDescription>
            {product.productDescription}
          </S.ProductDetailsDescription>
        </S.ProductDetailsMainInfos>
        <S.ProductDetailsPrice>{product.productPrice}</S.ProductDetailsPrice>
      </S.ProductDetails>
      <S.ProductOptions>
        <Button
          size="small"
          icon={<EditOutlined />}
          onClick={() => handleProductEdit(product)}
        />
        <Popconfirm
          placement="right"
          title={'Tem certeza de que deseja excluir esta categoria?'}
          description={'Essa ação não pode ser desfeita.'}
          onConfirm={() => handleProductDelete(product.productId)}
          okText="Sim"
          cancelText="Não"
        >
          <Button size="small" icon={<DeleteOutlined />} />
        </Popconfirm>
      </S.ProductOptions>
    </S.CategoryProduct>
  )
}
