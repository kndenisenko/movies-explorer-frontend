// import "./SavedMovies";

// import React, { useState } from "react";
// import MoviesCardList from "../MoviesCardList/MoviesCardList";
// import SearchForm from "../Searchform/Searchform";

// export default function SavedMovies({
//   // handleSaveMovie,
//   // handleUnSaveMovie,
//   recivedMovies,
//   isLoading,
//   counter,
//   moreMovies,
//   buttonMore,
//   isSavedMoviesSection,
//   savedMovies,
//   findFilms,
//   checkedToggle,
//   token
// }) {
//   console.log(savedMovies)
//   return (
//     <>
//       <SearchForm
//         findFilms={findFilms}
//         checkedToggle={checkedToggle}
//       />

//       <MoviesCardList
//         // handleSaveMovie={handleSaveMovie}
//         // handleUnSaveMovie={handleUnSaveMovie}
//         // recivedMovies={recivedMovies}
//         isLoading={isLoading}
//         counter={counter}
//         moreMovies={moreMovies}
//         buttonMore={buttonMore}
//         isSavedMoviesSection={isSavedMoviesSection}
//         savedMovies={savedMovies}
//         token={token}
//       />
//     </>
//   );
// }

import "./SavedMovies";

import React, { useState } from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../Searchform/Searchform";

export default function SavedMovies({
  isLoading,
  counter,
  moreMovies,
  buttonMore,
  isSavedMoviesSection,
  savedMovies,
  findFilms,
  checkedToggle,
  token,
}) {
  console.log(savedMovies);

  return (
    <>
      <SearchForm findFilms={findFilms} checkedToggle={checkedToggle} />

      <MoviesCardList
        recivedMovies={savedMovies}
        isLoading={isLoading}
        counter={counter}
        moreMovies={moreMovies}
        buttonMore={buttonMore}
        isSavedMoviesSection={isSavedMoviesSection}
        savedMovies={savedMovies}
        token={token}
      />
    </>
  );
}
