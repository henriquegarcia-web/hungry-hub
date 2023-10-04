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
}

interface IHeaderMobile {
  open: number
}

// ========================================== ADMIN

export const Admin = styled(Window)<IAdmin>`
  display: flex;
  flex-direction: column;

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

  @media screen and (max-width: ${responsiveDesktop}) {
    display: none;
  }
`

export const AdminHeaderMenu = styled.div`
  position: relative;
  display: flex;
  column-gap: 10px;
  width: fit-content;
  height: 100%;
  padding: 0 15px;
  margin-left: auto;
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
  height: calc(100vh - ${adminHeaderHeight});
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
  justify-content: center;
  align-items: center;
  height: calc(100vh - ${adminHeaderHeight});
`
