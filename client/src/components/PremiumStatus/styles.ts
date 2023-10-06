import styled from 'styled-components'
import Colors from '@/utils/styles/colors'

export const PremiumStatus = styled.div`
  display: flex;
  align-items: center;
  column-gap: 10px;
  width: 100%;
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
  padding-top: 1px;

  background-color: rgba(255, 122, 0, 0.6);

  svg {
    font-size: 22px;
    color: ${Colors.primary};
  }
`

export const PlanActiveInfos = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
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

export const PlanActivePremium = styled.div`
  display: flex;
  width: fit-content;

  .ant-btn-primary {
    display: flex;
    align-items: center;
    padding: 2px 12px;
    height: fit-content;

    .ant-btn-icon {
      margin-right: 5px !important;
      font-size: 16px;
    }
  }
`

export const PlanActivePrice = styled.div`
  font-size: 13px;
  line-height: 13px;
  white-space: nowrap;

  p {
    margin: 0;
    font-size: 12px;
    line-height: 12px;
    font-weight: 500;
  }

  b {
    font-size: 13px;
    line-height: 13px;
    font-weight: 300;
  }
`
