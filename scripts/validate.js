const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

enableValidation(config);

function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    setInputListeners(formElement, config);
    formElement.addEventListener('input', () => {
      toggleButtonState(formElement, config); //проверяем валидна ли форма с заполненными полями
    });
    toggleButtonState(formElement, config); //сразу отключаем кнопку, если форма невалидна
    formElement.addEventListener('reset', () => { //отключаем кнопку если форма невалидна при следующем открыти попапа
      setTimeout(() => {
        toggleButtonState(formElement, config);
      }, 0);
    });
  });
};

function toggleButtonState(form, config) {
  const buttonSubmit = form.querySelector(config.submitButtonSelector);
  const isFormValid = form.checkValidity();
  buttonSubmit.disabled = !isFormValid;
};

function setInputListeners(form, config) {
  const inputList = Array.from(form.querySelectorAll(config.inputSelector));
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', (event) => {
      isValid(form, event, config);
    });
  });
}

function isValid(form, event, config) {
  const input = event.target;
  if (!input.validity.valid) {
    showInputError(form, input, config, input.validationMessage)
  }
  else {
    hideInputError(form, input, config);
  }
}

function showInputError(form, element, config, errorMessage) {
  const error = form.querySelector(`#${element.id}-error`);
  element.classList.add(config.inputErrorClass);
  error.textContent = errorMessage;
  error.classList.add(config.errorClass);

}

function hideInputError(form, element, config) {
  const error = form.querySelector(`#${element.id}-error`)
  element.classList.remove(config.inputErrorClass);
  error.classList.remove(config.errorClass);
  error.textContent = '';
};




