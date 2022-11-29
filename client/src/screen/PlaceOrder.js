import { createOrder } from '../api';
import CheckoutSteps from '../components/CheckoutSteps';
//import Order from '../../../backend/models/orderModel';
import {
  getCartItems,
  getPayment,
  getShipping,
  getUserInfo,
} from '../localStorage';
import { hideLoading, showLoading, showMessage } from '../utils';

const findOrder = () => {
  let orderItems = getCartItems();

  if (orderItems.length == 0) {
    document.location.hash = '/cart';
  }

  const shipping = getShipping();

  if (!shipping.address) {
    document.location.hash = '/shipping';
  }

  const user = getUserInfo();
  if (!user) {
    document.location.hash = '/signin';
  }
  const payment = getPayment();
  if (!payment.paymentMethod) {
    document.location.hash = '/payment';
  }

  const itemsPrice = orderItems.reduce((a, c) => a + c.qty * c.price, 0);

  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const totalPrice = itemsPrice + shippingPrice;

  return {
    orderItems,
    shipping,
    payment,
    name: user,
    itemsPrice,
    shippingPrice,
    totalPrice,
  };
};

const PlaceOrderScreen = {
  after_render: () => {
    document
      .getElementById('placeorder-button')
      .addEventListener('click', async () => {
        const order = findOrder();
        showLoading();
        let data;
        try {
          data = await createOrder(order);
        } catch (error) {
          showMessage(error.message);
        }
        hideLoading();
        if (data.error) {
          console.log(data.error);
          // showMessage(data.error);
        } else {
          // cleanCart();
          toastr.success('order placed successfully');
          document.location.hash = `/order/${data.order._id}`;
        }
      });
  },
  render: () => {
    const {
      orderItems,
      shipping,
      payment,
      itemsPrice,
      shippingPrice,
      totalPrice,
    } = findOrder();
    return `
  <div>
    ${CheckoutSteps.render({
      step1: true,
      step2: true,
      step3: true,
      step4: true,
    })}
    <div class="order">
      <div class="order-info">
        <div>
          <h2>Shipping</h2>

          <div>
          ${shipping.address}, ${shipping.city}, ${shipping.postalCode}, ${
      shipping.country
    }
          </div>
        </div>

        <div>
          <h2>Payment</h2>
          
          <div>
          Payment Method: ${payment.paymentMethod}
          </div>
        </div>

        <div>
          <div class="cart-list-container">
          <div>
            <h2>Shopping Cart</h2>
          </div>

            ${orderItems
              .map(
                (item) =>
                  `<div>
                <div class="cart-image">
                    <img src="${item.image}" alt="${item.name}" />
                </div>

                <div class="cart-name">
                    <div>
                      <a href="/#/product/${item.product}">${item.name} </a>
                    </div>
                    <p> Qty: ${item.qty} </p>
                </div>

                <div class="cart-price"> ${item.price}</div>
              </div>
                `
              )
              .join('\n')}
            </div>
          </div>
        </div>

        <div class="order-action">
          <div>
            <h2>Order Summary</h2>
            
            <div class="summary-section">
              <p>Items Cost</p>
              <p>${itemsPrice}</p>
            </div>
            
            <div class="summary-section">
              <p>Shipping Cost</p>
              <p>${shippingPrice}</p>
            </div>

            <div class="total">
              <p>Order Total</p>
              <p>${totalPrice.toFixed(2)}</p>
            </div> 
                 
            <button id="placeorder-button" class="primary fw">Place Order</button>
          </div>
        </div>
    </div>
  </div>`;
  },
};

export default PlaceOrderScreen;
