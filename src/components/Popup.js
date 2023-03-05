export default class Popup {
  constructor (popupSelector){
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  //метод для открытия попапа
  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keyup', this._handleEscClose);
  }

  //метод для закрытия попапа
  close(){
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keyup', this._handleEscClose)
  }

  //закрытие попапа по Esc
  _handleEscClose(evt){
    if(evt.key === 'Escape') {
      this.close();
    }
  }

  //слушатель клика иконке закрытия попапа + 
  //закрывается при клике на затемнённую область вокруг формы.
  setEventListeners(){
    const closeButtons = document.querySelectorAll('.popup__close');
    closeButtons.forEach((button) => {
      button.addEventListener('click', this.close.bind(this));
    })

    this._popup.addEventListener('click', (evt) => {
      if(evt.target === evt.currentTarget) {
        this.close()
      }
    })
  }
}