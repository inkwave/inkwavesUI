document.addEventListener("DOMContentLoaded", DomContentLoaded);

function DomContentLoaded() {
  `use strict`;

  // Elements

  // Upper page
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
  // Printing options
  const optionsHolder = document.querySelector(`.options-holder`);

  const optionsButtons = document.querySelectorAll(`.option-btn`);

  const sizeOptionBtn = document.querySelectorAll(`.paper-size-option-btn`);
  const optionsCategories = document.querySelectorAll(`.options-category`);
  const paperType = document.querySelector(`.paper-type`);
  const paperTypeOptionsButtons = document.querySelectorAll(
    `.paper-type .option-btn`
  );
  const printingColor = document.querySelector(`.printing-color`);
  const printingColorOptionsButtons = document.querySelectorAll(
    `.printing-color .option-btn`
  );
  const printingSide = document.querySelector(`.printing-side`);
  const printingSideOptionsButtons = document.querySelectorAll(
    `.printing-side .option-btn`
  );
  const printingLayout = document.querySelector(`.printing-layout`);
  const bindingOptions = document.querySelectorAll(`.binding-option `);

  // Book carousel
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

  ///////////// Reveal the list item on section intersecting the view

  // Create the options
  let options = {
    root: null, // null for the view, set an element if you want
    rootMargin: "10px",
    threshold: 0.5, // observe the target when 70% of it's height is intersecting with the view
  };
  // Create a new Intersection Observer instance
  var observer = new IntersectionObserver(callB, options);
  //call the callback function when the observer observe the target
  function callB(entries) {
    // Loop through the entries
    entries.forEach(function (entry) {
      // If the element is intersecting
      if (entry.isIntersecting) {
        let sectionName = entry.target.getAttribute("sectionOf");
        pageNavListItems.forEach((li) => {
          if (li.getAttribute("itemOf") == sectionName) {
            li.classList.add(`reveal-on-Intersection`);
          } else {
            li.classList.remove(`reveal-on-Intersection`);
          }
        });
      }
    });
  }
  //////////////////////////// Generate the nav list items one for each new section that has the tag name section
  const sections = document.querySelectorAll(`section`);
  sections.forEach((section) => {
    // observe the section
    observer.observe(section);
    let sectionName = section.getAttribute(`sectionOf`);
    let pageNavLi = document.createElement(`li`);
    pageNavLi.setAttribute(`itemOf`, `${sectionName}`);
    pageNavLi.classList.add(`hero-list-item`);
    pageNavLi.textContent = `${section.getAttribute(`sectionTitle`)}`;
    heroNav.appendChild(pageNavLi);
  });

  const pageNavListItems = document.querySelectorAll(`.hero-list-item`); // must be here after the creating code and not in the start of the file. (Not very sure)

  pageNavListItems.forEach((li) => {
    li.addEventListener(`click`, () => {
      console.log(li.textContent);
      sections.forEach((section) => {
        if (section.getAttribute(`sectionOf`) == li.getAttribute(`itemOf`)) {
          section.scrollIntoView();
          // or this way, to include the nav height in the process
          // let sectionTop = section.getBoundingClientRect().top;
          // window.scrollTo({top : sectionTop , behavior: `smooth`})
          // observer.observe(section);
        }
      });
    });
  });

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
  sliderRanger.max = `${books.length * 100}`;

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
      basePosition -= 100;
      changeRangePosition();
    }

    for (let i = 0; i < books.length; i++) {
      books[i].style.cssText = `transform :translateX(${
        i * 100 + basePosition
      }%);border-left: 6px solid white;`;
    }
  });

  console.log(sliderRanger);
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

  //

  // LOGIC FUNCTIONS

  ////////////////////////////////////// header

  // Close modal on clicking on the overlay ( Any where outside the modal itself) or pressing the Esc button
  document.body.addEventListener(`click`, function (e) {
    if (e.target == bodyOverlay) {
      revealModal();
    }
  });

  document.addEventListener("keyup", function (e) {
    if ((e.key = "Escape")) {
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

  // Binding options

  // Activate the clicked Button

  // call the function by sending the list of the buttons
  activateButton(sizeOptionBtn);
  activateButton(paperTypeOptionsButtons);
  activateButton(printingColorOptionsButtons);
  activateButton(printingSideOptionsButtons);
  // Send me a list of buttons and I will handle the activation of the clicked button
  function activateButton(optionBtns) {
    optionBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        optionBtns.forEach((inertBtn) => {
          inertBtn.classList.remove(`active-option-btn`);
        });
        btn.classList.add(`active-option-btn`);
      });
    });
  }
  // Reveal options divisions according to the clicked button
  // for each size option button
  sizeOptionBtn.forEach((ob) => {
    ob.addEventListener("click", (e) => {
      e.preventDefault();
      // when any one is clicked hide all the binding options
      bindingOptions.forEach((bo) => bo.classList.add(`hidden`));
      // and show only those has the class name like the text attribute in the clicked button
      let btnText = ob.getAttribute(`text`);
      document.querySelectorAll(`.${btnText}`).forEach((activeOption) => {
        activeOption.classList.remove("hidden");
      });

      // Also hide or reveal the layout options division and Printing side division according to the clicked button
      if (btnText === `A5`) {
        // reveal all divisions and only hide some divisions according to the clicked button
        optionsCategories.forEach((oc) => {
          oc.classList.remove(`hidden`);
        });
        printingLayout.classList.add("hidden");
      } else if (
        btnText === `A3` ||
        btnText === `A2` ||
        btnText === `A1` ||
        btnText === `A0`
      ) {
        optionsCategories.forEach((oc) => {
          oc.classList.remove(`hidden`);
        });
        printingLayout.classList.add("hidden");
        printingSide.classList.add("hidden");
      } else {
        optionsCategories.forEach((oc) => {
          oc.classList.remove(`hidden`);
        });
      }
    });
  });

  // intersecting

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
