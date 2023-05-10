import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginContext from './contexts/LoginContext';
import ChannelContext from './contexts/ChannelContext';

import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import ChannelPage from './pages/ChannelPage';

function App() {
  const [state, setState] = React.useState('login');
  const [isLogin, setIsLogin] = React.useState(true);

  const { channels } = React.useContext(ChannelContext);

  return (
    <>
      <LoginContext.Provider value={{ state, setState, isLogin, setIsLogin }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth/*" element={<AuthPage />} />
          <Route
          path="/channels"
          element={
            <ChannelContext.Provider value={{channels}}>
              <ChannelPage />
            </ChannelContext.Provider>
          }
        />
        </Routes>
      </LoginContext.Provider>
    </>
  );
}

export default App;
