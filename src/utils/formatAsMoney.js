export const formatAsMoney = (amount) => {
  if (!amount) {
    amount = 0;
  }
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
  }).format(amount);
};
