import "./footer.css";

import React from "react";

function Footer() {
  // console.log('Footer')

  return (
    <section className="footer">
      <p className="footer__text">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </p>
      <p className="footer__copywright">&#169; 2023</p>
      <nav className="footer__navy">
        <a className="footer__navy-link" href="https://practicum.yandex.ru/">
          Яндекс.Практикум
        </a>
        <a className="footer__navy-link" href="https://github.com/">
          GitHub
        </a>
      </nav>
    </section>
  );
}

export default Footer;
