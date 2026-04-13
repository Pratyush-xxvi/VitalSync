import React from 'react'
import { assets } from '../assets/assets'

function About() {
  return (
    <div>
      <div className='text-center text-2xl pt-10 text-gray-700'>
        <p>About <span className='text-gray-700 font-medium'>US</span></p>
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-12 '>
        <img className='w-full md:max-w-[360px]' src={assets.about_image} alt=''/>

        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600'>
          <p>
  Welcome to Prescipto, your trusted partner in managing your healthcare needs. 
  We are committed to providing seamless access to medical professionals, easy appointment scheduling, and reliable health information, empowering you to take control of your well-being with confidence.
</p>
          <p>
  Prescipto is committed to delivering accessible healthcare, ensuring patient privacy, and continuously improving our services to meet your evolving needs.
</p>
          <b className=' text-gray-800'>
          Our Vision
          </b>
         <p>
  Our vision at Prescipto is to revolutionize healthcare by making quality medical services easily accessible to everyone, fostering a healthier and more informed community.
</p>
        </div>
      </div>
      <div className='text-xl my-4'>
        <p>WHY <span className='text-gray-700 font-semibold'>CHOOSE US</span> </p>
      </div>

      <div className='flex felx-col md:flex-row mb-20'> 
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-blue-500 hover:text-white transiti duration-300 text-gray-700 cursor-pointer'>
          <b>Efficiency: </b>
            <p>Streamlined appointment scheduling that fits into your busy lifestyle.</p>
          
        </div>


        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-blue-500 hover:text-white transiti duration-300 text-gray-700 cursor-pointer'>
          <b>Convenience: </b>
            <p>Access to a network of trusted healthcare professionals in your area.</p>
         
        </div>


       <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-blue-500 hover:text-white transiti duration-300 text-gray-700 cursor-pointer'>
          <b>Personalization:  </b>
            <p>Tailored recommendations and reminders to help you stay on top of your health.</p>
         
        </div>
      </div>
       </div>
  )
}

export default About