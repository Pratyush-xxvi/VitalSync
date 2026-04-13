import React, { useState } from 'react'
import { assets } from '../assets/assets'

function MyProfile() {
  const [userData, setUserData] = useState({
    name: "Edward Vincent",
    image: assets.profile_pic,
    email: 'edward@gmail.com',
    phone: '54321 78909',
    address: {
      line1: "Chawla hospital",
      line2: "sector 15, chandigarh, Punjab"
    },
    gender: 'Male',
    dob: '2000-01-20'
  })

  const [isEdit, setIsEdit] = useState(false)

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-2xl">
      {/* Profile Picture & Name */}
      <div className="flex items-center gap-6 mb-6">
        <img
          src={userData.image}
          alt="Profile"
          className="w-24 h-24 rounded-full border-4 border-gray-200 object-cover"
        />
        <div>
          {isEdit ? (
            <input
              type="text"
              value={userData.name}
              onChange={e => setUserData(prev => ({ ...prev, name: e.target.value }))}
              className="border p-2 rounded-md w-full"
            />
          ) : (
            <h2 className="text-2xl font-semibold">{userData.name}</h2>
          )}
        </div>
      </div>

      <hr className="my-4" />

      {/* Contact Info */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">Contact Information</h3>
        <div className="space-y-3">
          <p><span className="font-medium">Email:</span> {userData.email}</p>

          <div>
            <p className="font-medium">Phone:</p>
            {isEdit ? (
              <input
                type="text"
                value={userData.phone}
                onChange={e => setUserData(prev => ({ ...prev, phone: e.target.value }))}
                className="border p-2 rounded-md w-full"
              />
            ) : (
              <p>{userData.phone}</p>
            )}
          </div>

          <div>
            <p className="font-medium">Address:</p>
            {isEdit ? (
              <div className="space-y-2">
                <input
                  onChange={e => setUserData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))}
                  value={userData.address.line1}
                  type="text"
                  className="border p-2 rounded-md w-full"
                />
                <input
                  onChange={e => setUserData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))}
                  value={userData.address.line2}
                  type="text"
                  className="border p-2 rounded-md w-full"
                />
              </div>
            ) : (
              <p>{userData.address.line1}<br />{userData.address.line2}</p>
            )}
          </div>
        </div>
      </div>

      {/* Basic Info */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">Basic Information</h3>
        <div className="space-y-3">
          <div>
            <p className="font-medium">Gender:</p>
            {isEdit ? (
              <select
                onChange={e => setUserData(prev => ({ ...prev, gender: e.target.value }))}
                value={userData.gender}
                className="border p-2 rounded-md w-full"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            ) : (
              <p>{userData.gender}</p>
            )}
          </div>

          <div>
            <p className="font-medium">Birthday:</p>
            {isEdit ? (
              <input
                type="date"
                onChange={e => setUserData(prev => ({ ...prev, dob: e.target.value }))}
                value={userData.dob}
                className="border p-2 rounded-md w-full"
              />
            ) : (
              <p>{userData.dob}</p>
            )}
          </div>
        </div>
      </div>

      {/* Edit/Save Button */}
      <div className="flex justify-end">
        {isEdit ? (
          <button
            onClick={() => setIsEdit(false)}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Save Information
          </button>
        ) : (
          <button
            onClick={() => setIsEdit(true)}
            className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition"
          >
            Edit
          </button>
        )}
      </div>
    </div>
  )
}

export default MyProfile
