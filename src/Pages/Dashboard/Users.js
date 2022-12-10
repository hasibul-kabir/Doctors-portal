import { signOut } from 'firebase/auth';
import React from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import loader from '../../assets/images/loader.gif';
import auth from '../../Firebase.config';

const Users = () => {
    const navigate = useNavigate();
    const { isLoading, data: users, refetch, error } = useQuery('users', () => fetch('http://localhost:5000/user', {
        method: 'GET',
        headers: {
            'authorization': `Bearer ${localStorage.getItem('access-token')}`
        }
    })
        .then((res) => {
            if (res.status === 401 || res.status === 403) {
                signOut(auth);
                navigate('/');
                localStorage.removeItem('access-token');
            }
            return res.json()
        })
    )
    if (isLoading) {
        return <img className=' m-auto' src={loader} alt='loading_spinner' />
    }


    function makeAdmin(email) {
        fetch(`http://localhost:5000/user/admin/${email}`, {
            method: 'PUT',
            headers: {
                'authorization': `Bearer ${localStorage.getItem('access-token')}`
            }
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.modifiedCount > 0) {
                    refetch();
                    toast.success('User added to admin panel!', {
                        position: toast.POSITION.TOP_CENTER
                    });
                }
            })
    }
    return (
        <div>
            <h2 className='text-center font-bold text-slate-600 tracking-widest mt-5'>All Users</h2>
            <div className="overflow-x-auto mt-4">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) =>
                                <tr key={index}>
                                    <th>{index + 1}</th>
                                    <td>{user.userName}</td>
                                    <td>{user.email}</td>
                                    <td>{!user.role && <button className="btn btn-sm btn-primary" onClick={() => makeAdmin(user.email)}>Make Admin</button>}</td>
                                    <td><button className="btn btn-sm btn-warning">Delete User</button></td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Users