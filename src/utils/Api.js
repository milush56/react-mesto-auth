class Api {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  getProfile() {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "GET",
      headers: this.headers,
    }).then((res) => this._getResponseData(res));
  }

  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      headers: this.headers,
    }).then((res) => this._getResponseData(res));
  }

  editProfile(name, about) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then((res) => this._getResponseData(res));
  }

  addCardMesto(name, link) {
    return fetch(`${this.baseUrl}/cards`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then((res) => this._getResponseData(res));
  }

  deleteCardMesto(id) {
    return fetch(`${this.baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: this.headers,
    }).then((res) => this._getResponseData(res));
  }

  deleteLike(id) {
    return fetch(`${this.baseUrl}/cards/${id}/likes`, {
      method: "DELETE",
      headers: this.headers,
    }).then((res) => this._getResponseData(res));
  }

  addLike(id) {
    return fetch(`${this.baseUrl}/cards/${id}/likes`, {
      method: "PUT",
      headers: this.headers,
    }).then((res) => this._getResponseData(res));
  }

  editAvatar(avatar) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        avatar: avatar,
      }),
    }).then((res) => this._getResponseData(res));
  }
}

export const api = new Api({
  baseUrl: "http://api.testo-mesto.nomoredomains.xyz",
  headers: {
    authorization: `Bearer ${localStorage.getItem("jwt")}`,
    "Content-Type": "application/json",
  },
});
