const config = {
  container: '.elements',   //место куда будем вставлять шаблон с карточками
  template: '.template',    //шаблон который будем заполнять и добавлять в conteiner(размещать карточку)
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
  profileName: '.profile__name', //селектор имени профиля на странице
  profileDescription: '.profile__description', //селектор описание профиля на странице
  profileAvatar: '.profile__avatar',     //селектор где лежит фото аватара
  popupImageSelector: '.popup_image',  //селектор попап самой картинки
  popupEdit: '.popup_edit',   //селектор попап редактирования профиля
  popupGallery: '.popup_add',  //селектор попап добавления картинки
  popupTrash: '.popup_trash',   // селектор попап корзины
  popupAvatar: '.popup_avatar', //селектор попап аватара
  urlApi: 'https://mesto.nomoreparties.co/v1/cohort-62', //адрес сервера где храняться карточки
  tokenApi: '9792b8e2-d3a5-4eb4-90af-3d3354b4d9c2'                // токен пользователя
}

export default config;
