import styled from 'styled-components'
import { Window, responsiveMobile } from '@/utils/styles/globals'

interface IOpenLabel {
  open: number
}

export const CompanyMenu = styled(Window)``

export const CompanyMenuWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
  height: fit-content;
  padding: 20px;
  overflow: hidden;

  @media screen and (max-width: ${responsiveMobile}) {
    padding-bottom: 60px;
  }
`

export const Menu = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  width: 100%;
  max-width: 580px;
  height: fit-content;
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.15);
`

export const MenuMainInfos = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 15px;
`

export const MenuMainInfosBannerWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
`

export const MenuMainInfosBanner = styled.div`
  display: flex;

  width: 100%;
  height: 140px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

export const MenuMainInfosLogo = styled.div`
  position: absolute;
  top: 100%;
  transform: translateY(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 80px;
  border-radius: 100%;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  svg {
    font-size: 32px;
    color: rgb(80, 80, 80);
  }

  border: 4px solid white;
  background-color: rgb(245, 245, 245);
`

export const MenuMainInfosLinks = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
`

export const MenuMainInfosOpenLabel = styled.div<IOpenLabel>`
  position: absolute;
  bottom: 10px;
  left: 50%;
  margin-left: 45px;
  display: flex;
  padding: 4px 8px;
  border-radius: 4px;

  font-size: 11px;
  line-height: 11px;
  font-weight: 500;

  background-color: ${({ open }) =>
    open ? 'rgba(34, 204, 0, 0.7)' : 'rgba(230, 31, 0, 0.7)'};
  color: white;
  border: 1px solid
    ${({ open }) => (open ? 'rgba(34, 204, 0, 1)' : 'rgba(230, 31, 0, 1)')};
`

export const MenuMainInfosWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 8px;
  padding-top: 50px;
`

export const MenuMainInfosName = styled.h1`
  display: flex;

  font-size: 17px;
  line-height: 17px;
  font-weight: 600;
  text-align: center;
`

export const MenuMainInfosDescription = styled.p`
  display: flex;

  font-size: 13px;
  line-height: 16px;
  font-weight: 400;
  text-align: center;
`

export const MenuMainInfosLocation = styled.p`
  display: flex;

  font-size: 13px;
  line-height: 13px;
  font-weight: 300;
  text-align: center;
`

export const MenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

export const MenuLoading = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

  background-color: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(2px);
`

export const DrawerProductContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
`

export const DrawerProductImage = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  /* height: 180px; */
  border-radius: 8px;
  margin-bottom: 10px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  border: 1px solid rgba(0, 0, 0, 0.1);
`

export const DrawerProductPrice = styled.div`
  position: absolute;
  right: 10px;
  bottom: 10px;
  display: flex;
  padding: 8px 12px;
  border-radius: 6px;

  font-size: 15px;
  line-height: 15px;
  font-weight: 500;

  background-color: rgb(30, 30, 30);
  color: white;
`

export const DrawerProductTitle = styled.div`
  display: flex;

  font-size: 15px;
  line-height: 15px;
  font-weight: 500;
`

export const DrawerProductDescription = styled.div`
  display: flex;

  font-size: 14px;
  line-height: 17px;
  font-weight: 300;
`

// =============================================== MENU LIST BLOCK

export const MenuListBlock = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 15px;
  width: 100%;
  padding: 15px;
`

export const MenuListBlockHeader = styled.div`
  display: flex;
  align-items: center;
  column-gap: 3px;
  border-radius: 8px;
  padding: 8px;

  background-color: rgb(30, 30, 30);

  span {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;

    svg {
      font-size: 18px;

      color: white;
    }
  }

  h2 {
    display: flex;
    flex: 1;

    font-size: 14px;
    line-height: 14px;
    font-weight: 500;

    color: white;
  }
`

export const MenuListBlockList = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
`

// =============================================== MAIN MENU LIST

// ---------------------- CATEGORY

export const MenuCategory = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 12px;
`

export const MenuCategoryHeader = styled.h3`
  display: flex;

  font-size: 15px;
  line-height: 15px;
  font-weight: 500;
`

export const MenuCategoryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 6px;
`

// ---------------------- PRODUCT

export const MenuProduct = styled.div`
  display: flex;
  column-gap: 10px;
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  transition: 0.3s;
  cursor: pointer;

  border: 1px solid rgba(0, 0, 0, 0.1);

  &:hover {
    border: 1px solid rgba(0, 0, 0, 0.15);
    background-color: rgba(0, 0, 0, 0.05);
  }
`

export const MenuProductImage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  border-radius: 8px;
  padding: 4px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 6px;
  }

  svg {
    margin-left: 2px;
    font-size: 26px;
    color: rgb(80, 80, 80);
  }

  background-color: rgb(245, 245, 245);
`

export const MenuProductDetails = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  row-gap: 5px;

  b {
    font-size: 14px;
    font-weight: 500;

    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    line-height: 16px;
    max-height: 16px;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }

  p {
    font-size: 14px;
    font-weight: 400;

    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    line-height: 16px;
    max-height: 32px;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
`

export const MenuProductPrice = styled.div`
  display: flex;

  font-size: 14px;
  line-height: 14px;
  font-weight: 500;
`

// =============================================== CONTACTS METHOD LIST

export const MenuContactMethods = styled.div`
  display: flex;
  column-gap: 5px;
`

export const ContactMethod = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 28px;
  height: 28px;
  border-radius: 100%;
  cursor: pointer;
  transition: 0.3s;

  svg {
    font-size: 18px;

    color: white;
  }

  background-color: rgba(30, 30, 30, 0.85);

  &:hover {
    background-color: rgba(30, 30, 30, 1);
  }
`
