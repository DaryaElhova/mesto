class Card {
  constructor(title, image, template, handleCardClick ){
    this._template = template;
    this._image = image;
    this._title = title;
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

  // _handleOpenPopup(){
  //   this._openPopup();
  //   popupBigImage.src = this._image;
  //   popupBigImage.alt = this._title;
  //   popupImageTitle.textContent = this._title;
  // }

}

export default Card;
