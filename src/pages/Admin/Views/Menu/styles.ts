import styled from 'styled-components'
import {
  View,
  adminViewMenuWrapper,
  adminMenuWidth
} from '@/utils/styles/globals'

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

  border: 1px solid orange;
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
  width: 100%;
  height: fit-content;
`
