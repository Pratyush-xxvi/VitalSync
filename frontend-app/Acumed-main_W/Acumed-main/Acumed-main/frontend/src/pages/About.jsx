import React from 'react'
import { assets } from '../assets/assets'

function About() {
  return (
    <div className='py-8 max-w-7xl mx-auto'>
      <div className='text-center my-8'>
        <h1 className='text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight'>
          About <span className='gradient-text'>VitalSync</span>
        </h1>
        <p className='text-slate-500 text-sm mt-2 max-w-lg mx-auto'>
          Empowering patients and healthcare providers with seamless, modern digital scheduling.
        </p>
      </div>

      {/* Main Section */}
      <div className='my-12 flex flex-col md:flex-row items-center gap-12 bg-white rounded-3xl p-6 sm:p-10 border border-slate-100 shadow-sm'>
        <div className='w-full md:w-1/2 flex justify-center'>
          <img className='w-full max-w-md rounded-2xl shadow-lg object-cover' src={assets.about_image} alt='About VitalSync'/>
        </div>

        <div className='flex flex-col justify-center gap-5 md:w-1/2 text-sm text-slate-600 leading-relaxed'>
          <p className='text-base font-semibold text-slate-800'>
            Welcome to <strong className='text-blue-600 font-extrabold'>VitalSync</strong>, your trusted platform for modern healthcare access and appointment management.
          </p>
          <p>
            We are committed to providing seamless access to top-rated medical professionals, hassle-free booking, and transparent health scheduling—empowering you to take full control of your well-being with total confidence.
          </p>
          <p>
            VitalSync ensures high security, patient confidentiality, and continuous innovation to meet the evolving healthcare needs of patients and clinics alike.
          </p>
          <div className='mt-2 p-5 rounded-2xl bg-blue-50/70 border border-blue-100'>
            <h3 className='text-blue-900 font-bold text-base mb-1.5 flex items-center gap-2'>
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
              Our Vision
            </h3>
            <p className='text-slate-700 text-xs sm:text-sm leading-relaxed'>
              Our vision at VitalSync is to revolutionize digital healthcare by making quality medical consultations accessible, efficient, and stress-free for everyone.
            </p>
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className='my-16'>
        <div className='mb-8 text-center'>
          <h2 className='text-2xl sm:text-3xl font-extrabold text-slate-900'>
            Why Choose <span className='text-blue-600'>VitalSync</span>
          </h2>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'> 
          <div className='group bg-white border border-slate-100 rounded-3xl p-8 flex flex-col gap-3 shadow-xs hover:shadow-xl hover:bg-gradient-to-b hover:from-blue-600 hover:to-indigo-700 hover:text-white transition-all duration-300 cursor-pointer'>
            <div className='w-12 h-12 rounded-2xl bg-blue-50 group-hover:bg-white/20 flex items-center justify-center text-blue-600 group-hover:text-white transition-colors'>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
            </div>
            <h3 className='font-bold text-lg text-slate-900 group-hover:text-white'>Efficiency</h3>
            <p className='text-sm text-slate-600 group-hover:text-blue-100 leading-relaxed'>
              Streamlined appointment booking in under a minute that fits seamlessly into your busy lifestyle.
            </p>
          </div>

          <div className='group bg-white border border-slate-100 rounded-3xl p-8 flex flex-col gap-3 shadow-xs hover:shadow-xl hover:bg-gradient-to-b hover:from-blue-600 hover:to-indigo-700 hover:text-white transition-all duration-300 cursor-pointer'>
            <div className='w-12 h-12 rounded-2xl bg-blue-50 group-hover:bg-white/20 flex items-center justify-center text-blue-600 group-hover:text-white transition-colors'>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path></svg>
            </div>
            <h3 className='font-bold text-lg text-slate-900 group-hover:text-white'>Convenience</h3>
            <p className='text-sm text-slate-600 group-hover:text-blue-100 leading-relaxed'>
              Instant access to a wide network of verified healthcare specialists in your region.
            </p>
          </div>

          <div className='group bg-white border border-slate-100 rounded-3xl p-8 flex flex-col gap-3 shadow-xs hover:shadow-xl hover:bg-gradient-to-b hover:from-blue-600 hover:to-indigo-700 hover:text-white transition-all duration-300 cursor-pointer'>
            <div className='w-12 h-12 rounded-2xl bg-blue-50 group-hover:bg-white/20 flex items-center justify-center text-blue-600 group-hover:text-white transition-colors'>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
            </div>
            <h3 className='font-bold text-lg text-slate-900 group-hover:text-white'>Personalization</h3>
            <p className='text-sm text-slate-600 group-hover:text-blue-100 leading-relaxed'>
              Tailored doctor recommendations and automated reminders to stay on top of your personal health.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About