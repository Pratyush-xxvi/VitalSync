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

  useEffect(() => {
    if (speciality) {
      const cleanSpeciality = decodeURIComponent(speciality).toLowerCase().trim();
      const filtered = doctors.filter((doc) => {
        const docSpeciality = doc.speciality?.toLowerCase().trim();
        return docSpeciality === cleanSpeciality;
      });
      setFilterDoct(filtered);
    } else {
      setFilterDoct(doctors);
    }
  }, [doctors, speciality]);

  return (
    <div className="py-8 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="mb-8 flex flex-col gap-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Find Healthcare Specialists
        </h1>
        <p className="text-slate-500 text-sm">
          Browse through certified medical professionals and choose the right specialist for your health needs.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row items-start gap-8">
        
        {/* Mobile Filter Toggle Button */}
        <button
          className="lg:hidden w-full py-2.5 px-4 bg-white border border-slate-200 rounded-xl text-slate-700 font-semibold text-sm flex items-center justify-between shadow-xs"
          onClick={() => setShowFilter((prev) => !prev)}
        >
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path></svg>
            Specialty Filters
          </span>
          <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-bold">
            {speciality ? decodeURIComponent(speciality) : 'All'}
          </span>
        </button>

        {/* Sidebar Specialty Filter */}
        <div className={`w-full lg:w-64 flex-col gap-2 ${showFilter ? "flex" : "hidden lg:flex"}`}>
          <div className="p-2 bg-white rounded-2xl border border-slate-100 shadow-sm flex flex-col gap-1">
            <p className="px-3 py-2 text-xs font-bold uppercase tracking-wider text-slate-400">
              Filter By Specialty
            </p>
            
            <button
              onClick={() => navigate("/doctors")}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all duration-200 flex items-center justify-between ${
                !speciality 
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/20" 
                  : "text-slate-700 hover:bg-slate-50"
              }`}
            >
              <span>All Doctors</span>
              <span className={`text-xs px-2 py-0.5 rounded-full ${!speciality ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"}`}>
                {doctors.length}
              </span>
            </button>

            {specialityData.map((item, index) => {
              const isActive = speciality && decodeURIComponent(speciality).toLowerCase().trim() === item.speciality.toLowerCase().trim();
              const docCount = doctors.filter(d => d.speciality?.toLowerCase().trim() === item.speciality.toLowerCase().trim()).length;

              return (
                <button
                  key={index}
                  onClick={() => navigate(`/doctors/${encodeURIComponent(item.speciality)}`)}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all duration-200 flex items-center justify-between ${
                    isActive 
                      ? "bg-blue-600 text-white shadow-md shadow-blue-500/20" 
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <span className="truncate">{item.speciality}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"}`}>
                    {docCount}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Doctors Grid */}
        <div className="flex-1 w-full">
          {filterDoct.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
              {filterDoct.map((item) => (
                <div
                  onClick={() => navigate(`/appointment/${item._id}`)}
                  key={item._id}
                  className="group bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-xs hover:shadow-2xl hover:border-blue-200 hover:-translate-y-2 transition-all duration-300 cursor-pointer flex flex-col justify-between"
                >
                  <div className="bg-gradient-to-b from-blue-50/80 to-slate-50 relative overflow-hidden pt-4 px-4 flex items-center justify-center">
                    <span className="absolute top-3 left-3 bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5 backdrop-blur-xs z-10">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      Available
                    </span>
                    <img
                      className="w-full h-48 object-contain transform group-hover:scale-105 transition-transform duration-500"
                      src={item.image}
                      alt={item.name}
                    />
                  </div>

                  <div className="p-5 flex flex-col gap-2">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider bg-blue-50 px-2.5 py-0.5 rounded-md">
                        {item.speciality}
                      </span>
                      {item.fees && (
                        <span className="text-xs font-semibold text-slate-500">
                          ${item.fees}
                        </span>
                      )}
                    </div>
                    
                    <h3 className="text-slate-900 text-base font-bold group-hover:text-blue-600 transition-colors line-clamp-1">
                      {item.name}
                    </h3>

                    <p className="text-slate-500 text-xs flex items-center gap-1">
                      <svg className="w-3.5 h-3.5 text-amber-400 fill-amber-400" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                      <span className="font-semibold text-slate-700">4.9</span> (95+ reviews)
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-12 border border-slate-100 text-center flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </div>
              <h3 className="text-lg font-bold text-slate-800">No Doctors Found</h3>
              <p className="text-slate-500 text-sm max-w-md">There are currently no specialists listed under this category. Please check back soon or browse all doctors.</p>
              <button onClick={() => navigate('/doctors')} className="px-6 py-2 bg-blue-600 text-white rounded-full font-semibold text-xs shadow-md">
                Show All Doctors
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Doctors;