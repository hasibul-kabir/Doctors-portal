import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../Firebase.config';

const Doctors = () => {
    const [loading, setLoading] = useState(false);
    const [treatments, setTreatments] = useState([]);
    const [name, setName] = useState('');
    const [dEmail, setDemail] = useState('');
    const [file, setFile] = useState(null);
    const [workArea, setWorkArea] = useState(treatments[0]);
    const navigate = useNavigate();


    useEffect(() => {
        fetch(`http://localhost:5000/appointments`)
            .then((res) => res.json())
            .then((data) => {
                setTreatments(data)
            })
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        if (file) {
            const formdata = new FormData();
            formdata.append('image', file[0]);
            const url = `https://api.imgbb.com/1/upload?key=e44f20cbd1218d5526ea633eb116027f`;
            fetch(url, {
                method: 'POST',
                body: formdata
            })
                .then((res) => res.json())
                .then((result) => {
                    if (result.success) {
                        fetch(`http://localhost:5000/doctor`, {
                            method: 'POST',
                            headers: {
                                'Content-type': 'application/json',
                                'authorization': `Bearer ${localStorage.getItem('access-token')}`
                            },
                            body: JSON.stringify({
                                name: name,
                                email: dEmail,
                                workArea: workArea,
                                image: result.data.url
                            })
                        })
                            .then((res) => {
                                if (res.status === 401 || res.status === 403) {
                                    signOut(auth);
                                    navigate('/');
                                    localStorage.removeItem('access-token');
                                }
                                return res.json()
                            })
                            .then((data) => {
                                setLoading(false);
                                setName('');
                                setDemail('');
                                setFile(null);
                                if (data.success) {
                                    toast.success("Doctor added successfully!", {
                                        position: toast.POSITION.TOP_CENTER
                                    });
                                } else {
                                    toast.error(data.message, {
                                        position: toast.POSITION.TOP_CENTER
                                    });
                                }
                            })
                            .catch((error) => {
                                setLoading(false);
                                setName('');
                                setDemail('');
                                setFile(null);
                                toast.error("Failed to Add doctor!", {
                                    position: toast.POSITION.TOP_CENTER
                                });
                            })
                    }

                })
        }
    }

    return (
        <div>
            <h2 className='text-center font-bold text-slate-600 tracking-widest mt-5'>Add Doctor</h2>
            <div className="hero-content">
                <div className="card flex-shrink-0 w-full max-w-md shadow-2xl bg-base-100">
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="form-control">
                                <label className="block text-sm font-medium text-gray-700">Name</label>
                                <input type="text" placeholder="Name" className="input input-bordered" required value={name} onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className="form-control">
                                <label className="block text-sm font-medium text-gray-700">Email</label>
                                <input type="email" placeholder="Email" className="input input-bordered" required value={dEmail} onChange={(e) => setDemail(e.target.value)} />
                            </div>
                            <div className="form-control">
                                <label className="block text-sm font-medium text-gray-700">Area of work</label>
                                <select className="select select-bordered w-full max-w-md" value={workArea} onChange={(e) => setWorkArea(e.target.value)}>
                                    {
                                        treatments?.map((treatment) =>
                                            <option key={treatment._id}>{treatment.name}</option>
                                        )
                                    }
                                </select>
                            </div>

                            <div className="form-control">
                                <label className="block text-sm font-medium text-gray-700">Add Photo</label>
                                <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                                    {
                                        file ?
                                            <div className='text-blue-600 font-bold'>{file[0].name}</div>
                                            :
                                            <div className="space-y-1 text-center">
                                                <svg
                                                    className="mx-auto h-12 w-12 text-gray-400"
                                                    stroke="currentColor"
                                                    fill="none"
                                                    viewBox="0 0 48 48"
                                                    aria-hidden="true"
                                                >
                                                    <path
                                                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                                        strokeWidth={2}
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </svg>
                                                <div className="flex text-sm text-gray-600">
                                                    <label
                                                        htmlFor="file-upload"
                                                        className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                                                    >
                                                        <span>Upload a file</span>
                                                        <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={(e) => setFile(e.target.files)} />
                                                    </label>
                                                    <p className="pl-1">or drag and drop</p>
                                                </div>
                                                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                                            </div>

                                    }

                                </div>
                            </div>


                            <div className="form-control mt-6">
                                {
                                    loading ?
                                        <button className="btn loading">loading</button>
                                        :
                                        <button className="btn btn-primary">Submit</button>
                                }
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Doctors