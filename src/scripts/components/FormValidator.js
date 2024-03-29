class FormValidator {
  constructor(form, config) {
    this._form = form;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._inputLists = Array.from(this._form.querySelectorAll(this._inputSelector));
    this._buttonSubmit = this._form.querySelector(this._submitButtonSelector);
  }

  enableValidation = () => {
    this._toggleButtonState();
    this._setInputListeners();
    this._form.addEventListener('input', () => {
      this._toggleButtonState();
    })
    this._form.addEventListener('reset', () => { //отключаем кнопку если форма невалидна при следующем открыти попапа
      setTimeout(() => {
        this._toggleButtonState();
      }, 0);
    });
  }

  _setInputListeners = () => {
    this._inputLists.forEach((inputElement) => {
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
    const _isFormValid = this._form.checkValidity();
    this._buttonSubmit.disabled = !_isFormValid;
  }

  removeValidationErrors = () => {
    this._inputLists.forEach((inputElement) => {
      this._hideInputError(inputElement)
      inputElement.value = '';
    });
  }
}

export default FormValidator;
