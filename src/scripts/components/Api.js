export default class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  _request(url, options) {
    return fetch(url, options).then(this._checkResponse)
  }

  _getAllCardsData() {
    return this._request(`${this._url}/cards`, {
      method: 'GET',
      headers: this._headers
    })
  }

  _getUserData() {
    return this._request(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers
    })
  }

  getAllNeedData() {
    return Promise.all([this._getUserData(), this._getAllCardsData()])
  }

  patchUserData(data) {
    return this._request(`${this._url}/users/me`, {
      method: 'PATCH',
      body: JSON.stringify(data),
      headers: this._headers,
    })
  }

  postCardData(data) {
    return this._request(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data)
    })
  }

  putLike(idImage) {
    return this._request(`${this._url}/cards/${idImage}/likes`, {
      method: 'PUT',
      headers: this._headers,
    })
  }

  delLike(idImage) {
    return this._request(`${this._url}/cards/${idImage}/likes`, {
      method: 'DELETE',
      headers: this._headers,
    })
  }

  delCard(idImage) {
    return this._request(`${this._url}/cards/${idImage}`, {
      method: 'DELETE',
      headers: this._headers,
    })
  }

  patchUserAvatar(urlAvatar) {
    return this._request(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(urlAvatar)
    })
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json()
    }
    else {
      return Promise.reject(`Произошла ошибка: ${res.status}`)
    }
  }
}


