import { useEffect, useMemo, useState } from 'react'

import * as S from './styles'
import {
  LiaLinkSolid,
  LiaQrcodeSolid,
  LiaWhatsapp,
  LiaFacebook,
  LiaExclamationCircleSolid
} from 'react-icons/lia'

import { ColorPicker, Modal, QRCode, message, theme } from 'antd'
import { FacebookShareButton, WhatsappShareButton } from 'react-share'
import ClipboardJS from 'clipboard'

import { useAdminAuth } from '@/contexts/AdminAuthContext'

const Disclosure = () => {
  const { token } = theme.useToken()

  const { userData, isAdminPremium } = useAdminAuth()

  const [isQrCodeModalOpen, setIsQrCodeModalOpen] = useState<boolean>(false)
  const [qrCodeLink, setQrCodeLink] = useState<string | null>(null)
  const [backgroundColor, setBackgroundColor] = useState<string>('#FFFFFF')
  const [lineColor, setLineColor] = useState<string>('#000000')

  const disclosureLinks = useMemo(() => {
    const companyId = userData?.adminCompanyInfo?.companyId
    const companyActive = userData?.adminCompanyInfo?.companyActive
    const companyActiveTestMode =
      userData?.adminCompanyInfo?.companyActiveTestMode
    const companyContacts = userData?.adminCompanyInfo?.companyContacts

    const shareUrl = `https://www.hungryhub.com.br/${companyId}`
    const shareTestUrl = `https://www.hungryhub.com.br/teste/${companyId}`

    const mainValidation = !!companyId && companyActive && isAdminPremium

    return {
      mainLink: {
        enable: mainValidation,
        link: shareUrl
      },
      testLink: {
        enable: !!companyId && companyActiveTestMode,
        link: shareTestUrl
      },
      qrCodeLink: {
        enable: mainValidation,
        link: shareUrl
      },
      qrCodeTestLink: {
        enable: !!companyId && companyActiveTestMode,
        link: shareTestUrl
      },
      whatsappLink: {
        enable: mainValidation && !!companyContacts?.companyWhatsapp,
        link: shareUrl
      },
      facebookLink: {
        enable: mainValidation && !!companyContacts?.companyFacebook,
        link: shareUrl
      }
    }
  }, [userData, isAdminPremium])

  const handleCopyMainLink = () => {
    const clipboard = new ClipboardJS('.main_link')

    clipboard.on('success', () => {
      message.open({
        type: 'success',
        content: 'Link copiado com sucesso!'
      })
      clipboard.destroy()
    })

    clipboard.on('error', () => {
      message.open({
        type: 'error',
        content: 'Falha ao copiar o link!'
      })
      clipboard.destroy()
    })
  }

  const handleCopyTestLink = () => {
    const clipboard = new ClipboardJS('.test_link')

    clipboard.on('success', () => {
      message.open({
        type: 'success',
        content: 'Link copiado com sucesso!'
      })
      clipboard.destroy()
    })

    clipboard.on('error', () => {
      message.open({
        type: 'error',
        content: 'Falha ao copiar o link!'
      })
      clipboard.destroy()
    })
  }

  const downloadQRCode = () => {
    const canvas = document
      .getElementById('myqrcode')
      ?.querySelector<HTMLCanvasElement>('canvas')
    if (canvas) {
      const url = canvas.toDataURL()
      const a = document.createElement('a')
      a.download = 'QRCode.png'
      a.href = url
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    }
  }

  const setDefaultQrCodeColors = () => {
    setBackgroundColor('#FFFFFF')
    setLineColor('#000000')
  }

  const showQrCodeModal = (link: string) => {
    setQrCodeLink(link)
    setIsQrCodeModalOpen(true)
  }

  const handleOk = () => {
    downloadQRCode()
    setDefaultQrCodeColors()
    setQrCodeLink(null)
    setIsQrCodeModalOpen(false)
  }

  const handleCancel = () => {
    setDefaultQrCodeColors()
    setQrCodeLink(null)
    setIsQrCodeModalOpen(false)
  }

  useEffect(() => {
    if (!qrCodeLink) {
      setDefaultQrCodeColors()
      setIsQrCodeModalOpen(false)
    }
  }, [qrCodeLink])

  return (
    <S.Disclosure>
      <S.DisclosureContainer>
        {!isAdminPremium && (
          <S.DisclosurePremiumAlert
            style={{
              backgroundColor: token.colorBgContainer,
              border: `1px solid ${token.colorPrimary}`
            }}
          >
            <LiaExclamationCircleSolid style={{ color: token.colorPrimary }} />
            <p style={{ color: token.colorPrimary }}>
              Você precisa ser <b>premium</b> para gerar links personalizados
            </p>
          </S.DisclosurePremiumAlert>
        )}

        <S.DisclosureWrapper>
          {/* =========================================== LINK MENU TEST */}

          <S.DisclosureMethodWrapper
            disabled={!disclosureLinks.testLink.enable ? 1 : 0}
          >
            <S.DisclosureMethod
              background="#FF7A00"
              className="test_link"
              data-clipboard-text={disclosureLinks.testLink.link}
              onClick={handleCopyTestLink}
            >
              <S.DisclosureMethodIcon>
                <LiaLinkSolid />
              </S.DisclosureMethodIcon>
              <S.DisclosureMethodLabel>
                Gerar Link do Cardápio de Teste
              </S.DisclosureMethodLabel>
            </S.DisclosureMethod>
          </S.DisclosureMethodWrapper>

          {/* =========================================== QR CODE TEST */}

          <S.DisclosureMethodWrapper
            disabled={!disclosureLinks.qrCodeTestLink.enable ? 1 : 0}
          >
            <S.DisclosureMethod
              background="#2f2f2f"
              onClick={() =>
                showQrCodeModal(disclosureLinks.qrCodeTestLink.link)
              }
            >
              <S.DisclosureMethodIcon>
                <LiaQrcodeSolid />
              </S.DisclosureMethodIcon>
              <S.DisclosureMethodLabel>
                Gerar QR Code de Teste
              </S.DisclosureMethodLabel>
            </S.DisclosureMethod>
          </S.DisclosureMethodWrapper>
        </S.DisclosureWrapper>

        <S.DisclosureWrapper>
          {/* =========================================== LINK MENU */}

          <S.DisclosureMethodWrapper
            disabled={!disclosureLinks.mainLink.enable ? 1 : 0}
          >
            <S.DisclosureMethod
              background="#FF7A00"
              className="main_link"
              data-clipboard-text={disclosureLinks.mainLink.link}
              onClick={handleCopyMainLink}
            >
              <S.DisclosureMethodIcon>
                <LiaLinkSolid />
              </S.DisclosureMethodIcon>
              <S.DisclosureMethodLabel>
                Gerar Link do Cardápio
              </S.DisclosureMethodLabel>
            </S.DisclosureMethod>
          </S.DisclosureMethodWrapper>

          {/* =========================================== QR CODE */}

          <S.DisclosureMethodWrapper
            disabled={!disclosureLinks.qrCodeLink.enable ? 1 : 0}
          >
            <S.DisclosureMethod
              background="#2f2f2f"
              onClick={() => showQrCodeModal(disclosureLinks.qrCodeLink.link)}
            >
              <S.DisclosureMethodIcon>
                <LiaQrcodeSolid />
              </S.DisclosureMethodIcon>
              <S.DisclosureMethodLabel>Gerar QR Code</S.DisclosureMethodLabel>
            </S.DisclosureMethod>
          </S.DisclosureMethodWrapper>

          {/* =========================================== WHATSAPP */}

          <S.DisclosureMethodWrapper
            disabled={!disclosureLinks.whatsappLink.enable ? 1 : 0}
          >
            <WhatsappShareButton
              url={disclosureLinks.whatsappLink.link || ''}
              title="Acesse agora meu cardápio online!"
              style={{ width: '100%' }}
            >
              <S.DisclosureMethod background="#25D366">
                <S.DisclosureMethodIcon>
                  <LiaWhatsapp />
                </S.DisclosureMethodIcon>
                <S.DisclosureMethodLabel>
                  Compatilhar no WhatsApp
                </S.DisclosureMethodLabel>
              </S.DisclosureMethod>
            </WhatsappShareButton>
          </S.DisclosureMethodWrapper>

          {/* =========================================== FACEBOOK */}

          <S.DisclosureMethodWrapper
            disabled={!disclosureLinks.facebookLink.enable ? 1 : 0}
          >
            <FacebookShareButton
              url={disclosureLinks.facebookLink.link || ''}
              style={{ width: '100%' }}
            >
              <S.DisclosureMethod background="#1877F2">
                <S.DisclosureMethodIcon>
                  <LiaFacebook />
                </S.DisclosureMethodIcon>
                <S.DisclosureMethodLabel>
                  Compatilhar no Facebook
                </S.DisclosureMethodLabel>
              </S.DisclosureMethod>
            </FacebookShareButton>
          </S.DisclosureMethodWrapper>
        </S.DisclosureWrapper>
      </S.DisclosureContainer>

      <Modal
        title="Gerador de QR Code"
        open={isQrCodeModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Baixar QR Code"
        cancelText="Cancelar"
        destroyOnClose
      >
        <S.QrCodeModalContent id="myqrcode">
          <QRCode
            size={256}
            value={qrCodeLink || ''}
            color={lineColor}
            bgColor={backgroundColor}
          />
          <S.QrCodeModalContentOptions>
            <ColorPicker
              style={{ justifyContent: 'flex-start' }}
              value={backgroundColor}
              onChange={(color) => setBackgroundColor(color.toHexString())}
              showText={() => (
                <span style={{ fontSize: 12, fontWeight: 500 }}>
                  Fundo do QR Code
                </span>
              )}
            />
            <ColorPicker
              style={{ justifyContent: 'flex-start' }}
              value={lineColor}
              onChange={(color) => setLineColor(color.toHexString())}
              showText={() => (
                <span style={{ fontSize: 12, fontWeight: 500 }}>
                  Cor do QR Code
                </span>
              )}
            />
          </S.QrCodeModalContentOptions>
        </S.QrCodeModalContent>
      </Modal>
    </S.Disclosure>
  )
}

export default Disclosure
