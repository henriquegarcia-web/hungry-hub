import { useState, useMemo, useEffect, useRef } from 'react'

import * as S from './styles'
import {
  IoSunnyOutline,
  IoMoonOutline,
  IoMenuOutline,
  IoCloseOutline
} from 'react-icons/io5'

import { Logo } from '@/components'
import { Avatar, Button, Dropdown, Menu, Spin, Switch, theme } from 'antd'

import type { MenuProps } from 'antd'

import { useAdminAuth } from '@/contexts/AdminAuthContext'
import { ThemeProps, useAdmin } from '@/contexts/AdminContext'

import { formatUsername } from '@/utils/functions/formatUsername'
import useClickOutside from '@/hooks/useClickOutside'

import { IMenu, IMenuPrivate, menusData, privateMenusData } from '@/data/menus'
import { IUserData } from '@/@types/Auth'

const { useToken } = theme

// ========================================== ADMIN

const Admin = () => {
  const { token } = useToken()
  const { userData, handleLogout, companyHasAllDataFilledIn } = useAdminAuth()
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

  useEffect(() => {
    if (activeMenu === '' && !!userData) {
      if (companyHasAllDataFilledIn) {
        setActiveMenu('menu_menu')
      } else {
        setActiveMenu('menu_company_infos')
      }
    }
  }, [userData, activeMenu, companyHasAllDataFilledIn])

  let viewToRender

  if (userData === null) {
    viewToRender = (
      <S.AdminLoadingView>
        <Spin />
      </S.AdminLoadingView>
    )
  } else {
    const activeMenuItem = menusData.find(
      (menuItem) => menuItem.menuId === activeMenu
    )

    viewToRender = activeMenuItem ? (
      activeMenuItem.menuRender
    ) : (
      <S.AdminNotFoundView>Tela não encontrada</S.AdminNotFoundView>
    )
  }

  return (
    <S.Admin
      style={{ backgroundColor: token.colorBgElevated }}
      color={token.colorText}
      background={token.colorBgContainer}
    >
      <AdminHeader
        userData={userData}
        adminTheme={adminTheme}
        activeMenu={activeMenu}
        handleSelectMenu={handleSelectMenu}
        handleSelectPrivateMenu={handleSelectPrivateMenu}
        handleChangeTheme={handleChangeTheme}
        handleLogout={handleLogout}
      />
      <S.AdminContent>{viewToRender}</S.AdminContent>
    </S.Admin>
  )
}

export default Admin

// ========================================== ADMIN MENU

interface IAdminHeader {
  userData: IUserData | null
  adminTheme: ThemeProps
  activeMenu: string
  handleSelectMenu: (key: string) => void
  handleSelectPrivateMenu: MenuProps['onClick']
  handleChangeTheme: (checked: boolean) => void
  handleLogout: () => void
}

const AdminHeader = ({
  userData,
  adminTheme,
  activeMenu,
  handleSelectMenu,
  handleSelectPrivateMenu,
  handleChangeTheme,
  handleLogout
}: IAdminHeader) => {
  const { token } = useToken()

  const [menuMobileIsOpen, setMenuMobileIsOpen] = useState<boolean>(false)

  const toggleMenuMobile = () => setMenuMobileIsOpen(!menuMobileIsOpen)

  const menuMobileRef = useRef(null)

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

  useClickOutside({
    active: menuMobileIsOpen,
    containerRef: menuMobileRef,
    onClickOutside: () => setMenuMobileIsOpen(false)
  })

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
                {!userData ? 'Carregando...' : userData?.adminName}
              </S.UserMenuName>
              <Avatar
                size={30}
                style={{
                  fontSize: 12,
                  backgroundColor: '#fde3cf',
                  color: '#f56a00'
                }}
              >
                {!userData ? (
                  <Spin size="small" style={{ marginTop: '-4px' }} />
                ) : (
                  formatUsername(userData?.adminName)
                )}
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
        ref={menuMobileRef}
      >
        <S.UserMenuMobile
          style={{ borderColor: token.colorBgContainerDisabled }}
          onClick={() => {
            handleSelectMenu('menu_account')
            setMenuMobileIsOpen(false)
          }}
        >
          <S.UserMenuName style={{ color: token.colorText }}>
            {userData?.adminName}
          </S.UserMenuName>
          <Avatar
            size={30}
            style={{
              fontSize: 12,
              backgroundColor: '#fde3cf',
              color: '#f56a00'
            }}
          >
            {formatUsername(userData?.adminName || '')}
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
          <Button danger onClick={handleLogout}>
            Sair
          </Button>
        </S.AdminHeaderPrivateMenu>
      </S.AdminHeaderMobile>
    </S.AdminHeader>
  )
}
