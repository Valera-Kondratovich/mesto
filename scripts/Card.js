import { openPopup } from './utils/utils.js'

const popupImage = document.querySelector('.popup_image');
const popupDescription = popupImage.querySelector('.popup__description');
const popupPicture = popupImage.querySelector('.popup__picture');


class Card {
  constructor(nameCard, urlCard, template) {
    this._nameCard = nameCard;
    this._urlCard = urlCard;
    this._template = template;
  }

  _removeItem = () => {
    this._view.remove();
    this._removeEventListener();
  }
  _removeEventListener = () => {
    this._buttonTrash.removeEventListener('click', this._removeItem)
  }

  _addEventListeners = () => {
    this._buttonLike = this._view.querySelector('.elements__button-like');
    this._buttonLike.addEventListener('click', () => {
      this._buttonLike.classList.toggle('elements__button-like_active')
    });

    this._buttonTrash = this._view.querySelector('.elements__button-trash');
    this._buttonTrash.addEventListener('click', () => {
      this._removeItem();
    })

    this._clickToImage = this._view.querySelector('.elements__img');
    this._clickToImage.addEventListener('click', () => {

      popupDescription.textContent = this._clickToImage.alt;
      popupPicture.alt = this._clickToImage.alt;
      popupPicture.src = this._clickToImage.src;
      openPopup(popupImage);
    })
  }

  _getCardTemplate = () => {
    this._view = this._template.cloneNode(true).children[0];
  }

  renderCard = () => {
    this._getCardTemplate();
    this._image = this._view.querySelector('.elements__img');
    this._titleImage = this._view.querySelector('.elements__title');
    this._image.alt = this._nameCard;
    this._titleImage.textContent = this._nameCard;
    this._image.src = this._urlCard;
    this._addEventListeners();
    return this._view;
  }
}

export default Card;
