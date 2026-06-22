
export type CurrencyCode = 'USD' | 'GBP' | 'EUR';

export const CURRENCIES: Record<
  CurrencyCode,
  { symbol: string; label: string }
> = {
  USD: { symbol: '$', label: 'US Dollar' },
  GBP: { symbol: '£', label: 'British Pound' },
  EUR: { symbol: '€', label: 'Euro' },
};

export const CURRENCY_ORDER: CurrencyCode[] = ['USD', 'GBP', 'EUR'];


