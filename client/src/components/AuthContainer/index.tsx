import { Logo } from '..'
import * as S from './styles'

import { theme } from 'antd'

import { AdminTheme } from '@/@types/Auth'

interface IAuthContainer {
  title: string
  adminTheme: AdminTheme
  children: React.ReactNode
}

const AuthContainer = ({ title, adminTheme, children }: IAuthContainer) => {
  const { token } = theme.useToken()

  return (
    <S.AuthContainer
      style={{ backgroundColor: token.colorBgElevated }}
      color={token.colorText}
      background={token.colorBgContainer}
    >
      <S.AuthContainerHeader>
        <Logo
          type={adminTheme === 'default' ? 'large_default' : 'large_dark'}
        />
        <span style={{ color: token.colorTextSecondary }}>{title}</span>
      </S.AuthContainerHeader>
      <S.AuthContainerContent>{children}</S.AuthContainerContent>
    </S.AuthContainer>
  )
}

export default AuthContainer
