import { useEffect, useState } from 'react'

import * as S from './styles'
import {
  IoStorefrontOutline,
  IoLocationOutline,
  IoCallOutline,
  IoCalendarOutline
} from 'react-icons/io5'
import {
  LiaPhoneAltSolid,
  LiaWhatsapp,
  LiaEnvelope,
  LiaFacebook,
  LiaInstagram,
  LiaLaptopSolid
} from 'react-icons/lia'
import { PlusOutlined, InfoCircleOutlined } from '@ant-design/icons'

import ImgCrop from 'antd-img-crop'
import {
  Button,
  Form,
  Input,
  Select,
  Space,
  TimePicker,
  Tooltip,
  Upload,
  theme
} from 'antd'
import moment from 'moment'

import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface'
import type { UploadChangeParam } from 'antd/es/upload'

const { useToken } = theme

import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'

import {
  beforeUpload,
  getBase64,
  onPreview
} from '@/utils/functions/imageUpload'

const CompanyInfos = () => {
  return (
    <S.CompanyInfos>
      <S.CompanyInfosWrapper>
        <MainInfosContainer />
        <LocationContainer />
        <ContactContainer />
        <ScheduleContainer />
      </S.CompanyInfosWrapper>
    </S.CompanyInfos>
  )
}

export default CompanyInfos

// ========================================== INFO CONTAINER BASE

interface IInfoContainer {
  headerIcon: React.ReactNode
  headerLabel: string
  children: React.ReactNode
}

const InfoContainer = ({
  headerIcon,
  headerLabel,
  children
}: IInfoContainer) => {
  const { token } = useToken()

  return (
    <S.InfoContainer>
      <S.InfoContainerHeader
        style={{ backgroundColor: token.colorBgContainer }}
      >
        <S.InfoContainerHeaderIcon style={{ color: token.colorTextHeading }}>
          {headerIcon}
        </S.InfoContainerHeaderIcon>
        <S.InfoContainerHeaderLabel style={{ color: token.colorTextHeading }}>
          {headerLabel}
        </S.InfoContainerHeaderLabel>
      </S.InfoContainerHeader>
      <S.InfoContainerContent>{children}</S.InfoContainerContent>
    </S.InfoContainer>
  )
}

// ========================================== MAIN INFOS CONTAINER

interface IMainInfosContainer {}

const MainInfosContainer = ({}: IMainInfosContainer) => {
  const [companyImage, setCompanyImage] = useState<string>()
  const [companyBanner, setCompanyBanner] = useState<string>()

  const handleChangeCompanyImage: UploadProps['onChange'] = (
    info: UploadChangeParam<UploadFile>
  ) => {
    getBase64(info.file.originFileObj as RcFile, (url) => {
      setCompanyImage(url)
    })
  }

  const handleChangeCompanyBanner: UploadProps['onChange'] = (
    info: UploadChangeParam<UploadFile>
  ) => {
    getBase64(info.file.originFileObj as RcFile, (url) => {
      setCompanyBanner(url)
    })
  }

  return (
    <InfoContainer
      headerIcon={<IoStorefrontOutline />}
      headerLabel="Informações básicas"
    >
      <S.MainInfosForm layout="vertical">
        <S.MainInfosImagesContainer>
          <ImgCrop rotationSlider>
            <Upload
              name="company-image"
              listType="picture-card"
              showUploadList={false}
              beforeUpload={beforeUpload}
              onChange={handleChangeCompanyImage}
              onPreview={onPreview}
              className="company_image"
            >
              {companyImage ? (
                <img
                  src={companyImage}
                  alt="avatar"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8, fontSize: 13 }}>Ad. logo</div>
                </div>
              )}
            </Upload>
          </ImgCrop>
          <ImgCrop rotationSlider aspect={6 / 1}>
            <Upload
              name="company-banner"
              listType="picture-card"
              showUploadList={false}
              beforeUpload={beforeUpload}
              onChange={handleChangeCompanyBanner}
              onPreview={onPreview}
              className="company_banner"
            >
              {companyBanner ? (
                <img
                  src={companyBanner}
                  alt="avatar"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8, fontSize: 13 }}>Ad. banner</div>
                </div>
              )}
            </Upload>
          </ImgCrop>
        </S.MainInfosImagesContainer>
        <Form.Item label="Nome da empresa">
          <Input placeholder="Nome da empresa" />
        </Form.Item>
        <Form.Item label="ID da empresa">
          <Input placeholder="ID da empresa na URL" />
        </Form.Item>
        <Form.Item label="Descrição da empresa">
          <Input.TextArea
            placeholder="Descrição da empresa"
            rows={6}
            style={{ resize: 'none' }}
          />
        </Form.Item>
        <S.MainInfosFormFooter>
          <Button type="primary" disabled={true}>
            Salvar
          </Button>
        </S.MainInfosFormFooter>
      </S.MainInfosForm>
    </InfoContainer>
  )
}

// ========================================== LOCATION CONTAINER

interface ILocationContainer {}

const LocationContainer = ({}: ILocationContainer) => {
  return (
    <InfoContainer headerIcon={<IoLocationOutline />} headerLabel="Localização">
      <S.LocationForm layout="vertical">
        <Form.Item label="CEP">
          <Input
            placeholder="Número"
            style={{ width: '100%', maxWidth: '200px' }}
          />
        </Form.Item>
        <Form.Item label="Endereço completo">
          <Space.Compact style={{ width: '100%' }}>
            <Form.Item noStyle>
              <Input placeholder="Endereço" style={{ width: '75%' }} />
            </Form.Item>
            <Form.Item noStyle>
              <Input placeholder="Número" style={{ width: '25%' }} />
            </Form.Item>
          </Space.Compact>
        </Form.Item>
        <Form.Item>
          <Space.Compact style={{ width: '100%', columnGap: '10px' }}>
            <Form.Item label="Bairro" style={{ width: '50%' }}>
              <Input placeholder="Bairro" style={{ borderRadius: '6px' }} />
            </Form.Item>
            <Form.Item label="Cidade" style={{ width: '50%' }}>
              <Input placeholder="Cidade" style={{ borderRadius: '6px' }} />
            </Form.Item>
          </Space.Compact>
        </Form.Item>
        <S.LocationFormFooter>
          <Button type="primary" disabled={true}>
            Salvar
          </Button>
        </S.LocationFormFooter>
      </S.LocationForm>
    </InfoContainer>
  )
}

// ========================================== CONTACT CONTAINER

interface IContactContainer {}

const ContactContainer = ({}: IContactContainer) => {
  const { token } = useToken()

  const notRequiredMessage = 'Essa campo não irá aparecer se estiver vazio'

  const customTootip = (
    <Tooltip title={notRequiredMessage}>
      <InfoCircleOutlined
        style={{ fontSize: '14px', color: 'rgba(0,0,0,0.45)' }}
      />
    </Tooltip>
  )

  return (
    <InfoContainer
      headerIcon={<IoCallOutline />}
      headerLabel="Meios de contato"
    >
      <S.ContactForm
        layout="vertical"
        requiredMark={(label, info) =>
          info.required ? (
            label
          ) : (
            <>
              {label} <p className="label">(opcional)</p>
            </>
          )
        }
      >
        <Form.Item label="Telefone">
          <Input
            placeholder="Telefone comercial"
            prefix={
              <LiaPhoneAltSolid
                className="icon_large"
                style={{ color: token.colorTextPlaceholder }}
              />
            }
            suffix={customTootip}
          />
        </Form.Item>
        <Form.Item label="Whatsapp">
          <Input
            placeholder="Whatsapp comercial"
            prefix={
              <LiaWhatsapp
                className="icon_large"
                style={{ color: token.colorTextPlaceholder }}
              />
            }
            suffix={customTootip}
          />
        </Form.Item>
        <Form.Item label="E-mail">
          <Input
            placeholder="E-mail comercial"
            prefix={
              <LiaEnvelope
                className="icon_large"
                style={{ color: token.colorTextPlaceholder }}
              />
            }
            suffix={customTootip}
          />
        </Form.Item>
        <Form.Item label="Facebook">
          <Input
            placeholder="Facebook comercial"
            prefix={
              <LiaFacebook
                className="icon_large"
                style={{ color: token.colorTextPlaceholder }}
              />
            }
            suffix={customTootip}
          />
        </Form.Item>
        <Form.Item label="Instagram">
          <Input
            placeholder="Instagram comercial"
            prefix={
              <LiaInstagram
                className="icon_large"
                style={{ color: token.colorTextPlaceholder }}
              />
            }
            suffix={customTootip}
          />
        </Form.Item>
        <Form.Item label="Website">
          <Input
            placeholder="Website comercial"
            prefix={
              <LiaLaptopSolid
                className="icon_large"
                style={{ color: token.colorTextPlaceholder }}
              />
            }
            suffix={customTootip}
          />
        </Form.Item>
        <S.ContactFormFooter>
          <Button type="primary" disabled={true}>
            Salvar
          </Button>
        </S.ContactFormFooter>
      </S.ContactForm>
    </InfoContainer>
  )
}

// ========================================== SCHEDULES CONTAINER

const format = 'HH:mm'
const { Option } = Select

const mapDayToLabel = (day: string): string => {
  const dayMap: Record<string, string> = {
    segunda_feira: 'Segunda-feira',
    terça_feira: 'Terça-feira',
    quarta_feira: 'Quarta-feira',
    quinta_feira: 'Quinta-feira',
    sexta_feira: 'Sexta-feira',
    sabado: 'Sábado',
    domingo: 'Domingo',
    todos: 'Todos os dias'
  }
  return dayMap[day] || day
}

interface ScheduleItem {
  day: string
  openTime: moment.Moment
  closeTime: moment.Moment
}

interface IScheduleContainer {}

const ScheduleContainer = ({}: IScheduleContainer) => {
  const { token } = useToken()

  const [schedule, setSchedule] = useState<ScheduleItem[]>([])
  const { control, handleSubmit, watch, setValue, reset, formState } = useForm()
  const selectedDay = watch('day')

  const { isValid } = formState

  const onSubmit = (data: any) => {
    if (selectedDay === 'todos') {
      setSchedule([data])
    } else if (!schedule.some((item) => item.day === 'todos')) {
      if (!schedule.some((item) => item.day === data.day)) {
        setSchedule([...schedule, data])
      } else {
        console.log(`Dia ${data.day} já foi adicionado.`)
      }
    }
  }

  const handleRemove = (indexToRemove: number) => {
    const updatedSchedule = schedule.filter(
      (_, index) => index !== indexToRemove
    )
    setSchedule(updatedSchedule)
    if (
      updatedSchedule.length === 0 ||
      !updatedSchedule.some((item) => item.day === 'todos')
    ) {
      setValue('day', '')
    }

    reset()
  }

  const isAddButtonDisabled =
    schedule.some((item) => item.day === 'todos' || item.day === selectedDay) ||
    !isValid

  return (
    <InfoContainer headerIcon={<IoCalendarOutline />} headerLabel="Horários">
      <S.ScheduleForm layout="vertical" onFinish={handleSubmit(onSubmit)}>
        <ScheduleFormDesktop
          control={control}
          isAddButtonDisabled={isAddButtonDisabled}
        />
        <ScheduleFormMobile
          control={control}
          isAddButtonDisabled={isAddButtonDisabled}
        />

        <S.SchedulesSelected>
          <S.SchedulesSelectedHeader>
            Horários de atendimento
          </S.SchedulesSelectedHeader>
          {schedule.length !== 0 ? (
            <>
              {schedule.map((item, index) => (
                <S.ScheduleSelectedItem
                  key={index}
                  style={{ backgroundColor: token.colorBgContainer }}
                >
                  <S.ScheduleSelectedItemLabel>
                    <p>
                      <b>{mapDayToLabel(item.day)}</b> - Abre às{' '}
                      <b>{item.openTime?.format(format) || 'N/A'}</b> e fecha às{' '}
                      <b>{item.closeTime?.format(format) || 'N/A'}</b>
                    </p>
                  </S.ScheduleSelectedItemLabel>
                  <S.ScheduleSelectedItemExclude
                    onClick={() => handleRemove(index)}
                  >
                    Excluir
                  </S.ScheduleSelectedItemExclude>
                </S.ScheduleSelectedItem>
              ))}
            </>
          ) : (
            <S.SchedulesSelectedEmpty
              style={{ color: token.colorTextPlaceholder }}
            >
              Nenhum horário selecionado
            </S.SchedulesSelectedEmpty>
          )}
        </S.SchedulesSelected>
        <S.ScheduleFormFooter>
          <Button type="primary" disabled={true}>
            Salvar
          </Button>
        </S.ScheduleFormFooter>
      </S.ScheduleForm>
    </InfoContainer>
  )
}

// -----------------------------

interface IScheduleFormDesktop {
  control: any
  isAddButtonDisabled: boolean
}

const ScheduleFormDesktop = ({
  control,
  isAddButtonDisabled
}: IScheduleFormDesktop) => {
  return (
    <S.ScheduleFormDesktop>
      <Form.Item style={{ width: '100%' }}>
        <Space.Compact style={{ width: '100%', columnGap: '10px' }}>
          <Form.Item label="Dia" style={{ width: 'calc(50% - 32px)' }}>
            <Controller
              name="day"
              control={control}
              rules={{ required: 'Este campo é obrigatório' }}
              defaultValue=""
              render={({ field }) => (
                <Select {...field} placeholder="Selecione um período">
                  <Option value="segunda_feira">Segunda-feira</Option>
                  <Option value="terça_feira">Terça-feira</Option>
                  <Option value="quarta_feira">Quarta-feira</Option>
                  <Option value="quinta_feira">Quinta-feira</Option>
                  <Option value="sexta_feira">Sexta-feira</Option>
                  <Option value="sabado">Sábado</Option>
                  <Option value="domingo">Domingo</Option>
                  <Option value="todos">Todos os dias</Option>
                </Select>
              )}
            />
          </Form.Item>
          <Form.Item label="Abre às" style={{ width: '25%' }}>
            <Controller
              name="openTime"
              control={control}
              rules={{ required: 'Este campo é obrigatório' }}
              render={({ field }) => (
                <TimePicker
                  {...field}
                  format={format}
                  showNow={false}
                  placeholder="Horário"
                  style={{ width: '100%', borderRadius: '6px' }}
                />
              )}
            />
          </Form.Item>
          <Form.Item label="Fecha às" style={{ width: '25%' }}>
            <Controller
              name="closeTime"
              control={control}
              rules={{ required: 'Este campo é obrigatório' }}
              render={({ field }) => (
                <TimePicker
                  {...field}
                  format={format}
                  showNow={false}
                  placeholder="Horário"
                  style={{ width: '100%', borderRadius: '6px' }}
                />
              )}
            />
          </Form.Item>
          <Form.Item label=" ">
            <Button
              type="primary"
              htmlType="submit"
              icon={<PlusOutlined />}
              style={{ borderRadius: '6px' }}
              disabled={isAddButtonDisabled}
            />
          </Form.Item>
        </Space.Compact>
      </Form.Item>
    </S.ScheduleFormDesktop>
  )
}

interface IScheduleFormMobile {
  control: any
  isAddButtonDisabled: boolean
}

const ScheduleFormMobile = ({
  control,
  isAddButtonDisabled
}: IScheduleFormMobile) => {
  return (
    <S.ScheduleFormMobile>
      <Form.Item label="Dia" style={{ width: '100%' }}>
        <Controller
          name="day"
          control={control}
          rules={{ required: 'Este campo é obrigatório' }}
          defaultValue=""
          render={({ field }) => (
            <Select {...field} placeholder="Selecione um período">
              <Option value="segunda_feira">Segunda-feira</Option>
              <Option value="terça_feira">Terça-feira</Option>
              <Option value="quarta_feira">Quarta-feira</Option>
              <Option value="quinta_feira">Quinta-feira</Option>
              <Option value="sexta_feira">Sexta-feira</Option>
              <Option value="sabado">Sábado</Option>
              <Option value="domingo">Domingo</Option>
              <Option value="todos">Todos os dias</Option>
            </Select>
          )}
        />
      </Form.Item>
      <Form.Item>
        <Space.Compact style={{ width: '100%', columnGap: '10px' }}>
          <Form.Item label="Abre às" style={{ width: 'calc(50% - 16px)' }}>
            <Controller
              name="openTime"
              control={control}
              rules={{ required: 'Este campo é obrigatório' }}
              render={({ field }) => (
                <TimePicker
                  {...field}
                  format={format}
                  showNow={false}
                  placeholder="Horário"
                  style={{ width: '100%', borderRadius: '6px' }}
                />
              )}
            />
          </Form.Item>
          <Form.Item label="Fecha às" style={{ width: 'calc(50% - 16px)' }}>
            <Controller
              name="closeTime"
              control={control}
              rules={{ required: 'Este campo é obrigatório' }}
              render={({ field }) => (
                <TimePicker
                  {...field}
                  format={format}
                  showNow={false}
                  placeholder="Horário"
                  style={{ width: '100%', borderRadius: '6px' }}
                />
              )}
            />
          </Form.Item>
          <Form.Item label=" ">
            <Button
              type="primary"
              htmlType="submit"
              icon={<PlusOutlined />}
              style={{ borderRadius: '6px' }}
              disabled={isAddButtonDisabled}
            />
          </Form.Item>
        </Space.Compact>
      </Form.Item>
    </S.ScheduleFormMobile>
  )
}
