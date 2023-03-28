import "./login.css";

import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { pathes } from "../../utils/const";
// import logo from "../../images/logo.svg";

function Login({ handleLogin }) {
  // console.log("login");

  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");

  function inputEmail(event) {
    setEmail(event.target.value);
  }

  function inputpassword(event) {
    setpassword(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log(email, password);
    handleLogin(email, password);
  }



  return (
    <section className="login">
      <div className="login__container">
        <Link to={pathes.main} className="login__logo"></Link>
        <h1 className="login__header">Рады видеть!</h1>
        <form className="login__form" onSubmit={handleSubmit}>
          <p className="login__form-header">E-mail</p>
          <input
            className="login__input"
            type="text"
            placeholder="Введите E-mail"
            minLength="2"
            maxLength="40"
            required
            value={email}
            onChange={inputEmail}
          />

          <p className="login__form-header">Пароль</p>
          <input
            className="login__input"
            type="text"
            placeholder="Введите пароль"
            minLength="2"
            maxLength="40"
            required
            value={password}
            onChange={inputpassword}
          />

          <button className="login__button" type="submit">
            Войти
          </button>
        </form>
        <div className="login__bottom-container">
          <p className="login__bottom-container-text">Ещё не зарегистрированы?</p>
          <Link to={pathes.register} className="login__bottom-container-link">
            Регистрация
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Login;
