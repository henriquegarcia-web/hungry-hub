import { useParams } from 'react-router-dom'
import { useCallback, useEffect, useMemo, useState } from 'react'

import * as S from './styles'
import {
  IoStorefrontOutline,
  IoRestaurantOutline,
  IoReceiptOutline
} from 'react-icons/io5'
import {
  LiaPhoneAltSolid,
  LiaWhatsapp,
  LiaFacebook,
  LiaInstagram,
  LiaLaptopSolid
} from 'react-icons/lia'

import { formatCurrency } from '@/utils/functions/formatCurrency'
import { handleFindMenuByCompanyId } from '@/firebase/company'

import {
  ICategory,
  ICompanyContactMethods,
  ICompanyData,
  IProduct
} from '@/@types/Auth'
import { Drawer, Spin, message } from 'antd'
import { Logo } from '@/components'

const CompanyMenu = () => {
  const params = useParams()
  const { companyId } = params

  const [openDrawerProduct, setOpenDrawerProduct] = useState<boolean>(false)
  const [drawerProductDetails, setDrawerProductDetails] =
    useState<IProduct | null>(null)

  const [menuData, setMenuData] = useState<ICompanyData | null>(null)
  const [menuDataLoading, setMenuDataLoading] = useState<boolean>(false)

  const getMenuData = useCallback(async () => {
    if (!companyId) return

    setMenuDataLoading(true)
    const menuDataResponse = await handleFindMenuByCompanyId(companyId)

    setMenuData(menuDataResponse)
    setMenuDataLoading(false)
  }, [companyId])

  useEffect(() => {
    getMenuData()
  }, [getMenuData])

  const categories: ICategory[] = useMemo(() => {
    if (!menuData?.companyMenu) return []

    const companyMenu: any = menuData?.companyMenu
    const companyArray: ICategory[] = Object.keys(companyMenu).map((key) => ({
      id: key,
      ...companyMenu[key]
    }))

    return companyArray || []
  }, [menuData])

  const showDrawerProduct = (product: IProduct) => {
    setDrawerProductDetails(product)
    setOpenDrawerProduct(true)
  }

  const onCloseDrawerProduct = () => {
    setOpenDrawerProduct(false)
  }

  return (
    <S.CompanyMenu>
      <S.CompanyMenuWrapper>
        {menuDataLoading ? (
          <S.CompanyMenuLoading>
            <Spin />
            <p>Carregando o cardápio ...</p>
          </S.CompanyMenuLoading>
        ) : menuData && menuData.companyActive ? (
          <Menu
            menuData={menuData}
            categories={categories}
            showDrawerProduct={showDrawerProduct}
          />
        ) : (
          <S.CompanyMenuNotFound>
            <a href="https://www.hungryhub.com.br/">
              <img src="/logo_large_default.png" alt="" />
            </a>
            <p>Este cardápio não existe ou não está disponível publicamente</p>
          </S.CompanyMenuNotFound>
        )}

        <Drawer
          title="Detalhes do produto"
          headerStyle={{ padding: 15 }}
          bodyStyle={{ padding: 15 }}
          placement="right"
          onClose={onCloseDrawerProduct}
          open={openDrawerProduct}
          afterOpenChange={(open) => {
            if (!open) {
              setDrawerProductDetails(null)
            }
          }}
        >
          <S.DrawerProductContainer>
            <S.DrawerProductImage>
              <img src={drawerProductDetails?.productImage} alt="" />
              <S.DrawerProductPrice>
                {formatCurrency(drawerProductDetails?.productPrice || 0)}
              </S.DrawerProductPrice>
            </S.DrawerProductImage>
            <S.DrawerProductTitle>
              {drawerProductDetails?.productName}
            </S.DrawerProductTitle>
            <S.DrawerProductDescription>
              {drawerProductDetails?.productDescription}
            </S.DrawerProductDescription>
          </S.DrawerProductContainer>
        </Drawer>
      </S.CompanyMenuWrapper>
    </S.CompanyMenu>
  )
}

export default CompanyMenu

// =========================================== MENU

interface IMenu {
  menuData: ICompanyData | null
  categories: ICategory[]
  showDrawerProduct: (product: IProduct) => void
}

interface IScheduleItem {
  day: string
  openTime: string
  closeTime: string
}

const mapDay = (day: string): string => {
  const daysMap: { [key: string]: string } = {
    'segunda-feira': 'segunda_feira',
    'terça-feira': 'terca_feira',
    'quarta-feira': 'quarta_feira',
    'quinta-feira': 'quinta_feira',
    'sexta-feira': 'sexta_feira',
    sábado: 'sabado',
    domingo: 'domingo'
  }

  return daysMap[day] || day
}

const Menu = ({ menuData, categories, showDrawerProduct }: IMenu) => {
  const companyLocation = useMemo(() => {
    const companyAddress = menuData?.companyLocation?.companyAddress || ''
    const companyAddressNumber =
      menuData?.companyLocation?.companyAddressNumber || ''
    const companyDistrict = menuData?.companyLocation?.companyDistrict || ''
    const companyCity = menuData?.companyLocation?.companyCity || ''

    const formattedCompanyLocation = `${companyAddress}, ${companyAddressNumber}, ${companyDistrict} - ${companyCity}`

    return formattedCompanyLocation
  }, [menuData])

  const isStoreOpen = useMemo(() => {
    if (!menuData?.companySchedules) return false
    const companySchedules: any = menuData?.companySchedules

    const currentDate = new Date()
    const currentDay = currentDate
      .toLocaleDateString('pt-BR', { weekday: 'long' })
      .toLowerCase()
    const mappedCurrentDay = mapDay(currentDay)
    const currentTime = currentDate.toISOString()

    const schedule = companySchedules.find(
      (schedule: IScheduleItem) =>
        schedule.day === 'todos' || mapDay(schedule.day) === mappedCurrentDay
    )

    if (schedule) {
      const openTime = new Date(schedule.openTime)
      const closeTime = new Date(schedule.closeTime)

      if (
        currentTime >= openTime.toISOString() &&
        currentTime <= closeTime.toISOString()
      ) {
        return true
      }
    }

    return false
  }, [menuData])

  return (
    <S.Menu>
      <S.MenuMainInfos>
        <S.MenuMainInfosBannerWrapper>
          <S.MenuMainInfosBanner>
            {menuData?.companyBanner ? (
              <img src={menuData?.companyBanner} alt="" />
            ) : (
              <img src="/default_menu_banner.png" alt="" />
            )}
          </S.MenuMainInfosBanner>
          <S.MenuMainInfosLogo>
            {menuData?.companyLogo ? (
              <img src={menuData?.companyLogo} alt="" />
            ) : (
              <IoStorefrontOutline />
            )}
          </S.MenuMainInfosLogo>
          <S.MenuMainInfosLinks>
            <MenuContactMethods contactMethods={menuData?.companyContacts} />
          </S.MenuMainInfosLinks>
          <S.MenuMainInfosOpenLabel open={isStoreOpen ? 1 : 0}>
            {isStoreOpen ? 'Aberta' : 'Fechada'}
          </S.MenuMainInfosOpenLabel>
        </S.MenuMainInfosBannerWrapper>
        <S.MenuMainInfosWrapper>
          <S.MenuMainInfosName>{menuData?.companyName}</S.MenuMainInfosName>
          <S.MenuMainInfosDescription>
            {menuData?.companyDescription}
          </S.MenuMainInfosDescription>
          <S.MenuMainInfosLocation>{companyLocation}</S.MenuMainInfosLocation>
        </S.MenuMainInfosWrapper>
      </S.MenuMainInfos>
      <S.MenuWrapper>
        {categories.length > 0 && (
          <MenuListBlock listIcon={<IoReceiptOutline />} listTitle="Cardápio">
            <MainMenuList
              categories={categories}
              showDrawerProduct={showDrawerProduct}
            />
          </MenuListBlock>
        )}
      </S.MenuWrapper>
    </S.Menu>
  )
}

// =============================================== MENU LIST BLOCK

interface IMenuListBlock {
  listIcon: React.ReactNode
  listTitle: string
  children: React.ReactNode
}

const MenuListBlock = ({ listIcon, listTitle, children }: IMenuListBlock) => {
  return (
    <S.MenuListBlock>
      <S.MenuListBlockHeader>
        <span>{listIcon}</span>
        <h2>{listTitle}</h2>
      </S.MenuListBlockHeader>
      <S.MenuListBlockList>{children}</S.MenuListBlockList>
    </S.MenuListBlock>
  )
}

// =============================================== MAIN MENU LIST

interface IMainMenuList {
  categories: ICategory[]
  showDrawerProduct: (product: IProduct) => void
}

const MainMenuList = ({ categories, showDrawerProduct }: IMainMenuList) => {
  return (
    <>
      {categories?.map((category) => {
        if (!category.active) return null

        return (
          <S.MenuCategory key={category.id}>
            <S.MenuCategoryHeader>{category.name}</S.MenuCategoryHeader>
            <S.MenuCategoryWrapper>
              {category.products.map((product) => {
                if (!product.productActive) return null

                return (
                  <S.MenuProduct
                    key={product.productId}
                    onClick={() => showDrawerProduct(product)}
                  >
                    <S.MenuProductImage>
                      {product.productImage ? (
                        <img src={product.productImage} alt="" />
                      ) : (
                        <IoRestaurantOutline />
                      )}
                    </S.MenuProductImage>
                    <S.MenuProductDetails>
                      <b>{product.productName} </b>
                      <p>{product.productDescription} </p>
                    </S.MenuProductDetails>
                    <S.MenuProductPrice>
                      {formatCurrency(product.productPrice)}
                    </S.MenuProductPrice>
                  </S.MenuProduct>
                )
              })}
            </S.MenuCategoryWrapper>
          </S.MenuCategory>
        )
      })}
    </>
  )
}

// =============================================== CONTACTS METHOD LIST

interface IMenuContactMethods {
  contactMethods?: ICompanyContactMethods
}

const MenuContactMethods = ({ contactMethods }: IMenuContactMethods) => {
  const whatsappLink = `https://wa.me/${contactMethods?.companyWhatsapp}?text=Ol%C3%A1%21+Vim+atrav%C3%A9s+do+card%C3%A1pio+online...`

  const handleCall = () => {
    const phone = contactMethods?.companyPhone

    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      window.location.href = `tel:${phone}`
    } else {
      message.open({
        type: 'warning',
        content: 'Este recurso só está disponível em dispositivos móveis.'
      })
    }
  }

  return (
    <S.MenuContactMethods>
      {contactMethods?.companyFacebook && (
        <S.ContactMethod href={contactMethods?.companyFacebook}>
          <LiaFacebook />
        </S.ContactMethod>
      )}
      {contactMethods?.companyInstagram && (
        <S.ContactMethod href={contactMethods?.companyInstagram}>
          <LiaInstagram />
        </S.ContactMethod>
      )}
      {contactMethods?.companyWhatsapp && (
        <S.ContactMethod href={whatsappLink}>
          <LiaWhatsapp />
        </S.ContactMethod>
      )}
      {contactMethods?.companyWebsite && (
        <S.ContactMethod href={contactMethods?.companyWebsite}>
          <LiaLaptopSolid />
        </S.ContactMethod>
      )}
      {contactMethods?.companyPhone && (
        <S.ContactMethod onClick={handleCall}>
          <LiaPhoneAltSolid />
        </S.ContactMethod>
      )}
    </S.MenuContactMethods>
  )
}
