import { popupImage, popupBigImage, popupimageTitle } from "./index.js";

class Card {
  constructor(template, image, title){
    this._template = template;
    this._image = image;
    this._title = title;
  }

  //Получаем разметку из template.Gриватный метод, взываем внутри класса, чтобы получить готовую разметку перед размещением на страницу.
  //возвращаем DOM элемент карточки 
  _getElementFromTemplate(){
    return document
      .querySelector('.elements-template')
      .content.querySelector('.elements__element');
  }

  //обработчики
  _setEventListeners(){
    this._element.querySelector('.elements__btn-delete')._addEventListener('click', () => {
      this._deleteCard();
    });
    this._element.querySelector('.elements__icon')._addEventListener('click', () => {
      this._likeCard();
    });

  }

  _deleteCard(){
    this._element.remove();
  }

  _likeCard(){
    const likeBtn = this._element.querySelector('.elements__icon');
    likeBtn.classList.toggle('elements__icon_active');
  }

  //публичный метод
  generateCard(){
    this._element = this._getTemplate;
    this._setEventListeners();//доб.обработчики

    this._element.querySelector('.elements__image').src = this._image;
    this._element.querySelector('.elements__image').alt = this._title;
    this._element.querySelector('.elements__title').textContent = this._title;

    return this._element;
  }
}

export default Card;
