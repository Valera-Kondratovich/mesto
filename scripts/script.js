// popup-edit

const buttonFormEdit = document.querySelector('.profile__button-edit');
const formProfile = document.querySelector('.popup-edit');
const buttonFormClose = document.querySelector('.popup-edit__button-close');
const buttonFormSave = document.querySelector('.popup-edit__button-save');
const porfileName = document.querySelector('.profile__name');
const profileDescr = document.querySelector('.profile__description');
const popupUserName = document.querySelector('.popup-edit__user_input_name');
const popupUserDescr = document.querySelector('.popup-edit__user_input_description');
const formUser = document.querySelector('.popup-edit__profile');

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

// popup-add
const buttonGalleryAdd = document.querySelector('.profile__button-add');
const popupGallery = document.querySelector('.popup-add');
const buttonGalleryClose = document.querySelector('.popup-add__button-close');
const buttonGallerySave = document.querySelector('.popup-add__button-save');
const inputHeaderGallery = document.querySelector('.popup-add__name_input_header');
const inputLinkGallery = document.querySelector('.popup-add__url_input_link');
const formGallery = document.querySelector('.popup-add__gallery');

function formGalleryDisplay() {
  popupGallery.classList.add('popup-add_visible');
}

function formGalleryClose() {
  popupGallery.classList.remove('popup-add_visible');
}

function formGallerySave(evt) {
  evt.preventDefault();
  const galleryElement = galleryTemplate.querySelector('.elements__element').cloneNode(true);
  galleryElement.querySelector('.elements__title').textContent = inputHeaderGallery.value;
  galleryElement.querySelector('.elements__img').src = inputLinkGallery.value;
  const buttonLike = galleryElement.querySelector('.elements__button-like');
  const buttonDel = galleryElement.querySelector('.elements__button-trash');
  buttonLike.addEventListener('click', function (event) {
    const eventTarget = event.target;
    eventTarget.classList.toggle('elements__button-like_active');
  });

  buttonDel.addEventListener('click', function (event) {
    const eventTarget = event.target;
    eventTarget.closest('.elements__element').remove()
  });

  sectionElements.prepend(galleryElement);
  popupGallery.classList.remove('popup-add_visible');
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
const sectionFooter = document.querySelector('.footer');

//создание карточки из шаблона + навешиваю слушатели на кнопки
const createCard = (name, link) => {
  const galleryElement = galleryTemplate.querySelector('.elements__element').cloneNode(true);
  const buttonLike = galleryElement.querySelector('.elements__button-like');
  const buttonDel = galleryElement.querySelector('.elements__button-trash');
  galleryElement.querySelector('.elements__title').textContent = name;
  galleryElement.querySelector('.elements__img').src = link;


  buttonLike.addEventListener('click', () => {
    buttonLike.classList.toggle('elements__button-like_active');
  });

  buttonDel.addEventListener('click', () => {
    galleryElement.remove();
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



// initialCards.forEach(function (item) {
//   const galleryElement = galleryTemplate.querySelector('.elements__element').cloneNode(true);
//   const buttonLike = galleryElement.querySelector('.elements__button-like');
//   const buttonDel = galleryElement.querySelector('.elements__button-trash');
//   const buttonImage = galleryElement.querySelector('.elements__img');


//   galleryElement.querySelector('.elements__title').textContent = item.name;
//   galleryElement.querySelector('.elements__img').src = item.link;

//   buttonImage.addEventListener('click', function (event) {
//     const templateImage = document.querySelector('.template-image').content;
//     const eventTarget = event.target;
//     const srcImage = eventTarget.getAttribute('src');
//     const popupImage = templateImage.querySelector('.popup-image').cloneNode(true);
//     const inputImage = popupImage.querySelector('.popup-image__img');
//     inputImage.setAttribute('src', srcImage);

//     sectionFooter.after(popupImage);


//   })

//   buttonLike.addEventListener('click', function (event) {
//     const eventTarget = event.target;
//     eventTarget.classList.toggle('elements__button-like_active');
//   });

//   buttonDel.addEventListener('click', function (event) {
//     const eventTarget = event.target;
//     eventTarget.closest('.elements__element').remove()
//   });

//   sectionElements.append(galleryElement);
// });

// //popup image

