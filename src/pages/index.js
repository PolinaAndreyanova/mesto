import "./index.css";

import { validationConfig } from "../utils/constants.js"
import { Card } from "../components/Сard.js";
import { FormValidator } from "../components/FormValidator.js";
import { PopupWithConfirmation } from "../components/PopupWithConfirmation.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js"; 
import { UserInfo } from "../components/UserInfo.js";
import { Section } from "../components/Section.js";
import { Api } from "../components/Api.js";

let userId = '';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-48',
  headers: {
    authorization: '07cf89e3-4dde-4a9f-9c59-e93fe0d43902',
    'Content-Type': 'application/json'
  }
}); 

const cardList = new Section({
  renderer: (item) => {
    renderCard({
      name: item.name,
      link: item.link,
      likes: item.likes,
      ownerId: item.owner._id,
      id: item._id,
      userId: userId
    }, '#card-template');
  }
}, '.cards');

const profile = document.querySelector('.profile');
const profileAvatarEditButton = profile.querySelector('.profile__avatar-edit-button');
const profileEditButton = profile.querySelector('.profile__edit-button');
const profileAddButton = profile.querySelector('.profile__add-button');
const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  statusSelector: '.profile__status',
  avatarSelector: '.profile__avatar'
})

const popupEditProfile = new PopupWithForm('.popup_type_edit-profile', submitEditForm);
const popupAddProfile = new PopupWithForm('.popup_type_add-profile', submitAddForm);
const popupBigImage = new PopupWithImage('.popup_type_big-image');
const popupEditAvatar = new PopupWithForm('.popup_type_edit-avatar', submitAvatarForm);
const popupDeleteCard = new PopupWithConfirmation('.popup_type_delete-card', handleConfirmDelete);

const formEditProfile = document.querySelector('.popup_type_edit-profile').querySelector('.popup__form');
const formAddCard = document.querySelector('.popup_type_add-profile').querySelector('.popup__form');
const formEditAvatar = document.querySelector('.popup_type_edit-avatar').querySelector('.popup__form');
const profileValidation = new FormValidator(validationConfig, formEditProfile);
const newCardValidation = new FormValidator(validationConfig, formAddCard);
const avatarValidation = new FormValidator(validationConfig, formEditAvatar);

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cardsData]) => {
    userId = userData._id;
    userInfo.setUserInfo(userData.name, userData.about);
    userInfo.setUserAvatar(userData.avatar);
    cardList.renderItems(cardsData.reverse());
  })
  .catch(err => console.log(`Ошибка: ${err}`));

function handleConfirmDelete(cardId, card) {
  api.deleteCard(cardId)
    .then(() => {
      card.remove();
      card = null;
      popupDeleteCard.close()
    })
    .catch(err => console.log(`Ошибка: ${err}`));
}

function submitAvatarForm(inputValues) {
  const avatarLinkInput = inputValues.avatar;
  api.updateAvatar(avatarLinkInput)
    .then(() => {
      userInfo.setUserAvatar(avatarLinkInput);
      popupEditAvatar.close()
    })
    .catch(err => console.log(`Ошибка: ${err}`))
    .finally(() => popupEditAvatar.renderLoading(false));
}

function submitEditForm(inputValues) {
  const nameInput = inputValues.name;
  const statusInput = inputValues.status;
  api.editProfile(nameInput, statusInput)
    .then(() => {
      userInfo.setUserInfo(nameInput, statusInput);
      popupEditProfile.close()
    })
    .catch(err => console.log(`Ошибка: ${err}`))
    .finally(() => popupEditProfile.renderLoading(false));
}

function submitAddForm(inputValues) {
  const titleInput = inputValues.title;
  const linkInput = inputValues.link;
  api.addNewCard(titleInput, linkInput)
    .then(data => {
      const newItem = {
        name: data.name, 
        link: data.link,
        likes: [],
        ownerId: userId,
        id: data._id,
        userId: userId
      }
      renderCard(newItem, '#card-template');
    })
    .then(() => {
      popupAddProfile.close();
    })
    .catch(err => console.log(`Ошибка: ${err}`))
    .finally(() => popupAddProfile.renderLoading(false));
}

function renderCard(item, cardSelector) {
  const card = createCard(item, cardSelector);
  cardList.addItem(card);
}

function createCard(item, cardSelector) {
  const card = new Card(item, cardSelector, handleCardClick, handleTrashClick, api);
  const cardElement = card.generateCard();
  return cardElement;
}

function handleCardClick(data) {
  popupBigImage.open(data);
}

function handleTrashClick(cardId, card) {
  popupDeleteCard.open(cardId, card);
}

popupEditProfile.setEventListeners();
popupAddProfile.setEventListeners();
popupBigImage.setEventListeners();
popupEditAvatar.setEventListeners();
popupDeleteCard.setEventListeners();

profileEditButton.addEventListener('click', () => {
  popupEditProfile.setInputValues(userInfo.getUserInfo());
  profileValidation.resetValidation();
  popupEditProfile.open();
});

profileAddButton.addEventListener('click', () => {
  newCardValidation.resetValidation();
  popupAddProfile.open();
});


profileAvatarEditButton.addEventListener('click', () => {
  avatarValidation.resetValidation();
  popupEditAvatar.open();
});

profileValidation.enableValidation();
newCardValidation.enableValidation();
avatarValidation.enableValidation();