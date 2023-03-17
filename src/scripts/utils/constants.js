const _initialCards = [
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

const config = {
  container: '.elements',   //место куда будем вставлять шаблон с карточками
  template: '.template',    //шаблон который будем заполнять и добавлять в conteiner(размещать карточку)
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
  profileName: '.profile__name', //селектор имени профиля на странице
  profileDescription: '.profile__description', //селектор описание профиля на странице
  popupImage: '.popup_image',  //попап самой картинки
  popupEdit: '.popup_edit',   //попап редактирования профиля
  popupGallery: '.popup_add'  //попап добавления картинки
}

export { _initialCards, config };
