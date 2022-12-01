import React from 'react'

const TestimonialCard = ({ name, img, des, city }) => {
    return (
        <div className="hero text-black rounded-md cursor-pointer shadow-xl">
            <div className="hero-content flex-col items-start">
                <p className='lg:w-80 text-base font-normal'>{des}</p>
                <div className='flex flex-row gap-5 justify-start  mt-9'>
                    <div className="avatar">
                        <div className="w-14 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                            <img src={img} />
                        </div>
                    </div>
                    <div>
                        <h5 className='font-semibold text-xl'>{name}</h5>
                        <p>{city}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TestimonialCard