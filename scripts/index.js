import initialCards from './initialcards.js'
import Card from './classCard.js'

export const popupImage = document.querySelector('.popup_image');
export const popupBigImage = popupImage.querySelector('.popup__big-image');
export const popupImageTitle = popupImage.querySelector('.popup__title');

const buttonOpenEditProfilePopup = document.querySelector('.profile__button');
const profilePopup = document.querySelector('.popup_edit_profile');

const closeProfilePopup = profilePopup.querySelector('.popup__close');
const formElement = profilePopup.querySelector('.popup__form');
const nameInput = profilePopup.querySelector('.popup__field_type_name');
const jobInput = profilePopup.querySelector('.popup__field_type_job');

const nameProfile = document.querySelector('.profile__title');
const jobProfile = document.querySelector('.profile__subtitle');
const addCardButton = document.querySelector('.profile__button-add');
const newCardPopup = document.querySelector('.popup_add_card');

const closeAddCardPopup = newCardPopup.querySelector('.popup__close');
const newCardForm = newCardPopup.querySelector('.popup__form');
const newCardName = newCardPopup.querySelector('.popup__field_type_region');
const newCardLink = newCardPopup.querySelector('.popup__field_type_link');

const cardsContainer = document.querySelector('.elements');

const closePopupImage = popupImage.querySelector('.popup__close');

//функци.созд. карточки через новый экземпляр класса.
function createCard(title, image) {
  const card = new Card(title, image, '.elements__template');
  const cardElement = card.generateCard();
  return cardElement;
}

//добавл.карточку в разметку
const addCards = (title, image) => {
  const card = createCard(title, image);
  cardsContainer.prepend(card);
}

//на каждом элементе массива вызываем функци добавл карточки
//(она в свою очередь вызывает create)
const renderCards = (initialCards) => {
  initialCards.forEach((item) => {
    addCards(item.name, item.link);
  })
}

renderCards(initialCards);


// //слушатель на закрытие попапа устанавливается в глобальной обл видимости
// closePopupImage.addEventListener('click', () => {
//   closePopup(popupImage);
// });

// //листенер на сабмит формы
// newCardForm.addEventListener('submit', addCard);

// function addCard(e) {
//   e.preventDefault();
//   const newCard = getCard({ name: newCardName.value, link: newCardLink.value });
//   cardsContainer.prepend(newCard);
//   closePopup(newCardPopup);
//   newCardForm.reset(); //очистка формы
// }

//шаблон функции открытия попапа
function openPopup(popup) {
  popup.classList.add('popup_opened');

  //слушательна  закрытие попапа по ESC устанавливается в ф-ю откр попапа, т.к должен срабатывать когда он открыт
  document.addEventListener('keyup', handleEscKeyup);
}

buttonOpenEditProfilePopup.addEventListener('click', openProfilePopup);
addCardButton.addEventListener('click', openAddCardPopup);

function openProfilePopup(e) {
  e.preventDefault();
  openPopup(profilePopup);
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
}

function openAddCardPopup(e) {
  e.preventDefault();
  openPopup(newCardPopup);
}

//шаблон функции закрытия попапа
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  popup.removeEventListener('keyup', handleEscKeyup);
}

closeProfilePopup.addEventListener('click', () => closePopup(profilePopup));

closeAddCardPopup.addEventListener('click', () => closePopup(newCardPopup));

function submitEditProfileForm(evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  closePopup(profilePopup);
}

formElement.addEventListener('submit', submitEditProfileForm);


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



