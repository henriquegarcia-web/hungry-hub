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
  Spin,
  Switch,
  TimePicker,
  Tooltip,
  Upload,
  theme
} from 'antd'
import moment from 'moment'

import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface'
import type { UploadChangeParam } from 'antd/es/upload'

const { useToken } = theme

import { Controller, useForm } from 'react-hook-form'

import {
  beforeUpload,
  getBase64,
  onPreview
} from '@/utils/functions/imageUpload'

import { useAdmin } from '@/contexts/AdminContext'
import { useAdminAuth } from '@/contexts/AdminAuthContext'

import {
  ICompanyContactForm,
  ICompanyLocationForm,
  ICompanyMainInfosForm,
  handleUpdateCompanyContact,
  handleUpdateCompanyLocation,
  handleUpdateCompanyMainInfos,
  handleUpdateCompanySchedules
} from '@/firebase/company'
import { IUserData } from '@/@types/Auth'

const CompanyInfos = () => {
  const { token } = useToken()
  const { userData } = useAdminAuth()

  const {
    isCompanyActive,
    handleDesactiveCompany,
    handleActiveCompany
    // companyHasAllDataFilledIn
  } = useAdmin()

  const onChange = (checked: boolean) => {
    if (checked) {
      handleActiveCompany()
    } else {
      handleDesactiveCompany()
    }
  }

  return (
    <S.CompanyInfos>
      <S.CompanyInfosWrapper>
        <S.CompanyInfosActiveCompany
          style={{ backgroundColor: token.colorBgContainer }}
        >
          <p style={{ color: token.colorTextSecondary }}>
            Ativar cardápio para ser exibido
          </p>
          <Switch
            size="small"
            checked={isCompanyActive}
            onChange={onChange}
            // disabled={!companyHasAllDataFilledIn}
          />
        </S.CompanyInfosActiveCompany>
        <MainInfosContainer userData={userData} />
        <LocationContainer userData={userData} />
        <ContactContainer userData={userData} />
        <ScheduleContainer userData={userData} />
      </S.CompanyInfosWrapper>
    </S.CompanyInfos>
  )
}

export default CompanyInfos

// ========================================== INFO CONTAINER BASE

interface IInfoContainer {
  headerIcon: React.ReactNode
  headerLabel: string
  loading: boolean
  children: React.ReactNode
}

const InfoContainer = ({
  headerIcon,
  headerLabel,
  loading,
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
      <S.InfoContainerContent>
        {children}
        {loading && (
          <S.InfoContainerLoading>
            <Spin />
          </S.InfoContainerLoading>
        )}
      </S.InfoContainerContent>
    </S.InfoContainer>
  )
}

// ========================================== MAIN INFOS CONTAINER

interface IMainInfosContainer {
  userData: IUserData | null
}

const MainInfosContainer = ({ userData }: IMainInfosContainer) => {
  const [updatingCompany, setUpdatingCompany] = useState(false)

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

  // ---------------------------------------------------------------

  const { control, handleSubmit, reset, setValue, formState } =
    useForm<ICompanyMainInfosForm>()

  const { isValid } = formState

  const handleUpdate = async (data: ICompanyMainInfosForm) => {
    setUpdatingCompany(true)

    await handleUpdateCompanyMainInfos({
      companyLogo: companyImage || '',
      companyBanner: companyBanner || '',
      companyName: data.companyName,
      companyId: data.companyId,
      companyDescription: data.companyDescription
    })

    setUpdatingCompany(false)
  }

  useEffect(() => {
    if (userData?.adminCompanyInfo) {
      const companyInfo = userData?.adminCompanyInfo

      setCompanyImage(companyInfo?.companyLogo || '')
      setCompanyBanner(companyInfo?.companyBanner || '')

      setValue('companyName', companyInfo?.companyName || '')
      setValue('companyId', companyInfo?.companyId || '')
      setValue('companyDescription', companyInfo?.companyDescription || '')
    }
  }, [userData, setValue])

  return (
    <InfoContainer
      headerIcon={<IoStorefrontOutline />}
      headerLabel="Informações básicas"
      loading={userData === null}
    >
      <S.MainInfosForm layout="vertical" onFinish={handleSubmit(handleUpdate)}>
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
          <Controller
            name="companyName"
            control={control}
            rules={{ required: 'Este campo é obrigatório' }}
            render={({ field }) => (
              <Input {...field} placeholder="Nome da empresa" />
            )}
          />
        </Form.Item>
        <Form.Item label="ID da empresa">
          <Controller
            name="companyId"
            control={control}
            rules={{ required: 'Este campo é obrigatório' }}
            render={({ field }) => (
              <Input {...field} placeholder="ID da empresa na URL" />
            )}
          />
        </Form.Item>
        <Form.Item label="Descrição da empresa">
          <Controller
            name="companyDescription"
            control={control}
            rules={{ required: 'Este campo é obrigatório' }}
            render={({ field }) => (
              <Input.TextArea
                {...field}
                placeholder="Descrição da empresa"
                rows={6}
                style={{ resize: 'none' }}
              />
            )}
          />
        </Form.Item>
        <S.MainInfosFormFooter>
          <Button type="primary" htmlType="submit" loading={updatingCompany}>
            Salvar
          </Button>
        </S.MainInfosFormFooter>
      </S.MainInfosForm>
    </InfoContainer>
  )
}

// ========================================== LOCATION CONTAINER

interface ILocationContainer {
  userData: IUserData | null
}

const LocationContainer = ({ userData }: ILocationContainer) => {
  const [updatingCompany, setUpdatingCompany] = useState(false)

  const { control, handleSubmit, reset, setValue, formState } =
    useForm<ICompanyLocationForm>()

  const { isValid } = formState

  const handleUpdate = async (data: ICompanyLocationForm) => {
    setUpdatingCompany(true)

    await handleUpdateCompanyLocation(data)

    setUpdatingCompany(false)
  }

  useEffect(() => {
    if (userData?.adminCompanyInfo) {
      const companyLocation = userData?.adminCompanyInfo?.companyLocation

      setValue('companyCep', companyLocation?.companyCep || '')
      setValue('companyAddress', companyLocation?.companyAddress || '')
      setValue(
        'companyAddressNumber',
        companyLocation?.companyAddressNumber || ''
      )
      setValue('companyDistrict', companyLocation?.companyDistrict || '')
      setValue('companyCity', companyLocation?.companyCity || '')
    }
  }, [userData, setValue])

  return (
    <InfoContainer
      headerIcon={<IoLocationOutline />}
      headerLabel="Localização"
      loading={userData === null}
    >
      <S.LocationForm layout="vertical" onFinish={handleSubmit(handleUpdate)}>
        <Form.Item label="CEP">
          <Controller
            name="companyCep"
            control={control}
            rules={{ required: 'Este campo é obrigatório' }}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="CEP"
                style={{ width: '100%', maxWidth: '200px' }}
              />
            )}
          />
        </Form.Item>
        <Form.Item label="Endereço completo">
          <Space.Compact style={{ width: '100%' }}>
            <Form.Item noStyle>
              <Controller
                name="companyAddress"
                control={control}
                rules={{ required: 'Este campo é obrigatório' }}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Endereço"
                    style={{ width: '75%' }}
                  />
                )}
              />
            </Form.Item>
            <Form.Item noStyle>
              <Controller
                name="companyAddressNumber"
                control={control}
                rules={{ required: 'Este campo é obrigatório' }}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Número"
                    style={{ width: '25%' }}
                  />
                )}
              />
            </Form.Item>
          </Space.Compact>
        </Form.Item>
        <Form.Item>
          <Space.Compact style={{ width: '100%', columnGap: '10px' }}>
            <Form.Item label="Bairro" style={{ width: '50%' }}>
              <Controller
                name="companyDistrict"
                control={control}
                rules={{ required: 'Este campo é obrigatório' }}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Bairro"
                    style={{ borderRadius: '6px' }}
                  />
                )}
              />
            </Form.Item>
            <Form.Item label="Cidade" style={{ width: '50%' }}>
              <Controller
                name="companyCity"
                control={control}
                rules={{ required: 'Este campo é obrigatório' }}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Cidade"
                    style={{ borderRadius: '6px' }}
                  />
                )}
              />
            </Form.Item>
          </Space.Compact>
        </Form.Item>
        <S.LocationFormFooter>
          <Button type="primary" htmlType="submit" loading={updatingCompany}>
            Salvar
          </Button>
        </S.LocationFormFooter>
      </S.LocationForm>
    </InfoContainer>
  )
}

// ========================================== CONTACT CONTAINER

interface IContactContainer {
  userData: IUserData | null
}

const ContactContainer = ({ userData }: IContactContainer) => {
  const { token } = useToken()

  const [updatingCompany, setUpdatingCompany] = useState(false)

  const { control, handleSubmit, reset, setValue, formState } =
    useForm<ICompanyContactForm>()

  const { isValid } = formState

  const handleUpdate = async (data: ICompanyContactForm) => {
    setUpdatingCompany(true)

    await handleUpdateCompanyContact(data)

    setUpdatingCompany(false)
  }

  useEffect(() => {
    if (userData?.adminCompanyInfo) {
      const companyContacts = userData?.adminCompanyInfo?.companyContacts

      setValue('companyPhone', companyContacts?.companyPhone || '')
      setValue('companyWhatsapp', companyContacts?.companyWhatsapp || '')
      setValue('companyEmail', companyContacts?.companyEmail || '')
      setValue('companyFacebook', companyContacts?.companyFacebook || '')
      setValue('companyInstagram', companyContacts?.companyInstagram || '')
      setValue('companyWebsite', companyContacts?.companyWebsite || '')
    }
  }, [userData, setValue])

  const customTootip = (
    <Tooltip title="Essa campo não irá aparecer se estiver vazio">
      <InfoCircleOutlined
        style={{ fontSize: '14px', color: 'rgba(0,0,0,0.45)' }}
      />
    </Tooltip>
  )

  return (
    <InfoContainer
      headerIcon={<IoCallOutline />}
      headerLabel="Meios de contato"
      loading={userData === null}
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
        onFinish={handleSubmit(handleUpdate)}
      >
        <Form.Item label="Telefone">
          <Controller
            name="companyPhone"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Telefone comercial"
                prefix={
                  <LiaPhoneAltSolid
                    className="icon_large"
                    style={{ color: token.colorTextPlaceholder }}
                  />
                }
                suffix={customTootip}
              />
            )}
          />
        </Form.Item>
        <Form.Item label="Whatsapp">
          <Controller
            name="companyWhatsapp"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Whatsapp comercial"
                prefix={
                  <LiaWhatsapp
                    className="icon_large"
                    style={{ color: token.colorTextPlaceholder }}
                  />
                }
                suffix={customTootip}
              />
            )}
          />
        </Form.Item>
        <Form.Item label="E-mail">
          <Controller
            name="companyEmail"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="E-mail comercial"
                prefix={
                  <LiaEnvelope
                    className="icon_large"
                    style={{ color: token.colorTextPlaceholder }}
                  />
                }
                suffix={customTootip}
              />
            )}
          />
        </Form.Item>
        <Form.Item label="Facebook">
          <Controller
            name="companyFacebook"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Facebook comercial"
                prefix={
                  <LiaFacebook
                    className="icon_large"
                    style={{ color: token.colorTextPlaceholder }}
                  />
                }
                suffix={customTootip}
              />
            )}
          />
        </Form.Item>
        <Form.Item label="Instagram">
          <Controller
            name="companyInstagram"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Instagram comercial"
                prefix={
                  <LiaInstagram
                    className="icon_large"
                    style={{ color: token.colorTextPlaceholder }}
                  />
                }
                suffix={customTootip}
              />
            )}
          />
        </Form.Item>
        <Form.Item label="Website">
          <Controller
            name="companyWebsite"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Website comercial"
                prefix={
                  <LiaLaptopSolid
                    className="icon_large"
                    style={{ color: token.colorTextPlaceholder }}
                  />
                }
                suffix={customTootip}
              />
            )}
          />
        </Form.Item>
        <S.ContactFormFooter>
          <Button type="primary" htmlType="submit" loading={updatingCompany}>
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

const momentToString = (momentObj: moment.Moment): string => {
  return momentObj.toISOString()
}

const stringToMoment = (str: string): moment.Moment => {
  return moment(str)
}

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

interface IScheduleContainer {
  userData: IUserData | null
}

const ScheduleContainer = ({ userData }: IScheduleContainer) => {
  const { token } = useToken()

  const [updatingCompany, setUpdatingCompany] = useState(false)

  const [schedule, setSchedule] = useState<ScheduleItem[]>([])
  const { control, handleSubmit, watch, setValue, reset, formState } = useForm()
  const selectedDay = watch('day')

  const { isValid } = formState

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

  // const onSubmit = (data: any) => {
  //   if (selectedDay === 'todos') {
  //     setSchedule([
  //       {
  //         day: data.day,
  //         openTime: momentToString(schedule.openTime),
  //         closeTime: momentToString(schedule.closeTime)
  //       }
  //     ])
  //   } else if (!schedule.some((item) => item.day === 'todos')) {
  //     if (!schedule.some((item) => item.day === data.day)) {
  //       setSchedule([
  //         ...schedule,
  //         {
  //           day: data.day,
  //           openTime: momentToString(schedule.openTime),
  //           closeTime: momentToString(schedule.closeTime)
  //         }
  //       ])
  //     } else {
  //       console.log(`Dia ${data.day} já foi adicionado.`)
  //     }
  //   }
  // }

  const handleUpdate = async () => {
    setUpdatingCompany(true)
    handleUpdateCompanySchedules(schedule)
    setUpdatingCompany(false)
  }

  useEffect(() => {
    if (userData?.adminCompanyInfo) {
      const companySchedules = userData.adminCompanyInfo.companySchedules

      const schedulesFromFirebase = companySchedules?.map((schedule) => ({
        ...schedule,
        openTime: stringToMoment(schedule.openTime.toString()),
        closeTime: stringToMoment(schedule.closeTime.toString())
      }))

      setSchedule(schedulesFromFirebase || [])
    }
  }, [userData])

  const isAddButtonDisabled =
    schedule.some((item) => item.day === 'todos' || item.day === selectedDay) ||
    !isValid

  return (
    <InfoContainer
      headerIcon={<IoCalendarOutline />}
      headerLabel="Horários"
      loading={userData === null}
    >
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
          <Button
            type="primary"
            loading={updatingCompany}
            onClick={handleUpdate}
          >
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
