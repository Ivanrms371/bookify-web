export const calculateSaving = (compare: number, price: number): number => {
  return Math.round(((compare - price) / compare) * 100);
};

export const calculateMonthlyPrice = (annualPrice: number): number => {
  return Number((annualPrice / 12).toFixed(2));
};
