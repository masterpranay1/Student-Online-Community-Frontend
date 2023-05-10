import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginContext from './contexts/LoginContext';

import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';

function App() {
  const [state, setState] = React.useState('login');

  return (
    <>
      <LoginContext.Provider value={{ state, setState }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth/*" element={<AuthPage />} />
        </Routes>
      </LoginContext.Provider>
    </>
  );
}

export default App;
