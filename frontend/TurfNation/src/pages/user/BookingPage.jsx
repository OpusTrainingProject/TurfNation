import React from "react";
import { useLocation } from "react-router-dom";

const BookingPage = () => {
  const { state: turf } = useLocation();

  if (!turf) return <p className="text-center mt-10 text-gray-600">No turf selected.</p>;

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white flex flex-row w-4/5 max-w-4xl rounded-xl shadow-lg overflow-hidden">
        
        {/* Turf Image */}
        <img
          src={turf.image}
          alt={turf.name}
          className="w-1/2 object-cover"
        />

        {/* Details Section */}
        <div className="w-1/2 p-6 flex flex-col gap-3">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">{turf.name}</h2>
          <p><span className="font-semibold">Area:</span> {turf.area}</p>
          <p><span className="font-semibold">Address:</span> {turf.address}</p>
          <p><span className="font-semibold">Type:</span> {turf.type}</p>
          <p><span className="font-semibold">Price:</span> ₹{turf.price}/hour</p>

          {/* Start Time */}
          <label className="mt-2 font-semibold text-gray-700">Start Time:</label>
          <select className="p-2 border border-gray-300 rounded-md">
            <option>06:00</option>
            <option>07:00</option>
            <option>08:00</option>
            <option>09:00</option>
            <option>10:00</option>
          </select>

          {/* End Time */}
          <label className="mt-2 font-semibold text-gray-700">End Time:</label>
          <select className="p-2 border border-gray-300 rounded-md">
            <option>07:00</option>
            <option>08:00</option>
            <option>09:00</option>
            <option>10:00</option>
            <option>11:00</option>
          </select>

          {/* Date */}
          <label className="mt-2 font-semibold text-gray-700">Date:</label>
          <input
            type="date"
            className="p-2 border border-gray-300 rounded-md"
          />

          {/* Pay Button */}
          <button
            className="mt-4 w-full bg-green-200 text-green-800 py-2 rounded-md border border-green-300 hover:bg-green-300 transition"

          >
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
