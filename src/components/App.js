import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

import api from '../utils/Api';

import Register from './Register';
import Login from './Login';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';
import * as auth from '../utils/auth.js';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);

  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);

  const [cards, setCards] = React.useState([]);
  const [selectedCard, setSelectedCard] = React.useState({ name: '', link: '' });
  const [deletedCard, setDeletedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});

  const [isLoading, setIsLoading] = React.useState(false);

  const history = useHistory();
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [register, setRegister] = React.useState(false);

  /** Обработка попапов */

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

  function handleInfoTooltipOpen(boolean) {
    setRegister(boolean);
    setIsInfoTooltipOpen(true);
  }

  function closeAllPopups() {
    setIsInfoTooltipOpen(false);
    setSelectedCard({});
    setIsImagePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsConfirmationPopupOpen(false);
  }

  /* Обработка событий */
  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);
    if (isLiked) {
      api.deleteLike(card._id)
        .then((newCard) => {
          setCards((prevCards) => prevCards.map((c) => (c._id === card._id ? newCard : c)));
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      api.setLike(card._id)
        .then((newCard) => {
          setCards((prevCards) => prevCards.map((c) => (c._id === card._id ? newCard : c)));
        })
        .catch((err) => {
          console.log(err);
        });
    }
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

  React.useEffect(() => {
    const closeByEscape = (e) => {
      if (e.key === 'Escape') {
        closeAllPopups();
      }
    };
    document.addEventListener('keydown', closeByEscape);
    return () => document.removeEventListener('keydown', closeByEscape);
  }, []);

  function handleDeletePopupClick(card) {
    setDeletedCard(card);
    setIsConfirmationPopupOpen(true);
  }

  /* Авторизация */
  function handleLogin() {
    setLoggedIn(true);
  }

  function handleRegisterSubmit(password, email) {
    auth.register(password, email)
      .then((res) => {
        if (res) {
          handleInfoTooltipOpen(true);
          history.push('/sign-in');
        }
      })
      .catch((err) => {
        handleInfoTooltipOpen(false);
        console.log(err.message);
      });
  }

  function handleLoginSubmit(password, email) {
    auth
      .authorize(password, email)
      .then((res) => {
        if (res.jwt) {
          handleLogin();
          localStorage.setItem('jwt', res.jwt);
          history.push('/');
        }
      })
      .catch((err) => {
        handleInfoTooltipOpen(false);
        console.log(err);
      });
  }

  function handleTokenCheck() {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth
        .getContent(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setEmail(res.email);
            history.push('/');
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  const getUserInfo = () => {
    console.log('getUserInfoCallback');
    Promise.all([api.getInitialCards(), api.getProfileInfo()])
      .then(([cards, user ]) => {
        setCards(cards);
        setCurrentUser(user);
        setEmail(user.email);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  React.useEffect(() => {
    handleTokenCheck();
  }, []);

  React.useEffect(() => {
    if (loggedIn) {
      getUserInfo();
    }
  }, [loggedIn]);

  function onSingOut() {
    localStorage.removeItem('jwt');
    setEmail('');
    setLoggedIn(false);
    history.push('/sign-in');
  }

  return (

        <CurrentUserContext.Provider value={currentUser}>

            <div className="pages">
                <Header handleLogOut={onSingOut} email={email}/>
                <Switch>
                    <Route path="/sign-up">
                        <Register handleRegisterSubmit={handleRegisterSubmit}/>
                    </Route>
                    <Route path="/sign-in">
                        <Login handleLoginSubmit={handleLoginSubmit}/>

                    </Route>
                    <ProtectedRoute path="/"
                                    component={Main}

                                    loggedIn={loggedIn}
                                    onEditProfile={handleEditProfileClick}
                                    onAddPlace={handleAddPlaceClick}
                                    onEditAvatar={handleEditAvatarClick}
                                    onCardClick={handleCardClick}
                                    cards={cards}
                                    onCardLike={handleCardLike}
                                    onCardDeleteClick={handleDeletePopupClick}>
                    </ProtectedRoute>
                </Switch>

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
                <InfoTooltip onClose={closeAllPopups} isOpen={isInfoTooltipOpen} handleOverlayClose={handleOverlayClose}
                             register={register}/>
                <Footer/>

            </div>
        </CurrentUserContext.Provider>
  );
}

export default App;
