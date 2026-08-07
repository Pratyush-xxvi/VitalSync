import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom'

function TopDoctors() {
    const navigate = useNavigate();
    const { doctors, currencySymbol } = useContext(AppContext);

    return (
        <div className='flex flex-col items-center gap-4 py-16 text-slate-900 bg-slate-50/50 rounded-3xl my-8 border border-slate-100/80 px-4 sm:px-8'>
            
            <div className='text-center max-w-xl mx-auto'>
                <span className='text-blue-600 font-bold text-xs uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full'>
                    Top Specialists
                </span>
                <h1 className='text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 tracking-tight'>
                    Top Doctors to Book
                </h1>
                <p className='text-slate-500 text-sm mt-2 font-medium'>
                    Simply browse through our extensive list of trusted doctors, explore their availability, and reserve your consultation in seconds.
                </p>
            </div>

            <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 pt-8 max-w-7xl mx-auto'>
                {doctors.slice(0, 10).map((item, index) => (
                    <div 
                        onClick={() => { navigate(`/appointment/${item._id}`); scrollTo({ top: 0, behavior: 'smooth' }); }} 
                        key={index} 
                        className='group bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer flex flex-col justify-between'
                    >
                        <div className='relative overflow-hidden bg-slate-50 flex items-center justify-center pt-4'>
                            <span className='absolute top-3 left-3 bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5 backdrop-blur-xs z-10'>
                                <span className='w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse'></span>
                                Available
                            </span>
                            <img className='w-full h-48 object-contain transform group-hover:scale-105 transition-transform duration-500' src={item.image} alt={item.name}/>
                        </div>

                        <div className='p-5 flex flex-col gap-2'>
                            <div className='flex items-center justify-between gap-1'>
                                <span className='text-[11px] font-bold text-blue-600 uppercase tracking-wider bg-blue-50 px-2.5 py-0.5 rounded-md'>
                                    {item.speciality}
                                </span>
                                {item.fees && (
                                    <span className='text-xs font-semibold text-slate-500'>
                                        {currencySymbol}{item.fees} / visit
                                    </span>
                                )}
                            </div>
                            
                            <h3 className='text-slate-900 text-base font-bold group-hover:text-blue-600 transition-colors line-clamp-1'>
                                {item.name}
                            </h3>

                            <p className='text-slate-500 text-xs flex items-center gap-1'>
                                <svg className="w-3.5 h-3.5 text-amber-400 fill-amber-400" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                                <span className='font-semibold text-slate-700'>4.9</span> (120+ reviews)
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <button 
                onClick={() => { navigate('/doctors'); scrollTo({ top: 0, behavior: 'smooth' }); }} 
                className='mt-10 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold px-10 py-3.5 rounded-full shadow-md shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 transform hover:-translate-y-0.5 flex items-center gap-2 text-sm'
            >
                <span>View All Doctors</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
            </button>
        </div>
    )
}

export default TopDoctors