import "./searchform.css";

import { React, useEffect, useState } from "react";
import Switch from "react-switch";
import { useForm } from "react-hook-form";
import { check } from "prettier";

function Searchform({
  findFilms,
  checkedToggle,
  allMoviesFromYandexApi,
  activateShortFilmsToggle,
  shortfilmsSwitch,
}) {
  const windowMovies = window.location.pathname === "/movies";

  const [checked, setChecked] = useState(JSON.parse(localStorage.getItem("switchStatus")));
  const [isIosToggleActive, setisIosToggleActive] = useState(JSON.parse(localStorage.getItem("switchStatus")));


  // 🩼 для работы 🩼-переключателя
  const iosToggleChange = (nextChecked) => {
    setisIosToggleActive(!isIosToggleActive);
    activateShortFilmsToggle(!isIosToggleActive);

    localStorage.setItem("switchStatus", JSON.stringify(nextChecked));

    if (nextChecked === false) {
      localStorage.removeItem("shortfilms")
    }

    setChecked(nextChecked);
    setChecked(nextChecked);

setChecked(nextChecked);

};

// console.log(localStorage.getItem("switchStatus"))
// console.log(isIosToggleActive)

useEffect(() => {
  if (localStorage.getItem("switchStatus") === null) {
    localStorage.setItem("switchStatus", false);
  }
}, []);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    defaultValues: {
      inputFindMovie: windowMovies ? localStorage.getItem("valueMovies") : null,
    },
  });
  const inputFindMovieValue = watch(
    windowMovies ? "inputFindMovie" : "inputFindSavedMovie"
  );

  function onSubmit() {
    findFilms(inputFindMovieValue);
    // windowMovies
    //   ? localStorage.setItem("valueMovies", inputFindMovieValue)
    //   : localStorage.setItem("valueSavedMovies", inputFindMovieValue);
  }

  // console.log(inputFindMovieValue)

  return (
    <section className="searchform">
      <form className="searchform__search" onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register(
            windowMovies ? "inputFindMovie" : "inputFindSavedMovie",
            {
              required: "Нужно ввести ключевое слово",
            }
          )}
          className="searchform__search-form"
          type="text"
          placeholder="Фильм"
        />
        <button className="searchform__search-button" type="submit"></button>
      </form>
      <div className="switch__container">
        <Switch
          className="react-switch"
          checked={checked}
          onClick={checkedToggle}
          onChange={iosToggleChange}
          onColor="#3DDC84"
          height={20}
          width={36}
          handleDiameter={16}
          uncheckedIcon={false}
          checkedIcon={false}
        />
        <p className="react-switch__name">Короткометражки</p>
      </div>
      {windowMovies
        ? errors?.inputFindMovie && (
            <p className="searchform__errors">Нужно ввести ключевое слово</p>
          )
        : errors?.inputFindSavedMovie && (
            <p className="searchform__errors">Нужно ввести ключевое слово</p>
          )}
      {allMoviesFromYandexApi
        ? allMoviesFromYandexApi.length === 0 && (
            <p className="searchform__errors">Ничего не найдено</p>
          )
        : null}
    </section>
  );
}

export default Searchform;
