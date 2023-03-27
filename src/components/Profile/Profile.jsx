import "./profile.css";

import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { pathes } from "../../utils/const";
import { CurrentUserContext } from "../../utils/CurrentUserContext";
// import { useEffect } from "react";

function Profile({ onUpdateUser, handleSignOut, forceLogin }) {
  console.log("profile");
  const [name, setName] = React.useState("Виталий");
  const [email, setEmail] = React.useState("pochta@yandex.ru");
  const currentUser = React.useContext(CurrentUserContext);

  function inputName(event) {
    setName(event.target.value);
  }

  function inputEmail(event) {
    setEmail(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log(name, email);
    onUpdateUser({ name, email });
  }

  useEffect(() => {
    forceLogin();
  }, []);

  return (
    <section className="profile">
      <h1 className="profile__header">Привет, {name}!</h1>
      <form className="profile__form" onSubmit={handleSubmit}>
        <div className="profile__container">
          <p className="profile__container-name">Имя</p>
          <input
            className="profile__input"
            type="text"
            name="name"
            placeholder="Имя"
            minLength="2"
            maxLength="40"
            value={name}
            onChange={inputName}
            required
          />
        </div>

        <div className="profile__container">
          <p className="profile__container-name">E-mail</p>
          <input
            className="profile__input"
            type="text"
            name="email"
            placeholder="pochta@yandex.ru"
            minLength="2"
            maxLength="40"
            value={email}
            onChange={inputEmail}
            required
          />
        </div>

        <button className="profile__save-changes" type="submit">
          Редактировать
        </button>

        <Link to="/" className="profile__logout" onClick={handleSignOut}>
          Выйти из аккаунта
        </Link>
      </form>
    </section>
  );
}

export default Profile;
