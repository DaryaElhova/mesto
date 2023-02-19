import initialCards from './initialcards.js'
import Card from './Card.js'
import FormValidator from './FormValidator.js';

const buttonOpenEditProfilePopup = document.querySelector('.profile__button');
const profilePopup = document.querySelector('.popup_edit_profile');

const popupImage = document.querySelector('.popup_image'); 
const popupBigImage = popupImage.querySelector('.popup__big-image'); 
const popupImageTitle = popupImage.querySelector('.popup__title'); 

const closeProfilePopup = profilePopup.querySelector('.popup__close');
const profileForm = document.forms["form-edit-profile"];
const nameInput = profilePopup.querySelector('.popup__field_type_name');
const jobInput = profilePopup.querySelector('.popup__field_type_job');

const nameProfile = document.querySelector('.profile__title');
const jobProfile = document.querySelector('.profile__subtitle');
const addCardButton = document.querySelector('.profile__button-add');
const newCardPopup = document.querySelector('.popup_add_card');

const closeAddCardPopup = newCardPopup.querySelector('.popup__close');
const newCardForm = document.forms["form-add-card"];
const newCardName = newCardPopup.querySelector('.popup__field_type_region');
const newCardLink = newCardPopup.querySelector('.popup__field_type_link');

const cardsContainer = document.querySelector('.elements');

const config = {
  formSelector: '.form',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__btn',
  inactiveButtonClass: 'popup__btn_type_inactiv',
  inputErrorClass: 'popup__field_type_error',
  errorClass: 'popup__input-error'
}



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

//на каждом элементе массива вызываем функци добавл карточки
//(она в свою очередь вызывает create)
const renderCards = (initialCards) => {
  initialCards.forEach((item) => {
    addCard(item.name, item.link);
  })
}

renderCards(initialCards);


newCardForm.addEventListener('submit', (e) => {
  e.preventDefault();
  addCard(newCardName.value, newCardLink.value);
  closePopup(newCardPopup);
  newCardForm.reset();
})


//шаблон функции открытия попапа
function openPopup(popup) {
  popup.classList.add('popup_opened');

  //слушательна  закрытие попапа по ESC устанавливается 
  //в ф-ю откр попапа, т.к должен срабатывать когда он открыт
  document.addEventListener('keyup', handleEscKeyup);
}

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

//шаблон функции закрытия попапа
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keyup', handleEscKeyup);
}

//Установка функции удалния сразу на все крестики. Находим все кнопки:
const closeButtons = document.querySelectorAll('.popup__close');
//Перебираем через forEach, находим ближайшую к кнопке попап
closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  // устанавливаем обработчик закрытия на крестик
  button.addEventListener('click', () => closePopup(popup));
})

function submitEditProfileForm(evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  closePopup(profilePopup);
}

profileForm.addEventListener('submit', submitEditProfileForm);


//закрытие попапа по оверлею
function closePopupOverlay (popup) {
  popup.addEventListener('click', (evt) => {
    if (evt.target === evt.currentTarget) {
      closePopup(popup);
    }
  });
};

closePopupOverlay(profilePopup);
closePopupOverlay(popupImage);
closePopupOverlay(newCardPopup);

//закрытите попапа клавишой Esc
const handleEscKeyup = (evt) => {
  evt.preventDefault();
  if (evt.key === 'Escape') {
    const activPopup = document.querySelector('.popup_opened');
    closePopup(activPopup);
  }
}; 

//функция открытитя превью. 
//Передаем в конструктор класса кард и при создании экземпляра Кард
function handleCardClick(title, image) {
  openPopup(popupImage)
  popupImageTitle.textContent = title;
  popupBigImage.alt = title;
  popupBigImage.src = image;
}
