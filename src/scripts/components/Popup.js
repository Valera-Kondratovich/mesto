
export default class Popup {
  constructor(selector) {
    this._selector = document.querySelector(selector); //селектор попап картинки

  }
  open() {
    this._selector.classList.add('popup_opened');
    document.addEventListener('keydown', (evt) => {
      this._handleEscClose(evt)
    });
  }

  _close() {
    this._selector.classList.remove('popup_opened');
    document.removeEventListener('keydown', () => {
      this._handleEscClose(evt);
    });
    this._selector.removeEventListener('mousedown', () => {
      this.setEventListeners();
    });
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this._close();
    };
  }

  setEventListeners() {
    this._selector.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__button-close'))
        this._close()
    })
  }
}
