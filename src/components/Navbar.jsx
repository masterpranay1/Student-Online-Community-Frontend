import { Link } from 'react-router-dom';
import ChatLogo from '../assets/chatLogo.svg';

import { useContext } from 'react';
import LoginContext from '../contexts/LoginContext';

const Navbar = () => {
  const { state } = useContext(LoginContext);
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
          {state == 'login' ? (
            <Link
              to="/auth/login"
              className="btn btn-secondary btn-outline px-8"
            >
              Login
            </Link>
          ) : (
            ''
          )}

          {state == 'register' ? (
            <Link
              to="/auth/register"
              className="btn btn-secondary btn-outline px-8"
            >
              Register
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
