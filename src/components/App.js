import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import api from "../utils/Api";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function App() {

    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = React.useState(false);
    const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);

    const [cards, setCards] = React.useState([]);
    const [selectedCard, setSelectedCard] = React.useState({name: '', link: ''});
    const [deletedCard, setDeletedCard] = React.useState({});
    const [currentUser, setCurrentUser] = React.useState({});

    const [isLoading, setIsLoading] = React.useState(false);

    React.useEffect(() => {
        Promise.all([api.getInitialCards(), api.getProfileInfo()])
            .then((res) => {
                setCards(res[0]);
                setCurrentUser(res[1]);
            })
            .catch((err) => {
                console.log(err);
            })
    }, []);


    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        if (isLiked) {
            api.deleteLike(card._id)
                .then((newCard) => {
                    setCards((prevCards) => prevCards.map((c) => c._id === card._id ? newCard : c));
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            api.setLike(card._id)
                .then((newCard) => {
                    setCards((prevCards) => prevCards.map((c) => c._id === card._id ? newCard : c));
                })
                .catch((err) => {
                    console.log(err);
                });
        }
        ;
    }

    function handleUpdateUser(userInfo) {
        setIsLoading(true);
        api.setProfileInfo(userInfo)
            .then((res) => {
                setCurrentUser(res);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    function handleUpdateAvatar(data) {
        setIsLoading(true);
        api.changeAvatar(data)
            .then((res) => {
                setCurrentUser(res);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    function handleCardDelete(e) {
        e.preventDefault();
        setIsLoading(true);
        api.deleteCard(deletedCard._id)
            .then(() => {
                setCards((prevCards) => prevCards.filter((c) => c._id !== deletedCard._id && c));
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    function handleAddPlaceSubmit(data) {
        setIsLoading(true);
        api.setNewCard(data)
            .then((newCard) => {
                setCards([newCard, ...cards]);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    function handleOverlayClose(e) {
        if (e.target.classList.contains('popup')) {
            closeAllPopups();
        }
    }

    function handleCardClick(card) {
        setSelectedCard(card);
        setIsImagePopupOpen(true);
    }

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    function closeAllPopups() {
        setSelectedCard({});
        setIsImagePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsConfirmationPopupOpen(false);
    }

    function handleDeletePopupClick(card) {
        setDeletedCard(card);
        setIsConfirmationPopupOpen(true);
    }

    return (<CurrentUserContext.Provider value={currentUser}>
        <div className="pages">

            <Header/>
            <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onCardClick={handleCardClick} cards={cards} onCardLike={handleCardLike}
                  onCardDeleteClick={handleDeletePopupClick}/>
            <Footer/>
            <EditProfilePopup onClose={closeAllPopups} isOpen={isEditProfilePopupOpen}
                              onUpdateUser={handleUpdateUser} isLoading={isLoading}
                              handleOverlayClose={handleOverlayClose}/>
            <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}
                             onUpdateAvatar={handleUpdateAvatar} isLoading={isLoading}
                             handleOverlayClose={handleOverlayClose}/>
            <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit}
                           isLoading={isLoading}
                           handleOverlayClose={handleOverlayClose}/>


            <PopupWithForm title="Вы уверены?" name="check" onClose={closeAllPopups} buttonText="Да"
                           isOpen={isConfirmationPopupOpen}
                           onSubmit={handleCardDelete} isLoading={isLoading}
                           handleOverlayClose={handleOverlayClose}/>
            <ImagePopup onClose={closeAllPopups} card={selectedCard} isOpen={isImagePopupOpen}
                        handleOverlayClose={handleOverlayClose}/>
        </div>
    </CurrentUserContext.Provider>)
}

export default App;
