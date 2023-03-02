// импортируем массив стартовых карточек,
// скрипт вставки карточки на сайт,
// скрипт валидации форм
import { _initialCards, config } from './utils/constants.js';
import { openPopup, closePopup } from './utils/utils.js'
import Card from './Card.js';
import FormValidator from './FormValidator.js';

const porfileName = document.querySelector('.profile__name'); //сохранил имя профиля
const profileDescr = document.querySelector('.profile__description'); //сохранил описание профиля

const buttonFormEdit = document.querySelector('.profile__button-edit'); //нашел кнопку редактирования профиля
const popupEdit = document.querySelector('.popup_edit'); //нашел попап редактирования профиля

const buttonGalleryAdd = document.querySelector('.profile__button-add'); // нашел кнопку добавления картинки
const popupGallery = document.querySelector('.popup_add'); //попап добавления картинки

const profileForm = document.forms['profile']; //нашел форму профиля
const popupUserName = profileForm.elements['input-name']; //нашел поле ввода имени профиля в попап окне
const popupUserDescr = profileForm.elements['input-descr']; //нашел поле ввода описания профиля в попап окне


const cardForm = document.forms['gallery']; //нашел форму галлерея
const inputHeaderGallery = cardForm.elements['input-img-name']; //поле ввода описания в попап окне
const inputLinkGallery = cardForm.elements['input-img-url']; //поле ссылки на картинку в попап окне

//место куда будем вставлять шаблон
const container = document.querySelector('.elements');

//сам шаблон
const template = document.querySelector('.template').content;

//включаем валидацию форм
const validProfileForm = new FormValidator(profileForm, config).enableValidation();
const validCardForm = new FormValidator(cardForm, config).enableValidation();

// функция возврата готовой карточки
//функция возвращает заполненную карточку, но не вставляет в разметку
function creatCard(nameCard, urlCard, template) {
  const newCard = new Card(nameCard, urlCard, template).renderCard();
  return newCard;
};

//запускаем метод render для заполнения сайта стартовыми карточками
_initialCards.forEach(item => {
  const name = item.name;
  const link = item.link;
  container.append(creatCard(name, link, template));
});


// вешаем событие на клик кнопки редактирования профиля
// и запускаем фалидацию формы
buttonFormEdit.addEventListener('click', () => {
  popupUserDescr.value = profileDescr.textContent;
  popupUserName.value = porfileName.textContent;
  openPopup(popupEdit);
});

// вешаем событие на клик кнопки добавления картинки
// и запускаем фалидацию формы
buttonGalleryAdd.addEventListener('click', function () {
  openPopup(popupGallery);
});

//вешаем событие отправки формы редактирования профиля
profileForm.addEventListener('submit', savePopupEdit);

//вешаем событие отправки формы добавления карточки с картинкой
cardForm.addEventListener('submit', saveFormGallery);

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
// передаем это событие классу Card.
// Класс Card возвращает заполненую картинку
function saveFormGallery(evt) {
  preventDefault(evt);
  container.prepend(creatCard(inputHeaderGallery.value, inputLinkGallery.value, template))
  evt.target.reset();//очищаю форму
  closePopup(popupGallery); //скрываю попап окно добавления картинки
}

// экспортируем openPopup в Card для вызова фукции в нутри класса

