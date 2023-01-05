let buttonFormEdit = document.querySelector('.profile__button-edit');
let formProfile = document.querySelector('.popup');
let buttonFormClose = document.querySelector('.popup__button-close');
let buttonFormSave = document.querySelector('.popup__button-save');
let porfileName = document.querySelector('.profile__name');
let profileDescr = document.querySelector('.profile__description');
let popupUserName = document.querySelector('.popup__user-name');
let popupUserDescr = document.querySelector('.popup__user-description');

function formEditDisplay() {
  formProfile.classList.toggle('popup_visible');
  popupUserName.value = porfileName.textContent;
  popupUserDescr.value = profileDescr.textContent;

}

buttonFormEdit.addEventListener('click', formEditDisplay);
buttonFormClose.addEventListener('click', formEditDisplay);

function formEditSave() {
  porfileName.textContent = popupUserName.value;
  profileDescr.textContent = popupUserDescr.value;
  formProfile.classList.remove('popup_visible');
}
buttonFormSave.addEventListener('click', formEditSave);
