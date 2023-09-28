import { useState, useMemo, useEffect } from 'react'

import * as S from './styles'
import {
  IoSunnyOutline,
  IoMoonOutline,
  IoMenuOutline,
  IoCloseOutline
} from 'react-icons/io5'

import { Logo } from '@/components'
import { Avatar, Button, Dropdown, Menu, Switch, theme } from 'antd'

import type { MenuProps } from 'antd'

import { useAdminAuth } from '@/contexts/AdminAuthContext'
import { ThemeProps, useAdmin } from '@/contexts/AdminContext'

import { formatUsername } from '@/utils/functions/formatUsername'
import { IMenu, IMenuPrivate, menusData, privateMenusData } from '@/data/menus'

const { useToken } = theme

const mockedUsername = 'Henrique Pereira Garcia'

// ========================================== ADMIN

const Admin = () => {
  const { token } = useToken()
  const { handleLogout } = useAdminAuth()
  const { adminTheme, toogleThemeDark } = useAdmin()

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

  const handleChangeTheme = (checked: boolean) => {
    toogleThemeDark(checked)
  }

  // ------------------------------------------------------------------

  const viewToRender = getComponentByMenuId(activeMenu)

  return (
    <S.Admin style={{ backgroundColor: token.colorBgElevated }}>
      <AdminHeader
        adminTheme={adminTheme}
        activeMenu={activeMenu}
        handleSelectMenu={handleSelectMenu}
        handleSelectPrivateMenu={handleSelectPrivateMenu}
        handleChangeTheme={handleChangeTheme}
      />
      <S.AdminContent>{viewToRender}</S.AdminContent>
    </S.Admin>
  )
}

export default Admin

// ========================================== ADMIN VIEWS

const getComponentByMenuId = (menuId: string) => {
  for (const menuItem of menusData) {
    if (menuItem.menuId === menuId) {
      return menuItem.menuRender
    }
  }

  return <div>View not found</div>
}

// ========================================== ADMIN MENU

interface IAdminHeader {
  adminTheme: ThemeProps
  activeMenu: string
  handleSelectMenu: (key: string) => void
  handleSelectPrivateMenu: MenuProps['onClick']
  handleChangeTheme: (checked: boolean) => void
}

const AdminHeader = ({
  adminTheme,
  activeMenu,
  handleSelectMenu,
  handleSelectPrivateMenu,
  handleChangeTheme
}: IAdminHeader) => {
  const { token } = useToken()

  const [menuMobileIsOpen, setMenuMobileIsOpen] = useState<boolean>(false)

  const toggleMenuMobile = () => setMenuMobileIsOpen(!menuMobileIsOpen)

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
      <S.AdminHeaderWrapper style={{ backgroundColor: token.colorBgContainer }}>
        <S.AdminHeaderLogo style={{ backgroundColor: token.colorBgContainer }}>
          <Logo type={adminTheme === 'default' ? 'default' : 'dark'} />
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
        <S.AdminHeaderMenu style={{ backgroundColor: token.colorBgContainer }}>
          <S.SwitchTheme>
            <S.SwitchThemeLabel style={{ color: token.colorText }}>
              <IoSunnyOutline />
              /
              <IoMoonOutline />
            </S.SwitchThemeLabel>
            <Switch
              size="small"
              checked={adminTheme === 'dark'}
              onChange={handleChangeTheme}
            />
          </S.SwitchTheme>
        </S.AdminHeaderMenu>
        <S.AdminHeaderUserMenu
          style={{ backgroundColor: token.colorBgContainer }}
        >
          <Dropdown
            menu={{
              items: formattedPrivateMenus,
              onClick: handleSelectPrivateMenu
            }}
          >
            <S.UserMenu>
              <S.UserMenuName style={{ color: token.colorText }}>
                {mockedUsername}
              </S.UserMenuName>
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

        {/* ============================== HEADER MOBILE ============================== */}

        <S.AdminHeaderMobileToggle onClick={toggleMenuMobile}>
          {menuMobileIsOpen ? (
            <IoCloseOutline style={{ color: token.colorTextHeading }} />
          ) : (
            <IoMenuOutline style={{ color: token.colorTextHeading }} />
          )}
        </S.AdminHeaderMobileToggle>
      </S.AdminHeaderWrapper>
      <S.AdminHeaderMobile
        open={menuMobileIsOpen ? 1 : 0}
        style={{ backgroundColor: token.colorBgContainer }}
      >
        <S.UserMenuMobile
          style={{ borderColor: token.colorBgContainerDisabled }}
          onClick={() => {
            handleSelectMenu('menu_account')
            setMenuMobileIsOpen(false)
          }}
        >
          <S.UserMenuName style={{ color: token.colorText }}>
            {mockedUsername}
          </S.UserMenuName>
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
        </S.UserMenuMobile>
        <Menu
          onClick={(e) => {
            handleSelectMenu(e.key)
            setMenuMobileIsOpen(false)
          }}
          selectedKeys={[activeMenu]}
          mode="vertical"
          items={formattedMenus}
          style={{ border: 'none', width: '100%', fontSize: 13 }}
        />
        <S.AdminHeaderPrivateMenu>
          <Button
            onClick={() => {
              handleSelectMenu('menu_account')
              setMenuMobileIsOpen(false)
            }}
          >
            Minha conta
          </Button>
          <Button danger>Sair</Button>
        </S.AdminHeaderPrivateMenu>
      </S.AdminHeaderMobile>
    </S.AdminHeader>
  )
}
