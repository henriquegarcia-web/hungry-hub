import { useMemo, useState } from 'react'

import * as S from './styles'
import { BiSupport } from 'react-icons/bi'
import { IoChevronDownOutline } from 'react-icons/io5'

import { Button, Dropdown, Form, Input, theme } from 'antd'

import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'

import { useAdminAuth } from '@/contexts/AdminAuthContext'
import { handleCreateSupportRequest } from '@/firebase/support'

interface MenuItemWithLabel {
  label: string
  key: string
  disabled?: boolean
}

const defaultSupportReasons: MenuItemWithLabel[] = [
  {
    label: 'Dúvidas Gerais',
    key: 'support_reason_01'
  },
  {
    label: 'Problemas Técnicos',
    key: 'support_reason_02'
  },
  {
    label: 'Solicitação de Ajuda com Design',
    key: 'support_reason_03'
    // danger: true
  },
  {
    label: 'Perguntas sobre Funcionalidades',
    key: 'support_reason_04'
  },
  {
    label: 'Ajuda com Gerenciamento de Conteúdo',
    key: 'support_reason_05'
  }
]

interface ISupportSubmitForm {
  supportReason: string
  supportSubject: string
  supportDescription: string
  supportContactMethod: string
}

const supportSubmitSchema = Yup.object().shape({
  supportReason: Yup.string().required(),
  supportSubject: Yup.string().required(),
  supportDescription: Yup.string().required(),
  supportContactMethod: Yup.string().required()
})

const Support = () => {
  const { token } = theme.useToken()

  const { isAdminPremium, userId } = useAdminAuth()

  const [loadingSupportRequest, setLoadingSupportRequest] = useState(false)

  const { control, handleSubmit, reset, formState } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(supportSubmitSchema)
  })

  const { isValid } = formState

  const handleSupportSubmit = async (data: ISupportSubmitForm) => {
    const supportData: any = {
      supportUserId: userId,
      ...data
    }

    setLoadingSupportRequest(true)

    const supportRequestResponse = await handleCreateSupportRequest(supportData)

    setLoadingSupportRequest(false)

    if (supportRequestResponse) {
      reset()
    }
  }

  const premiumSupportReasons: MenuItemWithLabel[] = useMemo(() => {
    const premiumSupport: MenuItemWithLabel[] = [
      {
        label: !isAdminPremium
          ? 'Integrações Avançadas [Premium]'
          : 'Integrações Avançadas',
        key: 'support_reason_06',
        disabled: !isAdminPremium
      },
      {
        label: !isAdminPremium
          ? 'Treinamento Avançado [Premium]'
          : 'Treinamento Avançado',
        disabled: !isAdminPremium,
        key: 'support_reason_07'
      },
      {
        label: !isAdminPremium
          ? 'Consultoria em Marketing [Premium]'
          : 'Consultoria em Marketing',
        key: 'support_reason_08',
        disabled: !isAdminPremium
      }
    ]

    const mergedReasons = [...defaultSupportReasons, ...premiumSupport]

    return mergedReasons
  }, [isAdminPremium])

  const contactMethods: MenuItemWithLabel[] = [
    {
      label: 'WhatsApp',
      key: 'support_contact_01'
    },
    {
      label: 'E-mail',
      key: 'support_contact_02'
    }
  ]

  // const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
  //   message.info('Click on left button.')
  //   console.log('click left button', e)
  // }

  const getReasonLabel = (key: string): string | null => {
    const item = premiumSupportReasons.find((item) => item.key === key)
    return item ? item.label : null
  }

  const getContactLabel = (key: string): string | null => {
    const item = contactMethods.find((item) => item.key === key)
    return item ? item.label : null
  }

  return (
    <S.Support>
      <S.SupportWrapper>
        <S.SupportForm style={{ border: `1px solid ${token.colorBorder}` }}>
          <S.SupportFormHeader
            style={{
              backgroundColor: token.colorBgContainer,
              borderBottom: `1px solid ${token.colorBorder}`
            }}
          >
            <S.SupportFormHeaderIcon style={{ color: token.colorTextHeading }}>
              <BiSupport />
            </S.SupportFormHeaderIcon>
            <S.SupportFormHeaderLabel style={{ color: token.colorTextHeading }}>
              Suporte
            </S.SupportFormHeaderLabel>
          </S.SupportFormHeader>
          <S.SupportFormContent
            layout="vertical"
            onFinish={handleSubmit(handleSupportSubmit)}
          >
            <Form.Item label="Motivo do suporte">
              <Controller
                name="supportReason"
                control={control}
                render={({ field }) => (
                  <Dropdown.Button
                    menu={{
                      items: premiumSupportReasons,
                      onClick: (e) => field.onChange(e.key),
                      style: { width: '100%' }
                    }}
                    icon={
                      <IoChevronDownOutline
                        style={{ fontSize: 16, marginBottom: '-4px' }}
                      />
                    }
                    trigger={['click']}
                    // onClick={handleButtonClick}
                  >
                    {field.value
                      ? getReasonLabel(field.value.toString())
                      : 'Selecione um motivo'}
                  </Dropdown.Button>
                )}
              />
            </Form.Item>
            <Form.Item label="Assunto">
              <Controller
                name="supportSubject"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Digite o assunto principal da solicitação"
                  />
                )}
              />
            </Form.Item>
            <Form.Item label="Detalhes">
              <Controller
                name="supportDescription"
                control={control}
                render={({ field }) => (
                  <Input.TextArea
                    {...field}
                    placeholder="Digite os detalhes da solicitação"
                    rows={6}
                    style={{ resize: 'none' }}
                  />
                )}
              />
            </Form.Item>
            <Form.Item label="Preferência de contato">
              <Controller
                name="supportContactMethod"
                control={control}
                render={({ field }) => (
                  <Dropdown.Button
                    menu={{
                      items: contactMethods,
                      onClick: (e) => field.onChange(e.key),
                      style: { width: '100%' }
                    }}
                    icon={
                      <IoChevronDownOutline
                        style={{ fontSize: 16, marginBottom: '-4px' }}
                      />
                    }
                    trigger={['click']}
                    // onClick={handleButtonClick}
                  >
                    {field.value
                      ? getContactLabel(field.value.toString())
                      : 'Selecione uma forma de contato'}
                  </Dropdown.Button>
                )}
              />
            </Form.Item>
            <S.FormFooter>
              <Button
                type="primary"
                htmlType="submit"
                loading={loadingSupportRequest}
                disabled={!isValid}
              >
                Enviar
              </Button>
            </S.FormFooter>
          </S.SupportFormContent>
        </S.SupportForm>
      </S.SupportWrapper>
    </S.Support>
  )
}

export default Support
