import { useMemo } from 'react'

import * as S from './styles'

interface ILogo {
  type: 'default' | 'dark' | 'full_default' | 'full_dark'
}

const Logo = ({ type }: ILogo) => {
  const logoToRender = useMemo(() => {
    switch (type) {
      case 'default':
        return <img src="/logo_default.png" alt="Logo HungryHub" />
      case 'dark':
        return <img src="/logo_dark.png" alt="Logo HungryHub" />
      case 'full_default':
        return <img src="/logo_full_default.png" alt="Logo HungryHub" />
      case 'full_dark':
        return <img src="/logo_full_dark.png" alt="Logo HungryHub" />

      default:
        return <img src="/logo_default.png" alt="Logo HungryHub" />
    }
  }, [type])

  return <S.Logo>{logoToRender}</S.Logo>
}

export default Logo
