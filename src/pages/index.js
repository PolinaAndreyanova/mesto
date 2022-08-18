import "./index.css";

import { Card } from "../components/Сard.js";
import { FormValidator } from "../components/FormValidator.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js"; 
import { UserInfo } from "../components/UserInfo.js";
import { Section } from "../components/Section.js";

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

initialCards.reverse();

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}; 

const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    renderCard(item, '#card-template');
  }
}, '.cards');

const profile = document.querySelector('.profile');
const profileEditButton = profile.querySelector('.profile__edit-button');
const profileAddButton = profile.querySelector('.profile__add-button');
const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  statusSelector: '.profile__status'
})

const popupEditProfile = new PopupWithForm('.popup_type_edit-profile', submitEditForm);
const popupAddProfile = new PopupWithForm('.popup_type_add-profile', submitAddForm);
const popupBigImage = new PopupWithImage('.popup_type_big-image');

const formEditProfile = document.querySelector('.popup_type_edit-profile').querySelector('.popup__form');
const formAddCard = document.querySelector('.popup_type_add-profile').querySelector('.popup__form')
const profileValidation = new FormValidator(validationConfig, formEditProfile);
const newCardValidation = new FormValidator(validationConfig, formAddCard);

function submitEditForm(inputValues) {
  const [nameInput, statusInput] = inputValues;
  userInfo.setUserInfo(nameInput, statusInput);
  popupEditProfile.close();
}

function submitAddForm(inputValues) {
  const [titleInput, linkInput] = inputValues;
  const newItem = {
    name: titleInput, 
    link: linkInput
  }
  renderCard(newItem, '#card-template');
  popupAddProfile.close();
}

function renderCard(item, cardSelector) {
  const card = initializationCard(item, cardSelector);
  cardList.addItem(card);
}

function initializationCard(item, cardSelector) {
  const card = new Card(item, cardSelector, handleCardClick);
  const cardElement = card.generateCard();
  return cardElement;
}

function handleCardClick(data) {
  popupBigImage.open(data);
}

popupEditProfile.setEventListeners();
popupAddProfile.setEventListeners();
popupBigImage.setEventListeners();

profileEditButton.addEventListener('click', () => {
  popupEditProfile.setInputValues(userInfo.getUserInfo());
  profileValidation.resetValidation();
  popupEditProfile.open();
});

profileAddButton.addEventListener('click', () => {
  newCardValidation.resetValidation();
  popupAddProfile.open();
});


profileValidation.enableValidation();
newCardValidation.enableValidation(); 

cardList.renderItems();