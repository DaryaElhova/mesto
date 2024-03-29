export default class Api{
  constructor(basePath, token){
      this._basePath = basePath;
      this._token = token;
  }

//Метод,который позволяет не дублировать заголовки
_getHeaders(){
  return {
    "Content-Type" : "application/json",
    authorization: this._token
  }
}

//Метод,который позволит не дублировать код на проверку запроса
_getJson(res){
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка${res.status}`);
}

//Метод загрузки карточек с сервера
getCardsApi(){
  return fetch(`${this._basePath}/cards`, {
    headers: this._getHeaders()
  }).then(this._getJson)
}

//Метод загрузки информации о пользователе с сервера
getUserInfoApi(){
  return fetch(`${this._basePath}/users/me`, {
    headers: this._getHeaders(),
  }).then(this._getJson)
}

//Метод редактирования данных профиля
updateUserInfo(data){
  return fetch(`${this._basePath}/users/me`, {
    method: "PATCH",
    headers: this._getHeaders(),
    body: JSON.stringify({
      name: data.name,
      about: data.info
    })
  }).then(this._getJson)
}

//Метод добавления новых карточек
addNewCardApi(cardData){
  return fetch(`${this._basePath}/cards`, {
    method: "POST",
    headers: this._getHeaders(),
    body: JSON.stringify({
      name: cardData.region,
      link: cardData.link
    })
  }).then(this._getJson)
}

deleteCardApi(cardId){
  return fetch(`${this._basePath}/cards/${cardId} `, {
    method: "DELETE",
    headers: this._getHeaders(),
  }).then(this._getJson);
}

putLikeApi(cardId){
  return fetch(`${this._basePath}/cards/${cardId}/likes`, {
    method: "PUT",
    headers: this._getHeaders(),
  }).then(this._getJson);
}

deleteLikeApi(cardId){
  return fetch(`${this._basePath}/cards/${cardId}/likes`, {
    method: "DELETE",
    headers: this._getHeaders(),
  }).then(this._getJson);
}

changeAvatarAPI(avatarLink) {
  return fetch(`${this._basePath}/users/me/avatar`, {
    method: "PATCH",
    headers: this._getHeaders(),
    body: JSON.stringify({ avatar: avatarLink.avatar })
  }).then(this._getJson);
}

}
