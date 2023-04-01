import Popup from './Popup.js';

export default class PopupWithTrash extends Popup {
  constructor(selector, { submitForm }) {
    super(selector);
    this._submitForm = submitForm; //это функция
    this._form = this._popupElement.querySelector('.popup__form'); //форма в попапе нашел

  }
  open(idImage, templaitCard) {
    super.open();
    this._idImage = idImage;
    this._templaitCard = templaitCard;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault()
      this._submitForm(this._idImage, this._templaitCard);
      this.close()
    })
  }
}
