import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Header from "./components/Header/Header";
import Home from "./pages/Home";
import Modal from "./components/Modal/Modal";
import { Game } from "./types/Game";
import { fetchGames } from "./services/api"; // Función que obtiene los juegos desde la API
import SearchPage from "./pages/SearchPage"; // Importa la nueva página
import SearchGames from "./pages/SearchGames"; // Importa la página de búsqueda de juegos
import Stores from "./pages/Stores";
import ListStores from "./pages/ListStores";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import SignIn from "./components/SignIn";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCW04t59Aplq9lIXZrOiSw0O7eWG8A98j8",
  authDomain: "login-d8396.firebaseapp.com",
  projectId: "login-d8396",
  storageBucket: "login-d8396.firebasestorage.app",
  messagingSenderId: "748421409173",
  appId: "1:748421409173:web:751ffe8262247f05a6ae9c",
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const App: React.FC = () => {
  const { i18n } = useTranslation();
  const [games, setGames] = useState<Game[]>([]);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getGames = async () => {
      const data = await fetchGames();
      setGames(data);
    };
    getGames();
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  if (loading) {
    return <p>Cargando...</p>; // Mostrar un mensaje de carga mientras se verifica la autenticación
  }

  return (
    <Router>
      <div className="App">
        {user && <Header />}
        {user && (
          <div className="language-switcher">
            <button
              onClick={() => changeLanguage("en")}
              className="language-button"
            >
              English
            </button>
            <button
              onClick={() => changeLanguage("es")}
              className="language-button"
            >
              Español
            </button>
          </div>
        )}
        <Routes>
          {!user ? (
            <Route path="*" element={<SignIn />} /> // Ruta para el login
          ) : (
            <>
              <Route
                path="/"
                element={<Home games={games} onGameClick={setSelectedGame} />}
              />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/search-games" element={<SearchGames />} />
              <Route path="/stores" element={<Stores />} />
              <Route path="/full-list" element={<ListStores />} />
            </>
          )}
        </Routes>

        {selectedGame && (
          <Modal game={selectedGame} onClose={() => setSelectedGame(null)} />
        )}
      </div>
    </Router>
  );
};

export default App;
