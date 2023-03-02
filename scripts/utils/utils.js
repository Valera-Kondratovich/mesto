import { config } from './constants.js';
function openPopup(item) {
  item.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEsc);
  item.addEventListener('mousedown', closeByClick);
}

function closePopup(item) {
  item.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEsc);
  item.removeEventListener('mousedown', closeByClick);
  const inputLists = Array.from(document.querySelectorAll(config.inputSelector));
  inputLists.forEach((inputElement) => {
    inputElement.classList.remove(config.inputErrorClass);
    inputElement.value = '';
    const error = document.querySelector(`#${inputElement.id}-error`);
    error.classList.remove(config.errorClass);
    error.textContent = '';
  });
}


function closeByEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  };
}

function closeByClick(evt) {
  if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__button-close')) {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  };
}


export { openPopup, closePopup };
