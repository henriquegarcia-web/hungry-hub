import styled from 'styled-components'
import {
  View,
  Window,
  adminHeaderHeight,
  responsiveDesktop,
  responsiveTablet
} from '@/utils/styles/globals'

interface IAdmin {
  color: string
  background: string
  hasannouncement: number
}

interface IPremiumAnnouncement {
  opened: number
}

interface IHeaderMobile {
  open: number
  hasannouncement: number
}

// ========================================== ADMIN

export const Admin = styled(Window)<IAdmin>`
  display: flex;
  flex-direction: column;
  transition: 0.3s;

  padding-top: ${({ hasannouncement }) => (hasannouncement ? '50px' : '0px')};

  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    -webkit-background-clip: text;
    -webkit-text-fill-color: ${({ color }) => color};
    transition: background-color 5000s ease-in-out 0s;
    box-shadow: inset 0 0 20px 20px ${({ background }) => background};
  }
`

export const AdminContent = styled.section`
  display: flex;
  width: 100%;
  height: fit-content;
  padding-top: ${adminHeaderHeight};
`

export const PremiumAnnouncement = styled.div<IPremiumAnnouncement>`
  z-index: 1001;
  position: fixed;
  top: ${({ opened }) => (opened ? '0px' : '-100%')};
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  column-gap: 15px;
  width: 100%;
  height: 50px;
  padding: 0 15px;
  transition: 0.3s;

  p {
    font-size: 13px;
    line-height: 16px;
    font-weight: 400;

    color: white;
  }

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
    cursor: pointer;

    background-color: transparent;

    svg {
      font-size: 22px;

      color: white;
    }
  }
`

// ========================================== ADMIN MENU

export const AdminHeader = styled.header`
  z-index: 1001;
  position: fixed;
  display: flex;
  width: 100%;
  height: ${adminHeaderHeight};
`

export const AdminHeaderWrapper = styled.div`
  z-index: 1001;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  column-gap: 15px;
  width: 100%;
  height: 100%;
  padding: 0 15px;

  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
`

export const AdminHeaderLogo = styled.div`
  display: flex;

  width: fit-content;
  height: 100%;
`

export const AdminHeaderNavigation = styled.nav`
  display: flex;
  flex: 1;
  width: fit-content;
  height: 100%;

  @media screen and (max-width: ${responsiveDesktop}) {
    display: none;
  }
`

export const AdminHeaderPremiumWrapper = styled.div`
  margin: auto 0;

  @media screen and (max-width: ${responsiveDesktop}) {
    margin-left: auto;
  }

  @media screen and (max-width: ${responsiveTablet}) {
    display: none;
  }
`

export const AdminHeaderPremiumStatus = styled.div`
  display: flex;
  align-items: center;
  column-gap: 8px;
  width: fit-content;
  height: fit-content;
  border-radius: 100px;
  padding: 5px 12px 5px 5px;
  /* margin: auto 0; */

  background-color: #fff6e6;

  .ant-btn-primary {
    display: flex;
    justify-content: center;
    align-items: center;

    .ant-btn-icon {
      margin-bottom: -1px;
      font-size: 16px;
    }
  }

  p {
    display: flex;
    flex: 1;

    font-size: 13px;
    line-height: 14px;
    font-weight: 600;

    color: #ff7a00;
  }

  /* @media screen and (max-width: ${responsiveDesktop}) {
    margin-left: auto;
  }

  @media screen and (max-width: ${responsiveTablet}) {
    display: none;
  } */
`

export const AdminHeaderPremium = styled.div`
  display: flex;
  align-items: center;
  width: fit-content;
  height: 100%;

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
  /* 
  @media screen and (max-width: ${responsiveDesktop}) {
    margin-left: auto;
  }

  @media screen and (max-width: ${responsiveTablet}) {
    display: none;
  } */
`

export const AdminHeaderMenu = styled.div`
  position: relative;
  display: flex;
  column-gap: 10px;
  width: fit-content;
  height: 100%;
  padding: 0 15px;
  margin-left: auto;

  @media screen and (max-width: ${responsiveDesktop}) {
    margin-left: 0;
  }

  @media screen and (max-width: ${responsiveTablet}) {
    margin-left: auto;
  }
`

export const SwitchTheme = styled.div`
  display: flex;
  align-items: center;
  column-gap: 10px;
  width: fit-content;
  height: 100%;
`

export const SwitchThemeLabel = styled.p`
  display: flex;
  align-items: center;
  column-gap: 4px;
  width: fit-content;

  font-size: 14px;

  svg {
    &:nth-of-type(1) {
      font-size: 16px;
    }

    &:nth-of-type(2) {
      font-size: 14px;
    }
  }
`

export const AdminHeaderUserMenu = styled.div`
  display: flex;
  width: fit-content;
  height: 100%;

  @media screen and (max-width: ${responsiveTablet}) {
    display: none;
  }
`

export const UserMenu = styled.div`
  display: flex;
  align-items: center;
  column-gap: 10px;
  cursor: pointer;

  &:hover {
    p {
      opacity: 1;
    }
  }
`

export const UserMenuName = styled.p`
  display: flex;
  transition: 0.3s;
  opacity: 0.8;

  font-size: 14px;
`

export const AdminHeaderMobileToggle = styled.div`
  display: none;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  margin: auto 0;
  cursor: pointer;

  svg {
    font-size: 26px;

    color: rgba(0, 0, 0, 0.8);
  }

  @media screen and (max-width: ${responsiveDesktop}) {
    display: flex;
  }
`

export const AdminHeaderMobile = styled.div<IHeaderMobile>`
  z-index: 1000;
  position: absolute;
  top: ${adminHeaderHeight};
  right: ${({ open }) => (open ? '0' : '-260px')};
  width: 260px;
  height: ${({ hasannouncement }) =>
    hasannouncement ? 'calc(100vh - 95px)' : 'calc(100vh - 45px)'};
  display: none;
  flex-direction: column;
  row-gap: 15px;
  padding: 15px;
  transition: 0.3s;

  background-color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  @media screen and (max-width: ${responsiveDesktop}) {
    display: flex;
  }
`

export const AdminHeaderPremiumStatusMobile = styled.div`
  display: none;
  align-items: center;
  column-gap: 8px;
  width: 100%;
  height: fit-content;
  border-radius: 100px;
  padding: 5px;

  background-color: #fff6e6;

  .ant-btn-primary {
    display: flex;
    justify-content: center;
    align-items: center;

    .ant-btn-icon {
      margin-bottom: -1px;
      font-size: 16px;
    }
  }

  p {
    display: flex;
    flex: 1;

    font-size: 13px;
    line-height: 14px;
    font-weight: 600;
    letter-spacing: 0.5px;

    color: #ff7a00;
  }

  @media screen and (max-width: ${responsiveTablet}) {
    display: flex;
  }
`

export const AdminHeaderPremiumMobile = styled.div`
  display: none;
  align-items: center;
  width: 100%;
  height: fit-content;

  .ant-btn-primary {
    display: flex;
    align-items: center;
    width: 100%;

    .ant-btn-icon {
      margin-right: 5px !important;
      font-size: 17px;
    }
  }

  @media screen and (max-width: ${responsiveTablet}) {
    display: flex;
  }
`

export const UserMenuMobile = styled.div`
  display: none;
  justify-content: center;
  align-items: center;
  column-gap: 10px;
  cursor: pointer;
  width: 100%;
  padding: 10px;
  border-radius: 10px;

  border: 1px solid rgba(0, 0, 0, 0.08);

  &:hover {
    p {
      opacity: 1;
    }
  }

  @media screen and (max-width: ${responsiveTablet}) {
    display: flex;
  }
`

export const AdminHeaderPrivateMenu = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  row-gap: 10px;
  margin-top: auto;
`

// ========================================== ADMIN SUPPORT VIEWS

export const AdminLoadingView = styled(View)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - ${adminHeaderHeight});
`

export const AdminNotFoundView = styled(View)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 12px;

  height: calc(100vh - ${adminHeaderHeight});

  img {
    width: 140px;
    margin-bottom: 20px;
  }

  b {
    font-size: 20px;
    line-height: 20px;
    font-weight: 600;
  }

  p {
    font-size: 14px;
    line-height: 14px;
    font-weight: 300;
  }
`

// ==========================================

export const AdminFloatSupport = styled.div`
  position: fixed;
  right: 15px;
  bottom: 15px;
  display: flex;
  height: fit-content;
`

interface IAdminSupportFloatButton {
  opened: number
}

export const AdminFloatButton = styled.div<IAdminSupportFloatButton>`
  position: relative;
  display: flex;
  align-items: center;
  column-gap: 8px;
  width: fit-content;
  height: fit-content;
  padding: 5px 14px 5px 5px;
  border-radius: 100px;

  overflow: hidden;
  transition: 0.3s;

  padding-right: ${({ opened }) => (opened ? '130px' : '5px')};

  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);

  p {
    position: absolute;
    white-space: nowrap;
    cursor: pointer;
    transition: 0.3s;

    font-size: 14px;
    line-height: 14px;

    right: ${({ opened }) => (opened ? '14px' : '-120px')};

    a {
      transition: 0.3s;
    }

    &:hover {
      a {
        color: black !important;
      }
    }
  }
`

export const AdminFloatButtonIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  border-radius: 100%;
  cursor: pointer;

  svg {
    position: absolute;
    transition: 0.3s;
  }

  .support_icon_opened {
    opacity: 1;
  }

  .support_icon_minify {
    opacity: 0;
    font-size: 16px;
  }

  &:hover {
    svg {
      color: black !important;
    }

    .support_icon_opened {
      opacity: 0;
    }

    .support_icon_minify {
      opacity: 1;
    }
  }
`
