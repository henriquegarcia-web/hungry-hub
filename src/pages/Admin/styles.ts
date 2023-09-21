import styled from 'styled-components'
import { Window, adminHeaderHeight } from '@/utils/styles/globals'

// ========================================== ADMIN

export const Admin = styled(Window)`
  display: flex;
  flex-direction: column;
`

export const AdminContent = styled.section`
  display: flex;
  width: 100%;
  height: calc(100% - ${adminHeaderHeight});
  padding: 20px;
`

// ========================================== ADMIN MENU

export const AdminHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  column-gap: 15px;
  width: 100%;
  height: ${adminHeaderHeight};
  padding: 0 20px;

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
`

export const AdminHeaderMenu = styled.div`
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
