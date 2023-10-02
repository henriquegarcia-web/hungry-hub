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
  LiaEnvelope,
  LiaFacebook,
  LiaInstagram,
  LiaLaptopSolid
} from 'react-icons/lia'

import { formatCurrency } from '@/utils/functions/formatCurrency'
import { handleFindMenuByCompanyId } from '@/firebase/company'
import { useMenu } from '@/contexts/MenuContext'

import { ICategory, ICompanyContactMethods, ICompanyData } from '@/@types/Auth'

const CompanyMenu = () => {
  const params = useParams()
  const { companyId } = params

  const { categories } = useMenu()

  const [menuData, setMenuData] = useState(null)
  const [menuDataLoading, setMenuDataLoading] = useState(false)

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

  return (
    <S.CompanyMenu>
      {menuDataLoading ? (
        <>Loading</>
      ) : menuData ? (
        <Menu menuData={menuData} categories={categories} />
      ) : (
        <>Este cardápio não existe ou não está disponível publicamente</>
      )}
    </S.CompanyMenu>
  )
}

export default CompanyMenu

// =========================================== MENU

interface IMenu {
  menuData: ICompanyData
  categories: ICategory[]
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

const Menu = ({ menuData, categories }: IMenu) => {
  const companyLocation = useMemo(() => {
    const companyAddress = menuData.companyLocation?.companyAddress
    const companyAddressNumber = menuData.companyLocation?.companyAddressNumber
    const companyDistrict = menuData.companyLocation?.companyDistrict
    const companyCity = menuData.companyLocation?.companyCity

    const formattedCompanyLocation = `${companyAddress}, ${companyAddressNumber}, ${companyDistrict} - ${companyCity}`

    return formattedCompanyLocation
  }, [menuData])

  const isStoreOpen = useMemo(() => {
    if (!menuData.companySchedules) return false
    const companySchedules: any = menuData.companySchedules

    const currentDate = new Date()

    const currentDay = currentDate
      .toLocaleDateString('pt-BR', { weekday: 'long' })
      .toLowerCase()

    const mappedCurrentDay = mapDay(currentDay)

    const currentTime = currentDate.toISOString()

    const schedule = companySchedules.find(
      (schedule: IScheduleItem) => mapDay(schedule.day) === mappedCurrentDay
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
            {menuData.companyBanner ? (
              <img src={menuData.companyBanner} alt="" />
            ) : (
              <img src="/default_menu_banner.png" alt="" />
            )}
          </S.MenuMainInfosBanner>
          <S.MenuMainInfosLogo>
            {menuData.companyLogo ? (
              <img src={menuData.companyLogo} alt="" />
            ) : (
              <IoStorefrontOutline />
            )}
          </S.MenuMainInfosLogo>
          <S.MenuMainInfosLinks>
            <MenuContactMethods contactMethods={menuData.companyContacts} />
          </S.MenuMainInfosLinks>
          <S.MenuMainInfosOpenLabel open={isStoreOpen ? 1 : 0}>
            {isStoreOpen ? 'Aberta' : 'Fechada'}
          </S.MenuMainInfosOpenLabel>
        </S.MenuMainInfosBannerWrapper>
        <S.MenuMainInfosWrapper>
          <S.MenuMainInfosName>{menuData.companyName}</S.MenuMainInfosName>
          <S.MenuMainInfosDescription>
            {menuData.companyDescription}
          </S.MenuMainInfosDescription>
          <S.MenuMainInfosLocation>{companyLocation}</S.MenuMainInfosLocation>
        </S.MenuMainInfosWrapper>
      </S.MenuMainInfos>
      <S.MenuWrapper>
        <MenuListBlock listIcon={<IoReceiptOutline />} listTitle="Cardápio">
          <MainMenuList categories={categories} />
        </MenuListBlock>
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
}

const MainMenuList = ({ categories }: IMainMenuList) => {
  return (
    <>
      {categories?.map((category) => (
        <S.MenuCategory key={category.id}>
          <S.MenuCategoryHeader>{category.name}</S.MenuCategoryHeader>
          <S.MenuCategoryWrapper>
            {category.products.map((product) => (
              <S.MenuProduct key={product.productId}>
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
            ))}
          </S.MenuCategoryWrapper>
        </S.MenuCategory>
      ))}
    </>
  )
}

// =============================================== CONTACTS METHOD LIST

interface IMenuContactMethods {
  contactMethods?: ICompanyContactMethods
}

const MenuContactMethods = ({ contactMethods }: IMenuContactMethods) => {
  return (
    <S.MenuContactMethods>
      {contactMethods?.companyFacebook && (
        <S.ContactMethod>
          <LiaFacebook />
        </S.ContactMethod>
      )}
      {contactMethods?.companyInstagram && (
        <S.ContactMethod>
          <LiaInstagram />
        </S.ContactMethod>
      )}
      {contactMethods?.companyWhatsapp && (
        <S.ContactMethod>
          <LiaWhatsapp />
        </S.ContactMethod>
      )}
      {contactMethods?.companyWebsite && (
        <S.ContactMethod>
          <LiaLaptopSolid />
        </S.ContactMethod>
      )}
      {contactMethods?.companyPhone && (
        <S.ContactMethod>
          <LiaPhoneAltSolid />
        </S.ContactMethod>
      )}
    </S.MenuContactMethods>
  )
}
