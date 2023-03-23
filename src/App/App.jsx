import "./App.css";

// импорт компонентов react
import { React, useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../utils/CurrentUserContext";

// Иммпорт глобальных переменных и JS-компонентов
import ProtectedRoute from "../utils/ProtectedRoute.js";
import { pathes, urls } from "../utils/settings";
import * as Auth from "../utils/Auth";
import { MainApi } from "../utils/MainApi";
import { MoviesApi } from "../utils/MoviesApi";

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
import Preloader from "../Preloader/Preloader";

function App() {
  const history = useNavigate();
  const innerWidth = window.innerWidth; // определяем ширину
  const url = "https://api.nomoreparties.co";

  // Константы пользователя
  // const [token, setToken] = useState("");
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  // Константы фильмов
  const [recivedMovies, setRecivedMovies] = useState([]);
  const [counter, setCounter] = useState(12);
  const [isLoading, setIsLoading] = useState(false);
  const [savedMovies, setSavedMovies] = useState([]);
  const [isSavedMoviesSection, setIsSavedMoviesSection] = useState(true);
  const [isMainMoviesSection, setIsMainMoviesSection] = useState(true);
  const [moreMovies, setMoreMovies] = useState(true);

  const [copySavedMovies, setCopySavedMovies] = useState([]);
  const [copyRecivedMovies, setCopyRecivedMovies] = useState([]);
  const [isToggleActiveMovies, setIsToggleActiveMovies] = useState([]);

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
          console.log("token when error", token);
          console.log(`Ошибка checkToken: ${err}`);
        });
    }
  }

  // обработчик регистрации
  function handleRegister(name, email, password) {
    return Auth.registration(name, email, password)
      .then((res) => {
        setCurrentUser(res);
        history(`${pathes.login}`); // вжух
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
          console.log("handleLogin data", data);
          localStorage.setItem("jwt", data.token);
          setIsUserLoggedIn(true);
          setToken(data.token);
          history(`${pathes.movies}`);
        }
      })
      .catch((error) => {
        console.log("Ошибка handleLogin:");
        setErrorMessage(error.message);
      });
  }

  useEffect(() => {
    checkToken();
  }, []);

  // подгрузки фильмов и распределение количества в зависимости от ширины
  useEffect(() => {
    MoviesApi.getMovies()
      .then((res) => {
        setRecivedMovies(res);
        const copy = Object.assign([], res);
        setCopyRecivedMovies(copy);
        setIsToggleActiveMovies(copy);
        setIsLoading(true);
        if (innerWidth > 1280 && innerWidth > 769) {
          setCounter(12);
        } else if (innerWidth <= 768 && innerWidth > 321) {
          setCounter(8);
        } else if (innerWidth <= 320) {
          setCounter(5);
        }
      })
      .catch((err) =>
        console.log(`Ошибка загрузки фильмов (апи яндекса MoviesApi): ${err}`)
      );
  }, [innerWidth]);

  // GET MOAR
  function buttonMore() {
    if (window.innerWidth >= 1140) {
      setCounter(counter + 3);
      if (counter >= recivedMovies.length) {
        setMoreMovies(false);
      }
    } else if (window.innerWidth <= 1140 && window.innerWidth >= 768) {
      setCounter(counter + 2);
      if (counter >= recivedMovies.length) {
        setMoreMovies(false);
      }
    } else if (window.innerWidth <= 765) {
      setCounter(counter + 1);
      if (counter >= recivedMovies.length) {
        setMoreMovies(false);
      }
    }
  }
  // Обращение к пользовательскому апи, не к яндексу
  useEffect(() => {
    if (token) {
      MainApi.getAllMovies(token)
        .then((res) => {
          // console.log('так тебя растак');
          setSavedMovies(res);
          const copy = Object.assign([], res);
          setCopySavedMovies(copy);
          if (innerWidth > 1280 && innerWidth > 769) {
            setCounter(12);
          } else if (innerWidth <= 768 && innerWidth > 321) {
            setCounter(8);
          } else if (innerWidth <= 320) {
            setCounter(5);
          }
        })
        .catch((err) =>
          console.log(`Ошибка загрузки фильмов (апи юзера MainApi): ${err}`)
        );
    }
  }, [innerWidth, token]);

  function handleSignOut() {
    setIsUserLoggedIn(false);
    localStorage.removeItem("jwt");
  }

  function findFilms(inputSearchForm) {
    console.log("findFilms", inputSearchForm);
  }

  function onUpdateUser(name, email) {
    console.log("onUpdateUser", name, email);
  }

  function checkedToggle(isToggleActive) {
    console.log("toggle state is:", isToggleActive);
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Routes>
          {/* главная страница */}
          <Route
            path={pathes.main}
            element={
              <>
                <Header isUserLoggedIn={isUserLoggedIn} />
                <Main />
                <Footer />
              </>
            }
          />

          <Route
            path={pathes.register}
            element={
              <Register
                handleRegister={handleRegister}
                errorMessage={errorMessage}
              />
            }
          />

          <Route
            path={pathes.login}
            element={<Login handleLogin={handleLogin} />}
          />

          <Route
            path={pathes.profile}
            element={
              <>
                <Header isUserLoggedIn={isUserLoggedIn} />
                <Profile
                  handleSignOut={handleSignOut}
                  onUpdateUser={onUpdateUser}
                />
              </>
            }
          />

          <Route
            path={pathes.movies}
            element={
              <>
                <Header isUserLoggedIn={isUserLoggedIn} />
                <Movies
                  isLoading={isLoading}
                  recivedMovies={recivedMovies}
                  counter={counter}
                  moreMovies={moreMovies}
                  buttonMore={buttonMore}
                  isSavedMoviesSection={isSavedMoviesSection}
                  isMainMoviesSection={isMainMoviesSection}
                  savedMovies={savedMovies}
                  findFilms={findFilms}
                  checkedToggle={checkedToggle}
                  token={token}
                />
                <Footer />
              </>
            }
          />

          <Route
            path={pathes.savedMovies}
            element={
              <>
                <Header isUserLoggedIn={isUserLoggedIn} />
                <SavedMovies
                  // // handleSaveMovie={handleSaveMovie}
                  // // handleUnSaveMovie={handleUnSaveMovie}
                  recivedMovies={recivedMovies}
                  isLoading={isLoading}
                  counter={counter}
                  moreMovies={moreMovies}
                  buttonMore={buttonMore}
                  isSavedMoviesSection={isSavedMoviesSection}
                  savedMovies={copySavedMovies}
                  findFilms={findFilms}
                  checkedToggle={checkedToggle}
                  token={token}
                />
                <Footer />
              </>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
