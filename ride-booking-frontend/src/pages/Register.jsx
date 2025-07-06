import { useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const [form, setForm] = useState({ name: '', email: '', password: '', type: 'passenger' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/auth/register', form);
            navigate('/login');
        } catch (err) {
            alert('Registration failed');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form className="bg-white p-6 rounded shadow-md w-full max-w-sm" onSubmit={handleSubmit}>
                <h2 className="text-xl font-bold mb-4">Register</h2>
                <input className="mb-2 p-2 border w-full" type="text" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                <input className="mb-2 p-2 border w-full" type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
                <input className="mb-2 p-2 border w-full" type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
                <select className="mb-4 p-2 border w-full" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
                    <option value="passenger">Passenger</option>
                    <option value="driver">Driver</option>
                </select>
                <button className="bg-green-500 text-white px-4 py-2 w-full rounded hover:bg-green-600">Register</button>
            </form>
        </div>
    );
}
