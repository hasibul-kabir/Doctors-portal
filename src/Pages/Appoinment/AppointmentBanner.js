import React from 'react';
import chair from '../../assets/images/chair.png';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

const AppointmentBanner = ({ selectedDate, setSelectedDate }) => {
    return (
        <div className="hero min-h-screen ">
            <div className="hero-content  flex-col gap-x-24 lg:flex-row-reverse">
                <img src={chair} className="max-w-sm  rounded-lg" />
                <DayPicker
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                />
            </div>
        </div>

    )
}

export default AppointmentBanner