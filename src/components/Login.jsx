import { useContext, useEffect, useRef } from 'react';
import LoginContext from '../contexts/LoginContext';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const buttonRef = useRef(null);

    const navigate = useNavigate();

    let { isLogin ,setIsLogin, setRole } = useContext(LoginContext);

    useEffect(() => {
        if (isLogin) navigate('/channels');
    }, [])


    const handleButtonClick = async (e) => {
        e.preventDefault();
        buttonRef.current.classList.add('loading');
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        if (!email || !password) return alert('Please enter all the fields')
        const res = await fetch(
            'https://student-online-community-backend-omega.vercel.app/api/admin/login',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Access-Control-Allow-Origin': ''
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
                credentials: "include",
            }
        );
        const data = await res.json();
        buttonRef.current.classList.remove('loading');
        if (res.status === 200) {
            setIsLogin(true);
            setRole('admin');
            navigate('/channels');
        } else {
            alert('Invalid Credentials');
        }
    };
    return (
        <div className="hero min-h-screen bg-primary py-[2rem] pb-[4rem] text-neutral">
            <div className="hero-content flex-col max-w-2xl">
                <div className="text-center ">
                    <h1 className="text-5xl font-bold text-secondary">Login as Admin!</h1>
                    <p className="py-6">Admin Login Page.</p>
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <div className="card-body">
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
                            <button className="btn btn-secondary" ref={buttonRef} onClick={handleButtonClick}>Login</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const UserLogin = () => {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const buttonRef = useRef(null);

    const navigate = useNavigate();

    let { isLogin ,setIsLogin, setRole } = useContext(LoginContext);

    useEffect(() => {
        if (isLogin) navigate('/channels');
    }, [])


    const handleButtonClick = async (e) => {
        e.preventDefault();
        buttonRef.current.classList.add('loading');
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        if (!email || !password) return alert('Please enter all the fields')
        const res = await fetch(
            'https://student-online-community-backend-omega.vercel.app/api/users/login',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Access-Control-Allow-Origin': ''
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
                credentials: "include",
            }
        );
        const data = await res.json();
        buttonRef.current.classList.remove('loading');

        if (res.status === 200) {
            setIsLogin(true);
            setRole('user');
            navigate('/channels');
        } else {
            alert('Invalid Credentials');
        }
    };
    return (
        <div className="hero min-h-screen bg-primary py-[2rem] pb-[4rem] text-neutral">
            <div className="hero-content flex-col max-w-2xl">
                <div className="text-center ">
                    <h1 className="text-5xl font-bold text-secondary">
                        Login to your account!
                    </h1>
                    <p className="py-6">User Login Page.</p>
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <div className="card-body">
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
                            <button ref={buttonRef} className="btn btn-secondary" onClick={handleButtonClick}>
                                Login
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Login = ({ admin }) => {
    let { setState } = useContext(LoginContext);
    // setState('register')

    useEffect(() => {
        setState('register');
    }, [setState]);

    return <div>{admin ? <AdminLogin /> : <UserLogin />}</div>;
};

export default Login;
