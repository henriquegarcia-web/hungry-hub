function formatCurrency(value: number) {
  const formattedCurrency = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value)

  return formattedCurrency
}

const formatStringToCurrency = (value: string) => {
  const numericValue = parseFloat(value.replace(/[^0-9]/g, ''))
  const formattedNumber = numericValue / 100

  if (isNaN(formattedNumber)) {
    return formatCurrency(0)
  }

  return formatCurrency(formattedNumber)
}

const formatByCurrency = (value: string) => {
  const numericValue = parseFloat(
    value.replace(/[^\d,.-]/g, '').replace(',', '.')
  )

  return numericValue
}

export { formatCurrency, formatStringToCurrency, formatByCurrency }
