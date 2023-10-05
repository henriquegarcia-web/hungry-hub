import * as S from './styles'

interface IPremiumStatus {
  statusId: 'sucesso' | 'cancelado'
}

const PremiumStatus = ({ statusId }: IPremiumStatus) => {
  return (
    <S.PremiumStatus>
      {statusId === 'sucesso' ? (
        <>SUCESSO</>
      ) : statusId === 'cancelado' ? (
        <>CANCELADO</>
      ) : (
        <>NÃO FOI POSSÍVEL OBTER DADOS DO PAGAMENTO</>
      )}
    </S.PremiumStatus>
  )
}

export default PremiumStatus
