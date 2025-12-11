// Variables
const form = document.querySelector(".form__wrapper");
const successBox = document.querySelector(".success");

const firstName = document.getElementById("first-name");
const firstNameError = document.getElementById("first-name-error");

const lastName = document.getElementById("last-name");
const lastNameError = document.getElementById("last-name-error");

const email = document.getElementById("email");
const emailError = document.getElementById("email-error");

const message = document.getElementById("message");
const messageError = document.getElementById("message-error");

const radios = document.querySelectorAll("input[name='query-type']");
const radioError = document.querySelector("fieldset + .form__error");

const consent = document.getElementById("consent");
const consentError = consent
  .closest(".form__consent")
  .querySelector(".form__error");

// Email pattern
const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

// Submit button logic
form.addEventListener("submit", function (event) {
  event.preventDefault();
  let isValid = true;

  // First name
  if (firstName.value.trim() === "") {
    isValid = false;
    firstName.classList.add("form__input--error");
    firstNameError.style.display = "block";
  }

  // Last name
  if (lastName.value.trim() === "") {
    isValid = false;
    lastName.classList.add("form__input--error");
    lastNameError.style.display = "block";
  }

  // Email
  if (!emailPattern.test(email.value.trim())) {
    isValid = false;
    email.classList.add("form__input--error");
    emailError.style.display = "block";
  }

  // Message
  if (message.value.trim() === "") {
    isValid = false;
    message.classList.add("form__input--error");
    messageError.style.display = "block";
  }

  // Radio group
  let radioChecked = false;
  radios.forEach((r) => {
    if (r.checked) radioChecked = true;
  });
  if (!radioChecked) {
    isValid = false;
    radioError.style.display = "block";
    radios.forEach((r) => r.classList.add("form__input--error"));
  }

  // Consent
  if (!consent.checked) {
    isValid = false;
    consent.classList.add("form__input--error");
    consentError.style.display = "block";
  }

  // Success
  if (isValid) {
    successBox.classList.add("active");
    form.reset();
    document
      .querySelectorAll(".form__error")
      .forEach((err) => (err.style.display = "none"));
    document
      .querySelectorAll(
        ".form__input, .form__textarea, .form__radio-input, .form__checkbox"
      )
      .forEach((el) => el.classList.remove("form__input--error"));
    setTimeout(() => successBox.classList.remove("active"), 4000);
  } else {
    successBox.classList.remove("active");
  }
});

form.addEventListener("input", (e) => {
  const field = e.target;
  const errorId = field.getAttribute("aria-describedby");
  const errorEl = errorId ? document.getElementById(errorId) : null;

  if (field.id === "email") {
    if (emailPattern.test(field.value.trim())) {
      field.classList.remove("form__input--error");
      if (errorEl) errorEl.style.display = "none";
    }
  } else if (field.value.trim() !== "") {
    field.classList.remove("form__input--error");
    if (errorEl) errorEl.style.display = "none";
  }
});

form.addEventListener("change", (e) => {
  if (e.target.name === "query-type") {
    radioError.style.display = "none";
    radios.forEach((r) => r.classList.remove("form__input--error"));
  }
  if (e.target.id === "consent" && e.target.checked) {
    consent.classList.remove("form__input--error");
    consentError.style.display = "none";
  }
});
