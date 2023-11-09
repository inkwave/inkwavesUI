  `use strict`;
  // import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';
  let testModularity = "log this message to the console"
  // export { testModularity }
// *************** ELEMENTS
  //#region Hero
  //#region Printing options
  const optionsHolder = document.querySelector(`.options-holder`);
  const optionsButtons = document.querySelectorAll(`.option-btn`);
  const sizeOptionBtn = document.querySelectorAll(`.paper-size-option-btn`);
  const optionsCategories = document.querySelectorAll(`.options-category`);
  const printingLayoutImg = document.querySelectorAll(`.printing-layout-img`);
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
  const bindingOptions = document.querySelectorAll(`.binding-option`);
//#endregion


  
// *************** FUNCTIONALITIES

  



//#region //////////////////////////////////////////////////////////////////////////////////////// Binding options

  // Activate the clicked Button

  // call the function by sending the list of the buttons
  activateButton(sizeOptionBtn);
  activateButton(paperTypeOptionsButtons);
  activateButton(printingColorOptionsButtons);
  activateButton(printingSideOptionsButtons);
  activateButton(printingLayoutImg);
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
 //#endregion

// const all = document.querySelector(`[data-chosen-options`);
// all.forEach( a => {console.log(a)})
// } // End DomContentLoaded Function 



