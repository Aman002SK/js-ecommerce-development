import axios from 'axios';
import Rating from '../components/Rating';
import { displayProducts } from './FilterPage';
import { hideLoading, showLoading, showMessage } from '../utils';
import { getUserInfo } from '../localStorage';
export let products = [];

let currentPage = 0;
let count = 0;
let activeFilter = '';
let activeSort = '';
let sortType = 0;
let search = '';

const { token } = getUserInfo();

const handlePage = (count) => {
  let pages = count / 5;

  let pageDiv = document.getElementById('pagination');

  while (pageDiv.firstChild) {
    pageDiv.removeChild(pageDiv.firstChild);
  }

  for (let i = 0; i < pages; i++) {
    let pageBtn = document.createElement('button');
    pageBtn.classList.add('pag-btn');
    pageBtn.id = i;
    pageBtn.textContent = i + 1;
    pageDiv.append(pageBtn);
  }

  let pageButtons = document.querySelectorAll('.pag-btn');

  pageButtons.forEach((btn) => {
    btn.addEventListener('click', async (e) => {
      let page = +e.currentTarget.id;
      currentPage = page;
      let response;
      try {
        response = await axios.post(
          'http://localhost:5000/api/products/filter',
          {
            filter: activeFilter,
            currentPage,
            field: activeSort,
            sortType,
            search,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              authorization: `Bearer ${token}`,
            },
          }
        );
      } catch (error) {
        showMessage(error.message);
      }

      let newProducts = response.data.products;

      count = response.data.count;

      let productsEl = displayProducts(newProducts, Rating);

      document.querySelector('.products').innerHTML = productsEl;
    });
  });
};

const HomeScreen = {
  after_render: () => {
    handlePage(count);
    document
      .getElementById('categories')
      .addEventListener('click', async (e) => {
        const selectedCat = e.target.textContent;
        activeFilter = selectedCat;
        let response;
        try {
          response = await axios.post(
            'http://localhost:5000/api/products/filter',
            {
              filter: activeFilter.toLowerCase(),
              currentPage,
              field: activeSort,
              sortType,
            },
            {
              headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${token}`,
              },
            }
          );
        } catch (error) {
          showMessage(error.message);
        }

        let newProducts = response.data.products;
        count = response.data.count;
        handlePage(count);

        const productsEls =
          selectedCat === 'All'
            ? displayProducts(newProducts, Rating)
            : displayProducts(newProducts, Rating);

        document.querySelector('.products').innerHTML = productsEls;
      });

    document.getElementById('sort').addEventListener('change', async (e) => {
      const selectedCategory = e.target.value;

      let newProducts;

      try {
        switch (selectedCategory) {
          case 'price-low':
            activeSort = 'price';
            sortType = 1;

            newProducts = await axios.post(
              'http://localhost:5000/api/products/filter',
              {
                filter: activeFilter.toLowerCase(),
                field: 'price',
                sortType: 1,
                page: currentPage,
              },
              {
                headers: {
                  'Content-Type': 'application/json',
                  authorization: `Bearer ${token}`,
                },
              }
            );
            break;

          case 'price-high':
            activeSort = 'price';
            sortType = -1;

            newProducts = await axios.post(
              'http://localhost:5000/api/products/filter',
              {
                filter: activeFilter.toLowerCase(),
                field: 'price',
                sortType: -1,
                page: currentPage,
              },
              {
                headers: {
                  'Content-Type': 'application/json',
                  authorization: `Bearer ${token}`,
                },
              }
            );
            break;

          case 'rating-low':
            activeSort = 'rating.rate';
            sortType = 1;

            newProducts = await axios.post(
              'http://localhost:5000/api/products/filter',
              {
                filter: activeFilter.toLowerCase(),
                field: 'rating.rate',
                sortType: 1,
                page: currentPage,
              },
              {
                headers: {
                  'Content-Type': 'application/json',
                  authorization: `Bearer ${token}`,
                },
              }
            );
            break;

          case 'rating-high':
            activeSort = 'rating.rate';
            sortType = -1;

            newProducts = await axios.post(
              'http://localhost:5000/api/products/filter',
              {
                filter: activeFilter.toLowerCase(),
                field: 'rating.rate',
                sortType: -1,
                page: currentPage,
              },
              {
                headers: {
                  'Content-Type': 'application/json',
                  authorization: `Bearer ${token}`,
                },
              }
            );
            break;

          default:
            newProducts = [...products];
            break;
        }
      } catch (error) {
        showMessage(error.message);
      }
      count = newProducts.data.count;
      handlePage(count);

      let productsEls = displayProducts(newProducts.data.products, Rating);

      document.querySelector('.products').innerHTML = productsEls;
    });

    let gridButton = document.querySelector('#grid-view');
    let listButton = document.querySelector('#list-view');

    let productWrapper = document.querySelector('.products');
    let allProducts = document.querySelectorAll('.product');

    gridButton.addEventListener('click', () => {
      productWrapper.classList.remove('list');
      productWrapper.classList.add('grid');

      allProducts.forEach((prod) => {
        prod.classList.remove('grid');
        prod.classList.add('list');
      });
    });

    listButton.addEventListener('click', () => {
      productWrapper.classList.remove('grid');
      productWrapper.classList.add('list');

      allProducts.forEach((prod) => {
        prod.classList.remove('list');
        prod.classList.add('grid');
      });
    });

    let searchInput = document.querySelector('.search');
    searchInput.addEventListener('keyup', async (e) => {
      const value = e.target.value.toLowerCase();

      if (value.length > 0) {
        try {
          search = value;
          let response = await axios.post(
            'http://localhost:5000/api/products/filter',
            {
              search: search,
              currentPage: currentPage,
            },
            {
              headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${token}`,
              },
            }
          );

          let newProducts = response.data.products;
          count = response.data.count;
          handlePage(count);

          let disEl = displayProducts(newProducts, Rating);

          document.querySelector('.products').innerHTML = disEl;
        } catch (error) {
          showMessage(error.message);
        }
      } else {
        displayProducts(products, Rating);
      }
    });

    /* setting the price */
    /* setting the price */
    /* setting the price */
    /* setting the price */
    const priceValue = document.querySelector('.priceValue');
    const priceRange = document.querySelector('.priceRange');
    let productsEl;
    const setPrice = (value) => {
      const priceList = products.map((item) => {
        return item.price;
      });

      const minPrice = Math.min(...priceList);
      const maxPrice = Math.max(...priceList);

      priceRange.min = minPrice;
      priceRange.max = maxPrice;
      //priceRange.value = maxPrice;
      //console.log(maxPrice);

      priceValue.textContent = maxPrice;

      priceValue.textContent = value;

      products = products.filter((item) => {
        return item.price <= value;
      });

      productsEl = displayProducts(products, Rating);

      document.querySelector('.products').innerHTML = productsEl;
    };

    document.querySelector('.priceRange').addEventListener('input', (e) => {
      setPrice(+e.target.value);
    });
  },

  render: async () => {
    showLoading();

    // let dataCount = 5;
    // const response = await fetch("http://localhost:5000/api/products", {
    let response;

    try {
      response = await axios({
        url: `http://localhost:5000/api/products/${currentPage}`,
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
      });

      products = response.data.products;
      count = response.data.count;
    } catch (error) {
      showMessage(error.message);
    }

    hideLoading();

    return `
    <div class="home-container">
      <aside class="sidebar">  
        <div class="filter-container">
            <h1 class="filter-title">Categories</h1>

            <div class='cats' id='categories'>
              <p class="cat" >All</p>
              <p class='cat' >Men's Clothing</p>
              <p class='cat' >Women's Clothing</p>
              <p class='cat' >Electronics</p>
              <p class='cat' >Jewelery</p>
            </div>

            
        </div>    

        <div class="filter-container">
          <h1 class="filter-title">Maximum Price</h1>

          <div class="price">
            <input type="range" class="priceRange" /><span class="priceValue"></span>
          </div>

          <h1 class="filter-title">Sort</h1>
          <div class="sorting" id="sorting">
              <select id="sort">
              <option disabled selected>Select a category</option>
              <option value="price-low">Price Low To High</option>
              <option value="price-high">Price High To Low</option>
              <option value="rating-low">Rating Low To High</option>
              <option value="rating-high">Rating High To Low</option>
              </select>
            </div>
        </div>
      </aside> 
      
      <div class="products-container">
        <div class="view-buttons">
          <button class="view-button" id="grid-view" title="Grid View">
            <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            fill="currentColor"
            viewBox="0 0 16 16"
            >
              <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zM2.5 2a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zM1 10.5A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3z"/>
            </svg>
          </button>

          <button class="view-button" id="list-view" title="List View">
            <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
          </button>
        </div>
        <ul class='products grid'>
        ${displayProducts(products.slice(0, 5), Rating)}
        </ul>   
        <div class='pagination' id='pagination'>
            </div>
      </div>
    </div>`;
  },
};

export default HomeScreen;
