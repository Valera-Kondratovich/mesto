// импортируем массив стартовых карточек,
// скрипт вставки карточки на сайт,
// скрипт валидации форм
// импортируем конфиг
import '../pages/index.css' //импортирую css для webpack

import { _initialCards, config } from './utils/constants.js';
import Card from './components/Card.js';
import FormValidator from './components/FormValidator.js';
import Section from './components/Section.js';
import PopupWithImage from './components/PopupWithImage.js';
import PopupWithForm from './components/PopupWithForm.js'
import UserInfo from './components/UserInfo.js';

const buttonFormEdit = document.querySelector('.profile__button-edit'); //нашел кнопку редактирования профиля
const buttonGalleryAdd = document.querySelector('.profile__button-add'); // нашел кнопку добавления картинки
const profileForm = document.forms['profile']; //нашел форму профиля
const popupUserName = profileForm.elements['input-name']; //нашел поле ввода имени профиля в попап окне
const popupUserDescr = profileForm.elements['input-descr']; //нашел поле ввода описания профиля в попап окне
const cardForm = document.forms['gallery']; //нашел форму галлерея

const userInfo = new UserInfo(config.profileName, config.profileDescription); //передали в конструктор класса UserInfo данные пользователя

//включаем валидацию форм
const validProfileForm = new FormValidator(profileForm, config);
validProfileForm.enableValidation(); //включаем валидацию на форме профиля
const validCardForm = new FormValidator(cardForm, config);
validCardForm.enableValidation(); //включаем валидацию на форме добавления карточки

const popupEditProfile = new PopupWithForm(config.popupEdit, {
  submitForm: (formValues) => {
    userInfo.setUserInfo(formValues.firstname, formValues.description)
  }
})

buttonFormEdit.addEventListener('click', () => {
  validProfileForm.removeValidationErrors();
  const getInfoUser = userInfo.getUserInfo();
  popupUserName.value = getInfoUser.profileName; // заполнил инпуты значениями из класса UserInfo
  popupUserDescr.value = getInfoUser.profileDescription;
  popupEditProfile.open();// отобразил попап
});
popupEditProfile.setEventListeners() //навесил слушатели


//блок с работой карточки

const popupImage = new PopupWithImage(config.popupImageSelector);

function createCard(name, link) {
  const card = new Card(name, link, config.template, {
    handleCardClick: (selectorImage) => {
      popupImage.open(selectorImage);
    }
  })
  return card.renderCard()
}
popupImage.setEventListeners();

// вставляем картинки из массива
const cardsList = new Section({
  renderer: (item) => {
    const name = item.name;
    const link = item.link;
    const finalCard = createCard(name, link); //возвращает заполненный шаблон
    cardsList.addItem(finalCard); //вставляем заполненный шаблон на страницу
  },
}, config.container);
cardsList.renderItems(_initialCards);

//добавляем карточку после нажатия Сохранить
const popupAddCard = new PopupWithForm(config.popupGallery, {
  submitForm: (inputValues) => {
    const finalCard = createCard(inputValues.header, inputValues.link); //возвращает заполненный шаблон карточки
    cardsList.addItem(finalCard); //вставляем заполненный шаблон на страницу
  }
});

buttonGalleryAdd.addEventListener('click', () => {
  validCardForm.removeValidationErrors(); //запустил валидацию
  popupAddCard.open() //открываем попап
});
popupAddCard.setEventListeners() //повесил слушатели на попап


