import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector('.popup__image');
    this._popupSubtitle = this._popup.querySelector('.popup__subtitle');
  }

  open(data) {
    super.open();
    this._popupImage.src = data.link;
    this._popupImage.alt = data.name;
    this._popupSubtitle.textContent = data.name;
  }
}