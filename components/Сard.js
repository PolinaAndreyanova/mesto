import { openPopup } from "../pages/index.js";

export class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector; // '#card-template'
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);

    return cardElement;
  }

  _toggleLike() {
    this._cardLike.classList.toggle('card__like-button_active');
  }

  _deleteElement() {
    this._element.remove();
  }

  _handlePopup() {
    this._popupBigImage = document.querySelector('.popup_type_big-image');
    this._popupBigImageImage = this._popupBigImage.querySelector('.popup__image');
    this._popupBigImageSubtitle = this._popupBigImage.querySelector('.popup__subtitle');

    openPopup(this._popupBigImage);
    this._popupBigImageImage.src = this._link;
    this._popupBigImageImage.alt = this._name;
    this._popupBigImageSubtitle.textContent = this._name;
  }

  _setEventListeners() {
    this._cardLike = this._element.querySelector('.card__like-button');
    this._cardLike.addEventListener('click', () => this._toggleLike());

    this._cardTrash = this._element.querySelector('.card__trash-button');
    this._cardTrash.addEventListener('click', () => this._deleteElement());

    this._elementImage.addEventListener('click', () => this._handlePopup());
  }

  generateCard() {
    this._element = this._getTemplate();
    this._element.querySelector('.card__title').textContent = this._name;
    this._elementImage = this._element.querySelector('.card__image');
    this._elementImage.alt = this._name;
    this._elementImage.src = this._link;
    
    this._setEventListeners();

    return this._element;
  }
}