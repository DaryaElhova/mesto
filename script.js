const openPopupButton = document.querySelector('.profile__button');
const profilePopup = document.querySelector ('.popup');
const closePopupButton = profilePopup.querySelector('.popup__close');

openPopupButton.addEventListener ('click', (event) => {
  profilePopup.classList.add('popup_opened');
})

closePopupButton.addEventListener('click', (event) => {
  profilePopup.classList.remove('popup_opened');
})

profilePopup.addEventListener('click', (event) => {
  console.log(event.target, event.currentTarget);
  if(event.target === event.currentTarget) {
    profilePopup.classList.remove('popup_opened');
};
})

let formElement = document.querySelector ('.popup__container');
let nameInput = document.querySelector('.popup__field_name');
let jobInput = document.querySelector('.popup__field_job');
let nameProfile = document.querySelector('.profile__title');
let jobProfile = document.querySelector('.profile__subtitle');

function handleFormSubmit(evt) {
  evt.preventDefault()
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  profilePopup.classList.remove('popup_opened');
}

formElement.addEventListener('submit', handleFormSubmit);


