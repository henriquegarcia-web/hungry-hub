import { useNavigate } from 'react-router-dom'
import { useCallback, useMemo, useState } from 'react'

import * as S from './styles'
import { BsCheck } from 'react-icons/bs'
import { IoDiamondOutline } from 'react-icons/io5'

import { Badge, Button, message, theme } from 'antd'

import api from '@/api'
import { useAdminAuth } from '@/contexts/AdminAuthContext'

import { IPremiumPlan } from '@/@types/Checkout'
import { IUserData } from '@/@types/Auth'

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
          {premiumPlans?.map((plan: IPremiumPlan) => (
            <Plan
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

// ============================================ PLAN

interface IPlan {
  plan: IPremiumPlan
  userData: IUserData | null
  isLoadingCheckout: boolean
  isAdminPremium: boolean
  handleCheckout: (planId: string) => void
}

const Plan = ({
  plan,
  userData,
  isLoadingCheckout,
  isAdminPremium,
  handleCheckout
}: IPlan) => {
  const { token } = theme.useToken()

  return (
    <S.Plan>
      {plan.planLimited ? (
        <Badge.Ribbon text="Oferta limitada" color={token.colorPrimary}>
          <PlanContent
            plan={plan}
            userData={userData}
            isLoadingCheckout={isLoadingCheckout}
            isAdminPremium={isAdminPremium}
            handleCheckout={handleCheckout}
          />
        </Badge.Ribbon>
      ) : plan.planEconomic ? (
        <Badge.Ribbon text="Mais econômico" color={token.colorInfo}>
          <PlanContent
            plan={plan}
            userData={userData}
            isLoadingCheckout={isLoadingCheckout}
            isAdminPremium={isAdminPremium}
            handleCheckout={handleCheckout}
          />
        </Badge.Ribbon>
      ) : (
        <PlanContent
          plan={plan}
          userData={userData}
          isLoadingCheckout={isLoadingCheckout}
          isAdminPremium={isAdminPremium}
          handleCheckout={handleCheckout}
        />
      )}
    </S.Plan>
  )
}

// ============================================ PLAN

interface IPlan {
  plan: IPremiumPlan
  userData: IUserData | null
  isLoadingCheckout: boolean
  isAdminPremium: boolean
  handleCheckout: (planId: string) => void
}

const PlanContent = ({
  plan,
  userData,
  isLoadingCheckout,
  isAdminPremium,
  handleCheckout
}: IPlan) => {
  const { token } = theme.useToken()

  const navigate = useNavigate()

  const variantColor = plan.planLimited
    ? token.colorPrimary
    : token.colorTextDescription

  const checkoutValidation = useMemo(() => {
    const planActive = !!userData?.adminSubscription?.planId
    const planDisabled = planActive
      ? plan.planId !== userData?.adminSubscription?.planType
      : false

    return {
      planActive,
      planDisabled
    }
  }, [plan.planId, userData])

  const handleClickCheckout = useCallback(
    (planId: string) => {
      if (checkoutValidation.planActive && isAdminPremium) {
        navigate('/admin/minha-conta')

        return
      }

      handleCheckout(planId)
    },
    [checkoutValidation, handleCheckout, isAdminPremium, navigate]
  )

  return (
    <S.PlanWrapper
      style={{
        backgroundColor: token.colorBgContainer,
        border: `1px solid ${token.colorBorderSecondary}`
      }}
    >
      <S.PlanMainInfos style={{ backgroundColor: token.colorBorderSecondary }}>
        <S.PlanHeader color={variantColor}>
          <b
            style={{
              color: token.colorText
            }}
          >
            {plan.planLabel}
          </b>
          <p style={{ color: token.colorText }}>{plan.planDescription}</p>
        </S.PlanHeader>
        <S.PlanPrice>
          <b style={{ color: token.colorText }}>{plan.planPrice}</b>
          <p style={{ color: token.colorTextDescription }}>
            {plan.planPriceLabel}
          </p>
        </S.PlanPrice>
        <S.PlanCta>
          <Button
            style={{ fontSize: 13 }}
            type={plan.planLimited ? 'primary' : 'dashed'}
            loading={isLoadingCheckout}
            disabled={checkoutValidation.planDisabled}
            onClick={() => handleClickCheckout(plan.planId)}
          >
            {checkoutValidation.planActive && !checkoutValidation.planDisabled
              ? 'Plano Ativo'
              : 'Selecionar Plano'}
          </Button>
        </S.PlanCta>
      </S.PlanMainInfos>
      <S.PlanBenefits>
        <span style={{ color: token.colorTextSecondary }}>
          O <b style={{ color: token.colorText }}>{plan.planLabel}</b> inclui:
        </span>
        <S.PlanBenefitsWrapper>
          {plan.planBenefits.map((benefit) => (
            <S.PlanBenefit key={benefit}>
              <BsCheck style={{ color: variantColor }} />
              <p style={{ color: token.colorText }}>{benefit}</p>
            </S.PlanBenefit>
          ))}
        </S.PlanBenefitsWrapper>
      </S.PlanBenefits>
    </S.PlanWrapper>
  )
}

const premiumPlans = [
  {
    planId: 'monthly_plan',
    planLimited: false,
    planEconomic: false,
    planLabel: 'Plano Mensal',
    planDescription:
      'Desfrute de acesso total ao nosso cardápio online por um mês inteiro.',
    planPrice: 'R$ 29,90',
    planPriceLabel: '/ mês',
    planPriceId: '',
    planBenefits: [
      'Lorem Ipsum dolor adipiscing sit adipiscing amet',
      'Consectetur et adipiscing elit',
      'Sed do eiusmod adipiscing tempor',
      'Incididunt ut et labore et',
      'Dolore magna adipiscing aliqua incididunt'
    ]
  },
  {
    planId: 'annual_plan',
    planLimited: false,
    planEconomic: true,
    planLabel: 'Plano Anual',
    planDescription:
      'Com este plano, você terá acesso ilimitado ao nosso cardápio online por um ano inteiro.',
    planPrice: 'R$ 299,90',
    planPriceLabel: '/ ano',
    planPriceId: '',
    planBenefits: [
      'Lorem Ipsum dolor sit adipiscing amet',
      'Consectetur adipiscing elit',
      'Sed do eiusmod do tempor consectetur adipiscing',
      'Incididunt ut adipiscing labore et',
      'Dolore magna Ipsum aliqua'
    ]
  },
  {
    planId: 'lifetime_plan',
    planLimited: true,
    planEconomic: false,
    planLabel: 'Acesso Vitalício',
    planDescription:
      'Com uma única taxa, você garante acesso vitalício ao nosso cardápio online, sem qualquer limitação.',
    planPrice: 'R$ 249,90',
    planPriceLabel: '/ sempre',
    planPriceId: '',
    planBenefits: [
      'Lorem Ipsum dolor sit amet Ipsum',
      'Consectetur tempor adipiscing dolor elit magna eiusmod',
      'Sed do eiusmod tempor aliqua',
      'Incididunt ut tempor labore aliqua et',
      'Dolore aliqua magna aliqua'
    ]
  }
]

// O plano mensal é perfeito para aqueles que desejam flexibilidade. Desfrute de acesso total ao nosso cardápio online por um mês inteiro.
// O plano anual é a escolha econômica para os que planejam a longo prazo. Com este plano, você terá acesso ilimitado ao nosso cardápio online por um ano inteiro.
// O plano vitalício é a opção definitiva para aqueles que desejam uma experiência ininterrupta e duradoura. Com uma única taxa, você garante acesso vitalício ao nosso cardápio online, sem qualquer limitação.
