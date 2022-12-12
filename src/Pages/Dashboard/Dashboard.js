import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, Outlet } from 'react-router-dom';
import auth from '../../Firebase.config';
import useAdmin from '../../Hooks/useAdmin';

const Dashboard = () => {
    const [open, setOpen] = useState(false);
    const [user] = useAuthState(auth);
    const [admin] = useAdmin(user);
    return (
        <div className='max-w-6xl lg:mx-auto mx-6'>
            <nav className='lg:hidden flex justify-end'>
                {
                    open ?
                        <label htmlFor="dashboard-collapse" className="btn btn-circle btn-info" onClick={() => setOpen(!open)}>
                            <svg className="swap-on fill-current" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" /></svg>
                        </label>
                        :
                        <label htmlFor="dashboard-collapse" className="btn btn-circle btn-info" onClick={() => setOpen(!open)}>
                            <svg className="swap-off fill-current" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" /></svg>
                        </label>
                }
            </nav>
            <div className="drawer drawer-mobile">
                <input id="dashboard-collapse" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col">
                    {/* <!-- Page content here --> */}
                    <Outlet />
                </div>
                <div className="drawer-side shadow-2xl bg-base-100">
                    <label htmlFor="dashboard-collapse" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-auto bg-base-100 text-base-content">
                        {/* <!-- Sidebar content here --> */}
                        <li><Link to='/dashboard'>My Appointments</Link></li>
                        <li><Link to='/dashboard/reports'>My Reports</Link></li>
                        {
                            admin &&
                            <>
                                <li><Link to='/dashboard/users'>All users</Link></li>
                                <li><Link to='/dashboard/adddoctor'>Add a doctor</Link></li>
                                <li><Link to='/dashboard/managedoctors'>Manage doctors</Link></li>
                            </>
                        }
                    </ul>

                </div>
            </div>
        </div>
    )
}

export default Dashboard