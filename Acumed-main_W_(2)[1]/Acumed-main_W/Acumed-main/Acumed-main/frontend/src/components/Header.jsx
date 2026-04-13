import React from 'react'
import { assets } from '../assets/assets'

function Header() {
  return (
    <div className='flex flex-col md:flex-row bg-blue-500 rounded-lg px-6 md:px-10 lg:px-20 overflow-hidden'>
      
      {/* Left Text Section */}
      <div className='w-full md:w-1/2 flex flex-col justify-center gap-6 py-10 md:py-[8vw]'>
        <p className='text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-wide text-center md:text-left'>
          Book Appointment with Trusted Doctors
        </p>

        <div className='flex flex-col md:flex-row items-center gap-4 text-white text-base font-light'>
          <img className='w-28' src={assets.group_profiles} alt='group profiles'/>
          <p className='text-center md:text-left leading-relaxed'>
            Simply browse through our extensive list of doctors, 
            select your preferred date and time, and book your appointment with ease. 
            Our user-friendly platform ensures a hassle-free experience from start to finish.
          </p>
        </div>

        <a href='#speciality' className='flex items-center gap-2 bg-white text-blue-600 font-medium px-6 py-3 rounded-full w-fit mx-auto md:mx-0 shadow-md hover:shadow-lg transition-all duration-300'>
          Book Appointment
          <img src={assets.arrow_icon} alt='arrow' className='w-5'/>
        </a>
      </div>

      {/* Right Image Section */}
      <div className='w-full md:w-1/2 flex justify-center items-end relative'>
        <img
          className='w-full md:w-[90%] lg:w-[80%] h-auto object-contain rounded-lg'
          src={assets.header_img}
          alt='doctor illustration'
        />
      </div>
    </div>
  )
}

export default Header




