import Popup from "./Popup.js";

export default class PopupConfirm extends Popup{
  constructor(popupSelector, {handleConfirmation}){
    super(popupSelector);
    this._handleConfirmation = handleConfirmation;
    this._form = this._popup.querySelector('.popup__form');
    }

  //cardData - объект карточки, cardId - ее ID. + наследуем родительский опен
  open(cardData, cardId){
    this._cardData = cardData;
    this._cardId = cardId;
    console.log(this._cardData);
    super.open()
  }


  setEventListeners(){
    super.setEventListeners();
    //переопределяем листенеры.Только вызов функции при сабмите
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleConfirmation(this._cardData, this._cardId)
   })
  }

}