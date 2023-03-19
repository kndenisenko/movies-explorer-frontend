import "./register.css";

import { React, useState } from "react";
import { Link } from "react-router-dom";
import { pathes } from "../utils/settings";
// import logo from "../images/logo.png";

function Register({ handleRegister, errorMessage }) {
  console.log('Register')
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");

  function inputName(event) {
    setName(event.target.value);
  }

  function inputEmail(event) {
    setEmail(event.target.value);
  }

  function inputpassword(event) {
    setpassword(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    handleRegister(name, email, password);
    console.log(name, email, password);
  }

  return (
    <section className="register">
      <div className="register__container">
        <Link to={pathes.main} className="register__logo"></Link>
        <h1 className="register__header">Добро пожаловать!</h1>
        <form className="register__form">
          <p className="register__form-header">Имя</p>
          <input
            className="register__input"
            type="text"
            placeholder="Введите имя"
            minLength="2"
            maxLength="40"
            required
            value={name}
          onChange={inputName}
          />

          <p className="register__form-header">E-mail</p>
          <input
            className="register__input"
            type="text"
            placeholder="Введите E-mail"
            minLength="2"
            maxLength="40"
            required
            value={email}
          onChange={inputEmail}
          />

          <p className="register__form-header">Пароль</p>
          <input
            className="register__input"
            type="text"
            placeholder="Введите пароль"
            minLength="2"
            maxLength="40"
            required
            value={password}
          onChange={inputpassword}
          />

          <span className="register__error">{errorMessage}</span>

          <button className="register__button" type="submit">Зарегистрироваться</button>
        </form>
        <div className="register__bottom-container">
        <p className="register__bottom-container-text">Уже зарегистрированы?</p>
        <Link to={pathes.login} className="register__bottom-container-link">Войти</Link>
      </div>
      </div>
    </section>

  );
}

export default Register