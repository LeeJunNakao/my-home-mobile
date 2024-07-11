export const maskCurrency = (value: string | number) => {
  const rawValue = String(value);

  const numericValue = rawValue.replace(/\D/g, "");

  const decimalPart = numericValue.slice(-2);
  const intPart = numericValue.slice(0, -2);

  const decimalParsed = `00${decimalPart}`.slice(-2);

  return `${Number(intPart || 0)}.${decimalParsed}`;
};

export const maskCurrencyToInt = (value: string) => {
  const numericValue = value.replace(/\D/g, "");

  return Number(numericValue);
};

export const toCurrencyInteger = (value: number) => {
  return Number((value * 100).toFixed(0));
};
