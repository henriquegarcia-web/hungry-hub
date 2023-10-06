import styled from 'styled-components'
import {
  View,
  adminViewInfosWrapper,
  responsiveMobile
} from '@/utils/styles/globals'
import { Form } from 'antd'

export const Account = styled(View)`
  display: flex;
  justify-content: center;
  padding: 20px;
`

export const AccountWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  width: 100%;
  max-width: ${adminViewInfosWrapper};
  height: fit-content;

  /* border: 1px solid red; */
`

export const AccountDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  row-gap: 15px;
  border-radius: 10px;
  padding: 15px;

  border: 1px solid lightgray;
  background-color: rgba(0, 0, 0, 0.02);
`

export const AccountDetailsTitle = styled.div`
  width: 100%;

  font-size: 17px;
  line-height: 17px;
  font-weight: 300;

  b {
    font-weight: 500;
  }

  color: rgba(0, 0, 0, 0.8);
`

export const AccountDetailsPlan = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  row-gap: 10px;

  p {
    width: 100%;

    font-size: 13px;
    line-height: 13px;
    font-weight: 400;
  }
`

export const AccountDeleteForm = styled.form`
  display: flex;
  align-items: center;
  justify-content: space-between;
  column-gap: 10px;
  padding: 15px;
  border-radius: 10px;

  border: 1px solid lightgrey;

  p {
    font-size: 14px;
    line-height: 14px;
    font-weight: 500;
  }

  @media screen and (max-width: ${responsiveMobile}) {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    row-gap: 15px;

    p {
      width: 100%;
    }
  }
`

export const AccountDeleteFormInputs = styled.div`
  display: flex;
  column-gap: 10px;

  @media screen and (max-width: ${responsiveMobile}) {
    width: 100%;

    .ant-input-password {
      display: flex;
      flex: 1;
    }
  }
`

// ========================================== ACCOUNT CONTAINER BASE

export const AccountContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: fit-content;
  border-radius: 10px;
  overflow: hidden;

  border: 1px solid lightgray;
`

export const AccountContainerHeader = styled.div`
  display: flex;
  align-items: center;
  column-gap: 8px;
  padding: 15px;

  border-bottom: 1px solid lightgrey;
`

export const AccountContainerHeaderIcon = styled.div`
  display: flex;

  svg {
    font-size: 18px;
  }
`

export const AccountContainerHeaderLabel = styled.h2`
  display: flex;
  flex: 1;

  font-size: 17px;
  line-height: 17px;
  font-weight: 500;
`

export const AccountContainerContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;
`

export const AccountContainerFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
`

// ========================================== ACCOUNT E-MAIL CHANGE

export const AccountEmailChangeForm = styled(Form)`
  display: flex;
  flex-direction: column;
  width: 100%;
  row-gap: 10px;

  .ant-form-item {
    margin-bottom: 0px;
  }
`

// ========================================== ACCOUNT PASSWORD CHANGE

export const AccountPasswordChangeForm = styled(Form)`
  display: flex;
  flex-direction: column;
  width: 100%;
  row-gap: 10px;

  .ant-form-item {
    margin-bottom: 0px;
  }
`
