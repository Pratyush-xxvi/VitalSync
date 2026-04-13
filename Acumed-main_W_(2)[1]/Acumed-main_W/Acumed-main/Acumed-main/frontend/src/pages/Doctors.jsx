import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { specialityData } from "../assets/assets";

function Doctors() {
  const { speciality } = useParams();
  const [filterDoct, setFilterDoct] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const { doctors } = useContext(AppContext);
  const navigate = useNavigate();

  // Apply filter whenever doctors or speciality changes
  useEffect(() => {
    console.log("Current Speciality from useParams:", speciality);
    console.log("Doctors from context:", doctors);
    if (speciality) {
      const cleanSpeciality = decodeURIComponent(speciality).toLowerCase().trim();
      console.log("Cleaned URL Speciality:", cleanSpeciality);
      const filtered = doctors.filter((doc) => {
        const docSpeciality = doc.speciality?.toLowerCase().trim();
        console.log("Doctor Speciality:", docSpeciality);
        return docSpeciality === cleanSpeciality;
      });
      console.log("Filtered Doctors:", filtered);
      setFilterDoct(filtered);
    } else {
      console.log("No speciality, showing all doctors:", doctors);
      setFilterDoct(doctors);
    }
  }, [doctors, speciality]);

  return (
    <div>
      <p className="text-gray-600">Browse through the doctors specialist.</p>
      <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">
        {/* Sidebar specialties */}
        <button
          className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${
            showFilter ? "bg-blue-500 text-white" : ""
          }`}
          onClick={() => setShowFilter((prev) => !prev)}
        >
          Filters
        </button>
        <div className={` flex-col gap-4 text-sm text-gray-600 ${showFilter ? "flex" : "hidden sm:flex"} sm:flex w-full sm:w-auto`}>
          <p
            onClick={() => {
              console.log("Navigating to: /doctors");
              navigate("/doctors");
            }}
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
              !speciality ? "bg-indigo-100 text-black" : ""
            }`}
          >
            All Doctors
          </p>
          {specialityData.map((item, index) => (
            <p
              key={index}
              onClick={() => {
                const url = `/doctors/${encodeURIComponent(item.speciality)}`;
                console.log("Navigating to:", url);
                navigate(url);
              }}
              className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
                speciality &&
                decodeURIComponent(speciality).toLowerCase().trim() ===
                  item.speciality.toLowerCase().trim()
                  ? "bg-indigo-100 text-black"
                  : ""
              }`}
            >
              {item.speciality}
            </p>
          ))}
        </div>

        {/* Doctors list */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filterDoct.length > 0 ? (
            filterDoct.map((item) => (
              <div
                onClick={() => navigate(`/appointment/${item._id}`)}
                key={item._id}
                className="flex flex-col items-center gap-2 border border-gray-200 rounded-xl overflow-hidden p-4 hover:-translate-y-2 transition-all duration-500 cursor-pointer shadow-sm"
              >
                <img
                  className="bg-blue-50 rounded-md"
                  src={item.image}
                  alt={item.name}
                />
                <div className="p-4 text-center">
                  <div className="flex items-center justify-center gap-2 text-sm text-green-500 mb-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <p>Available</p>
                  </div>
                  <p className="text-gray-900 text-lg font-medium">{item.name}</p>
                  <p className="text-gray-600 text-sm">{item.speciality}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No doctors found for this speciality.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Doctors;