import React, { useState } from 'react';
import { format } from 'date-fns';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../Firebase.config';
import { toast } from 'react-toastify';

const AppointmentBookingModal = ({ selectedAppointment, setSelectedAppointment, selectedDate }) => {
    const [loading, setLoading] = useState(false);
    const { name, slots, cost } = selectedAppointment;
    const [user] = useAuthState(auth);
    const [slot, setSlot] = useState(slots[0]);
    const [phone, setPhone] = useState('');
    const date = format(selectedDate, 'PP');
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        fetch('http://localhost:5000/booked', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                bookedTreatment: name,
                date: date,
                patient: user?.displayName,
                email: user?.email,
                phone: phone,
                slot: slot,
                cost: cost
            }),

        })
            .then((res) => res.json())
            .then((data) => {
                setLoading(false);
                setSelectedAppointment(false);
                if (data.success) {
                    toast.success("Your booking done!", {
                        position: toast.POSITION.TOP_CENTER
                    });
                } else {
                    toast.error(data.message, {
                        position: toast.POSITION.TOP_CENTER
                    });
                }

            })
            .catch((error) => {
                setLoading(false);
                toast.error("Failed to book appointment!", {
                    position: toast.POSITION.TOP_CENTER
                });
            })
    }
    return (
        <div>
            <input type="checkbox" id="book-appointment-modal" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <label htmlFor="book-appointment-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="font-bold text-lg">{name}</h3>
                    <form className='flex flex-col gap-6 my-10 justify-center items-center' onSubmit={handleSubmit} >
                        <input type="text" className="input w-full max-w-xs" value={format(selectedDate, 'PP')} disabled />
                        <select className="select w-full max-w-xs" value={slot} onChange={(e) => setSlot(e.target.value)}>
                            {
                                slots.map((slot, index) =>
                                    <option key={index}>{slot}</option>
                                )
                            }
                        </select>
                        <input type="text" placeholder="Full name" className="input w-full max-w-xs" value={user?.displayName} disabled />
                        <input type="text" placeholder="Email" className="input w-full max-w-xs" value={user?.email} disabled />
                        <input type="text" placeholder="Phone number" className="input w-full max-w-xs" value={phone} onChange={(e) => setPhone(e.target.value)} />
                        {
                            loading ?
                                <button className="btn loading">loading</button>
                                :
                                <input type="submit" className="btn bg-primary w-full max-w-xs" value='Submit' />
                        }
                    </form>
                </div>
            </div>
        </div>
    )

}

export default AppointmentBookingModal