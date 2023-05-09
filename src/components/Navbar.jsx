import { Link } from 'react-router-dom';
import ChatLogo from '../assets/chatLogo.svg';

const Navbar = () => {
  return (
    <>
      <div className="navbar bg-base-100 shadow-md px-8 py-4">
        <div className="navbar-start">
          <a className="text-2xl bold text-neutral font-bold">
            <img src={ChatLogo} alt="Chat Logo" className="inline-block w-10 mr-4" />
            Student Online Community
          </a>
        </div>
        <div className="navbar-end">
          <a className="btn btn-secondary btn-outline px-8">Login</a>
        </div>
      </div>
    </>
  );
};

export default Navbar;
