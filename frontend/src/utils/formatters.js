// Banking Application ID & Number Formatting Helpers

export const formatCustomerId = (id) => {
  if (!id && id !== 0) return 'N/A';
  // Strip non-digits if already formatted
  const numericId = String(id).replace(/\D/g, '');
  const num = numericId ? parseInt(numericId, 10) : id;
  const strId = String(num).padStart(6, '0');
  return `CUST-${strId}`;
};

export const formatAccountId = (id) => {
  if (!id && id !== 0) return 'N/A';
  const numericId = String(id).replace(/\D/g, '');
  const num = numericId ? parseInt(numericId, 10) : id;
  const strId = String(num).padStart(8, '0');
  return `ACC-${strId}`;
};

export const formatAccountNumber = (accNum) => {
  if (!accNum) return 'N/A';
  const str = String(accNum);
  if (str.length >= 8) {
    return str.replace(/(\d{4})(?=\d)/g, '$1-');
  }
  return `ACC-${str.padStart(8, '0')}`;
};
