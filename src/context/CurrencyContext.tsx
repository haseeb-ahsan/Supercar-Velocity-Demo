
'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { CurrencyCode } from '@/lib/currency';

interface CurrencyContextType {
  currency: CurrencyCode;
  setCurrency: (code: CurrencyCode) => void;
  format: (amountInGBP: number) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(
  undefined
);

// Demo exchange rates based on GBP being the base currency (1.0)
const EXCHANGE_RATES: Record<CurrencyCode, number> = {
  GBP: 1.0,
  USD: 1.27,
  EUR: 1.17,
};

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrency] = useState<CurrencyCode>('GBP');

  const format = (amountInGBP: number) => {
    const convertedAmount = amountInGBP * EXCHANGE_RATES[currency];

    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: currency,
      maximumFractionDigits: 0,
    }).format(convertedAmount);
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, format }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}


