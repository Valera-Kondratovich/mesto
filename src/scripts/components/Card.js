export default class Card {
  constructor(data, template, userId, { handleCardClick, handleLikeClick, handleDeleteIconClick }) {
    this._nameCard = data.name;
    this._urlCard = data.link;
    this._likesArr = data.likes;  // массив лайков
    this._idOwner = data.owner._id; //id владельца
    this._idImage = data._id;      // id карточки
    this._dataIdUser = userId;    //мой id
    this._handleLikeClick = handleLikeClick; //функция клика по лайку
    this._handleCardClick = handleCardClick; //функция клика по картинке
    this._handleDeleteIconClick = handleDeleteIconClick //функция клика по корзине
    this._template = document.querySelector(template).content;
    this._view = this._template.cloneNode(true).children[0];
    this._buttonLike = this._view.querySelector('.elements__button-like'); //селектор лайка
    this._buttonTrash = this._view.querySelector('.elements__button-trash'); //селектор кнопки корзины
  }

  _addEventListeners = () => {
    this._buttonLike.addEventListener('click', () => {
      this._handleLikeClick(this._idImage, this._likesArr)
    });

    this._buttonTrash.addEventListener('click', () => {
      this._handleDeleteIconClick(this._idImage, this._view)
    });

    this._selectorImage = this._view.querySelector('.elements__img');
    this._selectorImage.addEventListener('click', () => {
      this._handleCardClick(this._selectorImage)
    });
  }

  setLikesCount = (dataLikes, dataIdUser) => {
    this._likesArr = dataLikes; // обновляю массив лайков для следующего раза
    this._likes = this._view.querySelector('.elements__count');
    if (this._likesArr.length > 0) {    //если длина массива лайков больше 0
      this._likes.textContent = this._likesArr.length;
      this.isCardLiked(this._likesArr, dataIdUser) //то вставить в разметку длину массива
    }
    else {
      this._likes.textContent = " "; //иначе добавить пробел в разметку массива
      this.isCardLiked(this._likesArr, dataIdUser)
    }
  }

  isCardLiked(likesArr) {
    if (likesArr.some(item => item._id == this._dataIdUser)) {
      this._buttonLike.classList.add('elements__button-like_active');
    }
    else {
      this._buttonLike.classList.remove('elements__button-like_active');
    }
  }

  _removeItem = () => {
    this._view.remove();
    this._removeEventListener();
  }

  _removeEventListener = () => {
    this._buttonTrash.removeEventListener('click', this._removeItem)
  }

  _ownerVerification = () => {
    if (this._idOwner !== this._dataIdUser) {
      this._removeItem();
      this._buttonTrash.remove();
    }
  }

  renderCard = () => { //возвращает заполненный шаблон но не вставляет в разметку
    this._image = this._view.querySelector('.elements__img');
    this._titleImage = this._view.querySelector('.elements__title');
    this._image.alt = this._nameCard;
    this._titleImage.textContent = this._nameCard;
    this._image.src = this._urlCard;
    this.isCardLiked(this._likesArr);
    this.setLikesCount(this._likesArr);
    this._ownerVerification();
    this._addEventListeners();
    return this._view;
  }
}

