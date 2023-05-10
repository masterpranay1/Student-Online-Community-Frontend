import { useContext, useEffect, useRef } from 'react';
import LoginContext from '../contexts/LoginContext';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  let { setState, setIsLogin, setRole } = useContext(LoginContext);
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
      'https://student-online-community-backend-omega.vercel.app/api/users/register',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'Access-Control-Allow-Origin': ''
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
      navigate('/channels');
    } else {
      alert(data.message);
    }
  }
      

  return (
    <div className="hero min-h-screen bg-primary py-[2rem] pb-[4rem] text-neutral">
      <div className="hero-content flex-col max-w-xl">
        <div className="text-center ">
          <h1 className="text-5xl font-bold text-secondary">
            Register for a new account!
          </h1>
          <p className="py-6">Register for a new account.</p>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="Elon Musk"
                className="input input-bordered"
                ref={nameRef}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="text"
                placeholder="Email"
                className="input input-bordered"
                ref={emailRef}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered"
                ref={passwordRef}
              />
            </div>

            <div className="form-control mt-6">
              <button className="btn btn-secondary" ref={buttonRef} onClick={handleButtonClick}>Register</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
