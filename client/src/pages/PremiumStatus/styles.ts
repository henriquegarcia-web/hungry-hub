import styled from 'styled-components'
import { Window } from '@/utils/styles/globals'

interface IPremiumStatus {
  color: string
}

export const PremiumStatus = styled(Window)`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const PremiumStatusContainer = styled.div<IPremiumStatus>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 480px;

  svg {
    font-size: 72px;
    margin-bottom: 10px;

    color: ${({ color }) => color};
  }

  b {
    margin-bottom: 20px;

    font-size: 20px;
    line-height: 22px;
    font-weight: 600;
    text-align: center;

    color: ${({ color }) => color};
  }

  p {
    margin-bottom: 8px;

    font-size: 14px;
    line-height: 18px;
    font-weight: 300;
    text-align: center;
  }

  button {
    margin-top: 18px;
  }
`
