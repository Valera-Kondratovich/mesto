import _initialCards from './script_arr_cards.js';
import openPopup from './script.js';

class Card {
  constructor(nameCard, urlCard) {
    this._nameCard = nameCard;
    this._urlCard = urlCard;
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
      const _popupImage = document.querySelector('.popup_image');

      const _popupDescription = _popupImage.querySelector('.popup__description');
      const _popupPicture = _popupImage.querySelector('.popup__picture');
      _popupDescription.textContent = this._clickToImage.alt;
      _popupPicture.alt = this._clickToImage.alt;
      _popupPicture.src = this._clickToImage.src;
      openPopup(_popupImage);
    })
  }

  renderCard = (container, template) => {
    this._view = template.cloneNode(true).children[0];
    this._image = this._view.querySelector('.elements__img');
    this._titleImage = this._view.querySelector('.elements__title');
    this._image.alt = this._nameCard;
    this._titleImage.textContent = this._nameCard;
    this._image.src = this._urlCard;
    this._addEventListeners();
    return container.prepend(this._view);
  }
}

export default Card;
