import { FormValidator } from "./formValidator.js";

const set = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}; 

const formList = Array.from(document.querySelectorAll('.popup__form'));
formList.forEach((item) => {
  const itemValidation = new FormValidator(set, item);
  itemValidation.enableValidation();
});
