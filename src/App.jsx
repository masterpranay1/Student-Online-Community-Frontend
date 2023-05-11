import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import LoginContext from './contexts/LoginContext';
import ChannelContext from './contexts/ChannelContext';

import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import ChannelPage from './pages/ChannelPage';
import NotFound from './pages/NotFound';
import ChannelDashboard from './pages/ChannelDashboard';

function App() {
  const [state, setState] = React.useState('login');
  const [isLogin, setIsLogin] = React.useState(false);
  const [role, setRole] = React.useState('');

  const { channels } = React.useContext(ChannelContext);
  const [channelData, setChannelData] = React.useState(channels)

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
          <Route path="/admin" element={<div>
            <Link to="/auth/admin/login"/>
          </div>}/>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </LoginContext.Provider>
    </>
  );
}

export default App;
