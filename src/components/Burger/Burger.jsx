import "./burger.css";

import { React } from "react";
import { Link } from "react-router-dom";
import user from "../../images/user.svg";

import { pathes } from "../../utils/const";

function Burger({ isOpen, onClose }) {
  return (
    <section
      className={`burger__navigation ${isOpen && "burger__navigation-enable"}`}
    >
      <div className="burger__navigation-container">
        <div className="burger__navigation-links-container">
          <Link
            to={pathes.main}
            className="burger__navigation-link"
            onClick={onClose}
          >
            Главная
          </Link>
          <div className="burger__navigation-underline"></div>
        </div>
        <div className="burger__navigation-links-container">
          <Link
            to={pathes.movies}
            className="burger__navigation-link"
            onClick={onClose}
          >
            Фильмы
          </Link>
          <div className="burger__navigation-underline"></div>
        </div>
        <div className="burger__navigation-links-container">
          <Link
            to={pathes.savedMovies}
            className="burger__navigation-link"
            onClick={onClose}
          >
            Сохранённые фильмы
          </Link>
          <div className="burger__navigation-underline"></div>
        </div>
        <Link
          className="burger__navigation-button"
          to={pathes.profile}
          onClick={onClose}
        >
          <p className="burger__navigation-button-text">Аккаунт</p>
          <img className="burger__navigation-button-icon" src={user} alt="Иконка навигации-бургера" />
        </Link>
        <button
          className="burger__navigation-close-button"
          onClick={onClose}
        ></button>
      </div>
    </section>
  );
}

export default Burger;
