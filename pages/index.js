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
    initializationCard(item, '#card-template');
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

const formList = Array.from(document.querySelectorAll('.popup__form'));

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
  initializationCard(newItem, '#card-template');
  popupAddProfile.close();
  popupAddProfile.disableSubmitButton();
}

function renderCard(card) {
  cardList.addItem(card);
}

function initializationCard(item, cardSelector) {
  const card = new Card(item, cardSelector, handleCardClick);
  const cardElement = card.generateCard();
  renderCard(cardElement);
}

function handleCardClick(data) {
  popupBigImage.open(data);
  popupBigImage.setEventListeners();
}

profileEditButton.addEventListener('click', () => {
  const {name, status} = userInfo.getUserInfo();
  popupEditProfile.setInputValues([name, status]);
  popupEditProfile.open();
  popupEditProfile.setEventListeners();
});

profileAddButton.addEventListener('click', () => {
  popupAddProfile.open();
  popupAddProfile.setEventListeners();
});

formList.forEach((item) => {
  const itemValidation = new FormValidator(validationConfig, item);
  itemValidation.enableValidation();
});

cardList.renderItems();