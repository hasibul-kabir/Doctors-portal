import { format } from 'date-fns';
import React from 'react';

const AppointmentBookingModal = ({ selectedAppointment, selectedDate }) => {
    const { name, slots } = selectedAppointment;
    return (
        <div>
            <input type="checkbox" id="book-appointment-modal" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <label htmlFor="book-appointment-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="font-bold text-lg">{name}</h3>
                    <form className='flex flex-col gap-6 my-10 justify-center items-center'>
                        <input type="text" className="input w-full max-w-xs" value={format(selectedDate, 'PP')} disabled />
                        <select className="select w-full max-w-xs">
                            {
                                slots.map((slot) =>
                                    <option>{slot}</option>
                                )
                            }
                        </select>
                        <input type="text" placeholder="Full name" className="input w-full max-w-xs" />
                        <input type="text" placeholder="Phone number" className="input w-full max-w-xs" />
                        <input type="text" placeholder="Email" className="input w-full max-w-xs" />
                        <input type="submit" className="btn bg-primary w-full max-w-xs" value='Submit' />
                    </form>
                </div>
            </div>
        </div>
    )

}

export default AppointmentBookingModal