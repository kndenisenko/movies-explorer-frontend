import "./searchform.css";

import React from "react";
import Switch from "react-switch";
import { useForm } from "react-hook-form";

function Searchform({
  findFilms,
  checkedToggle,
  checked,
  setChecked,
  recivedMovies }) {

    // 🩼 для работы 🩼-переключателя
    const iosToggleChange = (nextChecked) => {
      setChecked(nextChecked);
    };

  const windowMovies = window.location.pathname === "/movies";
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
    windowMovies
      ? localStorage.setItem("valueMovies", inputFindMovieValue)
      : localStorage.setItem("valueSavedMovies", inputFindMovieValue);
  }


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
      {recivedMovies
        ? recivedMovies.length === 0 && (
            <p className="searchform__errors">Ничего не найдено</p>
          )
        : null}
    </section>
  );
}

export default Searchform;
