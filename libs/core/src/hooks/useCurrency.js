import { useAppContext } from './useAppContext';

export const useCurrency = () => {
  const config = useAppContext();
  return {
    formatPrice: (price = 0) => {
      const { shouldRoundIntegerValues, currency, locale } =
        config.features.currency;

      const hasDecimal = Number.parseFloat(price) % 1 !== 0;
      const decimals = !hasDecimal && shouldRoundIntegerValues ? 0 : undefined;

      const formater = new Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
        maximumFractionDigits: decimals,
        minimumFractionDigits: decimals
      });

      return formater.format(price);
    }
  };
};
