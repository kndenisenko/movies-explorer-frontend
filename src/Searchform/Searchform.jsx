import "./searchform.css";

import React from "react";
import { useEffect, useState } from "react";
import Switch from 'react-switch';

function Searchform({ findFilms, checkedToggle}) {
  // console.log('searchform-component');

  const [inputSearchForm, setinputSearchForm] = useState("");

  // Кнопка ios-style
  const [checked, setChecked] = useState(true);
  const iosToggleChange = nextChecked => {
    setChecked(nextChecked);
  }

  function setMovie(event) {
    findFilms(event.target.value);
    setinputSearchForm(event.target.value);
  }

  function handleSubmitSearchForm(event) {
    event.preventDefault();
    setinputSearchForm(inputSearchForm);
  }

  return (
      <section className="searchform">
        <form
          className="searchform__search"
          onSubmit={handleSubmitSearchForm}
        >
          <input className="searchform__search-form"
            type="text"
            placeholder="Фильм"
            // value=""
            onChange={setMovie}
          />
          <button className="searchform__search-button" type="submit"></button>
        </form>
          <div className="switch__container">
            <Switch
            className="react-switch"
            checked={checked}
            onClick={checkedToggle(checked)}
            onChange={iosToggleChange}
            onColor="#3DDC84"
            handleDiameter={24}
            uncheckedIcon={false}
            checkedIcon={false}
          />
          <p className="react-switch__name">Короткометражки</p>
        </div>
      </section>

  );
}

export default Searchform