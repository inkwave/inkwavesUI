`use strict`;

// Elements

// Upper page 
const subsectionsDiv = document.getElementById('subsections-div');
const listItems = document.querySelectorAll('.listitem')
const subsections = document.querySelectorAll('.subsection')
const headerSignBtns = document.querySelectorAll(`.header-sign-btns`)
// Hero

// Sign modal
const signModal = document.getElementById(`sign-modal`);
const closeModalIcon = document.querySelector(`.close-modal-icon`);
const closeIcon = document.getElementById(`close-icon`)
const signInBtn = document.querySelector('.sign-in-btn')
const signUpBtn = document.querySelector('.sign-up-btn')
const signInForm = document.querySelector('.sign-in-form')
const signUpForm = document.querySelector('.sign-up-form')
const detailsBoxes = document.querySelectorAll(`.details-box`)
const bullets = document.querySelector(`.bullets`);

// Footer 
const copyrightsYear = document.querySelector(`#copyrights-p span`)


// LOGIC FUNCTIONS

// header 
headerSignBtns.forEach( hsb => {
    hsb.addEventListener(`click`, () => {
        console.log("sign button was clicked")
        signModal.classList.toggle(`hidden`)
    })
})
closeIcon.addEventListener(`click`, function () {
    console.log('close modal icon was clicked')
    signModal.classList.add(`hidden`)
})
function close ( ) {
    signModal.classList.add(`hidden`)
    console.log('close modal icon was clicked')

}


subsections.forEach( ss => ss.classList.add('hidden') )
listItems.forEach( li => {
    // get the number at the last index of the id
    const liIdNum = li.id.slice(-1, li.id.length);
    // console.log(liIdNum)
    li.addEventListener('mouseover', function () {
        // subsectionsDiv.classList.remove('hidden')
        subsections.forEach( ss => {
            if (ss.id == `subsection-${liIdNum}`) {
                subsectionsDiv.classList.remove(`hidden`)
                subsections.forEach(ss => ss.classList.add('hidden'))
                ss.classList.remove(`hidden`)
                animateHeight(subsectionsDiv);

            }
           /*  else {
                ss.classList.add(`hidden`)
                
            } */
            
            li.addEventListener('mouseout', function () {
                // subsectionsDiv.classList.add('hidden')
                subsectionsDiv.classList.add(`hidden`)
                    
                    ss.classList.add(`hidden`)})

        })
    })
})

subsections.forEach(ss => {
    ss.addEventListener('mouseover', () => {
        ss.classList.remove(`hidden`)

    })
})
subsections.forEach(ss => {
    ss.addEventListener('mouseout', () => {
        ss.classList.add(`hidden`)

    })
})



subsectionsDiv.addEventListener('mouseover', function () {
    subsectionsDiv.classList.remove(`hidden`)
})



    subsectionsDiv.addEventListener('mouseout', function () {
        subsectionsDiv.classList.add(`hidden`)
    })
    
    
    function animateHeight(element) {
        // Get the element's current height
        let startHeight = element.clientHeight;
    // Temporarily set the height to 'auto'
    element.style.height = 'auto';
    // Get the height with the new content
    let endHeight = element.clientHeight;
    // Revert the height back to its original value
    element.style.height = startHeight + 'px';
    // Force a repaint (this is needed on some browsers to ensure the next step works)
    element.getBoundingClientRect();
    // Animate the height
    element.style.transition = 'height 0.5s ease-in-out';
    element.style.height = endHeight + 'px';
}
  

// Sign Modal
signInBtn.addEventListener('click', revealSignInForm )
signUpBtn.addEventListener('click', revealSignUpForm )
function revealSignInForm() {
      signInForm.classList.remove('hidden')
      signUpForm.classList.add('hidden')
      signInBtn.style.borderBottom = '1px solid blue'
      signUpBtn.style.borderBottom = 'none'
  }
  function revealSignUpForm() {
      signUpForm.classList.remove('hidden')
      signInForm.classList.add('hidden')
      signUpBtn.style.borderBottom = '1px solid blue'
      signInBtn.style.borderBottom = 'none'
    }


    detailsBoxes.forEach(sb => {
        let bullet = document.createElement('li');
        bullet.style.cssText = `background-color : blue; border-radius: 50%; width : 8px; height : 8px;`
        bullets.appendChild(bullet); 
    })
    // Footer 
      //Dynamic year 
      copyrightsYear.textContent = new Date().getFullYear();
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