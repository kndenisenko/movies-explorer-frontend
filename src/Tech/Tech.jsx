import "./tech.css"

import React from "react"

function Tech() {
  console.log('Tech')

  return (
    <section className="tech">
      <h2 className="tech__header">Технологии</h2>
      <div className="tech__container">
        <h3 className="tech__container-header">7 технологий</h3>
        <p className="tech__container-text">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
      </div>
      <ul className="tech__list">
        <li className="tech__list-item"><a className="tech__list-link" href="a.com">HTML</a></li>
        <li className="tech__list-item"><a className="tech__list-link" href="a.com">CSS</a></li>
        <li className="tech__list-item"><a className="tech__list-link" href="a.com">JS</a></li>
        <li className="tech__list-item"><a className="tech__list-link" href="a.com">React</a></li>
        <li className="tech__list-item"><a className="tech__list-link" href="a.com">Git</a></li>
        <li className="tech__list-item"><a className="tech__list-link" href="a.com">Express.js</a></li>
        <li className="tech__list-item"><a className="tech__list-link" href="a.com">mongoDB</a></li>
      </ul>
    </section>
  );
}

export default Tech;