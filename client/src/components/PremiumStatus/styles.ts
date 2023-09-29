import styled from 'styled-components'
import Colors from '@/utils/styles/colors'

export const PremiumStatus = styled.div`
  display: flex;
  align-items: center;
  column-gap: 10px;
  border-radius: 6px;
  padding: 10px;

  border: 1px solid rgba(255, 122, 0, 0.8);
  background-color: rgba(255, 122, 0, 0.1);
`

export const PlanActiveIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 36px;
  height: 36px;
  border-radius: 100%;

  background-color: rgba(255, 122, 0, 0.6);

  svg {
    font-size: 22px;
    color: ${Colors.primary};
  }
`

export const PlanActiveInfos = styled.div`
  display: flex;
  flex: 1;
  column-gap: 15px;
`

export const PlanActiveDetail = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 3px;
  flex: 1;

  b {
    font-size: 13px;
    line-height: 15px;
    font-weight: 500;
  }

  p {
    margin: 0;
    font-size: 12px;
    line-height: 14px;
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
