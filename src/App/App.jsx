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

function App() {

  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

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

      </Routes>

  </div>
  );
}

export default App;
