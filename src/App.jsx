import React, { useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import LoginContext from './contexts/LoginContext';
import ChannelContext from './contexts/ChannelContext';

import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import ChannelPage from './pages/ChannelPage';
import NotFound from './pages/NotFound';
import ChannelDashboard from './pages/ChannelDashboard';
import UserProfile from './pages/UserProfile';

const getInitialState = () => {
  const state = localStorage.getItem('state');
  return state ? JSON.parse(state) : 'login'
}

const getInitialIsLogin = () => {
  const isLogin = localStorage.getItem('isLogin');
  return isLogin ? JSON.parse(isLogin) : false
}

const getInitialRole = () => {
  const role = localStorage.getItem('role');
  return role ? JSON.parse(role) : ''
}

const getInitialChannels = () => {
  const channels = localStorage.getItem('channels');
  return channels ? JSON.parse(channels) : []
}

function App() {
  const [state, setState] = React.useState(getInitialState);
  const [isLogin, setIsLogin] = React.useState(getInitialIsLogin);
  const [role, setRole] = React.useState(getInitialRole);

  const [channelData, setChannelData] = React.useState(getInitialChannels);

  useEffect(() => {
    localStorage.setItem('state', JSON.stringify(state));
  }, [state])

  useEffect(() => {
    localStorage.setItem('isLogin', JSON.stringify(isLogin));
  }, [isLogin])

  useEffect(() => {
    localStorage.setItem('role', JSON.stringify(role));
  }, [role])

  useEffect(() => {
    localStorage.setItem('channels', JSON.stringify(channelData));
  }, [channelData])

  return (
    <>
      <LoginContext.Provider value={{ state, setState, isLogin, setIsLogin, role, setRole }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth/*" element={<AuthPage />} />
          <Route
            path="/channels"
            element={
              <ChannelContext.Provider value={{
                channels: channelData,
                setChannels: setChannelData
              }}>
                <ChannelPage />
              </ChannelContext.Provider>
            }
          />
          {/* <Route path="/createChannel" element={}/> */}
          <Route path="/channelDashboard/:channelId" element={<ChannelDashboard />} />
          {/* <Route path="/admin" element={<div>
            <Link to="/auth/admin/login" className="btn btn-secondary btn-outline">
            Admin Login
          </Link>
          </div>}/> */}
          <Route path="/auth/profile" element={<UserProfile />}/>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </LoginContext.Provider>
    </>
  );
}

export default App;
