import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { signOut } from 'firebase/auth';
import React from 'react';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import auth from '../../../Firebase.config';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe('pk_test_51MEUJ5BmpCE4ZHEwfshmJQUznYrKURMoxuto3Y1GiiadFbxJQxQiENBftFZRTflRGXb3dzEd2mkpJllCVib6q2b200hEMmFVIY');
const Payment = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { data, isLoading } = useQuery(['mybooking', id], () => fetch(`http://localhost:5000/mybookings/${id}`, {
        method: 'GET',
        headers: {
            'authorization': `Bearer ${localStorage.getItem('access-token')}`
        }
    })
        .then((res) => {
            if (res.status === 401 || res.status === 403) {
                signOut(auth);
                navigate('/');
                localStorage.removeItem('access-token');
            }
            return res.json()
        })
    )


    return (
        <div>
            <h2 className='text-center font-bold text-slate-600 tracking-widest mt-5'>Payment</h2>
            {
                data &&
                <div className="card w-10/12 shadow-md mx-auto">
                    <div className="card-body">
                        <h2 className="card-title">{data.bookedTreatment}</h2>
                        <p>{data.date}</p>
                        <p>Visiting cost: <span className='font-bold'>$ {data.cost}</span></p>
                    </div>

                    <div className="card-body">
                        <Elements stripe={stripePromise}>
                            <CheckoutForm data={data} />
                        </Elements>
                    </div>
                </div>
            }
        </div>
    )
}

export default Payment