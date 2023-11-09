document.addEventListener("DOMContentLoaded", function () {
  //#region ////////////////////////////////////////////////////////////////////////////////////////////////////// Elements
  const storedCredits = document.querySelectorAll(`[name = 'credit-card']`);

  const paymentOptions = document.querySelectorAll(`.payment-option`);
  const creditCardOption = document.querySelector(`.credit-card-option`);
  const cashOnDeliveryOption = document.querySelector(
    `.cash-on-delivery-option`
  );
  const payWithCredit = document.querySelector(`.pay-with-credit`);
  const payCash = document.querySelector(`.pay-cash`);
  const paymentMethods = document.querySelectorAll(`.pay-with`);
  const payUsingCredit = document.querySelector(`.using-credit`);
  const goBackBtn = document.querySelector(`.go-back-to-stored-cards-btn`);
  const addNewCardBtn = document.querySelector(`.add-new-card-btn`);
  const addNewCard = document.querySelector(`.add-new-card`);
  
  // form
  const addingCreditForm = document.querySelector(`.credit-form`);
  const creditCardNumber = document.getElementById(`credit-card-number`);
  const creditCardMonth = document.getElementById(`credit-card-month`);
  const creditCardYear = document.getElementById(`credit-card-year`);
  const creditCardCvv = document.getElementById(`credit-card-cvv`);
  const rememberCardCheckbox = document.getElementById(
    `remember-card-checkbox`
  );

  const placeOrderBtn = document.querySelector(`.place-order-btn`);

  //#endregion

  //#region ////////////////////////////////////////////////////////////////////////////////////////////////////// Functionalities

  // choose credit
  storedCredits.forEach((credit) => {
    // for each stored credit , get the related radio input
    let relatedCvv = document.querySelector(
      `[cvv-for-card = "${credit.value}"]`
    );
    // disable all radios
    credit.setAttribute(`disabled`, ``);
    // enable the radio only that it's related cvv is validated
    relatedCvv.oninput = (_) => {
      if (relatedCvv.value.length == 3) {
        credit.removeAttribute(`disabled`);
        relatedCvv.style.border = "1px solid green";
      } else {
        credit.setAttribute(`disabled`, ``);
        relatedCvv.style.border = "1px solid red";
      }
    };

    credit.addEventListener(`click`, () => {
      // get the cvv input related to this checked radio
      if (
        credit.checked &&
        relatedCvv.value != "" &&
        relatedCvv.value.length == 3
      ) {
        // once the card is selected correctly after all the previous validation, Enable the place order 
        placeOrderBtn.removeAttribute("disabled");
        
        console.log(credit.value);
        placeOrderBtn.removeAttribute("disabled");
      } else {placeOrderBtn.setAttribute("disabled" ,'');}
    });
  });

  //////////////// Reveal payment method
  paymentOptions.forEach((option) => {
    console.log(option);
    option.addEventListener(`click`, (_) => {
      paymentMethods.forEach((pay) => pay.classList.add(`hidden`));
      let currentOption = option.getAttribute(`option`);
      if (option.getAttribute("option") == "cash") {
        placeOrderBtn.removeAttribute("disabled");
        // then make sure to remove all the data from the credit section
      } else {
        placeOrderBtn.setAttribute("disabled", "");
      }
      document
        .querySelector(`[payment-method = "${currentOption}"]`)
        .classList.remove(`hidden`);
    });
  });

////////////// Reveal adding new card
let revealAddNewCard = function () {
    addNewCard.classList.remove(`hidden`)
    payUsingCredit.classList.add(`hidden`)
}
let goBack = function () {
    addNewCard.classList.add(`hidden`)
    payUsingCredit.classList.remove(`hidden`)
}
addNewCardBtn.addEventListener(`click`, revealAddNewCard)
goBackBtn.addEventListener(`click`, goBack)



  /////////////// Form validation
  let borderRed = "1px solid red";
  let borderGreen = "1px solid green";
  function cardNumberValidation() {
    // return creditCardNumber.value.length == 16 ? true:  false;
    return (
      creditCardNumber.value.length == 16 && creditCardNumber.value.length != ""
    );
  }

  creditCardNumber.addEventListener("input", validateCardNumber);
  function validateCardNumber() {
    creditCardNumber.style.border = cardNumberValidation()
      ? borderGreen
      : borderRed;
  }

  creditCardMonth.addEventListener(`blur`, validateMonth);
  function validateMonth() {
    /* when the user leaves the input if the number is between 1 and 9 then ad 0 at the start  */
    let creditMonth = creditCardMonth.value;
    if (creditMonth.length == 1 && creditMonth < 10 && creditMonth > 0) {
      creditCardMonth.value = creditMonth.padStart(2, "0"); // creditMonth is a static value cant be used to send value back to the input
      creditCardMonth.style.border = borderGreen;
      // if it is not a single digit then make sure it is in the range
    } else {
      if (creditMonth.length == 2 && creditMonth < 13 && creditMonth > 0) {
        creditCardMonth.style.border = borderGreen;
      } else {
        creditCardMonth.style.border = borderRed;
      }
    }
  }
  // validate the year
  creditCardYear.addEventListener(`input`, validateYear);
  function validateYear() {
    // must be 4 digits length
    let creditYear = creditCardYear.value;
    creditCardYear.style.border =
      creditYear.length == 4 ? borderGreen : borderRed;
  }

  creditCardCvv.addEventListener(`input`, validateCVV);
  function validateCVV() {
    let CVV = creditCardCvv.value;
    creditCardCvv.style.border = CVV.length == 3 ? borderGreen : borderRed;
  }

  addingCreditForm.addEventListener(`submit`, submitCredit);
  function submitCredit(e) {
    e.preventDefault();
    let creditCardInfo = {
      number: creditCardNumber.value,
      month: creditCardMonth.value,
      year: creditCardYear.value,
      cvv: creditCardCvv.value,
      rememberCreditCard: rememberCardCheckbox.checked,
    };
    console.log(creditCardInfo);
  }

  //#endregion
});
