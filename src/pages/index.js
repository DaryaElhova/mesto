import {
  buttonOpenEditProfilePopup,
  profileForm,
  nameInput,
  jobInput,
  addCardButton,
  newCardForm,
  config
} from '../utils/constants.js'

import Card from '../components/Card.js'
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import './index.css'; 
import Api from '../components/Api.js';
//import PopupConfirm from '../components/PopupConfirm.js';

//Глобальная переменная, перезаписывает тегущего пользователя
let currentUserId;

const api = new Api(
  "https://mesto.nomoreparties.co/v1/cohort-61",
   "4ad54b8d-418c-4c83-835c-6ae9b7d3aa74"
  );

Promise.all([ api.getCardsApi(),api.getUserInfoApi()])
  .then(([items, data]) => {
    cardList.rendererItems(items);
    //после выполнения промисов, в currentUserId будет записан текущий юзер карточки
    currentUserId = data._id;
    userInfo.setUserInfo({name: data.name, info:data.about});
    userInfo.setUserAvatar(data.avatar);
  })


//функци.созд. карточки через новый экземпляр класса.
function createCard(item) {
  const card = new Card(item, '.elements-template', handleCardClick, currentUserId);
  const cardElement = card.generateCard();
  return cardElement;
}

//отрисовка элементов 
const cardList = new Section ({
  renderer: (item) => {
    cardList.addItems(createCard(item))//создаем и добавляем карточку
  }
}, '.elements')


//Превью попап
const popupImage = new PopupWithImage('.popup_image');
popupImage.setEventListeners();


const userInfo = new UserInfo({
  userName:'.profile__title',
  userInfo: '.profile__subtitle',
  userAvatar: '.profile__avatar'
});

 //Экземпляр класса для попапа редактирования профиля
 //Внутри функции колбэка помещаем метод редактирования данных профиля. 
const editProfilePopup = new PopupWithForm ('.popup_edit_profile',{
  handleSubmitForm: (userData) => {
    api.updateUserInfo(userData)
      .then((res) => {
      userInfo.setUserInfo({
        name: res.name,
        info: res.about
      })
      editProfilePopup.close();
    })
      .catch((err) => {
        console.log(`Ошибка ${err}`)
      })
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
  handleSubmitForm: (cardData) => {
    api.addNewCardApi(cardData)
      .then((item) => {
        cardList.addItems(createCard(item))
        addNewCardPopup.close()
    })
      .catch((err) => {
        console.log(err)
      })
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