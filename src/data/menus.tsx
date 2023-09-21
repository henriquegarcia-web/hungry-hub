import {
  IoStorefrontOutline,
  IoRestaurantOutline,
  IoMegaphoneOutline,
  IoPieChartOutline,
  IoPersonOutline,
  IoExitOutline
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
    menuId: 'menu_company_infos',
    menuLabel: 'Estabelecimento',
    menuIcon: <IoStorefrontOutline />,
    menuRender: <CompanyInfosAdminView />,
    menuDisabled: false,
    menuHidden: false
  },
  {
    menuId: 'menu_menu',
    menuLabel: 'Cardápio',
    menuIcon: <IoRestaurantOutline />,
    menuRender: <MenuAdminView />,
    menuDisabled: false,
    menuHidden: false
  },
  {
    menuId: 'menu_disclosure',
    menuLabel: 'Divulgação',
    menuIcon: <IoMegaphoneOutline />,
    menuRender: <DisclosureAdminView />,
    menuDisabled: false,
    menuHidden: false
  },
  {
    menuId: 'menu_analytics',
    menuLabel: 'Relatórios',
    menuIcon: <IoPieChartOutline />,
    menuRender: <ReportsAdminView />,
    menuDisabled: false,
    menuHidden: false
  },
  {
    menuId: 'menu_account',
    menuLabel: 'Minha conta',
    menuIcon: <IoPersonOutline />,
    menuRender: <AccountAdminView />,
    menuDisabled: false,
    menuHidden: true
  }
]

const privateMenusData = [
  {
    menuId: 'menu_account',
    menuLabel: 'Minha conta',
    menuIcon: <IoPersonOutline />,
    menuDisabled: false,
    menuDanger: false
  },
  {
    menuId: 'menu_exit',
    menuLabel: 'Sair',
    menuIcon: <IoExitOutline />,
    menuDisabled: false,
    menuDanger: true
  }
]

export interface IMenu {
  menuId: string
  menuLabel: string
  menuIcon: any
  menuRender: React.ReactNode
  menuDisabled: boolean
  menuHidden: boolean
}

export interface IMenuPrivate {
  menuId: string
  menuLabel: string
  menuIcon: any
  menuDisabled: boolean
  menuDanger: boolean
}

export { menusData, privateMenusData }
