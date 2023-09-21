import {
  IoAppsOutline,
  IoSettingsOutline,
  IoPersonOutline
} from 'react-icons/io5'

import {
  StartAdminView,
  TablesAdminView,
  AnalyticsAdminView,
  MyAccountAdminView,
  SettingsAdminView
} from '@/pages/Admin/Views'

const menusData = [
  {
    menuId: 'menu_home',
    menuLabel: 'Pedidos',
    menuIcon: <IoAppsOutline />,
    menuRender: <StartAdminView />,
    menuHidden: false
  },
  {
    menuId: 'menu_tables',
    menuLabel: 'Mesas',
    menuIcon: <IoAppsOutline />,
    menuRender: <TablesAdminView />,
    menuHidden: false
  },
  {
    menuId: 'menu_analytics',
    menuLabel: 'Relatórios',
    menuIcon: <IoAppsOutline />,
    menuRender: <AnalyticsAdminView />,
    menuHidden: false
  },
  {
    menuId: 'menu_settings',
    menuLabel: 'Configurações',
    menuIcon: <IoSettingsOutline />,
    menuRender: <SettingsAdminView />,
    menuHidden: true
  },
  {
    menuId: 'menu_account',
    menuLabel: 'Minha conta',
    menuIcon: <IoAppsOutline />,
    menuRender: <MyAccountAdminView />,
    menuHidden: true
  }
]

const privateMenusData = [
  {
    menuId: 'menu_settings',
    menuLabel: 'Configurações',
    menuIcon: <IoSettingsOutline />,
    menuRender: <SettingsAdminView />,
    menuHidden: false
  },
  {
    menuId: 'menu_account',
    menuLabel: 'Minha conta',
    menuIcon: <IoPersonOutline />,
    menuRender: <MyAccountAdminView />,
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
