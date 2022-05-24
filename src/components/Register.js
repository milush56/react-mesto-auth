import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Register({onRegister}) {
  const [formData, setFormData]= useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let { email, password } = formData;
      onRegister({ email, password }).catch(err => {
        console.log(err);
  });
};

  return (
      <div className="register">
        <h2 className="register__title">Регистрация</h2>
        <form className="register__form" onSubmit={handleSubmit}>
            <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            className="register__item"
            required=""
            onChange={handleChange}
            value={formData.email}>
            </input>
            <input
            type="password"
            id="password"
            name="password"
            placeholder="Пароль"
            className="register__item"
            required=""
            onChange={handleChange}
            value={formData.password}>
            </input>
            <button type="submit" aria-label="Зарегистрироваться" className="register__button">Зарегистрироваться</button>
        </form>
        <div className="register__signup">
          <p className="register__check-text">Уже зарегистрированы?</p>
          <Link to="/sign-in" className="register__login-link">Войти</Link>
        </div>
      </div>
  );
}

export default Register;