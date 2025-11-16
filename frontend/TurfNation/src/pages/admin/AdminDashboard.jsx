
import { useState, useEffect } from 'react';
import { 
  LineChart, Line, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { 
  getTurfStats, 
  getBookingStats, 
  getTotalRevenue,
  getWeeklyBookingStats,
  getWeeklyPaymentStats 
} from '../../services/dashboardService';

const AdminDashboard = () => {
  // State for stat cards
  const [totalTurfs, setTotalTurfs] = useState(0);
  const [totalBookings, setTotalBookings] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  
  // State for charts
  const [bookingChartData, setBookingChartData] = useState([]);
  const [paymentChartData, setPaymentChartData] = useState([]);
  
  // State for loading
  const [loading, setLoading] = useState(true);

  // Fetch all dashboard data when component mounts
  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Function to fetch all dashboard data from backend
  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      // Fetch all data in parallel using Promise.all for faster loading
      const [
        turfStatsData,
        bookingStatsData,
        revenueData,
        weeklyBookingsData,
        weeklyPaymentsData
      ] = await Promise.all([
        getTurfStats(),
        getBookingStats(),
        getTotalRevenue(),
        getWeeklyBookingStats(),
        getWeeklyPaymentStats()
      ]);

      // Update stat card values
      setTotalTurfs(turfStatsData.totalTurfs);
      setTotalBookings(bookingStatsData.totalBookings);
      setTotalRevenue(revenueData.totalRevenue);

      // Update chart data
      setBookingChartData(weeklyBookingsData);
      
      // Convert payment amounts to thousands for better chart readability
      const formattedPaymentData = weeklyPaymentsData.map(item => ({
        week: item.week,
        amount: Number(item.amount) / 1000 // Convert to thousands (K)
      }));
      setPaymentChartData(formattedPaymentData);

      console.log('Dashboard data loaded successfully');
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast.error('❌ Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  // Custom tooltip for payment chart to show full amount with ₹ symbol
  const CustomPaymentTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border-2 border-green-500 rounded-lg shadow-lg">
          <p className="text-sm font-semibold text-gray-700">{payload[0].payload.week}</p>
          <p className="text-base font-bold text-green-600">
            ₹{(payload[0].value * 1000).toLocaleString('en-IN')}
          </p>
        </div>
      );
    }
    return null;
  };

  // Custom tooltip for booking chart
  const CustomBookingTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border-2 border-green-500 rounded-lg shadow-lg">
          <p className="text-sm font-semibold text-gray-700">{payload[0].payload.week}</p>
          <p className="text-base font-bold text-green-600">
            {payload[0].value} Bookings
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 p-8">
      <ToastContainer />

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Overview of your turf booking system</p>
      </div>

      {loading ? (
        // Loading State
        <div className="flex flex-col items-center justify-center py-20">
          <svg className="animate-spin h-16 w-16 text-green-500 mb-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-gray-600 font-semibold text-lg">Loading dashboard...</p>
        </div>
      ) : (
        <>
          {/* Stat Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Total Turfs Card */}
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-xl p-6 text-white transform hover:scale-105 transition-transform duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm font-semibold uppercase tracking-wide">Total Turfs</p>
                  <p className="text-5xl font-extrabold mt-2">{totalTurfs}</p>
                </div>
                <div className="bg-white/20 p-4 rounded-full">
                  <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Total Bookings Card */}
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-xl p-6 text-white transform hover:scale-105 transition-transform duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-semibold uppercase tracking-wide">Total Bookings</p>
                  <p className="text-5xl font-extrabold mt-2">{totalBookings}</p>
                </div>
                <div className="bg-white/20 p-4 rounded-full">
                  <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                    <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Total Revenue Card */}
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl shadow-xl p-6 text-white transform hover:scale-105 transition-transform duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm font-semibold uppercase tracking-wide">Total Revenue</p>
                  <p className="text-4xl font-extrabold mt-2">
                    ₹{(Number(totalRevenue) / 1000).toFixed(1)}K
                  </p>
                </div>
                <div className="bg-white/20 p-4 rounded-full">
                  <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Booking Growth Chart */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <svg className="w-6 h-6 mr-2 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                </svg>
                Last 8 Weeks Booking Growth
              </h3>
              
              {bookingChartData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={bookingChartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis 
                      dataKey="week" 
                      stroke="#6b7280"
                      style={{ fontSize: '12px', fontWeight: 'bold' }}
                    />
                    <YAxis 
                      stroke="#6b7280"
                      style={{ fontSize: '12px', fontWeight: 'bold' }}
                    />
                    <Tooltip content={<CustomBookingTooltip />} />
                    <Legend 
                      wrapperStyle={{ paddingTop: '20px', fontSize: '14px', fontWeight: 'bold' }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="bookings" 
                      stroke="#10b981" 
                      strokeWidth={3}
                      dot={{ fill: '#10b981', r: 5 }}
                      activeDot={{ r: 7 }}
                      name="Bookings"
                    />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-[300px] flex items-center justify-center text-gray-400">
                  <p>No booking data available</p>
                </div>
              )}
            </div>

            {/* Payment Revenue Chart */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <svg className="w-6 h-6 mr-2 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                </svg>
                Last 8 Weeks Payment Revenue
              </h3>
              
              {paymentChartData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={paymentChartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis 
                      dataKey="week" 
                      stroke="#6b7280"
                      style={{ fontSize: '12px', fontWeight: 'bold' }}
                    />
                    <YAxis 
                      stroke="#6b7280"
                      style={{ fontSize: '12px', fontWeight: 'bold' }}
                      tickFormatter={(value) => `₹${value}K`}
                    />
                    <Tooltip content={<CustomPaymentTooltip />} />
                    <Legend 
                      wrapperStyle={{ paddingTop: '20px', fontSize: '14px', fontWeight: 'bold' }}
                      formatter={() => 'Revenue (₹)'}
                    />
                    <Bar 
                      dataKey="amount" 
                      fill="#10b981" 
                      radius={[8, 8, 0, 0]}
                      name="Revenue"
                    />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-[300px] flex items-center justify-center text-gray-400">
                  <p>No payment data available</p>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminDashboard;







// import { 
//   LineChart, Line, BarChart, Bar,
//   XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
// } from 'recharts';
// import { 
//   FiTrendingUp, FiDollarSign, FiCalendar, FiMapPin, FiActivity 
// } from 'react-icons/fi';

// const AdminDashboard = () => {
//   // Function to get last 8 weeks dates
//   const getLast8WeeksDates = () => {
//     const weeks = [];
//     const today = new Date();
    
//     for (let i = 7; i >= 0; i--) {
//       const weekDate = new Date(today);
//       weekDate.setDate(today.getDate() - (i * 7));
      
//       const formattedDate = `${weekDate.getDate().toString().padStart(2, '0')}/${(weekDate.getMonth() + 1).toString().padStart(2, '0')}`;
//       weeks.push(formattedDate);
//     }
    
//     return weeks;
//   };

//   const weekDates = getLast8WeeksDates();

//   // Hardcoded data
//   const stats = {
//     totalTurfs: 12,
//     activeTurfs: 8,
//     totalBookings: 156,
//     totalRevenue: 458900,
//   };

//   // Weekly booking growth data (last 8 weeks with actual dates)
//   const weeklyBookingsData = [
//     { week: weekDates[0], bookings: 15 },
//     { week: weekDates[1], bookings: 18 },
//     { week: weekDates[2], bookings: 22 },
//     { week: weekDates[3], bookings: 19 },
//     { week: weekDates[4], bookings: 25 },
//     { week: weekDates[5], bookings: 28 },
//     { week: weekDates[6], bookings: 32 },
//     { week: weekDates[7], bookings: 38 }
//   ];

//   // Weekly payment data (last 8 weeks with actual dates)
//   const weeklyPaymentsData = [
//     { week: weekDates[0], amount: 45000 },
//     { week: weekDates[1], amount: 52000 },
//     { week: weekDates[2], amount: 61000 },
//     { week: weekDates[3], amount: 58000 },
//     { week: weekDates[4], amount: 72000 },
//     { week: weekDates[5], amount: 81000 },
//     { week: weekDates[6], amount: 89500 },
//     { week: weekDates[7], amount: 96000 }
//   ];

//   // Format currency with rupee symbol
//   const formatRupee = (value) => {
//     return `₹${(value / 1000).toFixed(0)}K`;
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 via-green-50 to-emerald-50 p-6">
//       <style>{`
//         @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
//         @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
//         @keyframes scaleIn { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
//         .animate-slideUp { animation: slideUp 0.6s ease-out; }
//         .animate-fadeIn { animation: fadeIn 0.8s ease-out; }
//         .animate-scaleIn { animation: scaleIn 0.5s ease-out; }
//         .stat-card:hover { transform: translateY(-8px); box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04); }
//         .chart-card:hover { transform: scale(1.01); }
//       `}</style>

    
//       {/* Stats Grid - Only 3 Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//         {/* Total Turfs */}
//         <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-green-500 stat-card transition-all duration-300 animate-slideUp" style={{animationDelay: '0.1s'}}>
//           <div className="flex items-center justify-between mb-4">
//             <div className="p-4 bg-green-100 rounded-xl">
//               <FiMapPin className="w-7 h-7 text-green-600" />
//             </div>
//             <FiTrendingUp className="w-6 h-6 text-green-500" />
//           </div>
//           <h3 className="text-gray-600 text-sm font-bold uppercase tracking-wide mb-2">Total Turfs</h3>
//           <p className="text-4xl font-black text-gray-900 mb-1">{stats.totalTurfs}</p>
//           <div className="flex items-center mt-3">
           
//           </div>
//         </div>

//         {/* Total Bookings */}
//         <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-blue-500 stat-card transition-all duration-300 animate-slideUp" style={{animationDelay: '0.2s'}}>
//           <div className="flex items-center justify-between mb-4">
//             <div className="p-4 bg-blue-100 rounded-xl">
//               <FiCalendar className="w-7 h-7 text-blue-600" />
//             </div>
//             <FiTrendingUp className="w-6 h-6 text-blue-500" />
//           </div>
//           <h3 className="text-gray-600 text-sm font-bold uppercase tracking-wide mb-2">Total Bookings</h3>
//           <p className="text-4xl font-black text-gray-900 mb-1">{stats.totalBookings}</p>
//           <div className="flex items-center gap-2 mt-3">
          
//           </div>
//         </div>

//         {/* Total Revenue */}
//         <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-purple-500 stat-card transition-all duration-300 animate-slideUp" style={{animationDelay: '0.3s'}}>
//           <div className="flex items-center justify-between mb-4">
//             <div className="p-4 bg-purple-100 rounded-xl">
//               <FiDollarSign className="w-7 h-7 text-purple-600" />
//             </div>
//             <FiTrendingUp className="w-6 h-6 text-purple-500" />
//           </div>
//           <h3 className="text-gray-600 text-sm font-bold uppercase tracking-wide mb-2">Total Revenue</h3>
//           <p className="text-4xl font-black text-gray-900 mb-1">₹{(stats.totalRevenue / 1000).toFixed(0)}K</p>
//           <div className="flex items-center mt-3">
           
//           </div>
//         </div>
//       </div>

//       {/* Charts Section - Only 2 Charts */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {/* Weekly Bookings Growth - Line Chart */}
//         <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200 chart-card transition-all duration-300 animate-fadeIn">
//           <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
//             <FiCalendar className="w-6 h-6 mr-2 text-blue-600" />
//             Last 8 Weeks Booking Growth
//           </h3>
//           <ResponsiveContainer width="100%" height={350}>
//             <LineChart data={weeklyBookingsData}>
//               <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
//               <XAxis 
//                 dataKey="week" 
//                 stroke="#6b7280" 
//                 style={{ fontSize: '12px', fontWeight: 600 }} 
//                 label={{ value: 'Date (DD/MM)', position: 'insideBottom', offset: -5, style: { fontSize: '12px', fontWeight: 600 } }}
//               />
//               <YAxis 
//                 stroke="#6b7280" 
//                 style={{ fontSize: '14px', fontWeight: 600 }} 
//               />
//               <Tooltip 
//                 contentStyle={{ 
//                   backgroundColor: '#fff', 
//                   border: '2px solid #3b82f6', 
//                   borderRadius: '12px',
//                   fontWeight: 600,
//                   fontSize: '14px'
//                 }} 
//               />
//               <Legend wrapperStyle={{ fontWeight: 600, fontSize: '14px' }} />
//               <Line 
//                 type="monotone" 
//                 dataKey="bookings" 
//                 stroke="#3b82f6" 
//                 strokeWidth={3} 
//                 dot={{ r: 5, fill: '#3b82f6' }}
//                 activeDot={{ r: 7 }}
//                 name="Bookings"
//               />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>

//         {/* Weekly Payments - Column/Bar Chart */}
//         <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200 chart-card transition-all duration-300 animate-fadeIn">
//           <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
//             <FiDollarSign className="w-6 h-6 mr-2 text-green-600" />
//             Last 8 Weeks Payment Revenue
//           </h3>
//           <ResponsiveContainer width="100%" height={350}>
//             <BarChart data={weeklyPaymentsData}>
//               <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
//               <XAxis 
//                 dataKey="week" 
//                 stroke="#6b7280" 
//                 style={{ fontSize: '12px', fontWeight: 600 }} 
//                 label={{ value: 'Date (DD/MM)', position: 'insideBottom', offset: -5, style: { fontSize: '12px', fontWeight: 600 } }}
//               />
//               <YAxis 
//                 stroke="#6b7280" 
//                 style={{ fontSize: '14px', fontWeight: 600 }}
//                 tickFormatter={formatRupee}
//               />
//               <Tooltip 
//                 contentStyle={{ 
//                   backgroundColor: '#fff', 
//                   border: '2px solid #10b981', 
//                   borderRadius: '12px',
//                   fontWeight: 600,
//                   fontSize: '14px'
//                 }}
//                 formatter={(value) => `₹${value.toLocaleString()}`}
//               />
//               <Legend wrapperStyle={{ fontWeight: 600, fontSize: '14px' }} />
//               <Bar 
//                 dataKey="amount" 
//                 fill="#10b981" 
//                 radius={[8, 8, 0, 0]}
//                 name="Revenue (₹)"
//               />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;
