class Card {
  constructor(cardData, template, currentUserId, handleActions){
    this._card = cardData;
    this._cardId = cardData._id;
    this._image  = this._card.link;
    this._title = this._card.name;
    this._likes = this._card.likes;
    this._template = template;
    this._currentUserId = currentUserId;
    //isOwner возвращает true, если owner._id карточки совпарадет с currentUserId
    this._isOwner = cardData.owner._id === currentUserId;
    this._handleCardClick = handleActions.handleCardClick;
    this._handleCardDelete = handleActions.handleCardDelete;
    this._handlePutLike = handleActions.handlePutLike;
    this._handleDeleteLike = handleActions.handleDeleteLike;
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
    this._counterSelector = this._element.querySelector('.elements__counter');
    this._setEventListeners();//доб.обработчики

    this._cardImage.src = this._image;
    this._cardImage.alt = this._title;
    this._element.querySelector('.elements__title').textContent = this._title;

    //this._isLiked();
    this.renderLikeCounter(this._card);
    // this._updateLikes();

    return this._element;
  }

  //публичный метод удаления, вызвать из экз попапа
  deleteCard(){
    this._element.remove();
    this._element = null;
  }

  //счетчик лайков. Выводит длину массима лайков в текстовый элемента
  renderLikeCounter(newCard){
    //необходимо переопределить массив лайков
    this._likes = newCard.likes;
    if(this._likes.length === 0){
      this._counterSelector.textContent = '';
    } else {
      this._counterSelector.textContent = this._likes.length; 
    }

    if(this._isLiked()) 
      {
       this._likeButton.classList.add('elements__icon_active');
    } else {
      this._likeButton.classList.remove('elements__icon_active');
    }
  }


  _isLiked() {
    return this._likes.some((like) => {
      //возвращаем значение
      return this._currentUserId === like._id;
    })
  }



  //если на карточке есть лайк пользователя- вызывает _handleDeleteLike. Если нет _handlePutLike
  _updateLikes(){
    if(this._isLiked()) {
      this._handleDeleteLike(this._cardId);
  } else {
      this._handlePutLike(this._cardId);
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
      this._updateLikes(this._card);
      // this._toggleLike();
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
