import { useEffect, useRef, useState } from 'react'

import * as S from './styles'
import { PlusOutlined } from '@ant-design/icons'

import { Input, Button, Space, Upload, Form, message, Spin } from 'antd'
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

import firebase from '@/firebase/firebase'
import { handleEditProduct } from '@/firebase/menu'

import { ICategory, IProduct } from '../../@types'
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface'
import type { UploadChangeParam } from 'antd/es/upload'

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

  const [tempProductImage, setTempProductImage] = useState<string>('')
  const [productImageUploaded, setProductImageUploaded] = useState<RcFile>()
  const [imageModified, setImageModified] = useState(false)

  const [productEditionIsLoading, setProductEditionIsLoading] =
    useState<boolean>(false)

  const handleSubmitProductEdition = async (data: IEditProductForm) => {
    if (editProductCategory && editingProduct) {
      setProductEditionIsLoading(true)

      let imageUrl = ''

      if (productImageUploaded) {
        const uniqueFileName = `${Date.now()}_${productImageUploaded.name}`

        const storageRef = firebase.storage().ref(`/products/${uniqueFileName}`)
        await storageRef.put(productImageUploaded)

        imageUrl = await storageRef.getDownloadURL()

        if (editingProduct && editingProduct.productImage) {
          const storageRef = firebase
            .storage()
            .refFromURL(editingProduct.productImage)
          storageRef.delete()
          // .then(() => {
          //   console.log('Imagem anterior excluída com sucesso.')
          // })
          // .catch((error) => {
          //   console.error('Erro ao excluir imagem anterior:', error)
          // })
        }
      }

      const updatedProduct: IProduct = {
        ...editingProduct,
        productImage: imageUrl,
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

      setProductEditionIsLoading(false)
    }
  }

  const handleChangeCompanyImage: UploadProps['onChange'] = async (
    info: UploadChangeParam<UploadFile>
  ) => {
    try {
      if (info.file.status !== 'uploading' && !!info.file.originFileObj) {
        const file = info.file.originFileObj as RcFile

        const reader = new FileReader()
        reader.readAsDataURL(file)

        reader.onload = () => {
          const dataURL = reader.result
          setTempProductImage(dataURL as string)
          setValue('productImage', dataURL as string)
          setProductImageUploaded(file)
          setImageModified(true)
        }
      }
    } catch (error) {
      message.open({
        type: 'error',
        content: 'Falha ao fazer upload da imagem do produto.'
      })
    }
  }

  useEffect(() => {
    if (editingProduct) {
      setValue('productName', editingProduct.productName)
      setValue(
        'productPrice',
        formatCurrencyToEdit(editingProduct.productPrice)
      )
      setValue('productDescription', editingProduct.productDescription)

      setTempProductImage(editingProduct.productImage)
    }
  }, [editingProduct, setValue])

  const [containerHasScrollbar] = useScrollbar(formContainerRef)

  const isEditDisabled = !isValid && !imageModified

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
              {tempProductImage ? (
                <img
                  src={tempProductImage}
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
        <Button
          key="back"
          onClick={handleCloseModal}
          disabled={productEditionIsLoading}
        >
          Cancelar
        </Button>
        <Button
          key="submit"
          type="primary"
          htmlType="submit"
          disabled={isEditDisabled}
          loading={productEditionIsLoading}
        >
          Editar
        </Button>
      </S.EditProductModalFormFooter>
    </S.EditProductModal>
  )
}

export default EditProductModal
