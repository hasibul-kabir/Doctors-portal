import React, { useState } from 'react';
import AppointmentBanner from './AppointmentBanner';
import AvailableAppointments from './AvailableAppointments';


const Appoinment = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    return (
        <div className='max-w-6xl lg:mx-auto mx-6'>
            <section id='appointmentBanner'>
                <AppointmentBanner selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
            </section>
            <section id='availableAppoinments'>
                <AvailableAppointments selectedDate={selectedDate} />
            </section>
        </div>
    )
}

export default Appoinment