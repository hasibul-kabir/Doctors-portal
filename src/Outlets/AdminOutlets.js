import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate, Outlet } from 'react-router-dom';
import auth from '../Firebase.config';
import useAdmin from '../Hooks/useAdmin';
import loader from '../assets/images/loader.gif';

const AdminOutlets = () => {
    const [user, loading] = useAuthState(auth);
    const [admin, adminLoading] = useAdmin(user)
    if (loading || adminLoading) {
        return <img className=' m-auto' src={loader} alt='loading_spinner' />
    }
    return admin ? <Outlet /> : <Navigate to='/' />
}

export default AdminOutlets