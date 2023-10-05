import * as S from './styles'
import { IoDiamondOutline } from 'react-icons/io5'

import { theme } from 'antd'

const { useToken } = theme

const PremiumStatus = () => {
  const { token } = useToken()

  return (
    <S.PremiumStatus>
      <S.PlanActiveIcon>
        <IoDiamondOutline />
      </S.PlanActiveIcon>
      <S.PlanActiveInfos>
        <S.PlanActiveDetail style={{ color: token.colorTextHeading }}>
          <b>Plano Premium Mensal</b>
          <p>Acesso completo a plataforma</p>
        </S.PlanActiveDetail>
        <S.PlanActivePrice style={{ color: token.colorTextHeading }}>
          <b>R$ 49,99</b>
          <p>/mês</p>
        </S.PlanActivePrice>
      </S.PlanActiveInfos>
    </S.PremiumStatus>
  )
}

export default PremiumStatus
