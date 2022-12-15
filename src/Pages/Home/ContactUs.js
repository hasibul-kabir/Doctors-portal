import React, { useState } from 'react';
import { toast } from 'react-toastify';

const ContactUs = () => {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        fetch('http://localhost:5000/contact-message', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                subject: subject,
                message: message
            })
        })
            .then((res) => res.json())
            .then((data) => {
                setEmail('');
                setSubject('');
                setMessage('');
                setLoading(false);
                toast.success('Message sent!', {
                    position: toast.POSITION.TOP_CENTER
                })
            })
            .catch((error) => {
                setEmail('');
                setSubject('');
                setMessage('');
                setLoading(false);
                toast.error('Failed to send message!', {
                    position: toast.POSITION.TOP_CENTER
                })
            })
    }
    return (
        <div className='text-center bg-bgImg'>
            <div className='py-16'>
                <h5 className='font-bold text-primary text-xl'>Contact Us</h5>
                <h2 className='text-4xl font-normal text-white'>Stay connected with us</h2>
                <form className='flex flex-col gap-6 justify-center items-center mt-10' onSubmit={handleSubmit}>
                    <input type="email" placeholder="Email Address" className="input mx- w-full max-w-xs" required value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input type="text" placeholder="Subject" className="input w-full max-w-xs" required value={subject} onChange={(e) => setSubject(e.target.value)} />
                    <textarea className="textarea w-full max-w-xs" placeholder="Your Message" required value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
                    {
                        loading ?
                            <button className="btn btn-primary loading">loading</button>
                            :
                            <button type='submit' className="btn btn-primary">Submit</button>
                    }
                </form>
            </div>
        </div>
    )
}

export default ContactUs