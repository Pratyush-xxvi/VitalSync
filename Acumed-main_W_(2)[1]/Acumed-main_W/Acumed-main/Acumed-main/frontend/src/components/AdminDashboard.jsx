import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
// --- FIX 1: Corrected the import path ---
import { AppContext } from '../context/AppContext.jsx'; 

const AdminDashboard = () => {
    const { token } = useContext(AppContext);
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    
    // State for the reschedule modal
    const [showModal, setShowModal] = useState(false);
    const [currentAppt, setCurrentAppt] = useState(null);
    const [newDate, setNewDate] = useState('');
    const [newTime, setNewTime] = useState('');

    const API_URL = 'http://localhost:8081/api/admin';

    // 1. Function to create authorization headers
    const authHeader = () => ({
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    // 2. Function to fetch all appointments
    const fetchAppointments = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await axios.get(`${API_URL}/appointments`, authHeader());
            setAppointments(response.data);
        } catch (err) {
            console.error("Error fetching appointments:", err);
            setError('Failed to fetch appointments. Are you logged in as an admin?');
        } finally {
            setLoading(false);
        }
    };

    // 3. Fetch appointments when the component loads
    useEffect(() => {
        if (token) {
            fetchAppointments();
        }
    }, [token]);

    // 4. Function to handle status updates (Approve/Reject)
    const handleUpdateStatus = async (id, status) => {
        try {
            const url = status === 'APPROVED' 
                ? `${API_URL}/appointments/${id}/approve` 
                : `${API_URL}/appointments/${id}/reject`;
            
            // --- FIX 2: Changed from .put to .patch ---
            await axios.patch(url, {}, authHeader());
            
            // Refresh the list after update
            fetchAppointments(); 
        } catch (err) {
            console.error(`Error updating status for ${id}:`, err);
            alert('Failed to update status.');
        }
    };

    // 5. Functions to handle rescheduling
    const openRescheduleModal = (appointment) => {
        setCurrentAppt(appointment);
        setShowModal(true);
        setNewDate('');
        setNewTime('');
    };

    const handleReschedule = async (e) => {
        e.preventDefault();
        if (!currentAppt || !newDate || !newTime) return;

        try {
            const payload = { newDate, newTime };
            // --- FIX 2: Changed from .put to .patch ---
            await axios.patch(`${API_URL}/appointments/${currentAppt.id}/reschedule`, payload, authHeader());
            
            // Close modal and refresh list
            setShowModal(false);
            setCurrentAppt(null);
            fetchAppointments();
        } catch (err) {
            console.error(`Error rescheduling ${currentAppt.id}:`, err);
            alert('Failed to reschedule.');
        }
    };

    if (loading) return <div className="p-4 text-center">Loading dashboard...</div>;
    if (error) return <div className="p-4 text-center text-red-500">{error}</div>;

    return (
        <div className="p-4 md:p-8">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Admin Dashboard</h1>
            <h2 className="text-xl font-semibold mb-4 text-gray-700">All Appointments</h2>

            <div className="overflow-x-auto bg-white rounded-lg shadow">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doctor</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {appointments.length > 0 ? appointments.map((appt) => (
                            <tr key={appt.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">{appt.patientName}</div>
                                    <div className="text-sm text-gray-500">{appt.patientEmail}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{appt.doctorName}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">{appt.appointmentDate}</div>
                                    <div className="text-sm text-gray-500">{appt.appointmentTime}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                        appt.status === 'APPROVED' ? 'bg-green-100 text-green-800' :
                                        appt.status === 'REJECTED' ? 'bg-red-100 text-red-800' :
                                        'bg-yellow-100 text-yellow-800'
                                    }`}>
                                        {appt.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    {appt.status === 'PENDING' && (
                                        <>
                                            <button 
                                                onClick={() => handleUpdateStatus(appt.id, 'APPROVED')}
                                                className="text-green-600 hover:text-green-900 mr-3">Approve</button>
                                            <button 
                                                // --- FIX 3: Corrected the typo (was .id) ---
                                                onClick={() => handleUpdateStatus(appt.id, 'REJECTED')}
                                                className="text-red-600 hover:text-red-900 mr-3">Reject</button>
                                        </>
                                    )}
                                    <button 
                                        onClick={() => openRescheduleModal(appt)}
                                        className="text-indigo-600 hover:text-indigo-900">Reschedule</button>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="5" className="px-6 py-4 text-center text-gray-500">No appointments found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Reschedule Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4">Reschedule Appointment</h2>
                        <p className="mb-4 text-sm">Rescheduling for: <span className="font-semibold">{currentAppt?.patientName}</span></p>
                        <form onSubmit={handleReschedule}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="reschedule-date">New Date</label>
                                <input 
                                    type="date" 
                                    id="reschedule-date"
                                    value={newDate}
                                    // --- FIX 4: Corrected the typo (was e.t.value) ---
                                    onChange={(e) => setNewDate(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                    required
                                />
                            </div>
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="reschedule-time">New Time</label>
                                <input 
                                    type="time" 
                                    id="reschedule-time"
                                    value={newTime}
                                    onChange={(e) => setNewTime(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                    required
                                />
                            </div>
                            <div className="flex justify-end gap-4">
                                <button 
                                    type="button" 
                                    onClick={() => setShowModal(false)}
                                    className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg">Cancel</button>
                                <button 
                                    type="submit"
                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg">Confirm</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;