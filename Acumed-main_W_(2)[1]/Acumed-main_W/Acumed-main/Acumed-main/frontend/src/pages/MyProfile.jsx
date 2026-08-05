import React, { useState } from 'react'
import { assets } from '../assets/assets'

function MyProfile() {
  const [userData, setUserData] = useState({
    name: "Edward Vincent",
    image: assets.profile_pic,
    email: 'edward@gmail.com',
    phone: '+1 (555) 019-2834',
    address: {
      line1: "54th Medical Parkway, Suite 200",
      line2: "New York, NY 10001"
    },
    gender: 'Male',
    dob: '1998-05-15'
  })

  const [isEdit, setIsEdit] = useState(false)

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-100 shadow-xl shadow-slate-200/50 flex flex-col gap-8">
        
        {/* Header Profile Info */}
        <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-slate-100">
          <div className="relative group">
            <img
              src={userData.image}
              alt="Profile"
              className="w-28 h-28 rounded-full border-4 border-blue-100 object-cover shadow-md group-hover:opacity-90 transition-opacity"
            />
            {isEdit && (
              <div className="absolute inset-0 bg-slate-900/40 rounded-full flex items-center justify-center text-white text-xs font-bold cursor-pointer">
                Change
              </div>
            )}
          </div>

          <div className="flex flex-col items-center sm:items-start text-center sm:text-left gap-1 w-full">
            {isEdit ? (
              <input
                type="text"
                value={userData.name}
                onChange={e => setUserData(prev => ({ ...prev, name: e.target.value }))}
                className="text-2xl font-bold text-slate-900 border border-slate-300 rounded-xl px-3 py-1.5 focus:ring-2 focus:ring-blue-500 focus:outline-none w-full max-w-md"
              />
            ) : (
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">{userData.name}</h1>
            )}
            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
              Verified Patient
            </span>
          </div>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col gap-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400">
            Contact Information
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <p className="text-xs text-slate-400 font-semibold mb-1">Email Address</p>
              <p className="font-bold text-slate-800">{userData.email}</p>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <p className="text-xs text-slate-400 font-semibold mb-1">Phone Number</p>
              {isEdit ? (
                <input
                  type="text"
                  value={userData.phone}
                  onChange={e => setUserData(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1 text-sm font-bold focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              ) : (
                <p className="font-bold text-slate-800">{userData.phone}</p>
              )}
            </div>

            <div className="sm:col-span-2 bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <p className="text-xs text-slate-400 font-semibold mb-1">Residential Address</p>
              {isEdit ? (
                <div className="space-y-2">
                  <input
                    onChange={e => setUserData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))}
                    value={userData.address.line1}
                    type="text"
                    className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1 text-sm font-semibold focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                  <input
                    onChange={e => setUserData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))}
                    value={userData.address.line2}
                    type="text"
                    className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1 text-sm font-semibold focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              ) : (
                <p className="font-semibold text-slate-800 leading-relaxed">
                  {userData.address.line1}<br />{userData.address.line2}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Basic Info */}
        <div className="flex flex-col gap-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400">
            Basic Information
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <p className="text-xs text-slate-400 font-semibold mb-1">Gender</p>
              {isEdit ? (
                <select
                  onChange={e => setUserData(prev => ({ ...prev, gender: e.target.value }))}
                  value={userData.gender}
                  className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1 text-sm font-bold focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              ) : (
                <p className="font-bold text-slate-800">{userData.gender}</p>
              )}
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <p className="text-xs text-slate-400 font-semibold mb-1">Date of Birth</p>
              {isEdit ? (
                <input
                  type="date"
                  onChange={e => setUserData(prev => ({ ...prev, dob: e.target.value }))}
                  value={userData.dob}
                  className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1 text-sm font-bold focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              ) : (
                <p className="font-bold text-slate-800">{userData.dob}</p>
              )}
            </div>
          </div>
        </div>

        {/* Edit Button */}
        <div className="flex justify-end pt-4 border-t border-slate-100">
          {isEdit ? (
            <button
              onClick={() => setIsEdit(false)}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold text-sm rounded-full shadow-md hover:shadow-lg transition-all"
            >
              Save Profile
            </button>
          ) : (
            <button
              onClick={() => setIsEdit(true)}
              className="px-8 py-3 bg-slate-900 text-white font-bold text-sm rounded-full hover:bg-slate-800 shadow-md hover:shadow-lg transition-all"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default MyProfile
