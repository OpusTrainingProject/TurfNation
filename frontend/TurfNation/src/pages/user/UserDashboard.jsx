import React, { useState, useEffect } from 'react';
import UserNavbar from './UserNavbar';
import { FaFutbol, FaCalendarAlt, FaClock, FaMapMarkerAlt, FaStar, FaArrowRight, FaTrophy, FaChartLine, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';


const UserDashboard = () => {
  const [userName, setUserName] = useState('Chaitanya Sonawane');
  const [greeting, setGreeting] = useState('');


  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 17) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');
  }, []);

  // Function to render star rating
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} className="w-4 h-4 text-yellow-500" />);
    }
    
    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" className="w-4 h-4 text-yellow-500" />);
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} className="w-4 h-4 text-yellow-500" />);
    }
    
    return stars;
  };

  // Sample data - Replace with actual API calls
  const upcomingBookings = [
    {
      id: 1,
      turfId: 101, // Added turfId for reviews page
      turfName: 'Green Valley Sports Arena',
      date: '2025-11-16',
      time: '6:00 PM - 7:00 PM',
      location: 'Sector 21, Mumbai',
      sport: 'Football',
      price: 1500,
      rating: 4.5,
      reviewCount: 128
    },
    {
      id: 2,
      turfId: 102, // Added turfId for reviews page
      turfName: 'Champions Cricket Ground',
      date: '2025-11-18',
      time: '9:00 AM - 10:30 AM',
      location: 'Andheri West, Mumbai',
      sport: 'Cricket',
      price: 2000,
      rating: 4.8,
      reviewCount: 95
    }
  ];


  const stats = [
    { icon: <FaCalendarAlt className="w-6 h-6" />, label: 'Total Bookings', value: '24', color: 'from-green-500 to-emerald-600' },
    { icon: <FaTrophy className="w-6 h-6" />, label: 'Games Played', value: '18', color: 'from-blue-500 to-cyan-600' },
    { icon: <FaStar className="w-6 h-6" />, label: 'Reviews Given', value: '12', color: 'from-yellow-500 to-orange-600' },
    { icon: <FaChartLine className="w-6 h-6" />, label: 'Hours Played', value: '36', color: 'from-purple-500 to-pink-600' },
  ];


  const recentActivity = [
    { id: 1, action: 'Booked', turf: 'Green Valley Sports Arena', time: '2 hours ago', icon: '⚽' },
    { id: 2, action: 'Reviewed', turf: 'Champions Cricket Ground', time: '1 day ago', icon: '⭐' },
    { id: 3, action: 'Completed', turf: 'Pro Basketball Court', time: '3 days ago', icon: '🏀' },
  ];


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-green-50 to-emerald-50">
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-fadeInUp { animation: fadeInUp 0.6s ease-out; }
        .animate-fadeIn { animation: fadeIn 0.6s ease-out; }
        .animate-scaleIn { animation: scaleIn 0.5s ease-out; }
        .animate-slideInRight { animation: slideInRight 0.6s ease-out; }
        .card-hover:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
      `}</style>


      <ToastContainer />
      <UserNavbar />


      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Welcome Section */}
        <div className="mb-8 animate-fadeInUp">
          <h1 className="text-4xl md:text-5xl font-black text-gray-800 mb-2">
            {greeting}, <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">{userName}!</span> 👋
          </h1>
          <p className="text-xl text-gray-600">Ready to book your next game?</p>
        </div>


        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`bg-white rounded-2xl p-6 border-2 border-gray-100 hover:border-green-300 transition-all duration-300 card-hover animate-scaleIn delay-${index * 100}`}
            >
              <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center text-white mb-4 shadow-lg`}>
                {stat.icon}
              </div>
              <div className="text-3xl font-black text-gray-800 mb-1">{stat.value}</div>
              <div className="text-sm font-semibold text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>


        <div className="grid lg:grid-cols-3 gap-8">
          {/* Upcoming Bookings */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-100 overflow-hidden animate-fadeIn">
              <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-4">
                <h2 className="text-2xl font-black text-white flex items-center gap-3">
                  <FaCalendarAlt className="w-6 h-6" />
                  Upcoming Bookings
                </h2>
              </div>


              <div className="p-6">
                {upcomingBookings.length > 0 ? (
                  <div className="space-y-4">
                    {upcomingBookings.map((booking) => (
                      <div
                        key={booking.id}
                        className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-5 border-2 border-green-100 hover:border-green-300 transition-all duration-300 card-hover"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="text-xl font-bold text-gray-800 mb-1">{booking.turfName}</h3>
                            <div className="flex items-center gap-2 text-gray-600 text-sm mb-2">
                              <FaMapMarkerAlt className="w-4 h-4 text-green-600" />
                              <span>{booking.location}</span>
                            </div>
                            
                            {/* Rating Section */}
                            <div className="flex items-center gap-2">
                              <div className="flex items-center gap-1">
                                {renderStars(booking.rating)}
                              </div>
                              <span className="text-sm font-bold text-gray-700">
                                {booking.rating.toFixed(1)}
                              </span>
                              <span className="text-sm text-gray-500">
                                ({booking.reviewCount} reviews)
                              </span>
                            </div>
                          </div>
                          <div className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                            {booking.sport}
                          </div>
                        </div>


                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div className="flex items-center gap-2 text-gray-700">
                            <FaCalendarAlt className="w-4 h-4 text-green-600" />
                            <span className="font-semibold text-sm">{booking.date}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-700">
                            <FaClock className="w-4 h-4 text-green-600" />
                            <span className="font-semibold text-sm">{booking.time}</span>
                          </div>
                        </div>


                        <div className="flex items-center justify-between pt-3 border-t-2 border-green-200">
                          <div className="text-2xl font-black text-green-600">₹{booking.price}</div>
                          <div className="flex gap-2">
                            {/* View Reviews Button - Updated route */}
                            <Link
                              to={`/reviews/${booking.turfId}`}
                              className="flex items-center gap-2 bg-white border-2 border-yellow-500 text-yellow-600 px-4 py-2 rounded-lg font-semibold hover:bg-yellow-50 transition-all duration-300 transform hover:scale-105 shadow-md"
                            >
                              <FaStar className="w-4 h-4" />
                              Reviews
                            </Link>
                            
                            {/* View Details Button */}
                            <Link
                              to={`/booking/${booking.id}`}
                              className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-green-600 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 shadow-md"
                            >
                              View Details
                              <FaArrowRight className="w-4 h-4" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <FaCalendarAlt className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 font-semibold text-lg mb-4">No upcoming bookings</p>
                    <Link
                      to="/turfs"
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-xl font-bold hover:from-green-600 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                      <FaFutbol className="w-5 h-5" />
                      Browse Turfs
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>


          {/* Recent Activity & Quick Actions */}
          <div className="space-y-6">
            {/* Recent Activity */}
            <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-100 overflow-hidden animate-slideInRight">
              <div className="bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-4">
                <h2 className="text-xl font-black text-white">Recent Activity</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-start gap-3 pb-4 border-b-2 border-gray-100 last:border-0 last:pb-0"
                    >
                      <div className="text-3xl">{activity.icon}</div>
                      <div className="flex-1">
                        <p className="font-bold text-gray-800 text-sm">
                          {activity.action} <span className="text-green-600">{activity.turf}</span>
                        </p>
                        <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>


            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-100 p-6 animate-slideInRight delay-100">
              <h2 className="text-xl font-black text-gray-800 mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <Link
                  to="/turfs"
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl hover:from-green-100 hover:to-emerald-100 transition-all duration-300 border-2 border-green-200 hover:border-green-400 group"
                >
                  <div className="flex items-center gap-3">
                    <FaFutbol className="w-5 h-5 text-green-600" />
                    <span className="font-bold text-gray-800">Book a Turf</span>
                  </div>
                  <FaArrowRight className="w-4 h-4 text-green-600 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>


                <Link
                  to="/my-bookings"
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl hover:from-blue-100 hover:to-cyan-100 transition-all duration-300 border-2 border-blue-200 hover:border-blue-400 group"
                >
                  <div className="flex items-center gap-3">
                    <FaCalendarAlt className="w-5 h-5 text-blue-600" />
                    <span className="font-bold text-gray-800">View Bookings</span>
                  </div>
                  <FaArrowRight className="w-4 h-4 text-blue-600 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>


                <Link
                  to="/my-reviews"
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl hover:from-yellow-100 hover:to-orange-100 transition-all duration-300 border-2 border-yellow-200 hover:border-yellow-400 group"
                >
                  <div className="flex items-center gap-3">
                    <FaStar className="w-5 h-5 text-yellow-600" />
                    <span className="font-bold text-gray-800">My Reviews</span>
                  </div>
                  <FaArrowRight className="w-4 h-4 text-yellow-600 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default UserDashboard;
