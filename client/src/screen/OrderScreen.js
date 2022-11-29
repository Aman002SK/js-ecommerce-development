import { getOrder } from '../api';
import { parseRequestUrl } from '../utils.js';

const OrderScreen = {
  after_render: () => {},
  render: async () => {
    let request;
    try {
      request = parseRequestUrl();
      // console.log(request);
      var {
        _id,
        orderItems,
        shipping,
        payment,
        itemsPrice,
        shippingPrice,
        totalPrice,
      } = await getOrder(request.id);
    } catch (error) {
      showMessage(error);
    }
    return `
  <div>
    <h1>OrderID: ${_id}</h1>
    <div class="order">
        <div class="order-info">
            <div>
                <h2>Shipping</h2>
                <div>
                    ${shipping.address}, ${shipping.city}, ${
      shipping.postalCode
    }, ${shipping.country}
                </div>
            </div>
            <div>
                <h2>Payment</h2>
                <div>
                    Payment Method: ${payment.paymentMethod}
                </div>
            </div>
            <div>
                <ul class="cart-list-container"><li>
                <h2>Shopping Cart</h2>
                <div>Price</div>
              </li>
              ${orderItems
                .map(
                  (item) => `
                <li>
                  <div class="cart-image">
                    <img src="${item.image}" alt="${item.name}" />
                  </div>
                  <div class="cart-name">
                    <div>
                      <a href="/#/product/${item.product}">${item.name} </a>
                    </div>
                    <div> Qty: ${item.qty} </div>
                  </div>
                  <div class="cart-price"> ${item.price}</div>
                </li>
                `
                )
                .join('\n')}
            </ul>
          </div>
        </div>
        <div class="order-action">
           <ul>
                <li>
                  <h2>Order Summary</h2>
                 </li>
                 <li><div>Items</div><div>${itemsPrice}</div></li>
                 <li><div>Shipping</div><div>${shippingPrice}</div></li>
                 <li class="total"><div>Order Total</div><div>${totalPrice.toFixed(
                   2
                 )}</div></li> 
                 <li>
                </ul>
            </div>
        </div>
    </div>
  </div>`;
  },
};

export default OrderScreen;
