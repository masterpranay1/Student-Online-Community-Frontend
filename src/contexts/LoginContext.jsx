import { createContext } from 'react';

const LoginContext = createContext({
    state: 'login',
    setState: (state) => {},
    isLogin: true,
    setIsLogin: (isLogin) => {},
    role: '',
    setRole: (role) => {},
    userId: '',
    setUserId: (userId) => {},
});

export default LoginContext;