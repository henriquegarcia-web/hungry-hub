import { useEffect, useState } from 'react'

import * as S from './styles'
import { PlusOutlined } from '@ant-design/icons'

import { Input, Button, Space, Upload, Form } from 'antd'
import ImgCrop from 'antd-img-crop'
import {
  beforeUpload,
  getBase64,
  onPreview
} from '@/utils/functions/imageUpload'

import { Controller, useForm } from 'react-hook-form'

import {
  formatCurrencyToEdit,
  formatCurrency,
  formatToCurrency,
  formatByCurrency,
  formatStringToCurrency
} from '@/utils/functions/formatCurrency'

import { ICategory, IProduct } from '../../@types'
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface'
import type { UploadChangeParam } from 'antd/es/upload'

interface IEditProductModal {
  categories: ICategory[]
  setCategories: React.Dispatch<React.SetStateAction<ICategory[]>>
  editProductCategory: ICategory | null
  setEditProductCategory: React.Dispatch<React.SetStateAction<ICategory | null>>
  editingProduct: IProduct | null
  handleCloseModal: () => void
}

interface IEditProductForm {
  productImage: string
  productName: string
  productPrice: string
  productDescription: string
}

const EditProductModal = ({
  categories,
  setCategories,
  editProductCategory,
  editingProduct,
  handleCloseModal
}: IEditProductModal) => {
  const { control, handleSubmit, setValue, reset, formState } =
    useForm<IEditProductForm>()

  const { isValid } = formState

  const [productImage, setProductImage] = useState<string>('')

  const handleEditProduct = (data: IEditProductForm) => {
    if (editProductCategory) {
      const updatedProduct = {
        ...editingProduct,
        productImage: productImage,
        productName: data.productName,
        productPrice: formatByCurrency(data.productPrice),
        productDescription: data.productDescription
      }

      const updatedCategory = {
        ...editProductCategory,
        products: editProductCategory.products.map((product: any) =>
          product.productId === updatedProduct.productId
            ? updatedProduct
            : product
        )
      }

      const updatedCategories = categories.map((category: ICategory) =>
        category.id === editProductCategory.id ? updatedCategory : category
      )

      setCategories(updatedCategories)
    }

    handleCloseModal()
  }

  const handleChangeCompanyImage: UploadProps['onChange'] = (
    info: UploadChangeParam<UploadFile>
  ) => {
    getBase64(info.file.originFileObj as RcFile, (url) => {
      setProductImage(url)
    })
  }

  const handleCancel = () => {
    handleCloseModal()
    reset()
    setProductImage('')
  }

  useEffect(() => {
    if (editingProduct) {
      setValue('productImage', editingProduct.productImage)
      setValue('productName', editingProduct.productName)
      setValue(
        'productPrice',
        formatCurrencyToEdit(editingProduct.productPrice)
      )
      setValue('productDescription', editingProduct.productDescription)
      setProductImage(editingProduct.productImage)
    }
  }, [editingProduct, setValue])

  const formIsValid = isValid

  return (
    <S.EditProductModal
      layout="vertical"
      onFinish={handleSubmit(handleEditProduct)}
    >
      <S.EditProductModalFormContent>
        <S.EditProductModalImageForm>
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
              {productImage ? (
                <img
                  src={productImage}
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
        </S.EditProductModalImageForm>
        <S.EditProductModalMainForm>
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
        </S.EditProductModalMainForm>
      </S.EditProductModalFormContent>
      <S.EditProductModalFormFooter>
        <Button key="back" onClick={handleCancel}>
          Cancelar
        </Button>
        <Button
          key="submit"
          type="primary"
          htmlType="submit"
          disabled={!formIsValid}
        >
          Editar
        </Button>
      </S.EditProductModalFormFooter>
    </S.EditProductModal>
  )
}

export default EditProductModal
