import {
  buttonOpenEditProfilePopup,
  profilePopup,
  //popupImage,
  popupBigImage,
  popupImageTitle,
  //closeProfilePopup,
  profileForm,
  nameInput,
  jobInput,
  nameProfile,
  jobProfile,
  addCardButton,
  newCardPopup,
  //closeAddCardPopup,
  newCardForm,
  newCardName,
  newCardLink,
  cardsContainer,
  config
} from '../utils/constants.js'

import initialCards from './initialcards.js'
import Card from './Card.js'
import FormValidator from './FormValidator.js';
import Section from './Section.js';
import PopupWithImage from './PopupWithImage.js';



//отрисовка элементов из массива
const cardList = new Section ({
  items: initialCards,
  renderer: (item) => {
      cardList.addItems(createCard(item.name, item.link))//создаем и добавляем карточку
  }
}, '.elements')

//добавляет каточки в контейнер
cardList.rendererItems(); 

//валидация формы добавления карточки
const newCardPopupValidator = new FormValidator(config, newCardForm);
newCardPopupValidator.enableValidation();

//валидация формы редактирования профиля
const profilePopupValidator  = new FormValidator(config, profileForm);
profilePopupValidator.enableValidation();

//функци.созд. карточки через новый экземпляр класса.
function createCard(title, image) {
  const card = new Card(title, image, '.elements-template', handleCardClick);
  const cardElement = card.generateCard();
  return cardElement;
}

//добавл.карточку в разметку
const addCard = (title, image) => {
  const card = createCard(title, image);
  cardsContainer.prepend(card);
}

const popupImage = new PopupWithImage('.popup_image');
popupImage.setEventListeners();


newCardForm.addEventListener('submit', (e) => {
  e.preventDefault();
  addCard(newCardName.value, newCardLink.value);
  closePopup(newCardPopup);
  newCardForm.reset();
})


//-----слушатели и функции на кнопки открытия попапов----------
buttonOpenEditProfilePopup.addEventListener('click', () => {
  openProfilePopup();
  //когда открыт попап ред.профиля с валидными данными,кнопка сразу активна
  profilePopupValidator.resetValidation();
});

function openProfilePopup(e) {
  openPopup(profilePopup);
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
}

addCardButton.addEventListener('click', () => {
  openAddCardPopup();
  newCardPopupValidator.resetValidation();
});

function openAddCardPopup(e) {
  openPopup(newCardPopup);
}

//Установка функции удалния сразу на все крестики. Находим все кнопки:
// const closeButtons = document.querySelectorAll('.popup__close');
// //Перебираем через forEach, находим ближайшую к кнопке попап
// closeButtons.forEach((button) => {
//   const popup = button.closest('.popup');
//   // устанавливаем обработчик закрытия на крестик
//   button.addEventListener('click', () => closePopup(popup));
// })

function submitEditProfileForm(evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  closePopup(profilePopup);
}

profileForm.addEventListener('submit', submitEditProfileForm);


//закрытие попапа по оверлею
// function closePopupOverlay (popup) {
//   popup.addEventListener('click', (evt) => {
//     if (evt.target === evt.currentTarget) {
//       closePopup(popup);
//     }
//   });
// };

// closePopupOverlay(profilePopup);
// closePopupOverlay(popupImage);
// closePopupOverlay(newCardPopup);

// //закрытите попапа клавишой Esc
// const handleEscKeyup = (evt) => {
//   evt.preventDefault();
//   if (evt.key === 'Escape') {
//     const activPopup = document.querySelector('.popup_opened');
//     closePopup(activPopup);
//   }
// }; 

//функция открытитя превью. 
//Передаем в конструктор класса кард и при создании экземпляра Кард
function handleCardClick(title, image) {
  //вызываем публичный метод на конкретном экземпляре класса
  popupImage.open(title, image);
}
