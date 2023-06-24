import { useContext, useEffect, useRef } from 'react';
import LoginContext from '../contexts/LoginContext';
import { useNavigate } from 'react-router-dom';

export const FormInput = ({ label, type, placeholder, refElement }) => {
    return (
        <div className="form-control">
            <label className="label">
                <span className="label-text">{label}</span>
            </label>
            <input
                type={type}
                placeholder={placeholder}
                className="input input-bordered"
                ref={refElement}
            />
        </div>
    );
}

export const FormBody = ({ emailRef, passwordRef, buttonRef, handleButtonClick }) => {
    return (
        <div className="card max-w-sm shadow-2xl bg-base-100 p-4 md:p-8 gap-4 mx-auto">
            <FormInput label="Email" type="text" placeholder="Email" refElement={emailRef} />
            <FormInput label="Password" type="password" placeholder="Password" refElement={passwordRef} />
            <div className="form-control mt-6">
                <button className="btn btn-secondary" ref={buttonRef} onClick={handleButtonClick}>Login</button>
            </div>
        </div>
    )
}

export const FormHeader = ({ title, description }) => {
    return (
        <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-secondary">{title}</h1>
            <p className="py-6">{description}</p>
        </div>
    )
}

const AdminLogin = () => {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const buttonRef = useRef(null);

    const navigate = useNavigate();

    let { isLogin, setIsLogin, setRole, setUserId } = useContext(LoginContext);

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
            'https://student-online-community.onrender.com/api/admin/login',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': 'true'
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
            setUserId(data._id);
            navigate('/channels');
        } else {
            alert('Invalid Credentials');
        }
    };
    return (
        <div className="hero min-h-screen bg-primary py-[2rem] pb-[4rem] text-neutral">
            <div className="hero-content flex-col max-w-2xl">
                <FormHeader title="Admin Login" description="Admin Login Page." />
                <FormBody emailRef={emailRef} passwordRef={passwordRef} buttonRef={buttonRef} handleButtonClick={handleButtonClick} />
            </div>
        </div>
    );
};

const UserLogin = () => {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const buttonRef = useRef(null);

    const navigate = useNavigate();

    let { isLogin, setIsLogin, setRole, setUserId } = useContext(LoginContext);

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
            'https://student-online-community.onrender.com/api/users/login',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': 'true'
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
            setUserId(data._id)
            navigate('/channels');
        } else {
            alert('Invalid Credentials');
        }
    };
    return (
        <div className="hero bg-primary min-h-screen text-neutral p-1">
            <div className="max-w-2xl">
                <FormHeader title="Login to your account" description="User Login Page." />
                <FormBody emailRef={emailRef} passwordRef={passwordRef} buttonRef={buttonRef} handleButtonClick={handleButtonClick} />
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
