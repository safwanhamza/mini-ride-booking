import { useState } from 'react';
import axios from '../api/axios';

export default function UpdateRideStatus() {
    const [rideId, setRideId] = useState('');
    const [status, setStatus] = useState('in_progress');

    const handleUpdate = async () => {
        try {
            await axios.patch(`/rides/${rideId}/status`, { status });
            alert('Ride status updated!');
        } catch (err) {
            alert('Failed to update status');
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100">
            <div className="bg-white p-6 rounded shadow max-w-md w-full">
                <h2 className="text-xl font-bold mb-4">Update Ride Status</h2>
                <input className="border p-2 w-full mb-2" type="text" placeholder="Ride ID" value={rideId} onChange={(e) => setRideId(e.target.value)} />
                <select className="border p-2 w-full mb-4" value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                </select>
                <button onClick={handleUpdate} className="bg-blue-600 text-white px-4 py-2 w-full rounded hover:bg-blue-700">Update Status</button>
            </div>
        </div>
    );
}
