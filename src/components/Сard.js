export class Card {
  constructor(data, cardSelector, handleCardClick) {
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector; // '#card-template'
    this._handleCardClick = handleCardClick;
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
    this._element = null;
  }

  _setEventListeners() {
    this._cardLike = this._element.querySelector('.card__like-button');
    this._cardLike.addEventListener('click', () => this._toggleLike());

    this._cardTrash = this._element.querySelector('.card__trash-button');
    this._cardTrash.addEventListener('click', () => this._deleteElement());

    this._elementImage.addEventListener('click', () => this._handleCardClick(this._data));
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