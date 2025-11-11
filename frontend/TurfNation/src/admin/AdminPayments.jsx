import { useState, useMemo } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FiSearch, FiDollarSign } from 'react-icons/fi';

const AdminPayments = () => {
  const [searchTurf, setSearchTurf] = useState('');
  const [appliedSearch, setAppliedSearch] = useState('');

  // Hardcoded payment data - updated to match backend
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
        .animate-fadeIn { animation: fadeIn 0.6s ease-out; }
        .table-row-hover:hover { background-color: rgba(16, 185, 129, 0.05); transition: all 0.2s ease; }
      `}</style>

      <ToastContainer />

      <div className="w-full max-w-full mx-auto px-6 py-6">
      

        {/* Compact Search Bar with Button */}
        <div className="mb-6 flex justify-center animate-fadeIn">
          <div className="bg-white rounded-xl shadow-lg p-4 border border-gray-200 inline-flex items-center gap-3">
            <div className="relative">
              <FiSearch className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by Turf ID"
                value={searchTurf}
                onChange={(e) => setSearchTurf(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-80 pl-12 pr-4 py-3 text-base border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all"
              />
            </div>
            <button
              onClick={handleSearch}
              className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2"
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
                className="px-4 py-3 text-gray-600 hover:text-gray-800 font-semibold hover:bg-gray-100 rounded-lg transition-colors"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Payment Table */}
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
