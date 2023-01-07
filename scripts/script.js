let buttonFormEdit = document.querySelector('.profile__button-edit');
let formProfile = document.querySelector('.popup');
let buttonFormClose = document.querySelector('.popup__button-close');
let buttonFormSave = document.querySelector('.popup__button-save');
let porfileName = document.querySelector('.profile__name');
let profileDescr = document.querySelector('.profile__description');
let popupUserName = document.querySelector('.popup__user_input_name');
let popupUserDescr = document.querySelector('.popup__user_input_description');
let formUser = document.querySelector('.popup__profile-edit');

function formEditDisplay() {
  formProfile.classList.add('popup_visible');
  popupUserName.value = porfileName.textContent;
  popupUserDescr.value = profileDescr.textContent;
}

function formEditClose() {
  formProfile.classList.remove('popup_visible');
}

function formEditSave(evt) {
  evt.preventDefault();
  porfileName.textContent = popupUserName.value;
  profileDescr.textContent = popupUserDescr.value;
  formProfile.classList.remove('popup_visible');
}

formUser.addEventListener('submit', formEditSave);
buttonFormEdit.addEventListener('click', formEditDisplay);
buttonFormClose.addEventListener('click', formEditClose);
