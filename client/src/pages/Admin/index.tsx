import { Link, useNavigate, useParams } from 'react-router-dom'
import { useState, useMemo, useRef } from 'react'

import * as S from './styles'
import {
  IoSunnyOutline,
  IoMoonOutline,
  IoMenuOutline,
  IoCloseOutline,
  IoDiamondOutline,
  IoChevronBackOutline,
  IoChevronForwardOutline
} from 'react-icons/io5'
import { BsQuestionCircle } from 'react-icons/bs'

import { Logo } from '@/components'
import { Avatar, Button, Dropdown, Menu, Spin, Switch, theme } from 'antd'

import { useAdminAuth } from '@/contexts/AdminAuthContext'
import { useAdmin } from '@/contexts/AdminContext'

import { formatUsername } from '@/utils/functions/formatUsername'
import useClickOutside from '@/hooks/useClickOutside'

import { IMenu, IMenuPrivate, menusData, privateMenusData } from '@/data/menus'
import { IUserData, AdminTheme } from '@/@types/Auth'
import type { MenuProps } from 'antd'

// ========================================== ADMIN

const Admin = () => {
  const { token } = theme.useToken()

  const navigate = useNavigate()
  const params = useParams()
  const { viewId } = params

  const { userData, handleLogout, isAdminPremium } = useAdminAuth()
  const {
    adminTheme,
    toogleThemeDark,
    showPremiumAnnouncement,
    handleClosePremiumAnnouncement
  } = useAdmin()

  // ------------------------------------------------------------------

  const handleChangeTheme = (checked: boolean) => {
    toogleThemeDark(checked)
  }

  // ------------------------------------------------------------------

  const viewNotFound = (
    <S.AdminNotFoundView>
      <img src="/view_not_found.svg" alt="" />
      <b style={{ color: token.colorText }}>Ooops!</b>
      <p style={{ color: token.colorText }}>Essa tela não foi encontrada.</p>
    </S.AdminNotFoundView>
  )

  const viewToRender = useMemo(() => {
    if (userData === null) {
      return (
        <S.AdminLoadingView>
          <Spin />
        </S.AdminLoadingView>
      )
    } else {
      if (!viewId) {
        navigate('/admin/estabelecimento')
        return
      }

      const activeMenuItem = menusData.find(
        (menuItem) => menuItem.menuId === viewId
      )

      return activeMenuItem ? activeMenuItem.menuRender : viewNotFound
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData, viewId, navigate])

  return (
    <S.Admin
      style={{ backgroundColor: token.colorBgElevated }}
      color={token.colorText}
      background={token.colorBgContainer}
      hasannouncement={showPremiumAnnouncement ? 1 : 0}
    >
      <S.PremiumAnnouncement
        opened={showPremiumAnnouncement ? 1 : 0}
        style={{ backgroundColor: token.colorPrimary }}
      >
        <p>
          Aproveite os benefícios do <b>Premium</b> com o{' '}
          <b>Acesso Vitalício</b>! Promoção por <b>tempo limitado</b>.
        </p>
        <button onClick={handleClosePremiumAnnouncement}>
          <IoCloseOutline />
        </button>
      </S.PremiumAnnouncement>

      <AdminHeader
        userData={userData}
        isAdminPremium={isAdminPremium}
        showPremiumAnnouncement={showPremiumAnnouncement}
        adminTheme={adminTheme}
        viewId={viewId || ''}
        handleChangeTheme={handleChangeTheme}
        handleLogout={handleLogout}
      />
      <S.AdminContent>{viewToRender}</S.AdminContent>

      <S.AdminFloatSupport>
        <AdminSupportFloatButton />
      </S.AdminFloatSupport>
    </S.Admin>
  )
}

export default Admin

// ========================================== SUPPORT INPUT

const AdminSupportFloatButton = () => {
  const { token } = theme.useToken()

  const [buttonMinified, setButtonMinified] = useState(true)

  const toogleSupportMinified = () => setButtonMinified(!buttonMinified)

  return (
    <S.AdminFloatButton
      opened={buttonMinified ? 1 : 0}
      style={{
        border: `1px solid ${token.colorBorder}`,
        backgroundColor: token.colorBgBase
      }}
    >
      <S.AdminFloatButtonIcon
        style={{
          border: `1px solid ${token.colorBorder}`,
          backgroundColor: token.colorBgElevated
        }}
        onClick={toogleSupportMinified}
      >
        <BsQuestionCircle
          style={{ color: token.colorTextSecondary }}
          className="support_icon_opened"
        />
        {!buttonMinified ? (
          <IoChevronBackOutline
            style={{ color: token.colorTextSecondary }}
            className="support_icon_minify"
          />
        ) : (
          <IoChevronForwardOutline
            style={{ color: token.colorTextSecondary }}
            className="support_icon_minify"
          />
        )}
      </S.AdminFloatButtonIcon>

      <p>
        <Link to="/admin/suporte" style={{ color: token.colorTextSecondary }}>
          Precisa de ajuda?
        </Link>
      </p>
    </S.AdminFloatButton>
  )
}

// ========================================== ADMIN MENU

interface IAdminHeader {
  userData: IUserData | null
  isAdminPremium: boolean
  showPremiumAnnouncement: boolean
  adminTheme: AdminTheme
  viewId: string
  handleChangeTheme: (checked: boolean) => void
  handleLogout: () => void
}

const AdminHeader = ({
  userData,
  isAdminPremium,
  showPremiumAnnouncement,
  adminTheme,
  viewId,
  handleChangeTheme,
  handleLogout
}: IAdminHeader) => {
  const { token } = theme.useToken()

  const navigate = useNavigate()

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
    <S.AdminHeader style={{ backgroundColor: token.colorBgContainer }}>
      <S.AdminHeaderWrapper style={{ backgroundColor: token.colorBgContainer }}>
        <S.AdminHeaderLogo style={{ backgroundColor: token.colorBgContainer }}>
          <Logo type={adminTheme === 'default' ? 'default' : 'dark'} />
        </S.AdminHeaderLogo>
        <S.AdminHeaderNavigation>
          <Menu
            onClick={(e) => navigate(`/admin/${e.key}`)}
            selectedKeys={[viewId]}
            mode="horizontal"
            items={formattedMenus}
            style={{
              border: 'none',
              width: '100%',
              fontSize: 13
            }}
          />
        </S.AdminHeaderNavigation>
        <S.AdminHeaderPremiumWrapper>
          {!!userData && (
            <>
              {isAdminPremium ? (
                <S.AdminHeaderPremiumStatus>
                  <Button
                    type="primary"
                    shape="circle"
                    icon={<IoDiamondOutline />}
                    size="small"
                  />
                  <p>Você é Premium</p>
                </S.AdminHeaderPremiumStatus>
              ) : (
                <S.AdminHeaderPremium>
                  <Button
                    type="primary"
                    shape="round"
                    icon={<IoDiamondOutline />}
                    onClick={() => navigate('/admin/obter-premium')}
                  >
                    Obter Premium
                  </Button>
                </S.AdminHeaderPremium>
              )}
            </>
          )}
        </S.AdminHeaderPremiumWrapper>
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
        hasannouncement={showPremiumAnnouncement ? 1 : 0}
        style={{ backgroundColor: token.colorBgContainer }}
        ref={menuMobileRef}
      >
        {!!userData && (
          <>
            {isAdminPremium ? (
              <S.AdminHeaderPremiumStatusMobile>
                <Button
                  type="primary"
                  shape="circle"
                  icon={<IoDiamondOutline />}
                  size="small"
                />
                <p>Você é Premium</p>
              </S.AdminHeaderPremiumStatusMobile>
            ) : (
              <S.AdminHeaderPremiumMobile>
                <Button
                  type="primary"
                  shape="round"
                  icon={<IoDiamondOutline />}
                  onClick={() => {
                    navigate('/admin/obter-premium')
                    setMenuMobileIsOpen(false)
                  }}
                >
                  Obter Premium
                </Button>
              </S.AdminHeaderPremiumMobile>
            )}
          </>
        )}
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
        <Menu
          onClick={(e) => {
            navigate(`/admin/${e.key}`)
            setMenuMobileIsOpen(false)
          }}
          selectedKeys={[viewId]}
          mode="vertical"
          items={formattedMenus}
          style={{ border: 'none', width: '100%', fontSize: 13 }}
        />
        <S.AdminHeaderPrivateMenu>
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
        </S.AdminHeaderPrivateMenu>
      </S.AdminHeaderMobile>
    </S.AdminHeader>
  )
}
