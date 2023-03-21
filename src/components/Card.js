class Card {
  constructor(cardData, template, currentUserId, handleActions){
    this._card = cardData;
    this._cardId = cardData._id;
    this._image  = this._card.link;
    this._title = this._card.name;
    this._likes = this._card.likes;
    this._template = template;
    //isOwner возвращает true, если owner._id карточки совпарадет с currentUserId
    this._isOwner = cardData.owner._id === currentUserId;
    this._handleCardClick = handleActions.handleCardClick;
    this._handleCardDelete = handleActions.handleCardDelete;
    this._handleLikeClick = handleActions.handleCardLike;
    }

  //Получаем разметку из template.Приватный метод, взываем внутри класса, чтобы получить готовую разметку перед размещением на страницу.
  //возвращаем DOM элемент карточки 
  _getElementFromTemplate(){
    const cardElement =  document
      .querySelector(this._template)
      .content
      .querySelector('.elements__element')
      .cloneNode(true);
      return cardElement;
  }

//вызов generateCard до setEventLiteners чтобы у слушателей
// был доступ к переменным
  generateCard(){
    this._element = this._getElementFromTemplate();
    this._likeButton = this._element.querySelector('.elements__icon');
    this._cardImage = this._element.querySelector('.elements__image');
    this._deleteCardButton = this._element.querySelector('.elements__btn-delete');
    this._setEventListeners();//доб.обработчики

    this._cardImage.src = this._image;
    this._cardImage.alt = this._title;
    this._element.querySelector('.elements__title').textContent = this._title;
    this.renderLikeCounter(this._card);

    return this._element;
  }

  //публичный метод удаления, вызвать из экз попапа
  deleteCard(){
    this._element.remove();
    this._element = null;
  }


  renderLikeCounter(){
    this._counterSelector = this._element.querySelector('.elements__counter');
    if(this._likes.length === 0){
      this._counterSelector.textContent = '';
    } else {
      this._counterSelector.textContent = this._likes.length; 
    }
    
  }

  //обработчики
  _setEventListeners(){
    if(this._isOwner) {
      this._deleteCardButton.addEventListener('click', () => {
        this._handleCardDelete(this, this._cardId);
      })
    } else {
      this._element.querySelector('.elements__btn-delete').remove();
    }

    //слушатель кнопки лайка
    this._likeButton.addEventListener('click', () => {
      this._toggleLike();
    });

    //слушатель превью
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._title, this._image);
    })
  }

  _toggleLike(){
    this._likeButton.classList.toggle('elements__icon_active');
  }


}

export default Card;
