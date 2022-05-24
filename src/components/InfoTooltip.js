import React from 'react';
import done from '../images/done.svg';
import repeat from '../images/repeat.svg';

function InfoTooltip({isOpen, onClose, message, access}) {
  return (
    <div className={`popup info-popup ${isOpen ? 'popup_opened' : ''}`}>
    <div className="info-popup__container">
      <button
        type="button"
        aria-label="закрыть"
        className="info-popup__close popup__close"
        onClick={onClose}
      />
      <img className="info-popup__image" src={`${access ? done : repeat}`} />
      <h2 className="info-popup__title">{message}</h2>
    </div>
  </div>
  );
}

export default InfoTooltip;
