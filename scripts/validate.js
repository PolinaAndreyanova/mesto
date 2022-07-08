const showInputError = (set, formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(set.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(set.errorClass);
};

const hideInputError = (set, formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(set.inputErrorClass);
  errorElement.classList.remove(set.errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (set, formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(set, formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(set, formElement, inputElement);
  }
};

const setEventListeners = (set, formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(set.inputSelector));
  const buttonElement = formElement.querySelector(set.submitButtonSelector);
  toggleButtonState(set, inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(set, formElement, inputElement);
      toggleButtonState(set, inputList, buttonElement);
    });
  });
};

const enableValidation = (set) => {
  const formList = Array.from(document.querySelectorAll(set.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setEventListeners(set, formElement);
  });
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
});
}

const toggleButtonState = (set, inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    disableSubmitButton(set.inactiveButtonClass, buttonElement);
  } else {
    buttonElement.classList.remove(set.inactiveButtonClass);
    buttonElement.disabled = false;
  }
}

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}); 
