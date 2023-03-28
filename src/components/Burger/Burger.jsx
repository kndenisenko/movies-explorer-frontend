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
      <Link
            to={pathes.main}
            className="burger__navigation-link"
            onClick={onClose}
          >Главная
          </Link>
          <Link
            to={pathes.movies}
            className="burger__navigation-link"
            onClick={onClose}
          >
            Фильмы
          </Link>
          <Link
            to={pathes.savedMovies}
            className="burger__navigation-link"
            onClick={onClose}
          >
            Сохранённые фильмы
          </Link>
        <Link
          className="burger__navigation-button"
          to={pathes.profile}
          onClick={onClose}
        >
        </Link>
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
