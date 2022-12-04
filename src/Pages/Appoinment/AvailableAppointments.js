import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import AppoinmentCard from './AppoinmentCard';
import AppointmentBookingModal from './AppointmentBookingModal';

const AvailableAppointments = ({ selectedDate }) => {
    const [availableAppointments, setAvailableAppointments] = useState([]);
    const [selectedAppointment, setSelectedAppointment] = useState(null);

    useEffect(() => {
        fetch('http://localhost:5000/appointments')
            .then(response => response.json())
            .then(data => setAvailableAppointments(data));
    }, [])

    return (
        <div className=' my-10'>
            <p className='text-xl font-normal text-primary text-center' >Available Appointments on {format(selectedDate, 'PP')}</p>

            <div className=' my-10 grid lg:grid-cols-3 sm:grid-cols-1 md:grid-cols-2 gap-6'>
                {
                    availableAppointments.map((availableAppointment) =>
                        <AppoinmentCard key={availableAppointment._id} availableAppointment={availableAppointment} setSelectedAppointment={setSelectedAppointment} />
                    )
                }
            </div>
            {
                selectedAppointment && <AppointmentBookingModal selectedAppointment={selectedAppointment} selectedDate={selectedDate} />
            }
        </div>
    )
}

export default AvailableAppointments