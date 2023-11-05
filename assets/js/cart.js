document.addEventListener("DOMContentLoaded", DomContentLoaded);
function DomContentLoaded() {
  `use strict`;

// *************** ELEMENTS

  //#region Upper page
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
//#endregion
  //#region Hero
  //#region Sign modal
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
  //#endregion
  //#region Cart
  const bookmarkBookDivs= document.querySelectorAll(`.bookmark-book`)
const bookmarkBookIcon = document.querySelector(`.bookmark-book-icon`)
  //#endregion
  //#region general elements
  const opacityBG = document.querySelector(`.background-opacity`);
  const heroNav = document.querySelector(`.hero-nav`);
  const bodyOverlay = document.querySelector(`.body-overlay`);
//#endregion
  
// *************** FUNCTIONALITIES
//#region //////////////////////////////////////////////////////////////////////////////////////// Page nav
 ///////////// Reveal the list item on section intersecting the view
 pageNavLogo.onclick = _ => {upperPage.scrollIntoView()}
 window.onscroll = _=> {
   pageNavLogo.textContent  =  pageNavLogo.getBoundingClientRect().top < 20 ? "InkWaves - Go up " :"InkWaves";
 }
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

  
//#endregion
  
//#region //////////////////////////////////////////////////////////////////////////////////////// Nav bar
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
 //#endregion
//#region //////////////////////////////////////////////////////////////////////////////////////// Books json
let bookApi = {
    "books":[
        {
            "isbn":"9781593279509",
            "title":"Eloquent JavaScript, Third Edition",
            "subtitle":"A Modern Introduction to Programming",
            "author":"Marijn Haverbeke",
            "published":"2018-12-04T00:00:00.000Z",
            "publisher":"No Starch Press",
            "pages":472,
            "description":"JavaScript lies at the heart of almost every modern web application, from social apps like Twitter to browser-based game frameworks like Phaser and Babylon. Though simple for beginners to pick up and play with, JavaScript is a flexible, complex language that you can use to build full-scale applications.",
            "website":"http://eloquentjavascript.net/"
        },
        {
            "isbn":"9781491943533",
            "title":"Practical Modern JavaScript",
            "subtitle":"Dive into ES6 and the Future of JavaScript",
            "author":"Nicolás Bevacqua",
            "published":"2017-07-16T00:00:00.000Z",
            "publisher":"O'Reilly Media",
            "pages":334,
            "description":"To get the most out of modern JavaScript, you need learn the latest features of its parent specification, ECMAScript 6 (ES6). This book provides a highly practical look at ES6, without getting lost in the specification or its implementation details.",
            "website":"https://github.com/mjavascript/practical-modern-javascript"
        },
        {
            "isbn":"9781593277574",
            "title":"Understanding ECMAScript 6",
            "subtitle":"The Definitive Guide for JavaScript Developers",
            "author":"Nicholas C. Zakas",
            "published":"2016-09-03T00:00:00.000Z",
            "publisher":"No Starch Press",
            "pages":352,
            "description":"ECMAScript 6 represents the biggest update to the core of JavaScript in the history of the language. In Understanding ECMAScript 6, expert developer Nicholas C. Zakas provides a complete guide to the object types, syntax, and other exciting changes that ECMAScript 6 brings to JavaScript.",
            "website":"https://leanpub.com/understandinges6/read"
        },
        {
            "isbn":"9781449365035",
            "title":"Speaking JavaScript",
            "subtitle":"An In-Depth Guide for Programmers",
            "author":"Axel Rauschmayer",
            "published":"2014-04-08T00:00:00.000Z",
            "publisher":"O'Reilly Media",
            "pages":460,
            "description":"Like it or not, JavaScript is everywhere these days -from browser to server to mobile- and now you, too, need to learn the language or dive deeper than you have. This concise book guides you into and through JavaScript, written by a veteran programmer who once found himself in the same position.",
            "website":"http://speakingjs.com/"
        },
        {
            "isbn":"9781449331818",
            "title":"Learning JavaScript Design Patterns",
            "subtitle":"A JavaScript and jQuery Developer's Guide",
            "author":"Addy Osmani",
            "published":"2012-08-30T00:00:00.000Z",
            "publisher":"O'Reilly Media",
            "pages":254,
            "description":"With Learning JavaScript Design Patterns, you'll learn how to write beautiful, structured, and maintainable JavaScript by applying classical and modern design patterns to the language. If you want to keep your code efficient, more manageable, and up-to-date with the latest best practices, this book is for you.",
            "website":"http://www.addyosmani.com/resources/essentialjsdesignpatterns/book/"
        },
        {
            "isbn":"9798602477429",
            "title":"You Don't Know JS Yet",
            "subtitle":"Get Started",
            "author":"Kyle Simpson",
            "published":"2020-01-28T00:00:00.000Z",
            "publisher":"Independently published",
            "pages":143,
            "description":"The worldwide best selling You Don't Know JS book series is back for a 2nd edition: You Don't Know JS Yet. All 6 books are brand new, rewritten to cover all sides of JS for 2020 and beyond.",
            "website":"https://github.com/getify/You-Dont-Know-JS/tree/2nd-ed/get-started"
        },
        {
            "isbn":"9781484200766",
            "title":"Pro Git",
            "subtitle":"Everything you neeed to know about Git",
            "author":"Scott Chacon and Ben Straub",
            "published":"2014-11-18T00:00:00.000Z",
            "publisher":"Apress; 2nd edition",
            "pages":458,
            "description":"Pro Git (Second Edition) is your fully-updated guide to Git and its usage in the modern world. Git has come a long way since it was first developed by Linus Torvalds for Linux kernel development. It has taken the open source world by storm since its inception in 2005, and this book teaches you how to use it like a pro.",
            "website":"https://git-scm.com/book/en/v2"
        },
        {
            "isbn":"9781484242216",
            "title":"Rethinking Productivity in Software Engineering",
            "subtitle":"",
            "author":"Caitlin Sadowski, Thomas Zimmermann",
            "published":"2019-05-11T00:00:00.000Z",
            "publisher":"Apress",
            "pages":310,
            "description":"Get the most out of this foundational reference and improve the productivity of your software teams. This open access book collects the wisdom of the 2017 \"Dagstuhl\" seminar on productivity in software engineering, a meeting of community leaders, who came together with the goal of rethinking traditional definitions and measures of productivity.",
            "website":"https://doi.org/10.1007/978-1-4842-4221-6"
        }
    ]
}
//#endregion

//#region //////////////////////////////////////////////////////////////////////////////////////// Cart
// Create a mocking json object for the book
// Bookmark book
bookmarkBookDivs.forEach(bookmark => {
bookmark.addEventListener(`click`, bookmarkBook)
function bookmarkBook(e) {
    e.target.classList.toggle(`book-bookmarked`)
}
})
//#endregion

 

} // End DomContentLoaded Function
