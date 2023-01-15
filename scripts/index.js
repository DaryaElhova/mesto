const openPopupButton = document.querySelector('.profile__button');
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
const elementsTemplate = document
  .querySelector('.elements-template')
  .content.querySelector('.elements__element');
const popupImage = document.querySelector('.popup_image');

const closePopupImage = popupImage.querySelector('.popup__close');
const popupBigImage = popupImage.querySelector('.popup__big-image');
const popupImageTitle = popupImage.querySelector('.popup__title');

//функция создания новой карточки
function getCard({ name, link }) {
  const newCard = elementsTemplate.cloneNode(true);
  const cardTitle = newCard.querySelector('.elements__title');
  const cardImage = newCard.querySelector('.elements__image');

  cardTitle.textContent = name;
  cardImage.src = link;
  cardImage.alt = name;

  //Функция лайка карточки
  const like = newCard.querySelector('.elements__icon');
  like.addEventListener('click', (evt) => {
    evt.target.classList.toggle('elements__icon_active');
  });

  //функция удаления карточки
  const deleteBtn = newCard.querySelector('.elements__btn-delete');
  deleteBtn.addEventListener('click', (evt) => {
    evt.target.closest('.elements__element').remove();
  });

  //отктытие и закрытие попапа с большим изображением по клику
  cardImage.addEventListener('click', () => {
    popupBigImage.src = link;
    popupImageTitle.textContent = name;
    popupBigImage.alt = name;
    openPopup(popupImage);
  });

  closePopupImage.addEventListener('click', () => {
    closePopup(popupImage);
  });

  return newCard;
}

//листенер на сабмит формы
newCardForm.addEventListener('submit', addCard);

function addCard(e) {
  e.preventDefault();
  const newCard = getCard({ name: newCardName.value, link: newCardLink.value });
  cardsContainer.prepend(newCard);
  closePopup(newCardPopup);
  newCardForm.reset(); //очистка формы
}

//шаблон функции открытия попапа
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

openPopupButton.addEventListener('click', openProfilePopup);
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
}

closeProfilePopup.addEventListener('click', () => closePopup(profilePopup));

closeAddCardPopup.addEventListener('click', () => closePopup(newCardPopup));

function handleFormSubmit(evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  closePopup(profilePopup);
}

formElement.addEventListener('submit', handleFormSubmit);

//добавляем в DOM карточки с данными из массива
function renderCards() {
  initialCards.forEach((item) => {
    const cardItem = getCard(item);
    cardsContainer.append(cardItem);
  });
}

renderCards();

//закрытие попапа по оверлею
profilePopup.addEventListener('click', (event) => {
  if (event.target === event.currentTarget) {
    closePopup(profilePopup);
  }
});

popupImage.addEventListener('click', (event) => {
  if (event.target === event.currentTarget) {
    closePopup(popupImage);
  }
});
