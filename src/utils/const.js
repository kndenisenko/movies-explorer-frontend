// какие-то стандартные настройки, которые импортируются по мере надобности

// список путей сайта
const pathes = {
  main: "/",
  movies: "/movies",
  protectedMovies: "/movies/*",
  savedMovies: "/saved-movies",
  protectedSavedMovies: "/saved-movies/*",
  profile: "/profile",
  protectedProfile: "/profile/*",
  register: "/register",
  login: "/login",
};

const urls = {
  superSecretUrl: "https://api.nomoreparties.co",
  myapi: "https://api.badass.nomoredomains.club",
  myapidev: "http://localhost:3001",
};

export { pathes, urls };
