import "./SavedMovies";

import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../Searchform/Searchform";

export default function SavedMovies({
  handleSaveMovie,
  handleUnSaveMovie,
  recivedMovies,
  isLoading,
  isSavedMoviesSection,
  savedMovies,
  findFilms,
  checked,
  setChecked,
}) {
  // console.log('savedMovies', savedMovies);

  return (
    <>
      <SearchForm
        findFilms={findFilms}
        checked={checked}
        setChecked={setChecked}
        recivedMovies={recivedMovies}
      />

      {recivedMovies.length === 0 ? null : (
        <MoviesCardList
          handleSaveMovie={handleSaveMovie}
          handleUnSaveMovie={handleUnSaveMovie}
          recivedMovies={recivedMovies}
          isLoading={isLoading}
          isSavedMoviesSection={isSavedMoviesSection}
          savedMovies={savedMovies}
        />
      )}
    </>
  );
}
