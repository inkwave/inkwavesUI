"use strict";

//#region //////////////////////////////////////////////////////////////////////////////////////////////////////////////// fetch book store
// Page size logic


const pageSizes = document.querySelectorAll(`.page-size`);
highlight(pageSizes);
function highlight(elements) {
  elements.forEach((el) => {
    el.addEventListener(`click`, () => {
      elements.forEach((inertEl) => inertEl.classList.remove(`highlight`));
      el.classList.add(`highlight`);
    });
  });
}

////////// Resize bookstore
// The first time the user loads the page the size is not set into the local storage yet that's why we need to ensure that getting this value from the localStorage
// doesn't return null if it does then the chosenValue is a static value instead to not send null in the function call
let chosenPageSize = localStorage.getItem("selectedPageSize")
  ? localStorage.getItem("selectedPageSize")
  : 20;
pageSizes.forEach((sizeEl) => {
  sizeEl.addEventListener(`click`, () => resizeBookStore(sizeEl));
});
function resizeBookStore(sizeEl) {
  localStorage.setItem(`selectedPageSize`, sizeEl.getAttribute(`value`));
//   localStorage.setItem(`selectedSizeEl`, sizeEl); // you can not store a dom element inside local or session storage because it accepts only string key/value pair
  chosenPageSize = localStorage.getItem(`selectedPageSize`);
  updateBookStore("all", chosenPageSize);
}
let selectedSizeEl = document.querySelector(`[value = '${chosenPageSize}']`)
console.log(selectedSizeEl)
console.log(localStorage)
selectedSizeEl ? selectedSizeEl.classList.add(`highlight`):pageSizes[0].classList.add(`highlight`);
// Pagination logic
const paginationPageNumber = document.querySelector(`.pagination-page-number`);
const previousPage = document.querySelector(`.previous-page`);
const nextPage = document.querySelector(`.next-page`);
const bookStoreBodyOverlay = document.querySelector(`.book-store-body-overlay`);
const bookStoreBodyLoader = document.querySelector(`.book-store-body-loader`);
const paginationLoader = document.querySelector(`.pagination-loader`);
// create a variable that changes according to the category clicked, default is value to send is all to get all books
let selectedCategory = "all"; // can't leave it empty to not replace the parameter with an empty string instead of the default value `all`

nextPage.addEventListener(`click`, getNextPage);
previousPage.addEventListener(`click`, getPreviousPage);
// paginationPageNumber.addEventListener(`input`, );

// once next or previous button is clicked, increase or decrease the value and reveal the bg overlay and the loader indicating the the loading is ongoing,
// then update the bookstore by calling the fetching function using the selected category if a one is clicked or just use the default category 'all' if no category name is passed
async function getNextPage() {
  bookStoreBodyOverlay.classList.remove("hidden");
  paginationLoader.classList.remove("hidden");
  paginationPageNumber.value < 5 /* dynamic number of pages  */
    ? paginationPageNumber.value++
    : (paginationPageNumber.value = 5);
  // get the books with the selected category
  updateBookStore(selectedCategory);
}

async function getPreviousPage() {
  bookStoreBodyOverlay.classList.remove("hidden");
  paginationLoader.classList.remove("hidden");

  paginationPageNumber.value > 1
    ? paginationPageNumber.value--
    : (paginationPageNumber.value = 1);
  updateBookStore(selectedCategory);
}

async function getBooks(category = "all", pageSize = chosenPageSize) {
  // default size is 20 incase not passed with the function's call
  // default category is 'all', unnecessary to use a default value here as the variable selectedCategory was defaulted already;
  const booksUrl = `http://webstercassin1-001-site1.ftempurl.com/api/Items/paged?PageNumber=${paginationPageNumber.value}&PageSize=${pageSize}`;
  try {
    let response = await fetch(booksUrl);
    let data = await response.json();
    // once the data is fetched hide the background overlay and the loader
    bookStoreBodyOverlay.classList.add("hidden");
    paginationLoader.classList.add("hidden");
    bookStoreBodyLoader.classList.add("hidden");
    let booksDate = data.data;
    // return books of all categories by default or just the books with the selected category
    if (category == "all") {
      return booksDate;
    } else {
      return booksDate.filter((book) =>
        book.categorys.some((categoryObject) => categoryObject.name == category)
      );
      // iterate over the data returned that includes all the books in the page, then inside each book iterate (using some) over all the objects
      // inside the categorys array and if at least one or more result is found  return this book in the filtered array of books
    }
  } catch (error) {
    console.log(error.message);
    return [];
  }
}
//#endregion

//#region //////////////////////////////////////////////////////////////////////////////////////////////////////////////// Implement book store Elements
const bookStoreSection = document.querySelector(
  `.book-store-sec .container .book-store`
);
let allBooks = [];
updateBookStore(selectedCategory);
async function updateBookStore(category, pageSize) {
  let books = await getBooks(category, pageSize);
  allBooks = books;
  // Clear existing books before adding new ones
  bookStoreSection.innerHTML = "";
  books.forEach((book) => addBook(book));
}

function addBook(book) {
  const bookHTML = `
        <div class="book-store-product bg-light d-block" data-product-ID =${
          book.id
        }>
        <div class="book-store-product-image">
            <div class="book-store-product-bookmark"> <i
                    class="fa-solid fa-bookmark book-store-product-bookmark-icon"></i> </div>
            <img class="w-100 h-100 " src="${book.image}"
                alt="${book.title}">
            <div class="info-on-image d-flex align-items-center justify-content-between px-2 w-100">
                <div class="rating-on-image text-light "> <span class="rate "> 4.5</span> <span
                        class="rating-star"> <i class="fa-solid fa-star"
                            style="color: #d09c43;"></i></span> (<span class="ratings-count ">55</span>)
                </div>
                <div class="cart-on-image text-light"> <i class="fa-solid fa-cart-plus"></i> </div>
            </div>
        </div>
        <div class="book-store-product-details  w-100">
            <h6 class="book-store-product-title"> ${
              book.title.length > 45
                ? book.title.slice(1, 40) + "..."
                : book.title
            }</h6>
            <div class="book-store-product-price-details"> EGP <span class="book-store-product-price">
                   ${
                     book.price
                   } </span> <span class="book-store-product-old-price"> 190 </span> <span class="book-store-product-off-percentage">10%</span></div>
        </div>
    </div>
    `;

  // for each book add its html before the end of the book store section
  bookStoreSection.insertAdjacentHTML("beforeend", bookHTML);
}
//#endregion

//#endregion

//#region ////////////////////////////////////////////////////////////////////////////////////////////////////////////////  Book store Elements

const bookStoreProduct = document.querySelector(`.book-store-product`);
const productBookmark = document.querySelector(`.book-store-product-bookmark`);
const cartOnImage = document.querySelector(`.cart-on-image`);
const bookCategoriesAside = document.querySelector(`.book-categories-aside`);

console.log(cartOnImage, productBookmark, bookStoreProduct);

//#endregion
//#region ////////////////////////////////////////////////////////////////////////////////////////////////////////////////  Book store Functionalities
// Fill the categories holder
// fetch categories

async function getCategories() {
  // get all categories from the database
  const categoriesUrl =
    "http://webstercassin1-001-site1.ftempurl.com/api/Categorys";
  let response = await fetch(categoriesUrl);
  let data = await response.json();
  // return them all
  return data.data;
}
// assign the returned categories to a variable
let categories = await getCategories();
// for each category create a div contains the category name as a textContent for the div span and assign the category name as an attribute to later use it for filtration
categories.forEach((category) => {
  bookCategoriesAside.innerHTML += `<div class = 'book-category' category-name = ${category.name}>
     <span> ${category.name} </span>  </div>`;
});

const bookCategories = document.querySelectorAll(`.book-category`);
bookCategories.forEach((category) => {
  category.addEventListener(`click`, (_) => {
    // reveal the bg overlay
    bookStoreBodyOverlay.classList.remove("hidden");
    bookStoreBodyLoader.classList.remove("hidden");
    bookCategories.forEach((category) => {
      category.style.color = "black";
      category.style.fontWeight = "normal";
      category.style.borderBottom = "1px solid rgba(0,0,0,0.3)";
    });
    category.style.color = "#255e7c";
    category.style.fontWeight = "bold";
    category.style.borderBottom = "2px solid black";

    // by clicking on the category get the category name from the attribute 'category-name' and assign it to a variable to be passed with every fetching-function call
    selectedCategory = category.getAttribute(`category-name`);
    updateBookStore(selectedCategory);
  });
});

/* bookStoreProduct.addEventListener(`click`, productEvent)
function productEvent(event) {
    event.preventDefault()
    // because the target is the path, but I want to target the parent svg or i
if (event.target.closest('div').classList.contains(`book-store-product-bookmark`)) {
    console.log('add to book mark')
}
 else {if (event.target.closest('div').classList.contains(`cart-on-image`)) {
    console.log('add to book cart')
} else {
    // window.location.href = `/pages/book-details.html/${id here}`
}
} 
} */
//#endregion
