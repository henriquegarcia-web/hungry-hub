import styled from 'styled-components'
import { Form } from 'antd'

export const CreateProductModal = styled(Form)`
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

export const CreateProductModalFormContent = styled.div`
  display: flex;
  column-gap: 15px;
`

export const CreateProductModalImageForm = styled.div`
  display: flex;
`

export const CreateProductModalMainForm = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  row-gap: 15px;
`

export const CreateProductModalFormFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  column-gap: 5px;
`
