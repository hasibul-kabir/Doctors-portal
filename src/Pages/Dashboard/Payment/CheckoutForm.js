import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const CheckoutForm = ({ data }) => {
    const [processing, setProcessing] = useState(false);
    const [clientSecret, setClientSecret] = useState('');
    const [error, setError] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const { _id, patient, email, cost } = data;


    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch('http://localhost:5000/create-payment-intent', {
            method: "POST",
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${localStorage.getItem('access-token')}`
            },
            body: JSON.stringify({ cost }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.clientSecret) {
                    setClientSecret(data.clientSecret)
                }
            });
    }, [cost]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setProcessing(true)
        const card = elements.getElement(CardElement);
        if (elements == null) {
            return;
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        });
        setError(error ? error.message : '')

        stripe
            .confirmCardPayment(clientSecret, {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: patient,
                        email: email

                    },
                },
            })
            .then(function (result) {
                if (result.paymentIntent) {
                    toast.success('Your payment is done!', {
                        position: toast.POSITION.TOP_CENTER
                    });

                    const payment = {
                        payerEmail: email,
                        amount: cost,
                        paidFor: _id,
                        transactionId: result.paymentIntent.id
                    }
                    fetch(`http://localhost:5000/mybookings/${_id}`, {
                        method: 'PATCH',
                        headers: {
                            'content-type': 'application/json',
                            'authorization': `Bearer ${localStorage.getItem('access-token')}`
                        },
                        body: JSON.stringify({ payment })
                    })
                        .then((res) => res.json())
                        .then((data) => {
                            // console.log(data.modifiedCount);
                            setProcessing(false);
                        })
                } else {
                    toast.error(result?.error?.message, {
                        position: toast.POSITION.TOP_CENTER
                    });
                    setProcessing(false);
                }
            });
    }


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <CardElement />
                {
                    processing ?
                        <button className='btn loading btn-primary btn-sm w-full mt-4'>Processi</button>
                        :
                        <button className='btn btn-primary btn-sm w-full mt-4' type="submit" disabled={!stripe || !elements || !clientSecret}>
                            Pay
                        </button>
                }
            </form>
            {
                error && <p className='text-error'>{error}</p>
            }
        </div>
    )
}

export default CheckoutForm