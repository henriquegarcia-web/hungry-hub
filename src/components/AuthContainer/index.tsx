import { Logo } from '..'
import * as S from './styles'

import { theme } from 'antd'
const { useToken } = theme

interface IAuthContainer {
  title: string
  children: React.ReactNode
}

const AuthContainer = ({ title, children }: IAuthContainer) => {
  const { token } = useToken()

  return (
    <S.AuthContainer style={{ backgroundColor: token.colorBgElevated }}>
      <S.AuthContainerHeader>
        <Logo type="large_dark" />
        <span>{title}</span>
      </S.AuthContainerHeader>
      <S.AuthContainerContent>{children}</S.AuthContainerContent>
    </S.AuthContainer>
  )
}

export default AuthContainer
