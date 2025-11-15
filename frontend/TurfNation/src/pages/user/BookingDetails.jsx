import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReviewSection from "./ReviewSection";

const BookingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // mock data (replace with backend fetch)
  const booking = {
    id,
    turfName: "Greenfield Arena",
    location: "Indira Nagar, Lucknow",
    totalHours: 2,
    pricePerHour: 1200,
    totalPrice: 2400,
    bookingDateTime: "2025-11-10, 5:30 AM",
    startDate: "2025-11-12",
    endDate: "2025-11-12",
    status: "CONFIRMED",
    image:
      "https://images.unsplash.com/photo-1600959907703-125ba1374b8b?auto=format&fit=crop&w=800&q=60",
  };

  const payment = {
    paymentId: 101,
    bookingId: id,
    paymentMethod: "UPI",
    paymentStatus: "PAID",
    paidOn: "2025-11-11, 10:00 AM",
    amountPaid: 2400,
    transactionId: "TXN12345ABC6789",
  };

  return (
    <div className="min-h-screen bg-green-50 py-10 px-6">

      {/* Back Button */}
      <button
        onClick={() => navigate("/mybooking")}
        className="mb-6 bg-green-200 text-green-800 border border-green-300 px-4 py-2 rounded-lg hover:bg-green-300 transition font-medium"
      >
        ← Back to My Bookings
      </button>

      {/* Main Details Section */}
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">

        {/* Booking Details Card */}
        <div className="bg-white shadow-md rounded-2xl p-6 border border-green-200">
          <h2 className="text-xl font-semibold text-green-800 mb-4">
            Booking Details
          </h2>

          <div className="flex flex-col items-center md:items-start gap-4">
            <img
              src={booking.image}
              alt={booking.turfName}
              className="w-64 h-40 object-cover rounded-lg border border-green-100"
            />

            <div className="text-gray-800 space-y-2 w-full">
              <p><strong>Turf:</strong> {booking.turfName}</p>
              <p><strong>Location:</strong> {booking.location}</p>
              <p><strong>Total Hours:</strong> {booking.totalHours}</p>
              <p><strong>Price/Hour:</strong> ₹{booking.pricePerHour}</p>
              <p><strong>Total Price:</strong> ₹{booking.totalPrice}</p>
              <p><strong>Booking Date & Time:</strong> {booking.bookingDateTime}</p>
              <p><strong>From:</strong> {booking.startDate}</p>
              <p><strong>To:</strong> {booking.endDate}</p>

              {/* Status */}
              <p>
                <strong>Status:</strong>{" "}
                <span
                  className={`px-2 py-1 rounded-md font-semibold ${
                    booking.status === "CONFIRMED"
                      ? "bg-green-100 text-green-700 border border-green-300"
                      : booking.status === "PENDING"
                      ? "bg-yellow-100 text-yellow-700 border border-yellow-300"
                      : "bg-red-100 text-red-700 border border-red-300"
                  }`}
                >
                  {booking.status}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Payment Details Card */}
        <div className="bg-white shadow-md rounded-2xl p-6 border border-green-200">
          <h2 className="text-xl font-semibold text-green-800 mb-4">
            Payment Details
          </h2>

          <div className="text-gray-800 space-y-2">
            <p><strong>Payment ID:</strong> {payment.paymentId}</p>
            <p><strong>Booking ID:</strong> {payment.bookingId}</p>
            <p><strong>Payment Method:</strong> {payment.paymentMethod}</p>

            {/* Payment Status */}
            <p>
              <strong>Payment Status:</strong>{" "}
              <span
                className={`px-2 py-1 rounded-md font-semibold ${
                  payment.paymentStatus === "PAID"
                    ? "bg-green-100 text-green-700 border border-green-300"
                    : "bg-yellow-100 text-yellow-700 border border-yellow-300"
                }`}
              >
                {payment.paymentStatus}
              </span>
            </p>

            <p><strong>Paid On:</strong> {payment.paidOn}</p>
            <p><strong>Amount Paid:</strong> ₹{payment.amountPaid}</p>
            <p><strong>Transaction ID:</strong> {payment.transactionId}</p>
          </div>
        </div>

      </div>

      {/* REVIEW SECTION */}
      <div className="max-w-3xl mx-auto mt-10">
        <ReviewSection bookingId={booking.id} />
      </div>

    </div>
  );
};

export default BookingDetails;
