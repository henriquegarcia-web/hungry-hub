import styled from 'styled-components'
import { Window } from '@/utils/styles/globals'
import { Form } from 'antd'

export const AdminSignup = styled(Window)`
  position: relative;
  justify-content: center;
  align-items: center;
  padding: 20px;
`

export const AdminSignupBackground = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: rgba(45, 45, 45);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.25;
  }
`

export const AdminSignupForm = styled(Form)`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  width: 100%;

  .ant-form-item {
    margin-bottom: 0px;
  }
`

export const AdminSignupFormNavigator = styled.p`
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

export const AdminSignupFormFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
`
