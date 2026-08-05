import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AppContext } from '../context/AppContext.jsx'; 

const AdminDashboard = () => {
    const { token } = useContext(AppContext);
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    
    const [showModal, setShowModal] = useState(false);
    const [currentAppt, setCurrentAppt] = useState(null);
    const [newDate, setNewDate] = useState('');
    const [newTime, setNewTime] = useState('');

    const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8081';
    const API_URL = `${API_BASE_URL}/api/admin`;

    const authHeader = () => ({
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

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

    useEffect(() => {
        if (token) {
            fetchAppointments();
        }
    }, [token]);

    const handleUpdateStatus = async (id, status) => {
        try {
            const url = status === 'APPROVED' 
                ? `${API_URL}/appointments/${id}/approve` 
                : `${API_URL}/appointments/${id}/reject`;
            
            await axios.patch(url, {}, authHeader());
            fetchAppointments(); 
        } catch (err) {
            console.error(`Error updating status for ${id}:`, err);
            alert('Failed to update status.');
        }
    };

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
            await axios.patch(`${API_URL}/appointments/${currentAppt.id}/reschedule`, payload, authHeader());
            setShowModal(false);
            setCurrentAppt(null);
            fetchAppointments();
        } catch (err) {
            console.error(`Error rescheduling ${currentAppt.id}:`, err);
            alert('Failed to reschedule.');
        }
    };

    if (loading) return <div className="p-12 text-center text-slate-500 font-semibold">Loading dashboard data...</div>;
    if (error) return <div className="p-12 text-center text-rose-500 font-semibold">{error}</div>;

    const approvedCount = appointments.filter(a => a.status === 'APPROVED').length;
    const pendingCount = appointments.filter(a => a.status === 'PENDING').length;
    const rejectedCount = appointments.filter(a => a.status === 'REJECTED').length;

    return (
        <div className="py-8 max-w-7xl mx-auto flex flex-col gap-8">
            <div>
                <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Admin Dashboard</h1>
                <p className="text-slate-500 text-sm">Manage patient appointments, approve requests, and reschedule slots.</p>
            </div>

            {/* Summary Widgets */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-xs flex items-center justify-between">
                    <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Approved</p>
                        <p className="text-3xl font-extrabold text-emerald-600 mt-1">{approvedCount}</p>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                        ✓
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-xs flex items-center justify-between">
                    <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Pending Approval</p>
                        <p className="text-3xl font-extrabold text-amber-600 mt-1">{pendingCount}</p>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                        ⏳
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-xs flex items-center justify-between">
                    <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Cancelled / Rejected</p>
                        <p className="text-3xl font-extrabold text-rose-600 mt-1">{rejectedCount}</p>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
                        ✕
                    </div>
                </div>
            </div>

            {/* Table Section */}
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                    <h2 className="text-lg font-bold text-slate-900">Appointment Management</h2>
                    <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                        Total: {appointments.length}
                    </span>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-slate-100">
                        <thead className="bg-slate-50/80 text-xs font-bold text-slate-500 uppercase tracking-wider">
                            <tr>
                                <th className="px-6 py-4 text-left">Patient</th>
                                <th className="px-6 py-4 text-left">Doctor</th>
                                <th className="px-6 py-4 text-left">Date & Time</th>
                                <th className="px-6 py-4 text-left">Status</th>
                                <th className="px-6 py-4 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-sm font-medium text-slate-700">
                            {appointments.length > 0 ? appointments.map((appt) => (
                                <tr key={appt.id} className="hover:bg-slate-50/60 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="font-bold text-slate-900">{appt.patientName}</div>
                                        <div className="text-xs text-slate-400">{appt.patientEmail}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap font-semibold text-blue-600">
                                        {appt.doctorName}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="font-semibold text-slate-900">{appt.appointmentDate}</div>
                                        <div className="text-xs text-slate-400">{appt.appointmentTime}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                                            appt.status === 'APPROVED' ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' :
                                            appt.status === 'REJECTED' ? 'bg-rose-50 text-rose-600 border border-rose-200' :
                                            'bg-amber-50 text-amber-600 border border-amber-200'
                                        }`}>
                                            {appt.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-xs font-bold">
                                        <div className="flex items-center gap-3">
                                            {appt.status === 'PENDING' && (
                                                <>
                                                    <button 
                                                        onClick={() => handleUpdateStatus(appt.id, 'APPROVED')}
                                                        className="px-3 py-1 bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white rounded-lg transition-colors"
                                                    >
                                                        Approve
                                                    </button>
                                                    <button 
                                                        onClick={() => handleUpdateStatus(appt.id, 'REJECTED')}
                                                        className="px-3 py-1 bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white rounded-lg transition-colors"
                                                    >
                                                        Reject
                                                    </button>
                                                </>
                                            )}
                                            <button 
                                                onClick={() => openRescheduleModal(appt)}
                                                className="px-3 py-1 bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white rounded-lg transition-colors"
                                            >
                                                Reschedule
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="5" className="px-6 py-8 text-center text-slate-400">No appointments found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Reschedule Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex justify-center items-center z-50 p-4">
                    <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-2xl w-full max-w-md border border-slate-100 flex flex-col gap-6">
                        <div>
                            <h2 className="text-xl font-bold text-slate-900">Reschedule Appointment</h2>
                            <p className="text-xs text-slate-500 mt-1">Rescheduling for patient: <strong className="text-slate-800">{currentAppt?.patientName}</strong></p>
                        </div>
                        
                        <form onSubmit={handleReschedule} className="flex flex-col gap-4">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-bold uppercase tracking-wider text-slate-600" htmlFor="reschedule-date">New Date</label>
                                <input 
                                    type="date" 
                                    id="reschedule-date"
                                    value={newDate}
                                    onChange={(e) => setNewDate(e.target.value)}
                                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm font-semibold focus:ring-2 focus:ring-blue-500/20 outline-none"
                                    required
                                />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-bold uppercase tracking-wider text-slate-600" htmlFor="reschedule-time">New Time</label>
                                <input 
                                    type="time" 
                                    id="reschedule-time"
                                    value={newTime}
                                    onChange={(e) => setNewTime(e.target.value)}
                                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm font-semibold focus:ring-2 focus:ring-blue-500/20 outline-none"
                                    required
                                />
                            </div>
                            <div className="flex justify-end gap-3 pt-2">
                                <button 
                                    type="button" 
                                    onClick={() => setShowModal(false)}
                                    className="px-5 py-2.5 rounded-full text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit"
                                    className="px-5 py-2.5 rounded-full text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md transition-colors"
                                >
                                    Confirm
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;