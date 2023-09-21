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

  /* border: 1px solid red; */
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

  /* border: 1px solid blue; */
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
`

export const AdminHeaderLogo = styled.div`
  display: flex;
  width: fit-content;
  height: 100%;

  /* border: 1px solid orange; */
`

export const AdminHeaderNavigation = styled.nav`
  display: flex;
  flex: 1;
  /* border: 1px solid orange; */
`

export const AdminHeaderUserMenu = styled.div`
  display: flex;
  width: fit-content;
  height: 100%;
  margin-left: auto;

  /* border: 1px solid orange; */
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
