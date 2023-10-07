import styled from 'styled-components'
import { View, adminViewSupportWrapper } from '@/utils/styles/globals'
import { Form } from 'antd'

export const Support = styled(View)`
  display: flex;
  justify-content: center;
  padding: 20px;
`

export const SupportWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  width: 100%;
  max-width: ${adminViewSupportWrapper};
  height: fit-content;

  /* border: 1px solid red; */
`

// export const CompanyInfos = styled.div`
//   display: flex;
// `

// ========================================== SUPPORT CONTAINER

export const SupportForm = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: fit-content;
  overflow: hidden;

  border-radius: 10px;
`

export const SupportFormHeader = styled.div`
  display: flex;
  align-items: center;
  column-gap: 8px;
  padding: 15px;
`

export const SupportFormHeaderIcon = styled.div`
  display: flex;

  svg {
    font-size: 18px;
  }
`

export const SupportFormHeaderLabel = styled.h2`
  display: flex;
  flex: 1;

  font-size: 17px;
  line-height: 17px;
  font-weight: 500;
`

export const SupportFormHeaderIncomplete = styled.h2`
  display: flex;
`

export const SupportFormContent = styled(Form)`
  position: relative;
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  padding: 15px;

  .ant-btn-compact-first-item {
    flex: 1 !important;
  }

  .ant-form-item {
    margin-bottom: 0px;
  }
`

export const SupportFormLoading = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

  background-color: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(2px);
`

export const FormFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-top: 10px;
`
