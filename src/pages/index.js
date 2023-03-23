import {
  buttonOpenEditProfilePopup,
  profileForm,
  nameInput,
  jobInput,
  addCardButton,
  newCardForm,
  buttonOpenChangeAvatarPopup,
  changeAvatarForm,
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
import PopupConfirm from '../components/PopupConfirm.js';

//Глобальная переменная, перезаписывает тегущего пользователя
let currentUserId;

const api = new Api(
  "https://mesto.nomoreparties.co/v1/cohort-61",
   "4ad54b8d-418c-4c83-835c-6ae9b7d3aa74"
  );

  //отрисовка элементов 
const cardList = new Section ({
  renderer: (item) => {
    cardList.addItems(createCard(item))//создаем и добавляем карточку
  }
}, '.elements')

//функци.созд. карточки через новый экземпляр класса.
function createCard(item) {
  const card = new Card(item, '.elements-template', currentUserId,{
    handleCardClick: (title, image) => popupImage.open(title, image),
    handleCardDelete: (cardData, cardId) => popupConfirmDelete.open(cardData, cardId),

    handlePutLike: (cardId) => {
      api.putLikeApi(cardId)
        .then((res) => {
          card.renderLikeCounter(res);
        })
        .catch((err) => console.log(`Возникла ошибка ${err}`))
    },
    handleDeleteLike: (cardId) => {
      api.deleteLikeApi(cardId)
        .then((res) => {
          card.renderLikeCounter(res);
        })
        .catch((err) => console.log(`Возникла ошибка ${err}`))
    }
  });
  const cardElement = card.generateCard();
  return cardElement;
}

Promise.all([api.getUserInfoApi(), api.getCardsApi()])
  .then(([data, items]) => {
    currentUserId = data._id;//важно присвоить CurrentUser до отрисовки
    //после выполнения промисов, в currentUserId будет записан текущий юзер карточки
    userInfo.setUserInfo({name: data.name, info:data.about});
    userInfo.setUserAvatar(data.avatar);
    cardList.rendererItems(items);
  })

const popupConfirmDelete = new PopupConfirm('.popup__confirm',{
   handleConfirmation:(cardData, cardId) => {
    api.deleteCardApi(cardId)
      .then(() => {
        cardData.deleteCard();
        popupConfirmDelete.close();
      })
      .catch((err) => {
        console.log(`Произошла ошибка ${err}`);
      })
  }
})

popupConfirmDelete.setEventListeners()

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
    //вызвать лоадер при отправке запроса
    editProfilePopup.onSaveButtonClick();
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
      //независимо от ответа вернуть исходное значение
      .finally(() => {
        editProfilePopup.onDataLoaded();
      })
  }
  });

editProfilePopup.setEventListeners();

const changeAvatarPopup = new PopupWithForm('.popup__change-avatar',{
  handleSubmitForm: (avatarLink) => {
    changeAvatarPopup.onSaveButtonClick();
    api.changeAvatarAPI(avatarLink)
      .then((res) => {
        userInfo.setUserAvatar(res.avatar)
        changeAvatarPopup.close();
      })
      .catch((err) => {
        console.log(`Произошла ошибка ${err}`)
      })
      .finally(() => {
        changeAvatarPopup.onDataLoaded();
      })

  }
})

changeAvatarPopup.setEventListeners();

buttonOpenChangeAvatarPopup.addEventListener('click', () => {
  changeAvatarPopup.open();
})

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
    addNewCardPopup.onSaveButtonClick();
    api.addNewCardApi(cardData)
      .then((item) => {
        cardList.addItems(createCard(item))
        addNewCardPopup.close()
    })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        addNewCardPopup.onDataLoaded();
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

//валидация формы смены аватара
const changeAvatarPopupValidator = new FormValidator(config, changeAvatarForm);
changeAvatarPopupValidator.enableValidation();
