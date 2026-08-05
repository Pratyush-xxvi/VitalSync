import React from 'react'
import { assets } from '../assets/assets'

function Contact() {
  return (
    <div className='py-8 max-w-7xl mx-auto'>
      <div className='text-center my-8'>
        <h1 className='text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight'>
          Contact <span className='text-blue-600'>VitalSync</span>
        </h1>
        <p className='text-slate-500 text-sm mt-2 max-w-md mx-auto'>
          We are here to assist you. Reach out to our support team or explore career opportunities.
        </p>
      </div>

      <div className='my-12 flex flex-col md:flex-row items-center justify-center gap-12 bg-white rounded-3xl p-6 sm:p-10 border border-slate-100 shadow-sm'>
        <div className='w-full md:w-1/2 flex justify-center'>
          <img className='w-full max-w-md rounded-2xl shadow-lg object-cover' src={assets.contact_image} alt='VitalSync Contact' />
        </div>

        <div className='flex flex-col justify-center items-start gap-6 md:w-1/2 text-sm text-slate-600'>
          <div className='bg-slate-50 p-6 rounded-2xl border border-slate-100 w-full flex flex-col gap-2'>
            <h3 className='font-bold text-lg text-slate-900 flex items-center gap-2'>
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
              Our Corporate Headquarters
            </h3>
            <p className='text-slate-600 font-medium'>54789 Phase 5 Mohali, Punjab, India</p>
            <div className='mt-2 pt-2 border-t border-slate-200/60 flex flex-col gap-1 text-slate-700 font-semibold'>
              <p>Tel: +1 (415) 555-0132</p>
              <p>Email: contact@vitalsync.com</p>
            </div>
          </div>

          <div className='bg-blue-50/60 p-6 rounded-2xl border border-blue-100 w-full flex flex-col gap-3'>
            <h3 className='font-bold text-lg text-blue-950 flex items-center gap-2'>
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
              Careers at VitalSync
            </h3>
            <p className='text-slate-600 text-xs sm:text-sm leading-relaxed'>
              Interested in shaping the future of digital healthcare? Learn more about our team and active openings.
            </p>

            <button className='bg-slate-900 text-white font-bold px-6 py-3 rounded-full text-xs hover:bg-blue-600 transition-colors duration-300 w-fit mt-1 shadow-md'>
              Explore Jobs & Careers
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact