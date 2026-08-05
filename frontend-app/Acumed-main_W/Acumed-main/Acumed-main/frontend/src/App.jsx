import React from 'react'
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom"
import Home from './pages/Home.jsx'
import Doctors from './pages/Doctors.jsx'
import Login from './pages/Login.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import MyProfile from './pages/MyProfile.jsx'
import MyAppointment from './pages/MyAppointment.jsx'
import Appointment from './pages/Appointment.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'

// --- NEW ADMIN IMPORTS ---
// We're importing the two new components we created.
// (Make sure these paths are correct for your project!)
import AdminRoute from './components/AdminRoute.jsx'
import AdminDashboard from './components/AdminDashboard.jsx'

// --- NEW LAYOUT COMPONENT ---
// This component wraps our main pages to give them all the 
// same layout (Navbar, Footer, and page content).
const MainLayout = () => {
  return (
    <div className='mx-4 sm:mx-[10%]'>
      <Navbar />
      <main className='min-h-[70vh]'> {/* Added min-h to prevent footer from rising on empty pages */}
        <Outlet /> {/* This renders the current page (Home, Doctors, etc.) */}
      </main>
      <Footer />
    </div>
  )
}

function App() {
  return (
    // We must wrap everything in <Router> and provide the Context
    // (Assuming you have AppContextProvider in your main.jsx file)
    <Routes>
      
      {/* --- Main Protected Layout --- */}
      {/* All routes inside here will have the Navbar and Footer */}
      <Route element={<MainLayout />}>
        <Route path='/' element={<Home />} />
        <Route path='/doctors' element={<Doctors />} />
        <Route path='/doctors/:speciality' element={<Doctors />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/my-profile' element={<MyProfile />} />
        <Route path='/my-appointments' element={<MyAppointment />} />
        <Route path='/appointment/:docId' element={<Appointment />} />
        
        {/* --- NEW SECURE ADMIN ROUTE --- */}
        {/* This route is wrapped by AdminRoute. 
            If you are an admin, it shows the dashboard.
            If not, it redirects you to '/'. */}
        <Route element={<AdminRoute />}>
          <Route path='/admin/dashboard' element={<AdminDashboard />} />
        </Route>
        {/* ------------------------------- */}

      </Route>

      {/* --- Auth Layout --- */}
      {/* This route is *outside* the MainLayout, so it has no Navbar or Footer */}
      <Route path='/login' element={<Login />} />

    </Routes>
  )
}

export default App

