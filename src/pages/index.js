import './index.css' //импортирую css для webpack

import config from '../scripts/utils/constants.js';
import Card from '../scripts/components/Card.js';
import FormValidator from '../scripts/components/FormValidator.js';
import Section from '../scripts/components/Section.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js'
import UserInfo from '../scripts/components/UserInfo.js';
import Api from '../scripts/components/Api.js';
import PopupWithConfirmation from '../scripts/components/PopupWithConfirmation.js';

const buttonFormEdit = document.querySelector('.profile__button-edit'); //нашел кнопку редактирования профиля
const buttonGalleryAdd = document.querySelector('.profile__button-add'); // нашел кнопку добавления картинки
const buttonAvatarAdd = document.querySelector('.profile__avatar-button');
const profileForm = document.forms['profile']; //нашел форму профиля
const popupUserName = profileForm.elements['input-name']; //нашел поле ввода имени профиля в попап окне
const popupUserDescr = profileForm.elements['input-descr']; //нашел поле ввода описания профиля в попап окне

const formValidators = {}

// Включение валидации
const enableValidation = (config) => {
  const formList = Array.from(document.forms) //нашли все формы на странице
  formList.forEach((formElement) => {
    const validator = new FormValidator(formElement, config)
    // получаем данные из атрибута `name` у формы
    const formName = formElement.getAttribute('name');
    // вот тут в объект записываем под именем формы
    formValidators[formName] = validator;
    console.log(formValidators);
    validator.enableValidation();
  });
};

enableValidation(config); //включаем валидацию

const userInfo = new UserInfo(config.profileName, config.profileDescription, config.profileAvatar); //передали в конструктор класса UserInfo селекторы пользователя

//класс меняет информацию о пользователе из попап пользователя в html и обновляет информацию на сервере
const popupEditProfile = new PopupWithForm(config.popupEdit, {
  submitForm: (formValues) => {
    popupEditProfile.renderLoading(true);  //метод процесса загрузки
    api.patchUserData(formValues)
      .then((data) => {
        userInfo.setUserInfo(data.name, data.about);
        popupEditProfile.close();
      })
      .catch((err) => console.log(err))
      .finally(() => { popupEditProfile.renderLoading(false); })
  }
})

//кнопка открытия попап редактирования профиля
buttonFormEdit.addEventListener('click', () => {
  formValidators.profile.removeValidationErrors();
  const getInfoUser = userInfo.getUserInfo();
  popupUserName.value = getInfoUser.profileName; // заполнил инпуты значениями из класса UserInfo
  popupUserDescr.value = getInfoUser.profileDescription;
  popupEditProfile.open();// отобразил попап
});
popupEditProfile.setEventListeners() //навесил слушатели

//класс который отрабатывает клик по картинке
const popupImage = new PopupWithImage(config.popupImageSelector);
popupImage.setEventListeners();

//класс который отрабатвает запросы на сервер
const api = new Api({
  url: config.urlApi,
  headers: {
    'Content-Type': 'application/json',
    authorization: config.tokenApi,
  }
});

// класс изменения аватар
const popupAvatar = new PopupWithForm(config.popupAvatar, {
  submitForm: (InputValues) => {
    popupAvatar.renderLoading(true);
    api.patchUserAvatar(InputValues)
      .then(() => {
        userInfo.setUserAvatar(InputValues.avatar);
        popupAvatar.close();
      })
      .catch((err) => console.log(err))
      .finally(() => popupAvatar.renderLoading(false))
  }
})

buttonAvatarAdd.addEventListener('click', () => {
  formValidators.avatar.removeValidationErrors();
  popupAvatar.open();
})
popupAvatar.setEventListeners()


api.getAllNeedData() // делаю запрос на получение данных о пользователе и о карточках
  .then((arg) => {
    const [userInf, arrayDateCards] = arg;
    const userId = userInf._id;

    userInfo.setUserInfo(userInf.name, userInf.about); //разместил ответ от сервера о пользователе в html разметку
    userInfo.setUserAvatar(userInf.avatar);           // //разместил аватар от сервера в разметку

    //создаю класс который будет добавлять карточку в разметку
    const cardsList = new Section({
      renderer: (data) => {
        const finalCard = createCard(data); //возвращает заполненный шаблон
        cardsList.addItem(finalCard); //вставляем заполненный шаблон на страницу
      },
    }, config.container);

    //создаю класс который будет отрабатывать подтверждение удаления карточки
    const popupConfirmation = new PopupWithConfirmation(config.popupConfirmation, {
      submitForm: (idImage, templaitCard) => {
        api.delCard(idImage)
          .then(() => {
            templaitCard.remove();
            popupConfirmation.close();
          })
          .catch((err) => console.log(err));
      }
    });
    popupConfirmation.setEventListeners()
    cardsList.renderItems(arrayDateCards)

    function createCard(data) {
      const card = new Card(data, config.template, userId, {
        handleCardClick: (selectorImage) => {
          popupImage.open(selectorImage);
        },
        handleLikeClick: (idImage, likesArr) => {  // если произошел клик из конструктора забираю массив лайков
          if (likesArr.some(item => item._id == userId)) {    //если в массиве лайков есть мой id,
            api.delLike(idImage)           // то удалить лайк из массива
              .then((data) => {
                card.setLikesCount(data.likes) //удалить лайк
              })
              .catch((err) => console.log(err));
          }
          else {
            const likes = api.putLike(idImage);         // иначе добавить лайк в массив
            likes.then((data) => {
              card.setLikesCount(data.likes)
            })
              .catch((err) => console.log(err));
          }
        },
        handleDeleteIconClick: (idImage, templaitCard) => {
          popupConfirmation.open(idImage, templaitCard); //открывается окно подтверждения удаления
        }
      }
      );
      return card.renderCard()
    }

    const popupAddCard = new PopupWithForm(config.popupGallery, {
      submitForm: (inputValues) => {
        popupAddCard.renderLoading(true);
        const postCardData = api.postCardData(inputValues);
        postCardData.then((data) => {
          const finalCard = createCard(data); //возвращает заполненный шаблон карточки
          cardsList.addItem(finalCard); //вставляем заполненный шаблон на страницу
          popupAddCard.close();
        })
          .catch((err) => console.log(err))
          .finally(() => popupAddCard.renderLoading(false));
      }
    });

    buttonGalleryAdd.addEventListener('click', () => {
      formValidators.gallery.removeValidationErrors(); //удаляю ошибки перед открытием попап
      popupAddCard.open() //открываем попап
    });
    popupAddCard.setEventListeners() //повесил слушатели на попап
  })
  .catch((err) => console.log(err));
