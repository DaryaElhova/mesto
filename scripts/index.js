const openPopupButton = document.querySelector('.profile__button');
const profilePopup = document.querySelector ('.popup_edit_profile');
const closeProfilePopup = profilePopup.querySelector('.popup__close');

const formElement = document.querySelector ('.popup__form');
const nameInput = document.querySelector('.popup__field_type_name');
const jobInput = document.querySelector('.popup__field_type_job');
const nameProfile = document.querySelector('.profile__title');
const jobProfile = document.querySelector('.profile__subtitle');
const addCardButton = document.querySelector('.profile__button-add');
const newCardPopup = document.querySelector('.popup_add_card');
const closeAddCardPopup = newCardPopup.querySelector('.popup__close');

function openPopup(popup){
  popup.classList.add('popup_opened');
}

openPopupButton.addEventListener('click', openProfilePopup);
addCardButton.addEventListener('click', openAddCardPopup);

function openProfilePopup(e){
  e.preventDefault();
  openPopup(profilePopup);
}

function openAddCardPopup(e){
  e.preventDefault();
  openPopup(newCardPopup);
}

function closePopup(popup){
  popup.classList.remove('popup_opened');
}

closeProfilePopup.addEventListener('click', () =>
closePopup(profilePopup));

closeAddCardPopup.addEventListener('click', () => 
closePopup(newCardPopup));


function handleFormSubmit(evt) {
  evt.preventDefault()
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  closePopup();
}

formElement.addEventListener('submit', handleFormSubmit);

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]; 

const cardsContainer = document.querySelector('.elements');
const elementsTemplate = document.querySelector('.elements-template').content.querySelector('.elements__element');

function createCards({name, link}){
  const card = elementsTemplate.cloneNode(true);
  const cardTitle = card.querySelector('.elements__title');
  const cardImage = card.querySelector('.elements__image');

  cardTitle.textContent = name;
  cardImage.src = link;

  return card;
}

function renderCards(){
  initialCards.forEach(item => {
    const cardItem = createCards(item);
    cardsContainer.append(cardItem);
  })
}

renderCards();

// profilePopup.addEventListener('click', (event) => {
//   if(event.target === event.currentTarget) {
//     profilePopup.classList.remove('popup_opened');
// };
// })

