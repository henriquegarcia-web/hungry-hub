import styled from 'styled-components'
import { View, adminViewInfosWrapper } from '@/utils/styles/globals'
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
  row-gap: 15px;
  border-radius: 10px;
  padding: 15px;

  border: 1px solid lightgray;
  background-color: rgba(0, 0, 0, 0.02);
`

export const AccountDetailsTitle = styled.div`
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
  row-gap: 7px;

  font-size: 13px;
  line-height: 13px;
  font-weight: 400;

  color: rgba(0, 0, 0, 0.8);
`

export const AccountDelete = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  border-radius: 10px;

  border: 1px solid lightgrey;

  p {
    font-size: 14px;
    line-height: 14px;
    font-weight: 500;
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
