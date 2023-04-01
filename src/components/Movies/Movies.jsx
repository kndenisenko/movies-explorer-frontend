import "./movies.css";

// Компоненты блока с фильмами
import Searchform from "../Searchform/Searchform";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
// import { useState } from "react";

function Movies({
  recivedMovies,
  isLoading,
  counter,
  moreMovies,
  isSavedMoviesSection,
  isMainMoviesSection,
  savedMovies,
  findFilms,
  checked,
  setChecked,
  handleSaveMovie,
  handleUnSaveMovie,
  value,
  loadMoreMovies,
}) {
  return (
    <>
      <Searchform
        findFilms={findFilms}
        checked={checked}
        setChecked={setChecked}
        recivedMovies={recivedMovies}
      />

      {recivedMovies ? (
        recivedMovies.length === 0 ? null : (
          <MoviesCardList
            handleSaveMovie={handleSaveMovie} //
            handleUnSaveMovie={handleUnSaveMovie} //
            isLoading={isLoading} //
            moreMovies={moreMovies} //
            recivedMovies={recivedMovies} //
            counter={counter}
            isSavedMoviesSection={isSavedMoviesSection}
            isMainMoviesSection={isMainMoviesSection}
            savedMovies={savedMovies}
            value={value}
            loadMoreMovies={loadMoreMovies}
          />
        )
      ) : null}
    </>
  );
}

export default Movies;
