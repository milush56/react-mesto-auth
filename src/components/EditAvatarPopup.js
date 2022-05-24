import React from 'react';
import PopupWithForm from './PopupWithForm';


function EditAvatarPopup({isOpen, onClose, onUpdateAvatar, changeButtonName}) {
  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
  
    onUpdateAvatar(avatarRef.current.value);
  } 

  return (
    <PopupWithForm
    name ='avatar'
    title = 'Обновить аватар'
    buttonValue ={changeButtonName ? 'Сохранение...' : 'Сохранить'}
    isOpen={isOpen}
    onClose={onClose}
    onSubmit={handleSubmit}>
      <input
          type="url"
          className="popup__item popup__item_link"
          id="avatar"
          name="avatar"
          placeholder="Ссылка на картинку"
          required=""
          ref={avatarRef}
        />
        <span className="avatar-error popup__input-error">
          Вы пропустили это поле.
        </span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
