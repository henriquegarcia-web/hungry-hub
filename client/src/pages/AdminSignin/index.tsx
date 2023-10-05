import { useNavigate } from 'react-router-dom'

import * as S from './styles'
import { IoSunnyOutline, IoMoonOutline } from 'react-icons/io5'

import { AuthContainer } from '@/components'
import { Button, Input, Switch, theme } from 'antd'

import { Controller, useForm } from 'react-hook-form'

import { useAdmin } from '@/contexts/AdminContext'

import { handleSigninAdmin } from '@/firebase/auth'

interface ISigninForm {
  adminEmail: string
  adminPassword: string
}

const AdminSignin = () => {
  const { token } = theme.useToken()

  const navigate = useNavigate()

  const { adminTempTheme, toogleTempThemeDark } = useAdmin()

  const { control, handleSubmit, reset, formState } = useForm<ISigninForm>()

  const { isValid } = formState

  const handleSignin = async (data: ISigninForm) => {
    const signupAdminResponse = await handleSigninAdmin({
      adminEmail: data.adminEmail,
      adminPassword: data.adminPassword
    })

    if (signupAdminResponse) {
      reset()
      navigate('/admin/estabelecimento')
    }
  }

  const handleChangeTheme = (checked: boolean) => {
    toogleTempThemeDark(checked)
  }

  return (
    <S.AdminSignin>
      <S.SwitchTheme style={{ backgroundColor: token.colorBgContainer }}>
        <S.SwitchThemeLabel style={{ color: token.colorText }}>
          <IoSunnyOutline />
          /
          <IoMoonOutline />
        </S.SwitchThemeLabel>
        <Switch
          size="small"
          checked={adminTempTheme === 'dark'}
          onChange={handleChangeTheme}
        />
      </S.SwitchTheme>

      <AuthContainer title="Entrar" adminTheme={adminTempTheme}>
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

      <S.AdminSigninBackground
        style={{ backgroundColor: token.colorBgContainer }}
      >
        <img src="/auth_bg.png" alt="" />
      </S.AdminSigninBackground>
    </S.AdminSignin>
  )
}

export default AdminSignin
