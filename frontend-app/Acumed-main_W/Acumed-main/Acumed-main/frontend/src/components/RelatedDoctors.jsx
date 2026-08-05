import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

function RelatedDoctors({speciality,docId}) {
    const {doctors} = useContext(AppContext)
    const [relDoc, setRelDocs] = useState([])
    const navigate = useNavigate()

    useEffect(()=>{
        if(doctors.length>0 && speciality)
        {
          const doctorsData = doctors.filter((doc)=>doc.speciality=== speciality && doc._id !== docId)
          setRelDocs(doctorsData)
        }
    },[doctors,speciality,docId])
  return (
    <div className='flex flex-col items-center gap-6 my-16 text-gray-800 md:mx-10'>
        <h1 className='text-3xl font-medium'>
            Top Doctors to book
        </h1>
        <p className='sm:w-1/ text-center text-sm'>
            Simply browse through our extensive list of doctors.
        </p>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 pt-5 px-2 sm:px-0">
            {relDoc.slice(0,5).map((item, index) => (
                <div onClick={()=>{navigate(`/appointment/${item._id}`); scrollTo(0,0)}} key={index} className='flex flex-col items-center gap-2 border border-blue-300 rounded-xl overflow-hidden p-4 hover:translate-y-[-10px] transition-all duration-500 cursor-pointer'>
                   <img className='bg-blue-50' src={item.image} alt=''/>
                   <div className='p-4 '>
                    <div className='flex items-center gap-2 text-sm text-center text-green-500'>
                        <p className='w-2 h-2 bg-green-500 rounded-full'></p>
                        <p>Avialable</p>
                        </div>
                        <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
                        <p className='text-gray-600 text-sm'>{item.speciality}</p>
                        </div>
                </div>
            ))}
        </div>
        <button onClick={()=>{navigate('/doctors'); scrollTo(0,0)}} className='bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-10 '>more</button>
    </div>
  )
}

export default RelatedDoctors