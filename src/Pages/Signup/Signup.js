import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCreateUserWithEmailAndPassword, useUpdateProfile } from 'react-firebase-hooks/auth';
import auth from '../../Firebase.config';



const Signup = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [hide, setHide] = useState(true);
    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passvalErr, setPassvalErr] = useState(false);
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);
    const [updateProfile, updating, updateError] = useUpdateProfile(auth);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const passFormat = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
        if (displayName && email && password && password.match(passFormat)) {
            setPassvalErr(false);
            await createUserWithEmailAndPassword(email, password);
            await updateProfile({ displayName });
            setDisplayName('');
            setEmail('');
            setPassword('');
        } else {
            setPassvalErr('Password must contain 6 to 16 characters, atleast a num, and atleast a special character.')
        }
    }

    if (updateError) {
        return <p>{updateError.message}</p>
    }

    if (!error && !updateError && user) {
        navigate(location.state?.from ? location.state.from : '/', { replace: true })
    }

    return (
        <div className='max-w-6xl lg:mx-auto mx-6'>
            <div className="hero min-h-screen">
                <div className="hero-content flex-col lg:gap-10 lg:flex-row-reverse">
                    <div className="text-center lg:max-w-md lg:text-left">
                        <h1 className="text-5xl font-bold">Signup Now!</h1>
                        <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi.
                            In deleniti eaque aut repudiandae et a id nisi.</p>
                    </div>

                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        {
                            error &&
                            <span className="label-text-alt text-red-600 p-2">{error.message}</span>
                        }
                        <div className="card-body">
                            <form onSubmit={handleSubmit} >
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Full Name</span>
                                    </label>
                                    <input type="text" placeholder="Full Name" className="input input-bordered" required onBlur={(e) => setDisplayName(e.target.value)} />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input type="email" placeholder="email" className="input input-bordered" required onBlur={(e) => setEmail(e.target.value)} />
                                </div>
                                <div className="form-control relative">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <input type={hide ? 'password' : 'text'} placeholder="password" className="input input-bordered" required onBlur={(e) => setPassword(e.target.value)} />
                                    {
                                        hide ?
                                            <FaEyeSlash className='absolute bottom-20 right-4' onClick={() => setHide(!hide)} />
                                            :
                                            <FaEye className='absolute bottom-20 right-4' onClick={() => setHide(!hide)} />
                                    }
                                    <label className="label">
                                        {
                                            passvalErr &&
                                            <span className="label-text-alt text-error  absolute bottom-5">{passvalErr}</span>
                                        }
                                    </label>

                                    <p className='text-center pt-6 '>Already Registered? <Link className='font-bold text-cyan-600' to="/login">Login</Link> </p>
                                </div>
                                <div className="form-control mt-6">
                                    {
                                        updating || loading ?
                                            <button className="btn btn-primary loading">loading</button>
                                            :
                                            <button className="btn btn-primary" type='submit'>Signup</button>
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

export default Signup