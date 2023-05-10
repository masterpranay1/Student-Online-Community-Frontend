import { createContext } from 'react';

const LoginContext = createContext({
    state: 'login',
    setState: (state) => {},
    isLogin: true,
    setIsLogin: (isLogin) => {},
    role: '',
    setRole: (role) => {},
});

export default LoginContext;