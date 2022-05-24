import React from 'react';
import PopupWithForm from './PopupWithForm';


function DeletePopup({isOpen, onClose, changeButtonName, handleDeleteSubmit, card}) {

  function handleSubmit(e) {
    e.preventDefault();

    handleDeleteSubmit(card);
  
  }  

  return (
    <PopupWithForm
      name ='delete'
      title = 'Вы уверены?'
      buttonValue ={changeButtonName ? 'Сохранение...' : 'ДА!'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      >
      </PopupWithForm>
  );
}

export default DeletePopup;
