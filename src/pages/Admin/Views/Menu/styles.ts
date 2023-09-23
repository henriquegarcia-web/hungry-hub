import styled from 'styled-components'
import {
  View,
  adminViewMenuWrapper,
  adminMenuWidth
} from '@/utils/styles/globals'
import { Form } from 'antd'

export const Menu = styled(View)`
  display: flex;
  justify-content: center;
  padding: 20px;
`

export const MenuWrapper = styled.div`
  display: flex;
  column-gap: 20px;
  width: 100%;
  max-width: ${adminViewMenuWrapper};
  height: fit-content;
`

export const CreateCategoryContainer = styled.div`
  display: flex;
  width: ${adminMenuWidth};
`

export const CategoriesListContainer = styled.div`
  display: flex;
  width: calc(100% - ${adminMenuWidth});

  /* border: 1px solid orange; */
`

// ========================================== CREATE CATEGORY

export const CreateCategory = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 6px;
  width: 100%;
  height: fit-content;

  border-radius: 10px;

  border: 1px solid lightgray;
`

export const CreateCategoryHeader = styled.div`
  display: flex;
  padding: 15px;

  font-size: 16px;
  line-height: 16px;
  font-weight: 500;

  border-bottom: 1px solid lightgrey;
`

export const CreateCategoryWrapper = styled.div`
  display: flex;
  padding: 5px 15px 0 15px;

  .ant-list-item {
    padding: 8px 0 !important;
  }

  .ant-list-item-action li {
    padding: 0 !important;
  }
`

export const CategoriesListEmptyData = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  text-align: center;
`

export const CreateCategoryFooter = styled.form`
  display: flex;
  align-items: center;
  column-gap: 5px;
  padding: 2px 15px 15px 15px;
`

// ========================================== CATEGORY LIST

export const CategoriesList = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 15px;
  width: 100%;
  height: fit-content;
`

export const CategoryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: fit-content;

  border-radius: 10px;

  border: 1px solid lightgray;
`

export const CategoryWrapperHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;

  border-bottom: 1px solid lightgrey;
`

export const CategoryTitle = styled.div`
  display: flex;
  flex: 1;

  font-size: 16px;
  line-height: 16px;
  font-weight: 500;
`

export const CategoryCounter = styled.div`
  display: flex;
  padding: 6px 10px;
  border-radius: 6px;

  font-size: 12px;
  line-height: 12px;
  font-weight: 300;

  background-color: rgba(0, 0, 0, 0.06);
`

export const CategoryWrapperContent = styled.div`
  display: flex;
  flex-direction: column;

  padding: 12px;
`

export const CategoryWrapperFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 12px;

  border-top: 1px solid lightgrey;
`

// ========================================== CREATE PRODUCT MODAL

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

// ========================================== CATEGORY PRODUCT

export const CategoryProduct = styled.div`
  display: flex;
`
