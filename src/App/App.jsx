import './App.css';

// Иммпорт глобальных переменных
import { pathes } from '../utils/settings';


// импорт компонентов react
import { Route, Routes, useNavigate } from "react-router-dom";

// импорт компонентов сайта
import Header from "../Header/Header";
import Main from "../Main/Main.jsx"

function App() {
  return (
  <div className="page">
    <Header />

    <main className='main'>
      <Routes>

        {/* главная страница */}
        <Route
        path={pathes.main}
        element={<Main />}
        />

      </Routes>
    </main>

  </div>
  );
}

export default App;
