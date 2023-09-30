import { useMemo, useState } from 'react'

import * as S from './styles'
import {
  LiaLinkSolid,
  LiaQrcodeSolid,
  LiaWhatsapp,
  LiaFacebook
} from 'react-icons/lia'

import { ColorPicker, Modal, QRCode, message } from 'antd'
import { FacebookShareButton, WhatsappShareButton } from 'react-share'
import ClipboardJS from 'clipboard'

import { useAdminAuth } from '@/contexts/AdminAuthContext'

const Disclosure = () => {
  const { userData } = useAdminAuth()

  const [isQrCodeModalOpen, setIsQrCodeModalOpen] = useState(false)
  const [backgroundColor, setBackgroundColor] = useState<string>('#FFFFFF')
  const [lineColor, setLineColor] = useState<string>('#000000')

  const disclosureLinks = useMemo(() => {
    const companyId = userData?.adminCompanyInfo?.companyId
    const companyActive = userData?.adminCompanyInfo?.companyActive
    const companyContacts = userData?.adminCompanyInfo?.companyContacts

    const shareUrl = `https://www.hungryhub.com.br/${companyId}`

    const mainValidation = !!companyId && companyActive

    return {
      mainLink: {
        enable: mainValidation,
        link: shareUrl
      },
      qrCodeLink: {
        enable: mainValidation,
        link: shareUrl
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
  }, [userData])

  const handleCopyLink = () => {
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

  const showQrCodeModal = () => setIsQrCodeModalOpen(true)

  const handleOk = () => {
    downloadQRCode()
    setDefaultQrCodeColors()
    setIsQrCodeModalOpen(false)
  }

  const handleCancel = () => {
    setDefaultQrCodeColors()
    setIsQrCodeModalOpen(false)
  }

  return (
    <S.Disclosure>
      <S.DisclosureWrapper>
        {/* =========================================== LINK */}

        <S.DisclosureMethodWrapper
          disabled={!disclosureLinks.mainLink.enable ? 1 : 0}
        >
          <S.DisclosureMethod
            background="#FF7A00"
            className="main_link"
            data-clipboard-text={disclosureLinks.mainLink.link}
            onClick={handleCopyLink}
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
          <S.DisclosureMethod background="#2f2f2f" onClick={showQrCodeModal}>
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

      <Modal
        title="Gerador de QR Code"
        open={isQrCodeModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Baixar QR Code"
        cancelText="Cancelar"
      >
        <S.QrCodeModalContent id="myqrcode">
          <QRCode
            size={256}
            value={disclosureLinks.qrCodeLink.link}
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
