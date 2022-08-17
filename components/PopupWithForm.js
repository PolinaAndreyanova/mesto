import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector);
    this._popupInputs = this._popup.querySelectorAll('.popup__input');
    this._popupForm = this._popup.querySelector('.popup__form');
    this._submitForm = submitForm;
    this._popupSubmitButton = this._popup.querySelector('.popup__submit-button');
  }

  _getInputValues() {
    const popupInputsValues = [];
    this._popupInputs.forEach((input) => {
      popupInputsValues.push(input.value);
    });

    return popupInputsValues;
  }

  setEventListeners() {
    super.setEventListeners();

    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitForm(this._getInputValues());
    });
  }

  setInputValues(data) {
    this._popupInputs[0].value = data[0];
    this._popupInputs[1].value = data[1];
  }

  disableSubmitButton() {
    this._popupSubmitButton.classList.add('popup__submit-button_disabled');
    this._popupSubmitButton.disabled = true;
  }

  close() {
    super.close();

    this._popupForm.reset();
  }
}