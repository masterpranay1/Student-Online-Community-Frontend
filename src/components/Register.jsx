import { useContext, useEffect, useRef } from 'react';
import LoginContext from '../contexts/LoginContext';
import { useNavigate } from 'react-router-dom';

import { FormInput, FormHeader } from './Login';

const Register = () => {
  let { setState, setIsLogin, setRole, setUserId } = useContext(LoginContext);
  useEffect(() => {
    setState('login');
  }, [setState]);

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const buttonRef = useRef(null);

  const navigate = useNavigate();

  const handleButtonClick = async (e) => {
    e.preventDefault();
    buttonRef.current.classList.add('loading');
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (!name || !email || !password) {
      return alert('Please enter all the fields');
    }
    const res = await fetch(
      'https://student-online-community.onrender.com/api/users/register',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'true'
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
        }),
        credentials: 'include',
      }
    );
    const data = await res.json();
    buttonRef.current.classList.remove('loading');
    if (res.status == 201) {
      alert('User registered successfully');
      setIsLogin(true);
      setRole('user');
      setUserId(data._id);
      navigate('/channels');
    } else {
      alert(data.message);
    }
  }


  return (
    <div className="hero min-h-screen bg-primary text-neutral p-1 py-16">
      <div className="max-w-xl">
        <FormHeader title="Register for a new account" description="User Register Page" />
        <div className="card max-w-sm shadow-2xl bg-base-100 p-4 md:p-8 gap-4 mx-auto">

          <FormInput label="Name" placeholder="Elon Musk" inputRef={nameRef} />
          <FormInput label="Email" placeholder="Email" inputRef={emailRef} />
          <FormInput label="Password" placeholder="password" inputRef={passwordRef} />

          <div className="form-control mt-6">
            <button className="btn btn-secondary" ref={buttonRef} onClick={handleButtonClick}>Register</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
