class Card {
  constructor(cardData, template, handleCardClick ){
    this._card = cardData;
    this._image  = this._card.link;
    this._title = this._card.name;
    this._likes = this._card.likes;
    this._template = template;
    this._handleCardClick = handleCardClick;
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

  renderLikeCounter(){
    this._counterSelector = this._element.querySelector('.elements__counter');
    console.log(this._counterSelector);
    if(this._likes.length === 0){
      this._counterSelector.textContent = '';
    } else {
      this._counterSelector.textContent = this._likes.length; 
    }
  }


//вызов generateCard до setEventLiteners чтобы у слушателей
// был доступ к переменным
  generateCard(){
    this._element = this._getElementFromTemplate();
    this._likeButton = this._element.querySelector('.elements__icon');
    this._cardImage = this._element.querySelector('.elements__image');
    this._setEventListeners();//доб.обработчики

    this._cardImage.src = this._image;
    this._cardImage.alt = this._title;
    this._element.querySelector('.elements__title').textContent = this._title;
    this.renderLikeCounter();
    return this._element;
  }

  //обработчики
  _setEventListeners(){
    //слушатель кнопки удаления
    this._element.querySelector('.elements__btn-delete').addEventListener('click', () => {
      this._deleteCard();
    });

    //слушатель кнопки лайка
    this._likeButton.addEventListener('click', () => {
      this._toggleLike();
    });

    //слушатель превью
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._title, this._image);
    })
  }

  _deleteCard() {
    this._element.remove();
  }

  _toggleLike(){
    this._likeButton.classList.toggle('elements__icon_active');
  }


}

export default Card;
