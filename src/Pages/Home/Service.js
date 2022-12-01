import React from 'react';

const Service = ({ icon, title, des }) => {
    return (
        <div className="hero mt-16 cursor-pointer shadow-xl">
            <div className="hero-content flex-col">
                <img src={icon} className="max-w-sm" />
                <div className='text-center'>
                    <h1 className="text-xl font-semibold">{title}</h1>
                    <p className="text-base py-6">{des}</p>
                </div>
            </div>
        </div>
    )
}

export default Service