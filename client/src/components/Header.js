import axios from 'axios';
import { displayProducts } from '../screen/FilterPage';
import { products } from '../screen/HomeScreen';
import Rating from './Rating';

const { getUserInfo } = require('../localStorage');

const Header = {
  after_render: () => {
    let burgerButton = document.querySelector('.burger-icon');

    burgerButton &&
      burgerButton.addEventListener('click', (e) => {
        let sidebar = document.querySelector('.sidebar');

        sidebar.classList.toggle('burger-menu');
      });
  },

  render: () => {
    const { name } = getUserInfo();

    let location = document.location.hash;

    let showBurgerIcon = false;

    if (location === '#/home' || location === '#/') {
      showBurgerIcon = true;
    }

    return `
    <div class="brand">
      <button class=${showBurgerIcon ? 'burger-icon' : 'hidden'}>
        <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="#fff"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
      </button>

      <a href="/#/home">Shop</a>
    </div>
    <input type="text" placeholder="search..." class="search">
    <div class="nav-links">
  
    

      ${
        name
          ? `
          <a href="/#/cart" class="nav-link">
      <svg
      xmlns="http://www.w3.org/2000/svg"
      width="26"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
      </svg>

      <span>
        Cart
      </span>
    </a>
          <a href="/#/profile" class="nav-link nav-link-user">
          
          <svg 
          xmlns="http://www.w3.org/2000/svg"
          width="26"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>

          <span>
            ${name}
          </span>
          </a>`
          : `<a href="/#/signin" class="nav-link">Sign-In</a>`
      }
    </div>`;
  },
};

export default Header;
