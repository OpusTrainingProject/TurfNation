import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const PublicDashboard = () => {
  const [search, setSearch] = useState("");
  const [turfs, setTurfs] = useState([]);
  const [selectedTurf, setSelectedTurf] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const sampleTurfs = [
      {
        id: 1,
        name: "Green Valley Turf",
        area: "Lucknow",
        address: "Near Gomti Nagar, Lucknow, UP",
        description: "Premium 5-A-Side turf with lush greenery, perfect for evening matches.",
        price: 800,
        image: "https://images.unsplash.com/photo-1521412644187-c49fa049e84d?auto=format&fit=crop&w=900&q=60",
        type: "5-A-Side",
      },
      {
        id: 2,
        name: "Arena 7",
        area: "Pune",
        address: "Baner Road, Pune, Maharashtra",
        description: "Spacious 7-A-Side turf with floodlights and changing rooms.",
        price: 1000,
        image: "https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&w=900&q=60",
        type: "7-A-Side",
      },
      {
        id: 3,
        name: "Kickoff Zone",
        area: "Delhi",
        address: "Dwarka Sector 12, Delhi",
        description: "Affordable turf with synthetic grass and easy metro access.",
        price: 600,
        image: "https://images.unsplash.com/photo-1551958219-acbc608c6377?auto=format&fit=crop&w=900&q=60",
        type: "6-A-Side",
      },
      {
        id: 4,
        name: "PlayPoint Turf",
        area: "Mumbai",
        address: "Andheri West, Mumbai, Maharashtra",
        description: "Well-maintained turf with refreshments and seating.",
        price: 700,
        image: "https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf?auto=format&fit=crop&w=900&q=60",
        type: "5-A-Side",
      },
      {
        id: 5,
        name: "Goal Hub Arena",
        area: "Bangalore",
        address: "Koramangala, Bangalore, Karnataka",
        description: "Top-rated turf with professional lighting and tournaments.",
        price: 900,
        image: "https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=900&q=60",
        type: "6-A-Side",
      },
      {
        id: 6,
        name: "SoccerCity Grounds",
        area: "Hyderabad",
        address: "Gachibowli, Hyderabad, Telangana",
        description: "Large turf with synthetic grass, ideal for corporate matches.",
        price: 850,
        image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=900&q=60",
        type: "7-A-Side",
      }
    ];

    setTurfs(sampleTurfs);
    // Trigger animation after component mounts
    setTimeout(() => setIsLoaded(true), 100);
  }, []);

  const filteredTurfs = turfs.filter(
    (turf) =>
      turf.name.toLowerCase().includes(search.toLowerCase()) ||
      turf.area.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 via-white to-green-50">
      
      <nav className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 shadow-lg sticky top-0 z-40">
        <div className="container mx-auto flex justify-between items-center px-6">
          <h1 
            className="text-3xl font-bold cursor-pointer hover:scale-105 transition-transform duration-300 flex items-center gap-2"
            onClick={() => navigate("/")}
          >
            <span className="text-4xl">⚽</span>
            TurfNation
          </h1>

          <div className="space-x-6 flex items-center">
            <button 
              onClick={() => navigate("/")}
              className="hover:text-green-200 transition-all duration-300 hover:scale-110 font-medium"
            >
              Home
            </button>
            
            <Link 
              to="/help"
              className="hover:text-green-200 transition-all duration-300 hover:scale-110 font-medium">
              Help
            </Link>
            <Link
                to="/signin"
                className="bg-white text-green-600 px-5 py-2 rounded-lg hover:bg-green-50 hover:shadow-lg transform hover:scale-105 transition-all duration-300 font-semibold inline-block text-center">
                SignIn
            </Link>

          </div>
        </div>
      </nav>
      {/* Hero Search Section with fade-in animation */}
      <div className={`text-center py-12 px-4 transform transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
        <h2 className="text-4xl font-bold mb-3 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
          Find Your Perfect Turf
        </h2>
        <p className="text-gray-600 mb-6 text-lg">Book premium turfs in your city with ease</p>
        
        <div className="flex justify-center items-center space-x-3 max-w-2xl mx-auto">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search by turf name or city..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border-2 border-green-300 rounded-lg px-5 py-3 w-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 shadow-sm hover:shadow-md"
            />
            <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
              🔍
            </span>
          </div>
          <button className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-8 py-3 rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-300 shadow-md hover:shadow-xl transform hover:scale-105 font-semibold">
            Search
          </button>
        </div>
      </div>

      {/* Turf Cards Grid with staggered animation */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-10 pb-16">
        {filteredTurfs.length > 0 ? (
          filteredTurfs.map((turf, index) => (
            <div
              key={turf.id}
              className={`bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer border border-green-100 group transform hover:-translate-y-2 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${index * 100}ms` }}
              onClick={() => setSelectedTurf(turf)}
            >
              {/* Image Container with overlay */}
              <div className="relative overflow-hidden h-52">
                <img
                  src={turf.image}
                  alt={turf.name}
                  className="h-full w-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Type Badge */}
                <span className="absolute top-3 right-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                  {turf.type}
                </span>
              </div>

              {/* Card Content */}
              <div className="p-5 space-y-2">
                <h3 className="text-xl font-bold text-gray-800 group-hover:text-green-600 transition-colors duration-300">
                  {turf.name}
                </h3>
                <p className="text-sm text-gray-500 flex items-center gap-1">
                  <span>📍</span> {turf.area}
                </p>
                <p className="text-green-600 font-bold text-lg flex items-center gap-1">
                  <span>₹</span>{turf.price}
                  <span className="text-sm font-normal text-gray-500">/hour</span>
                </p>
                
                <button
                  className="mt-3 w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-300 font-semibold shadow-md hover:shadow-lg transform hover:scale-105"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedTurf(turf);
                  }}
                >
                  Book Now →
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-3 text-center py-20">
            <p className="text-gray-400 text-xl mb-2">😔</p>
            <p className="text-gray-500 text-lg">No turfs found matching your search.</p>
          </div>
        )}
      </div>

      {/* Modal with backdrop blur and scale animation */}
      {selectedTurf && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 animate-fadeIn"
          onClick={() => setSelectedTurf(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl p-6 w-11/12 md:w-2/3 lg:w-1/2 relative transform transition-all duration-300 animate-scaleIn max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-red-500 hover:rotate-90 transition-all duration-300 text-2xl w-10 h-10 flex items-center justify-center rounded-full hover:bg-red-50"
              onClick={() => setSelectedTurf(null)}
            >
              ✕
            </button>

            {/* Modal Image */}
            <div className="relative overflow-hidden rounded-xl mb-5">
              <img
                src={selectedTurf.image}
                alt={selectedTurf.name}
                className="w-full h-64 object-cover"
              />
              <div className="absolute top-4 left-4 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                {selectedTurf.type}
              </div>
            </div>

            {/* Modal Content */}
            <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4">
              {selectedTurf.name}
            </h2>

            <div className="space-y-3 mb-5">
              <div className="flex items-start gap-2">
                <span className="text-green-600 mt-1">📍</span>
                <div>
                  <p className="font-semibold text-gray-700">Location</p>
                  <p className="text-gray-600">{selectedTurf.area}</p>
                  <p className="text-gray-500 text-sm">{selectedTurf.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <span className="text-green-600 mt-1">📝</span>
                <div>
                  <p className="font-semibold text-gray-700">Description</p>
                  <p className="text-gray-600">{selectedTurf.description}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 bg-green-50 p-4 rounded-lg border border-green-200">
                <span className="text-2xl">💰</span>
                <div>
                  <p className="text-gray-600 text-sm">Hourly Rate</p>
                  <p className="text-green-600 font-bold text-2xl">₹{selectedTurf.price}</p>
                </div>
              </div>
            </div>

            {/* Confirm Button */}
            <button
              className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-4 rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
              onClick={() => navigate("/booking", { state: selectedTurf })}
            >
              Confirm Booking →
            </button>
          </div>
        </div>
      )}

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default PublicDashboard;
