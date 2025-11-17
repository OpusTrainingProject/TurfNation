// import { useState, useEffect } from 'react';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { FiSearch, FiTrendingUp } from 'react-icons/fi';
// import { 
//   getAllPayments, 
//   getPaymentsByTurfId, 
//   getTotalRevenue, 
//   getRevenueByTurfId 
// } from '../../services/paymentService';

// const AdminPayments = () => {
//   // State for search functionality
//   const [searchTurf, setSearchTurf] = useState('');
//   const [appliedSearch, setAppliedSearch] = useState('');
  
//   // State for data from backend
//   const [payments, setPayments] = useState([]);
//   const [totalRevenue, setTotalRevenue] = useState(0);
//   const [totalPayments, setTotalPayments] = useState(0);
  
//   // State for loading
//   const [loading, setLoading] = useState(true);
//   const [searching, setSearching] = useState(false);

//   // Fetch all payments and revenue when component mounts
//   useEffect(() => {
//     fetchAllData();
//   }, []);

//   // Function to fetch all payments and total revenue
//   const fetchAllData = async () => {
//     try {
//       setLoading(true);
      
//       // Fetch all payments from backend
//       const paymentsData = await getAllPayments();
//       setPayments(paymentsData);
      
//       // Fetch total revenue from backend
//       const revenueData = await getTotalRevenue();
//       setTotalRevenue(revenueData.totalRevenue);
//       setTotalPayments(revenueData.totalPayments);
      
//       console.log('Payments loaded:', paymentsData);
//       console.log('Revenue data:', revenueData);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//       toast.error('❌ Failed to load payment data');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Function to handle search by turf ID
//   const handleSearch = async () => {
//     if (!searchTurf || searchTurf.trim() === '') {
//       toast.warning('⚠️ Please enter a Turf ID');
//       return;
//     }

//     try {
//       setSearching(true);
//       setAppliedSearch(searchTurf);
      
//       // Fetch payments for specific turf
//       const filteredPayments = await getPaymentsByTurfId(searchTurf);
//       setPayments(filteredPayments);
      
//       // Fetch revenue for specific turf
//       const revenueData = await getRevenueByTurfId(searchTurf);
//       setTotalRevenue(revenueData.totalRevenue);
//       setTotalPayments(revenueData.totalPayments);
      
//       toast.info(`🔍 Showing results for Turf ID: ${searchTurf}`);
//       console.log('Filtered payments:', filteredPayments);
//       console.log('Turf revenue:', revenueData);
//     } catch (error) {
//       console.error('Error searching payments:', error);
//       toast.error('❌ Failed to search payments');
//     } finally {
//       setSearching(false);
//     }
//   };

//   // Function to clear search and reload all data
//   const handleClear = async () => {
//     setSearchTurf('');
//     setAppliedSearch('');
//     await fetchAllData();
//     toast.info('🔄 Search cleared');
//   };

//   // Handle Enter key press in search input
//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter') {
//       handleSearch();
//     }
//   };

//   // Helper function to get badge color for payment method
//   const getPaymentMethodBadge = (method) => {
//     const badges = {
//       'UPI': 'bg-purple-100 text-purple-700 border-purple-300',
//       'CARD': 'bg-blue-100 text-blue-700 border-blue-300',
//       'NET_BANKING': 'bg-green-100 text-green-700 border-green-300',
//       'WALLET': 'bg-orange-100 text-orange-700 border-orange-300'
//     };
//     return badges[method] || 'bg-gray-100 text-gray-700 border-gray-300';
//   };

//   // Helper function to get label for payment method
//   const getPaymentMethodLabel = (method) => {
//     const labels = {
//       'UPI': 'UPI',
//       'CARD': 'Card',
//       'NET_BANKING': 'Net Banking',
//       'WALLET': 'Wallet'
//     };
//     return labels[method] || method;
//   };

//   // Helper function to get badge color for payment status
//   const getPaymentStatusBadge = (status) => {
//     const badges = {
//       'SUCCESS': 'bg-green-100 text-green-800 border-green-300',
//       'PENDING': 'bg-yellow-100 text-yellow-800 border-yellow-300',
//       'FAILED': 'bg-red-100 text-red-800 border-red-300'
//     };
//     return badges[status] || 'bg-gray-100 text-gray-700 border-gray-300';
//   };

//   // Helper function to get label for payment status
//   const getPaymentStatusLabel = (status) => {
//     const labels = {
//       'SUCCESS': 'Completed',
//       'PENDING': 'Pending',
//       'FAILED': 'Failed'
//     };
//     return labels[status] || status;
//   };

//   // Helper function to format date
//   const formatDate = (dateString) => {
//     if (!dateString) return 'N/A';
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-IN', { 
//       year: 'numeric', 
//       month: 'short', 
//       day: '2-digit' 
//     });
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 via-green-50 to-emerald-50 py-0 px-0">
//       <style>{`
//         @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
//         @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
//         .animate-fadeIn { animation: fadeIn 0.6s ease-out; }
//         .animate-slideUp { animation: slideUp 0.5s ease-out; }
//         .table-row-hover:hover { background-color: rgba(16, 185, 129, 0.05); transition: all 0.2s ease; }
//       `}</style>

//       <ToastContainer />

//       <div className="w-full max-w-full mx-auto px-6 py-6">
//         {/* Top section: Revenue Box and Search Bar side by side */}
//         <div className="mb-6 flex flex-col lg:flex-row gap-4 items-stretch animate-fadeIn">
//           {/* Revenue Box - Rectangle */}
//           <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-xl p-6 flex items-center gap-4 lg:w-[480px] animate-slideUp">
//             <div className="bg-white/20 p-4 rounded-lg">
//               <FiTrendingUp className="text-white w-10 h-10" />
//             </div>
//             <div className="flex-1">
//               <div className="text-white/90 text-sm font-semibold uppercase tracking-wide">Last Month Revenue</div>
//               <div className="text-white text-4xl font-extrabold mt-1 flex items-center gap-1">
//                 {loading ? (
//                   <span className="text-2xl">Loading...</span>
//                 ) : (
//                   <>₹{Number(totalRevenue).toLocaleString('en-IN')}</>
//                 )}
//               </div>
//               <div className="text-white/80 text-sm mt-1.5">
//                 {appliedSearch ? `Turf ID: ${appliedSearch}` : 'All Turfs'} • {totalPayments} payments
//               </div>
//             </div>
//           </div>

//           {/* Search Bar */}
//           <div className="flex-1 bg-white rounded-xl shadow-lg p-4 border border-gray-200 flex items-center gap-3 animate-slideUp max-w-2xl">
//             <div className="relative flex-1">
//               <FiSearch className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="Search by Turf ID"
//                 value={searchTurf}
//                 onChange={(e) => setSearchTurf(e.target.value)}
//                 onKeyPress={handleKeyPress}
//                 disabled={searching}
//                 className="w-full pl-12 pr-4 py-3 text-base border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all disabled:opacity-50"
//               />
//             </div>
//             <button
//               onClick={handleSearch}
//               disabled={searching}
//               className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               {searching ? (
//                 <>
//                   <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                   </svg>
//                   Searching...
//                 </>
//               ) : (
//                 <>
//                   <FiSearch className="w-5 h-5" />
//                   Search
//                 </>
//               )}
//             </button>
//             {appliedSearch && (
//               <button
//                 onClick={handleClear}
//                 disabled={loading}
//                 className="px-4 py-3 text-gray-600 hover:text-gray-800 font-semibold hover:bg-gray-100 rounded-lg transition-colors whitespace-nowrap disabled:opacity-50"
//               >
//                 Clear
//               </button>
//             )}
//           </div>
//         </div>

//         {/* Payment Table - Full width below */}
//         <div className="bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden animate-fadeIn">
//           {loading ? (
//             // Loading State
//             <div className="p-16 text-center">
//               <svg className="animate-spin h-12 w-12 mx-auto text-green-500 mb-4" fill="none" viewBox="0 0 24 24">
//                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//               </svg>
//               <p className="text-gray-600 font-semibold text-lg">Loading payments...</p>
//             </div>
//           ) : (
//             // Table
//             <div className="overflow-x-auto">
//               <table className="w-full">
//                 <thead>
//                   <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200">
//                     <th className="px-5 py-4 text-left text-sm font-black text-gray-700 uppercase tracking-wider">Sr. No</th>
//                     <th className="px-5 py-4 text-left text-sm font-black text-gray-700 uppercase tracking-wider">Turf ID</th>
//                     <th className="px-5 py-4 text-left text-sm font-black text-gray-700 uppercase tracking-wider">Transaction ID</th>
//                     <th className="px-5 py-4 text-left text-sm font-black text-gray-700 uppercase tracking-wider">Amount</th>
//                     <th className="px-5 py-4 text-left text-sm font-black text-gray-700 uppercase tracking-wider">Payment Method</th>
//                     <th className="px-5 py-4 text-center text-sm font-black text-gray-700 uppercase tracking-wider">Payment Status</th>
//                     <th className="px-5 py-4 text-left text-sm font-black text-gray-700 uppercase tracking-wider">Booking ID</th>
//                     <th className="px-5 py-4 text-left text-sm font-black text-gray-700 uppercase tracking-wider">User ID</th>
//                     <th className="px-5 py-4 text-left text-sm font-black text-gray-700 uppercase tracking-wider">Date</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-gray-200">
//                   {payments.length > 0 ? (
//                     payments.map((payment, index) => (
//                       <tr key={payment.paymentId} className="table-row-hover">
//                         <td className="px-5 py-5">
//                           <span className="text-base font-bold text-gray-900">{index + 1}</span>
//                         </td>
//                         <td className="px-5 py-5">
//                           <span className="inline-flex items-center px-3 py-1.5 rounded-lg bg-green-50 text-green-700 font-bold text-sm border border-green-200">
//                             {payment.turfId}
//                           </span>
//                         </td>
//                         <td className="px-5 py-5">
//                           <span className="text-sm font-mono text-gray-600">
//                             {payment.razorpayPaymentId || 'N/A'}
//                           </span>
//                         </td>
//                         <td className="px-5 py-5">
//                           <span className="text-base font-black text-green-600">
//                             ₹{Number(payment.amount).toLocaleString('en-IN')}
//                           </span>
//                         </td>
//                         <td className="px-5 py-5">
//                           <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-bold border ${getPaymentMethodBadge(payment.paymentMethod)}`}>
//                             {getPaymentMethodLabel(payment.paymentMethod)}
//                           </span>
//                         </td>
//                         <td className="px-5 py-5 text-center">
//                           <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-bold border ${getPaymentStatusBadge(payment.paymentStatus)}`}>
//                             {payment.paymentStatus === 'SUCCESS' && <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>}
//                             {payment.paymentStatus === 'PENDING' && <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2 animate-pulse"></span>}
//                             {payment.paymentStatus === 'FAILED' && <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>}
//                             {getPaymentStatusLabel(payment.paymentStatus)}
//                           </span>
//                         </td>
//                         <td className="px-5 py-5">
//                           <span className="text-base font-semibold text-gray-900">{payment.bookingId}</span>
//                         </td>
//                         <td className="px-5 py-5">
//                           <span className="inline-flex items-center px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 font-bold text-sm border border-blue-200">
//                             {payment.userId}
//                           </span>
//                         </td>
//                         <td className="px-5 py-5">
//                           <span className="text-sm text-gray-600 font-medium">
//                             {formatDate(payment.createdOn)}
//                           </span>
//                         </td>
//                       </tr>
//                     ))
//                   ) : (
//                     <tr>
//                       <td colSpan="9" className="px-6 py-16 text-center">
//                         <div className="flex flex-col items-center">
//                           <FiSearch className="w-16 h-16 text-gray-300 mb-4" />
//                           <p className="text-gray-500 font-semibold text-lg">No payments found</p>
//                           <p className="text-gray-400 text-sm mt-1">
//                             {appliedSearch 
//                               ? 'Try searching with a different Turf ID' 
//                               : 'No payment records available'}
//                           </p>
//                         </div>
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminPayments;





import { useState, useMemo } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FiSearch, FiDollarSign, FiTrendingUp } from 'react-icons/fi';

const AdminPayments = () => {
  const [searchTurf, setSearchTurf] = useState('');
  const [appliedSearch, setAppliedSearch] = useState('');

  // Payment data (same as before)
  const payments = [
    { paymentId: 1, turfId: 1, bookingId: 101, userId: 201, amount: 2500, razorpayPaymentId: 'pay_NXK123ABC789', paymentMethod: 'UPI', paymentStatus: 'SUCCESS' },
    { paymentId: 2, turfId: 1, bookingId: 102, userId: 202, amount: 3200, razorpayPaymentId: 'pay_MNO456DEF012', paymentMethod: 'CARD', paymentStatus: 'SUCCESS' },
    { paymentId: 3, turfId: 2, bookingId: 103, userId: 203, amount: 1800, razorpayPaymentId: 'pay_PQR789GHI345', paymentMethod: 'UPI', paymentStatus: 'SUCCESS' },
    { paymentId: 4, turfId: 3, bookingId: 104, userId: 204, amount: 4500, razorpayPaymentId: 'pay_STU012JKL678', paymentMethod: 'NET_BANKING', paymentStatus: 'SUCCESS' },
    { paymentId: 5, turfId: 1, bookingId: 105, userId: 205, amount: 2800, razorpayPaymentId: 'pay_VWX345MNO901', paymentMethod: 'UPI', paymentStatus: 'SUCCESS' },
    { paymentId: 6, turfId: 2, bookingId: 106, userId: 206, amount: 2100, razorpayPaymentId: 'pay_YZA678PQR234', paymentMethod: 'CARD', paymentStatus: 'SUCCESS' },
    { paymentId: 7, turfId: 4, bookingId: 107, userId: 207, amount: 5200, razorpayPaymentId: 'pay_BCD901STU567', paymentMethod: 'UPI', paymentStatus: 'SUCCESS' },
    { paymentId: 8, turfId: 3, bookingId: 108, userId: 208, amount: 3900, razorpayPaymentId: 'pay_EFG234VWX890', paymentMethod: 'CARD', paymentStatus: 'SUCCESS' },
    { paymentId: 9, turfId: 2, bookingId: 109, userId: 209, amount: 2700, razorpayPaymentId: 'pay_HIJ567YZA123', paymentMethod: 'WALLET', paymentStatus: 'PENDING' },
    { paymentId: 10, turfId: 4, bookingId: 110, userId: 210, amount: 4100, razorpayPaymentId: 'pay_KLM890BCD456', paymentMethod: 'NET_BANKING', paymentStatus: 'FAILED' },
  ];

  // Filter payments based on applied search
  const filteredPayments = useMemo(() => {
    if (!appliedSearch) return payments;
    return payments.filter(payment =>
      payment.turfId.toString().includes(appliedSearch)
    );
  }, [appliedSearch, payments]);

  // Calculate total revenue of filtered payments
  const totalRevenue = useMemo(() => {
    return filteredPayments.reduce((sum, payment) => sum + payment.amount, 0);
  }, [filteredPayments]);

  const handleSearch = () => {
    setAppliedSearch(searchTurf);
    if (searchTurf) {
      toast.info(`🔍 Searching for Turf ID: ${searchTurf}`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const getPaymentMethodBadge = (method) => {
    const badges = {
      'UPI': 'bg-purple-100 text-purple-700 border-purple-300',
      'CARD': 'bg-blue-100 text-blue-700 border-blue-300',
      'NET_BANKING': 'bg-green-100 text-green-700 border-green-300',
      'WALLET': 'bg-orange-100 text-orange-700 border-orange-300'
    };
    return badges[method] || 'bg-gray-100 text-gray-700 border-gray-300';
  };

  const getPaymentMethodLabel = (method) => {
    const labels = {
      'UPI': 'UPI',
      'CARD': 'Card',
      'NET_BANKING': 'Net Banking',
      'WALLET': 'Wallet'
    };
    return labels[method] || method;
  };

  const getPaymentStatusBadge = (status) => {
    const badges = {
      'SUCCESS': 'bg-green-100 text-green-800 border-green-300',
      'PENDING': 'bg-yellow-100 text-yellow-800 border-yellow-300',
      'FAILED': 'bg-red-100 text-red-800 border-red-300'
    };
    return badges[status] || 'bg-gray-100 text-gray-700 border-gray-300';
  };

  const getPaymentStatusLabel = (status) => {
    const labels = {
      'SUCCESS': 'Completed',
      'PENDING': 'Pending',
      'FAILED': 'Failed'
    };
    return labels[status] || status;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-green-50 to-emerald-50 py-0 px-0">
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        .animate-fadeIn { animation: fadeIn 0.6s ease-out; }
        .animate-slideUp { animation: slideUp 0.5s ease-out; }
        .table-row-hover:hover { background-color: rgba(16, 185, 129, 0.05); transition: all 0.2s ease; }
      `}</style>

      <ToastContainer />

      <div className="w-full max-w-full mx-auto px-6 py-6">
        {/* Top section: Revenue Box and Search Bar side by side */}
        <div className="mb-6 flex flex-col lg:flex-row gap-4 items-stretch animate-fadeIn">
          {/* Revenue Box - Rectangle */}
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-xl p-6 flex items-center gap-4 lg:w-80 animate-slideUp">
            <div className="bg-white/20 p-4 rounded-lg">
              <FiTrendingUp className="text-white w-8 h-8" />
            </div>
            <div className="flex-1">
              <div className="text-white/90 text-sm font-semibold uppercase tracking-wide">Last Month Revenue</div>
              <div className="text-white text-3xl font-extrabold mt-1 flex items-center gap-1">
                ₹{totalRevenue.toLocaleString()}
              </div>
              <div className="text-white/80 text-xs mt-1">
                {appliedSearch ? `Turf ID: ${appliedSearch}` : 'All Turfs'}
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 bg-white rounded-xl shadow-lg p-4 border border-gray-200 flex items-center gap-3 animate-slideUp">
            <div className="relative flex-1">
              <FiSearch className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by Turf ID"
                value={searchTurf}
                onChange={(e) => setSearchTurf(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full pl-12 pr-4 py-3 text-base border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all"
              />
            </div>
            <button
              onClick={handleSearch}
              className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2 whitespace-nowrap"
            >
              <FiSearch className="w-5 h-5" />
              Search
            </button>
            {appliedSearch && (
              <button
                onClick={() => {
                  setSearchTurf('');
                  setAppliedSearch('');
                  toast.info('Search cleared');
                }}
                className="px-4 py-3 text-gray-600 hover:text-gray-800 font-semibold hover:bg-gray-100 rounded-lg transition-colors whitespace-nowrap"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Payment Table - Full width below */}
        <div className="bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden animate-fadeIn">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200">
                  <th className="px-5 py-4 text-left text-sm font-black text-gray-700 uppercase tracking-wider">Sr. No</th>
                  <th className="px-5 py-4 text-left text-sm font-black text-gray-700 uppercase tracking-wider">Turf ID</th>
                  <th className="px-5 py-4 text-left text-sm font-black text-gray-700 uppercase tracking-wider">Transaction ID</th>
                  <th className="px-5 py-4 text-left text-sm font-black text-gray-700 uppercase tracking-wider">Amount</th>
                  <th className="px-5 py-4 text-left text-sm font-black text-gray-700 uppercase tracking-wider">Payment Method</th>
                  <th className="px-5 py-4 text-center text-sm font-black text-gray-700 uppercase tracking-wider">Payment Status</th>
                  <th className="px-5 py-4 text-left text-sm font-black text-gray-700 uppercase tracking-wider">Booking ID</th>
                  <th className="px-5 py-4 text-left text-sm font-black text-gray-700 uppercase tracking-wider">User ID</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredPayments.length > 0 ? (
                  filteredPayments.map((payment, index) => (
                    <tr key={payment.paymentId} className="table-row-hover">
                      <td className="px-5 py-5">
                        <span className="text-base font-bold text-gray-900">{index + 1}</span>
                      </td>
                      <td className="px-5 py-5">
                        <span className="inline-flex items-center px-3 py-1.5 rounded-lg bg-green-50 text-green-700 font-bold text-sm border border-green-200">
                          {payment.turfId}
                        </span>
                      </td>
                      <td className="px-5 py-5">
                        <span className="text-sm font-mono text-gray-600">{payment.razorpayPaymentId}</span>
                      </td>
                      <td className="px-5 py-5">
                        <span className="text-base font-black text-green-600">₹{payment.amount.toLocaleString()}</span>
                      </td>
                      <td className="px-5 py-5">
                        <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-bold border ${getPaymentMethodBadge(payment.paymentMethod)}`}>
                          {getPaymentMethodLabel(payment.paymentMethod)}
                        </span>
                      </td>
                      <td className="px-5 py-5 text-center">
                        <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-bold border ${getPaymentStatusBadge(payment.paymentStatus)}`}>
                          {payment.paymentStatus === 'SUCCESS' && <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>}
                          {payment.paymentStatus === 'PENDING' && <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2 animate-pulse"></span>}
                          {payment.paymentStatus === 'FAILED' && <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>}
                          {getPaymentStatusLabel(payment.paymentStatus)}
                        </span>
                      </td>
                      <td className="px-5 py-5">
                        <span className="text-base font-semibold text-gray-900">{payment.bookingId}</span>
                      </td>
                      <td className="px-5 py-5">
                        <span className="inline-flex items-center px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 font-bold text-sm border border-blue-200">
                          {payment.userId}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="px-6 py-16 text-center">
                      <div className="flex flex-col items-center">
                        <FiSearch className="w-16 h-16 text-gray-300 mb-4" />
                        <p className="text-gray-500 font-semibold text-lg">No payments found</p>
                        <p className="text-gray-400 text-sm mt-1">Try searching with a different Turf ID</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPayments;
