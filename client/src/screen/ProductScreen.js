/* eslint-disable quotes */
/* eslint-disable arrow-body-style */
import {
  hideLoading,
  parseRequestUrl,
  showLoading,
  showMessage,
} from '../utils';
import { getProduct } from '../api';
import Rating from '../components/Rating';

const ProductScreen = {
  after_render: () => {
    const request = parseRequestUrl();
    document.getElementById('add-button').addEventListener('click', () => {
      document.location.hash = `/cart/${request.id}`;
    });
  },
  render: async () => {
    const request = parseRequestUrl();
    showLoading();
    let product;
    try {
      product = await getProduct(request.id);
    } catch (error) {
      showMessage(error.message);
    }
    if (product.error) {
      return `<div>${product.error}</div>`;
    }
    hideLoading();
    return `<div class='content'>
    <div class='back-to-result'>
    <a href='/#/home'>
      <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      >
      <path stroke-linecap="round" stroke-linejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
      </svg>
    Back to home
    </a>
    </div>
    <div class='details'>
    <div class='details-image'>
    <img src='${product.image}' style="width:20rem" alt='${
      product.name
    }'/></div>
    <div class='details-info'>
      <ul>
        <li>
          <h1>${product.title}</h1>
        </li>

        <li>
        ${Rating.render({
          value: product.rating.rate,
          text: `${product.rating.count} reviews`,
        })}
        </li>

        <li>
        Price: <strong>&#8377; ${product.price}</strong>
        </li>
        <li>Description: 
          <div> ${product.description}
          </div>
        </li>

        <li>
          <button id='add-button' class='primary'>Add to Cart</button>
        </li>
      </ul>
    </div>
    </div>`;
  },
};

export default ProductScreen;

let price = 0;
let category = [];
let rating = 0;

// [].filter((p) => {
//   let filter = true;
//   // price
//   if (price) {
//     filter = p.price >= price;
//   }
//   // category
//   if (category.length) {
//     filter = category.includes(p.category);
//   }

//   // rating
//   if (rating) {
//     filter = p.rating >= rating;
//   }

//   return filter;
// });
