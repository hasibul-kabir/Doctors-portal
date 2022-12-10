import React, { useState } from 'react';

const useAuthToken = (user) => {
    const [token, setToken] = useState('');
    const email = user?.user?.email;
    const name = user?.user?.displayName;

    if (email) {
        fetch(`http://localhost:5000/user/${email}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                userName: name
            })
        })
            .then((res) => res.json())
            .then((data) => {
                // console.log(data);
                const accessToken = data.token;
                localStorage.setItem('access-token', accessToken);
                setToken(accessToken);
            })
    }

    return [token]
}

export default useAuthToken;