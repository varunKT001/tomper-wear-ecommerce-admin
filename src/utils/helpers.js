export const formatPrice = (number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'INR',
  }).format(number / 100);
};

export const formatAddress = (data) => {
  const { address, city, state, country, pinCode } = data;
  return `${address}, ${city}, ${state} - ${pinCode}, ${country}`;
};

export const getOrderStatusColor = (status) => {
  if (status === 'processing') {
    return 'orange';
  }
  if (status === 'rejected') {
    return 'red';
  }
  return 'green';
};

export const getAdminPrivilegeColor = (privilege) => {
  if (privilege === 'super') {
    return 'green';
  }
  if (privilege === 'moderate') {
    return 'blue';
  }
  if (privilege === 'low') {
    return 'brown';
  }
};
