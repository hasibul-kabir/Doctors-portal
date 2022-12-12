import React from 'react'

const ManageDoctors = () => {
    return (
        <div>
            <h2 className='text-center font-bold text-slate-600 tracking-widest mt-5'>Add Doctor</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>1</th>
                            <th>
                                <div className='avatar'>
                                    <div className="w-8 rounded-xl">
                                        <img src="https://placeimg.com/192/192/people" />
                                    </div>
                                </div>
                            </th>
                            <td>Cy Ganderton</td>
                            <td>Quality Control Specialist</td>
                            <td>Blue</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ManageDoctors