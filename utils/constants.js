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

export {
    buttonOpenEditProfilePopup,
    profilePopup,
    popupImage,
    popupBigImage,
    popupImageTitle,
    closeProfilePopup,
    profileForm,
    nameInput,
    jobInput,
    nameProfile,
    jobProfile,
    addCardButton,
    newCardPopup,
    closeAddCardPopup,
    newCardForm,
    newCardName,
    newCardLink,
    cardsContainer,
    config
}