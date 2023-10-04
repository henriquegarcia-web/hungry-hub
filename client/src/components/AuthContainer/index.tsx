import { Logo } from '..'
import * as S from './styles'

import { theme } from 'antd'
const { useToken } = theme

import { ThemeProps } from '@/contexts/AdminContext'

interface IAuthContainer {
  title: string
  adminTheme: ThemeProps
  children: React.ReactNode
}

const AuthContainer = ({ title, adminTheme, children }: IAuthContainer) => {
  const { token } = useToken()

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
        <span>{title}</span>
      </S.AuthContainerHeader>
      <S.AuthContainerContent>{children}</S.AuthContainerContent>
    </S.AuthContainer>
  )
}

export default AuthContainer
