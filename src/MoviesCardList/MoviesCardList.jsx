import "./moviesCardList.css";

import React, { useEffect } from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import MoreMovies from "../MoreMovies/MoreMovies";
import Preloader from "../Preloader/Preloader";

export default function MoviesCardList({
  // handleSaveMovie,
  // handleUnSaveMovie,
  recivedMovies,
  isLoading,
  counter,
  moreMovies,
  buttonMore,
  isSavedMoviesSection,
  isMainMoviesSection,
  savedMovies,
  token
}) {

  // console.log(isLoading);
  return isLoading ? (
    <>
      {}
      <section className="moviescardlist" aria-label="Фильмы">
        {recivedMovies.slice(0, counter).map((movie, i) => (
          <MoviesCard
            movie={movie}
            key={isSavedMoviesSection ? i : movie.id}
            isSavedMoviesSection={isSavedMoviesSection}
            isMainMoviesSection={isMainMoviesSection}
            savedMovies={savedMovies}
            token={token}
          />
        ))}
      </section>
      {moreMovies ? <MoreMovies onClick={buttonMore} /> : null}
    </>
   ) : null // (
  //   <Preloader />
  // );
}
