import '../index.css';
import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {

    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState({});

    function closeAllPopups() {
        setIsEditProfilePopupOpen(false)
        setIsEditAvatarPopupOpen(false)
        setIsAddPlacePopupOpen(false)
        setSelectedCard({});
    }


  return (
    <div className="page">
      <Header />
        <Main
            onEditProfile={setIsEditProfilePopupOpen}
            onEditAvatar={setIsEditAvatarPopupOpen}
            onAddPlace={setIsAddPlacePopupOpen}
            onCardClick={setSelectedCard}
            />
      <Footer />
        <ImagePopup
            name="img"
            card={selectedCard}
            onClose={closeAllPopups}/>
        <PopupWithForm
            name="delete-card"
            title="Вы уверены?"
            button="Да">
        </PopupWithForm>
        <PopupWithForm
            name="avatar"
            title="Обновить аватар"
            button="Сохранить"
            onClose={closeAllPopups}
            isOpen={isEditAvatarPopupOpen}>
            <label className="popup__form-field">
                <input className="popup__input popup__input_avatar_url"
                       name="link"
                       id="avatar-input"
                       type="url"
                       placeholder="Ссылка на аватар"
                       required
                />
                <span className=""/>
            </label>
        </PopupWithForm>
            <PopupWithForm
                name="profile"
                title="Редактировать профиль"
                button="Сохранить"
                onClose={closeAllPopups}
                isOpen={isEditProfilePopupOpen}>
                <label className="popup__form-field">
                    <input className="popup__input popup__input_profile_name"
                           name="name"
                           id = "name-input"
                           type="text"
                           placeholder="Имя"
                           minLength="2"
                           maxLength="40"
                           required
                    />
                    <span className="popup__input-error" id="name-input-error"/>
                </label>
                <label className="popup__form-field">
                    <input className="popup__input popup__input_profile_title"
                           name="about"
                           id="title-input"
                           type="text"
                           placeholder="Описание"
                           minLength="2"
                           maxLength="200"
                           required
                    />
                    <span className="popup__input-error" id="title-input-error"/>
                </label>
            </PopupWithForm>
            <PopupWithForm
                name="element"
                title="Новое место"
                button="Сохранить"
                onClose={closeAllPopups}
                isOpen={isAddPlacePopupOpen}>
                <label className="popup__form-field">
                    <input className="popup__input popup__input_element_name"
                           name="name"
                           id="element-name-input"
                           type="text"
                           placeholder="Название"
                           minLength="2"
                           maxLength="30"
                           required
                    />
                    <span className="popup__input-error" id="element-name-input-error"/>
                </label>
                <label className="popup__form-field">
                    <input className="popup__input popup__input_element_url"
                           name="link"
                           id="url-input"
                           type="url"
                           placeholder="Ссылка на картинку"
                           required
                    />
                    <span className="popup__input-error" id="url-input-error"/>
                </label>
            </PopupWithForm>
    </div>
  );
}

export default App;
