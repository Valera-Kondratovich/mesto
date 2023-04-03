export default class Section {
  constructor({ renderer }, selector) {
    this._renderer = renderer; //функция
    this._container = document.querySelector(selector); //куда вставляем
  }
  renderItems(items) {
    items.forEach((item) => {
      this._renderer(item)
    });
  }

  addItem(element) {
    this._container.prepend(element);
  }

}
