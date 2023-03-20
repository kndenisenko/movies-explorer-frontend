import './App.css';

// импорт компонентов react
import {React, useState} from 'react';
import { Route, Routes, useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../utils/CurrentUserContext";

// Иммпорт глобальных переменных и JS-компонентов
import { pathes } from '../utils/settings';
import * as Auth from "../utils/Auth";

// импорт компонентов сайта
import Header from "../Header/Header";
import Main from "../Main/Main.jsx"
import Footer from '../Footer/Footer';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import NotFound from '../NotFound/NotFound';
import Movies from '../Movies/Movies';

function App() {
  const history = useNavigate();

  // Константы пользователя
  const [token, setToken] = useState(""); // пока как-то так, зато работает как-то так
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  // обработчик регистрации
  function handleRegister(name, email, password) {
    return Auth.registration(name, email, password)
      .then((res) => {
        setCurrentUser(res);
        history(`${pathes.login}`); // вжух
      })
      .catch((error) => {
        console.log("Ошибка регистрации:");
        setErrorMessage(error.message);
      });
  }

  // Обработчик логина
  function handleLogin(email, password) {
    return Auth.login(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          setIsUserLoggedIn(true);
          setToken(data.token);
          history(`${pathes.movies}`);
        }
      })
      .catch((error) => {
        console.log("Ошибка логина:");
        setErrorMessage(error.message);
      });
  }

  return (
  <div className="page">
    <CurrentUserContext.Provider value={currentUser}>
      <Routes>

        {/* главная страница */}
        <Route path={pathes.main}
          element={
            <>
              <Header
              isUserLoggedIn={isUserLoggedIn} />
              <Main />
              <Footer />
            </>
          }
        />

        <Route path={pathes.register}
          element={
          <Register
          handleRegister={handleRegister}
          errorMessage={errorMessage} />
          }
        />

        <Route path={pathes.login}
          element={
          <Login
          handleLogin={handleLogin}
          />
          }
        />

        <Route path={pathes.profile}
          element={
            <>
              <Header isUserLoggedIn={isUserLoggedIn} />
              <Profile />
          </>
          }
        />

        <Route path={pathes.movies}
          element={
            <>
            <Header isUserLoggedIn={isUserLoggedIn} />
            <Movies />
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
