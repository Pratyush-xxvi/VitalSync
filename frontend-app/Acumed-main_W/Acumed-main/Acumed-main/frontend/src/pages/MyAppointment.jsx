import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'

function MyAppointments() {
  const { doctors, currencySymbol } = useContext(AppContext);

  return (
    <div className='py-8 max-w-5xl mx-auto'>
      <div className='mb-8'>
        <h1 className='text-3xl font-extrabold text-slate-900 tracking-tight mb-1'>My Appointments</h1>
        <p className='text-slate-500 text-sm'>Manage and track your upcoming and past doctor appointments.</p>
      </div>

      <div className='flex flex-col gap-6'>
        {doctors.slice(0, 3).map((item, index) => (
          <div 
            key={index}
            className='bg-white rounded-2xl border border-slate-100 p-6 shadow-xs hover:shadow-md transition-shadow duration-300 flex flex-col sm:flex-row items-center justify-between gap-6'
          >
            {/* Doctor Info */}
            <div className='flex items-center gap-5 w-full sm:w-auto'>
              <div className='w-24 h-24 rounded-2xl bg-blue-50 border border-blue-100 p-2 overflow-hidden flex-shrink-0 flex items-center justify-center'>
                <img className='w-full h-full object-contain' src={item.image} alt={item.name} />
              </div>
              <div className='flex flex-col gap-1'>
                <h3 className='text-lg font-bold text-slate-900'>{item.name}</h3>
                <span className='w-fit text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full'>
                  {item.speciality}
                </span>
                <div className='mt-2 text-xs text-slate-500 flex flex-col gap-0.5 font-medium'>
                  <p className='text-slate-700 font-semibold'>Address:</p>
                  <p>{item.address.line1}</p>
                  <p>{item.address.line2}</p>
                </div>
                <p className='text-xs font-semibold text-slate-600 mt-1'>
                  <span className='text-slate-400'>Date & Time: </span> 
                  <span className='text-slate-900 font-bold'>25, July, 2026 | 8:30 PM</span>
                </p>
              </div>
            </div>

            {/* Action Buttons & Status */}
            <div className='flex flex-row sm:flex-col items-center sm:items-end gap-3 w-full sm:w-auto justify-end border-t sm:border-t-0 pt-4 sm:pt-0 border-slate-100'>
              {index === 0 ? (
                <button className='w-full sm:w-44 py-2.5 px-4 rounded-xl text-xs font-bold bg-emerald-50 text-emerald-600 border border-emerald-200 cursor-default flex items-center justify-center gap-1.5'>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path></svg>
                  Paid Online
                </button>
              ) : (
                <button className='w-full sm:w-44 py-2.5 px-4 rounded-xl text-xs font-bold bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-md shadow-blue-500/20 hover:shadow-lg transition-all'>
                  Pay Online ({currencySymbol}{item.fees})
                </button>
              )}

              {index === 2 ? (
                <button className='w-full sm:w-44 py-2.5 px-4 rounded-xl text-xs font-bold bg-rose-50 text-rose-600 border border-rose-200 cursor-default'>
                  Appointment Cancelled
                </button>
              ) : (
                <button className='w-full sm:w-44 py-2.5 px-4 rounded-xl text-xs font-semibold text-slate-600 border border-slate-200 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 transition-colors'>
                  Cancel Appointment
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyAppointments