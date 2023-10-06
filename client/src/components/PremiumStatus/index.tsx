import { useNavigate } from 'react-router-dom'
import { useMemo } from 'react'

import * as S from './styles'
import { IoDiamondOutline } from 'react-icons/io5'

import { Button, theme } from 'antd'

import { IUserData } from '@/@types/Auth'

interface IPremiumStatus {
  isAdminPremium: boolean
  userData: IUserData | null
}

const PremiumStatus = ({ isAdminPremium, userData }: IPremiumStatus) => {
  const { token } = theme.useToken()

  const navigate = useNavigate()

  const priceRender = useMemo(() => {
    const planType = userData?.adminSubscription?.planType

    const priceComponent =
      planType === 'monthly_plan' ? (
        <p>
          R$ 29,90 <b>/mês</b>
        </p>
      ) : planType === 'monthly_plan' ? (
        <p>
          R$ 299,90 <b>/ano</b>
        </p>
      ) : null

    const priceLabel =
      planType === 'monthly_plan'
        ? 'Plano Premium Mensal'
        : planType === 'monthly_plan'
        ? 'Plano Premium Anual'
        : 'Plano Premium Vitalício'

    return {
      priceComponent,
      priceLabel
    }
  }, [userData])

  return (
    <S.PremiumStatus>
      <S.PlanActiveIcon>
        <IoDiamondOutline />
      </S.PlanActiveIcon>
      <S.PlanActiveInfos>
        <S.PlanActiveDetail style={{ color: token.colorTextHeading }}>
          {isAdminPremium ? (
            <>
              <b>{priceRender.priceLabel}</b>
              <p>Acesso completo a plataforma</p>
            </>
          ) : (
            <b>Você ainda não possui um Plano Premium</b>
          )}
        </S.PlanActiveDetail>
        {isAdminPremium ? (
          <S.PlanActivePrice style={{ color: token.colorTextHeading }}>
            {priceRender.priceComponent}
          </S.PlanActivePrice>
        ) : (
          <S.PlanActivePremium>
            <Button
              type="primary"
              shape="round"
              icon={<IoDiamondOutline />}
              onClick={() => navigate('/admin/obter-premium')}
            >
              Obter Premium
            </Button>
          </S.PlanActivePremium>
        )}
      </S.PlanActiveInfos>
    </S.PremiumStatus>
  )
}

export default PremiumStatus
