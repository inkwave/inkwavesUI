document.addEventListener("DOMContentLoaded", DomContentLoaded);

function DomContentLoaded() {
  `use strict`;

  // Elements

  // Upper page
  const upperPage = document.querySelector(`.upper-page`);
  const subsectionsDiv = document.getElementById("subsections-div");
  const navbar = document.querySelector(`.navbar`);
  const listItems = document.querySelectorAll(".listitem");
  const subsections = document.querySelectorAll(".subsection");
  const headerSignBtns = document.querySelectorAll(`.header-sign-btns`);
  const searchBar = document.querySelector(`.search-bar`);
  const searchIcon = document.getElementById(`glass-icon`);
  const headerSignInBtn = document.getElementById(`header-sign-in-btn`);
  const headerSignUpBtn = document.getElementById(`header-sign-up-btn`);

  // const searchIcon = document.querySelector(`.search-icon`);

  // Hero
  // Hero List items
  // Sign modal
  const signModal = document.getElementById(`sign-modal`);
  const signSide = document.getElementById(`sign-side`);
  const detailsSide = document.getElementById(`details-side`);
  const closeModalIcon = document.querySelector(`.close-modal-icon`);
  const closeIcon = document.getElementById(`close-icon`);
  const signInBtn = document.querySelector(".sign-in-btn");
  const signUpBtn = document.querySelector(".sign-up-btn");
  const signInForm = document.querySelector(".sign-in-form");
  const signUpForm = document.querySelector(".sign-up-form");
  const detailsBoxes = document.querySelectorAll(`.details-box`);
  const bullets = document.querySelector(`.bullets`);
  const pageNavLogo = document.getElementById(`page-nav-logo`);

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
console.log(qytUp)


// Bookmark book
bookmarkBookDiv.addEventListener(`click`, bookmarkBook)
function bookmarkBook(e) {
    // e.target.style.color = "orange"
    e.target.classList.toggle(`book-bookmarked`)
    // bookmarkBookIcon.style.color = "red"
}
qytArrows.addEventListener(`click`, function (e) {
    console.log(e.target)
    // qytInput.value++
})

qytInput.oninput = () => {

    ActionInputValue.forEach(qi => qi.textContent = qytInput.value)
}
// const subImages = document.querySelectorAll(`.sub-image `)
console.log(mainImage)

bookMoreDetailsBtn.addEventListener(`click`, toMoreDetail)
function toMoreDetail() {
    bookMoreDetails.scrollIntoView({top : 100 , scroll :"smooth"});
}





  ////////////////////////// Book carousel
  const books = document.querySelectorAll(`.book`);
  const leftArrow = document.querySelector(`.slider-l-arrow`);
  const rightArrow = document.querySelector(`.slider-r-arrow`);
  /* const leftArrow = document.querySelector(`.carousel-arrows .left-arrow`)
const rightArrow = document.querySelector(`.carousel-arrows .right-arrow`) */
  const range = document.querySelector(`.position-changer input`);
  const booksHolder = document.querySelector(`.books-holder`);

  //general elements
  const opacityBG = document.querySelector(`.background-opacity`);
  const heroNav = document.querySelector(`.hero-nav`);
  const bodyOverlay = document.querySelector(`.body-overlay`);




  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////    PRODUCT DETAILS





  subImages.forEach(subImage => {
    subImage.addEventListener(`click`, function () {
        subImages.forEach(si => {si.classList.remove('active-sub-image')})
        
        subImage.classList.add('active-sub-image')
        mainImage.src = subImage.querySelector(`img`).getAttribute(`src`)
    })
  })





////////////////////////////////////////////////////////////////////////////////////////////////////////////////    RECENT BOOKS SLIDER
  // when hover over a book reveal the details
  books.forEach((b) => {
    b.addEventListener(`mouseover`, (_) => {
      b.querySelector(
        `.book-details`
      ).style.cssText = `opacity: 1; transform : translateY(0%)`;
    });
    b.addEventListener(`mouseout`, (_) => {
      b.querySelector(`.book-details`).style.cssText = `opacity: 0;`;
    });
  });

  const sliderRanger = document.querySelector(`#books-slider-range-Input`);
  sliderRanger.setAttribute(`max`, `${books.length * 100}`);
  sliderRanger.max = `${(books.length - 4 )* 100}`;

  for (let i = 0; i < books.length; i++) {
    books[i].style.cssText = `transform :translateX(${
      i * 100
    }%); border-left: 6px solid white;`;
  }

  let basePosition = 0;
  leftArrow.addEventListener(`click`, () => {
    if (basePosition < 0) {
      basePosition += 100;
      changeRangePosition();
    }
    for (let i = 0; i < books.length; i++) {
      books[i].style.cssText = `transform :translateX(${
        i * 100 + basePosition
      }%);border-left: 6px solid white;`; // 0 - -100 = 100
    }
  });
  rightArrow.addEventListener(`click`, () => {
    //When clicking reduce the basePosition by 100 as long it is more than tha length
    if (basePosition > (-books.length + 4) * 100) {
      // if 14 books , basePosition > -1100 (the 4 is the number of images in the visible part of the slider)
      /* If the length is 14 that means each book will be able to translate maximum 14 times, but that will male the movement stop when tha last book is in the place 
      of the very first book, this will leave unoccupied space on it's right in the visible part of the slider, that's why the movement needs to be reduced by the number 
      of books in the visible portion of the slider, it is like, before reaching the left border of the slider by 4 books ( including the last one in the visible part) stop the movement  */
      basePosition -= 100;
      changeRangePosition();
    }

    for (let i = 0; i < books.length; i++) {
      books[i].style.cssText = `transform :translateX(${
        i * 100 + basePosition
      }%);border-left: 6px solid white;`;
    }
  });

  sliderRanger.oninput = travelBooks;

  function travelBooks() {
    let value = sliderRanger.value;
    console.log(value);
    for (let i = 0; i < books.length; i++) {
      books[i].style.cssText = `transform :translateX(${
        i * 100 - +value
        //   100 - value * 5
      }%); border-left: 6px solid white;`;
    }
  }

  /* leftArrow.addEventListener(`click`,changeRangePosition)
rightArrow.addEventListener(`click`,changeRangePosition) */

  function changeRangePosition() {
    sliderRanger.value = `${basePosition}`;
    console.log(sliderRanger.value);
  }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////   HEADER
  // Close modal on clicking on the overlay ( Any where outside the modal itself) or pressing the Esc button
  document.body.addEventListener(`click`, function (e) {
    if (e.target == bodyOverlay) {
      revealModal();
    }
  });

  document.addEventListener("keyup", function (e) {
    if ((e.key == "Escape")) {
      revealModal();
    }
  });

  function revealModal() {
    signModal.classList.add(`hidden`);
    bodyOverlay.classList.add(`hidden`);
  }
  /////
  headerSignInBtn.addEventListener(`click`, function () {
    bodyOverlay.classList.remove(`hidden`);
    signModal.classList.toggle(`hidden`);
    signInBtn.classList.add(`activeBtn`);
    signUpBtn.classList.remove(`activeBtn`);
    revealSignInForm();
  });
  headerSignUpBtn.addEventListener(`click`, function () {
    bodyOverlay.classList.remove(`hidden`);
    signModal.classList.toggle(`hidden`);
    signUpBtn.classList.add(`activeBtn`);
    signInBtn.classList.remove(`activeBtn`);
    revealSignUpForm();
  });
  // headerSignUpBtn

  /* headerSignBtns.forEach((hsb) => {
    hsb.addEventListener(`click`, () => {
        bodyOverlay.classList.remove(`hidden`);
        signModal.classList.toggle(`hidden`);
    });
}); */

  closeIcon.addEventListener(`click`, close);
  function close() {
    console.log(`close function fetched`); /////////////////////
    signModal.classList.add(`hidden`);
  }

  // Sign Modal
  signInBtn.addEventListener("click", revealSignInForm);
  signUpBtn.addEventListener("click", revealSignUpForm);
  function revealSignInForm() {
    signInForm.classList.remove("hidden");
    signUpForm.classList.add("hidden");
    signInBtn.classList.add(`activeBtn`);
    signUpBtn.classList.remove(`activeBtn`);
    //   signInBtn.style.borderBottom = "1px solid blue";
    //   signUpBtn.style.borderBottom = "none";
  }
  function revealSignUpForm() {
    signUpForm.classList.remove("hidden");
    signInForm.classList.add("hidden");
    signInBtn.classList.remove(`activeBtn`);
    signUpBtn.classList.add(`activeBtn`);
    //   signUpBtn.style.borderBottom = "1px solid blue";
    //   signInBtn.style.borderBottom = "none";
  }

  detailsBoxes.forEach((sb) => {
    let bullet = document.createElement("li");
    bullet.style.cssText = `background-color : blue; border-radius: 50%; width : 8px; height : 8px;`;
    bullets.appendChild(bullet);
  });

  subsections.forEach((ss) => ss.classList.add("hidden"));
  listItems.forEach((li) => {
    // li fills all the space between each others
    li.style.width = `${navbar.clientWidth / listItems.length}px`;
    // li.style.textAlign = "center";
    const itemIs = li.getAttribute(`itemName`);
    li.addEventListener("mouseover", function () {
      // subsectionsDiv.classList.remove('hidden')
      subsections.forEach((ss) => {
        if (ss.id == `subsection-${itemIs}`) {
          opacityBG.classList.add(`reveal-background-opacity`);
          opacityBG.classList.remove(`hidden`);
          subsectionsDiv.classList.remove(`hidden`);
          subsectionsDiv.classList.add(`show`);
          subsections.forEach((ss) => ss.classList.add("hidden"));
          ss.classList.remove(`hidden`);
          ss.classList.add(`show`);
          animateHeight(subsectionsDiv);
        }
        li.addEventListener("mouseout", function () {
          // subsectionsDiv.classList.add('hidden')
          subsectionsDiv.classList.add(`hidden`);
          opacityBG.classList.add(`hidden`);
          ss.classList.add(`hidden`);
        });
        // opacityBG.classList.add(`reveal-background-opacity`)
      });
    });
  });

  subsectionsDiv.addEventListener("mouseover", function () {
    subsectionsDiv.classList.remove(`hidden`);
    opacityBG.classList.remove(`hidden`);
  });

  subsectionsDiv.addEventListener("mouseout", function () {
    subsectionsDiv.classList.add(`hidden`);
    opacityBG.classList.add(`hidden`);
  });
  subsections.forEach((ss) => {
    ss.addEventListener("mouseover", () => {
      subsectionsDiv.classList.remove(`hidden`);
      ss.classList.remove(`hidden`);
      opacityBG.classList.remove(`hidden`);
    });
  });
  subsections.forEach((ss) => {
    ss.addEventListener("mouseout", () => {
      ss.classList.add(`hidden`);
      opacityBG.classList.add(`hidden`);
    });
  });

  function animateHeight(element) {
    // Get the element's current height
    let startHeight = element.clientHeight;
    // Temporarily set the height to 'auto'
    element.style.height = "auto";
    // Get the height with the new content
    let endHeight = element.clientHeight;
    // Revert the height back to its original value
    element.style.height = startHeight + "px";
    // Force a repaint (this is needed on some browsers to ensure the next step works)
    element.getBoundingClientRect();
    // Animate the height
    element.style.transition = "height 0.3s ease";
    element.style.height = endHeight + "px";
  }

  // Footer

  /* 
    //   const all = document.querySelectorAll('body *')
    const all = document.body.children;
      const homePage = document.getElementById(`landing-page`)
      function goHome() {

        all.forEach( a , () => {
            a.style.background = "red";
            console.log("a")
            a.classList.add('hidden')
        })
        homePage.classList.remove('hidden')
      }

      all.forEach( a , () => {
        a.style.background = "red";
        console.log("a")
        a.classList.add('hidden')
    }) */


////////////////////////////////////////////////////////////////////////////////////////////////////////////////    TIMER
  // let observer = new IntersectionObserver(highlighItem, options)
//////////////////////////// General Functions
  //Dynamic year
  const copyrightsYear = document.querySelector(`#copyrights-p span`);
  copyrightsYear.textContent = new Date().getFullYear();
const timerSpan = document.querySelector(`.timer`); 
const sendAnotherBtn = document.querySelector(`.Send-another-btn `); 
const signUpSubmit  = document.querySelector(`.sign-up-submit`); 
const activationCodeDiv  = document.querySelector(`.activation-code`); 
const modalLogo  = document.querySelector(`.modal-logo`); 
const signModalInternalOverlay  = document.querySelector(`.sign-modal-internal-overlay`); 


// Define the initial values ( the interval needs to be stored in a variable to clear it later )
let timerInterval = null;
let seconds = 10;
// once the submit or send code buttons are clicked initiate the seconds and the intervale
signUpSubmit.addEventListener('click', countDown);
sendAnotherBtn.addEventListener('click', countDown);

function countDown() {
    // reveal the activation code division
    activationCodeDiv.classList.remove('hidden')
    modalLogo.classList.add('hidden')
    signModalInternalOverlay.classList.remove('hidden')

    // do the opposite of those when the submit code button is clicked and the code is the right one , show the logo again and a message (in separate page) that the account is activated and sign the user in
    seconds = 60;
    // disaple the send button till the count down is finished
    sendAnotherBtn.setAttribute('disabled', '');
    // start the interval
    timerInterval = setInterval(countingDown, 1000);
}
// start the count down
function countingDown() {
    if (seconds > 0) {
        seconds--;
        timerSpan.textContent = `${seconds} Second`;
    } else {
        // once the count down is finished enable the button and clear the interval to not interfere with the coming one
        clearInterval(timerInterval);
        sendAnotherBtn.removeAttribute('disabled');
    }
}

  /* 
// Issues
* Clicking on the nav list item doesn't scroll to the section - if not entered
* scrolling into view doesn't  apply the border to the element
*/
}
