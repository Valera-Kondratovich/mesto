export default class Section {
  constructor({ renderer }, selector) {
    this._renderer = renderer; //функция
    this._selector = document.querySelector(selector); //куда вставляем
  }
  renderItems(items) {
    this._renderer(items);

  }

  addItem(element) {
    this._selector.prepend(element);
  }

}
