import "./student.css"
import photo from "../images/photo.png"
import hoba from "../images/hoba.png"

import React from "react"

function Student() {
  // console.log('student')

  return (
    <section className="student" id="student">
      <h2 className="student__header">Студент</h2>
      <div className="student__info">
        <div className="student__info-container">
          <h3 className="student__info-name">Виталий</h3>
          <p className="student__info-status">Фронтенд-разработчик, 30 лет</p>
          <p className="student__info-bio">Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
        </div>
        <a className="student__info-whoops" href="https://github.com/kndenisenko/">Github</a>
        <img className="student__info-photo" src={photo} alt="Фото автора этого сайта/ Наверное" />
      </div>
      <div className="student__portfolio">
        <h3 className="student__portfolio-header">Портфолио</h3>
        <ul className="student__portfolio-list">
          <li className="student__portfolio-list-item"><a className="student__portfolio-list-link" href="https://probaland.ru/static/">Статичный сайт</a></li>
          <li className="student__portfolio-list-item"><a className="student__portfolio-list-link" href="https://probaland.ru/adaptive/">Адаптивный сайт</a></li>
          <li className="student__portfolio-list-item"><a className="student__portfolio-list-link" href="https://badass.students.nomoredomains.club">Одностраничное приложение</a></li>
        </ul>
      </div>
    </section>
  );
}

export default Student;