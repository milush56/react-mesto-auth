import React, { useState } from "react";

function Login({ onLogin }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let { email, password } = formData;
    onLogin({ email, password });
  };

  return (
    <div className="login">
      <h2 className="login__title">Вход</h2>
      <form className="login__form" onSubmit={handleSubmit}>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          className="login__item"
          required=""
          onChange={handleChange}
          value={formData.email}
        ></input>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Пароль"
          className="login__item"
          required=""
          onChange={handleChange}
          value={formData.password}
        ></input>
        <button type="submit" aria-label="Войти" className="login__button">
          Войти
        </button>
      </form>
    </div>
  );
}

export default Login;
