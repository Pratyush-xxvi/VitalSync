import React, { useContext, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'

const Navbar = () => {
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);
    
    // Global context
    const { token, setToken, user, setUser } = useContext(AppContext); 

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/");
    }

    const isAdmin = user && user.roles && user.roles.includes('ROLE_ADMIN');

    return (
        <header className='sticky top-0 z-50 backdrop-blur-md bg-white/90 border-b border-slate-100 shadow-xs transition-all duration-300'>
            <div className='flex items-center justify-between text-sm py-3.5 px-4 sm:px-6 max-w-7xl mx-auto'>
                {/* --- LOGO --- */}
                <div onClick={() => navigate('/')} className='flex items-center gap-2 cursor-pointer group'>
                    <img 
                        className='h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]' 
                        src={assets.logo} 
                        alt='VitalSync Logo'
                    />
                </div>
                
                {/* --- DESKTOP NAVIGATION --- */}
                <nav className='hidden md:flex items-center gap-1 font-medium text-slate-600 bg-slate-100/60 p-1.5 rounded-full border border-slate-200/50'>
                    <NavLink 
                        to='/' 
                        className={({isActive}) => 
                            `px-4 py-1.5 rounded-full text-xs lg:text-sm font-semibold transition-all duration-200 ${
                                isActive ? "bg-white text-blue-600 shadow-xs font-bold" : "hover:text-blue-600 hover:bg-white/50"
                            }`
                        }
                    >
                        HOME
                    </NavLink>
                    <NavLink 
                        to='/doctors' 
                        className={({isActive}) => 
                            `px-4 py-1.5 rounded-full text-xs lg:text-sm font-semibold transition-all duration-200 ${
                                isActive ? "bg-white text-blue-600 shadow-xs font-bold" : "hover:text-blue-600 hover:bg-white/50"
                            }`
                        }
                    >
                        ALL DOCTORS
                    </NavLink>
                    <NavLink 
                        to='/about' 
                        className={({isActive}) => 
                            `px-4 py-1.5 rounded-full text-xs lg:text-sm font-semibold transition-all duration-200 ${
                                isActive ? "bg-white text-blue-600 shadow-xs font-bold" : "hover:text-blue-600 hover:bg-white/50"
                            }`
                        }
                    >
                        ABOUT
                    </NavLink>
                    <NavLink 
                        to='/contact' 
                        className={({isActive}) => 
                            `px-4 py-1.5 rounded-full text-xs lg:text-sm font-semibold transition-all duration-200 ${
                                isActive ? "bg-white text-blue-600 shadow-xs font-bold" : "hover:text-blue-600 hover:bg-white/50"
                            }`
                        }
                    >
                        CONTACT
                    </NavLink>

                    {isAdmin && (
                        <NavLink 
                            to='/admin/dashboard' 
                            className={({isActive}) => 
                                `px-4 py-1.5 rounded-full text-xs lg:text-sm font-bold transition-all duration-200 ${
                                    isActive ? "bg-rose-500 text-white shadow-xs" : "text-rose-600 hover:bg-rose-50"
                                }`
                            }
                        >
                            ADMIN
                        </NavLink>
                    )}
                </nav>

                {/* --- RIGHT ACTION BUTTONS --- */}
                <div className='flex items-center gap-3'>
                    {token ? (
                        <div className='flex items-center gap-2 cursor-pointer group relative py-1'>
                            <div className='flex items-center gap-2.5 bg-slate-50 hover:bg-slate-100 p-1.5 pr-3 rounded-full border border-slate-200 transition-all duration-200'>
                                <img 
                                    className='w-8 h-8 rounded-full bg-blue-100 object-cover ring-2 ring-blue-500/20' 
                                    src={user?.image || assets.profile_pic} 
                                    alt='User Profile' 
                                />
                                <span className='hidden sm:inline font-semibold text-slate-700 text-xs max-w-[100px] truncate'>
                                    {user?.name || 'Account'}
                                </span>
                                <img className='w-2.5 opacity-60 group-hover:rotate-180 transition-transform duration-200' src={assets.dropdown_icon} alt='Dropdown' />
                            </div>

                            {/* Dropdown Menu */}
                            <div className='absolute top-full right-0 pt-2 text-sm font-medium text-slate-600 z-30 hidden group-hover:block min-w-56 animate-in fade-in slide-in-from-top-2 duration-200'>
                                <div className='bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl p-2 border border-slate-100 flex flex-col gap-1'>
                                    <div className='px-3 py-2 border-b border-slate-100 mb-1'>
                                        <p className='text-xs text-slate-400 font-medium'>Signed in as</p>
                                        <p className='text-sm font-bold text-slate-800 truncate'>{user?.email || 'User'}</p>
                                    </div>
                                    <button 
                                        onClick={() => navigate('/my-profile')}  
                                        className='flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-blue-50 hover:text-blue-600 text-left transition-colors font-medium text-xs sm:text-sm'
                                    >
                                        <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                                        My Profile
                                    </button>
                                    <button 
                                        onClick={() => navigate('/my-appointments')} 
                                        className='flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-blue-50 hover:text-blue-600 text-left transition-colors font-medium text-xs sm:text-sm'
                                    >
                                        <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                        My Appointments
                                    </button>
                                    <div className='my-1 border-t border-slate-100'></div>
                                    <button 
                                        onClick={logout} 
                                        className='flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-rose-50 text-rose-600 text-left transition-colors font-semibold text-xs sm:text-sm'
                                    >
                                        <svg className="w-4 h-4 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                                        Logout
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <button 
                            onClick={() => navigate('/login')} 
                            className='bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 transform hover:-translate-y-0.5 hidden md:flex items-center gap-2'
                        >
                            <span>Create account</span>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                        </button>
                    )}

                    {/* Mobile menu hamburger button */}
                    <button 
                        onClick={() => setShowMenu(true)} 
                        className='md:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors'
                        aria-label="Open menu"
                    >
                        <img className='w-6 h-6' src={assets.menu_icon} alt='Menu' />
                    </button>

                    {/* --- MOBILE SIDEBAR MENU --- */}
                    <div className={`fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs transition-opacity duration-300 md:hidden ${showMenu ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
                        <div className={`fixed right-0 top-0 bottom-0 w-4/5 max-w-sm bg-white shadow-2xl p-6 transition-transform duration-300 flex flex-col justify-between ${showMenu ? 'translate-x-0' : 'translate-x-full'}`}>
                            <div>
                                <div className='flex items-center justify-between pb-6 border-b border-slate-100'>
                                    <img className='h-8 w-auto' src={assets.logo} alt="VitalSync" />
                                    <button 
                                        onClick={() => setShowMenu(false)} 
                                        className='p-2 rounded-full hover:bg-slate-100 transition-colors'
                                    >
                                        <img className='w-5 h-5' src={assets.cross_icon} alt="Close" />
                                    </button>
                                </div>
                                <ul className='flex flex-col gap-2 mt-6 text-base font-semibold text-slate-700'>
                                    <NavLink onClick={() => setShowMenu(false)} to='/' className={({isActive}) => `px-4 py-3 rounded-xl transition-all ${isActive ? 'bg-blue-50 text-blue-600 font-bold' : 'hover:bg-slate-50'}`}>Home</NavLink>
                                    <NavLink onClick={() => setShowMenu(false)} to='/doctors' className={({isActive}) => `px-4 py-3 rounded-xl transition-all ${isActive ? 'bg-blue-50 text-blue-600 font-bold' : 'hover:bg-slate-50'}`}>All Doctors</NavLink>
                                    <NavLink onClick={() => setShowMenu(false)} to='/about' className={({isActive}) => `px-4 py-3 rounded-xl transition-all ${isActive ? 'bg-blue-50 text-blue-600 font-bold' : 'hover:bg-slate-50'}`}>About</NavLink>
                                    <NavLink onClick={() => setShowMenu(false)} to='/contact' className={({isActive}) => `px-4 py-3 rounded-xl transition-all ${isActive ? 'bg-blue-50 text-blue-600 font-bold' : 'hover:bg-slate-50'}`}>Contact</NavLink>
                                    
                                    {isAdmin && (
                                        <NavLink onClick={() => setShowMenu(false)} to='/admin/dashboard' className={({isActive}) => `px-4 py-3 rounded-xl transition-all ${isActive ? 'bg-rose-500 text-white font-bold' : 'text-rose-600 bg-rose-50'}`}>ADMIN DASHBOARD</NavLink>
                                    )}
                                </ul>
                            </div>

                            {!token && (
                                <div className='pt-6 border-t border-slate-100'>
                                    <button 
                                        onClick={() => { setShowMenu(false); navigate('/login'); }} 
                                        className='w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3 rounded-xl font-bold shadow-md shadow-blue-500/20 text-center'
                                    >
                                        Create Account
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Navbar
