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
    // const popupInputsValues = [];
    // this._popupInputs.forEach((input) => {
    //   popupInputsValues.push(input.value);
    // });

    // return popupInputsValues;
    this._popupInputsValues = {};
    this._popupInputs.forEach(input => {
      this._popupInputsValues[input.name] = input.value;
    });

    return this._popupInputsValues;
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._popupSubmitButton.textContent = 'Сохранение...';
    } else {
      this._popupSubmitButton.textContent = 'Сохранить';
    }
  }

  setEventListeners() {
    super.setEventListeners();

    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this.renderLoading(true);
      this._submitForm(this._getInputValues());
    });
  }

  setInputValues(data) {
    this._popupInputs.forEach((input) => {
      input.value = data[input.name];
    });
  }

  close() {
    super.close();

    this._popupForm.reset();
  }
}