const currencyFormatter = (currency: string) => {
  const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  return formatter.format(Number(currency));
};

export default currencyFormatter;