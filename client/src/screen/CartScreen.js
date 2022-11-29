import { getProduct } from '../api';
import { getCartItems, setCartItems } from '../localStorage';
import { parseRequestUrl, rerender, showMessage } from '../utils';

const addToCart = (item, forceUpdate = false) => {
  let cartItems = getCartItems();

  const existItem = cartItems.find((x) => x.product === item.product);
  if (existItem) {
    cartItems = cartItems.map((x) =>
      x.product === existItem.product ? item : x
    );
  } else {
    cartItems = [...cartItems, item];
    toastr.success('added to cart successfully');
  }

  setCartItems(cartItems);
  // if (forceUpdate) {
  //   rerender(CartScreen);
  // }
};

const deleteFromCart = (id) => {
  setCartItems(getCartItems().filter((x) => x.product !== id));
  if (id == parseRequestUrl().id) {
    document.location.hash = '/cart';
  } else {
    rerender(CartScreen);
  }
};
const CartScreen = {
  after_render: () => {
    let qtyInputs = document.querySelectorAll('.qty');
    let prices = document.querySelectorAll('.cart-price');
    let cartItems = getCartItems();

    let subTotalText = document.querySelector('.subtotal');

    let subTotal = 0;

    cartItems.forEach((item) => {
      if (!item.price) return;

      subTotal += +item.price * +item.qty;
    });

    qtyInputs.forEach((input, i) => {
      input.addEventListener('change', (e) => {
        let currentPrice = +cartItems[i].price;
        let quantity = +e.target.value;
        let oldPrice = +prices[i].textContent;

        let newPrice = currentPrice * quantity;

        prices[i].textContent = newPrice;

        if (newPrice > oldPrice) {
          subTotal += currentPrice;
        } else {
          subTotal -= currentPrice;
        }

        subTotalText.textContent = subTotal.toFixed(2);

        const item = getCartItems().find((x) => x.product == input.id);
        addToCart({ ...item, qty: Number(e.target.value) }, true);
      });
    });

    // Array.from(qtyInputs).forEach((qtyInput) => {
    //   qtyInput.addEventListener('change', (e) => {
    //     const item = getCartItems().find((x) => x.product == qtyInput.id);
    //     addToCart({ ...item, qty: Number(e.target.value) }, true);
    //   });
    // });

    const deleteButtons = document.getElementsByClassName('delete-button');

    Array.from(deleteButtons).forEach((deleteButton) => {
      deleteButton.addEventListener('click', () => {
        //console.log(deleteButton.id, 'hi');
        deleteFromCart(deleteButton.id);
      });

      document
        .getElementById('checkout-button')
        .addEventListener('click', () => {
          document.location.hash = '/shipping';
        });
    });
  },
  render: async () => {
    let product;
    const request = parseRequestUrl();
    try {
      if (request.id) {
        product = await getProduct(request.id);
        addToCart({
          product: product._id,
          name: product.title,
          image: product.image,
          price: product.price,
          qty: 1,
        });
      }
    } catch (error) {
      showMessage(error);
    }

    const cartItems = getCartItems();

    return `
    <div class="cart content">
      <div class="class-list">
        <h3> Shopping Cart </h3>
        <div class="class-list-container">
        ${
          cartItems.length === 0
            ? '<div>Cart is empty. <a href="/#/"> Continue Shopping </a>'
            : cartItems
                .map(
                  (item) =>
                    `<img src="${item.image}" class="cart-image" alt="${
                      item.name
                    }"/>

                  <div class="cart-name">
                    <div>
                      <a href="/#/product/${item.product}">${item.name}</a>
                    </div>
                  <div>
                      Qty:
                    <input type="number" name="qty" min="0" value="${
                      item.qty
                    }" class="qty" id="${item.product}" />

                    <button type="button" class="delete-button" id="${
                      item.product
                    }">Delete</button>
                    </div>
                    <p class="cart-price">${+item.price * +item.qty}</p>
                  </div>`
                )
                .join('\n')
        }</div></div>
      <div class="cart-action">
        <h3 class="subtotal-wrapper">
          <span>
          Subtotal 
          </span>

          <span>
          (<span class="itemsCount">
          ${cartItems.reduce((a, c) => a + c.qty, 0)}
          </span>
          items ) :
          </span>


          <span class="subtotal">
          ${cartItems.reduce((a, c) => a + c.price * c.qty, 0).toFixed(2)}
          </span>
        </h3>
        <button id="checkout-button" class="primary-fw">Proceed to checkout</button>
      </div>
    </div>`;
  },
};

export default CartScreen;
