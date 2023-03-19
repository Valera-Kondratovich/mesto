import Popup from './Popup.js';
export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this._popupDescription = this._popupElement.querySelector('.popup__description');
    this._popupPicture = this._popupElement.querySelector('.popup__picture');
  }

  open(selectorImage) {
    super.open();
    this._popupDescription.textContent = selectorImage.alt;
    this._popupPicture.alt = selectorImage.alt;
    this._popupPicture.src = selectorImage.src;
  }
}
