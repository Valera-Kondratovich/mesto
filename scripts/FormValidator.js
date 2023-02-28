class FormValidator {
  constructor(form) {
    this._form = form;
    this._inputSelector = '.popup__input';
    this._submitButtonSelector = '.popup__button-save';
    this._inputErrorClass = 'popup__input_type_error';
    this._errorClass = 'popup__error_visible';
    this.enableValidation();
  }

  enableValidation = () => {
    this._form.addEventListener('input', () => {
      this._toggleButtonState();
    })
    this._toggleButtonState();
    this._form.addEventListener('reset', () => { //отключаем кнопку если форма невалидна при следующем открыти попапа
      setTimeout(() => {
        this._toggleButtonState();
      }, 0);
    });
    this._setInputListeners();

  }
  _setInputListeners = () => {
    const _inputLists = Array.from(this._form.querySelectorAll(this._inputSelector));
    _inputLists.forEach((inputElement) => {
      inputElement.addEventListener('input', (event) => {
        this._isValid(event);
      });
    });
  }

  _isValid = (event) => {
    const input = event.target;
    if (!input.validity.valid) {
      this._showInputError(input, input.validationMessage);
    }
    else {
      this._hideInputError(input);
    }
  }

  _showInputError = (input) => {
    const error = this._form.querySelector(`#${input.id}-error`);
    input.classList.add(this._inputErrorClass);
    error.textContent = input.validationMessage;
    error.classList.add(this._errorClass);
  }

  _hideInputError = (input) => {
    const error = this._form.querySelector(`#${input.id}-error`)
    input.classList.remove(this._inputErrorClass);
    error.classList.remove(this._errorClass);
    error.textContent = '';
  };


  _toggleButtonState = () => {
    const _buttonSubmit = this._form.querySelector(this._submitButtonSelector);
    const _isFormValid = this._form.checkValidity();
    _buttonSubmit.disabled = !_isFormValid;
  }
}

export default FormValidator;
