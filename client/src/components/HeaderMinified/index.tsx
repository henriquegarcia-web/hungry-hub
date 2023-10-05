import { useNavigate } from 'react-router-dom'
import { useState, useMemo, useRef } from 'react'

import * as S from './styles'
import {
  IoSunnyOutline,
  IoMoonOutline,
  IoMenuOutline,
  IoCloseOutline
} from 'react-icons/io5'

import { Logo } from '@/components'
import { Avatar, Button, Dropdown, Spin, Switch, theme } from 'antd'

import { formatUsername } from '@/utils/functions/formatUsername'
import useClickOutside from '@/hooks/useClickOutside'

import { IMenuPrivate, privateMenusData } from '@/data/menus'

import { IUserData } from '@/@types/Auth'
import { ThemeProps } from '@/contexts/AdminContext'
import type { MenuProps } from 'antd'

interface IHeaderMinified {
  userData: IUserData | null
  adminTheme: ThemeProps
  handleChangeTheme: (checked: boolean) => void
  handleLogout: () => void
}

const HeaderMinified = ({
  userData,
  adminTheme,
  handleChangeTheme,
  handleLogout
}: IHeaderMinified) => {
  const { token } = theme.useToken()

  const navigate = useNavigate()

  const [menuMobileIsOpen, setMenuMobileIsOpen] = useState<boolean>(false)

  const toggleMenuMobile = () => setMenuMobileIsOpen(!menuMobileIsOpen)

  const menuMobileRef = useRef(null)

  // ------------------------------------------------------------------

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
    <S.HeaderMinified>
      <S.HeaderMinifiedWrapper
        style={{ backgroundColor: token.colorBgContainer }}
      >
        <S.HeaderMinifiedLogo
          style={{ backgroundColor: token.colorBgContainer }}
        >
          <Logo type={adminTheme === 'default' ? 'default' : 'dark'} />
        </S.HeaderMinifiedLogo>

        <S.HeaderMinifiedMenu
          style={{ backgroundColor: token.colorBgContainer }}
        >
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
        </S.HeaderMinifiedMenu>
        <S.HeaderMinifiedUserMenu
          style={{ backgroundColor: token.colorBgContainer }}
        >
          <Dropdown
            menu={{
              items: formattedPrivateMenus,
              onClick: (e) => {
                if (e.key === 'sair') {
                  handleLogout()
                  return
                }
                navigate(`/admin/${e.key}`)
              }
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
        </S.HeaderMinifiedUserMenu>

        {/* ============================== HEADER MOBILE ============================== */}

        <S.HeaderMinifiedMobileToggle onClick={toggleMenuMobile}>
          {menuMobileIsOpen ? (
            <IoCloseOutline style={{ color: token.colorTextHeading }} />
          ) : (
            <IoMenuOutline style={{ color: token.colorTextHeading }} />
          )}
        </S.HeaderMinifiedMobileToggle>
      </S.HeaderMinifiedWrapper>

      <S.HeaderMinifiedMobile
        open={menuMobileIsOpen ? 1 : 0}
        style={{ backgroundColor: token.colorBgContainer }}
        ref={menuMobileRef}
      >
        <S.UserMenuMobile
          style={{ borderColor: token.colorBgContainerDisabled }}
          onClick={() => {
            navigate('/admin/minha-conta')
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
        <S.HeaderMinifiedPrivateMenu>
          <Button
            onClick={() => {
              navigate('/admin/minha-conta')
              setMenuMobileIsOpen(false)
            }}
          >
            Minha conta
          </Button>
          <Button danger onClick={handleLogout}>
            Sair
          </Button>
        </S.HeaderMinifiedPrivateMenu>
      </S.HeaderMinifiedMobile>
    </S.HeaderMinified>
  )
}

export default HeaderMinified
