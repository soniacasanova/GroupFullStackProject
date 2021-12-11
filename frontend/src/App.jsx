import React, { useState, createContext } from "react";
import "leaflet/dist/leaflet.css";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import SchedulePage from "./pages/SchedulePage";

export const LoginContext = createContext();

function App() {
  const token = localStorage.getItem('token');
  const [isLoggedIn, setIsLoggedIn] = useState(!!token);

  const login = (token) => {
    localStorage.setItem('token', token);
    setIsLoggedIn(true);
  }

  if (!isLoggedIn) { 
    return <LoginPage onLogin={login} />
  } else {
    return (
      <LoginContext.Provider value={{ setIsLoggedIn }}>
        <SchedulePage />
      </LoginContext.Provider>
    );
  }
}

export default App;
