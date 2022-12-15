import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import auth from '../../Firebase.config';

const ManageDoctors = () => {
    const navigate = useNavigate();
    const { isLoading, data: doctors, refetch, error } = useQuery('doctors', () => fetch(`http://localhost:5000/doctor`, {
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


    return (
        <div>
            <h2 className='text-center font-bold text-slate-600 tracking-widest mt-5'>Manage Doctor</h2>
            {
                isLoading ?
                    <p className='font-bold text-center'>Loading...</p>
                    :
                    <div className="overflow-x-auto mt-4">
                        <table className="table w-full">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Name</th>
                                    <th>Treatment</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    doctors.map((doctor, index) =>
                                        <tr key={doctor._id}>
                                            <th>{index + 1}</th>
                                            <td>
                                                <div className="flex items-center space-x-3">
                                                    <div className="avatar">
                                                        <div className="mask mask-squircle w-12 h-12">
                                                            <img src={doctor.image} alt="Avatar Tailwind CSS Component" />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="font-bold">{doctor.name}</div>
                                                        <div className="text-sm opacity-50">{doctor.email}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>{doctor.workArea}</td>
                                            <td><button className="btn btn-warning btn-sm">Remove</button></td>
                                        </tr>
                                    )
                                }

                            </tbody>
                        </table>
                    </div>
            }
        </div>
    )
}

export default ManageDoctors