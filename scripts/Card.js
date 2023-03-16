import PopupWithImage from './PopupWithImage.js';
import { config } from './utils/constants.js';

class Card {
  constructor(nameCard, urlCard, template, { handleCardClick }) {
    this._nameCard = nameCard;
    this._urlCard = urlCard;
    this._template = document.querySelector(template).content;
    this._handleCardClick = handleCardClick;
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

    this._selectorImage = this._view.querySelector('.elements__img');
    this._selectorImage.addEventListener('click', () => {
      this._handleCardClick(this._selectorImage)
    })
  }

  _getCardTemplate = () => {
    this._view = this._template.cloneNode(true).children[0];
  }

  renderCard = () => { //возвращает заполненный шаблон но не вставляет в разметку
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
