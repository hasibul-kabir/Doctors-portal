import React from 'react';
import Service from './Service';
import fluoride from '../../assets/images/fluoride.png';
import cavity from '../../assets/images/cavity.png';
import whitening from '../../assets/images/whitening.png';
import ServicesCare from './ServicesCare';

const Services = () => {
    return (
        <div className=' my-10 lg:my-28'>

            <div className='text-center'>
                <p className='text-xl text-primary font-bold uppercase'>Our Services</p>
                <h2 className='text-4xl font-normal my-2'>Services We Provide</h2>
            </div>

            <div className='flex flex-col lg:flex-row gap-5'>
                <Service icon={fluoride} title='Fluoride Treatment' des='Lorem Ipsum is simply dummy printing and typesetting indust Ipsum has been the' />
                <Service icon={cavity} title='Cavity Filling' des='Lorem Ipsum is simply dummy printing and typesetting indust Ipsum has been the' />
                <Service icon={whitening} title='Teeth Whitening' des='Lorem Ipsum is simply dummy printing and typesetting indust Ipsum has been the' />
            </div>

            <div>
                <ServicesCare />
            </div>
        </div>
    )
}

export default Services