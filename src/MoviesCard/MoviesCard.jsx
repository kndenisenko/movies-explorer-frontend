import "./moviesCard.css";

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { urls } from "../utils/settings";
import { MainApi } from "../utils/MainApi";

export default function MoviesCard({
  movie,
  isSavedMoviesSection,
  isMainMoviesSection,
  savedMovies,
  token,
}) {
  const [isSaved, setIsSaved] = useState(false);
  const [savedMovie, setSavedMovie] = useState([]);
  const url = "https://api.nomoreparties.co/";
  const time =
    Math.floor(movie.duration / 60) +
    ":" +
    (movie.duration % 60 < 10
      ? "0" + (movie.duration % 60)
      : movie.duration % 60);

  // console.log(handleSaveMovie)

  function handleSaveMovie(movie) {
    // console.log('фильм сохранён: ', token, movie)
    MainApi.saveMovie(
      movie.country,
      movie.director,
      movie.duration,
      movie.year,
      movie.description,
      url + movie.image.url,
      movie.trailerLink,
      movie.nameRU,
      movie.nameEN,
      url + movie.image.url,
      movie.id,
      token
    )
      .then((newSavedMovie) => {
        setSavedMovie(newSavedMovie);
        setIsSaved(true);
      })
      .catch((err) =>
        console.log(`Ошибка сохранения фильма handleSaveMovie: ${err}`)
      );
  }

  function handleUnSaveMovie(savedMovie) {
    setIsSaved(false);
    // console.log('проверка savedMovie:', savedMovie);
    if (savedMovie && savedMovie._id) {
      // console.log('Удаление фильма:', savedMovie._id);
      MainApi.deleteMovie(savedMovie._id, token)
        .then((res) => {
          // console.log('Фильм удалён:', res);
        })
        .catch((err) =>
          console.log(`Ошибка удаления фильма unSaveMovie: ${err}`)
        );
    }
  }

  useEffect(() => {
    let found = false;
    savedMovies.forEach((item) => {
      if (
        (isMainMoviesSection && item.movieId === movie.id) ||
        (!isMainMoviesSection && item.movieId === movie.movieId)
      ) {
        setIsSaved(true);
        setSavedMovie(item);
        found = true;
      }
    });

    if (!found) {
      setIsSaved(false);
      setSavedMovie(null);
    }
  }, [savedMovies, isMainMoviesSection, movie.id, movie.movieId]);

  return (
    <>
      <div className="moviescard">
        <a href={movie.trailerLink} rel="noreferrer" target="_blank">
          <img
            className="moviescard__image"
            src={
              !isMainMoviesSection && isSavedMoviesSection
                ? movie.image
                : `${urls.superSecretUrl}/${movie.image.url}`
            }
            alt={movie.nameRU}
          />
        </a>

        <div className="moviescard__info">
          <p className="moviescard__title">{movie.nameRU}</p>
          {isMainMoviesSection && !isSaved ? (
            <button
              className="moviescard__save"
              onClick={() => handleSaveMovie(movie)}
            />
          ) : (
            <div
              className="moviescard__saved"
              onClick={(event) => handleUnSaveMovie(savedMovie)}
            />
          )}
        </div>
        <p className="moviescard__time">{time}</p>
      </div>
    </>
  );
}
