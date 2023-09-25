import styled from 'styled-components'
import {
  Window,
  adminHeaderHeight,
  responsiveDesktop,
  responsiveTablet
} from '@/utils/styles/globals'

interface IHeaderMobile {
  open: number
}

// ========================================== ADMIN

export const Admin = styled(Window)`
  display: flex;
  flex-direction: column;
`

export const AdminContent = styled.section`
  display: flex;
  width: 100%;
  height: calc(100% - ${adminHeaderHeight});

  overflow: auto;

  &::-webkit-scrollbar {
    width: 5px;
    z-index: 1000;
  }

  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.15);
  }

  &::-webkit-scrollbar-thumb {
    background: #ff7a00;
    border-radius: 10px;
  }
`

// ========================================== ADMIN MENU

export const AdminHeader = styled.header`
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
  row-gap: 5px;
  margin-top: auto;
`
