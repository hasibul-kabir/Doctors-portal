import React from 'react';


const AppoinmentCard = ({ availableAppointment, setSelectedAppointment }) => {
    const { _id, name, slots, cost } = availableAppointment;
    return (
        <div className="card shadow-xl">
            <div className="card-body items-center text-center">
                <h2 className="card-title font-semibold text-primary">{name}</h2>
                <p>Visiting cost: <span className='font-bold'>$ {cost}</span></p>
                <p>{`${slots.length} ${slots.length > 1 ? 'slots are' : 'slot'} available`}</p>
                <div className="card-actions justify-end">
                    <label htmlFor="book-appointment-modal" className="btn btn-primary" onClick={() => setSelectedAppointment(availableAppointment)} disabled={slots.length < 1 && true} >Book Appointment</label>
                </div>
            </div>
        </div>
    )
}

export default AppoinmentCard