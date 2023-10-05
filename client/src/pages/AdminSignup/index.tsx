/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from 'react-router-dom'

import * as S from './styles'
import { IoSunnyOutline, IoMoonOutline } from 'react-icons/io5'

import { AuthContainer } from '@/components'
import { Button, Input, theme, Form, Switch } from 'antd'

import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'

import { useAdmin } from '@/contexts/AdminContext'

import { handleSignupAdmin } from '@/firebase/auth'

interface ISignupForm {
  adminName: string
  adminPhone: string
  adminEmail: string
  adminPassword: string
  adminPasswordConfirm: string
}

const signupSchema = Yup.object().shape({
  adminName: Yup.string()
    .required('Este campo é obrigatório')
    .max(30, 'O telefone não pode ter mais de 30 dígitos'),
  adminPhone: Yup.string()
    .required('Este campo é obrigatório')
    .test(
      'phone-length',
      'O telefone deve ter exatamente 15 dígitos',
      (value) => {
        return value.replace(/[^\d]/g, '').length === 11
      }
    ),
  adminEmail: Yup.string().required('Este campo é obrigatório'),
  adminPassword: Yup.string()
    .required('Este campo é obrigatório')
    .max(20, 'A senha não pode ter mais de 20 dígitos'),
  adminPasswordConfirm: Yup.string()
    .required('Este campo é obrigatório')
    .oneOf([Yup.ref('adminPassword')], 'As senhas precisam ser iguais')
    .max(20, 'A senha não pode ter mais de 20 dígitos')
})

const AdminSignup = () => {
  const { token } = theme.useToken()

  const navigate = useNavigate()

  const { adminTempTheme, toogleTempThemeDark } = useAdmin()

  const { control, handleSubmit, reset, formState } = useForm({
    mode: 'all',
    resolver: yupResolver(signupSchema)
  })
  const { isValid, errors } = formState

  const formatPhone = (phoneValue: string) => {
    const match = phoneValue.match(/^(\d{2})(\d{0,5})(\d{0,4})$/)
    if (match) {
      let formatted: string = `(${match[1]}) ${match[2]}`
      if (match[3]) {
        formatted += `-${match[3]}`
      }
      return formatted
    }
    return phoneValue
  }

  const handleSignup = async (data: ISignupForm) => {
    const cleanedPhoneValue = data.adminPhone.replace(/[^\d]/g, '')

    const signupAdminResponse = await handleSignupAdmin({
      adminName: data.adminName,
      adminPhone: cleanedPhoneValue,
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
    <S.AdminSignup>
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

      <AuthContainer title="Criar conta" adminTheme={adminTempTheme}>
        <S.AdminSignupForm
          layout="vertical"
          onFinish={handleSubmit(handleSignup)}
        >
          <Controller
            name="adminName"
            control={control}
            render={({ field }) => (
              <Form.Item
                validateStatus={errors.adminName?.message ? 'error' : undefined}
                help={errors.adminName?.message || null}
              >
                <Input {...field} placeholder="Nome completo" />
              </Form.Item>
            )}
          />

          <Controller
            name="adminPhone"
            control={control}
            render={({ field }) => (
              <Form.Item
                validateStatus={
                  errors.adminPhone?.message ? 'error' : undefined
                }
                help={errors.adminPhone?.message || null}
              >
                <Input
                  {...field}
                  placeholder="Telefone"
                  value={field.value}
                  onChange={(e) => {
                    let phoneValue = e.target.value.replace(/\D/g, '')
                    phoneValue = phoneValue.slice(0, 11)
                    const formatted = formatPhone(phoneValue)

                    field.onChange(formatted)
                  }}
                />
              </Form.Item>
            )}
          />
          <Controller
            name="adminEmail"
            control={control}
            render={({ field }) => (
              <Form.Item
                validateStatus={
                  errors.adminEmail?.message ? 'error' : undefined
                }
                help={errors.adminEmail?.message || null}
              >
                <Input {...field} placeholder="E-mail" />
              </Form.Item>
            )}
          />
          <Controller
            name="adminPassword"
            control={control}
            render={({ field }) => (
              <Form.Item
                validateStatus={
                  errors.adminPassword?.message ? 'error' : undefined
                }
                help={errors.adminPassword?.message || null}
              >
                <Input.Password {...field} placeholder="Senha" />
              </Form.Item>
            )}
          />
          <Controller
            name="adminPasswordConfirm"
            control={control}
            render={({ field }) => (
              <Form.Item
                validateStatus={
                  errors.adminPasswordConfirm?.message ? 'error' : undefined
                }
                help={errors.adminPasswordConfirm?.message || null}
              >
                <Input.Password {...field} placeholder="Confirmar senha" />
              </Form.Item>
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

      <S.AdminSignupBackground
        style={{ backgroundColor: token.colorBgContainer }}
      >
        <img src="/auth_bg.png" alt="" />
      </S.AdminSignupBackground>
    </S.AdminSignup>
  )
}

export default AdminSignup
