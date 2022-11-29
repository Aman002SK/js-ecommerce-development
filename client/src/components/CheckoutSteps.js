const CheckoutSteps = {
  render: (props) => {
    return `
    <div class="checkout-steps">
      <div class="${props.steps1 ? 'active' : ' '}">SignIn</div>
      <div class="${props.steps2 ? 'active' : ' '}">Shipping</div>
      <div class="${props.steps3 ? 'active' : ' '}">Payment</div>
      <div class="${props.steps4 ? 'active' : ' '}">Place Order</div>
    </div>`;
  },
};

export default CheckoutSteps;
