import styled from 'styled-components'
import { View, adminViewDisclosureWrapper } from '@/utils/styles/globals'

interface IDisclosureMethodWrapper {
  disabled?: number
}

interface IDisclosureMethod {
  background: string
}

export const Disclosure = styled(View)`
  display: flex;
  justify-content: center;
  padding: 20px;
`

export const DisclosureContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  width: 100%;
  max-width: ${adminViewDisclosureWrapper};
  height: fit-content;
`

export const DisclosurePremiumAlert = styled.div`
  display: flex;
  align-items: center;
  column-gap: 4px;
  width: 100%;
  padding: 12px;
  border-radius: 10px;

  /* border: 1px solid lightgrey; */

  svg {
    font-size: 22px;
  }

  p {
    font-size: 14px;
    line-height: 14px;
    font-weight: 500;

    b {
      font-weight: 800;
    }
  }
`

export const DisclosureWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  width: 100%;
  height: fit-content;
`

export const DisclosureMethodWrapper = styled.div<IDisclosureMethodWrapper>`
  display: flex;
  width: calc(50% - 5px);

  opacity: ${({ disabled }) => (disabled ? '0.6' : '1')};
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'all')};

  @media screen and (max-width: 600px) {
    width: 100%;
  }
`

export const DisclosureMethod = styled.div<IDisclosureMethod>`
  display: flex;
  align-items: center;
  column-gap: 6px;
  width: 100%;
  padding: 15px;
  border-radius: 10px;
  cursor: pointer;
  opacity: 0.8;
  transition: 0.3s;

  background-color: ${({ background }) => background};

  &:hover {
    opacity: 1;
  }
`

export const DisclosureMethodIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;

  svg {
    font-size: 32px;

    color: white;
  }
`

export const DisclosureMethodLabel = styled.div`
  display: flex;

  font-size: 14px;
  line-height: 14px;
  font-weight: 600;

  color: white;
`

export const QrCodeModalContent = styled.div`
  display: flex;
  padding: 15px 0;
  column-gap: 20px;

  @media screen and (max-width: 560px) {
    flex-direction: column;
    align-items: center;
    row-gap: 20px;
  }
`

export const QrCodeModalContentOptions = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  flex: 1;
`
