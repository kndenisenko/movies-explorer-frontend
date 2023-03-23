import "./tech.css";

import React from "react";

function Tech() {
  // console.log('Tech')

  return (
    <section className="tech" id="tech">
      <h2 className="tech__header">Технологии</h2>
      <div className="tech__container">
        <h3 className="tech__container-header">7 технологий</h3>
        <p className="tech__container-text">
          На курсе веб-разработки мы освоили технологии, которые применили в
          дипломном проекте.
        </p>
      </div>
      <ul className="tech__list">
        <li className="tech__list-item">
          <a
            className="tech__list-link"
            href="https://developer.mozilla.org/ru/docs/Learn/Getting_started_with_the_web/HTML_basics"
          >
            HTML
          </a>
        </li>
        <li className="tech__list-item">
          <a
            className="tech__list-link"
            href="https://developer.mozilla.org/ru/docs/Learn/Getting_started_with_the_web/CSS_basics"
          >
            CSS
          </a>
        </li>
        <li className="tech__list-item">
          <a className="tech__list-link" href="https://learn.javascript.ru/">
            JS
          </a>
        </li>
        <li className="tech__list-item">
          <a
            className="tech__list-link"
            href="https://doka.guide/tools/react-and-alternatives/"
          >
            React
          </a>
        </li>
        <li className="tech__list-item">
          <a
            className="tech__list-link"
            href="https://developer.mozilla.org/ru/docs/Learn/Tools_and_testing/GitHub"
          >
            Git
          </a>
        </li>
        <li className="tech__list-item">
          <a
            className="tech__list-link"
            href="https://developer.mozilla.org/ru/docs/Learn/Server-side/Express_Nodejs"
          >
            Express.js
          </a>
        </li>
        <li className="tech__list-item">
          <a className="tech__list-link" href="https://www.mongodb.com/">
            mongoDB
          </a>
        </li>
      </ul>
    </section>
  );
}

export default Tech;
