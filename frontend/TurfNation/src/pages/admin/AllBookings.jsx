import React, { useEffect, useState } from "react";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/booking/getAllBookings")
      .then((res) => res.json())
      .then((data) => setBookings(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-6 bg-green-50 min-h-screen">
      <h2 className="text-3xl font-bold text-green-700 mb-6">All Bookings</h2>

      <table className="w-full bg-white shadow-md rounded-lg border border-green-200">
        <thead className="bg-green-600 text-white">
          <tr>
            <th className="p-3 text-left">Booking ID</th>
            <th className="p-3 text-left">Turf Name</th>
            <th className="p-3 text-left">User</th>
            <th className="p-3 text-left">Date</th>
            <th className="p-3 text-left">Time</th>
            <th className="p-3 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b) => (
            <tr key={b.id} className="border-b hover:bg-green-50">
              <td className="p-3">{b.id}</td>
              <td className="p-3">{b.turfName}</td>
              <td className="p-3">{b.userName}</td>
              <td className="p-3">{b.date}</td>
              <td className="p-3">{b.timeSlot}</td>
              <td className="p-3">{b.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Bookings;