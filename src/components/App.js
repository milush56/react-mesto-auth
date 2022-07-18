import React, { useState, useEffect } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import { api } from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import DeletePopup from "./DeletePopup";
import InfoTooltip from "./InfoTooltip";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import * as auth from "../utils/auth.js";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({
    isOpen: false,
    name: "",
    link: "",
  });
  const [currentUser, setСurrentUser] = useState({
    about: "",
    avatar: "",
    cohort: "",
    name: "",
    _id: "",
  });
  const [cards, setCards] = useState([]);
  const [buttonText, setButtonText] = React.useState(false);
  const [isDeletePopup, setDeletePopup] = useState(false);
  const [deletedCard, setDeletedCard] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [regMessage, setRegMessage] = useState(
    "Вы успешно зарегистрировались!"
  );
  const [access, setAccess] = useState(false);
  const [email, setEmail] = useState("Email");
  const history = useHistory();

  const handleEditAvatarClick = () => {
    setEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setAddPlacePopupOpen(true);
  };

  const handleDeleteClick = (card) => {
    setDeletePopup(true);
    setDeletedCard(card);
  };

  const handleCardClick = (card) => {
    setSelectedCard({
      isOpen: true,
      name: card.name,
      link: card.link,
    });
  };

  const closeAllPopups = () => {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setDeletePopup(false);
    setSelectedCard({
      isOpen: false,
    });
    setIsInfoTooltipOpen(false);
  };

  function handleUpdateUser(name, about) {
    setButtonText(true);
    api
      .editProfile(name, about)
      .then((res) => {
        console.log(res);
        setСurrentUser(res.data);
        closeAllPopups();
      })

      .catch((err) => {
        console.log("Ошибка. Запрос не выполнен: ", err);
      })

      .finally(() => {
        setButtonText(false);
      });
  }

  function handleUpdateAvatar(avatar) {
    setButtonText(true);
    api
      .editAvatar(avatar)
      .then((res) => {
        console.log(res);
        setСurrentUser(res.data);
        closeAllPopups();
      })

      .catch((err) => {
        console.log("Ошибка. Запрос не выполнен: ", err);
      })

      .finally(() => {
        setButtonText(false);
      });
  }

  function handleUpdatePlace(name, link) {
    setButtonText(true);
    api
      .addCardMesto(name, link)
      .then((res) => {
        console.log(res);
        setCards([res, ...cards]);
        closeAllPopups();
      })

      .catch((err) => {
        console.log("Ошибка. Запрос не выполнен: ", err);
      })

      .finally(() => {
        setButtonText(false);
      });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);

    if (!isLiked) {
      api
        .addLike(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })

        .catch((err) => {
          console.log("Ошибка. Запрос не выполнен: ", err);
        });
    } else {
      api
        .deleteLike(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })

        .catch((err) => {
          console.log("Ошибка. Запрос не выполнен: ", err);
        });
    }
  }

  function handleCardDelete(card) {
    setButtonText(true);
    api
      .deleteCardMesto(card._id)
      .then(() => {
        console.log(card);
        setCards(
          cards.filter(function (i) {
            return i !== card;
          })
        );
        closeAllPopups();
      })

      .catch((err) => {
        console.log("Ошибка. Запрос не выполнен: ", err);
      })

      .finally(() => {
        setButtonText(false);
      });
  }

  function handleRegister(email, password) {
    return auth
      .register(email, password)
      .then((res) => {
        if (res.data) {
          setAccess(true);
          setRegMessage("Вы успешно зарегистрировались!");
          setIsInfoTooltipOpen(true);
          history.push("/sign-in");
        }
      })
      .catch((err) => {
        console.log(err);
        setAccess(false);
        /* setRegMessage(`${err.message}`); */ /* не смог найти куда дропается месага с ошибкой, вписал с макета */
        setRegMessage("Что-то пошло не так! Попробуйте ещё раз.");
        setIsInfoTooltipOpen(true);
      });
  }

  const handleLogin = (email, password) => {
    return auth
      .authorize(email, password)
      .then((data) => {
        console.log(data);
        if (data.token) {
          localStorage.setItem("jwt", data.token);

          tokenCheck();
          history.push("/");
        }
      })
      .catch((err) => {
        console.log(err);
        setAccess(false);
        setRegMessage("Что-то пошло не так! Попробуйте ещё раз.");
        setIsInfoTooltipOpen(true);
      });
  };

  function signOut() {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    history.push("/sign-in");
  }

  const tokenCheck = () => {
    let jwt = localStorage.getItem("jwt");
    if (localStorage.getItem("jwt")) {
      auth
        .getContent(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setEmail(`${res.data.email}`);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    tokenCheck();
  }, []);

  useEffect(() => {
    if (loggedIn) {
      console.log(loggedIn);
      history.push("/");
    }
  }, [loggedIn]);

  useEffect(() => {
    if (loggedIn) {
      api
        .getProfile()
        .then((res) => {
          setСurrentUser(res.data);
        })

        .catch((err) => {
          console.log("Ошибка. Запрос не выполнен: ", err);
        });
    }
  }, [loggedIn]);
  useEffect(() => {
    const close = (e) => {
      if (e.keyCode === 27) {
        closeAllPopups();
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);

  useEffect(() => {
    const closeByOverClick = (e) => {
      if (e.target.classList.contains("popup")) {
        closeAllPopups();
      }
    };
    window.addEventListener("mousedown", closeByOverClick);
    return () => window.removeEventListener("mousedown", closeByOverClick);
  }, []);

  useEffect(() => {
    if (loggedIn) {
      api
        .getInitialCards()
        .then((cardList) => {
          console.log(cardList);
          setCards(cardList);
        })

        .catch((err) => {
          console.log("Ошибка. Запрос не выполнен: ", err);
        });
    }
  }, [loggedIn]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header handleSignOut={signOut} email={email} />
        <Switch>
          <Route path="/sign-up" exact>
            <Register onRegister={handleRegister} />
          </Route>
          <Route path="/sign-in" exact>
            <Login onLogin={handleLogin} />
          </Route>
          <ProtectedRoute
            exact
            path="/"
            component={Main}
            loggedIn={loggedIn}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onCardDelete={handleDeleteClick}
            onCardLike={handleCardLike}
            cards={cards}
          ></ProtectedRoute>
          <Route>
            {loggedIn ? <Redirect to="./" /> : <Redirect to="./sign-up" />}
          </Route>
        </Switch>
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          changeButtonName={buttonText}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onUpdatePlace={handleUpdatePlace}
          changeButtonName={buttonText}
        />
        <DeletePopup
          isOpen={isDeletePopup}
          onClose={closeAllPopups}
          changeButtonName={buttonText}
          handleDeleteSubmit={handleCardDelete}
          card={deletedCard}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          changeButtonName={buttonText}
        />
        <ImagePopup card={selectedCard} onClose={closeAllPopups}></ImagePopup>
        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          message={regMessage}
          access={access}
        ></InfoTooltip>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
