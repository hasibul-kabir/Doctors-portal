import React, { useEffect, useState } from 'react';
import auth from '../../Firebase.config';
import { useAuthState } from 'react-firebase-hooks/auth';

const MyAppointments = () => {
    const [user] = useAuthState(auth);
    const [myAppointments, setMyAppointments] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/mybookings?email=${user?.email}`)
            .then((res) => res.json())
            .then((data) => setMyAppointments(data))
    }, [])

    return (
        <div>
            <h2 className='text-center font-bold text-slate-600 tracking-widest mt-5'>My Appointments</h2>
            <div className="overflow-x-auto mt-4">
                <table className="table  w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Treatment</th>
                            <th>Slot</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            myAppointments.map((appointment, index) =>
                                <tr key={appointment._id}>
                                    <th>{index + 1}</th>
                                    <td>{appointment.bookedTreatment}</td>
                                    <td>{appointment.slot}</td>
                                    <td>{appointment.date}</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default MyAppointments