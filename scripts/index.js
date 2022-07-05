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
const cardTemplate = document.querySelector('#card-template').content;

const popupBigImage = document.querySelector('.popup_big-image');
const popupBigImageCloseButton = popupBigImage.querySelector('.popup__close-button');
popupBigImageCloseButton.addEventListener('click', () => closePopup(popupBigImage));

function createCard(title, link) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  cardElement.querySelector('.card__title').textContent = title;
  cardElement.querySelector('.card__image').src = link;
  cardElement.querySelector('.card__image').alt = title;

  const cardLike = cardElement.querySelector('.card__like-button');
  cardLike.addEventListener('click', function (evt) {
    evt.target.classList.toggle('card__like-button_active');
  });

  const cardTrash = cardElement.querySelector('.card__trash-button');
  cardTrash.addEventListener('click', function () {
    cardElement.remove();
  });

  const cardImage = cardElement.querySelector('.card__image');
  cardImage.addEventListener('click', function () {
    openPopup(popupBigImage);
    popupBigImage.querySelector('.popup__image').src = link;
    popupBigImage.querySelector('.popup__image').alt = title;
    popupBigImage.querySelector('.popup__subtitle').textContent = title
  });

  return cardElement;
}

function renderCard(card) {
  cards.prepend(card);
}

for (let i = 0; i < initialCards.length; i++) {
  renderCard(createCard(initialCards[i].name, initialCards[i].link));
}

const profile = document.querySelector('.profile');
const profileEditButton = profile.querySelector('.profile__edit-button');
const profileName = profile.querySelector('.profile__name');
const profileStatus = profile.querySelector('.profile__status');

const popupEditProfile = document.querySelector('.popup_edit-profile');
const popupEditProfileCloseButton = popupEditProfile.querySelector('.popup__close-button');
const nameInput = popupEditProfile.querySelector('.popup__field_type_name');
const statusInput = popupEditProfile.querySelector('.popup__field_type_status');

const formEdit = popupEditProfile.querySelector('.popup__form');

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

profileEditButton.addEventListener('click', () => {
  openPopup(popupEditProfile);
  nameInput.value = profileName.textContent;
  statusInput.value = profileStatus.textContent;
});
popupEditProfileCloseButton.addEventListener('click', () => closePopup(popupEditProfile));


function submitEditForm(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileStatus.textContent = statusInput.value;
  closePopup(popupEditProfile);
}

formEdit.addEventListener('submit', submitEditForm);

const profileAddButton = profile.querySelector('.profile__add-button');

const popupAddProfile = document.querySelector('.popup_add-profile');
const popupAddProfileCloseButton = popupAddProfile.querySelector('.popup__close-button');
const titleInput = popupAddProfile.querySelector('.popup__field_type_title');
const linkInput = popupAddProfile.querySelector('.popup__field_type_link');

const formAdd = popupAddProfile.querySelector('.popup__form');

profileAddButton.addEventListener('click', () => {
  openPopup(popupAddProfile);
  titleInput.value = '';
  linkInput.value = '';
});
popupAddProfileCloseButton.addEventListener('click', () => closePopup(popupAddProfile));

function submitAddForm(evt) {
  evt.preventDefault();
  renderCard(createCard(titleInput.value, linkInput.value));
  closePopup(popupAddProfile);
}

formAdd.addEventListener('submit', submitAddForm);