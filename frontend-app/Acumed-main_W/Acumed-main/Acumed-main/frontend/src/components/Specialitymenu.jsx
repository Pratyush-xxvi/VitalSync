import React from 'react'
import { specialityData } from '../assets/assets'
import { Link } from 'react-router-dom'

function Specialitymenu() {
  return (
    <section className='flex flex-col items-center gap-4 py-20 text-slate-800' id='speciality'>
      <div className='inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-600 font-semibold text-xs border border-blue-100'>
        <span>Explore Specialties</span>
      </div>
      
      <h2 className='text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight text-center'>
        Find by Medical Specialty
      </h2>
      
      <p className='sm:w-2/3 md:w-1/2 text-center text-sm text-slate-600 leading-relaxed max-w-xl'>
        Select a specialty to discover top-rated doctors, view available consultation slots, and book your appointment with confidence.
      </p>

      <div className='flex items-center justify-start sm:justify-center gap-6 pt-8 w-full overflow-x-auto pb-6 px-4 no-scrollbar'>
        {specialityData.map((item, index) => (
          <Link 
            onClick={() => scrollTo({ top: 0, behavior: 'smooth' })} 
            className='group flex flex-col items-center cursor-pointer flex-shrink-0 w-28 sm:w-36 p-4 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:border-blue-200 hover:-translate-y-2.5 transition-all duration-300' 
            key={index} 
            to={`/doctors/${item.speciality}`}
          >
            <div className='w-16 h-16 sm:w-20 sm:h-20 mb-3 rounded-full bg-blue-50/70 group-hover:bg-blue-600 flex items-center justify-center p-3 transition-colors duration-300 shadow-inner'>
              <img className='w-full h-full object-contain filter group-hover:brightness-0 group-hover:invert transition-all duration-300' src={item.image} alt={item.speciality} />
            </div>
            <p className='text-xs sm:text-sm font-semibold text-slate-700 group-hover:text-blue-600 text-center transition-colors line-clamp-1'>
              {item.speciality}
            </p>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default Specialitymenu