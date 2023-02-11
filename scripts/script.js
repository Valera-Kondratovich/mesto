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
const popupImage = document.querySelector('.popup_image');
const inputImage = popupImage.querySelector('.popup__picture');
const buttonCloseImage = popupImage.querySelector('.popup__button-close');
const depiction = popupImage.querySelector('.popup__description');

function openPopup(item) {
  item.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscOrClick);
  item.addEventListener('mousedown', closeByEscOrClick);
}

function closePopup(item) {
  item.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscOrClick);
  item.removeEventListener('mousedown', closeByEscOrClick);
}

function closeByEscOrClick(evt) {
  if (evt.key === 'Escape' || evt.target.classList.contains('popup') || evt.target.classList.contains('popup__button-close')) {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  };
}

function preventDefault(evt) {
  evt.preventDefault();
}
function savePopupEdit(evt) {
  preventDefault(evt);
  porfileName.textContent = popupUserName.value;
  profileDescr.textContent = popupUserDescr.value;
  closePopup(formEdit);
}

function saveFormGallery(evt) {
  preventDefault(evt);
  sectionElements.prepend(createCard(inputHeaderGallery.value, inputLinkGallery.value)); //добавляю в начало карточку картинки
  evt.target.reset();
  closePopup(popupGallery); //скрываю попап окно добавления картинки
}

const createCard = (name, link) => {
  const galleryElement = galleryTemplate.querySelector('.elements__element').cloneNode(true);
  const buttonLike = galleryElement.querySelector('.elements__button-like');
  const buttonDel = galleryElement.querySelector('.elements__button-trash');
  const buttonImage = galleryElement.querySelector('.elements__img');
  const titleImage = galleryElement.querySelector('.elements__title');

  titleImage.textContent = name;
  buttonImage.alt = name;
  buttonImage.src = link;

  buttonLike.addEventListener('click', () => {
    buttonLike.classList.toggle('elements__button-like_active');
  });

  buttonDel.addEventListener('click', () => {
    galleryElement.remove();
  });
  buttonImage.addEventListener('click', () => {
    openPopup(popupImage);
    depiction.textContent = name;
    inputImage.setAttribute('src', link);
    inputImage.setAttribute('alt', name);
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
  popupUserDescr.value = profileDescr.textContent;
  popupUserName.value = porfileName.textContent;
  openPopup(formEdit)
});

buttonGalleryAdd.addEventListener('click', function () {
  openPopup(popupGallery);

});


formGallery.addEventListener('submit', saveFormGallery);
formUser.addEventListener('submit', savePopupEdit);


