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
        <img src="/logo_large_dark.png" alt="Logo HungryHub" />
        <span>{title}</span>
      </S.AuthContainerHeader>
      <S.AuthContainerContent>{children}</S.AuthContainerContent>
    </S.AuthContainer>
  )
}

export default AuthContainer
