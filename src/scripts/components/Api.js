export default class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  _getAllCardsData() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: this._headers
    }).then((res) => {
      if (res.ok) {
        return res.json()
      }
      else {
        return Promise.reject(`Произошла ошибка: ${res.status}`);
      }

    })
  }

  _getUserData() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      else {
        return Promise.reject(`Произошла ошибка: ${res.status}`)
      }
    })
  }

  getAllNeedData() {
    return Promise.all([this._getUserData(), this._getAllCardsData()])
  }

  patchUserData(data) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      body: JSON.stringify(data),
      headers: this._headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        else {
          return Promise.reject(`Произошла ошибка: ${res.status}`)
        }
      })
  }

  postCardData(data) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data)
    })
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
        else {
          return Promise.reject(`Произошла ошибка: ${res.status}`)
        }
      })
  }

  putLike(idImage) {
    return fetch(`${this._url}/cards/${idImage}/likes`, {
      method: 'PUT',
      headers: this._headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
        else {
          return Promise.reject(`Произошла ошибка: ${res.status}`)
        }
      })
  }

  delLike(idImage) {
    return fetch(`${this._url}/cards/${idImage}/likes`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
        else {
          return Promise.reject(`Произошла ошибка: ${res.status}`)
        }
      })
  }

  delCard(idImage) {
    return fetch(`${this._url}/cards/${idImage}`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
        else {
          return Promise.reject(`Произошла ошибка: ${res.status}`)
        }
      })
  }

  patchUserAvatar(urlAvatar) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(urlAvatar),
    })
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
        else {
          return Promise.reject(`Произошла ошибка: ${res.status}`)
        }
      })
  }
}


