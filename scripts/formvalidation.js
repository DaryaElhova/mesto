const form = document.querySelector('.form');
const formInput = form.querySelector('.popup__field');
const formError = form.querySelector(`${formInput.id}-error`);

const config = {
  formSelector: '.form',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__btn',
  inactiveButtonClass: 'popup__btn_type_inactiv',
  inputErrorClass: 'popup__field_type_error',
  errorClass: 'popup__input-error'
}

//хэлперы. добавляет и убирает класс с ошибкой
//Чтобы знать, где искать элемент ошибкой, мы передаём функции параметр formElement и ищем элемент ошибки в нём.

const showInputError = (form, inputElement, errorMessage, config) => {
  //находим ошибку по id инпута внутри функции
  const errorElement = form.querySelector(`.${inputElement.id}-error`);//span с ошибкой
  errorElement.classList.add(config.errorClass);//передаем span стили при ошибке
  inputElement.classList.add(config.inputErrorClass);//передаем полю стили при ошибке
  errorElement.textContent = errorMessage;//добавляем в span сообщ об ошибке
  
};

const hideInputError = (form, inputElement) => {
  const errorElement = form.querySelector(`.${inputElement.id}-error`);
  errorElement.classList.remove(config.errorClass);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.textContent = '';
};

//функция обработчик
const isValid = (form, inputElement, config) => {
  if(!inputElement.validity.valid){
    showInputError(form, inputElement, inputElement.validationMessage, config);
  } else {
    hideInputError(form, inputElement, config);
  }
};


//проверяем наличие хотя бы отдного невалидного инпута. Если есть -> true
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};


//функция изменения состояния кнопки. Классом меняем стиль, атрибутом делаем активную/неактивную.
const toggleButtonState = (inputList, buttonElement, config) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.setAttribute('disabled', '');
    buttonElement.classList.add(config.inactiveButtonClass);
  } else {
    buttonElement.removeAttribute('disabled', '');
    buttonElement.classList.remove(config.inactiveButtonClass);
  }
};


const setEventListeners = (form, config) => {
  //создаем массив из всех полей формы
  const inputList = Array.from(form.querySelectorAll(config.inputSelector));
  const buttonElement = form.querySelector(config.submitButtonSelector);
  toggleButtonState(inputList, buttonElement,config);

  //проходимся по каждому элементу массива, на каждый инпут формы вешаем обработчик на сабмит с ф-й проверки валидности
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(form, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    });

  });
};

//найти все формы в DOM и вызвать для них функцию setEventListeners
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((form) => {
    setEventListeners(form, config);
  });
};

enableValidation(config);