import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom'

function TopDoctors() {
    const navigate = useNavigate();
    const { doctors } = useContext(AppContext);

    return (
        <section className='flex flex-col items-center gap-4 my-20 text-slate-800 px-4 max-w-7xl mx-auto'>
            <div className='inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-50 text-cyan-700 font-semibold text-xs border border-cyan-100'>
                <span>Featured Medical Experts</span>
            </div>

            <h2 className='text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight text-center'>
                Top Rated Doctors
            </h2>
            <p className='sm:w-2/3 md:w-1/2 text-center text-sm text-slate-600 leading-relaxed max-w-xl'>
                Connect with highly qualified, board-certified specialists ready to assist you with personalized healthcare services.
            </p>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 pt-8">
                {doctors.slice(0, 10).map((item, index) => (
                    <div 
                        onClick={() => { navigate(`/appointment/${item._id}`); scrollTo({ top: 0, behavior: 'smooth' }); }} 
                        key={index} 
                        className='group bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-xs hover:shadow-2xl hover:border-blue-200 hover:-translate-y-2 transition-all duration-300 cursor-pointer flex flex-col justify-between'
                    >
                        <div className='bg-gradient-to-b from-blue-50/80 to-slate-50 relative overflow-hidden pt-4 px-4 flex items-center justify-center'>
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
                                        ${item.fees} / visit
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
        </section>
    )
}

export default TopDoctors