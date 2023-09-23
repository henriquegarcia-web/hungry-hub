import * as S from './styles'
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  CloseOutlined
} from '@ant-design/icons'

import CreateProductModal from './Modals/CreateProductModal'
import {
  Input,
  Button,
  List,
  Space,
  Popconfirm,
  message,
  Empty,
  Modal
} from 'antd'

import { Controller, useForm } from 'react-hook-form'

import { formatCurrency } from '@/utils/functions/formatCurrency'

import { useMenu } from '@/contexts/MenuContext'

import { ICategory, IProduct } from './@types'

const Menu = () => {
  const {
    categories,
    setCategories,
    createProductCategory,
    setCreateProductCategory
  } = useMenu()

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

      <Modal
        title="Criar produto"
        open={createProductCategory !== null}
        onOk={() => setCreateProductCategory(null)}
        onCancel={() => setCreateProductCategory(null)}
        footer={null}
      >
        <CreateProductModal
          categories={categories}
          setCategories={setCategories}
          createProductCategory={createProductCategory}
          setCreateProductCategory={setCreateProductCategory}
        />
      </Modal>
    </S.Menu>
  )
}

export default Menu

// ========================================== CREATE CATEGORY

interface ICreateCategory {}

interface ICreateCategoryForm {
  categoryName: string
}

const CreateCategory = ({}: ICreateCategory) => {
  const {
    categories,
    editingCategory,
    isEditingCategory,
    handleEditCategory,
    handleCreateCategory,
    handleCategoryEdit,
    handleCategoryDelete,
    handleCancelEdit
  } = useMenu()

  const { control, handleSubmit, setValue, reset } =
    useForm<ICreateCategoryForm>()

  const handleSubmitCategoryForm = (data: ICreateCategoryForm) => {
    if (isEditingCategory) {
      handleEditCategory(data)
    } else {
      handleCreateCategory(data)
    }

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
                    onClick={() => handleCategoryEdit({ category, setValue })}
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
      <S.CreateCategoryFooter onSubmit={handleSubmit(handleSubmitCategoryForm)}>
        {isEditingCategory ? (
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
            <Button
              icon={<CloseOutlined />}
              onClick={() => handleCancelEdit({ reset })}
            />
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
  const { categories, handleOpenCreateProductModal } = useMenu()

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
              onClick={() => handleOpenCreateProductModal(category)}
            >
              Adicionar produto
            </Button>
          </S.CategoryWrapperFooter>
        </S.CategoryWrapper>
      ))}
    </S.CategoriesList>
  )
}

// ========================================== CATEGORY PRODUCT

interface ICategoriesProduct {
  product: IProduct
}

const CategoriesProduct = ({ product }: ICategoriesProduct) => {
  const {
    editingProduct,
    setEditingProduct,
    isEditingProduct,
    setIsEditingProduct
  } = useMenu()

  const handleProductEdit = (product: IProduct) => {}

  const handleProductDelete = (productId: string) => {}

  return (
    <S.CategoryProduct>
      <S.ProductImage>
        {product.productImage ? (
          <img src={product.productImage} alt="" />
        ) : (
          Empty.PRESENTED_IMAGE_SIMPLE
        )}
      </S.ProductImage>
      <S.ProductDetails>
        <S.ProductDetailsMainInfos>
          <S.ProductDetailsTitle>{product.productName}</S.ProductDetailsTitle>
          <S.ProductDetailsDescription>
            {product.productDescription}
          </S.ProductDetailsDescription>
        </S.ProductDetailsMainInfos>
        <S.ProductDetailsPrice>
          {formatCurrency(product.productPrice)}
        </S.ProductDetailsPrice>
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
