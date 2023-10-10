import { useState } from 'react'

import * as S from './styles'
import { IoDiamondOutline } from 'react-icons/io5'

import { message, theme } from 'antd'

import api from '@/api'
import { useAdminAuth } from '@/contexts/AdminAuthContext'

import { premiumPlansData, IPlans } from '@/data/landing'
import { PremiumPlan } from '@/components'

const Premium = () => {
  const { token } = theme.useToken()

  const { userData, isAdminPremium } = useAdminAuth()

  const [isLoadingCheckout, setIsLoadingCheckout] = useState(false)

  const handleCheckout = async (planId: string) => {
    const planIdValidation =
      planId === 'monthly_plan' ||
      planId === 'annual_plan' ||
      planId === 'lifetime_plan'

    try {
      if (!userData || !planId) {
        message.open({
          type: 'error',
          content:
            'Não é possível acessar o checkout. Tente novamente mais tarde.'
        })
      }

      if (!planIdValidation) {
        message.open({
          type: 'error',
          content: 'O plano escolhido não é válido.'
        })
      }

      setIsLoadingCheckout(true)

      let response

      if (planId === 'lifetime_plan') {
        response = await api.post('/api/v1/create-one-time-payment-session', {
          plan: planId,
          custumerId: userData?.adminId,
          custumerEmail: userData?.adminEmail
        })
      } else {
        response = await api.post(
          '/api/v1/create-subscription-checkout-session',
          {
            plan: planId,
            custumerId: userData?.adminId,
            custumerEmail: userData?.adminEmail
          }
        )
      }

      if (response.status === 200) {
        const { session } = response.data
        window.location = session.url
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoadingCheckout(false)
    }
  }

  return (
    <S.Premium>
      <S.PremiumWrapper>
        <S.PremiumHeader style={{ color: token.colorPrimary }}>
          <IoDiamondOutline />
          Planos Premium
        </S.PremiumHeader>
        <S.PremiumPlansWrapper>
          {premiumPlansData?.map((plan: IPlans) => (
            <PremiumPlan
              key={plan.planId}
              plan={plan}
              userData={userData}
              isAdminPremium={isAdminPremium}
              isLoadingCheckout={isLoadingCheckout}
              handleCheckout={handleCheckout}
            />
          ))}
        </S.PremiumPlansWrapper>
      </S.PremiumWrapper>
    </S.Premium>
  )
}

export default Premium
