import styled from 'styled-components'
import {
  View,
  adminViewMenuWrapper,
  responsiveMobile,
  responsiveTablet
} from '@/utils/styles/globals'

interface IPlanHeader {
  color: string
}

export const Premium = styled(View)`
  display: flex;
  justify-content: center;
  padding: 20px;
`

export const PremiumWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 25px;
  width: 100%;
  max-width: ${adminViewMenuWrapper};
  height: fit-content;
`

export const PremiumHeader = styled.div`
  display: flex;
  justify-content: center;
  column-gap: 6px;

  font-size: 20px;
  line-height: 20px;
  font-weight: 600;
  letter-spacing: 0.5px;

  svg {
    font-size: 22px;
  }
`

export const PremiumPlansWrapper = styled.div`
  display: flex;
  column-gap: 15px;

  @media screen and (max-width: ${responsiveTablet}) {
    flex-direction: column;
    row-gap: 20px;

    .ant-ribbon-wrapper {
      flex: 1;
    }
  }
`

// ============================================ PLAN

export const Plan = styled.div`
  display: flex;
  width: 100%;

  .ant-ribbon-text {
    font-size: 12px;
    font-weight: 500;
  }
`

export const PlanWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 5px;
  border-radius: 10px;

  box-shadow: 0 0 12px rgba(0, 0, 0, 0.08);
  border: 1px solid lightgray;
`

export const PlanMainInfos = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  padding: 35px 15px 15px 15px;
  border-radius: 8px;

  @media screen and (max-width: ${responsiveTablet}) {
    row-gap: 15px;

    padding: 25px 15px 15px 15px;
  }
`

export const PlanHeader = styled.div<IPlanHeader>`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 16px;
  min-height: 85px;

  b {
    position: relative;
    padding-bottom: 7px;

    font-size: 17px;
    line-height: 17px;
    font-weight: 500;

    text-align: center;

    &::after {
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      content: '';
      width: 40px;
      height: 4px;
      border-radius: 100px;

      background-color: ${({ color }) => color};
    }
  }

  p {
    font-size: 13px;
    line-height: 14px;
    font-weight: 400;

    text-align: center;
  }

  @media screen and (max-width: ${responsiveTablet}) {
    min-height: 55px;
    row-gap: 14px;
  }
`

export const PlanPrice = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  column-gap: 3px;

  b {
    font-size: 16px;
    line-height: 16px;
    font-weight: 600;
  }

  p {
    padding-bottom: 1px;

    font-size: 13px;
    line-height: 13px;
    font-weight: 400;
  }
`

export const PlanCta = styled.div`
  display: flex;
  justify-content: center;

  button {
    width: 100%;
  }
`

export const PlanBenefits = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  padding: 15px;

  span {
    font-size: 13px;
    line-height: 15px;
    font-weight: 400;

    b {
      font-weight: 500;
    }
  }
`

export const PlanBenefitsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 7px;
`

export const PlanBenefit = styled.div`
  display: flex;
  column-gap: 3px;

  svg {
    font-size: 20px;
    margin-top: -2px;
  }

  p {
    display: flex;
    flex: 1;

    font-size: 13px;
    line-height: 15px;
    font-weight: 300;
  }
`
