import React from 'react';
import './App.css';
import HomePage from './Home/HomePage';
import LoginPage from './Login/LoginPage';
import { useAuth0 } from "@auth0/auth0-react";

function App() {
  const { isAuthenticated } = useAuth0();

  return (
    <div className="App">
      {isAuthenticated ? <HomePage /> : <LoginPage />}
    </div>
  );
}

export default App;
