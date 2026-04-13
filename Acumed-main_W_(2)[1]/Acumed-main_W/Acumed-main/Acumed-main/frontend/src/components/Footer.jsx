import React from 'react'
import { assets } from '../assets/assets'

function Footer() {
  return (
    <div className='md:mx-10'>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
        <div>
            {/*----left----*/}
            <img className='mb-5 w-40' src={assets.logo } alt=''></img>
            <p className='w-full md:w-2/3 text-gray-600 leading-6'>Lorem ispum is simply dummy text of the printing and typesetting industry.</p>
        </div>

        <div>
            {/*----center----*/}

            <p className='text-xl font-medium mb-5'>COMPANY</p>
            <ul className='flex flex-col gap-2 text-gray-600'>
                <li>Home</li>
                <li>About us</li>
                <li>Contact us</li>
                <li>Privacy Policy</li>
            </ul>
        </div>

        <div>
            {/*----right----*/}
            <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
            <ul className='flex flex-col gap-2 text-gray-600'>
                <li>+1-212-456-7890</li>
                <li>prescripto123@book.com</li>
            </ul>
        </div>
        </div>
        <div>
            {/*----bottom----*/}
            <hr/>
            <p className='py-5 text-sm text-center'>© 2024 Prescripto. All rights reserved.</p>
        </div>
    </div>
  )
}

export default Footer