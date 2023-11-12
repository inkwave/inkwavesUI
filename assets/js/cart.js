


const checkoutBtn = document.querySelector(`.checkout-btn`);
checkoutBtn.addEventListener(`click`, goToCheckOut)
function goToCheckOut() {
  // first create a state that the user is going to the checkout page by clicking the button and not any way else like pasting the path in the url input directly 
  sessionStorage.setItem(`isUserCheckingOut`,`true`)
  window.location.href = '/pages/checkout.html'
}

// Control quantity

const cartQytBtns = document.querySelectorAll(`.cart-qyt-btn`)
cartQytBtns.forEach(qBtn => {controlQyt(qBtn)})
function controlQyt (qBtn) {
qBtn.addEventListener(`click`, _ => {
  let prodId = qBtn.getAttribute(`qyt-prod-id`)
  let qytBtnType = qBtn.getAttribute(`qut-btn-type`)
  
  // get the input of that product
  const thisInput = document.querySelector(`[qyt-input-prod-id = '${prodId}']`)
  qytBtnType == 'up' ?   thisInput.value ++ : thisInput.value > 1 ? thisInput.value -- : thisInput.value = 1 ; 
  console.log(thisInput.value)
  let totalPriceEl = document.querySelector(`[total-price-prod-id = '${prodId}']`)
  let productPrice = document.querySelector(`[prod-price-id = '${prodId}']`).getAttribute(`value`)
  console.log(  thisInput.value * productPrice)
  totalPriceEl.textContent = thisInput.value * productPrice
})
}