import React from 'react'

const ContactUs = () => {
    return (
        <div className='text-center bg-bgImg'>
            <div className='py-16'>
                <h5 className='font-bold text-primary text-xl'>Contact Us</h5>
                <h2 className='text-4xl font-normal text-white'>Stay connected with us</h2>
                <div className='flex flex-col gap-6 justify-center items-center mt-10'>
                    <input type="email" placeholder="Email Address" className="input mx- w-full max-w-xs" />
                    <input type="text" placeholder="Subject" className="input w-full max-w-xs" />
                    <textarea className="textarea w-full max-w-xs" placeholder="Your Message"></textarea>
                    <button className="btn btn-primary">Submit</button>
                </div>
            </div>
        </div>
    )
}

export default ContactUs