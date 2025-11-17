import { useState } from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import {
  FiGrid,
  FiPlus,
  FiSettings,
  FiMessageSquare,
  FiDollarSign,
  FiCalendar,
  FiLogOut,
  FiMenu,
  FiX,
} from "react-icons/fi";
import { toast } from "react-toastify";

const AdminSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: FiGrid,
      path: "/admin/dashboard",
    },
    {
      id: "add-turf",
      label: "Add New Turf",
      icon: FiPlus,
      path: "/admin/add-turf",
    },
    {
      id: "manage-turfs",
      label: "Manage Turfs",
      icon: FiSettings,
      path: "/admin/manage-turfs",
    },
    {
      id: "bookings",
      label: "All Bookings",
      icon: FiCalendar,
      path: "/admin/bookings",
    },
    {
      id: "payments",
      label: "Payment History",
      icon: FiDollarSign,
      path: "/admin/payments",
    },
    {
      id: "support",
      label: "Support Queries",
      icon: FiMessageSquare,
      path: "/admin/support",
    },
  ];

  const handleLogout = () => {
    sessionStorage.clear();
    toast.success("👋 Logged out successfully!");
    setTimeout(() => navigate("/"), 1200);
  };

  return (
    <div className="flex h-screen w-full">
      {/* SIDEBAR */}
      <div
        className={`bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white h-screen shadow-2xl transition-all duration-300 ${
          isCollapsed ? "w-20" : "w-72"
        }`}
      >
        {/* Inline styles for active/hover */}
        <style>{`
          .sidebar-hover:hover {
            background: linear-gradient(90deg, rgba(16,185,129,0.15), rgba(5,150,105,0.1));
          }
          .active-item {
            background: linear-gradient(90deg, rgba(16,185,129,0.25), rgba(5,150,105,0.2));
            border-left: 4px solid #10b981;
          }
        `}</style>

        {/* HEADER */}
        <div className="flex items-center justify-between p-5 border-b border-gray-700">
          {!isCollapsed && (
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center shadow-lg">
                <FiGrid className="text-white text-2xl" />
              </div>
              <div>
                <h2 className="text-lg font-bold">Turf Admin</h2>
                <p className="text-xs text-gray-400">Management Panel</p>
              </div>
            </div>
          )}

          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 hover:bg-gray-700 rounded-lg"
          >
            {isCollapsed ? (
              <FiMenu className="text-2xl text-green-400" />
            ) : (
              <FiX className="text-2xl text-gray-400" />
            )}
          </button>
        </div>

        {/* MENU */}
        <nav className="py-6 px-3 overflow-y-auto h-[calc(100vh-160px)]">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname.includes(item.path);

              return (
                <li key={item.id}>
                  <button
                    onClick={() => navigate(item.path)}
                    className={`w-full flex items-center gap-4 px-5 py-4 rounded-lg transition-all sidebar-hover ${
                      isActive ? "active-item" : ""
                    }`}
                  >
                    <Icon
                      className={`text-2xl ${
                        isActive ? "text-green-400" : "text-gray-400"
                      }`}
                    />
                    {!isCollapsed && (
                      <span
                        className={`text-base font-semibold ${
                          isActive ? "text-white" : "text-gray-300"
                        }`}
                      >
                        {item.label}
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* LOGOUT */}
        <div className="p-4 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-5 py-4 rounded-lg hover:bg-red-500/20"
          >
            <FiLogOut className="text-3xl text-red-400" />
            {!isCollapsed && (
              <span className="text-base text-red-400 font-semibold">
                Logout
              </span>
            )}
          </button>
        </div>
      </div>

      {/* RIGHT PAGE CONTENT */}
      <div className="flex-1 bg-gray-100 p-6 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminSidebar;