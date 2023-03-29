import '../index.css';
import api from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import AddPlacePopup from "./AddPlacePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";

function App() {

    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);

    const [cards, setCards] = React.useState([]);
    const [currentUser, setCurrentUser] = React.useState({});
    const [selectedCard, setSelectedCard] = React.useState({link: "", name: "", isOpen: false});

    React.useEffect(() => {
        api.getInitialCards()
            .then((cards) => {
                setCards(cards);
            })
            .catch(err => console.log(err));
    }, []);

    React.useEffect(() => {
        api.getUserInfo()
            .then(data => {
                setCurrentUser(data)})
            .catch(err => console.log(err));
    }, []);

    function handleCardClick(card) {
        setSelectedCard({link: card.link, name: card.name, isOpen: true});
    }
    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);

        if (!isLiked) {
            api.putLike(card._id)
                .then((newCard) => {
                    const newCards = cards.map((c) => c._id === card._id ? newCard : c)
                    setCards(newCards)
                })
                .catch(err => console.log(err));

        } else {
            api.deleteLike(card._id)
                .then((newCard) => {
                    const newCards = cards.map((c) => c._id === card._id ? newCard : c)
                    setCards(newCards)
                })
                .catch(err => console.log(err));
        }
    }
    function handleCardDelete(card) {
        api.deleteCard(card._id).then(() => {
            const newCards = cards.filter((c) => c._id !== card._id);
            setCards(newCards);
        });
    }
        function handleUpdateUser(data) {
            api.patchUserProfile(data)
                .then(() => {
                    setCurrentUser({...currentUser, ...data});
                    closeAllPopups();
                })
                .catch(err => console.log(err));
        }

    function handleUpdateAvatar(data) {
        api.patchAvatar(data)
            .then(res => {
                setCurrentUser(res);
            })
            .then(() => {
                setIsEditAvatarPopupOpen(false);
            })
            .catch((err) => {
                console.log(`Ошибка обновления аватара пользователя: ${err}`);
            })
    }

        function handleAddPlaceSubmit(card) {
            api.postUserCard(card)
                .then((newCard) => {
                    setCards([newCard, ...cards]);
                    closeAllPopups();
                })
                .catch(err => console.log(err));
        }
    function closeAllPopups() {
        setIsEditProfilePopupOpen(false)
        setIsEditAvatarPopupOpen(false)
        setIsAddPlacePopupOpen(false)
        setSelectedCard({link: "", name: "", isOpen: false});
    };

  return (
      <CurrentUserContext.Provider value={currentUser}>
    <div className="page">
      <Header />
        <Main
            onEditProfile={handleEditProfileClick}
            onEditAvatar={handleEditAvatarClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            onCardLike = {handleCardLike}
            onCardDelete = {handleCardDelete}
            cards = {cards}
            />
      <Footer />
       <ImagePopup
            name="img"
            card={selectedCard}
            onClose={closeAllPopups}/>
        <AddPlacePopup
            onAddPlace={handleAddPlaceSubmit}
            onClose={closeAllPopups}
            isOpen={isAddPlacePopupOpen}
            />
        <EditAvatarPopup
            onUpdateAvatar={handleUpdateAvatar}
            onClose={closeAllPopups}
            isOpen={isEditAvatarPopupOpen}/>
        <EditProfilePopup
            onUpdateUser={handleUpdateUser}
            onClose={closeAllPopups}
            isOpen={isEditProfilePopupOpen}/>
       <PopupWithForm
            onClose={closeAllPopups}
            name="delete-card"
            title="Вы уверены?"
            button="Да"/>
    </div>
      </CurrentUserContext.Provider>
  );
}

export default App;
