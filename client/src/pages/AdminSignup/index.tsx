import { useNavigate } from 'react-router-dom'
import * as S from './styles'

import { AuthContainer } from '@/components'
import { Button, Input, ConfigProvider, theme } from 'antd'

import { Controller, useForm } from 'react-hook-form'

import { handleSignupAdmin } from '@/firebase/auth'

interface ISignupForm {
  adminName: string
  adminPhone: string
  adminEmail: string
  adminPassword: string
  adminPasswordConfirm: string
}

const AdminSignup = () => {
  const navigate = useNavigate()

  const { control, handleSubmit, reset, formState } = useForm<ISignupForm>()

  const { isValid } = formState

  const handleSignup = async (data: ISignupForm) => {
    const signupAdminResponse = await handleSignupAdmin({
      adminName: data.adminName,
      adminPhone: data.adminPhone,
      adminEmail: data.adminEmail,
      adminPassword: data.adminPassword
    })

    if (signupAdminResponse) {
      reset()
      navigate('/admin')
    }
  }

  return (
    <S.AdminSignup>
      <ConfigProvider
        theme={{
          algorithm: theme.darkAlgorithm
        }}
      >
        <AuthContainer title="Criar conta">
          <S.AdminSignupForm
            layout="vertical"
            onFinish={handleSubmit(handleSignup)}
          >
            <Controller
              name="adminName"
              control={control}
              rules={{ required: 'Este campo é obrigatório' }}
              render={({ field }) => (
                <Input {...field} placeholder="Nome completo" />
              )}
            />
            <Controller
              name="adminPhone"
              control={control}
              rules={{ required: 'Este campo é obrigatório' }}
              render={({ field }) => (
                <Input {...field} placeholder="Telefone" />
              )}
            />
            <Controller
              name="adminEmail"
              control={control}
              rules={{ required: 'Este campo é obrigatório' }}
              render={({ field }) => <Input {...field} placeholder="E-mail" />}
            />
            <Controller
              name="adminPassword"
              control={control}
              rules={{ required: 'Este campo é obrigatório' }}
              render={({ field }) => (
                <Input.Password {...field} placeholder="Senha" />
              )}
            />
            <Controller
              name="adminPasswordConfirm"
              control={control}
              rules={{ required: 'Este campo é obrigatório' }}
              render={({ field }) => (
                <Input.Password {...field} placeholder="Confirmar senha" />
              )}
            />
            <S.AdminSignupFormNavigator>
              Já possuí cadastro?
              <b onClick={() => navigate('/admin/entrar')}>Entrar</b>
            </S.AdminSignupFormNavigator>
            <S.AdminSignupFormFooter>
              <Button type="primary" htmlType="submit" disabled={!isValid}>
                Cadastrar
              </Button>
            </S.AdminSignupFormFooter>
          </S.AdminSignupForm>
        </AuthContainer>
      </ConfigProvider>

      <S.AdminSignupBackground>
        <img src="/auth_bg.png" alt="" />
      </S.AdminSignupBackground>
    </S.AdminSignup>
  )
}

export default AdminSignup
