
// Small shared formatting helpers used across vehicle cards,
// detail pages, and the admin dashboard later, so price and mileage
// always display the same way everywhere.

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatMileage(mileage: number): string {
  return `${new Intl.NumberFormat("en-US").format(mileage)} mi`;
}


