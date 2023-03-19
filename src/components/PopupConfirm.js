export default class PopupConfirm extends Popup{
  constructor(popupSelector, {handleConfirmation}){
    super(popupSelector);
    //ищем кнопку сабмита в конкретном попапе,селектор наследуется из род.класса
    this._confirmButton = this._popup.querySelector('.popup__btn');
    this._handleConfirmation = handleConfirmation;
  }

  //cardData - объект карточки, cardId - ее ID. + наследуем родительский опен
  open(cardData, cardId){
    this._cardData = cardData;
    this._cardId = cardId;
    super.open()
  }

  setEventListeners(){
    super.setEventListeners();
    //переопределяем листенеры.Только вызов функции при сабмите
    this._confirmButton.addEventListeners((evt) => {
      evt.preventDefault();
      this._handleConfirmation(this._cardData, this._cardId)
    })
  }

}