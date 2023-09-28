import { useNavigate } from 'react-router-dom'
import * as S from './styles'

import { AuthContainer } from '@/components'
import { Button, Input, ConfigProvider, theme } from 'antd'

import { Controller, useForm } from 'react-hook-form'

interface ISigninForm {
  adminEmail: string
  adminPassword: string
}

const AdminSignin = () => {
  const navigate = useNavigate()

  const { control, handleSubmit, reset, formState } = useForm<ISigninForm>()

  const { isValid } = formState

  const handleSignin = (data: ISigninForm) => {
    console.log(data)

    reset()
  }

  return (
    <S.AdminSignin>
      <ConfigProvider
        theme={{
          algorithm: theme.darkAlgorithm
        }}
      >
        <AuthContainer title="Entrar">
          <S.AdminSigninForm
            layout="vertical"
            onFinish={handleSubmit(handleSignin)}
          >
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
            <S.AdminSigninFormNavigator>
              Não possuí cadastro?
              <b onClick={() => navigate('/admin/cadastrar')}>Criar conta</b>
            </S.AdminSigninFormNavigator>
            <S.AdminSigninFormFooter>
              <Button type="primary" htmlType="submit" disabled={!isValid}>
                Entrar
              </Button>
            </S.AdminSigninFormFooter>
          </S.AdminSigninForm>
        </AuthContainer>
      </ConfigProvider>

      <S.AdminSigninBackground>
        <img src="/auth_bg.png" alt="" />
      </S.AdminSigninBackground>
    </S.AdminSignin>
  )
}

export default AdminSignin
