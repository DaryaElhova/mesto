import { popupImage, popupBigImage, popupImageTitle } from "./index.js";

class Card {
  constructor(template, image, title){
    this._template = template;
    this._image = image;
    this._title = title;
  }

  //Получаем разметку из template.Приватный метод, взываем внутри класса, чтобы получить готовую разметку перед размещением на страницу.
  //возвращаем DOM элемент карточки 
  _getElementFromTemplate(){
    const cardElement =  document
      .querySelector('.elements-template')
      .content
      .querySelector('.elements__element');

      return cardElement;
  }

  //обработчики
  _setEventListeners(){
    this._element.querySelector('.elements__btn-delete').addEventListener('click', () => {
      this._deleteCard();
    });
    this._element.querySelector('.elements__icon').addEventListener('click', () => {
      this._likeCard();
    });
    this._element.addEventListener('click', () => {
      this._handleOpenPopup();
    });
    popupImage.querySelector('.popup__close').addEventListener('click', () => {
      this._handleClosePopup();
    })
  }

  _deleteCard(){
    this._element.remove();
  }

  _likeCard(){
    const likeBtn = this._element.querySelector('.elements__icon');
    likeBtn.classList.toggle('elements__icon_active');
  }

  _handleOpenPopup(){
    popupImage.classList.add('popup_opened');
    popupBigImage.src = this._image;
    popupBigImage.alt = this._title;
    popupImageTitle.textContent = this._title;
  }

  _handleClosePopup(){
    popupImage.classList.remove('popup_opened')

  }

  //публичный метод
  generateCard(){
    this._element = this._getElementFromTemplate();
    this._setEventListeners();//доб.обработчики

    this._element.querySelector('.elements__image').src = this._image;
    this._element.querySelector('.elements__image').alt = this._title;
    this._element.querySelector('.elements__title').textContent = this._title;

    return this._element;
  }
}

export default Card;
