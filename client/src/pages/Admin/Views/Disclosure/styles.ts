import styled from 'styled-components'
import { View, adminViewDisclosureWrapper } from '@/utils/styles/globals'

interface IDisclosureMethod {
  background: string
  full?: number
}

export const Disclosure = styled(View)`
  display: flex;
  justify-content: center;
  padding: 20px;
`

export const DisclosureWrapper = styled.div`
  display: flex;
  /* flex-direction: column; */
  flex-wrap: wrap;
  gap: 10px;
  width: 100%;
  max-width: ${adminViewDisclosureWrapper};
  height: fit-content;
`

export const DisclosureMethod = styled.div<IDisclosureMethod>`
  display: flex;
  align-items: center;
  column-gap: 10px;
  width: ${({ full }) => (full ? '100%' : 'calc(50% - 5px)')};
  padding: 15px;
  border-radius: 10px;
  cursor: pointer;
  opacity: 0.8;
  transition: 0.3s;

  background-color: ${({ background }) => background};

  &:hover {
    opacity: 1;
  }

  @media screen and (max-width: 600px) {
    width: 100%;
  }
`

export const DisclosureMethodIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;

  svg {
    font-size: 36px;

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
