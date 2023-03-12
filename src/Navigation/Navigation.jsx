import "./navigation.css"

import React from "react"

function Navigation() {
  console.log('navigation')

  return (
    <nav className="navigation">
      <ul className="navigation__list">
        <li className="navigation__list-item"><a className="navigation__list-link" href="google.com">О проекте</a></li>
        <li className="navigation__list-item"><a className="navigation__list-link" href="google.com">Технологии</a></li>
        <li className="navigation__list-item"><a className="navigation__list-link" href="google.com">Студент</a></li>
      </ul>
    </nav>
  );
}

export default Navigation;