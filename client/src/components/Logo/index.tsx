import { useMemo } from 'react'

import * as S from './styles'

interface ILogo {
  type: 'default' | 'dark' | 'large_default' | 'large_dark'
}

const Logo = ({ type }: ILogo) => {
  const logoToRender = useMemo(() => {
    switch (type) {
      case 'default':
        return <img src="/logo_default.png" alt="Logo HungryHub" />
      case 'dark':
        return <img src="/logo_dark.png" alt="Logo HungryHub" />
      case 'large_default':
        return <img src="/logo_large_default.png" alt="Logo HungryHub" />
      case 'large_dark':
        return <img src="/logo_large_dark.png" alt="Logo HungryHub" />

      default:
        return <img src="/logo_default.png" alt="Logo HungryHub" />
    }
  }, [type])

  return <S.Logo>{logoToRender}</S.Logo>
}

export default Logo
