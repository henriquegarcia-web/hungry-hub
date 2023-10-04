import styled from 'styled-components'
import Colors from '@/utils/styles/colors'
import { Form } from 'antd'
import { responsiveMobile, responsiveTablet } from '@/utils/styles/globals'

interface IFormContent {
  scrollbar: number
}

export const EditProductModal = styled(Form)`
  display: flex;
  flex-direction: column;
  row-gap: 15px;
  padding-top: 10px;

  .ant-form-item {
    margin-bottom: 0px;
  }

  .ant-input-group-addon {
    border-radius: 6px 0 0 6px !important;
  }
`

export const EditProductModalFormContent = styled.div<IFormContent>`
  display: flex;
  column-gap: 15px;
  max-height: 50vh;
  overflow: auto;

  padding-right: ${({ scrollbar }) => (scrollbar ? '10px' : '0')};

  .ant-upload-select {
    overflow: hidden;
  }

  &::-webkit-scrollbar {
    width: 3px;
    z-index: 1000;
  }

  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.1);
  }

  &::-webkit-scrollbar-thumb {
    background: #ff7a00;
    border-radius: 10px;
  }

  @media screen and (max-width: ${responsiveMobile}) {
    flex-direction: column;
    row-gap: 10px;
  }
`

export const EditProductModalImageForm = styled.div`
  display: flex;
`

export const EditProductModalMainForm = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  row-gap: 15px;

  @media screen and (max-width: ${responsiveTablet}) {
    .input_container {
      flex-direction: column;
      row-gap: 15px;
    }
    .input_product_name,
    .input_product_price {
      width: 100% !important;
    }
  }
`

export const EditProductModalFormFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  column-gap: 5px;
`
