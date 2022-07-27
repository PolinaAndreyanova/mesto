import { Card } from "./card.js";

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

const cards = document.querySelector('.cards');

const profile = document.querySelector('.profile');
const profileEditButton = profile.querySelector('.profile__edit-button');
const profileName = profile.querySelector('.profile__name');
const profileStatus = profile.querySelector('.profile__status');
const profileAddButton = profile.querySelector('.profile__add-button');

const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const popupEditProfileCloseButton = popupEditProfile.querySelector('.popup__close-button');
const nameInput = popupEditProfile.querySelector('.popup__input_type_name');
const statusInput = popupEditProfile.querySelector('.popup__input_type_status');
const formEdit = popupEditProfile.querySelector('.popup__form');

const popupAddProfile = document.querySelector('.popup_type_add-profile');
const popupAddProfileCloseButton = popupAddProfile.querySelector('.popup__close-button');
const titleInput = popupAddProfile.querySelector('.popup__input_type_title');
const linkInput = popupAddProfile.querySelector('.popup__input_type_link');
const formAdd = popupAddProfile.querySelector('.popup__form');
const popupAddProfileSubmitButton = popupAddProfile.querySelector('.popup__submit-button');

function renderCard(card) {
  cards.prepend(card);
}

function handleCloseOverlay(evt) {
  if (evt.currentTarget === evt.target) {
    closePopup(evt.currentTarget);
  }
}

function handleEscClick(evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  }
}

export function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscClick);
  popup.addEventListener('click', handleCloseOverlay);
}

export function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscClick);
  popup.removeEventListener('click', handleCloseOverlay);
}

function cleanPopup(popup) {
  popup.querySelectorAll('.popup__error').forEach((elem) => elem.textContent = '');
  popup.querySelectorAll('.popup__input').forEach((elem) => elem.classList.remove('popup__input_type_error'));
}

function disableSubmitButton(disableClass, button) {
  button.classList.add(disableClass);
  button.disabled = true;
}

function submitEditForm(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileStatus.textContent = statusInput.value;
  closePopup(popupEditProfile);
}

function submitAddForm(evt) {
  evt.preventDefault();
  renderCard(createCard(titleInput.value, linkInput.value));
  closePopup(popupAddProfile);
}

initialCards.forEach((item) => {
  const card = new Card(item, '#card-template');
  const cardElement = card.generateCard();
  renderCard(cardElement);
});

profileEditButton.addEventListener('click', () => {
  cleanPopup(popupEditProfile);
  nameInput.value = profileName.textContent;
  statusInput.value = profileStatus.textContent;
  openPopup(popupEditProfile);
});

popupEditProfileCloseButton.addEventListener('click', () => closePopup(popupEditProfile));

formEdit.addEventListener('submit', submitEditForm);

profileAddButton.addEventListener('click', () => {
  cleanPopup(popupAddProfile);
  disableSubmitButton('popup__submit-button_disabled', popupAddProfileSubmitButton);
  titleInput.value = '';
  linkInput.value = '';
  openPopup(popupAddProfile);
});

popupAddProfileCloseButton.addEventListener('click', () => closePopup(popupAddProfile));

formAdd.addEventListener('submit', submitAddForm);
