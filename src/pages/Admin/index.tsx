import { useState, useMemo, useEffect } from 'react'

import * as S from './styles'

import { Logo } from '@/components'
import { Avatar, Dropdown, Menu, message } from 'antd'
import type { MenuProps } from 'antd'

import { useAdminAuth } from '@/contexts/AdminAuthContext'

import { formatUsername } from '@/utils/functions/formatUsername'
import { IMenu, IMenuPrivate, menusData, privateMenusData } from '@/data/menus'

const mockedUsername = 'Henrique Pereira Garcia'

// ========================================== ADMIN

const Admin = () => {
  const { handleLogout } = useAdminAuth()

  // ------------------------------------------------------------------

  const [activeMenu, setActiveMenu] = useState('')

  const handleSelectMenu = (key: string) => {
    setActiveMenu(key)
  }

  const handleSelectPrivateMenu = ({ key }: { key: string }) => {
    if (key === 'menu_exit') {
      handleLogout()
      return
    }
    handleSelectMenu(key)
  }

  // ------------------------------------------------------------------

  return (
    <S.Admin>
      <AdminHeader
        activeMenu={activeMenu}
        handleSelectMenu={handleSelectMenu}
        handleSelectPrivateMenu={handleSelectPrivateMenu}
      />
      <S.AdminContent></S.AdminContent>
    </S.Admin>
  )
}

export default Admin

// ========================================== ADMIN MENU

interface IAdminHeader {
  activeMenu: string
  handleSelectMenu: (key: string) => void
  handleSelectPrivateMenu: MenuProps['onClick']
}

const AdminHeader = ({
  activeMenu,
  handleSelectMenu,
  handleSelectPrivateMenu
}: IAdminHeader) => {
  // ------------------------------------------------------------------

  useEffect(() => {
    handleSelectMenu('menu_company_infos')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // ------------------------------------------------------------------

  const formattedMenus: MenuProps['items'] = useMemo(() => {
    const transformedMenus = menusData.map((menu: IMenu) => {
      if (menu.menuHidden) return null

      return {
        label: menu.menuLabel,
        key: menu.menuId,
        icon: null,
        disabled: menu.menuDisabled
      }
    })

    return transformedMenus
  }, [])

  const formattedPrivateMenus: MenuProps['items'] = useMemo(() => {
    const transformedMenus = privateMenusData.map((menu: IMenuPrivate) => {
      return {
        label: menu.menuLabel,
        key: menu.menuId,
        icon: menu.menuIcon,
        disabled: menu.menuDisabled,
        danger: menu.menuDanger
      }
    })

    return transformedMenus
  }, [])

  return (
    <S.AdminHeader>
      <S.AdminHeaderLogo>
        <Logo type="default" />
      </S.AdminHeaderLogo>
      <S.AdminHeaderNavigation>
        <Menu
          onClick={(e) => handleSelectMenu(e.key)}
          selectedKeys={[activeMenu]}
          mode="horizontal"
          items={formattedMenus}
          style={{ border: 'none', width: '100%', fontSize: 13 }}
        />
      </S.AdminHeaderNavigation>
      <S.AdminHeaderUserMenu>
        <Dropdown
          menu={{
            items: formattedPrivateMenus,
            onClick: handleSelectPrivateMenu
          }}
        >
          <S.UserMenu>
            <S.UserMenuName>{mockedUsername}</S.UserMenuName>
            <Avatar
              size={30}
              style={{
                fontSize: 12,
                backgroundColor: '#fde3cf',
                color: '#f56a00'
              }}
            >
              {formatUsername(mockedUsername)}
            </Avatar>
          </S.UserMenu>
        </Dropdown>
      </S.AdminHeaderUserMenu>
    </S.AdminHeader>
  )
}
