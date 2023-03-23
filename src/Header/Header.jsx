import "./Header.css";

import { React, useState} from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../images/logo.png";
import user from "../images/user.png"
import Navigation from "../Burger/Burger";

import { pathes } from "../utils/settings"

function Header({ isUserLoggedIn}) {
  // console.log('Header')

  const [isBurger, setisBurger] = useState(false);

  const handleOpenBurgerMenu = () => {
    console.log('hoba')
    document.body.style.overflow = "hidden"; // отключаем прокрутку при открытии бургера
    setisBurger(true);
  };

  const handleCloseBurgerMenu = () => {
    document.body.style.overflow = "visible"; // включаем прокрутку при открытии бургера
    setisBurger(false);
  };

  return isUserLoggedIn ? (
    <>
      <header className="header__logged">
        <Link to={pathes.main}>
          <img className="header__logo" src={logo} alt="Логотип сайта" />
        </Link>
        <nav className="navy__logged">
          <NavLink to={pathes.movies} className="navy__logged_link"><p className="navy__logged_link_text">Фильмы</p></NavLink>

          <NavLink to={pathes.savedMovies} className="navy__logged_link"><p className="navy__logged_link_text">Сохранённые фильмы</p></NavLink>

        </nav>
          <Link className="header__account-button" to={pathes.profile}>
            <p className="header__account-button-text">Аккаунт</p>
            <img className="header__account-button-icon" src={user} alt="" />
          </Link>
          <button className="header__burger" onClick={handleOpenBurgerMenu}>
          </button>
          <Navigation isOpen={isBurger} onClose={handleCloseBurgerMenu} />
      </header>
    </>
  ): (
    <header className="header">
        <Link to={pathes.main}>
          <img className="header__logo" src={logo} alt="Логотип сайта" />
        </Link>
        <nav className="navy">
          <div className="navy__container">
            <NavLink to={pathes.register} className="navy__link" ><p className="navy__link_text">Регистрация</p></NavLink>
            <NavLink to={pathes.login} className="navy__link_button"><p className="navy__link_button_text">Войти</p></NavLink>
          </div>
        </nav>
      </header>
  );
}

export default Header;