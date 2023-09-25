import * as S from './styles'
import { MdWorkspacePremium } from 'react-icons/md'

const PremiumStatus = () => {
  return (
    <S.PremiumStatus>
      <S.PlanActiveIcon>
        <MdWorkspacePremium />
      </S.PlanActiveIcon>
      <S.PlanActiveInfos>
        <S.PlanActiveDetail>
          <b>Plano Premium Mensal</b>
          <p>Acesso completo a plataforma</p>
        </S.PlanActiveDetail>
        <S.PlanActivePrice>
          <b>R$ 49,99</b>
          <p>/mês</p>
        </S.PlanActivePrice>
      </S.PlanActiveInfos>
    </S.PremiumStatus>
  )
}

export default PremiumStatus
