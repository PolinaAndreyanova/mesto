let profile = document.querySelector('.profile');
const profileEditButton = profile.querySelector('.profile__edit-button');
let profileName = profile.querySelector('.profile__name');
let profileStatus = profile.querySelector('.profile__status');

let popup = document.querySelector('.popup');
const popupCloseButton = popup.querySelector('.popup__close-button');
let nameInput = popup.querySelector('.popup__field_type_name');
let statusInput = popup.querySelector('.popup__field_type_status');

let form = popup.querySelector('.popup__form');

function openPopup() {
  popup.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  statusInput.value = profileStatus.textContent;
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

profileEditButton.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', closePopup);


function formSubmitHandler (evt) {
  evt.preventDefault(); 
  profileName.textContent = nameInput.value;
  profileStatus.textContent = statusInput.value;
  closePopup();
}

form.addEventListener('submit', formSubmitHandler);