import * as S from './styles'
import { LiaEnvelope, LiaUserLockSolid } from 'react-icons/lia'

import { PremiumStatus } from '@/components'
import { Button, Form, Input } from 'antd'

import { Controller, useForm } from 'react-hook-form'

const Account = () => {
  return (
    <S.Account>
      <S.AccountWrapper>
        <S.AccountDetails>
          <S.AccountDetailsTitle>
            Olá, <b>Henrique Pereira Garcia</b>!
          </S.AccountDetailsTitle>
          <S.AccountDetailsPlan>
            Plano ativo:
            <PremiumStatus />
          </S.AccountDetailsPlan>
        </S.AccountDetails>
        <AccountContainer
          headerIcon={<LiaEnvelope />}
          headerLabel="Editar e-mail"
        >
          <AccountEmailChange />
        </AccountContainer>
        <AccountContainer
          headerIcon={<LiaUserLockSolid />}
          headerLabel="Trocar senha"
        >
          <AccountPasswordChange />
        </AccountContainer>
      </S.AccountWrapper>
    </S.Account>
  )
}

export default Account

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
  return (
    <S.AccountContainer>
      <S.AccountContainerHeader>
        <S.AccountContainerHeaderIcon>
          {headerIcon}
        </S.AccountContainerHeaderIcon>
        <S.AccountContainerHeaderLabel>
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
  adminEmailCurrent: string
  adminEmailNew: string
  adminEmailNewConfirmation: string
}

const AccountEmailChange = ({}: IAccountEmailChange) => {
  const { control, handleSubmit, reset, formState } =
    useForm<IChangeEmailForm>()

  const { isValid } = formState

  const handleChangeEmail = (data: IChangeEmailForm) => {
    console.log(data)

    reset()
  }

  return (
    <S.AccountEmailChangeForm
      layout="vertical"
      onFinish={handleSubmit(handleChangeEmail)}
    >
      <Controller
        name="adminEmailCurrent"
        control={control}
        rules={{ required: 'Este campo é obrigatório' }}
        render={({ field }) => (
          <Form.Item label="E-mail atual">
            <Input placeholder="Digite seu e-mail atual" />
          </Form.Item>
        )}
      />
      <Controller
        name="adminEmailNew"
        control={control}
        rules={{ required: 'Este campo é obrigatório' }}
        render={({ field }) => (
          <Form.Item label="E-mail novo">
            <Input placeholder="Digite seu novo e-mail" />
          </Form.Item>
        )}
      />
      <Controller
        name="adminEmailNewConfirmation"
        control={control}
        rules={{ required: 'Este campo é obrigatório' }}
        render={({ field }) => (
          <Form.Item label="E-mail novo confirmação">
            <Input placeholder="Confirme seu novo e-mail" />
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

const AccountPasswordChange = ({}: IAccountPasswordChange) => {
  const { control, handleSubmit, reset, formState } =
    useForm<IChangePasswordForm>()

  const { isValid } = formState

  const handleChangePassword = (data: IChangePasswordForm) => {
    console.log(data)

    reset()
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
            <Input.Password placeholder="Digite sua senha atual" />
          </Form.Item>
        )}
      />
      <Controller
        name="adminPasswordNew"
        control={control}
        rules={{ required: 'Este campo é obrigatório' }}
        render={({ field }) => (
          <Form.Item label="Senha nova">
            <Input.Password placeholder="Digite sua nova senha" />
          </Form.Item>
        )}
      />
      <Controller
        name="adminPasswordNewConfirmation"
        control={control}
        rules={{ required: 'Este campo é obrigatório' }}
        render={({ field }) => (
          <Form.Item label="Senha nova confirmação">
            <Input.Password placeholder="Confirme sua nova senha" />
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
