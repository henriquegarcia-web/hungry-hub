import styled from 'styled-components'
import Colors from '@/utils/styles/colors'

export const Logo = styled.div`
  font-family: 'Rubik', sans-serif;

  font-size: 16px;
  font-weight: 800;
  letter-spacing: 0.5px;

  color: ${Colors.primary};

  span {
    border-radius: 5px;
    padding: 3px 5px 2px 5px;
    margin-left: 2px;

    font-family: 'Rubik', sans-serif;
    font-size: 15px;
    line-height: 15px;
    font-weight: 800;

    background-color: ${Colors.elementPrimary};
    color: ${Colors.textSecondary};
  }
`
