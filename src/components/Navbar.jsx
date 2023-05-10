import { Link } from 'react-router-dom';
import ChatLogo from '../assets/chatLogo.svg';
import AccountIcon from '../assets/account.svg';

import { useContext } from 'react';
import LoginContext from '../contexts/LoginContext';

const Navbar = () => {
  const { state, isLogin } = useContext(LoginContext);
  return (
    <>
      <div className="navbar bg-base-100 shadow-md px-8 py-4">
        <div className="navbar-start">
          <Link to="/" className="text-2xl bold text-neutral font-bold">
            <img
              src={ChatLogo}
              alt="Chat Logo"
              className="inline-block w-10 mr-4"
            />
            Student Online Community
          </Link>
        </div>
        <div className="navbar-end">
          {state == 'login' && !isLogin ? (
            <Link
              to="/auth/login"
              className="btn btn-secondary btn-outline px-8"
            >
              Login
            </Link>
          ) : (
            ''
          )}

          {state == 'register' && !isLogin ? (
            <Link
              to="/auth/register"
              className="btn btn-secondary btn-outline px-8"
            >
              Register
            </Link>
          ) : (
            ''
          )}

          {isLogin ? (
            <Link to="/auth/profile">
              <img
                src={AccountIcon}
                alt="Account Icon"
                className="inline-block w-10 mr-4"
              />
            </Link>
          ) : (
            ''
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
