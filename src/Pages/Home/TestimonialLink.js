import React from 'react';
import quote from '../../assets/icons/quote.svg';
import TestimonialCard from './TestimonialCard';
import people1 from '../../assets/images/people1.png';
import people2 from '../../assets/images/people2.png';
import people3 from '../../assets/images/people3.png';

const TestimonialLink = () => {
    return (
        <div>
            <div className='flex justify-between'>
                <div>
                    <h5 className='text-xl font-bold text-primary'>Testimonial</h5>
                    <h2 className='font-normal text-4xl mt-2.5'>What Our Patients Says</h2>
                </div>
                <img className='w-48' src={quote} />
            </div>

            <div className='flex flex-col lg:flex-row gap-6 my-20'>
                <TestimonialCard name="Winson Herry" img={people2} city="NewYork" des="It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content" />
                <TestimonialCard name="Winson Herry" img={people1} city="NewYork" des="It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content" />
                <TestimonialCard name="Winson Herry" img={people3} city="NewYork" des="It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content" />
            </div>
        </div>
    )
}

export default TestimonialLink