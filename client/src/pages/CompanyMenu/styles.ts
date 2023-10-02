import styled from 'styled-components'
import { Window } from '@/utils/styles/globals'

interface IOpenLabel {
  open: number
}

export const CompanyMenu = styled(Window)`
  justify-content: center;
  padding: 20px;
`

export const Menu = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
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

  border: 2px solid white;
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

  font-size: 12px;
  line-height: 12px;
  font-weight: 400;

  background-color: green;
  color: white;
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
`

export const MenuMainInfosDescription = styled.p`
  display: flex;

  font-size: 13px;
  line-height: 13px;
  font-weight: 400;
`

export const MenuMainInfosLocation = styled.p`
  display: flex;

  font-size: 13px;
  line-height: 13px;
  font-weight: 300;
`

export const MenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
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
`

// =============================================== MAIN MENU LIST

// ---------------------- CATEGORY

export const MenuCategory = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
`

export const MenuCategoryHeader = styled.h3`
  display: flex;

  font-size: 15px;
  line-height: 15px;
  font-weight: 500;
`

export const MenuCategoryWrapper = styled.div`
  display: flex;
`

// ---------------------- PRODUCT

export const MenuProduct = styled.div`
  display: flex;
  column-gap: 10px;
  width: 100%;
  padding: 10px;
  border-radius: 8px;

  border: 1px solid rgba(0, 0, 0, 0.1);
`

export const MenuProductImage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  padding: 8px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
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
    line-height: 14px;
    font-weight: 500;
  }

  p {
    font-size: 14px;
    line-height: 16px;
    font-weight: 400;
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
