import { useNavigate } from 'react-router-dom'
import { useCallback, useMemo } from 'react'

import * as S from './styles'
import { BsCheck } from 'react-icons/bs'

import { Badge, Button, theme } from 'antd'

import { IUserData } from '@/@types/Auth'
import { IBenefit, IPlans } from '@/data/landing'

interface IPlan {
  plan: IPlans
  userData: IUserData | null
  isLoadingCheckout?: boolean
  isAdminPremium: boolean
  handleCheckout?: (planId: string) => void
}

const PremiumPlan = ({
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

export default PremiumPlan

// ============================================ PLAN CONTENT

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

      if (handleCheckout) {
        handleCheckout(planId)
      } else [navigate('/admin/cadastrar')]
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
          {plan.planBenefits.map((benefit: IBenefit) => (
            <S.PlanBenefit key={benefit.benefitId}>
              <BsCheck style={{ color: variantColor }} />
              <p style={{ color: token.colorText }}>{benefit.benefitLabel}</p>
            </S.PlanBenefit>
          ))}
        </S.PlanBenefitsWrapper>
      </S.PlanBenefits>
    </S.PlanWrapper>
  )
}
