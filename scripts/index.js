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

const cards = document.querySelector('.cards');

function addCard(title, link) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__title').textContent = title;
  cardElement.querySelector('.card__image').src = link;
  return cardElement;
}

for (let i = 0; i < initialCards.length; i++) {
  cards.append(addCard(initialCards[i].name, initialCards[i].link));
}

let profile = document.querySelector('.profile');
const profileEditButton = profile.querySelector('.profile__edit-button');
let profileName = profile.querySelector('.profile__name');
let profileStatus = profile.querySelector('.profile__status');

let popupEditProfile = document.querySelectorAll('.popup')[0];
const popupEditProfileCloseButton = popupEditProfile.querySelector('.popup__close-button');
let nameInput = popupEditProfile.querySelector('.popup__field_type_name');
let statusInput = popupEditProfile.querySelector('.popup__field_type_status');

let editForm = popupEditProfile.querySelector('.popup__form');

function openPopup(popup) {
  popup.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  statusInput.value = profileStatus.textContent;
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

profileEditButton.addEventListener('click', () => openPopup(popupEditProfile));
popupEditProfileCloseButton.addEventListener('click', () => closePopup(popupEditProfile));


function submitEditForm(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileStatus.textContent = statusInput.value;
  closePopup(popupEditProfile);
}

editForm.addEventListener('submit', submitEditForm);

const profileAddButton = profile.querySelector('.profile__add-button');

let popupAddProfile = document.querySelectorAll('.popup')[1];
const popupAddProfileCloseButton = popupAddProfile.querySelector('.popup__close-button');
let titleInput = popupAddProfile.querySelector('.popup__field_type_title');
let linkInput = popupAddProfile.querySelector('.popup__field_type_link');

let addForm = popupAddProfile.querySelector('.popup__form');

profileAddButton.addEventListener('click', () => openPopup(popupAddProfile));
popupAddProfileCloseButton.addEventListener('click', () => closePopup(popupAddProfile));

function submitAddForm(evt) {
  evt.preventDefault();
  cards.prepend(addCard(titleInput.value, linkInput.value));
  closePopup(popupAddProfile);
}

addForm.addEventListener('submit', submitAddForm);