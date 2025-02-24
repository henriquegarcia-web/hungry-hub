import { useNavigate } from 'react-router-dom'
import { useCallback, useEffect, useState } from 'react'

import * as S from './styles'
import {
  LiaCheckCircleSolid,
  LiaExclamationCircleSolid,
  LiaTimesCircleSolid
} from 'react-icons/lia'

import { HeaderMinified } from '@/components'
import { Button, message, theme } from 'antd'

import api from '@/api'

import { useAdminAuth } from '@/contexts/AdminAuthContext'
import { useAdmin } from '@/contexts/AdminContext'

interface IPremiumStatus {
  statusId: 'sucesso' | 'cancelado' | 'processando' | 'falha'
}

const PremiumStatus = ({ statusId }: IPremiumStatus) => {
  const { token } = theme.useToken()

  const navigate = useNavigate()

  const { isAdminLogged, userData, handleLogout } = useAdminAuth()
  const { adminTheme, toogleThemeDark } = useAdmin()

  const [currentCheckoutStatus, setCurrentCheckoutStatus] = useState(
    statusId === 'cancelado' ? 'cancelado' : 'processando'
  )

  const [isLoadingCheckout, setIsLoadingCheckout] = useState(true)

  // ------------------------------------------------------------------

  const handleChangeTheme = (checked: boolean) => {
    toogleThemeDark(checked)
  }

  // ------------------------------------------------------------------

  const handlePaymentSuccess = useCallback(async () => {
    if (statusId === 'cancelado') {
      setIsLoadingCheckout(false)
      return
    }

    if (userData?.adminSubscription?.planType) {
      setIsLoadingCheckout(false)
      return
    }

    if (!userData?.adminSubscription?.planCurrentType) {
      setIsLoadingCheckout(false)
      return
    }

    try {
      setIsLoadingCheckout(true)

      let response

      if (userData.adminSubscription.planCurrentType === 'lifetime_plan') {
        response = await api.post('/api/v1/one-time-payment-success', {
          sessionId: userData.adminSubscription.sessionId,
          firebaseId: userData.adminId
        })
      } else {
        response = await api.post('/api/v1/payment-success', {
          sessionId: userData.adminSubscription.sessionId,
          firebaseId: userData.adminId
        })
      }

      if (response.status === 200) {
        message.open({
          type: 'success',
          content: 'Pagamento concluído com sucesso!'
        })
        setCurrentCheckoutStatus('sucesso')
        return
      }

      setCurrentCheckoutStatus('falha')
    } catch (error) {
      setCurrentCheckoutStatus('falha')
      console.log(error)
    } finally {
      setIsLoadingCheckout(false)
    }
  }, [userData])

  useEffect(() => {
    if (!userData) {
      setIsLoadingCheckout(true)
      return
    }

    handlePaymentSuccess()
  }, [userData, handlePaymentSuccess])

  return (
    <S.PremiumStatus style={{ backgroundColor: token.colorBgElevated }}>
      <HeaderMinified
        isAdminLogged={isAdminLogged}
        userData={userData}
        adminTheme={adminTheme}
        handleChangeTheme={handleChangeTheme}
        handleLogout={handleLogout}
      />

      {currentCheckoutStatus === 'sucesso' ? (
        <S.PremiumStatusContainer color={premiumStatus.success.color}>
          <LiaCheckCircleSolid />
          <b>{premiumStatus.success.title}</b>
          <p style={{ color: token.colorText }}>
            {premiumStatus.success.message}
          </p>
          {premiumStatus.success.subMessage !== '' && (
            <p style={{ color: token.colorText }}>
              {premiumStatus.success.subMessage}
            </p>
          )}
          <Button
            disabled={isLoadingCheckout}
            onClick={() => navigate('/admin/estabelecimento')}
          >
            Retornar para a plataforma
          </Button>
        </S.PremiumStatusContainer>
      ) : currentCheckoutStatus === 'cancelado' ? (
        <S.PremiumStatusContainer color={premiumStatus.cancel.color}>
          <LiaExclamationCircleSolid />
          <b>{premiumStatus.cancel.title}</b>
          <p style={{ color: token.colorText }}>
            {premiumStatus.cancel.message}
          </p>
          {premiumStatus.cancel.subMessage !== '' && (
            <p style={{ color: token.colorText }}>
              {premiumStatus.cancel.subMessage}
            </p>
          )}
          <Button
            disabled={isLoadingCheckout}
            onClick={() => navigate('/admin/estabelecimento')}
          >
            Retornar para a plataforma
          </Button>
        </S.PremiumStatusContainer>
      ) : currentCheckoutStatus === 'processando' ? (
        <S.PremiumStatusContainer color={premiumStatus.inProgress.color}>
          <LiaExclamationCircleSolid />
          <b>{premiumStatus.inProgress.title}</b>
          <p style={{ color: token.colorText }}>
            {premiumStatus.inProgress.message}
          </p>
          {premiumStatus.inProgress.subMessage !== '' && (
            <p style={{ color: token.colorText }}>
              {premiumStatus.inProgress.subMessage}
            </p>
          )}
          <Button
            disabled={isLoadingCheckout}
            onClick={() => navigate('/admin/estabelecimento')}
          >
            Retornar para a plataforma
          </Button>
        </S.PremiumStatusContainer>
      ) : (
        <S.PremiumStatusContainer color={premiumStatus.failed.color}>
          <LiaTimesCircleSolid />
          <b>{premiumStatus.failed.title}</b>
          <p style={{ color: token.colorText }}>
            {premiumStatus.failed.message}
          </p>
          {premiumStatus.failed.subMessage !== '' && (
            <p style={{ color: token.colorText }}>
              {premiumStatus.failed.subMessage}
            </p>
          )}
          <Button
            disabled={isLoadingCheckout}
            onClick={() => navigate('/admin/estabelecimento')}
          >
            Retornar para a plataforma
          </Button>
        </S.PremiumStatusContainer>
      )}
    </S.PremiumStatus>
  )
}

export default PremiumStatus

const premiumStatus = {
  success: {
    title: 'Obrigado! Tudo Confirmado!',
    message:
      'Obrigado por escolher nossa assinatura. Sua transação foi concluída com sucesso.',
    subMessage: 'Você agora tem acesso aos nossos incríveis benefícios.',
    color: 'rgb(102, 204, 102)'
  },
  cancel: {
    title: 'Desistiu do Checkout? Sem Problemas!',
    message:
      'Entendemos que às vezes é preciso reconsiderar. Se você decidiu cancelar o checkout, não se preocupe. Estamos aqui para apoiar sua escolha. Se tiver alguma dúvida ou precisar de assistência em algum momento, nossa equipe está pronta para ajudar.',
    subMessage:
      'Obrigado por considerar nossa oferta, e esperamos vê-lo novamente em breve. Sua satisfação é importante para nós!',
    color: 'rgb(255, 153, 51)'
  },
  failed: {
    title: 'Oops! Algo deu Errado!',
    message:
      'Lamentamos informar que ocorreu um problema durante o processamento do pagamento da sua assinatura.',
    subMessage: 'Por favor, verifique suas informações e tente novamente.',
    color: 'rgb(255, 51, 51)'
  },
  inProgress: {
    title: 'Quase lá!',
    message:
      'Estamos processando o seu pagamento. Por favor, aguarde um momento. Seu acesso será concedido assim que a transação for concluída.',
    subMessage: '',
    color: 'rgb(51, 102, 255)'
  }
}
