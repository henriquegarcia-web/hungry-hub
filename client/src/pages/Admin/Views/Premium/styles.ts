import styled from 'styled-components'
import {
  View,
  adminViewMenuWrapper,
  responsiveTablet
} from '@/utils/styles/globals'

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
