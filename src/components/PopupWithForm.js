import React from "react";

function PopupWithForm({
  name,
  title,
  buttonValue,
  children,
  isOpen,
  onClose,
  onSubmit,
}) {
  return (
    <div className={`popup popup-${name} ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <h2 className="popup__title">{title}</h2>
        <form name={name} id={name} className="popup__form" onSubmit={onSubmit}>
          <button
            type="button"
            aria-label="закрыть"
            className={`popup__close popup-${name}__close`}
            onClick={onClose}
          />
          <fieldset className="popup__input-container">
            {children}
            <button
              type="submit"
              className={`popup__button popup-${name}__save`}
              value={buttonValue}
              aria-label={buttonValue}
            >
              {buttonValue}
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
