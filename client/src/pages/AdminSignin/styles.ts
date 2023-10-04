import styled from 'styled-components'
import { Window } from '@/utils/styles/globals'
import { Form } from 'antd'

export const AdminSignin = styled(Window)`
  position: relative;
  justify-content: center;
  align-items: center;
  padding: 20px;
`

export const AdminSigninBackground = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  /* background-color: rgba(45, 45, 45); */

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.15;
  }
`

export const AdminSigninForm = styled(Form)`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  width: 100%;

  .ant-form-item {
    margin-bottom: 0px;
  }
`

export const AdminSigninFormNavigator = styled.p`
  display: flex;
  justify-content: flex-end;
  column-gap: 3px;
  width: 100%;
  margin-top: 4px;

  font-size: 12px;
  line-height: 12px;
  font-weight: 300;

  b {
    cursor: pointer;
    font-weight: 500;
  }
`

export const AdminSigninFormFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
`

// =================================================== SWITCH THEME

export const SwitchTheme = styled.div`
  z-index: 10;
  position: absolute;
  top: 10px;
  right: 10px;

  display: flex;
  align-items: center;
  column-gap: 10px;
  width: fit-content;
  height: fit-content;
  padding: 8px 8px 8px 10px;
  border-radius: 50px;
`

export const SwitchThemeLabel = styled.p`
  display: flex;
  align-items: center;
  column-gap: 4px;
  width: fit-content;

  font-size: 14px;

  svg {
    &:nth-of-type(1) {
      font-size: 16px;
    }

    &:nth-of-type(2) {
      font-size: 14px;
    }
  }
`
