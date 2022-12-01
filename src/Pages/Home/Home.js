import React from 'react'
import Banner from './Banner'
import InfoCard from './InfoCard'
import clock from '../../assets/icons/clock.svg';
import marker from '../../assets/icons/marker.svg';
import phone from '../../assets/icons/phone.svg';
import Services from './Services';
import AppointmentLink from './AppointmentLink';
import TestimonialLink from './TestimonialLink';
import ContactUs from './ContactUs';

const Home = () => {
    return (
        <div className='lg:mx-16 mx-8'>
            <section id='banner'>
                <Banner />
                <div className='flex flex-col lg:flex-row gap-5'>
                    <InfoCard title='Opening Hours' icon={clock} des='Lorem Ipsum is simply dummy text of the pri' />
                    <InfoCard title='Visit our location' icon={marker} des='Brooklyn, NY 10036, United States' />
                    <InfoCard title='Contact us now' icon={phone} des='+000 123 456789' />
                </div>
            </section>

            <section id='services'>
                <Services />
            </section>

            <section id='appointment'>
                <AppointmentLink />
            </section>

            <section id='testimonial'>
                <TestimonialLink />
            </section>

            <section>
                <ContactUs />
            </section>
        </div>
    )
}

export default Home