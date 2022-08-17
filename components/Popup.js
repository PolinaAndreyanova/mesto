export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._popupCloseButton = this._popup.querySelector('.popup__close-button');
    this._popupErrors = this._popup.querySelectorAll('.popup__error');
    this._popupErrorInputs = this._popup.querySelectorAll('.popup__input');
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  _handleOverlayClose(evt) {
    if (evt.currentTarget === evt.target) {
      this.close();
    }
  }

  _addEventListeners() {
    document.addEventListener('keydown', this._handleEscClose.bind(this));
    this._popup.addEventListener('click', this._handleOverlayClose.bind(this));
  }
  
  _removeEventListeners() {
    document.removeEventListener('keydown', this._handleEscClose.bind(this));
    this._popup.removeEventListener('click', this._handleOverlayClose.bind(this));
  }

  _cleanError() {
    this._popupErrors.forEach((elem) => elem.textContent = '');
    this._popupErrorInputs.forEach((elem) => elem.classList.remove('popup__input_type_error'));
  }

  open() {
    this._cleanError();
    this._popup.classList.add('popup_opened');
    this._addEventListeners();
  }

  close() {
    this._popup.classList.remove('popup_opened');
    this._removeEventListeners();
  }

  setEventListeners() {
    this._popupCloseButton.addEventListener('click', this.close.bind(this));
  }
}