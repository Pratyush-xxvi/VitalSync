import React, { useContext, useState } from 'react' // Import useContext
import { NavLink , useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext' // Import AppContext

// --- MOCK ASSETS (to fix compile error in chat) ---
const assets = {
  logo: 'https://placehold.co/176x40/0284c7/white?text=Prescripto',
  profile_pic: 'https://placehold.co/32x32/e0e7ff/3730a3?text=A',
  dropdown_icon: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZD0iTTEyIDE1LjQxNGwtNC4yOTMtNC4yOTVhMSAxIDAgwIDAtMS40MTQgMS40MTRsNSA1YTEgMSAwIDAgMCAxLjQxNCAwbDUtNWExIDEgMCAwIDAtMS40MTQtMS40MTR6Ii8+PC9zdmc+',
  menu_icon: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZD0iTTMgNmgyMHYySDN6bTAgNWgyMHYySDN6bTAgNWgyMHYySDN6Ii8+PC9zdmc+',
  cross_icon: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZD0iTTE5LjggMTguNEwxMiA5LjZMMi4yIDYuOEw5LjYgMTJsLTcuNCA3LjRsMi44IDIuOEwxMiAxNC40bDEwLjQgMTAuNEwyNSAxNy42eiIvPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZD0iTTEyIDkuNkwyLjIgNi44TDkuNiAxMkwxMiA5LjZ6Ii8+PHBhdGggZmlsbD0iY3VycmVudENvbG9yIiBkPSJNMTguNCAxOS44TDE0LjQgMTJsMTAuNCAxMC40bDIuOCAyLjhMNy44IDExLjhMMTguNCAxOS44eiIvPjwvc3ZnPg==',
};
// --- END MOCK ASSETS ---

const Navbar=() =>{
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);
    
    // Get token AND user data from the global context
    const { token, setToken, user, setUser } = useContext(AppContext); 

    // This is our new logout function
    const logout = () => {
        setToken(null); // Clear token from context
        setUser(null);  // Clear user from context
        localStorage.removeItem("token"); // Clear from storage
        localStorage.removeItem("user");  // Clear from storage
        navigate("/");   // Navigate back to the homepage
    }

    // Check if the logged-in user is an admin
    const isAdmin = user && user.roles && user.roles.includes('ROLE_ADMIN');

  return (
    <div className='flex items-center justify-between text-sm py-4 mg-5 border-b border-b-gray-400'>
        <img onClick={()=>navigate('/')} className='w-44 cursor-pointer' src={assets.logo} alt='Prescripto'/>
        
        {/* --- DESKTOP MENU --- */}
        <ul className='hidden md:flex items-center gap-5 font-medium text-gray-700'>
            {/* We use NavLink's "className" prop to check if it's active */}
            <NavLink to='/' className={({isActive}) => isActive ? "text-blue-600" : ""}>
                <li className='py-1 '>HOME</li>
            </NavLink>
             <NavLink to='/doctors' className={({isActive}) => isActive ? "text-blue-600" : ""}>
                <li className='py-1'>ALL DOCTORS</li>
            </NavLink>
             <NavLink to='/about' className={({isActive}) => isActive ? "text-blue-600" : ""}>
                <li className='py-1'>ABOUT</li>
            </NavLink>
             <NavLink to='/contact' className={({isActive}) => isActive ? "text-blue-600" : ""}>
                <li className='py-1'>CONTACT</li>
            </NavLink>

            {/* --- NEW ADMIN LINK (Desktop) --- */}
            {isAdmin && (
              <NavLink to='/admin/dashboard' className={({isActive}) => isActive ? "text-red-600" : "text-red-500 hover:text-red-600"}>
                <li className='py-1 font-bold'>ADMIN</li>
              </NavLink>
            )}
        </ul>

        {/* --- RIGHT SIDE (Profile/Login) --- */}
        <div className='flex items-center gap-4'>
            {
                // This logic is now connected to the global state!
                token ? <div className='flex items-center gap-2 cursor-pointer group relative'>
                    <img className='w-8 h-8 rounded-full bg-blue-100 object-cover' src={assets.profile_pic} alt='Profile' />
                    <img className='w-2.5' src={assets.dropdown_icon} alt='Dropdown' />
                    <div className='absolute top-full right-0 pt-3 text-base font-medium text-gray-600 z-20 hidden group-hover:block min-w-48'>
                        <div className='bg-white rounded shadow-lg flex flex-col gap-4 p-4 border border-gray-100'>
                            <p onClick={()=> navigate('my-profile')}  className='hover:text-black cursor-pointer '>My Profile</p>
                            <p onClick={()=> navigate('my-appointments')} className='hover:text-black cursor-pointer '>My Appointment</p>
                            <hr/>
                            <p onClick={logout} className='hover:text-red-600 cursor-pointer text-red-500 font-medium'>LogOut</p>
                        </div>
                    </div>
                </div>
                : <button onClick={()=>navigate('/login')} className='bg-blue-500 text-white px-8 py-3 rounded-full font-light hidden md:block hover:bg-blue-600 transition-colors'>
                    Create account
                  </button>
            }
            <img onClick={()=>setShowMenu(true)} className='w-6 md:hidden cursor-pointer' src={assets.menu_icon} alt='Menu' />

            {/* --- MOBILE MENU --- */}
            <div className={`${showMenu?'fixed w-full' : 'w-0'} md:hidden right-0 top-0 bottom-0 z-30 overflow-hidden bg-white transition-all`}>
                <div className='flex items-center justify-between px-5 py-6 '>
                    <img className='w-36' src={assets.logo} alt="" />
                    <img className='w-7 cursor-pointer' onClick={()=>setShowMenu(false)} src={assets.cross_icon} alt="Close" />
                </div>
                <ul className='flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium '>
                    <NavLink  onClick={()=> setShowMenu(false)} to='/'><p className='px-4 py-3 rounded inline-block'>Home</p></NavLink>
                     <NavLink  onClick={()=> setShowMenu(false)} to='/doctors'><p className='px-4 py-3 rounded inline-block'>All Doctors</p></NavLink>
                      <NavLink  onClick={()=> setShowMenu(false)} to='/about'><p className='px-4 py-3 rounded inline-block'>About</p></NavLink>
                       <NavLink onClick={()=> setShowMenu(false)} to='/contact'><p className='px-4 py-3 rounded inline-block'>Contact</p></NavLink>
                    
                    {/* --- NEW ADMIN LINK (Mobile) --- */}
                    {isAdmin && (
                      <NavLink onClick={()=> setShowMenu(false)} to='/admin/dashboard'>
                        <p className='px-4 py-3 rounded inline-block font-bold text-red-500'>ADMIN</p>
                      </NavLink>
                    )}
                </ul>
            </div>
        </div>
    </div>
  )
}

export default Navbar

