import React from "react";
import { useNavigate } from "react-router-dom";

const MyBookings = () => {
  const navigate = useNavigate();

  const bookings = [
    {
      turfName: "Greenfield Arena",
      area: "Indira Nagar",
      price: 1200,
      bookingDate: "2025-11-10, 5:30 AM",
      startDate: "2025-11-12",
      endDate: "2025-11-12",
      status: "Cancelled",
    },
    {
      turfName: "KickOff Zone",
      area: "Gomti Nagar",
      price: 1500,
      bookingDate: "2025-11-08, 6:00 AM",
      startDate: "2025-11-10",
      endDate: "2025-11-10",
      status: "Confirmed",
    },
    {
      turfName: "PowerPlay Arena",
      area: "Hazratganj",
      price: 1100,
      bookingDate: "2025-11-09, 7:30 AM",
      startDate: "2025-11-13",
      endDate: "2025-11-13",
      status: "Pending",
    },
    {
      turfName: "SoccerHub",
      area: "Alambagh",
      price: 1000,
      bookingDate: "2025-11-06, 5:30 AM",
      startDate: "2025-11-11",
      endDate: "2025-11-11",
      status: "Confirmed",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Confirmed":
        return "bg-green-100 text-green-700 border border-green-300";
      case "Cancelled":
        return "bg-red-100 text-red-700 border border-red-300";
      case "Pending":
        return "bg-yellow-100 text-yellow-700 border border-yellow-300";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const renderActionButtons = (status, index) => {
    const handleView = () => {
      navigate(`/viewbooking/${index + 1}`);
    };

    switch (status) {
      case "Cancelled":
      case "Confirmed":
        return (
          <button
            onClick={handleView}
            className="bg-green-200 text-green-800 px-3 py-1 rounded-lg border border-green-300 hover:bg-green-300 transition text-xs"
          >
            View
          </button>
        );

      case "Pending":
        return (
          <div className="flex gap-2">
            <button className="bg-red-200 text-red-700 px-3 py-1 rounded-lg border border-red-300 hover:bg-red-300 transition text-xs">
              Cancel
            </button>

            <button className="bg-green-200 text-green-800 px-3 py-1 rounded-lg border border-green-300 hover:bg-green-300 transition text-xs">
              Pay
            </button>

            <button
              onClick={handleView}
              className="bg-green-200 text-green-800 px-3 py-1 rounded-lg border border-green-300 hover:bg-green-300 transition text-xs"
            >
              View
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-green-50 flex flex-col items-center py-10">
      <div className="bg-white w-11/12 md:w-4/5 rounded-2xl shadow-md p-6 border border-green-200">
        <h2 className="text-2xl font-semibold text-green-800 mb-6 text-center">
          My Turf Bookings
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-green-200 text-green-800 text-sm border-b border-green-300">
                <th className="p-3 text-left">Turf Name</th>
                <th className="p-3 text-left">Area</th>
                <th className="p-3 text-left">Price</th>
                <th className="p-3 text-left">Booking Date & Time</th>
                <th className="p-3 text-left">Start Date</th>
                <th className="p-3 text-left">End Date</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Action</th>
              </tr>
            </thead>

            <tbody>
              {bookings.map((b, index) => (
                <tr
                  key={index}
                  className="border-b border-green-100 hover:bg-green-50 transition"
                >
                  <td className="p-3 text-gray-800">{b.turfName}</td>
                  <td className="p-3 text-gray-800">{b.area}</td>
                  <td className="p-3 text-gray-800">₹{b.price}</td>
                  <td className="p-3 text-gray-800">{b.bookingDate}</td>
                  <td className="p-3 text-gray-800">{b.startDate}</td>
                  <td className="p-3 text-gray-800">{b.endDate}</td>
                  <td className="p-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                        b.status
                      )}`}
                    >
                      {b.status}
                    </span>
                  </td>
                  <td className="p-3">
                    {renderActionButtons(b.status, index)}
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>
    </div>
  );
};

export default MyBookings;
