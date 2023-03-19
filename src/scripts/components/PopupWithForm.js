import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(selector, { submitForm }) {
    super(selector);
    this._submitForm = submitForm; //это функция
    this._form = this._popupElement.querySelector('.popup__form'); //форма в попапе нашел
    this._inputList = this._popupElement.querySelectorAll('.popup__input');
  }

  close() {
    super.close();
    this._form.reset()
  }

  _getInputValues() {
    // создаём пустой объект
    this._formValues = {};
    // добавляем в этот объект значения всех полей
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    // возвращаем объект значений
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault()
      this._submitForm(this._getInputValues());
      this.close()
    })
  }
}
