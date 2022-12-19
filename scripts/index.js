const openPopupButton = document.querySelector('.profile__button');
const profilePopup = document.querySelector ('.popup');
const closePopupButton = profilePopup.querySelector('.popup__close');
const formElement = document.querySelector ('.popap__form_name_form');
const nameInput = document.querySelector('.popup__field_type_name');
const jobInput = document.querySelector('.popup__field_type_job');
const nameProfile = document.querySelector('.profile__title');
const jobProfile = document.querySelector('.profile__subtitle');

function openPopup() {
  profilePopup.classList.add('popup_opened');
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
}

openPopupButton.addEventListener('click', openPopup);

function closePopup() {
  profilePopup.classList.remove('popup_opened');
}

closePopupButton.addEventListener('click', closePopup);


// profilePopup.addEventListener('click', (event) => {
//   if(event.target === event.currentTarget) {
//     profilePopup.classList.remove('popup_opened');
// };
// })


function handleFormSubmit(evt) {
  evt.preventDefault()
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  closePopup();
}

formElement.addEventListener('submit', handleFormSubmit);

