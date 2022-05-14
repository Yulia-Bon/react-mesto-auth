export class Api {
  constructor(options) {
    this._headers = options.headers;
    this._baseUrl = options.baseUrl;
    this._handleReturnPromise = ((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Произошла ошибка: ${res.status} :(`);
    });
  }

  // Cards
  getInitialCards() {
    return fetch(`${ this._baseUrl }/cards`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`, 'Content-Type': 'application/json',
      },
    }).then((res) => this._handleReturnPromise(res));
  }

  setNewCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`, 'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data.name, link: data.link,
      }),
    }).then((res) => this._handleReturnPromise(res));
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`, 'Content-Type': 'application/json',
      },
    }).then((res) => this._handleReturnPromise(res));
  }

  // likes
  setLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`, 'Content-Type': 'application/json',
      },
    }).then((res) => this._handleReturnPromise(res));
  }

  deleteLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`, 'Content-Type': 'application/json',
      },
    }).then((res) => this._handleReturnPromise(res));
  }

  // Profile
  getProfileInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`, 'Content-Type': 'application/json',
      },
    }).then((res) => this._handleReturnPromise(res));
  }

  setProfileInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`, 'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data.name, about: data.about,
      }),
    }).then((res) => this._handleReturnPromise(res));
  }

  // Avatar
  changeAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`, 'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then((res) => this._handleReturnPromise(res));
  }
}

const api = new Api({
  baseUrl: 'https://mesto-express.ybon.nomoredomains.work',
});

export default api;
