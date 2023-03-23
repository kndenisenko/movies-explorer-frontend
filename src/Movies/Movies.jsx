import "./movies.css";

import React from "react";

// Компоненты блока с фильмами
import Searchform from "../Searchform/Searchform";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function Movies({
  handleSaveMovie,
  handleUnSaveMovie,
  recivedMovies,
  isLoading,
  counter,
  moreMovies,
  buttonMore,
  isSavedMoviesSection,
  isMainMoviesSection,
  savedMovies,
  findFilms,
  checkedToggle,
  token
}) {
  // console.log('Movies');


  return (
    <>
      <Searchform
        findFilms={findFilms}
        checkedToggle={checkedToggle}
      />

      <MoviesCardList
        // handleSaveMovie={handleSaveMovie}
        // handleUnSaveMovie={handleUnSaveMovie}
        recivedMovies={recivedMovies}
        isLoading={isLoading}
        counter={counter}
        moreMovies={moreMovies}
        buttonMore={buttonMore}
        isSavedMoviesSection={isSavedMoviesSection}
        isMainMoviesSection={isMainMoviesSection}
        savedMovies={savedMovies}
        token={token}
      />

    </>
  );
}

export default Movies