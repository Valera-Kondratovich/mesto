import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(selector, selectorImage) {
    super(selector);
    this._template = selectorImage; //селектор картинки в карточке картинки
  }

  open() {
    super.open();
    this._popupDescription = this._selector.querySelector('.popup__description');
    this._popupDescription.textContent = this._template.alt;
    this._popupPicture = this._selector.querySelector('.popup__picture');
    this._popupPicture.alt = this._template.alt;
    this._popupPicture.src = this._template.src;
  }
}
