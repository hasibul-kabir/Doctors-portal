import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import auth from '../../Firebase.config';
import { useSignInWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { FcGoogle } from 'react-icons/fc';


const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
    const [signInWithEmailAndPassword, emailAuthUser, emailAuthLoading, emailAuthError] = useSignInWithEmailAndPassword(auth);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [validationError, setValidationError] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            setValidationError('Please fill out all these field!');
        } else {
            setValidationError(false);
            await signInWithEmailAndPassword(email, password);
            setEmail('');
            setPassword('');
        }
    }

    if (user || emailAuthUser) {
        navigate(location.state?.from ? location.state.from : '/', { replace: true })
    }

    return (
        <div className='max-w-6xl lg:mx-auto mx-6'>
            <div className="hero min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse lg:gap-28">
                    <div className="text-center lg:max-w-md lg:text-left">
                        <h1 className="text-5xl font-bold">Login now!</h1>
                        <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <button className="btn btn-outline btn-primary mb-6" onClick={() => signInWithGoogle()}><FcGoogle className='mr-3' />Continue With Google</button>
                        {
                            error &&
                            <span className="label-text-alt text-red-600 p-2">{error.message}</span>
                        }
                        <div className="divider">OR</div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="form-control">
                                    {
                                        validationError &&
                                        <span className="label-text-alt text-orange-600">{validationError}</span>
                                    }
                                    {
                                        emailAuthError &&
                                        <span className="label-text-alt text-orange-600">{emailAuthError?.message}</span>
                                    }
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input type="email" placeholder="email" className="input input-bordered" onBlur={(e) => setEmail(e.target.value)} />

                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <input type="password" placeholder="password" className="input input-bordered" onBlur={(e) => setPassword(e.target.value)} />
                                    <label className="label">
                                        <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                    </label>
                                </div>
                                <p className='text-center'>New to DoctorsPortal? <Link className='font-bold text-cyan-600' to="/signup">Register</Link> </p>
                                <div className="form-control mt-6">
                                    {
                                        emailAuthLoading ?
                                            <button className="btn btn-primary loading">loading</button>
                                            :
                                            <button className="btn btn-primary" type='submit' onClick={handleSubmit}>Login</button>
                                    }
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login