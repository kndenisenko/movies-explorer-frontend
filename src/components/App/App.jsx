import "./App.css";

// импорт компонентов react
import { React, useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../../utils/CurrentUserContext";

// Иммпорт глобальных переменных и JS-компонентов
import ProtectedRoute from "../../utils/ProtectedRoute.js";
import { Pathes, Urls } from "../../utils/const";
import * as Auth from "../../utils/Auth";
import { MainApi } from "../../utils/MainApi";
import { MoviesApi } from "../../utils/MoviesApi";
import { TrowUnauthorizedError } from "../../utils/TrowUnauthorizedError";

// импорт компонентов сайта
import Header from "../Header/Header";
import Main from "../Main/Main.jsx";
import Footer from "../Footer/Footer";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import NotFound from "../NotFound/NotFound";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";

function App() {
  const history = useNavigate();
  const url = "https://api.nomoreparties.co";

  // Константы пользователя
  // const [token, setToken] = useState("");
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [errorMessageReg, setErrorMessageReg] = useState("");
  const [errorMessageLog, setErrorMessageLog] = useState("");
  const [confirmMessage, setConfirmMessage] = useState(false);

  // Константы фильмов
  const [recivedMovies, setRecivedMovies] = useState([]);
  const [counter, setCounter] = useState(12);
  const [isLoading, setIsLoading] = useState(false);
  const [savedMovies, setSavedMovies] = useState([]);
  const [isSavedMoviesSection, setIsSavedMoviesSection] = useState(true);
  const [isMainMoviesSection, setIsMainMoviesSection] = useState(true);
  const [moreMovies, setMoreMovies] = useState(true);
  const [value, setValue] = useState("");

  const [copySavedMovies, setCopySavedMovies] = useState([]);
  const [checked, setChecked] = useState(false);

  // Определяем активные окна (пути)
  const windowMovies = window.location.pathname === "/movies";
  const windowReg = window.location.pathname === "/signin";
  const windowLog = window.location.pathname === "/signup";

  const [token, setToken] = useState("");

  function checkToken() {
    if (localStorage.getItem("jwt")) {
      const jwt = localStorage.getItem("jwt");
      setToken(jwt);
      Auth.token(jwt)
        .then((res) => {
          if (res) {
            setCurrentUser(res);
            setIsUserLoggedIn(true);
          }
        })
        .catch((err) => {
          // console.log("Ошибка checkToken", token);
          console.log(`Ошибка checkToken: ${err}`);
        });
    }
  }

  // всё в локалсторадж, всё в локалсторадж
  //подгрузка фильмов из апи яндекса, без распределения по ширине экрана
  useEffect(() => {
    if (!localStorage.getItem("recivedMovies")) {
      MoviesApi.getMovies()
        .then((res) => {
          setIsLoading(true);
          localStorage.setItem("recivedMovies", JSON.stringify(res));
          localStorage.setItem("lastFoundMovies", JSON.stringify(res));
        })
        .catch((err) =>
          console.log(`Ошибка загрузки фильмов (апи яндекса MoviesApi): ${err}`)
        );
    } else {
      setIsLoading(true);
      localStorage.getItem("valueMovies")
        ? setRecivedMovies(JSON.parse(localStorage.getItem("lastFoundMovies")))
        : setRecivedMovies(JSON.parse(localStorage.getItem("recivedMovies")));
    }
  }, [token]);

  // обработчик регистрации
  function handleRegister(name, email, password) {
    return Auth.registration(name, email, password)
      .then((res) => {
        setCurrentUser(res);
        history(`${Pathes.login}`); // вжух
      })
      .catch((error) => {
        console.log("Ошибка handleRegister:");
        setErrorMessage(error.message);
      });
  }

  // Обработчик логина
  function handleLogin(email, password) {
    return Auth.login(email, password)
      .then((data) => {
        if (data.token) {
          // console.log("handleLogin data", data);
          localStorage.setItem("jwt", data.token);
          setIsUserLoggedIn(true);
          setToken(data.token);
          history(`${Pathes.movies}`);
        }
      })
      .catch((error) => {
        console.log("Ошибка handleLogin:");
        setErrorMessage(error.message);
      });
  }

  // AAAAAAAAAAAAAAAAAAAA
  function onUpdateUseState() {
    setConfirmMessage(false);
    setErrorMessage("");
  }

  // Обращение к пользовательскому апи, не к яндексу
  // И в localstorage всё, всё туда
  useEffect(() => {
    checkToken(); // перенесли сюда из отдельного useEffect

    if (localStorage.getItem("lastFoundMovies")) {
      if (localStorage.getItem("shortfilms") && windowMovies) {
        setChecked(true);
        setRecivedMovies(JSON.parse(localStorage.getItem("shortfilms")));
      } else {
        setRecivedMovies(JSON.parse(localStorage.getItem("lastFoundMovies")));
      }
    } else {
      return;
    }

    localStorage.setItem("profileName", currentUser.name);
    localStorage.setItem("profileEmail", currentUser.email);

    if (token) {
      MainApi.getAllMovies(token)
        .then((res) => {
          const movie = Object.values(res).filter((item) => {
            return item.owner === currentUser.user_id ? item : null;
          });
          localStorage.setItem("savedMovies", JSON.stringify(movie));
          // console.log('MainApi.getAllMovies', res)  // добавлено для проверки res
          setSavedMovies(movie);
          setCopySavedMovies(movie);
        })
        .catch((err) =>
          console.log(`Ошибка загрузки фильмов (апи юзера MainApi): ${err}`)
        );
    }
  }, [token, windowMovies, currentUser.user_id]);

  function handleSignOut() {
    setIsUserLoggedIn(false);
    localStorage.removeItem("jwt");
    localStorage.clear();
    window.location.reload();
  }

  // Обновление данных юзера
  function handleUpdateUser(name, email) {
    if (token !== localStorage.getItem("jwt")) {
      throw new TrowUnauthorizedError("Ошибка токена");
    } else {
      MainApi.setUserInfo(name, email, token)
        .then((res) => {
          setCurrentUser(res);
          setConfirmMessage(true);
        })
        .catch((error) => {
          console.log(`Ошибка редактирования профиля: ${error}`);
          setErrorMessage("Пользователь с такой почтой уже существует");
        });
    }
  }

  function findFilms(value) {
    setValue(value);
    if (windowMovies) {
      if (!!localStorage.getItem("shortfilms")) {
        setChecked(true);
        const movie = Object.values(
          JSON.parse(localStorage.getItem("recivedMovies"))
        ).filter((item) => {
          return item.nameRU.toLowerCase().includes(value.toLowerCase())
            ? item
            : null;
        });
        const shortMovie = Object.values(movie).filter((item) => {
          return item.duration < 40 ? item : null;
        });
        setRecivedMovies(shortMovie);
        localStorage.setItem("shortfilms", JSON.stringify(shortMovie));
        localStorage.setItem("lastFoundMovies", JSON.stringify(movie));
      } else {
        const movie = Object.values(
          JSON.parse(localStorage.getItem("recivedMovies"))
        ).filter((item) => {
          return item.nameRU.toLowerCase().includes(value.toLowerCase())
            ? item
            : null;
        });
        setRecivedMovies(movie);
        localStorage.setItem("lastFoundMovies", JSON.stringify(movie));
      }
    } else {
      if (setChecked) {
        const movie = Object.values(
          JSON.parse(localStorage.getItem("savedMovies"))
        ).filter((item) => {
          return item.nameRU.toLowerCase().includes(value.toLowerCase())
            ? item
            : null;
        });
        const shortMovie = Object.values(movie).filter((item) => {
          return item.duration < 40 ? item : null;
        });
        setSavedMovies(shortMovie);
        setCopySavedMovies(movie);
      } else {
        const movie = Object.values(
          JSON.parse(localStorage.getItem("savedMovies"))
        ).filter((item) => {
          return item.nameRU.toLowerCase().includes(value.toLowerCase())
            ? item
            : null;
        });
        setSavedMovies(movie);
        setCopySavedMovies(movie);
      }
    }
  }

  function handleSaveMovie(movie) {
    // console.log('when save', movie)
    if (token) {
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
        // movie.id.toString(),
        movie.id.toString(),
        token
      )
        .then((newMovie) => {
          setSavedMovies([newMovie, ...savedMovies]);
        })
        .catch((err) => console.log(`Ошибка сохранения фильма: ${err}`));
    }
  }

  function handleUnSaveMovie(savedMovie) {
    // console.log('movie when delete', savedMovie);
    //     console.log('movie.id when delete', savedMovie.id);
    //     console.log('movie._id when delete', savedMovie._id);
    if (token) {
      // const id = savedMovie.id || savedMovie._id;
      MainApi.deleteMovie(savedMovie._id, token)
        .then(() => {
          setSavedMovies((state) =>
            state.filter((item) => {
              return item._id !== savedMovie._id;
            })
          );
        })
        .catch((err) => console.log(`Ошибка удаления фильма: ${err}`));
    }
  }

  //короткометражный переключатель
  useEffect(() => {
    if (windowMovies) {
      if (checked) {
        const movie = Object.values(recivedMovies).filter((item) => {
          return item.duration < 40 ? item : null;
        });
        setRecivedMovies(movie);
        localStorage.setItem("shortfilms", JSON.stringify(movie));
      } else {
        setRecivedMovies(JSON.parse(localStorage.getItem("lastFoundMovies")));
        setChecked(false);
        // localStorage.removeItem("shortfilms"); // вот тут могут быть проблемы может быть
      }
    } else {
      if (checked) {
        const movie = Object.values(savedMovies).filter((item) => {
          return item.duration < 40 ? item : null;
        });
        setSavedMovies(movie);
      } else {
        setSavedMovies(copySavedMovies);
        setChecked(false);
      }
    }
  }, [checked, windowMovies]);

  useEffect(() => {
    setErrorMessageReg("");
    setErrorMessageLog("");
  }, [windowReg, windowLog]);

  // обработка короткометражек
  function onClickHeaderMovies() {
    if (localStorage.getItem("shortfilms")) {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }
  const onClickHeaderSavedMovies = () => {
    setChecked(false);
    // console.log('clicked to saved')
    localStorage.removeItem("valueSavedMovies");
    localStorage.removeItem("shortfilms");
  };

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Routes>
          {/* главная страница */}
          <Route
            path={Pathes.main}
            element={
              <>
                <Header isUserLoggedIn={isUserLoggedIn} />
                <Main />
                <Footer />
              </>
            }
          />

          <Route
            path={Pathes.register}
            element={
              <Register
                handleRegister={handleRegister}
                isUserLoggedIn={isUserLoggedIn}
                history={history}
                errorMessage={errorMessage}
              />
            }
          />

          <Route
            path={Pathes.login}
            element={
              <Login
                handleLogin={handleLogin}
                isUserLoggedIn={isUserLoggedIn}
                history={history}
                errorMessage={errorMessage}
              />
            }
          />

          <Route
            path={Pathes.protectedProfile}
            element={
              <ProtectedRoute isUserLoggedIn={isUserLoggedIn} path="">
                <Header isUserLoggedIn={isUserLoggedIn} />
                <Profile
                  handleSignOut={handleSignOut}
                  onUpdateUser={handleUpdateUser}
                  onUpdateUseState={onUpdateUseState}
                />
              </ProtectedRoute>
            }
          />

          <Route
            path={Pathes.protectedMovies}
            element={
              <ProtectedRoute isUserLoggedIn={isUserLoggedIn} path="">
                <Header
                  isUserLoggedIn={isUserLoggedIn}
                  onClickHeaderSavedMovies={onClickHeaderSavedMovies}
                />
                <Movies
                  isLoading={isLoading}
                  recivedMovies={recivedMovies}
                  counter={counter}
                  moreMovies={moreMovies}
                  isSavedMoviesSection={isSavedMoviesSection}
                  isMainMoviesSection={isMainMoviesSection}
                  savedMovies={savedMovies}
                  setSavedMovies={setSavedMovies}
                  findFilms={findFilms}
                  token={token}
                  checked={checked}
                  setChecked={setChecked}
                  handleSaveMovie={handleSaveMovie}
                  handleUnSaveMovie={handleUnSaveMovie}
                  value={value}
                />
                <Footer />
              </ProtectedRoute>
            }
          />

          <Route
            path={Pathes.protectedSavedMovies}
            element={
              <ProtectedRoute isUserLoggedIn={isUserLoggedIn} path="">
                <Header
                  isUserLoggedIn={isUserLoggedIn}
                  onClickHeaderMovies={onClickHeaderMovies}
                />
                <SavedMovies
                  handleSaveMovie={handleSaveMovie} //
                  handleUnSaveMovie={handleUnSaveMovie} //
                  recivedMovies={savedMovies}
                  isLoading={isLoading}
                  isSavedMoviesSection={isSavedMoviesSection}
                  savedMovies={savedMovies}
                  findFilms={findFilms}
                  checked={checked}
                  setChecked={setChecked}
                />
                <Footer />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
