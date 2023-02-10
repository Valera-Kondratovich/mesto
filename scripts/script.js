const buttonFormEdit = document.querySelector('.profile__button-edit'); //нашел кнопку редактирования профиля
const formEdit = document.querySelector('.popup_edit'); //нашел попап окно редактирования профиля
const buttonFormClose = formEdit.querySelector('.popup__button-close'); //нашел кнопку закрытия профиля
const buttonFormSave = formEdit.querySelector('.popup__edit__button-save'); //нашел кнопку сохранения профиля
const porfileName = document.querySelector('.profile__name'); //сохранил имя профиля
const profileDescr = document.querySelector('.profile__description'); //сохранил описание профиля
const popupUserName = formEdit.querySelector('.popup__input_name'); //нашел поле ввода имени профиля в попап окне
const popupUserDescr = formEdit.querySelector('.popup__input_description'); //нашел поле ввода описания профиля в попап окне
const formUser = document.querySelector('.popup__profile'); //нашел форму профиля
const buttonGalleryAdd = document.querySelector('.profile__button-add'); // нашел кнопку добавления картинки
const popupGallery = document.querySelector('.popup_add'); //попап добавления картинки
const buttonGalleryClose = popupGallery.querySelector('.popup__button-close'); // кнопка закрытия попап окна
const buttonGallerySave = popupGallery.querySelector('.popup__button-save'); // кнопка сохранения попап окна
const inputHeaderGallery = popupGallery.querySelector('.popup__input_header'); //поле ввода описания в попап окне
const inputLinkGallery = popupGallery.querySelector('.popup__input_link'); //поле ссылки на картинку в попап окне
const formGallery = popupGallery.querySelector('.popup__gallery'); //нашел форму в попап окне
const galleryTemplate = document.querySelector('.template').content; //беру разметку с шаблона
const sectionElements = document.querySelector('.elements'); //беру элемент внутрь которого буду вставлять разметку из шаблона

function hidePopup(popup, evt) {
  const key = evt.key;
  if (key === 'Escape') {
    popup.classList.remove('popup_opened');
  };
}

function closePopupEsc(popup) {
  document.addEventListener('keydown', function (evt) {
    hidePopup(popup, evt)
  });
  document.removeEventListener('keydown', function (evt) {
    hidePopup(popup, evt)
  });
};

function closePopupClick(popup) {
  const form = popup.querySelector('.popup__form')
  popup.addEventListener('mousedown', function (evt) {
    if (evt.target.classList.contains('popup')) {
      closePopup(popup)
    }
  });
}

function openPopup(item) {
  item.classList.add('popup_opened');
  closePopupEsc(item);
  closePopupClick(item);
  enableValidation(config);
}

function closePopup(item) {
  item.classList.remove('popup_opened');

}

function disabledSubmit(evt) {
  evt.preventDefault();
}
function savePopupEdit(evt) {
  disabledSubmit(evt);
  porfileName.textContent = popupUserName.value;
  profileDescr.textContent = popupUserDescr.value;
  closePopup(formEdit);
}

function saveFormGallery(evt) {
  disabledSubmit(evt);
  sectionElements.prepend(createCard(inputHeaderGallery.value, inputLinkGallery.value)); //добавляю в начало карточку картинки
  inputHeaderGallery.value = ''; //очищаею поле описания картинки
  inputLinkGallery.value = ''; //очищаею поле ссылки на картинку
  closePopup(popupGallery); //скрываю попап окно добавления картинки
}

const createCard = (name, link) => {
  const galleryElement = galleryTemplate.querySelector('.elements__element').cloneNode(true);
  const buttonLike = galleryElement.querySelector('.elements__button-like');
  const buttonDel = galleryElement.querySelector('.elements__button-trash');
  const buttonImage = galleryElement.querySelector('.elements__img');
  const titleImage = galleryElement.querySelector('.elements__title');
  const popupImage = document.querySelector('.popup_image');
  const inputImage = popupImage.querySelector('.popup__picture');
  const buttonCloseImage = popupImage.querySelector('.popup__button-close');
  const depiction = popupImage.querySelector('.popup__description');

  titleImage.textContent = name;
  buttonImage.alt = name;
  buttonImage.src = link;

  buttonCloseImage.addEventListener('click', () => closePopup(popupImage));

  buttonLike.addEventListener('click', () => {
    buttonLike.classList.toggle('elements__button-like_active');
  });

  buttonDel.addEventListener('click', () => {
    galleryElement.remove();
  });
  buttonImage.addEventListener('click', () => {
    openPopup(popupImage);
    depiction.textContent = titleImage.textContent;
    inputImage.setAttribute('src', galleryElement.querySelector('.elements__img').src);
    inputImage.setAttribute('alt', galleryElement.querySelector('.elements__img').alt);
  });
  return galleryElement;
}

const renderCard = (name, link) => {
  sectionElements.append(createCard(name, link));
};

initialCards.forEach(function (item) {
  const name = item.name;
  const link = item.link;
  renderCard(name, link);
});

buttonFormEdit.addEventListener('click', function () {
  openPopup(formEdit)

});
buttonFormClose.addEventListener('click', () => closePopup(formEdit));
buttonGalleryAdd.addEventListener('click', function () {
  openPopup(popupGallery);

});
buttonGalleryClose.addEventListener('click', () => closePopup(popupGallery));

formGallery.addEventListener('submit', saveFormGallery);
formUser.addEventListener('submit', savePopupEdit);
popupUserDescr.value = profileDescr.textContent;
popupUserName.value = porfileName.textContent;

