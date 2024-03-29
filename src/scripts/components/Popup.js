export default class Popup {
  constructor(selector) {
    this._popupElement = document.querySelector(selector); //селектор попап картинки
    this._handleEscClose = this._handleEscClose.bind(this) //происходит потеря контекста так как функция handleEscClose передается как колбэк
  }

  open() {
    this._popupElement.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popupElement.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    };
  }

  setEventListeners() {
    this._popupElement.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__button-close'))
        this.close()
    })
  }

}
