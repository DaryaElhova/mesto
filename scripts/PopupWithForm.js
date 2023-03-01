import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector);
    this._submitForm = submitForm;
    this._form = document.querySelector('.popup__form')
  }

  //собирает данные всех полей формы. Результат выполнения-объект со значениями всех полей формы, 
  //в котором ключами являются имена полей, а значениями - их значения
  _getInputValues(){
    const inputs = Array.from(this._form.querySelectorAll('.popup__field'));
    const values = {};//создаем пустой объект, куда запишем данные полей

    //проходимся по массиву всех полей формы. Через input.name получем св-во name формы input.value значение поля
    //создаем свойство в объекте values с именем, соответствующим имени поля, и значением, соответствующим значению поля.
    inputs.forEach(input => values[input.name] = input.value);
    return values;
  }


  setEventListeners(){
    super.setEventListeners();
    //добавить обработчик сабмита формы
  }

  close(){
    super.close();
    //добавить сброс формы при закрытии
  }
}