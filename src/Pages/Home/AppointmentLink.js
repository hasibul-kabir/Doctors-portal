import React from 'react';
import doctor from '../../assets/images/doctor-small.png';

const AppointmentLink = () => {
    return (
        <div className="hero bg-bgImg my-20">
            <div className="hero-content lg:px-36 justify-center flex-col lg:flex-row lg:gap-x-24">
                <img src={doctor} className="max-w-sm hidden flex-1 lg:block" />
                <div className='flex-1 text-white'>
                    <h5 className='text-primary font-bold text-xl my-5'>Appoinment</h5>
                    <h1 className="text-5xl font-bold">Make an appointment Today</h1>
                    <p className="my-6">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsumis that it has a more-or-less normal distribution of letters,as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page</p>
                    <button className="btn btn-primary">Get Started</button>
                </div>
            </div>
        </div>
    )
}

export default AppointmentLink