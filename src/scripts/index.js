// импортируем массив стартовых карточек,
// скрипт вставки карточки на сайт,
// скрипт валидации форм
// импортируем конфиг
import '../pages/index.css' //импортирую css для webpack

import config from './utils/constants.js';
import Card from './components/Card.js';
import FormValidator from './components/FormValidator.js';
import Section from './components/Section.js';
import PopupWithImage from './components/PopupWithImage.js';
import PopupWithForm from './components/PopupWithForm.js'
import UserInfo from './components/UserInfo.js';
import Api from './components/Api.js';
import PopupWithTrash from './components/PopupWithTrash.js';
import PoputWithAvatar from './components/PoputWithAvatar.js';

const buttonFormEdit = document.querySelector('.profile__button-edit'); //нашел кнопку редактирования профиля
const buttonGalleryAdd = document.querySelector('.profile__button-add'); // нашел кнопку добавления картинки
const buttonAvatarAdd = document.querySelector('.profile__avatar-button');

const profileForm = document.forms['profile']; //нашел форму профиля
const popupUserName = profileForm.elements['input-name']; //нашел поле ввода имени профиля в попап окне
const popupUserDescr = profileForm.elements['input-descr']; //нашел поле ввода описания профиля в попап окне
const cardForm = document.forms['gallery']; //нашел форму галлерея
const avatarForm = document.forms['avatar']; //нашел форму аватар

//включаем валидацию форм
const validProfileForm = new FormValidator(profileForm, config);
validProfileForm.enableValidation(); //включаем валидацию на форме профиля
const validCardForm = new FormValidator(cardForm, config);
validCardForm.enableValidation(); //включаем валидацию на форме добавления карточки
const validAvatarForm = new FormValidator(avatarForm, config);
validAvatarForm.enableValidation(); //включаем валидацию на форме профиля

const userInfo = new UserInfo(config.profileName, config.profileDescription, config.profileAvatar); //передали в конструктор класса UserInfo селекторы пользователя

const api = new Api({
  url: config.urlApi,
  headers: {
    'Content-Type': 'application/json',
    authorization: config.tokenApi,
  }
});

api.getAllNeedData()
  .then((arg) => {
    const [userInf, allDateCards] = arg;
    const userId = userInf._id;

    const cardsList = new Section({
      renderer: (data) => {
        const finalCard = createCard(data); //возвращает заполненный шаблон

        cardsList.addItem(finalCard); //вставляем заполненный шаблон на страницу
      },
    }, config.container);

    allDateCards.forEach((item) => {
      cardsList.renderItems(item)
    });

    const popupTrash = new PopupWithTrash(config.popupTrash, {
      submitForm: (idImage, templaitCard) => {
        api._delCard(idImage)
          .then(() => {
            templaitCard.remove();
          })
          .catch((err) => console.log(err));
      }
    });
    popupTrash.setEventListeners()


    userInfo.setUserInfo(userInf.name, userInf.about); //разместил ответ от сервера в html
    userInfo.setUserAvatar(userInf.avatar);

    function createCard(data) {
      const card = new Card(data, config.template, userId, {
        handleCardClick: (selectorImage) => {
          popupImage.open(selectorImage);
        },
      },
        {
          handleLikeClick: (idImage, likesArr) => {  // если произошел клик из конструктора забираю массив лайков

            if (likesArr.some(item => item._id == userId)) {    //если в массиве лайков есть мой id,
              api._delLike(idImage)           // то удалить лайк из массива
                .then((data) => {
                  card.setLikesCount(data.likes)
                })
                .catch((err) => console.log(err));
            }
            else {
              const likes = api._putLike(idImage);         // иначе добавить лайк в массив
              likes.then((data) => {
                card.setLikesCount(data.likes)
              })
                .catch((err) => console.log(err));
            }
            // })
          }
        },
        {
          handleDeleteIconClick: (idImage, templaitCard) => {
            popupTrash.open(idImage, templaitCard);

          }
        }
      )
      return card.renderCard()
    }

    const popupAddCard = new PopupWithForm(config.popupGallery, {
      submitForm: (inputValues) => {
        popupAddCard.renderLoading(true);
        const postCardData = api._postCardData(inputValues);
        postCardData.then((data) => {
          const finalCard = createCard(data); //возвращает заполненный шаблон карточки
          cardsList.addItem(finalCard); //вставляем заполненный шаблон на страницу
        })
          .catch((err) => console.log(err))
          .finally(() => popupAddCard.renderLoading(false));
      }
    });
    buttonGalleryAdd.addEventListener('click', () => {
      validCardForm.removeValidationErrors(); //запустил валидацию
      popupAddCard.open() //открываем попап
    });
    popupAddCard.setEventListeners() //повесил слушатели на попап
  })
  .catch((err) => console.log(err));







//меняем информацию о пользователе из формы в html
const popupEditProfile = new PopupWithForm(config.popupEdit, {
  submitForm: (formValues) => {
    popupEditProfile.renderLoading(true);
    api._patchUserData(formValues)
      .then((data) => {
        userInfo.setUserInfo(data.name, data.about)
      })
      .catch((err) => console.log(err))
      .finally(() => { popupEditProfile.renderLoading(false); })
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

const popupImage = new PopupWithImage(config.popupImageSelector);
popupImage.setEventListeners();

const popupAvatar = new PoputWithAvatar(config.popupAvatar, {
  submitForm: (InputValues) => {
    popupAvatar.renderLoading(true);
    api._patchUserAvatar(InputValues)
      .then(() => {
        userInfo.setUserAvatar(InputValues.avatar)
      })
      .catch((err) => console.log(err))
      .finally(() => popupAvatar.renderLoading(false))
  }
})

buttonAvatarAdd.addEventListener('click', () => {
  validAvatarForm.removeValidationErrors()
  popupAvatar.open();
})
popupAvatar.setEventListeners()

