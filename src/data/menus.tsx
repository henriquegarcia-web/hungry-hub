import {
  IoAppsOutline,
  IoSettingsOutline,
  IoPersonOutline
} from 'react-icons/io5'

import {
  CompanyInfosAdminView,
  MenuAdminView,
  ReportsAdminView,
  AccountAdminView,
  DisclosureAdminView
} from '@/pages/Admin/Views'

const menusData = [
  {
    menuId: 'menu_home',
    menuLabel: 'Estabelecimento',
    menuIcon: <IoAppsOutline />,
    menuRender: <CompanyInfosAdminView />,
    menuHidden: false
  },
  {
    menuId: 'menu_tables',
    menuLabel: 'Cardápio',
    menuIcon: <IoAppsOutline />,
    menuRender: <MenuAdminView />,
    menuHidden: false
  },
  {
    menuId: 'menu_settings',
    menuLabel: 'Divulgação',
    menuIcon: <IoAppsOutline />,
    menuRender: <DisclosureAdminView />,
    menuHidden: true
  },
  {
    menuId: 'menu_analytics',
    menuLabel: 'Relatórios',
    menuIcon: <IoAppsOutline />,
    menuRender: <ReportsAdminView />,
    menuHidden: false
  }
]

const privateMenusData = [
  {
    menuId: 'menu_account',
    menuLabel: 'Minha conta',
    menuIcon: <IoPersonOutline />,
    menuRender: <AccountAdminView />,
    menuHidden: false
  }
]

export interface IMenu {
  menuId: string
  menuLabel: string
  menuIcon: any
  menuRender: React.ReactNode
  menuHidden: boolean
}

export { menusData, privateMenusData }
