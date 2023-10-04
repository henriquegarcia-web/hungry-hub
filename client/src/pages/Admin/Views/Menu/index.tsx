import { useRef } from 'react'

import * as S from './styles'
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  CloseOutlined
} from '@ant-design/icons'

import CreateProductModal from './Modals/CreateProductModal'
import EditProductModal from './Modals/EditProductModal'
import {
  Input,
  Button,
  List,
  Space,
  Popconfirm,
  Empty,
  Modal,
  theme,
  Switch,
  Spin
} from 'antd'

const { useToken } = theme

import { Controller, useForm } from 'react-hook-form'

import { formatCurrency } from '@/utils/functions/formatCurrency'
import useClickOutside from '@/hooks/useClickOutside'

import {
  handleActiveCategory,
  handleActiveProduct,
  handleCreateCategory,
  handleEditCategory
} from '@/firebase/menu'
import { useMenu } from '@/contexts/MenuContext'

import { ICategory, IProduct } from '@/@types/Auth'

const Menu = () => {
  const {
    createProductCategory,
    editProductCategory,
    setEditProductCategory,
    isCreatingProduct,
    isEditingProduct,
    editingProduct,
    handleCloseCreateProductModal,
    handleCloseEditProductModal
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
        open={isCreatingProduct && !!createProductCategory}
        onOk={handleCloseCreateProductModal}
        onCancel={handleCloseCreateProductModal}
        footer={null}
        afterClose={() => handleCloseCreateProductModal()}
        destroyOnClose
      >
        <CreateProductModal
          createProductCategory={createProductCategory}
          handleCloseModal={handleCloseCreateProductModal}
        />
      </Modal>

      <Modal
        title="Editar produto"
        open={isEditingProduct && !!editingProduct}
        onOk={handleCloseEditProductModal}
        onCancel={handleCloseEditProductModal}
        footer={null}
        afterClose={() => handleCloseEditProductModal()}
        destroyOnClose
      >
        <EditProductModal
          editProductCategory={editProductCategory}
          setEditProductCategory={setEditProductCategory}
          editingProduct={editingProduct}
          handleCloseModal={handleCloseEditProductModal}
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
  const { token } = useToken()

  const {
    categories,
    editingCategory,
    isEditingCategory,
    handleCategoryEdit,
    handleCategoryDelete,
    handleCancelCategoryEdit
  } = useMenu()

  const { control, handleSubmit, setValue, reset } =
    useForm<ICreateCategoryForm>()

  const createCategoryRef = useRef(null)

  const handleCancelCategoryEdition = () => {
    handleCancelCategoryEdit()
    reset()
  }

  const handleSubmitCategoryForm = async (data: ICreateCategoryForm) => {
    if (isEditingCategory && editingCategory) {
      const editedCategory = {
        name: data.categoryName,
        products: []
      }

      const result = await handleEditCategory({
        categoryId: editingCategory.id,
        updatedCategoryData: editedCategory
      })

      if (result) {
        handleCancelCategoryEdition()
      }
    } else {
      const newCategory = {
        name: data.categoryName,
        products: []
      }

      const result = await handleCreateCategory(newCategory)

      if (result) {
        handleCancelCategoryEdition()
      }
    }
  }

  useClickOutside({
    active: isEditingCategory,
    containerRef: createCategoryRef,
    onClickOutside: handleCancelCategoryEdition
  })

  const emptyDataComponent = (
    <S.CategoriesListEmptyData>
      {Empty.PRESENTED_IMAGE_SIMPLE}
      Nenhuma categoria criada
    </S.CategoriesListEmptyData>
  )

  return (
    <S.CreateCategory>
      <S.CreateCategoryHeader
        style={{
          backgroundColor: token.colorBgContainer,
          color: token.colorTextHeading
        }}
      >
        Categorias do cardápio
      </S.CreateCategoryHeader>
      <S.CreateCategoryWrapper>
        <List
          style={{ width: '100%' }}
          dataSource={categories || []}
          locale={{ emptyText: emptyDataComponent }}
          loading={!categories}
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
      <S.CreateCategoryFooter
        onSubmit={handleSubmit(handleSubmitCategoryForm)}
        ref={createCategoryRef}
      >
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
              onClick={() => handleCancelCategoryEdition()}
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
  const { token } = useToken()

  const { categories, handleOpenCreateProductModal } = useMenu()

  const onChangeCategoryStatus = (checked: boolean, categoryId: string) => {
    handleActiveCategory({
      categoryId: categoryId,
      isActive: checked
    })
  }

  const emptyDataComponent = !categories ? (
    <S.ProductsListLoading>
      <Spin />
    </S.ProductsListLoading>
  ) : (
    <S.ProductsListEmptyData>
      {Empty.PRESENTED_IMAGE_SIMPLE}
      Nenhum produto criado
    </S.ProductsListEmptyData>
  )

  return (
    <S.CategoriesList>
      {categories?.length !== 0
        ? categories?.map((category: ICategory) => (
            <S.CategoryWrapper key={category.id}>
              <S.CategoryWrapperHeader
                style={{
                  backgroundColor: token.colorBgContainer
                }}
              >
                <S.CategoryTitle
                  style={{
                    color: token.colorTextHeading
                  }}
                >
                  {category.name}
                </S.CategoryTitle>
                <S.CategoryOptions>
                  <Switch
                    size="small"
                    checked={category?.active || false}
                    onChange={(checked) =>
                      onChangeCategoryStatus(checked, category.id)
                    }
                  />
                </S.CategoryOptions>
                <S.CategoryCounter
                  style={{
                    color: token.colorTextHeading
                  }}
                >
                  {category.products?.length || 0}{' '}
                  {category.products?.length === 1 ? 'produto' : 'produtos'}
                </S.CategoryCounter>
              </S.CategoryWrapperHeader>
              <S.CategoryWrapperContent>
                {category?.products?.map((product: IProduct) => (
                  <CategoriesProduct
                    key={product.productId}
                    product={product}
                    category={category}
                  />
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
          ))
        : emptyDataComponent}
    </S.CategoriesList>
  )
}

// ========================================== CATEGORY PRODUCT

interface ICategoriesProduct {
  product: IProduct
  category: ICategory
}

const CategoriesProduct = ({ product, category }: ICategoriesProduct) => {
  const { token } = useToken()

  const { handleOpenEditProductModal, handleProductDelete } = useMenu()

  const onChangeProductStatus = (
    checked: boolean,
    categoryId: string,
    productId: string
  ) => {
    handleActiveProduct({
      categoryId,
      productId,
      isActive: checked
    })
  }

  return (
    <S.CategoryProduct>
      <S.ProductImage
        empty={!product.productImage ? 1 : 0}
        style={{
          backgroundColor: token.colorBgContainer
        }}
      >
        {product.productImage ? (
          <img src={product.productImage} alt="" />
        ) : (
          Empty.PRESENTED_IMAGE_SIMPLE
        )}
      </S.ProductImage>
      <S.ProductDetails>
        <S.ProductDetailsMainInfos>
          <S.ProductDetailsTitle
            style={{
              color: token.colorTextHeading
            }}
          >
            {product.productName}
          </S.ProductDetailsTitle>
          <S.ProductDetailsDescription
            style={{
              color: token.colorTextHeading
            }}
          >
            {product.productDescription}
          </S.ProductDetailsDescription>
        </S.ProductDetailsMainInfos>
        <S.ProductDetailsPrice
          style={{
            color: token.colorTextHeading
          }}
        >
          {formatCurrency(product.productPrice)}
        </S.ProductDetailsPrice>
      </S.ProductDetails>
      <S.ProductOptions>
        <S.ProductOptionsWrapper>
          <Button
            size="small"
            icon={<EditOutlined />}
            onClick={() => handleOpenEditProductModal(product, category)}
          />
          <Popconfirm
            placement="right"
            title={'Tem certeza de que deseja excluir este produto?'}
            description={'Essa ação não pode ser desfeita.'}
            onConfirm={() =>
              handleProductDelete(category.id, product.productId)
            }
            okText="Sim"
            cancelText="Não"
          >
            <Button size="small" icon={<DeleteOutlined />} />
          </Popconfirm>
        </S.ProductOptionsWrapper>
        <S.ProductOptionsWrapper>
          <Switch
            size="small"
            checked={product?.productActive || false}
            onChange={(checked) =>
              onChangeProductStatus(checked, category.id, product.productId)
            }
          />
        </S.ProductOptionsWrapper>
      </S.ProductOptions>
    </S.CategoryProduct>
  )
}
