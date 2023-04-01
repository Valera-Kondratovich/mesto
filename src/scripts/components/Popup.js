export default class Popup {
  constructor(selector) {
    this._popupElement = document.querySelector(selector); //селектор попап картинки
    this._selectorButton = this._popupElement.querySelector('.popup__button-save') //селектор кнопки сохранения
    this._handleEscClose = this._handleEscClose.bind(this)
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
  renderLoading(isLoading) {
    if (isLoading) { this._selectorButton.textContent = 'Сохранение...' }
    else { this._selectorButton.textContent = 'Сохранить' }
  }
}
