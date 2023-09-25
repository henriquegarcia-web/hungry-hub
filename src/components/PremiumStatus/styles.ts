import styled from 'styled-components'
import Colors from '@/utils/styles/colors'

export const PremiumStatus = styled.div`
  display: flex;
  column-gap: 10px;
  border-radius: 6px;
  padding: 10px;

  border: 1px solid ${Colors.elementSecondary};
  background-color: ${Colors.planActive};
`

export const PlanActiveIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  border-radius: 100%;

  background-color: ${Colors.elementSecondary};

  svg {
    font-size: 22px;
    color: ${Colors.primary};
  }
`

export const PlanActiveInfos = styled.div`
  display: flex;
  flex: 1;
`

export const PlanActiveDetail = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 3px;
  flex: 1;

  b {
    font-size: 13px;
    line-height: 13px;
    font-weight: 500;
  }

  p {
    margin: 0;
    font-size: 12px;
    line-height: 12px;
    font-weight: 300;
  }
`

export const PlanActivePrice = styled.div`
  display: flex;
  font-size: 13px;
  line-height: 13px;

  p {
    margin: 0;
  }
`
