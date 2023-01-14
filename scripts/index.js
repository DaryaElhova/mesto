const openPopupButton = document.querySelector('.profile__button');
const profilePopup = document.querySelector ('.popup_edit_profile');
const closeProfilePopup = profilePopup.querySelector('.popup__close');
const formElement = profilePopup.querySelector ('.popup__form');
const nameInput = profilePopup.querySelector('.popup__field_type_name');
const jobInput = profilePopup.querySelector('.popup__field_type_job');
const nameProfile = document.querySelector('.profile__title');
const jobProfile = document.querySelector('.profile__subtitle');
const addCardButton = document.querySelector('.profile__button-add');
const newCardPopup = document.querySelector('.popup_add_card');
const closeAddCardPopup = newCardPopup.querySelector('.popup__close');
const newCardForm = newCardPopup.querySelector('.popup__form');

const cardsContainer = document.querySelector('.elements');
const elementsTemplate = document.querySelector('.elements-template').content.querySelector('.elements__element');


//функция создания новой карточки
function getCard({name,link}){
  const newCard = elementsTemplate.cloneNode(true);
  const cardTitle = newCard.querySelector('.elements__title');
  const cardImage = newCard.querySelector('.elements__image');
  
  cardTitle.textContent = name;
  cardImage.src = link;
  cardImage.alt = name;


  //Функция лайка карточки
  const like = newCard.querySelector('.elements__icon');
  like.addEventListener('click',(evt) => {
    evt.target.classList.toggle('elements__icon_active');
  })

  //функция удаления карточки
  const deleteBtn = newCard.querySelector('.elements__btn-delete');
  deleteBtn.addEventListener('click', (evt) => {
    evt.target.closest('.elements__element').remove();
  })
  
  return newCard;
}

//листенер на сабмит формы
newCardForm.addEventListener('submit', addCard);



function addCard(e){
  e.preventDefault()
  const newCardName = newCardPopup.querySelector('.popup__field_type_name').value;
  const newCardLink = newCardPopup.querySelector('.popup__field_type_link').value;
  const newCard = getCard({name: newCardName, link: newCardLink});
  cardsContainer.prepend(newCard);
  closePopup(newCardPopup)
  newCardForm.reset();//очистка формы
}


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
  closePopup(profilePopup);
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

//добавляем в DOM карточки с данными из массива
function renderCards(){
  initialCards.forEach(item => {
    const cardItem = getCard(item);
    cardsContainer.append(cardItem);
  })
}

renderCards();



// profilePopup.addEventListener('click', (event) => {
//   if(event.target === event.currentTarget) {
//     profilePopup.classList.remove('popup_opened');
// };
// })

