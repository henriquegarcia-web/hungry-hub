import * as S from './styles'
import { LiaEnvelope, LiaUserLockSolid } from 'react-icons/lia'

import { PremiumStatus } from '@/components'
import { Button, Form, Input, theme } from 'antd'

import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'

import { useAdminAuth } from '@/contexts/AdminAuthContext'
import {
  handleChangeEmailAdmin,
  handleChangePasswordAdmin
} from '@/firebase/auth'

const Account = () => {
  const { token } = theme.useToken()

  const { userData, isAdminPremium } = useAdminAuth()

  return (
    <S.Account>
      <S.AccountWrapper>
        <S.AccountDetails>
          <S.AccountDetailsTitle style={{ color: token.colorTextHeading }}>
            Olá, <b>Henrique Pereira Garcia</b>!
          </S.AccountDetailsTitle>
          <S.AccountDetailsPlan style={{ color: token.colorTextHeading }}>
            <p>Plano ativo:</p>
            <PremiumStatus
              isAdminPremium={isAdminPremium}
              userData={userData}
            />
          </S.AccountDetailsPlan>

          <a
            href="https://billing.stripe.com/p/login/cN22ab89c4QKdXyeUU"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button type="dashed" disabled={!isAdminPremium}>
              Acessar portal do cliente
            </Button>
          </a>
        </S.AccountDetails>

        {/* <AccountContainer
          headerIcon={<LiaEnvelope />}
          headerLabel="Editar e-mail"
        >
          <AccountEmailChange />
        </AccountContainer> */}

        <AccountContainer
          headerIcon={<LiaUserLockSolid />}
          headerLabel="Trocar senha"
        >
          <AccountPasswordChange />
        </AccountContainer>

        <DeleteAccountForm />
      </S.AccountWrapper>
    </S.Account>
  )
}

export default Account

// ========================================== ACCOUNT DELETE

interface IDeleteAccountForm {
  adminPassword: string
}

const deleteAccountSchema = Yup.object().shape({
  adminPassword: Yup.string().required()
})

const DeleteAccountForm = () => {
  const { token } = theme.useToken()

  const { handleDeleteAccount, isDeletingAccount } = useAdminAuth()

  const { control, handleSubmit, reset, formState } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(deleteAccountSchema)
  })

  const { isValid } = formState

  const handleDelete = async (data: IDeleteAccountForm) => {
    const deleteAccountResponse = await handleDeleteAccount(data.adminPassword)

    if (deleteAccountResponse) {
      reset()
    }
  }

  return (
    <S.AccountDeleteForm
      style={{ backgroundColor: token.colorBgContainer }}
      onSubmit={handleSubmit(handleDelete)}
    >
      <p style={{ color: token.colorTextSecondary }}>Deletar conta</p>

      <S.AccountDeleteFormInputs>
        <Controller
          name="adminPassword"
          control={control}
          rules={{ required: 'Este campo é obrigatório' }}
          render={({ field }) => (
            <Input.Password
              {...field}
              placeholder="Digite sua senha"
              style={{ width: 'fit-content', marginLeft: 'auto' }}
            />
          )}
        />

        <Button
          type="primary"
          htmlType="submit"
          loading={isDeletingAccount}
          disabled={!isValid}
        >
          Deletar
        </Button>
      </S.AccountDeleteFormInputs>
    </S.AccountDeleteForm>
  )
}

// ========================================== ACCOUNT CONTAINER BASE

interface IAccountContainer {
  headerIcon: React.ReactNode
  headerLabel: string
  children: React.ReactNode
}

const AccountContainer = ({
  headerIcon,
  headerLabel,
  children
}: IAccountContainer) => {
  const { token } = theme.useToken()

  return (
    <S.AccountContainer>
      <S.AccountContainerHeader
        style={{ backgroundColor: token.colorBgContainer }}
      >
        <S.AccountContainerHeaderIcon style={{ color: token.colorTextHeading }}>
          {headerIcon}
        </S.AccountContainerHeaderIcon>
        <S.AccountContainerHeaderLabel
          style={{ color: token.colorTextHeading }}
        >
          {headerLabel}
        </S.AccountContainerHeaderLabel>
      </S.AccountContainerHeader>
      <S.AccountContainerContent>{children}</S.AccountContainerContent>
    </S.AccountContainer>
  )
}

// ========================================== ACCOUNT E-MAIL CHANGE

interface IAccountEmailChange {}

interface IChangeEmailForm {
  adminEmailNew: string
  adminEmailNewConfirmation: string
}

const editEmailSchema = Yup.object().shape({
  adminEmailNew: Yup.string().required(),
  adminEmailNewConfirmation: Yup.string()
    .required()
    .oneOf([Yup.ref('adminEmailNew')])
})

const AccountEmailChange = ({}: IAccountEmailChange) => {
  const { control, handleSubmit, reset, formState } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(editEmailSchema)
  })

  const { isValid } = formState

  const handleChangeEmail = async (data: IChangeEmailForm) => {
    const changeEmailResponse = await handleChangeEmailAdmin(data.adminEmailNew)

    if (changeEmailResponse) {
      reset()
    }
  }

  return (
    <S.AccountEmailChangeForm
      layout="vertical"
      onFinish={handleSubmit(handleChangeEmail)}
    >
      <Controller
        name="adminEmailNew"
        control={control}
        rules={{ required: 'Este campo é obrigatório' }}
        render={({ field }) => (
          <Form.Item label="E-mail novo">
            <Input {...field} placeholder="Digite seu novo e-mail" />
          </Form.Item>
        )}
      />
      <Controller
        name="adminEmailNewConfirmation"
        control={control}
        rules={{ required: 'Este campo é obrigatório' }}
        render={({ field }) => (
          <Form.Item label="E-mail novo confirmação">
            <Input {...field} placeholder="Confirme seu novo e-mail" />
          </Form.Item>
        )}
      />
      <S.AccountContainerFooter>
        <Button type="primary" htmlType="submit" disabled={!isValid}>
          Editar e-mail
        </Button>
      </S.AccountContainerFooter>
    </S.AccountEmailChangeForm>
  )
}

// ========================================== ACCOUNT PASSWORD CHANGE

interface IAccountPasswordChange {}

interface IChangePasswordForm {
  adminPasswordCurrent: string
  adminPasswordNew: string
  adminPasswordNewConfirmation: string
}

const editPasswordSchema = Yup.object().shape({
  adminPasswordCurrent: Yup.string().required(),
  adminPasswordNew: Yup.string().required(),
  adminPasswordNewConfirmation: Yup.string()
    .required()
    .oneOf([Yup.ref('adminPasswordNew')])
})

const AccountPasswordChange = ({}: IAccountPasswordChange) => {
  const { control, handleSubmit, reset, formState } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(editPasswordSchema)
  })

  const { isValid } = formState

  const handleChangePassword = async (data: IChangePasswordForm) => {
    const changePasswordResponse = await handleChangePasswordAdmin(
      data.adminPasswordCurrent,
      data.adminPasswordNew
    )

    if (changePasswordResponse) {
      reset()
    }
  }

  return (
    <S.AccountPasswordChangeForm
      layout="vertical"
      onFinish={handleSubmit(handleChangePassword)}
    >
      <Controller
        name="adminPasswordCurrent"
        control={control}
        rules={{ required: 'Este campo é obrigatório' }}
        render={({ field }) => (
          <Form.Item label="Senha atual">
            <Input.Password {...field} placeholder="Digite sua senha atual" />
          </Form.Item>
        )}
      />
      <Controller
        name="adminPasswordNew"
        control={control}
        rules={{ required: 'Este campo é obrigatório' }}
        render={({ field }) => (
          <Form.Item label="Senha nova">
            <Input.Password {...field} placeholder="Digite sua nova senha" />
          </Form.Item>
        )}
      />
      <Controller
        name="adminPasswordNewConfirmation"
        control={control}
        rules={{ required: 'Este campo é obrigatório' }}
        render={({ field }) => (
          <Form.Item label="Senha nova confirmação">
            <Input.Password {...field} placeholder="Confirme sua nova senha" />
          </Form.Item>
        )}
      />

      <S.AccountContainerFooter>
        <Button type="primary" htmlType="submit" disabled={!isValid}>
          Editar senha
        </Button>
      </S.AccountContainerFooter>
    </S.AccountPasswordChangeForm>
  )
}
