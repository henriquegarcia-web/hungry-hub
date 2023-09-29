import * as S from './styles'
import {
  LiaLinkSolid,
  LiaQrcodeSolid,
  LiaWhatsapp,
  LiaFacebook,
  LiaInstagram
} from 'react-icons/lia'

const Disclosure = () => {
  return (
    <S.Disclosure>
      <S.DisclosureWrapper>
        <S.DisclosureMethod background="#FF7A00">
          <S.DisclosureMethodIcon>
            <LiaLinkSolid />
          </S.DisclosureMethodIcon>
          <S.DisclosureMethodLabel>
            Gerar Link do Cardápio
          </S.DisclosureMethodLabel>
        </S.DisclosureMethod>
        <S.DisclosureMethod background="#2f2f2f">
          <S.DisclosureMethodIcon>
            <LiaQrcodeSolid />
          </S.DisclosureMethodIcon>
          <S.DisclosureMethodLabel>Gerar QR Code</S.DisclosureMethodLabel>
        </S.DisclosureMethod>
        <S.DisclosureMethod background="#25D366">
          <S.DisclosureMethodIcon>
            <LiaWhatsapp />
          </S.DisclosureMethodIcon>
          <S.DisclosureMethodLabel>
            Compatilhar no WhatsApp
          </S.DisclosureMethodLabel>
        </S.DisclosureMethod>
        <S.DisclosureMethod background="#1877F2">
          <S.DisclosureMethodIcon>
            <LiaFacebook />
          </S.DisclosureMethodIcon>
          <S.DisclosureMethodLabel>
            Compatilhar no Facebook
          </S.DisclosureMethodLabel>
        </S.DisclosureMethod>
        <S.DisclosureMethod background="#E4405F">
          <S.DisclosureMethodIcon>
            <LiaInstagram />
          </S.DisclosureMethodIcon>
          <S.DisclosureMethodLabel>
            Compatilhar no Instagram
          </S.DisclosureMethodLabel>
        </S.DisclosureMethod>
      </S.DisclosureWrapper>
    </S.Disclosure>
  )
}

export default Disclosure
