// import React, { useState, useEffect } from 'react';
// import { useNavigate, useLocation, Link } from 'react-router-dom';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { FaCalendar, FaClock, FaMoneyBill, FaFutbol, FaArrowLeft, FaCheckCircle } from 'react-icons/fa';
// import { bookingService } from '../../services/BookingService';

// const Booking = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const turfData = location.state;

//   const [loading, setLoading] = useState(false);
//   const [isLoaded, setIsLoaded] = useState(false);
  
//   const [bookingData, setBookingData] = useState({
//     bookingDate: '',
//     startTime: '',
//     endTime: '',
//     turfId: turfData?.id || null,
//     amount: 0
//   });

//   useEffect(() => {
//     // Redirect if no turf data
//     if (!turfData) {
//       toast.error('No turf selected. Please select a turf first.');
//       navigate('/dashboard');
//       return;
//     }

//     // Trigger animation
//     setTimeout(() => setIsLoaded(true), 100);
//   }, [turfData, navigate]);

//   // Calculate amount based on time duration
//   const calculateAmount = (startTime, endTime) => {
//     if (!startTime || !endTime || !turfData?.price) return 0;

//     const [startHour, startMin] = startTime.split(':').map(Number);
//     const [endHour, endMin] = endTime.split(':').map(Number);

//     const startMinutes = startHour * 60 + startMin;
//     const endMinutes = endHour * 60 + endMin;

//     if (endMinutes <= startMinutes) {
//       return 0;
//     }

//     const durationHours = (endMinutes - startMinutes) / 60;
//     return Math.round(durationHours * turfData.price * 100) / 100;
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
    
//     setBookingData(prev => {
//       const updated = { ...prev, [name]: value };
      
//       // Recalculate amount when time changes
//       if (name === 'startTime' || name === 'endTime') {
//         updated.amount = calculateAmount(
//           name === 'startTime' ? value : prev.startTime,
//           name === 'endTime' ? value : prev.endTime
//         );
//       }
      
//       return updated;
//     });
//   };

//   const validateBooking = () => {
//     const { bookingDate, startTime, endTime, amount } = bookingData;

//     if (!bookingDate) {
//       toast.warn('Please select a booking date');
//       return false;
//     }

//     if (!startTime) {
//       toast.warn('Please select a start time');
//       return false;
//     }

//     if (!endTime) {
//       toast.warn('Please select an end time');
//       return false;
//     }

//     // Validate date is not in the past
//     const selectedDate = new Date(bookingDate);
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);
    
//     if (selectedDate < today) {
//       toast.warn('Booking date cannot be in the past');
//       return false;
//     }

//     // Validate end time is after start time
//     const [startHour, startMin] = startTime.split(':').map(Number);
//     const [endHour, endMin] = endTime.split(':').map(Number);
//     const startMinutes = startHour * 60 + startMin;
//     const endMinutes = endHour * 60 + endMin;

//     if (endMinutes <= startMinutes) {
//       toast.warn('End time must be after start time');
//       return false;
//     }

//     // Validate minimum booking duration (e.g., 1 hour)
//     const durationHours = (endMinutes - startMinutes) / 60;
//     if (durationHours < 1) {
//       toast.warn('Minimum booking duration is 1 hour');
//       return false;
//     }

//     if (amount <= 0) {
//       toast.warn('Invalid booking amount');
//       return false;
//     }

//     return true;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!validateBooking()) {
//       return;
//     }

//     try {
//       setLoading(true);

//       const response = await bookingService.createBooking(bookingData);
//       sessionStorage.setItem("bookingId", response.bookingId)
//       toast.success('Booking confirmed successfully! 🎉', {
//         position: 'top-right',
//         autoClose: 3000
//       });

//       console.log('Booking response:', response);

//       // Navigate to bookings page after delay
//       setTimeout(() => {
//         navigate('/user/checkout');
//       }, 2000);

//     } catch (error) {
//       const errorMessage = error.response?.data?.message 
//         || error.message 
//         || 'Failed to create booking';
      
//       toast.error(`Booking failed: ${errorMessage}`, {
//         position: 'top-right',
//         autoClose: 4000
//       });
      
//       console.error('Booking error:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Get today's date in YYYY-MM-DD format for min date
//   const getTodayDate = () => {
//     return new Date().toISOString().split('T')[0];
//   };

//   if (!turfData) {
//     return null;
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
//       <style>{`
//         @keyframes fadeIn {
//           from { opacity: 0; }
//           to { opacity: 1; }
//         }
//         @keyframes slideUp {
//           from { opacity: 0; transform: translateY(30px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         @keyframes scaleIn {
//           from { opacity: 0; transform: scale(0.9); }
//           to { opacity: 1; transform: scale(1); }
//         }
//         @keyframes pulse {
//           0%, 100% { transform: scale(1); }
//           50% { transform: scale(1.05); }
//         }
//         .animate-fadeIn { animation: fadeIn 0.6s ease-out; }
//         .animate-slideUp { animation: slideUp 0.8s ease-out; }
//         .animate-scaleIn { animation: scaleIn 0.5s ease-out; }
//         .animate-pulse-slow { animation: pulse 2s ease-in-out infinite; }
//         .input-focus {
//           transition: all 0.3s ease;
//         }
//         .input-focus:focus {
//           transform: translateY(-2px);
//           box-shadow: 0 4px 12px rgba(34, 197, 94, 0.2);
//         }
//       `}</style>

//       <ToastContainer position="top-right" autoClose={3000} />

//       {/* Navbar */}
//       <nav className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 shadow-lg sticky top-0 z-40">
//         <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
//           <div className="flex items-center gap-4">
//             <button
//               onClick={() => navigate(-1)}
//               className="flex items-center gap-2 hover:bg-white/10 px-3 py-2 rounded-lg transition-all duration-300"
//             >
//               <FaArrowLeft className="w-5 h-5" />
//               <span className="font-semibold">Back</span>
//             </button>
//             <div className="h-8 w-px bg-white/30"></div>
//             <div className="flex items-center gap-3">
//               <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
//                 <FaFutbol className="w-5 h-5" />
//               </div>
//               <span className="text-xl font-bold">Turf Nation</span>
//             </div>
//           </div>
          
//           <h1 className="text-2xl font-bold">Complete Your Booking</h1>
//         </div>
//       </nav>

//       {/* Main Content */}
//       <div className="max-w-6xl mx-auto px-6 py-12">
//         <div className="grid md:grid-cols-2 gap-8">
          
//           {/* Left Side - Turf Details */}
//           <div className={`space-y-6 ${isLoaded ? 'animate-slideUp' : 'opacity-0'}`}>
//             <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-green-100">
//               <div className="relative h-64">
//                 <img
//                   src={turfData.image}
//                   alt={turfData.name}
//                   className="w-full h-full object-cover"
//                 />
//                 <div className="absolute top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
//                   {turfData.type}
//                 </div>
//               </div>

//               <div className="p-6 space-y-4">
//                 <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
//                   {turfData.name}
//                 </h2>

//                 <div className="space-y-3">
//                   <div className="flex items-start gap-2">
//                     <span className="text-green-600 mt-1">📍</span>
//                     <div>
//                       <p className="font-semibold text-gray-700">Location</p>
//                       <p className="text-gray-600">{turfData.area}</p>
//                       <p className="text-gray-500 text-sm">{turfData.address}</p>
//                     </div>
//                   </div>

//                   <div className="flex items-start gap-2">
//                     <span className="text-green-600 mt-1">📝</span>
//                     <div>
//                       <p className="font-semibold text-gray-700">Description</p>
//                       <p className="text-gray-600">{turfData.description}</p>
//                     </div>
//                   </div>

//                   <div className="flex items-center gap-2 bg-green-50 p-4 rounded-lg border border-green-200">
//                     <span className="text-2xl">💰</span>
//                     <div>
//                       <p className="text-gray-600 text-sm">Hourly Rate</p>
//                       <p className="text-green-600 font-bold text-2xl">₹{turfData.price}</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Right Side - Booking Form */}
//           <div className={`${isLoaded ? 'animate-slideUp' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
//             <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-green-100">
//               <div className="text-center mb-8">
//                 <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse-slow">
//                   <FaCalendar className="w-8 h-8 text-white" />
//                 </div>
//                 <h3 className="text-2xl font-bold text-gray-800">Book Your Slot</h3>
//                 <p className="text-gray-600 mt-2">Fill in the details below to confirm your booking</p>
//               </div>

//               <form onSubmit={handleSubmit} className="space-y-6">
                
//                 {/* Booking Date */}
//                 <div className="space-y-2">
//                   <label className="flex items-center gap-2 text-gray-700 font-semibold text-sm">
//                     <FaCalendar className="w-4 h-4 text-green-600" />
//                     Booking Date
//                   </label>
//                   <input
//                     type="date"
//                     name="bookingDate"
//                     value={bookingData.bookingDate}
//                     onChange={handleInputChange}
//                     min={getTodayDate()}
//                     disabled={loading}
//                     className="w-full px-4 py-3 border-2 border-green-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300 bg-white input-focus disabled:opacity-50 disabled:cursor-not-allowed"
//                     required
//                   />
//                 </div>

//                 {/* Start Time */}
//                 <div className="space-y-2">
//                   <label className="flex items-center gap-2 text-gray-700 font-semibold text-sm">
//                     <FaClock className="w-4 h-4 text-green-600" />
//                     Start Time
//                   </label>
//                   <input
//                     type="time"
//                     name="startTime"
//                     value={bookingData.startTime}
//                     onChange={handleInputChange}
//                     disabled={loading}
//                     className="w-full px-4 py-3 border-2 border-green-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300 bg-white input-focus disabled:opacity-50 disabled:cursor-not-allowed"
//                     required
//                   />
//                 </div>

//                 {/* End Time */}
//                 <div className="space-y-2">
//                   <label className="flex items-center gap-2 text-gray-700 font-semibold text-sm">
//                     <FaClock className="w-4 h-4 text-green-600" />
//                     End Time
//                   </label>
//                   <input
//                     type="time"
//                     name="endTime"
//                     value={bookingData.endTime}
//                     onChange={handleInputChange}
//                     disabled={loading}
//                     className="w-full px-4 py-3 border-2 border-green-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300 bg-white input-focus disabled:opacity-50 disabled:cursor-not-allowed"
//                     required
//                   />
//                 </div>

//                 {/* Amount Display */}
//                 <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border-2 border-green-200">
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center gap-2">
//                       <FaMoneyBill className="w-6 h-6 text-green-600" />
//                       <span className="text-gray-700 font-semibold">Total Amount</span>
//                     </div>
//                     <div className="text-right">
//                       <p className="text-3xl font-bold text-green-600">
//                         ₹{bookingData.amount.toFixed(2)}
//                       </p>
//                       {bookingData.startTime && bookingData.endTime && (
//                         <p className="text-sm text-gray-500 mt-1">
//                           Duration: {((calculateAmount(bookingData.startTime, bookingData.endTime) / turfData.price)).toFixed(1)} hours
//                         </p>
//                       )}
//                     </div>
//                   </div>
//                 </div>

//                 {/* Submit Button */}
//                 <button
//                   type="submit"
//                   disabled={loading || bookingData.amount <= 0}
//                   className={`w-full py-4 rounded-xl font-bold text-white text-lg
//                   transition-all duration-300 transform
//                   flex items-center justify-center gap-3 group
//                   ${loading || bookingData.amount <= 0
//                     ? "bg-green-300 cursor-not-allowed"
//                     : "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 hover:scale-105 hover:shadow-xl hover:shadow-green-500/50 active:scale-95"
//                   }`}
//                 >
//                   {loading ? (
//                     <>
//                       <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
//                       Processing...
//                     </>
//                   ) : (
//                     <>
//                       <FaCheckCircle className="w-6 h-6" />
//                       Confirm Booking
//                     </>

//                   )}
//                 </button>

//                 {/* Info Text */}
//                 <p className="text-center text-gray-500 text-sm">
//                   By confirming, you agree to our booking terms and conditions
//                 </p>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Booking;
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaCalendar, FaClock, FaMoneyBill, FaFutbol, FaArrowLeft, FaCheckCircle, FaShieldAlt } from 'react-icons/fa';
import { bookingService } from '../../services/BookingService';
import { paymentService } from '../../services/PaymentService';
import { jwtDecode } from 'jwt-decode';

const Booking = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const turfData = location.state;

  const [loading, setLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [processing, setProcessing] = useState(false);
  
  const [bookingData, setBookingData] = useState({
    bookingDate: '',
    startTime: '',
    endTime: '',
    turfId: turfData?.id || null,
    amount: 0
  });

  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    contact: ''
  });

  useEffect(() => {
    // Load Razorpay script
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  useEffect(() => {
    // Redirect if no turf data
    if (!turfData) {
      toast.error('No turf selected. Please select a turf first.');
      navigate('/dashboard');
      return;
    }

    // Fetch user details from token
    fetchUserDetails();

    // Trigger animation
    setTimeout(() => setIsLoaded(true), 100);
  }, [turfData, navigate]);

  const fetchUserDetails = () => {
    try {
      const token = sessionStorage.getItem('token');
      if (token) {
        const decoded = jwtDecode(token);
        setUserDetails({
          name: `${decoded.firstName || ''} ${decoded.lastName || ''}`.trim() || 'Guest',
          email: decoded.email || decoded.sub || '',
          contact: decoded.phone || decoded.contact || ''
        });
      }
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  };

  // Calculate amount based on time duration
  const calculateAmount = (startTime, endTime) => {
    if (!startTime || !endTime || !turfData?.price) return 0;

    const [startHour, startMin] = startTime.split(':').map(Number);
    const [endHour, endMin] = endTime.split(':').map(Number);

    const startMinutes = startHour * 60 + startMin;
    const endMinutes = endHour * 60 + endMin;

    if (endMinutes <= startMinutes) {
      return 0;
    }

    const durationHours = (endMinutes - startMinutes) / 60;
    return Math.round(durationHours * turfData.price * 100) / 100;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    setBookingData(prev => {
      const updated = { ...prev, [name]: value };
      
      // Recalculate amount when time changes
      if (name === 'startTime' || name === 'endTime') {
        updated.amount = calculateAmount(
          name === 'startTime' ? value : prev.startTime,
          name === 'endTime' ? value : prev.endTime
        );
      }
      
      return updated;
    });
  };

  const validateBooking = () => {
    const { bookingDate, startTime, endTime, amount } = bookingData;

    if (!bookingDate) {
      toast.warn('Please select a booking date');
      return false;
    }

    if (!startTime) {
      toast.warn('Please select a start time');
      return false;
    }

    if (!endTime) {
      toast.warn('Please select an end time');
      return false;
    }

    // Validate date is not in the past
    const selectedDate = new Date(bookingDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
      toast.warn('Booking date cannot be in the past');
      return false;
    }

    // Validate end time is after start time
    const [startHour, startMin] = startTime.split(':').map(Number);
    const [endHour, endMin] = endTime.split(':').map(Number);
    const startMinutes = startHour * 60 + startMin;
    const endMinutes = endHour * 60 + endMin;

    if (endMinutes <= startMinutes) {
      toast.warn('End time must be after start time');
      return false;
    }

    // Validate minimum booking duration (e.g., 1 hour)
    const durationHours = (endMinutes - startMinutes) / 60;
    if (durationHours < 1) {
      toast.warn('Minimum booking duration is 1 hour');
      return false;
    }

    if (amount <= 0) {
      toast.warn('Invalid booking amount');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateBooking()) {
      return;
    }

    try {
      setLoading(true);
      setProcessing(true);

      // Step 1: Create booking
      toast.info('Creating booking...', { autoClose: 2000 });
      const bookingResponse = await bookingService.createBooking(bookingData);
      const bookingId = bookingResponse.bookingId;
      
      sessionStorage.setItem("bookingId", bookingId);

      toast.success('Booking created! Initiating payment...', { autoClose: 2000 });

      // Step 2: Create Razorpay order
      const orderDetails = await paymentService.getOrderDetails(bookingId);

      // Step 3: Open Razorpay payment gateway
      const options = {
        key: "rzp_test_RdUjV33y2LVZSB", // Replace with your Razorpay Key ID
        amount: orderDetails.amount,
        currency: orderDetails.currency || "INR",
        name: "Turf Nation",
        description: `${turfData.name} Booking`,
        image: "https://images.unsplash.com/photo-1521412644187-c49fa049e84d?auto=format&fit=crop&w=200&q=80",
        order_id: orderDetails.razorpayOrderId,
        handler: async function (response) {
          await handlePaymentSuccess(response, bookingId, orderDetails.amount);
        },
        prefill: {
          name: userDetails.name,
          email: userDetails.email,
          contact: userDetails.contact
        },
        notes: {
          bookingId: bookingId,
          turfName: turfData.name,
          address: "Turf Nation Booking"
        },
        theme: {
          color: "#16a34a" // Green theme color
        },
        modal: {
          ondismiss: function() {
            setProcessing(false);
            setLoading(false);
            toast.info('Payment cancelled. You can retry payment from your bookings.');
          }
        }
      };

      const rzp = new window.Razorpay(options);
      
      rzp.on('payment.failed', function (response) {
        handlePaymentFailure(response);
      });

      rzp.open();

    } catch (error) {
      const errorMessage = error.response?.data?.message 
        || error.message 
        || 'Failed to process booking and payment';
      
      toast.error(`Error: ${errorMessage}`, {
        position: 'top-right',
        autoClose: 4000
      });
      
      console.error('Booking/Payment error:', error);
      setLoading(false);
      setProcessing(false);
    }
  };

  const handlePaymentSuccess = async (response, bookingId, amount) => {
    try {
      const paymentData = {
        razorpayOrderId: response.razorpay_order_id,
        razorpayPaymentId: response.razorpay_payment_id,
        signature: response.razorpay_signature,
        bookingId: bookingId
      };

      // Verify payment with backend
      await paymentService.verifyPayment(paymentData);

      toast.success('Payment successful! 🎉', {
        position: 'top-right',
        autoClose: 3000
      });

      // Navigate to success page
      setTimeout(() => {
        navigate('/payment-success', { 
          state: { 
            paymentId: response.razorpay_payment_id,
            amount: amount,
            bookingId: bookingId
          } 
        });
      }, 2000);

    } catch (error) {
      toast.error('Payment verification failed. Please contact support.');
      console.error('Payment verification error:', error);
    } finally {
      setProcessing(false);
      setLoading(false);
    }
  };

  const handlePaymentFailure = (response) => {
    setProcessing(false);
    setLoading(false);
    
    console.error('Payment failed:', response.error);
    
    toast.error(`Payment failed: ${response.error.description}`, {
      position: 'top-right',
      autoClose: 5000
    });

    // Log detailed error information
    console.error('Error details:', {
      code: response.error.code,
      description: response.error.description,
      source: response.error.source,
      step: response.error.step,
      reason: response.error.reason,
      orderId: response.error.metadata?.order_id,
      paymentId: response.error.metadata?.payment_id
    });
  };

  // Get today's date in YYYY-MM-DD format for min date
  const getTodayDate = () => {
    return new Date().toISOString().split('T')[0];
  };

  if (!turfData) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        .animate-fadeIn { animation: fadeIn 0.6s ease-out; }
        .animate-slideUp { animation: slideUp 0.8s ease-out; }
        .animate-scaleIn { animation: scaleIn 0.5s ease-out; }
        .animate-pulse-slow { animation: pulse 2s ease-in-out infinite; }
        .input-focus {
          transition: all 0.3s ease;
        }
        .input-focus:focus {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(34, 197, 94, 0.2);
        }
      `}</style>

      <ToastContainer position="top-right" autoClose={3000} />

      {/* Navbar */}
      <nav className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 shadow-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 hover:bg-white/10 px-3 py-2 rounded-lg transition-all duration-300"
              disabled={processing}
            >
              <FaArrowLeft className="w-5 h-5" />
              <span className="font-semibold">Back</span>
            </button>
            <div className="h-8 w-px bg-white/30"></div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <FaFutbol className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold">Turf Nation</span>
            </div>
          </div>
          
          <h1 className="text-2xl font-bold">Book & Pay</h1>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 gap-8">
          
          {/* Left Side - Turf Details */}
          <div className={`space-y-6 ${isLoaded ? 'animate-slideUp' : 'opacity-0'}`}>
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-green-100">
              <div className="relative h-64">
                <img
                  src={turfData.image}
                  alt={turfData.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                  {turfData.type}
                </div>
              </div>

              <div className="p-6 space-y-4">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  {turfData.name}
                </h2>

                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">📍</span>
                    <div>
                      <p className="font-semibold text-gray-700">Location</p>
                      <p className="text-gray-600">{turfData.area}</p>
                      <p className="text-gray-500 text-sm">{turfData.address}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">📝</span>
                    <div>
                      <p className="font-semibold text-gray-700">Description</p>
                      <p className="text-gray-600">{turfData.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 bg-green-50 p-4 rounded-lg border border-green-200">
                    <span className="text-2xl">💰</span>
                    <div>
                      <p className="text-gray-600 text-sm">Hourly Rate</p>
                      <p className="text-green-600 font-bold text-2xl">₹{turfData.price}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Security Badge */}
            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 flex items-start gap-3">
              <FaShieldAlt className="w-6 h-6 text-blue-600 mt-1" />
              <div>
                <p className="font-semibold text-blue-900">Secure Payment by Razorpay</p>
                <p className="text-sm text-blue-700">Your payment information is encrypted and secure</p>
              </div>
            </div>
          </div>

          {/* Right Side - Booking Form */}
          <div className={`${isLoaded ? 'animate-slideUp' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
            <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-green-100">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse-slow">
                  <FaCalendar className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">Book Your Slot</h3>
                <p className="text-gray-600 mt-2">Fill details and proceed to payment</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Booking Date */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-gray-700 font-semibold text-sm">
                    <FaCalendar className="w-4 h-4 text-green-600" />
                    Booking Date
                  </label>
                  <input
                    type="date"
                    name="bookingDate"
                    value={bookingData.bookingDate}
                    onChange={handleInputChange}
                    min={getTodayDate()}
                    disabled={loading}
                    className="w-full px-4 py-3 border-2 border-green-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300 bg-white input-focus disabled:opacity-50 disabled:cursor-not-allowed"
                    required
                  />
                </div>

                {/* Start Time */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-gray-700 font-semibold text-sm">
                    <FaClock className="w-4 h-4 text-green-600" />
                    Start Time
                  </label>
                  <input
                    type="time"
                    name="startTime"
                    value={bookingData.startTime}
                    onChange={handleInputChange}
                    disabled={loading}
                    className="w-full px-4 py-3 border-2 border-green-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300 bg-white input-focus disabled:opacity-50 disabled:cursor-not-allowed"
                    required
                  />
                </div>

                {/* End Time */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-gray-700 font-semibold text-sm">
                    <FaClock className="w-4 h-4 text-green-600" />
                    End Time
                  </label>
                  <input
                    type="time"
                    name="endTime"
                    value={bookingData.endTime}
                    onChange={handleInputChange}
                    disabled={loading}
                    className="w-full px-4 py-3 border-2 border-green-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300 bg-white input-focus disabled:opacity-50 disabled:cursor-not-allowed"
                    required
                  />
                </div>

                {/* Amount Display */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border-2 border-green-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FaMoneyBill className="w-6 h-6 text-green-600" />
                      <span className="text-gray-700 font-semibold">Total Amount</span>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-bold text-green-600">
                        ₹{bookingData.amount.toFixed(2)}
                      </p>
                      {bookingData.startTime && bookingData.endTime && (
                        <p className="text-sm text-gray-500 mt-1">
                          Duration: {((calculateAmount(bookingData.startTime, bookingData.endTime) / turfData.price)).toFixed(1)} hours
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading || processing || bookingData.amount <= 0}
                  className={`w-full py-4 rounded-xl font-bold text-white text-lg
                  transition-all duration-300 transform
                  flex items-center justify-center gap-3 group
                  ${loading || processing || bookingData.amount <= 0
                    ? "bg-green-300 cursor-not-allowed"
                    : "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 hover:scale-105 hover:shadow-xl hover:shadow-green-500/50 active:scale-95"
                  }`}
                >
                  {processing ? (
                    <>
                      <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Processing Payment...
                    </>
                  ) : loading ? (
                    <>
                      <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Creating Booking...
                    </>
                  ) : (
                    <>
                      <FaCheckCircle className="w-6 h-6" />
                      Book & Pay ₹{bookingData.amount.toFixed(2)}
                      <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                    </>
                  )}
                </button>

                {/* Info Text */}
                <p className="text-center text-gray-500 text-sm">
                  By proceeding, you agree to our booking terms and will be redirected to secure payment
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
