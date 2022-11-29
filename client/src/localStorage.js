export const getCartItems = () => {
  const cartItems = localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : [];
  //console.log(cartItems);
  return cartItems;
};

export const setCartItems = (cartItems) => {
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
};

// let args = {
//   _id: "",
//   name: "",
//   email: "",
//   password: "",
//   token: "",
// };

export const setUserInfo = ({
  _id = '',
  name = '',
  email = '',
  password = '',
  token = '',
}) => {
  localStorage.setItem(
    'userInfo',
    JSON.stringify({
      _id,
      name,
      email,
      password,
      token,
    })
  );
};

export const clearUser = () => {
  localStorage.removeItem('userInfo');
};

export const getUserInfo = () => {
  return localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : { name: '', email: '', password: '' };
};

export const getShipping = () => {
  const shipping = localStorage.getItem('shipping')
    ? JSON.parse(localStorage.getItem('shipping'))
    : {
        address: '',
        city: '',
        postalCode: '',
        country: '',
      };
  return shipping;
};

export const setShipping = ({
  address = '',
  city = '',
  postalCode = '',
  country = '',
}) => {
  localStorage.setItem(
    'shipping',
    JSON.stringify({ address, city, postalCode, country })
  );
};

export const getPayment = () => {
  const payment = localStorage.getItem('payment')
    ? JSON.parse(localStorage.getItem('payment'))
    : {
        paymentMethod: 'paypal',
      };
  return payment;
};

export const setPayment =
  () =>
  ({ paymentMethod = 'paypal' }) => {
    localStorage.setItem('payment', JSON.stringify({ paymentMethod }));
  };
