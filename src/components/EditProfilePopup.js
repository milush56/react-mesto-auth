import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';


function EditProfilePopup({isOpen, onClose, onUpdateUser, changeButtonName}) {
  const[name, setName] = React.useState('');
  const[description, setDescription ] = React.useState('');
  const currentUser = React.useContext(CurrentUserContext);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
  
    onUpdateUser(name, description);
  } 

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]); 

  return (
    <PopupWithForm
    name ='profile'
    title = 'Редактировать профиль'
    buttonValue ={changeButtonName ? 'Сохранение...' : 'Сохранить'}
    isOpen={isOpen}
    onClose={onClose}
    onSubmit={handleSubmit}>    
      <input
          type="text"
          className="popup__item popup__item_name"
          id="name"
          name="name"
          placeholder="Ваше имя"
          minLength={2}
          maxLength={40}
          required=""
          value={name}
          onChange={handleNameChange}
        />
        <span className="name-error popup__input-error">
          Вы пропустили это поле.
        </span>
        <input
          type="text"
          className="popup__item popup__item_post"
          id="post"
          name="about"
          placeholder="Должность"
          minLength={2}
          maxLength={200}
          required=""
          value={description}
          onChange={handleDescriptionChange}
        />
        <span className="post-error popup__input-error" />
    </PopupWithForm>
  );
}

export default EditProfilePopup;