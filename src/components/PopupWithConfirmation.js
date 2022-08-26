import { Popup } from "./Popup.js";

export class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleConfirm) {
    super(popupSelector);

    this._popupConfirmButton = this._popup.querySelector('.popup__submit-button');
    this._handleConfirm = handleConfirm;
  }

  open(cardId, card) {
    super.open();

    this._cardId = cardId;
    this._card = card
  }

  setEventListeners() {
    super.setEventListeners();

    this._popupConfirmButton.addEventListener('click', (evt) => {
      evt.preventDefault();
      this._handleConfirm(this._cardId, this._card);
    });
  }
}