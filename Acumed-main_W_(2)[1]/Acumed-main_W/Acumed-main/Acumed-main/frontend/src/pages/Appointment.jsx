import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets';
import RelatedDoctors from '../components/RelatedDoctors';
import BookingForm from '../components/BookingForm.jsx';

function Appointment() {
  const { docId } = useParams();
  const { doctors, currencySymbol } = useContext(AppContext);
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([])
  const [slotIndex, setSlotIndex] = useState(0)
  const [slotTime, setSlotTime] = useState('')
  const [isFormOpen, setIsFormOpen] = useState(false);

  const fetchDocInfo = () => {
    const foundDoc = doctors.find(doc => String(doc._id) === String(docId));
    setDocInfo(foundDoc);
  };
  
  const getAvailableSlots = async () => {
    setDocSlots([])
    let today = new Date()
    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today)
      currentDate.setDate(today.getDate() + i)
      let endTime = new Date()
      endTime.setDate(today.getDate() + i)
      endTime.setHours(21, 0, 0, 0)
      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
      }
      else {
        currentDate.setHours(10)
        currentDate.setMinutes(0)
      }
      let timeSlots = []
      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        timeSlots.push({
          datetime: new Date(currentDate),
          time: formattedTime
        })
        currentDate.setMinutes(currentDate.getMinutes() + 30)
      }
      setDocSlots(prev => ([...prev, timeSlots]))
    }
  }

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  useEffect(() => {
    if (docInfo) {
      getAvailableSlots()
    }
  }, [docInfo])

  return docInfo ? (
    <div className='py-8 max-w-7xl mx-auto flex flex-col gap-10'>
      
      {/* Doctor Info Card */}
      <div className='flex flex-col lg:flex-row gap-8 items-stretch'>
        {/* Doctor Image Header */}
        <div className='lg:w-80 bg-gradient-to-b from-blue-600 to-indigo-700 rounded-3xl p-6 flex flex-col items-center justify-center relative overflow-hidden shadow-xl shadow-blue-500/10'>
          <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-400/20 rounded-full blur-2xl pointer-events-none"></div>
          <span className='absolute top-4 left-4 bg-emerald-500/20 backdrop-blur-md text-emerald-300 text-xs font-bold px-3 py-1 rounded-full border border-emerald-400/30 flex items-center gap-1.5'>
            <span className='w-2 h-2 rounded-full bg-emerald-400 animate-pulse'></span>
            Verified Doctor
          </span>
          <img className='w-full max-w-[240px] h-auto object-contain drop-shadow-2xl relative z-10' src={docInfo.image} alt={docInfo.name} />
        </div>

        {/* Doctor Details */}
        <div className='flex-1 bg-white rounded-3xl p-6 sm:p-10 border border-slate-100 shadow-sm flex flex-col justify-between gap-6'>
          <div>
            <div className='flex flex-wrap items-center justify-between gap-3 mb-2'>
              <h1 className='text-2xl sm:text-3xl font-extrabold text-slate-900 flex items-center gap-2'>
                {docInfo.name}
                <img className='w-6 h-6' src={assets.verified_icon} alt='Verified' />
              </h1>
              <span className='bg-blue-50 text-blue-600 text-xs font-bold px-3 py-1.5 rounded-full border border-blue-100 uppercase tracking-wide'>
                {docInfo.speciality}
              </span>
            </div>

            <div className='flex items-center gap-3 text-sm text-slate-500 font-medium mb-6'>
              <span>{docInfo.degree}</span>
              <span>•</span>
              <span className='bg-slate-100 text-slate-700 px-3 py-0.5 rounded-full text-xs font-bold'>
                {docInfo.experience} Experience
              </span>
            </div>

            {/* About Section */}
            <div className='bg-slate-50/80 rounded-2xl p-5 border border-slate-100 mb-6'>
              <h3 className='flex items-center gap-2 text-sm font-bold text-slate-900 mb-2'>
                <span>About Doctor</span>
                <img className='w-4 h-4 opacity-60' src={assets.info_icon} alt='Info' />
              </h3>
              <p className='text-slate-600 text-sm leading-relaxed'>{docInfo.about}</p>
            </div>
          </div>

          <div className='flex items-center justify-between pt-4 border-t border-slate-100'>
            <div>
              <p className='text-xs text-slate-400 font-medium uppercase tracking-wider'>Consultation Fee</p>
              <p className='text-2xl font-extrabold text-slate-900'>
                {currencySymbol}{docInfo.fees}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Slots */}
      <div className='bg-white rounded-3xl p-6 sm:p-10 border border-slate-100 shadow-sm flex flex-col gap-6'>
        <div>
          <h2 className='text-xl font-bold text-slate-900 mb-1'>Select Booking Slot</h2>
          <p className='text-slate-500 text-sm'>Choose a suitable date and available time slot to schedule your appointment.</p>
        </div>

        {/* Days Selection Slider */}
        <div className='flex items-center gap-4 w-full overflow-x-auto pb-2 no-scrollbar'>
          {docSlots.length > 0 && docSlots.map((item, index) => (
            <div 
              onClick={() => setSlotIndex(index)} 
              className={`flex flex-col items-center justify-center py-4 min-w-[72px] rounded-2xl cursor-pointer transition-all duration-200 ${
                slotIndex === index 
                  ? 'bg-gradient-to-b from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/25 font-bold scale-105' 
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200/60'
              }`} 
              key={index}
            >
              <span className='text-xs font-semibold uppercase opacity-80'>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</span>
              <span className='text-lg font-extrabold mt-0.5'>{item[0] && item[0].datetime.getDate()}</span>
            </div>
          ))}
        </div>

        {/* Time Slots */}
        <div className='flex flex-wrap items-center gap-3 w-full pt-2'>
          {docSlots.length > 0 && docSlots[slotIndex]?.map((item, index) => (
            <button 
              onClick={() => setSlotTime(item.time)} 
              className={`text-xs font-semibold px-4 py-2.5 rounded-xl transition-all duration-200 ${
                item.time === slotTime 
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20 font-bold scale-105' 
                  : 'bg-slate-50 hover:bg-blue-50 text-slate-600 border border-slate-200/60 hover:border-blue-200'
              }`} 
              key={index}
            >
              {item.time}
            </button>
          ))}
        </div>

        <div>
          <button
            onClick={() => setIsFormOpen(true)}
            className='mt-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white text-sm font-bold px-10 py-3.5 rounded-full shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 transform hover:-translate-y-0.5'
          >
            Book Appointment
          </button>
        </div>
      </div>

      {/* Related Doctors */}
      <RelatedDoctors docId={docId} speciality={docInfo.speciality} />

      {/* Modal Form */}
      {isFormOpen && docSlots[slotIndex] && (
        <BookingForm 
          docInfo={docInfo}
          selectedDate={docSlots[slotIndex][0].datetime}
          selectedTime={slotTime}
          onClose={() => setIsFormOpen(false)} 
        />
      )}

    </div>
  ) : (
    <div className='py-20 text-center text-slate-500 font-semibold'>
      Loading doctor details...
    </div>
  );
}

export default Appointment;