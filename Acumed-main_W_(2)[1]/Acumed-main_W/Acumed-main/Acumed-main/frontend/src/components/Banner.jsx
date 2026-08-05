import React from 'react'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'

function Banner() {
    const navigate = useNavigate();

    return (
        <div className='relative overflow-hidden bg-gradient-to-r from-indigo-700 via-blue-600 to-cyan-600 rounded-3xl my-20 shadow-2xl shadow-blue-500/20 text-white'>
            
            {/* Background Orbs */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none"></div>

            <div className='flex items-center justify-between px-8 sm:px-12 md:px-16 py-12 md:py-16'>
                {/* Left Side */}
                <div className='flex-1 max-w-xl flex flex-col items-start gap-5 relative z-10'>
                    <span className='inline-flex items-center gap-2 bg-white/15 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-bold text-white border border-white/20'>
                        Start Your Healthcare Journey
                    </span>

                    <h2 className='text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight tracking-tight'>
                        Book Appointments Easily With <span className='text-cyan-200'>100+ Trusted Specialists</span>
                    </h2>

                    <p className='text-slate-100 text-sm font-medium leading-relaxed max-w-md'>
                        Join thousands of satisfied patients who rely on <strong className='text-white font-bold'>VitalSync</strong> for fast, secure doctor bookings and healthcare management.
                    </p>

                    <button 
                        onClick={() => { navigate('/login'); scrollTo({ top: 0, behavior: 'smooth' }); }} 
                        className='mt-2 bg-white text-blue-700 font-extrabold text-sm sm:text-base px-8 py-3.5 rounded-full shadow-lg hover:shadow-2xl hover:bg-cyan-50 transform hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2'
                    >
                        <span>Create Free Account</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                    </button>
                </div>

                {/* Right Side Image */}
                <div className='hidden md:block w-1/2 lg:w-[350px] relative self-end'>
                    <img 
                        className='w-full h-auto object-contain max-w-md drop-shadow-2xl transform hover:scale-105 transition-transform duration-500' 
                        src={assets.appointment_img} 
                        alt='Appointment Booking'
                    />
                </div>
            </div>
        </div>
    )
}

export default Banner