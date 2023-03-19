import './App.css';

// Иммпорт глобальных переменных
import { pathes } from '../utils/settings';


// импорт компонентов react
import {React, useState} from 'react';
import { Route, Routes } from "react-router-dom";
import { CurrentUserContext } from "../utils/CurrentUserContext";

// импорт компонентов сайта
import Header from "../Header/Header";
import Main from "../Main/Main.jsx"
import Footer from '../Footer/Footer';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';

function App() {

  //const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(true);

  return (
  <div className="page">


      <Routes>

        {/* главная страница */}
        <Route path={pathes.main}
          element={
            <>
              <Header isUserLoggedIn={isUserLoggedIn}/>
              <Main />
              <Footer />
            </>
          }
        />

        <Route path={pathes.register}
          element={
          <Register />
          }
        />

        <Route path={pathes.login}
          element={
          <Login />
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

      </Routes>

  </div>
  );
}

export default App;
