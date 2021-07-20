export const isValidDate = (date: string): boolean => {
  const dateRegex = /(\d{4})-(\d{2})-(\d{2})/;

  if (!dateRegex.test(date)) return false;

  const numbers = date.split('-').map((n) => parseInt(n));

  if (numbers.length !== 3) return false;

  if (numbers[2] < 0 || numbers[2] > 31) return false;
  if (numbers[1] < 0 || numbers[1] > 12) return false;
  if (numbers[0] < 1900 || numbers[0] > 2100) return false;

  return true;
};
