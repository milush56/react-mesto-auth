import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onUpdatePlace, changeButtonName }) {
  const [place, setPlace] = React.useState("");
  const [link, setLink] = React.useState("");

  function handlePlaceChange(e) {
    setPlace(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onUpdatePlace(place, link);
  }

  return (
    <PopupWithForm
      name="mesto"
      title="Новое место"
      buttonValue={changeButtonName ? "Сохранение..." : "Создать"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        className="popup__item popup__item_name-image"
        id="name-image"
        name="name"
        placeholder="Название"
        minLength={2}
        maxLength={30}
        required=""
        value={place}
        onChange={handlePlaceChange}
      />
      <span className="name-image-error popup__input-error">
        Вы пропустили это поле.
      </span>
      <input
        type="url"
        className="popup__item popup__item_link"
        id="link-image"
        name="link"
        placeholder="Ссылка на картинку"
        required=""
        value={link}
        onChange={handleLinkChange}
      />
      <span className="link-image-error popup__input-error">
        Вы пропустили это поле.
      </span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
