import "./Header.css";

import React from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo.png";

import { pathes } from "../utils/settings"

function Header() {
  console.log('Header')

  return (
    <div className="header">
      <Link to={pathes.main}>
        <img className="header__logo" src={logo} alt="Логотип сайта" />
      </Link>
      <nav className="navy">
        <div className="navy__container">
          <Link to={pathes.register} className="navy__link" ><p className="navy__link_text">Регистрация</p></Link>
          <Link to={pathes.login} className="navy__link_button"><p className="navy__link_button_text">Войти</p></Link>
        </div>
      </nav>
    </div>
  );
}

export default Header;