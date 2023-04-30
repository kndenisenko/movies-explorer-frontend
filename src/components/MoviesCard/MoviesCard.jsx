import "./moviesCard.css";

import React, { useEffect, useState, useContext } from "react";
import { Urls } from "../../utils/const";
// import { CurrentUserContext } from "../../utils/CurrentUserContext";

export default function MoviesCard({
  movie,
  isMainMoviesSection,
  savedMovies,
  handleSaveMovie,
  handleUnSaveMovie,
  // movieId,
  isSavedMoviesPage,
}) {
  // const currentUser = useContext(CurrentUserContext);

  const [isSaved, setIsSaved] = useState(false);
  const [savedMovie, setSavedMovie] = useState([]);

  const movieId = movie.id;
  const mongoId = movie._id;
  const savedMovieData = savedMovies.find(
    (savedMovie) => savedMovie.movieId === movieId
  );

  const url = "https://api.nomoreparties.co/";

  const time =
    Math.floor(movie.duration / 60) +
    ":" +
    (movie.duration % 60 < 10
      ? "0" + (movie.duration % 60)
      : movie.duration % 60);

  function saveMovie(e) {
    handleSaveMovie(movie);
    setIsSaved(true);
  }

  function unSaveMovie() {
    if (isSaved && savedMovieData) {
      handleUnSaveMovie({ ...movie, _id: savedMovieData._id });
    } else {
      handleUnSaveMovie(movie);
    }
  }

  // дополнительная проверка для статуса фильма
  useEffect(() => {
    const isMovieSaved = savedMovies.some(
      (savedMovie) => savedMovie.movieId === movie.id
    );
    setIsSaved(isMovieSaved);
    if (isMovieSaved) {
      setSavedMovie(savedMovies.find((item) => item.movieId === movie.movieId));
    }
  }, [movie, savedMovies, isMainMoviesSection]);

  useEffect(() => {
    isMainMoviesSection
      ? savedMovies.map((item) => {
          const isMovieSaved = savedMovies.some(
            (savedMovie) => savedMovie.movieId === movie.id
          );
          setIsSaved(isMovieSaved);
          if (item.movieId === movie.movieid) {
            setIsSaved(true);
            setSavedMovie(item);
          }
          return item;
        })
      : savedMovies.map((item) => {
          if (item.movieId === movie.movieId) {
            setIsSaved(true);
            setSavedMovie(item);
          }
          return item;
        });
  }, [movie, savedMovies, isMainMoviesSection, isSaved]);

  return (
    <>
      <div className="moviescard">
        <a href={movie.trailerLink} rel="noreferrer" target="_blank">
          <img
            className="moviescard__image"
            src={movie.image.url ? `${url}/${movie.image.url}` : movie.image}
            alt={movie.nameRU}
          />
        </a>

        <div className="moviescard__info">
          <p className="moviescard__title">{movie.nameRU}</p>
          {isSaved ? (
            <button className="moviescard__saved" onClick={unSaveMovie} />
          ) : (
            <button className="moviescard__save" onClick={saveMovie} />
          )}
        </div>
        <p className="moviescard__time">{time}</p>
      </div>
    </>
  );
}
