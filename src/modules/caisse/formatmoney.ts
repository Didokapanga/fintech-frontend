export const formatMoney = (value: number, devise: string) => {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: devise,
  }).format(value);
};