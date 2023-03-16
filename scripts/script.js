// импортируем массив стартовых карточек,
// скрипт вставки карточки на сайт,
// скрипт валидации форм
// импортируем конфиг
import { _initialCards, config } from './utils/constants.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';
import Section from './Section.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js'
import UserInfo from './UserInfo.js';

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

buttonFormEdit.addEventListener('click', () => {
  validProfileForm.removeValidationErrors();
  const getInfoUser = userInfo.getUserInfo();
  popupUserName.value = getInfoUser.profileName; // заполнил инпуты значениями из класса UserInfo
  popupUserDescr.value = getInfoUser.profileDescription;
  openEditPopup.open();// отобразил попап
  openEditPopup.setEventListeners() //навесил слушатели
});

const openEditPopup = new PopupWithForm(config.popupEdit, {
  submitForm: (formValues) => {
    userInfo.setUserInfo(formValues.firstname, formValues.description)
  }
})

//блок с работой карточки
function openPopapClickToImage(popupImage, selectorImage) {
  const openPopap = new PopupWithImage(popupImage, selectorImage);
  openPopap.open();
  openPopap.setEventListeners();
}

function finishCard(name, link) {
  const card = new Card(name, link, config.template, {
    handleCardClick: (selectorImage) => {
      openPopapClickToImage(config.popupImage, selectorImage);
    }
  })
  return card.renderCard()
}

// вставляем картинки из массива
const cardsList = new Section({
  renderer: (item) => {
    const name = item.name;
    const link = item.link;
    const finalCard = finishCard(name, link); //возвращает заполненный шаблон
    cardsList.addItem(finalCard); //вставляем заполненный шаблон на страницу
  },
}, config.container);
cardsList.renderItems(_initialCards);

//добавляем карточку после нажатия Сохранить
const openGalleryPopup = new PopupWithForm(config.popupGallery, {
  submitForm: (inputValues) => {
    const finalCard = finishCard(inputValues.header, inputValues.link); //возвращает заполненный шаблон карточки
    cardsList.addItem(finalCard); //вставляем заполненный шаблон на страницу
  }
});

buttonGalleryAdd.addEventListener('click', () => {
  validCardForm.removeValidationErrors(); //запустил валидацию
  openGalleryPopup.open() //открываем попап

});

openGalleryPopup.setEventListeners() //повесил слушатели на попап


