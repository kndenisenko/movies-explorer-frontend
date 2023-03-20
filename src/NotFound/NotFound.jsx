import "./NotFound.css";

import React from "react";
import { Link } from "react-router-dom";
import { pathes } from "../utils/settings";

function NotFound() {
  console.log('Error-404')

  return (
    <section className="not-found">
      <h1 className="not-found__header">404</h1>
      <p className="not-found__text">Страница не найдена</p>
      <Link to={pathes.main} className="not-found__link">Назад</Link>
    </section>
  );
}

export default NotFound