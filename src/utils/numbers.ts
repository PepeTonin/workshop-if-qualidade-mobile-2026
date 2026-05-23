export function round(num: number, decimals: number): number {
  const operator = decimals < 1 ? 1 : 10 ** decimals;
  return Math.round(num * operator) / operator;
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

export function formatRating(value: number) {
  return `${value.toFixed(1)} / 5`;
}
