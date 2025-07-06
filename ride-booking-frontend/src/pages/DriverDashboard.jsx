import { useEffect, useState } from 'react';
import axios from '../api/axios';

export default function DriverDashboard() {
    const [rides, setRides] = useState([]);
    const [availability, setAvailability] = useState('');

    const fetchRides = async () => {
        try {
            const res = await axios.get('/rides/available');
            setRides(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const toggleAvailability = async () => {
        try {
            const res = await axios.patch('/users/availability');
            setAvailability(res.data.status);
        } catch (err) {
            alert('Failed to toggle availability');
        }
    };

    const handleAction = async (id, action) => {
        try {
            await axios.post(`/rides/${id}/${action}`);
            fetchRides(); // Refresh
        } catch (err) {
            alert(`Failed to ${action} ride`);
        }
    };

    useEffect(() => {
        fetchRides();
    }, []);

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Driver Dashboard</h1>
            <button
                onClick={toggleAvailability}
                className="mb-6 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
                Toggle Availability ({availability || 'unknown'})
            </button>

            {rides.length === 0 ? (
                <p>No available rides</p>
            ) : (
                <ul className="space-y-4">
                    {rides.map((ride) => (
                        <li key={ride.id} className="bg-white shadow p-4 rounded">
                            <div><strong>From:</strong> {ride.pickup_location}</div>
                            <div><strong>To:</strong> {ride.drop_location}</div>
                            <div><strong>Passenger:</strong> {ride.Passenger?.name}</div>
                            <div className="mt-2 flex gap-2">
                                <button onClick={() => handleAction(ride.id, 'accept')} className="bg-green-500 text-white px-3 py-1 rounded">Accept</button>
                                <button onClick={() => handleAction(ride.id, 'reject')} className="bg-red-500 text-white px-3 py-1 rounded">Reject</button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
