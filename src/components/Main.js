import React from "react";
import pen from "../images/pen.svg";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  cards,
  onCardLike,
  onCardDelete,
}) {
  const userContext = React.useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile">
        <div className="profile__info">
          <div className="profile__avatar-container">
            <img
              className="profile__avatar"
              alt="аватар"
              src={userContext.avatar}
            />
            <img
              className="profile__avatar-edit"
              alt="перо"
              src={pen}
              onClick={onEditAvatar}
            />
          </div>
          <h1 className="profile__title">{userContext.name}</h1>
          <p className="profile__subtitle">{userContext.about}</p>
          <button
            className="profile__edit-button"
            type="button"
            aria-label="редактировать"
            onClick={onEditProfile}
          />
        </div>
        <button
          className="profile__add-button"
          type="button"
          aria-label="добавить"
          onClick={onAddPlace}
        />
      </section>
      <section className="elements">
        <ul className="elements__container">
          {cards.map((card) => (
            <Card
              card={card}
              key={card._id}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            ></Card>
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
