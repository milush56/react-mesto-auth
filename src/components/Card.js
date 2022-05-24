import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({card, onCardClick, onCardLike, onCardDelete}) {

  const userContext = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === userContext._id;
  const cardDeleteButtonClassName = (
    `element__delete ${isOwn ? 'element__delete_visible' : 'element__delete_hidden'}`
  );
  const isLiked = card.likes.some(i => i._id === userContext._id);
  const cardLikeButtonClassName = (
    `element__like ${isLiked ? 'element__like_active' : 'element__like'}`
  ); 

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <CurrentUserContext.Provider value={userContext}>
    <li className="element">
    <button type="button" aria-label="удалить-карточку" className={cardDeleteButtonClassName} onClick={handleDeleteClick}></button>
    <img src={card.link} alt={card.name} className="element__image" onClick={handleClick}/>
    <div className="element__name-container">
      <h2 className="element__place-name">{card.name}</h2>
      <div className="element__like-container">
        <button className={cardLikeButtonClassName} type="button" aria-label="лайк" onClick={handleLikeClick}></button>
        <span className="element__like-counter">{card.likes.length}</span>
      </div>
    </div>
  </li>
  </CurrentUserContext.Provider>
  );
}

export default Card;
