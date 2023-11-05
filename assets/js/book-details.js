
  `use strict`;
  import {bookData} from '/assets/js/sharedJs/books-slider.js'
  console.log(bookData)
  let selectedBook = JSON.parse(localStorage.getItem('selectedBook'))
  console.log(selectedBook)
  // Elements

// Product details 
const bookmarkBookDiv= document.querySelector(`.bookmark-book`)
const bookmarkBookIcon = document.querySelector(`.bookmark-book-icon`)
const subImages = document.querySelectorAll(`.book-details-sec .container .book-gallery .sub-images .sub-image`)
const mainImage = document.querySelector(`.book-details-sec .container .book-gallery .main-image-div .main-image img`)
const qytArrows = document.querySelector(`.action-on-book .qyt .qyt-arrows`)
const qytInput = document.querySelector(`.action-on-book .qyt .qyt-input`)
const qytUp = document.querySelector(`.action-on-book .qyt .qyt-arrows .qyt-up`)
const qytDown = document.querySelector(`.action-on-book .qyt .qyt-arrows .qyt-down`)
const ActionInputValue = document.querySelectorAll(`.qyt-input-value`)
const bookMoreDetails = document.querySelector(`.book-more-details`)
const bookMoreDetailsBtn = document.querySelector(`.book-more-details-btn`)



// Bookmark book
bookmarkBookDiv.addEventListener(`click`, bookmarkBook)
function bookmarkBook(e) {
    // e.target.style.color = "orange"
    e.target.classList.toggle(`book-bookmarked`)
    // bookmarkBookIcon.style.color = "red"
}

// Quantity-changing 
// On clicking 
qytUp.addEventListener(`click`, function () {
    if (qytInput.value>= 0) { qytInput.value++; changeSubmitValue()}
})
qytDown.addEventListener(`click`, function () {
    if (qytInput.value> 0) { qytInput.value--; changeSubmitValue()}
})
// On input 
qytInput.oninput = changeSubmitValue; // only refer no call
function changeSubmitValue() {
    // Don't allow very big sized numbers
    qytInput.value = qytInput.value.length < 6 ? qytInput.value : 0;
    document.querySelector(`.add-book-to-cart-submit`).value = qytInput.value > 0 ? `Add ${qytInput.value} book${qytInput.value > 1 ? "s" : ""} to cart`: "Add to cart";
    document.querySelector(`.buy-book-submit`).value = qytInput.value > 0 ? `Buy ${qytInput.value} book${qytInput.value > 1 ? "s" : ""}`: "Buy";
}
// const subImages = document.querySelectorAll(`.sub-image `)
console.log(mainImage)
// Go to more details
bookMoreDetailsBtn.addEventListener(`click`, toMoreDetail)
function toMoreDetail() {
    bookMoreDetails.scrollIntoView({top : 100 , scroll :"smooth"});
}






  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////    PRODUCT DETAILS
// Change images in gallery
  subImages.forEach(subImage => {
    subImage.addEventListener(`click`, function () {
        subImages.forEach(si => {si.classList.remove('active-sub-image')})
        
        subImage.classList.add('active-sub-image')
        mainImage.src = subImage.querySelector(`img`).getAttribute(`src`)
    })
  })

  