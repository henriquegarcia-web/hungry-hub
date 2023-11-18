import styled from 'styled-components'
import {
  View,
  adminViewInfosWrapper,
  responsiveMobile
} from '@/utils/styles/globals'
import { Form } from 'antd'

export const CompanyInfos = styled(View)`
  display: flex;
  justify-content: center;
  padding: 20px;
`

export const CompanyInfosWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  width: 100%;
  max-width: ${adminViewInfosWrapper};
  height: fit-content;
`

// ========================================== COMPANY BASE CONTROLS

export const CompanyBaseControls = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  width: 100%;
  height: fit-content;
`

export const CompanySettingsMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  border-radius: 10px;

  border: 1px solid lightgrey;

  p {
    font-size: 14px;
    line-height: 14px;
    font-weight: 500;

    b {
      font-weight: 800;
    }
  }
`

// ========================================== INFO CONTAINER

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: fit-content;
  overflow: hidden;

  border-radius: 10px;
`

export const InfoContainerHeader = styled.div`
  display: flex;
  align-items: center;
  column-gap: 8px;
  padding: 15px;
`

export const InfoContainerHeaderIcon = styled.div`
  display: flex;

  svg {
    font-size: 18px;
  }
`

export const InfoContainerHeaderLabel = styled.h2`
  display: flex;
  flex: 1;

  font-size: 17px;
  line-height: 17px;
  font-weight: 500;
`

export const InfoContainerHeaderIncomplete = styled.h2`
  display: flex;
`

export const InfoContainerContent = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 15px;
`

export const InfoContainerLoading = styled.div`
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

export const FormFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-top: 10px;
`

// ========================================== MAIN INFOS CONTAINER

export const MainInfosForm = styled(Form)`
  display: flex;
  flex-direction: column;
  row-gap: 15px;
  width: 100%;

  .ant-form-item {
    margin-bottom: 0px;
  }
`

export const MainInfosImagesContainer = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 10px;

  .ant-upload {
    overflow: hidden;
  }

  .ant-upload-wrapper {
    width: fit-content;
  }

  .company_banner {
    display: flex;
    flex: 1;

    & .ant-upload {
      width: 100% !important;
    }
  }

  /* @media screen and (max-width: ${responsiveMobile}) {
    flex-direction: column;
    column-gap: 10px;

    .company_banner {
      width: 100%;
    }
  } */
`

export const MainInfosFormFooter = styled(FormFooter)``

// ========================================== LOCATION CONTAINER

export const LocationForm = styled(Form)`
  display: flex;
  flex-direction: column;
  row-gap: 15px;
  width: 100%;

  .ant-form-item {
    margin-bottom: 0px;
  }
`

export const LocationFormFooter = styled(FormFooter)``

// ========================================== CONTACT CONTAINER

export const ContactForm = styled(Form)`
  display: flex;
  flex-direction: column;
  row-gap: 15px;
  width: 100%;

  .ant-form-item {
    margin-bottom: 0px;
  }

  .icon_large {
    font-size: 20px;
    margin-right: 5px;
    color: rgba(0, 0, 0, 0.8);
  }

  .label {
    margin-left: 5px;
    color: rgba(0, 0, 0, 0.4);
  }
`

export const ContactFormFooter = styled(FormFooter)``

// ========================================== SCHEDULES CONTAINER

export const ScheduleForm = styled(Form)`
  display: flex;
  flex-direction: column;
  row-gap: 15px;
  width: 100%;

  .ant-form-item {
    margin-bottom: 0px;
  }

  .ant-select-selector {
    border-radius: 6px !important;
  }
`

export const ScheduleFormDesktop = styled.div`
  display: flex;
  width: 100%;

  @media screen and (max-width: ${responsiveMobile}) {
    display: none;
  }
`

export const ScheduleFormMobile = styled.div`
  display: none;

  @media screen and (max-width: ${responsiveMobile}) {
    display: flex;
    flex-direction: column;
    row-gap: 10px;
  }
`

export const SchedulesSelected = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 6px;
  width: 100%;
`

export const SchedulesSelectedHeader = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 4px;
`

export const SchedulesSelectedEmpty = styled.p`
  color: rgba(0, 0, 0, 0.6);
`

export const ScheduleSelectedItem = styled.div`
  display: flex;
  width: 100%;
  column-gap: 15px;
  border-radius: 6px;
  padding: 6px 10px;

  background-color: rgba(0, 0, 0, 0.04);
`

export const ScheduleSelectedItemLabel = styled.div`
  display: flex;
  align-items: center;
  flex: 1;

  p {
    font-size: 12px;

    b {
      font-weight: 500;
    }
  }
`

export const ScheduleSelectedItemExclude = styled.p`
  display: flex;
  cursor: pointer;

  font-size: 13px;

  color: #ff7a00;
`

export const ScheduleFormFooter = styled(FormFooter)``

// ========================================== MENU SETTINGS CONTAINER

export const MenuSettingsContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
`
