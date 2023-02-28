// импортируем массив стартовых карточек,
// скрипт вставки карточки на сайт,
// скрипт валидации форм
import _initialCards from './script_arr_cards.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';

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

//место куда будем вставлять шаблон
const container = document.querySelector('.elements');

//сам шаблон
const template = document.querySelector('.template').content;

//запускаем метод render для заполнения сайта стартовыми карточками
_initialCards.forEach(item => {
  const name = item.name;
  const link = item.link;
  new Card(name, link).renderCard(container, template);
});

// вешаем событие на клик кнопки редактирования профиля
// и запускаем фалидацию формы
buttonFormEdit.addEventListener('click', () => {
  popupUserDescr.value = profileDescr.textContent;
  popupUserName.value = porfileName.textContent;
  openPopup(popupEdit);
  new FormValidator(popupEdit.querySelector('.popup__form'));
});

// вешаем событие на клик кнопки добавления картинки
// и запускаем фалидацию формы
buttonGalleryAdd.addEventListener('click', function () {
  openPopup(popupGallery);
  new FormValidator(popupGallery.querySelector('.popup__form'));
});

//вешаем событие отправки формы редактирования профиля
profileForm.addEventListener('submit', savePopupEdit);

//вешаем событие отправки формы добавления карточки с картинкой
cardForm.addEventListener('submit', saveFormGallery);

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

//функция отмены стандартного отправления формы
function preventDefault(evt) {
  evt.preventDefault();
}

//функция сохранения редактирования профиля
function savePopupEdit(evt) {
  preventDefault(evt);
  porfileName.textContent = popupUserName.value;
  profileDescr.textContent = popupUserDescr.value;
  closePopup(popupEdit);
}

//функция добавления новой карточки с картинкой
// передаем это событие классу Card
function saveFormGallery(evt) {
  preventDefault(evt);
  new Card(inputHeaderGallery.value, inputLinkGallery.value).renderCard(container, template)
  evt.target.reset();//очищаю форму
  closePopup(popupGallery); //скрываю попап окно добавления картинки
}

// экспортируем openPopup в Card для вызова фукции в нутри класса
export default openPopup;
