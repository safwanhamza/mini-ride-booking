import { useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';

export default function RequestRide() {
    const [form, setForm] = useState({
        pickup_location: '',
        drop_location: '',
        ride_type: 'car'
    });

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/rides', form);
            alert('Ride requested successfully!');
            navigate('/passenger');
        } catch (err) {
            alert('Failed to request ride');
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white shadow p-6 rounded w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">Request a Ride</h2>
                <input className="border p-2 w-full mb-2" type="text" placeholder="Pickup Location" value={form.pickup_location} onChange={(e) => setForm({ ...form, pickup_location: e.target.value })} required />
                <input className="border p-2 w-full mb-2" type="text" placeholder="Drop Location" value={form.drop_location} onChange={(e) => setForm({ ...form, drop_location: e.target.value })} required />
                <select className="border p-2 w-full mb-4" value={form.ride_type} onChange={(e) => setForm({ ...form, ride_type: e.target.value })}>
                    <option value="bike">Bike</option>
                    <option value="car">Car</option>
                    <option value="rickshaw">Rickshaw</option>
                </select>
                <button className="bg-blue-500 text-white w-full py-2 rounded hover:bg-blue-600">Request Ride</button>
            </form>
        </div>
    );
}
