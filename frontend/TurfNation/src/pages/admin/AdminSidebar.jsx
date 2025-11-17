import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {Outlet} from 'react-router-dom';
import { 
  FiGrid, 
  FiPlus, 
  FiSettings, 
  FiMessageSquare, 
  FiDollarSign, 
  FiCalendar, 
  FiLogOut,
  FiMenu,
  FiX
} from 'react-icons/fi';
import { toast } from 'react-toastify';


const AdminSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState('dashboard');
  const navigate = useNavigate();


  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: FiGrid, path: '/admin/dashboard' },
    { id: 'add-turf', label: 'Add New Turf', icon: FiPlus, path: '/admin/add-turf' },
    { id: 'manage-turfs', label: 'Manage Turfs', icon: FiSettings, path: '/admin/manage-turfs' },
    { id: 'bookings', label: 'All Bookings', icon: FiCalendar, path: '/admin/bookings' },
    { id: 'payments', label: 'Payment History', icon: FiDollarSign, path: '/admin/payments' },
    { id: 'support', label: 'Support Queries', icon: FiMessageSquare, path: '/admin/support' },
  ];


  const handleLogout = () => {
    // Remove JWT token from sessionStorage
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userRole');
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('userEmail');
    
    // Clear any other user-related data if stored
    sessionStorage.clear();
    
    toast.success('👋 Logged out successfully!');
    setTimeout(() => navigate('/'), 1500); // Redirect to homepage
  };


  const handleNavigation = (item) => {
    setActiveItem(item.id);
    navigate(item.path);
  };


  return (
    <div
      className={`fixed top-0 left-0 h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white transition-all duration-300 ease-in-out shadow-2xl z-50 ${
        isCollapsed ? 'w-20' : 'w-80'
      }`}
    >
      <style>{`
        .sidebar-hover:hover { background: linear-gradient(90deg, rgba(16, 185, 129, 0.15) 0%, rgba(5, 150, 105, 0.1) 100%); }
        .active-item { 
          background: linear-gradient(90deg, rgba(16, 185, 129, 0.2) 0%, rgba(5, 150, 105, 0.15) 100%); 
          border-left: 4px solid #10b981;
        }
      `}</style>


      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-700">
        {!isCollapsed && (
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center shadow-lg">
              <FiGrid className="text-white text-2xl" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Turf Admin</h2>
              <p className="text-sm text-gray-400">Management Panel</p>
            </div>
          </div>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-lg hover:bg-gray-700 transition-colors duration-200"
        >
          {isCollapsed ? <FiMenu className="text-2xl text-green-400" /> : <FiX className="text-2xl text-gray-400" />}
        </button>
      </div>


      {/* Navigation Menu */}
      <nav className="flex-1 py-6 px-3 overflow-y-auto">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.id;
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => handleNavigation(item)}
                  className={`w-full flex items-center gap-4 px-5 py-4 rounded-lg transition-all duration-200 sidebar-hover ${
                    isActive ? 'active-item' : ''
                  }`}
                >
                  <Icon className={`text-2xl flex-shrink-0 ${isActive ? 'text-green-400' : 'text-gray-400'}`} />
                  {!isCollapsed && (
                    <span className={`text-base font-semibold ${isActive ? 'text-white' : 'text-gray-300'}`}>
                      {item.label}
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>


      {/* Logout */}
      <div className="p-4 border-t border-gray-700">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-4 px-5 py-4 rounded-lg transition-all duration-200 hover:bg-red-500/20"
        >
          <FiLogOut className="text-3xl text-red-400 flex-shrink-0" />
          {!isCollapsed && <span className="text-base font-semibold text-red-400">Logout</span>}
        </button>
      </div>
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};


export default AdminSidebar;
