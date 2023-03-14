import {
  buttonOpenEditProfilePopup,
  profileForm,
  nameInput,
  jobInput,
  addCardButton,
  newCardForm,
  config
} from '../utils/constants.js'

import initialCards from '../utils/initialcards.js'
import Card from '../components/Card.js'
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import './index.css'; 
// import Api from '../components/Api.js';

// let currentUserId;

// const api = new Api(
//   "https://mesto.nomoreparties.co/v1/cohort-61", "4ad54b8d-418c-4c83-835c-6ae9b7d3aa74"
//   );

//   api.getCardsApi().then((item) => {
//     console.log(item);
//   })

//функци.созд. карточки через новый экземпляр класса.
function createCard(title, image) {
  const card = new Card(title, image, '.elements-template', handleCardClick);
  const cardElement = card.generateCard();
  return cardElement;
}

//отрисовка элементов из массива
const cardList = new Section ({
  //items: initialCards,
  renderer: (item) => {
    cardList.addItems(createCard(item.name, item.link))//создаем и добавляем карточку
  }
}, '.elements')

//добавляет каточки в контейнер
cardList.rendererItems(items); 

//Превью попап
const popupImage = new PopupWithImage('.popup_image');
popupImage.setEventListeners();


const userInfo = new UserInfo({
  userName:'.profile__title',
  userInfo: '.profile__subtitle'
});

 //Экземпляр класса для попапа редактирования профиля
const editProfilePopup = new PopupWithForm ('.popup_edit_profile',{
  handleSubmitForm: (userData) => {
  userInfo.setUserInfo({
    name: userData.name,
    info: userData.info
  }); 

  editProfilePopup.close();
  }
  });

editProfilePopup.setEventListeners();

buttonOpenEditProfilePopup.addEventListener('click', () => {
  editProfilePopup.open();
  //когда открыт попап ред.профиля с валидными данными,кнопка сразу активна
  profilePopupValidator.resetValidation();
  const actualUserInfo = userInfo.getUserInfo();
  nameInput.value = actualUserInfo.name;
  jobInput.value = actualUserInfo.info;
  //editProfilePopup.setInputValues(actualUserInfo);
});

//Экземпляр класса добавления карточки через форму
const addNewCardPopup = new PopupWithForm('.popup_add_card', {
  handleSubmitForm: (item) => {
    cardList.addItems(createCard(item.region, item.link));
    addNewCardPopup.close()
  },
})

addNewCardPopup.setEventListeners();

addCardButton.addEventListener('click', () => {
  addNewCardPopup.open();
  newCardPopupValidator.resetValidation();
});


//валидация формы добавления карточки
const newCardPopupValidator = new FormValidator(config, newCardForm);
newCardPopupValidator.enableValidation();

//валидация формы редактирования профиля
const profilePopupValidator  = new FormValidator(config, profileForm);
profilePopupValidator.enableValidation();



//функция открытитя превью. 
//Передаем в конструктор класса кард и при создании экземпляра Кард
function handleCardClick(title, image) {
  //вызываем публичный метод на конкретном экземпляре класса
  popupImage.open(title, image);
}