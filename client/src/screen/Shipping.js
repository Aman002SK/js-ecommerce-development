import CheckoutSteps from '../components/CheckoutSteps';
import { getUserInfo, getShipping, setShipping } from '../localStorage';

const ShippingScreen = {
  after_render: () => {
    document
      .getElementById('shipping-form')
      .addEventListener('submit', async (e) => {
        e.preventDefault();

        setShipping({
          address: document.getElementById('address').value,
          city: document.getElementById('city').value,
          postalCode: document.getElementById('postalCode').value,
          country: document.getElementById('country').value,
        });
        // console.log(getShipping());
        document.location.hash = '/payment';
      });
  },

  render: () => {
    const { name } = getUserInfo();
    if (!name) {
      document.location.hash = '/home';
    }
    const { address, city, postalCode, country } = getShipping();
    return `
    ${CheckoutSteps.render({ step1: true, step2: true })}
<div class="form-container">
  <form id="shipping-form">
    <div class="form-items">
      <h1>Shipping</h1>
      
      <div class="form-control">
        <label class="form-label" for="address">Address</label>
        <input type="text" name="address" class="form-input" id="address" value="${address}" />
      </div>

      <div class="form-control">
        <label class="form-label" for="city">City</label>
        <input type="text" name="city" id="city" class="form-input" value="${city}" />
      </div>

      <div class="form-control">
        <label class="form-label" for="postalCode">Postal Code</label>
        <input type="text" name="postalCode" class="form-input" id="postalCode" value="${postalCode}" />
      </div>

      <div class="form-control">
        <label class="form-label" for="country">Country</label>
        <input type="text" name="country" class="form-input" id="country" value="${country}" />
      </div>

      <button type="submit" class="form-submit primary">Continue</button>
    </div>
  </form>
</div>
    `;
  },
};
export default ShippingScreen;
