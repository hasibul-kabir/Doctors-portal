import React from 'react';

const InfoCard = ({ title, icon, des }) => {
    return (
        <div className="hero bg-primary text-white rounded-md cursor-pointer hover:bg-slate-700">
            <div className="hero-content flex-col lg:flex-row">
                <img src={icon} className="max-w-sm rounded-lg shadow-2xl" />
                <div>
                    <h1 className="text-xl font-semibold">{title}</h1>
                    <p className="text-base py-4">{des}</p>
                </div>
            </div>
        </div>
    )
}

export default InfoCard