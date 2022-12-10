import React from 'react';
import { useAuthState, useSignOut } from 'react-firebase-hooks/auth';
import auth from '../Firebase.config';
import { Link } from 'react-router-dom';


const NavBar = () => {
    const [user] = useAuthState(auth);
    const [signOut] = useSignOut(auth);

    const handleLogout = () => {
        signOut();
        localStorage.removeItem('access-token');
    }
    return (
        <div className="navbar bg-base-100 lg:px-16 px-8 max-w-7xl mx-auto">
            <div className="navbar-start flex">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        <li><Link to='/'>Home</Link></li>
                        <li><Link to='/appointment'>Appointment</Link></li>
                        <li><Link to='/about'>About</Link></li>
                        <li><Link to='/reviews'>Reviews</Link></li>
                        <li><Link to='/contact'>Contact Us</Link></li>
                        {
                            user ?
                                // <li><p>{user?.displayName}</p></li>
                                <li onClick={() => signOut()}><p>Logout</p></li>
                                :
                                <li><Link to='/login'>Login</Link></li>
                        }
                    </ul>
                </div>
                <a className="btn btn-ghost normal-case text-xl">Doctors Portal</a>
            </div>
            <div className="navbar-end hidden lg:flex lg:w-fit">
                <ul className="menu menu-horizontal p-0">
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/appointment'>Appointment</Link></li>
                    <li><Link to='/about'>About</Link></li>
                    <li><Link to='/reviews'>Reviews</Link></li>
                    <li><Link to='/contact'>Contact Us</Link></li>
                    {
                        user ?
                            <>
                                <li><Link to='/dashboard'>Dashboard</Link></li>
                                <li className='tooltip tooltip-bottom' data-tip={user?.displayName ? user?.displayName : 'logout'} onClick={handleLogout} >
                                    {/* <p className='font-bold'>{user.displayName.length > 5 ? user.displayName.slice(0, 5) + '...' : user.displayName + 'v'}</p> */}
                                    <p className='font-bold'>Logout</p>
                                </li>
                            </>
                            :
                            <li><Link to='login'>Login</Link></li>
                    }
                </ul>
            </div>
        </div>
    )
}

export default NavBar