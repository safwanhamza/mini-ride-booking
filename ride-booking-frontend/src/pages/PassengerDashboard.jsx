import { useEffect, useState } from 'react';
import axios from '../api/axios';
import { Link } from 'react-router-dom';


export default function PassengerDashboard() {
    const [rides, setRides] = useState([]);

    useEffect(() => {
        axios.get('/rides')
            .then(res => setRides(res.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">My Ride History</h1>
            {rides.length === 0 ? (
                <p>No rides found.</p>
            ) : (
                <ul className="space-y-3">
                    {rides.map(ride => (
                        <li key={ride.id} className="bg-white shadow p-4 rounded">
                            <div><strong>From:</strong> {ride.pickup_location}</div>
                            <div><strong>To:</strong> {ride.drop_location}</div>
                            <div><strong>Type:</strong> {ride.ride_type}</div>
                            <div><strong>Status:</strong> <span className="uppercase">{ride.status}</span></div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
        ;
}
