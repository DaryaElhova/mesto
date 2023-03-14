export default class Api{
  constructor(basePath, token){
      this._basePath = basePath;
      this._token = token;
  }

//Метод,который позволяет не дублировать заголовки
_getHeaders(){
  return {
    "Content-Type" : "application/json",
    autorisation : this._token
  }
}

//Метод,который позволит не дублировать код на проверку запроса
_getJson(){
  if (res.ok) {
    return res.json;
  }
  return Promise.reject(`Ошибка${res.status}`);
}

//Метод загрузки информации о пользователе с сервера
getUserInfo(){
  return fetch(`${this._basePath}/users/me`, {
    headers: this._getHeaders,
  }).then(this._getJson)
}

//Метод загрузки карточек с сервера
getCardsApi(){
  return fetch(`${this._basePath}/cards`, {
    headers: this._getHeaders
  }).then(this._getJson)
}

//Метод редактирования данных профиля
editProfileInfo(data){
  return fetch(`${this._basePath}/users/me`, {
    method: "PATCH",
    headers: this._headers,
    body: JSON.stringify(data)
  }).then(this._getJson)
}

}
