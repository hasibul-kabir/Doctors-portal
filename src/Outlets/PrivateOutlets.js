import React from 'react';
import auth from '../Firebase.config';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import loader from '../assets/images/loader.gif';

const PrivateOutlets = () => {
    const location = useLocation();
    const [user, loading] = useAuthState(auth);
    if (loading) {
        return <img className=' m-auto' src={loader} alt='loading_spinner' />
    }
    return user ? <Outlet /> : <Navigate to='/login' state={{ from: location }} replace />
}

export default PrivateOutlets;