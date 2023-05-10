import { createContext } from 'react';

const LoginContext = createContext({
    state: 'login',
    setState: (state) => {}
});

export default LoginContext;