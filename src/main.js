const stripe = Stripe('pk_test_51ROswmQoWqQ4g3iBD9JIBJioKDibNd62H2QKbvjTZPqrDbMhTFMgHIoTdkgUMIUolZ1rg19Y2cD3NUM0vRNZ8Vjw006BloLVfr');

document.getElementById('checkout-button').addEventListener('click', () => {
  fetch('/create-checkout-session')
    .then(res => res.json())
    .then(data => {
      return stripe.redirectToCheckout({ sessionId: data.sessionId });
    })
    .catch(err => console.error(err));
});
