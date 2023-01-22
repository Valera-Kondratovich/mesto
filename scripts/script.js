// popup-edit

const buttonFormEdit = document.querySelector('.profile__button-edit'); //нашел кнопку редактирования профиля
const formProfile = document.querySelector('.popup-edit'); //нашел попап окно редактирования профиля
const buttonFormClose = document.querySelector('.popup-edit__button-close'); //нашел кнопку закрытия профиля
const buttonFormSave = document.querySelector('.popup-edit__button-save'); //нашел кнопку сохранения профиля
const porfileName = document.querySelector('.profile__name'); //сохранил имя профиля
const profileDescr = document.querySelector('.profile__description'); //сохранил описание профиля
const popupUserName = document.querySelector('.popup-edit__user_input_name'); //нашел поле ввода имени профиля в попап окне
const popupUserDescr = document.querySelector('.popup-edit__user_input_description'); //нашел поле ввода описания профиля в попап окне
const formUser = document.querySelector('.popup-edit__profile'); //нашел форму профиля

// функции кнопки редактирования профиля
function formEditDisplay() {
  formProfile.classList.add('popup-edit_visible');
  popupUserName.value = porfileName.textContent;
  popupUserDescr.value = profileDescr.textContent;
}

function formEditClose() {
  formProfile.classList.remove('popup-edit_visible');
}

function formEditSave(evt) {
  evt.preventDefault();
  porfileName.textContent = popupUserName.value;
  profileDescr.textContent = popupUserDescr.value;
  formProfile.classList.remove('popup-edit_visible');
}

formUser.addEventListener('submit', formEditSave);
buttonFormEdit.addEventListener('click', formEditDisplay);
buttonFormClose.addEventListener('click', formEditClose);

// ниже функции отработки на нажатие кнопки добавить картинки
const buttonGalleryAdd = document.querySelector('.profile__button-add'); // нашел кнопку добавления картинки
const popupGallery = document.querySelector('.popup-add'); //попап добавления картинки
const buttonGalleryClose = document.querySelector('.popup-add__button-close'); // кнопка закрытия попап окна
const buttonGallerySave = document.querySelector('.popup-add__button-save'); // кнопка сохранения попап окна
const inputHeaderGallery = document.querySelector('.popup-add__name_input_header'); //поле ввода описания в попап окне
const inputLinkGallery = document.querySelector('.popup-add__url_input_link'); //поле ссылки на картинку в попап окне
const formGallery = document.querySelector('.popup-add__gallery'); //нашел форму в попап окне

//отображаем попап
function formGalleryDisplay() {
  popupGallery.classList.add('popup-add_visible');
}
//закрываем попап
function formGalleryClose() {
  popupGallery.classList.remove('popup-add_visible');
}
//здесь добавляю новую карточку в HTML разметку, и вешаю слушатели на лайк, на удаление картинки и отображение картинки на весь экран
function formGallerySave(evt) {
  evt.preventDefault();
  const galleryElement = galleryTemplate.querySelector('.elements__element').cloneNode(true); //клонируем разметку с шаблона
  const buttonLike = galleryElement.querySelector('.elements__button-like'); //нашел в шаблоне кнопку лайк
  const buttonDel = galleryElement.querySelector('.elements__button-trash'); //нашел в шаблоне кнопку удалить
  const buttonImage = galleryElement.querySelector('.elements__img'); //нашел в шаблоне саму картинку
  galleryElement.querySelector('.elements__title').textContent = inputHeaderGallery.value; //копируем название картинки в поле название картинки
  galleryElement.querySelector('.elements__img').src = inputLinkGallery.value; //копируем ссылку на картинку в атрибут src тега img
  galleryElement.querySelector('.elements__img').alt = inputHeaderGallery.value; //копируем название картинки в атрибут alt тега img

  // здесь отрбатывается нажатие на лайк
  buttonLike.addEventListener('click', () => {
    buttonLike.classList.toggle('elements__button-like_active');
  });

  //здесь удаляется элемент из разметки при нажатии на кнопку
  buttonDel.addEventListener('click', () => {
    galleryElement.remove()
  });

  //здесь отрабатывается клик по картинке
  buttonImage.addEventListener('click', () => {
    const srcImage = buttonImage.getAttribute('src'); //копируем src картинки
    const titleImage = galleryElement.querySelector('.elements__title'); //копируем название картинки
    const popupImage = document.querySelector('.popup-image') //нашел попап окно картинки
    const inputImage = popupImage.querySelector('.popup-image__img'); //нашел тег картинки в попап окне
    const buttonCloseImage = popupImage.querySelector('.popup-image__button-close'); //нашел кнопку закрытия попап окна
    const depiction = popupImage.querySelector('.popup-image__title'); //нашел поле куда будет ставлятся название картинки
    depiction.textContent = titleImage.textContent; //копируем название картинки из карточки в попап окно

    //прописываем в попап окне в теге img атрибут src
    inputImage.setAttribute('src', srcImage);

    //здесь отрабатывает кнопка закрытия
    buttonCloseImage.addEventListener('click', () => {
      popupImage.classList.remove('popup-image_visible');
    });
    //здесь отображаем попап окно
    popupImage.classList.add('popup-image_visible');
  });

  sectionElements.prepend(galleryElement); //добавляю в начало карточку картинки
  popupGallery.classList.remove('popup-add_visible'); //скрываю попап окно добавления картинки
  inputHeaderGallery.value = ''; //очищаею поле описания картинки
  inputLinkGallery.value = ''; //очищаею поле ссылки на картинку
}

buttonGalleryAdd.addEventListener('click', formGalleryDisplay);
buttonGalleryClose.addEventListener('click', formGalleryClose);
formGallery.addEventListener('submit', formGallerySave);

//Стартовые карточки 6 шт

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const galleryTemplate = document.querySelector('.template').content; //беру разметку с шаблона
const sectionElements = document.querySelector('.elements'); //беру элемент внутрь которого буду вставлять разметку из шаблона


//создание карточки из шаблона + навешиваю слушатели на кнопки
const createCard = (name, link) => {
  const galleryElement = galleryTemplate.querySelector('.elements__element').cloneNode(true);
  const buttonLike = galleryElement.querySelector('.elements__button-like');
  const buttonDel = galleryElement.querySelector('.elements__button-trash');
  const buttonImage = galleryElement.querySelector('.elements__img');
  const titleImage = galleryElement.querySelector('.elements__title');
  galleryElement.querySelector('.elements__title').textContent = name;
  galleryElement.querySelector('.elements__img').alt = name;
  galleryElement.querySelector('.elements__img').src = link;
  buttonLike.addEventListener('click', () => {
    buttonLike.classList.toggle('elements__button-like_active');
  });
  buttonDel.addEventListener('click', () => {
    galleryElement.remove();
  });
  buttonImage.addEventListener('click', () => {
    const srcImage = buttonImage.getAttribute('src');
    const popupImage = document.querySelector('.popup-image')
    const inputImage = popupImage.querySelector('.popup-image__img');
    const buttonCloseImage = popupImage.querySelector('.popup-image__button-close');
    const depiction = popupImage.querySelector('.popup-image__title');
    depiction.textContent = titleImage.textContent;
    inputImage.setAttribute('src', srcImage);
    buttonCloseImage.addEventListener('click', () => {
      popupImage.classList.remove('popup-image_visible');
    });
    popupImage.classList.add('popup-image_visible');
  });
  renderCard(galleryElement);
}

const renderCard = (element) => {
  sectionElements.append(element);
};

initialCards.forEach(function (item) {
  const name = item.name;
  const link = item.link;
  createCard(name, link);
});

