const porfileName = document.querySelector('.profile__name'); //сохранил имя профиля
const profileDescr = document.querySelector('.profile__description'); //сохранил описание профиля

const buttonFormEdit = document.querySelector('.profile__button-edit'); //нашел кнопку редактирования профиля
const popupEdit = document.querySelector('.popup_edit'); //нашел попап не форму окно редактирования профиля

const profileForm = document.forms['profile']; //нашел форму профиля
const popupUserName = profileForm.elements['input-name']; //нашел поле ввода имени профиля в попап окне
const popupUserDescr = profileForm.elements['input-descr']; //нашел поле ввода описания профиля в попап окне

const buttonGalleryAdd = document.querySelector('.profile__button-add'); // нашел кнопку добавления картинки
const popupGallery = document.querySelector('.popup_add'); //попап добавления картинки

const cardForm = document.forms['gallery']; //нашел форму галлерея
const inputHeaderGallery = cardForm.elements['input-img-name']; //поле ввода описания в попап окне
const inputLinkGallery = cardForm.elements['input-img-url']; //поле ссылки на картинку в попап окне

const galleryTemplate = document.querySelector('.template').content; //беру разметку с шаблона
const sectionElements = document.querySelector('.elements'); //беру элемент внутрь которого буду вставлять разметку из шаблона
const popupImage = document.querySelector('.popup_image');
const inputImage = popupImage.querySelector('.popup__picture');
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
  closePopup(popupEdit);
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
  openPopup(popupEdit)
});

buttonGalleryAdd.addEventListener('click', function () {
  openPopup(popupGallery);
});

cardForm.addEventListener('submit', saveFormGallery);
profileForm.addEventListener('submit', savePopupEdit);


