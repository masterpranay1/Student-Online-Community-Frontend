import { Link } from 'react-router-dom';
import ChatLogo from '../assets/chatLogo.svg';
import AccountIcon from '../assets/account.svg';

import { useContext } from 'react';
import LoginContext from '../contexts/LoginContext';

const NavHeader = () => {
  return (
    <div className="text-center px-2 md:px-8 flex justify-center">
      <Link to="/" className="my-auto text-xl md:text-2xl text-neutral font-bold">
        <img
          src={ChatLogo}
          alt="Chat Logo"
          className="inline-block w-8 mr-2"
        />
        Student Online Community
      </Link>
    </div>
  )
}

const NavFooter = () => {
  const { state, isLogin } = useContext(LoginContext);
  
  return (
    <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:ml-auto md:px-8">

      {/* Login Buttin */}
      {state == 'login' && !isLogin ? (
        <Link to="/auth/login" className="btn btn-sm md:btn-md btn-secondary btn-outline px-8">
          Login
        </Link>
      ) : (
        ''
      )}

      {/* Register Button */}
      {state == 'register' && !isLogin ? (
        <Link to="/auth/register" className="btn btn-sm md:btn-md btn-secondary btn-outline px-8">
          Register
        </Link>
      ) : (
        ''
      )}

      {/* Profile Button */}
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

      {/* Admin Button */}
      {!isLogin ? (<Link to="/auth/admin/login" className="btn btn-sm md:btn-md btn-secondary btn-outline px-8">
        Admin
      </Link>) : ('')}
    </div>
  )
}

const Navbar = () => {
  return (
    <>
      <div className="bg-base-100 py-4 shadow-md flex flex-col md:flex-row gap-4">
        <NavHeader />
        <NavFooter />
      </div>
    </>
  );
};

export default Navbar;
