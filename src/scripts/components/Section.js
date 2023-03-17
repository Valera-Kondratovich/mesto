export default class Section {
  constructor({ renderer }, selector) {
    this._renderer = renderer; //функция
    this._selector = document.querySelector(selector); //куда вставляем
  }
  renderItems(items) {
    items.forEach(item => {
      this._renderer(item);
    });
  }

  addItem(element) {
    this._selector.prepend(element);
  }

}
