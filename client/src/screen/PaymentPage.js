import CheckoutSteps from '../components/CheckoutSteps';
import { getUserInfo, setPayment } from '../localStorage';

const PaymentScreen = {
  after_render: () => {
    document
      .getElementById('payment-form')
      .addEventListener('submit', async (e) => {
        e.preventDefault();
        const paymentMethod = document.querySelector(
          'input[name = "payment-method"]:checked'
        ).value;
        setPayment({ paymentMethod });
        document.location.hash = '/placeorder';
      });
  },

  render: () => {
    const { name } = getUserInfo();
    if (!name) {
      document.location.hash = '/home';
    }

    return `
    ${CheckoutSteps.render({ step1: true, step2: true, step3: true })}
<div class="form-container">
  <form id="payment-form">
    <div class="form-items">
        <h1>Payment</h1>

        <div class="form-control">
          <div>
            <input class="form-input" type="radio" name="payment-method" id="paypal" value="Paypal" checked/>
            <label class="form-label" for="paypal">PayPal</label>
          </div>
        </div>

        <div class="form-control">
          <div>
            <input class="form-input" type="radio" name="payment-method" id="upi" value="upi"/>
            <label class="form-label" for="upi">UPI</label>
          </div>
        </div>

        <button type="submit" class="form-submit primary">Continue</button>
    </div>
  </form>
</div>
    `;
  },
};
export default PaymentScreen;
