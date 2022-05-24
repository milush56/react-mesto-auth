import React from 'react';

function ImagePopup({card, onClose}) {
  return (
    <div className={`popup image-popup ${card.isOpen ? 'popup_opened' : ''}`}>
    <div className="image-popup__container">
      <button
        type="button"
        aria-label="закрыть"
        className="image-popup__close popup__close"
        onClick={onClose}
      />
      <img className="image-popup__image" alt={card.name} src={card.link} />
      <h2 className="image-popup__title">{card.name}</h2>
    </div>
  </div>
  );
}

export default ImagePopup;
