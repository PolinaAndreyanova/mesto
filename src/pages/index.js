import "./index.css";

import { Card } from "../components/Сard.js";
import { FormValidator } from "../components/FormValidator.js";
import { PopupWithConfirmation } from "../components/PopupWithConfirmation.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js"; 
import { UserInfo } from "../components/UserInfo.js";
import { Section } from "../components/Section.js";
import { Api } from "../components/Api.js";

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-48',
  headers: {
    authorization: '07cf89e3-4dde-4a9f-9c59-e93fe0d43902',
    'Content-Type': 'application/json'
  }
}); 

const cardList = new Section({
  items: [],
  renderer: (item) => {
    renderCard(item, '#card-template');
  }
}, '.cards');

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}; 

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

api.getInitialCards()
  .then(data => {
    data.forEach(element => {
      renderCard({name: element.name, link: element.link, likes: element.likes, ownerId: element.owner._id, id: element._id}, '#card-template')
    });
  })
  .catch(err => console.log(`Ошибка: ${err}`));

api.getUserInfo()
  .then(data => {
    userInfo.setUserInfo(data.name, data.about);
    userInfo.setUserAvatar(data.avatar);
  })
  .catch(err => console.log(`Ошибка: ${err}`));

function handleConfirmDelete(cardId, card) {
  popupDeleteCard.close();
  api.deleteCard(cardId).catch(err => console.log(`Ошибка: ${err}`));
  card.remove();
  card = null;
}

function submitAvatarForm(inputValues) {
  const [avatarLinkInput] = inputValues;
  userInfo.setUserAvatar(avatarLinkInput);
  api.updateAvatar(avatarLinkInput)
    .catch(err => console.log(`Ошибка: ${err}`))
    .finally(() => popupEditAvatar.renderLoading(false));;
  popupEditAvatar.close();
}

function submitEditForm(inputValues) {
  const [nameInput, statusInput] = inputValues;
  userInfo.setUserInfo(nameInput, statusInput);
  api.editProfile(nameInput, statusInput)
    .catch(err => console.log(`Ошибка: ${err}`))
    .finally(() => popupEditProfile.renderLoading(false));
  popupEditProfile.close();
}

function submitAddForm(inputValues) {
  const [titleInput, linkInput] = inputValues;
  api.addNewCard(titleInput, linkInput)
    .then(data => {
      const newItem = {
        name: data.name, 
        link: data.link,
        likes: [],
        ownerId: 'a3f5f4862b8ef908b7522ae2',
        id: data._id
      }
      renderCard(newItem, '#card-template');
    })
    .catch(err => console.log(`Ошибка: ${err}`))
    .finally(() => popupAddProfile.renderLoading(false));;
  popupAddProfile.close();
}

function renderCard(item, cardSelector) {
  const card = initializationCard(item, cardSelector);
  cardList.addItem(card);
}

function initializationCard(item, cardSelector) {
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

cardList.renderItems();