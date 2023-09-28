import styled from 'styled-components'
import Colors from '@/utils/styles/colors'

export const AuthContainer = styled.div`
  z-index: 100;
  display: flex;
  flex-direction: column;
  row-gap: 25px;
  width: 100%;
  max-width: 300px;
  padding: 20px;
  border-radius: 10px;

  box-shadow: 0 0 25px rgba(0, 0, 0, 0.25);
  background-color: #04020f;
`

export const AuthContainerHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 10px;
  width: 100%;

  img {
    width: 165px;
  }

  span {
    font-size: 15px;
    line-height: 15px;
    font-weight: 600;
    letter-spacing: 1px;
    text-transform: uppercase;

    color: rgba(255, 255, 255, 0.6);
  }
`

export const AuthContainerContent = styled.div`
  display: flex;
`
