// const products = document.querySelector('.products');
// const categoryContainer = document.querySelector('.cats');
// const priceValue = document.querySelector('.priceValue');

// const priceRange = document.querySelector('.priceRange');

const displayProducts = (filteredProducts, Rating) => {
  const filterProductsHTML = filteredProducts
    .map(
      (product) => `
      <li>
              <div class="product list">
                <a href="/#/product/${product._id}">
                  <img src="${product.image}" alt="${product.title}" />
                </a>

                <div class="product-info">
                  <div class="product-name">
                    <a href="/#/product/${product.id}"> ${product.title} </a>
                  </div>

                  <div class="product-rating">
                  ${Rating.render({
                    value: product.rating.rate,
                    text: `${product.rating.count} reviews`,
                  })}
                  </div>
                  
                  <div class="product-brand">${product.category}</div>
                  <div class="product-price">&#8377; ${product.price}</div>
                </div>
              </div>
      </li>`
    )
    .join('');
  //   </ul>;

  return filterProductsHTML;
};

// const setId = (products, rating, value) => {
//   const idList = products.map((item) => {
//     return item.id;
//   });

//   const minValue = Math.min(...idList);
//   const maxValue = Math.max(...idList);

//   idRange.min = minPrice;
//   idRange.max = maxPrice;
//   // priceRange.value = maxPrice;
//   // console.log(idRange);

//   //idValue.textContent = maxValue;

//   idRange.addEventListener('input', (e) => {
//     idValue.textContent = e.target.value;
//     displayProducts(
//       products.filter((item) => {
//         item.id <= e.target.value;
//       })
//     );
//   });
// };

//   let newProducts = products.filter((item) => item.price <= +value);

//   displayProducts(newProducts, rating);
// };
// //setPrice(products);

export { displayProducts };
