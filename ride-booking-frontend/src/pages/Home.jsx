import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200 text-center px-4">
            <h1 className="text-4xl font-bold mb-6 text-gray-800">🚗 Mini Ride Booking System</h1>
            <p className="mb-8 text-gray-600 text-lg">Built with Node.js, React, and SQLite</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-md">
                <Link to="/login" className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded text-lg">Login</Link>
                <Link to="/register" className="bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded text-lg">Register</Link>
                <Link to="/request" className="bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded text-lg">Request a Ride</Link>
                <Link to="/passenger" className="bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded text-lg">Passenger Dashboard</Link>
                <Link to="/driver" className="bg-yellow-500 hover:bg-yellow-600 text-white py-3 px-4 rounded text-lg">Driver Dashboard</Link>
                <Link to="/ride-status" className="bg-red-500 hover:bg-red-600 text-white py-3 px-4 rounded text-lg">Update Ride Status</Link>
            </div>
        </div>
    );
}
