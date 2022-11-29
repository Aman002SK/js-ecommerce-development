/* eslint-disable operator-linebreak */
/* eslint-disable import/extensions */
/* eslint-disable quotes */
import Header from './components/Header.js';
import CartScreen from './screen/CartScreen.js';
import Error404Screen from './screen/Error404Screen.js';
import HomeScreen from './screen/HomeScreen.js';
import ProductScreen from './screen/ProductScreen.js';
import RegisterScreen from './screen/RegisterScreen.js';
import SigninScreen from './screen/SignInScreen.js';
import ProfileScreen from './screen/ProfileScreen.js';
// import FilterPage from "./screen/FilterPage";
import {
  hideLoading,
  parseRequestUrl,
  showLoading,
  showMessage,
} from './utils.js';
import ShippingScreen from './screen/Shipping.js';
import PaymentScreen from './screen/PaymentPage.js';
import PlaceOrderScreen from './screen/PlaceOrder.js';
import OrderScreen from './screen/OrderScreen.js';

const routes = {
  '/': SigninScreen,
  '/home': HomeScreen,
  '/product/:id': ProductScreen,
  '/order/:id': OrderScreen,
  '/cart/:id': CartScreen,
  '/cart': CartScreen,
  '/signin': SigninScreen,
  '/register': RegisterScreen,
  '/profile': ProfileScreen,
  '/shipping': ShippingScreen,
  '/payment': PaymentScreen,
  '/placeorder': PlaceOrderScreen,
};
const router = async () => {
  showLoading();
  const request = parseRequestUrl();
  const parseUrl =
    (request.resource ? `/${request.resource}` : '/') +
    (request.id ? '/:id' : '') +
    (request.action ? `/${request.action}` : '');
  const screen = routes[parseUrl] ? routes[parseUrl] : Error404Screen;

  const header = document.getElementById('header-container');
  header.innerHTML = Header.render();
  Header.after_render();
  const main = document.getElementById('main-container');
  try {
    main.innerHTML = await screen.render();

    if (screen.after_render) await screen.after_render();
    hideLoading();
  } catch (error) {
    showMessage(error.message);
  }
};
window.addEventListener('load', router);
window.addEventListener('hashchange', router);

export default router;
