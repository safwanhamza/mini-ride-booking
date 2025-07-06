import { useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [form, setForm] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/auth/login', form);
            localStorage.setItem('token', res.data.token);
            const decoded = JSON.parse(atob(res.data.token.split('.')[1]));
            navigate(decoded.type === 'driver' ? '/driver' : '/passenger');
        } catch (err) {
            alert('Login failed');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form className="bg-white p-6 rounded shadow-md w-full max-w-sm" onSubmit={handleSubmit}>
                <h2 className="text-xl font-bold mb-4">Login</h2>
                <input className="mb-2 p-2 border w-full" type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
                <input className="mb-4 p-2 border w-full" type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
                <button className="bg-blue-500 text-white px-4 py-2 w-full rounded hover:bg-blue-600">Login</button>
            </form>
        </div>
    );
}
