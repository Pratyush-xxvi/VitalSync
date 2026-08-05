import React from 'react'
import { assets } from '../assets/assets'

function Header() {
  return (
    <div className='relative overflow-hidden bg-gradient-to-br from-blue-700 via-indigo-700 to-cyan-700 rounded-3xl my-4 text-white shadow-2xl shadow-blue-600/20'>
      
      {/* Background Decorative Blur Orbs */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className='relative z-10 flex flex-col md:flex-row items-center px-6 sm:px-10 lg:px-16 py-12 md:py-16 gap-8'>
        
        {/* Left Text Content */}
        <div className='w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left gap-6'>
          
          {/* Trust Badge */}
          <div className='inline-flex items-center gap-2 bg-white/15 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide shadow-sm'>
            <span className='w-2 h-2 rounded-full bg-emerald-400 animate-ping'></span>
            <span>Trusted Healthcare Network</span>
          </div>

          <h1 className='text-3xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight'>
            Book Appointments With <span className='text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 to-white'>Trusted Specialists</span>
          </h1>

          <div className='flex flex-col sm:flex-row items-center gap-4 text-slate-100 text-sm font-normal max-w-xl'>
            <img className='w-28 h-auto drop-shadow-md' src={assets.group_profiles} alt='Group Profiles'/>
            <p className='leading-relaxed'>
              Browse top-rated doctors, view real-time available slots, and schedule your appointment effortlessly with <strong className="text-white font-semibold">VitalSync</strong>.
            </p>
          </div>

          {/* Action Button & Stats */}
          <div className='flex flex-wrap items-center gap-4 pt-2'>
            <a 
              href='#speciality' 
              className='inline-flex items-center gap-3 bg-white text-blue-700 font-bold px-8 py-3.5 rounded-full text-sm shadow-xl hover:shadow-2xl hover:bg-cyan-50 transform hover:-translate-y-1 transition-all duration-300 group'
            >
              <span>Book Appointment</span>
              <img src={assets.arrow_icon} alt='Arrow' className='w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200'/>
            </a>
            
            <div className='flex items-center gap-4 text-xs font-medium text-blue-100 px-4 py-2 bg-white/10 backdrop-blur-xs rounded-full border border-white/10'>
              <div className='flex items-center gap-1.5'>
                <span className='font-bold text-white text-sm'>100+</span> Doctors
              </div>
              <span className='opacity-40'>|</span>
              <div className='flex items-center gap-1.5'>
                <span className='font-bold text-white text-sm'>24/7</span> Support
              </div>
            </div>
          </div>
        </div>

        {/* Right Doctor Hero Image */}
        <div className='w-full md:w-1/2 flex justify-center items-end relative pt-6 md:pt-0'>
          <div className="absolute inset-0 bg-gradient-to-t from-blue-700/60 via-transparent to-transparent z-10 pointer-events-none rounded-b-3xl"></div>
          <img
            className='w-full max-w-md lg:max-w-lg h-auto object-contain drop-shadow-2xl hover:scale-[1.02] transition-transform duration-500 relative z-0'
            src={assets.header_img}
            alt='Doctor Illustration'
          />
        </div>
      </div>
    </div>
  )
}

export default Header
