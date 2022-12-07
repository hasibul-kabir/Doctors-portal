import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div className='max-w-6xl lg:mx-auto mx-6'>
            <nav className='lg:hidden flex justify-end'>
                <label htmlFor="dashboard-collapse" className="btn btn-circle btn-info">
                    <svg className="swap-off fill-current" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" /></svg>
                </label>
            </nav>
            <div className="drawer drawer-mobile">
                <input id="dashboard-collapse" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col">
                    {/* <!-- Page content here --> */}
                    <Outlet />
                </div>
                <div className="drawer-side">
                    <label htmlFor="dashboard-collapse" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-auto bg-base-100 text-base-content">
                        {/* <!-- Sidebar content here --> */}
                        <li><Link to='/dashboard'>My Appointments</Link></li>
                        <li><Link to='/dashboard/reports'>Sidebar Item</Link></li>
                    </ul>

                </div>
            </div>
        </div>
    )
}

export default Dashboard