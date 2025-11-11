import { 
    LineChart, Line, BarChart, Bar,
    XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
  } from 'recharts';
  import { 
    FiTrendingUp, FiDollarSign, FiCalendar, FiMapPin, FiActivity 
  } from 'react-icons/fi';
  
  const AdminDashboard = () => {
    // Hardcoded data
    const stats = {
      totalTurfs: 12,
      activeTurfs: 8,
      totalBookings: 156,
      totalRevenue: 458900,
    };
  
    // Weekly booking growth data (last 8 weeks)
    const weeklyBookingsData = [
      { week: 'Week 1', bookings: 15 },
      { week: 'Week 2', bookings: 18 },
      { week: 'Week 3', bookings: 22 },
      { week: 'Week 4', bookings: 19 },
      { week: 'Week 5', bookings: 25 },
      { week: 'Week 6', bookings: 28 },
      { week: 'Week 7', bookings: 32 },
      { week: 'Week 8', bookings: 38 }
    ];
  
    // Weekly payment data (last 8 weeks)
    const weeklyPaymentsData = [
      { week: 'Week 1', amount: 45000 },
      { week: 'Week 2', amount: 52000 },
      { week: 'Week 3', amount: 61000 },
      { week: 'Week 4', amount: 58000 },
      { week: 'Week 5', amount: 72000 },
      { week: 'Week 6', amount: 81000 },
      { week: 'Week 7', amount: 89500 },
      { week: 'Week 8', amount: 96000 }
    ];
  
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-green-50 to-emerald-50 p-6">
        <style>{`
          @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
          @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
          @keyframes scaleIn { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
          .animate-slideUp { animation: slideUp 0.6s ease-out; }
          .animate-fadeIn { animation: fadeIn 0.8s ease-out; }
          .animate-scaleIn { animation: scaleIn 0.5s ease-out; }
          .stat-card:hover { transform: translateY(-8px); box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04); }
          .chart-card:hover { transform: scale(1.01); }
        `}</style>
  
      
        {/* Stats Grid - Only 3 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Total Turfs */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-green-500 stat-card transition-all duration-300 animate-slideUp" style={{animationDelay: '0.1s'}}>
            <div className="flex items-center justify-between mb-4">
              <div className="p-4 bg-green-100 rounded-xl">
                <FiMapPin className="w-7 h-7 text-green-600" />
              </div>
              <FiTrendingUp className="w-6 h-6 text-green-500" />
            </div>
            <h3 className="text-gray-600 text-sm font-bold uppercase tracking-wide mb-2">Total Turfs</h3>
            <p className="text-4xl font-black text-gray-900 mb-1">{stats.totalTurfs}</p>
            <div className="flex items-center mt-3">
             
            </div>
          </div>
  
          {/* Total Bookings */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-blue-500 stat-card transition-all duration-300 animate-slideUp" style={{animationDelay: '0.2s'}}>
            <div className="flex items-center justify-between mb-4">
              <div className="p-4 bg-blue-100 rounded-xl">
                <FiCalendar className="w-7 h-7 text-blue-600" />
              </div>
              <FiTrendingUp className="w-6 h-6 text-blue-500" />
            </div>
            <h3 className="text-gray-600 text-sm font-bold uppercase tracking-wide mb-2">Total Bookings</h3>
            <p className="text-4xl font-black text-gray-900 mb-1">{stats.totalBookings}</p>
            <div className="flex items-center gap-2 mt-3">
            
            </div>
          </div>
  
          {/* Total Revenue */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-purple-500 stat-card transition-all duration-300 animate-slideUp" style={{animationDelay: '0.3s'}}>
            <div className="flex items-center justify-between mb-4">
              <div className="p-4 bg-purple-100 rounded-xl">
                <FiDollarSign className="w-7 h-7 text-purple-600" />
              </div>
              <FiTrendingUp className="w-6 h-6 text-purple-500" />
            </div>
            <h3 className="text-gray-600 text-sm font-bold uppercase tracking-wide mb-2">Total Revenue</h3>
            <p className="text-4xl font-black text-gray-900 mb-1">₹{(stats.totalRevenue / 1000).toFixed(0)}K</p>
            <div className="flex items-center mt-3">
             
            </div>
          </div>
        </div>
  
        {/* Charts Section - Only 2 Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Weekly Bookings Growth - Line Chart */}
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200 chart-card transition-all duration-300 animate-fadeIn">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <FiCalendar className="w-6 h-6 mr-2 text-blue-600" />
              Weekly Booking Growth
            </h3>
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={weeklyBookingsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  dataKey="week" 
                  stroke="#6b7280" 
                  style={{ fontSize: '14px', fontWeight: 600 }} 
                />
                <YAxis 
                  stroke="#6b7280" 
                  style={{ fontSize: '14px', fontWeight: 600 }} 
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    border: '2px solid #3b82f6', 
                    borderRadius: '12px',
                    fontWeight: 600,
                    fontSize: '14px'
                  }} 
                />
                <Legend wrapperStyle={{ fontWeight: 600, fontSize: '14px' }} />
                <Line 
                  type="monotone" 
                  dataKey="bookings" 
                  stroke="#3b82f6" 
                  strokeWidth={3} 
                  dot={{ r: 5, fill: '#3b82f6' }}
                  activeDot={{ r: 7 }}
                  name="Bookings"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
  
          {/* Weekly Payments - Column/Bar Chart */}
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200 chart-card transition-all duration-300 animate-fadeIn">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <FiDollarSign className="w-6 h-6 mr-2 text-green-600" />
              Weekly Payment Revenue
            </h3>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={weeklyPaymentsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  dataKey="week" 
                  stroke="#6b7280" 
                  style={{ fontSize: '14px', fontWeight: 600 }} 
                />
                <YAxis 
                  stroke="#6b7280" 
                  style={{ fontSize: '14px', fontWeight: 600 }} 
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    border: '2px solid #10b981', 
                    borderRadius: '12px',
                    fontWeight: 600,
                    fontSize: '14px'
                  }}
                  formatter={(value) => `₹${value.toLocaleString()}`}
                />
                <Legend wrapperStyle={{ fontWeight: 600, fontSize: '14px' }} />
                <Bar 
                  dataKey="amount" 
                  fill="#10b981" 
                  radius={[8, 8, 0, 0]}
                  name="Revenue (₹)"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    );
  };
  
  export default AdminDashboard;
  