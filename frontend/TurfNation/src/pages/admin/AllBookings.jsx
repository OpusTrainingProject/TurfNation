// import React, { useEffect, useState } from "react";

// const Bookings = () => {
//   const [bookings, setBookings] = useState([]);

//   useEffect(() => {
//     fetch("http://localhost:8080/booking/getAllBookings")
//       .then((res) => res.json())
//       .then((data) => setBookings(data))
//       .catch((err) => console.error(err));
//   }, []);

//   return (
//     <div className="p-6 bg-green-50 min-h-screen">
//       <h2 className="text-3xl font-bold text-green-700 mb-6">All Bookings</h2>

//       <table className="w-full bg-white shadow-md rounded-lg border border-green-200">
//         <thead className="bg-green-600 text-white">
//           <tr>
//             <th className="p-3 text-left">Booking ID</th>
//             <th className="p-3 text-left">Turf Name</th>
//             <th className="p-3 text-left">User</th>
//             <th className="p-3 text-left">Date</th>
//             <th className="p-3 text-left">Time</th>
//             <th className="p-3 text-left">Status</th>
//           </tr>
//         </thead>
//         <tbody>
//           {bookings.map((b) => (
//             <tr key={b.id} className="border-b hover:bg-green-50">
//               <td className="p-3">{b.id}</td>
//               <td className="p-3">{b.turfName}</td>
//               <td className="p-3">{b.userName}</td>
//               <td className="p-3">{b.date}</td>
//               <td className="p-3">{b.timeSlot}</td>
//               <td className="p-3">{b.status}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Bookings;


import React, { useState } from "react";

const Bookings = () => {
  // 5 Dummy bookings data
  const [bookings, setBookings] = useState([
    {
      id: 1,
      turfName: "Green Valley Sports Arena",
      userName: "Rahul Sharma",
      date: "2025-11-20",
      timeSlot: "6:00 PM - 7:00 PM",
      status: "CONFIRMED"
    },
    {
      id: 2,
      turfName: "Champions Cricket Ground",
      userName: "Priya Patel",
      date: "2025-11-21",
      timeSlot: "9:00 AM - 10:30 AM",
      status: "CONFIRMED"
    },
    {
      id: 3,
      turfName: "Elite Football Academy",
      userName: "Amit Kumar",
      date: "2025-11-22",
      timeSlot: "5:00 PM - 6:30 PM",
      status: "PENDING"
    },
    {
      id: 4,
      turfName: "Green Valley Sports Arena",
      userName: "Sneha Reddy",
      date: "2025-11-23",
      timeSlot: "7:00 PM - 8:00 PM",
      status: "CONFIRMED"
    },
    {
      id: 5,
      turfName: "Champions Cricket Ground",
      userName: "Vikram Singh",
      date: "2025-11-24",
      timeSlot: "10:00 AM - 12:00 PM",
      status: "CANCELLED"
    }
  ]);

  // Function to get status badge color
  const getStatusColor = (status) => {
    switch (status) {
      case "CONFIRMED":
        return "bg-green-100 text-green-700 border-green-300";
      case "PENDING":
        return "bg-yellow-100 text-yellow-700 border-yellow-300";
      case "CANCELLED":
        return "bg-red-100 text-red-700 border-red-300";
      default:
        return "bg-gray-100 text-gray-700 border-gray-300";
    }
  };

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 via-green-50 to-emerald-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-4xl font-black bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">
            📅 All Bookings
          </h2>
          <p className="text-gray-600 font-medium">
            Total Bookings: <span className="font-bold text-green-600">{bookings.length}</span>
          </p>
        </div>

        {/* Table */}
        <div className="bg-white shadow-2xl rounded-2xl border-2 border-green-100 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-green-600 to-emerald-600 text-white">
              <tr>
                <th className="p-4 text-left font-black text-sm uppercase tracking-wider">Booking ID</th>
                <th className="p-4 text-left font-black text-sm uppercase tracking-wider">Turf Name</th>
                <th className="p-4 text-left font-black text-sm uppercase tracking-wider">User</th>
                <th className="p-4 text-left font-black text-sm uppercase tracking-wider">Date</th>
                <th className="p-4 text-left font-black text-sm uppercase tracking-wider">Time Slot</th>
                <th className="p-4 text-left font-black text-sm uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {bookings.map((b) => (
                <tr 
                  key={b.id} 
                  className="hover:bg-green-50 transition-colors duration-200"
                >
                  <td className="p-4">
                    <span className="font-bold text-gray-800">#{b.id}</span>
                  </td>
                  <td className="p-4">
                    <span className="font-semibold text-gray-800">{b.turfName}</span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-white font-bold text-sm">
                        {b.userName.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </div>
                      <span className="font-medium text-gray-700">{b.userName}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="font-semibold text-gray-700">
                      {new Date(b.date).toLocaleDateString('en-IN', { 
                        year: 'numeric', 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="font-medium text-gray-700 bg-gray-100 px-3 py-1 rounded-full text-sm">
                      ⏰ {b.timeSlot}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-bold border-2 ${getStatusColor(b.status)}`}>
                      {b.status === "CONFIRMED" && "✅"}
                      {b.status === "PENDING" && "⏳"}
                      {b.status === "CANCELLED" && "❌"}
                      {" "}{b.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {bookings.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl shadow-xl border-2 border-gray-100">
            <p className="text-2xl font-bold text-gray-400">📭 No bookings found</p>
            <p className="text-gray-500 mt-2">Bookings will appear here once created</p>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white rounded-2xl shadow-lg border-2 border-green-100 p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                <span className="text-2xl">✅</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-600">Confirmed</p>
                <p className="text-3xl font-black text-green-600">
                  {bookings.filter(b => b.status === "CONFIRMED").length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border-2 border-yellow-100 p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl flex items-center justify-center">
                <span className="text-2xl">⏳</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-600">Pending</p>
                <p className="text-3xl font-black text-yellow-600">
                  {bookings.filter(b => b.status === "PENDING").length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border-2 border-red-100 p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-600 rounded-xl flex items-center justify-center">
                <span className="text-2xl">❌</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-600">Cancelled</p>
                <p className="text-3xl font-black text-red-600">
                  {bookings.filter(b => b.status === "CANCELLED").length}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bookings;
