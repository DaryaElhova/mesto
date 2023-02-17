//Принимаем объект настроек config и элемент формы formElement, 
//сохраняем их в свойствах экземпляра класса.
class FormValidator{
  constructor(config, formElement){
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;

    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
    // this._disabledButton();
  }

//Приватные методы
_showInputError(inputElement, errorMessage){
  const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.classList.add(this._errorClass);
  inputElement.classList.add(this._inputErrorClass);
  errorElement.textContent = errorMessage;
}

_hideInputError(inputElement){
  const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.classList.remove(this._errorClass);
  inputElement.classList.remove(this._inputErrorClass);
  errorElement.textContent = '';

  if (errorElement){
    errorElement.textContent = '';
    errorElement.classList.remove(this._errorClass);
  }
}

_isValid(inputElement){
  if(!inputElement.validity.valid){
    this._showInputError(inputElement, inputElement.validationMessage);
  } else{
    this._hideInputError(inputElement);
  }
}

_hasInvalidInput(){
  return this._inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

_toggleButtonState(){
  if(this._hasInvalidInput(this._inputList)) {
    this.disabledButton();
  } else {
    this.activeButton();
  }
};

_setEventListeners(){
  this._toggleButtonState();
  //проходимся по каждому элементу массива, на каждый инпут формы вешаем 
  //обработчик на сабмит с ф-й проверки валидности
  this._inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      this._isValid(inputElement);
      this._toggleButtonState();
    });
  });
}

disabledButton() {
  this._buttonElement.classList.add(this._inactiveButtonClass);
  this._buttonElement.setAttribute('disabled', true)
}

//делает кнопку активной при открытии попапа с валидными данными
activeButton(){
  this._buttonElement.classList.remove(this._inactiveButtonClass);
  this._buttonElement.removeAttribute('disabled', true)
}

//метод не дает добавить пустую карточку
resetValidation() {
  this._inputList.forEach((inputElement) => {
    this._hideInputError(inputElement);
  });
  this._toggleButtonState();
}

enableValidation(){
  this._setEventListeners()
}
};


export default FormValidator;

