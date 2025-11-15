import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [search, setSearch] = useState("");
  const [turfs, setTurfs] = useState([]);
  const [selectedTurf, setSelectedTurf] = useState(null);
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
  }, []);

  const filteredTurfs = turfs.filter(
    (turf) =>
      turf.name.toLowerCase().includes(search.toLowerCase()) ||
      turf.area.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navbar */}
  <nav className="bg-green-100 text-green-800 py-4 shadow-sm border-b border-green-200">
  <div className="container mx-auto flex justify-between items-center px-6">

    <h1 
      className="text-2xl font-bold cursor-pointer"
      onClick={() => navigate("/")}
    >
      TurfNation
    </h1>

    <div className="space-x-6 flex items-center">

      <button 
        onClick={() => navigate("/mybooking")}
        className="hover:underline text-green-800"
      >
        My Bookings
      </button>

      <button className="hover:underline text-green-800">
        Help
      </button>

      <button 
        className="border border-green-600 px-4 py-1 rounded-md hover:bg-green-600 hover:text-white transition font-semibold text-green-700"
      >
        Logout
      </button>

    </div>

  </div>
</nav>




      {/* Search Section */}
      <div className="text-center py-8">
        <h2 className="text-2xl font-semibold mb-4 text-[#2e8b57]">
          Search Turf Here
        </h2>
        <div className="flex justify-center items-center space-x-2">
          <input
            type="text"
            placeholder="Type turf name or area..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 w-1/3 focus:outline-none focus:ring-2 focus:ring-[#2e8b57]"
          />
         <button className="bg-green-200 text-green-800 px-5 py-2 rounded-md border border-green-300 hover:bg-green-300 transition">
  Search
</button>

        </div>
      </div>

      {/* Turf Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-10 pb-10">
        {filteredTurfs.length > 0 ? (
          filteredTurfs.map((turf) => (
            <div
              key={turf.id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden cursor-pointer border border-gray-100"
              onClick={() => setSelectedTurf(turf)}
            >
              <img
                src={turf.image}
                alt={turf.name}
                className="h-48 w-full object-cover"
              />
              <div className="p-4 space-y-1">
                <h3 className="text-lg font-bold text-gray-800">{turf.name}</h3>
                <p className="text-sm text-gray-500">{turf.area}</p>
                <p className="text-sm text-gray-500">{turf.type}</p>
                <p className="text-[#2e8b57] font-semibold">
                  ₹{turf.price}/hour
                </p>
                <button
                 className="mt-2 w-full bg-green-200 text-green-800 py-2 rounded-md border border-green-300 hover:bg-green-300 transition"

                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedTurf(turf);
                  }}
                >
                  Book Now
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-3">
            No turfs found.
          </p>
        )}
      </div>

      {/* Modal */}
      {selectedTurf && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={() => setSelectedTurf(null)}
        >
          <div
            className="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-1/2 lg:w-1/3 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-3 right-4 text-gray-600 hover:text-red-600 text-xl"
              onClick={() => setSelectedTurf(null)}
            >
              ✕
            </button>
            <img
              src={selectedTurf.image}
              alt={selectedTurf.name}
              className="w-full h-56 object-cover rounded-md mb-4"
            />
            <h2 className="text-2xl font-bold text-[#2e8b57] mb-2">
              {selectedTurf.name}
            </h2>
            <p className="text-gray-600"><strong>Area:</strong> {selectedTurf.area}</p>
            <p className="text-gray-600"><strong>Address:</strong> {selectedTurf.address}</p>
            <p className="text-gray-600"><strong>Description:</strong> {selectedTurf.description}</p>
            <p className="text-gray-600"><strong>Type:</strong> {selectedTurf.type}</p>
            <p className="text-gray-800 font-semibold mt-2">
              <strong>Price:</strong> ₹{selectedTurf.price}/hour
            </p>
            <button
              className="mt-4 w-full bg-green-200 text-green-800 py-2 rounded-md border border-green-300 hover:bg-green-300 transition"

              onClick={() => navigate("/booking", { state: selectedTurf })}
            >
              Confirm Booking
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
