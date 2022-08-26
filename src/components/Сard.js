export class Card {
  constructor(data, cardSelector, handleCardClick, handleTrashClick, api) {
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._ownerId = data.ownerId;
    this._id = data.id;
    this._userId = data.userId;
    this._cardSelector = cardSelector; // '#card-template'
    this._handleCardClick = handleCardClick;
    this._handleTrashClick = handleTrashClick;
    this._api = api;
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

  // _deleteCard() {
  //   this._element.remove();
  //   this._element = null;
  // }

  _updateCountOfLikes() {
    this._countLikes.textContent = this._likes.length;
  }

  _setEventListeners() {
    this._cardLike.addEventListener('click', () => {
      if (!this._cardLike.classList.contains('card__like-button_active')) {
        this._api.likeCard(this._id)
          .then(data => {
            this._toggleLike();
            this._likes = data.likes;
            this._updateCountOfLikes();
          })
          .catch(err => console.log(`Ошибка: ${err}`));
      } else {
        this._api.cancelLikeCard(this._id)
          .then(data => {
            this._toggleLike();
            this._likes = data.likes;
            this._updateCountOfLikes();
          })
          .catch(err => console.log(`Ошибка: ${err}`));
      }
    });

    this._cardTrash.addEventListener('click', () => {
      this._handleTrashClick(this._id, this._element);
    });

    this._elementImage.addEventListener('click', () => this._handleCardClick(this._data));
  }

  generateCard() {
    this._element = this._getTemplate();
    this._element.querySelector('.card__title').textContent = this._name;
    this._elementImage = this._element.querySelector('.card__image');
    this._elementImage.alt = this._name;
    this._elementImage.src = this._link;
    this._countLikes = this._element.querySelector('.card__like-count');
    this._countLikes.textContent = this._likes.length;
    this._cardTrash = this._element.querySelector('.card__trash-button');
    this._cardLike = this._element.querySelector('.card__like-button');

    if (this._ownerId === this._userId) {
      this._cardTrash.disabled = false;
      this._cardTrash.style.visibility = 'visible';
    }

    this._likes.forEach(element => {
      if (element._id === this._userId) this._toggleLike();
    });
    
    this._setEventListeners();

    return this._element;
  }
}