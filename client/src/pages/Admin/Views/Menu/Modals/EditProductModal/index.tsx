import { useEffect, useRef, useState } from 'react'

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
  formatToCurrency,
  formatByCurrency
} from '@/utils/functions/formatCurrency'
import useScrollbar from '@/hooks/useScrollbar'

import { ICategory, IProduct } from '../../@types'
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface'
import type { UploadChangeParam } from 'antd/es/upload'
import { handleEditProduct } from '@/firebase/menu'

interface IEditProductModal {
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
  editProductCategory,
  editingProduct,
  handleCloseModal
}: IEditProductModal) => {
  const { control, handleSubmit, setValue, reset, formState } =
    useForm<IEditProductForm>()

  const { isValid } = formState

  const formContainerRef = useRef(null)

  const [productImage, setProductImage] = useState<string>('')

  const handleSubmitProductEdition = async (data: IEditProductForm) => {
    if (editProductCategory && editingProduct) {
      const updatedProduct: IProduct = {
        ...editingProduct,
        productImage: productImage,
        productName: data.productName,
        productPrice: formatByCurrency(data.productPrice),
        productDescription: data.productDescription
      }

      const editProductResponse = await handleEditProduct(
        editProductCategory.id,
        editingProduct.productId,
        updatedProduct
      )

      if (editProductResponse) {
        handleCloseModal()
      }
    }
  }

  const handleChangeCompanyImage: UploadProps['onChange'] = (
    info: UploadChangeParam<UploadFile>
  ) => {
    getBase64(info.file.originFileObj as RcFile, (url) => {
      setProductImage(url)
    })
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

  const [containerHasScrollbar] = useScrollbar(formContainerRef)

  const formIsValid = isValid

  return (
    <S.EditProductModal
      layout="vertical"
      onFinish={handleSubmit(handleSubmitProductEdition)}
    >
      <S.EditProductModalFormContent
        ref={formContainerRef}
        scrollbar={containerHasScrollbar ? 1 : 0}
      >
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
                  <div
                    style={{ marginTop: 8, fontSize: 13, lineHeight: '14px' }}
                  >
                    Imagem do produto
                  </div>
                </div>
              )}
            </Upload>
          </ImgCrop>
        </S.EditProductModalImageForm>
        <S.EditProductModalMainForm>
          <Form.Item>
            <Space.Compact
              style={{ width: '100%', columnGap: '10px' }}
              className="input_container"
            >
              <Form.Item
                label="Nome do produto"
                style={{ width: '65%' }}
                className="input_product_name"
              >
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
              <Form.Item
                label="Valor"
                style={{ width: '35%' }}
                className="input_product_price"
              >
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
        <Button key="back" onClick={handleCloseModal}>
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
