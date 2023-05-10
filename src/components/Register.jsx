const Register = () => {
    return (
        <div className="hero min-h-screen bg-primary py-[2rem] pb-[4rem] text-neutral">
            <div className="hero-content flex-col max-w-xl">
                <div className="text-center ">
                    <h1 className="text-5xl font-bold text-secondary">Register for a new account!</h1>
                    <p className="py-6">Register for a new account.</p>
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <div className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" placeholder="Elon Musk" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="text" placeholder="Email" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" placeholder="password" className="input input-bordered" />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>

                        <div className="form-control mt-6">
                            <button className="btn btn-secondary">Register</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register