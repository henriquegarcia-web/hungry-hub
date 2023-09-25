import styled, { createGlobalStyle } from 'styled-components'

import Colors from './colors'
// import Fonts from "../styles/fonts";

export const responsiveDesktop = '1000px'
export const responsiveTablet = '760px'
export const responsiveMobile = '480px'

export const adminMenuWidth = '260px'
export const adminHeaderHeight = '45px'
export const adminViewHeader = '50px'

export const adminViewDisclosureWrapper = '600px'
export const adminViewInfosWrapper = '600px'
export const adminViewMenuWrapper = '800px'

const GlobalStyle = createGlobalStyle`
  :root {
    font-size: 14px;

    @media screen and (min-width: 1024px) {
      font-size: 16px;
    }
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    border: none;
    outline: none;
    font-family: 'Roboto', sans-serif;
    /* font-family: 'Rubik', sans-serif; */
    text-decoration: none;
    user-select: none;
  }

  scroll-behavior: smooth;

  body {
    /* background-color: blue; */
  }

  // ------------------------- SCROLL BAR

  ::-webkit-scrollbar {
    width: 10px;
    z-index: 1000;
  }

  ::-webkit-scrollbar-track {
    background: ${Colors.primary};
  }

  ::-webkit-scrollbar-thumb {
    background: ${Colors.elementPrimary};
    border-radius: 10px;
  }

  .ant-picker-time-panel-column, .ant-input {
    &::-webkit-scrollbar {
      width: 3px;
      z-index: 1000;
    }

    &::-webkit-scrollbar-track {
      background: rgba(0, 0, 0, 0.1);
      border-radius: 10px;
    }

    &::-webkit-scrollbar-thumb {
      background: #ff7a00;
      border-radius: 10px;
    }
  }
`

export default GlobalStyle

export const Window = styled.main`
  display: flex;
  width: 100%;
  height: 100vh;
`

export const View = styled.section`
  display: flex;
  width: 100%;
  height: fit-content;
`
