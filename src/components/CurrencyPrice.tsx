"use client";

import { useCurrency } from "@/context/CurrencyContext";

// Small client-only wrapper so a price can be displayed correctly in
// the selected currency from inside a server component page (like the
// vehicle detail page), without converting that whole page to a
// client component just for one number.
export default function CurrencyPrice({ amount }: { amount: number }) {
  const { format } = useCurrency();
  return <>{format(amount)}</>;
}
