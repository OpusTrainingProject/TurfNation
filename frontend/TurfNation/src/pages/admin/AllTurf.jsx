import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AllTurf = () => {
  const [turfs, setTurfs] = useState([]);
  const [editingTurfId, setEditingTurfId] = useState(null);
  const [formData, setFormData] = useState({
    turfName: "",
    turfLocation: "",
    address: "",
    description: "",
    pricePerSlot: "",
  });

  // Fetch all turfs
  const fetchTurfs = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/turf/getAllTurfs"
      );
      setTurfs(response.data);
    } catch (error) {
      console.error("Failed to load turfs:", error);
      toast.error("Failed to load turfs");
    }
  };

  useEffect(() => {
    fetchTurfs();
  }, []);

  // Delete Turf
  const handleDelete = async (turfid) => {
    if (!window.confirm("Are you sure you want to delete this turf?")) return;

    try {
      await axios.delete(`http://localhost:8080/turf/deleteTurf/${turfid}`);
      toast.success("Turf deleted successfully");
      fetchTurfs();
    } catch (error) {
      console.error("Error deleting turf:", error);
      toast.error("Failed to delete turf");
    }
  };

  // Edit Turf
  const handleEdit = (turf) => {
    console.log("Editing turf:", turf);
    setEditingTurfId(turf.turfid);
    setFormData({
      turfName: turf.turfName || "",
      turfLocation: turf.turfLocation || "",
      address: turf.address || "",
      description: turf.description || "",
      pricePerSlot: turf.pricePerSlot || "",
    });
  };

  //  Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Update Turf
  const handleUpdate = async () => {
    if (!editingTurfId) {
      toast.error("No turf selected for update!");
      return;
    }

    try {
      const payload = {
        turfName: formData.turfName,
        turfLocation: formData.turfLocation,
        address: formData.address,
        description: formData.description,
        pricePerSlot: parseInt(formData.pricePerSlot),
      };

      console.log("Sending update for Turf ID:", editingTurfId);
      console.log("Payload:", payload);

      await axios.put(
        `http://localhost:8080/turf/updateTurf/${editingTurfId}`,
        payload,
        { headers: { "Content-Type": "application/json" } }
      );

      toast.success("Turf updated successfully");
      setEditingTurfId(null);
      fetchTurfs();
    } catch (error) {
      console.error("Error updating turf:", error);
      toast.error("Failed to update turf");
    }
  };

  // Cancel Edit
  const handleCancel = () => {
    setEditingTurfId(null);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-semibold text-center mb-6 text-green-700">
        🏟️ All Turfs
      </h1>

      {/* Turf List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {turfs.map((turf) => (
          <div
            key={turf.turfid}
            className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition"
          >
            <img
              src={turf.turfImage}
              alt={turf.turfName}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-bold text-gray-800">
                {turf.turfName}
              </h2>
              <p className="text-gray-600 text-sm">{turf.turfLocation}</p>
              <p className="text-gray-500 text-sm mt-1">{turf.address}</p>
              <p className="text-gray-700 mt-2">{turf.description}</p>
              <p className="text-green-600 font-semibold mt-2">
                ₹{turf.pricePerSlot} / slot
              </p>

              <div className="flex justify-between mt-4">
                <button
                  onClick={() => handleEdit(turf)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(turf.turfid)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editingTurfId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-xl shadow-lg w-96">
            <h2 className="text-2xl font-semibold mb-4 text-green-700 text-center">
              Edit Turf
            </h2>

            <input
              type="text"
              name="turfName"
              value={formData.turfName}
              onChange={handleChange}
              placeholder="Turf Name"
              className="w-full border p-2 rounded mb-3"
            />
            <input
              type="text"
              name="turfLocation"
              value={formData.turfLocation}
              onChange={handleChange}
              placeholder="Location"
              className="w-full border p-2 rounded mb-3"
            />
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Address"
              className="w-full border p-2 rounded mb-3"
            />
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Description"
              className="w-full border p-2 rounded mb-3"
            />
            <input
              type="number"
              name="pricePerSlot"
              value={formData.pricePerSlot}
              onChange={handleChange}
              placeholder="Price per slot"
              className="w-full border p-2 rounded mb-3"
            />

            <div className="flex justify-between mt-4">
              <button
                onClick={handleUpdate}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
              >
                Update
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllTurf


// import React, { useState, useEffect } from "react";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const AllTurf = () => {
//   // Initialize with 3 dummy turfs
//   const [turfs, setTurfs] = useState([
//     {
//       turfid: 1,
//       turfName: "Green Valley Sports Arena",
//       turfLocation: "Andheri West, Mumbai",
//       address: "Plot No. 45, MIDC Area, Andheri West, Mumbai - 400053",
//       description: "Premium quality artificial turf with floodlights. Perfect for football and cricket. Well-maintained facilities with changing rooms and parking.",
//       pricePerSlot: 1500,
//       turfImage: "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=500&h=300&fit=crop"
//     },
//     {
//       turfid: 2,
//       turfName: "Champions Cricket Ground",
//       turfLocation: "Bandra East, Mumbai",
//       address: "Near Bandra Kurla Complex, Bandra East, Mumbai - 400051",
//       description: "International standard cricket pitch with natural grass. Equipped with practice nets and professional coaching available. Ideal for tournaments.",
//       pricePerSlot: 2000,
//       turfImage: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=500&h=300&fit=crop"
//     },
//     {
//       turfid: 3,
//       turfName: "Elite Football Academy",
//       turfLocation: "Powai, Mumbai",
//       address: "IIT Powai Campus Road, Powai, Mumbai - 400076",
//       description: "State-of-the-art football turf with FIFA approved artificial grass. Features include spectator seating, professional lighting, and cafeteria.",
//       pricePerSlot: 1800,
//       turfImage: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=500&h=300&fit=crop"
//     }
//   ]);

//   const [editingTurfId, setEditingTurfId] = useState(null);
//   const [formData, setFormData] = useState({
//     turfName: "",
//     turfLocation: "",
//     address: "",
//     description: "",
//     pricePerSlot: "",
//   });

//   // Delete Turf
//   const handleDelete = (turfid) => {
//     if (!window.confirm("Are you sure you want to delete this turf?")) return;

//     try {
//       // Filter out the deleted turf
//       setTurfs(turfs.filter(turf => turf.turfid !== turfid));
//       toast.success("Turf deleted successfully! 🗑️");
//     } catch (error) {
//       console.error("Error deleting turf:", error);
//       toast.error("Failed to delete turf");
//     }
//   };

//   // Edit Turf
//   const handleEdit = (turf) => {
//     console.log("Editing turf:", turf);
//     setEditingTurfId(turf.turfid);
//     setFormData({
//       turfName: turf.turfName || "",
//       turfLocation: turf.turfLocation || "",
//       address: turf.address || "",
//       description: turf.description || "",
//       pricePerSlot: turf.pricePerSlot || "",
//     });
//   };

//   // Handle Input Change
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // Update Turf
//   const handleUpdate = () => {
//     if (!editingTurfId) {
//       toast.error("No turf selected for update!");
//       return;
//     }

//     try {
//       // Update the turf in the state
//       setTurfs(turfs.map(turf => 
//         turf.turfid === editingTurfId 
//           ? {
//               ...turf,
//               turfName: formData.turfName,
//               turfLocation: formData.turfLocation,
//               address: formData.address,
//               description: formData.description,
//               pricePerSlot: parseInt(formData.pricePerSlot),
//             }
//           : turf
//       ));

//       toast.success("Turf updated successfully! ✅");
//       setEditingTurfId(null);
//       setFormData({
//         turfName: "",
//         turfLocation: "",
//         address: "",
//         description: "",
//         pricePerSlot: "",
//       });
//     } catch (error) {
//       console.error("Error updating turf:", error);
//       toast.error("Failed to update turf");
//     }
//   };

//   // Cancel Edit
//   const handleCancel = () => {
//     setEditingTurfId(null);
//     setFormData({
//       turfName: "",
//       turfLocation: "",
//       address: "",
//       description: "",
//       pricePerSlot: "",
//     });
//   };

//   return (
//     <div className="p-6 bg-gradient-to-br from-gray-50 via-green-50 to-emerald-50 min-h-screen">
//       <ToastContainer />
      
//       <h1 className="text-4xl font-black text-center mb-8 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
//         🏟️ All Turfs
//       </h1>

//       {/* Turf List */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
//         {turfs.map((turf) => (
//           <div
//             key={turf.turfid}
//             className="bg-white shadow-xl rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border-2 border-green-100"
//           >
//             <img
//               src={turf.turfImage}
//               alt={turf.turfName}
//               className="w-full h-48 object-cover"
//             />
//             <div className="p-5">
//               <h2 className="text-xl font-bold text-gray-800 mb-2">
//                 {turf.turfName}
//               </h2>
//               <p className="text-green-600 font-semibold text-sm flex items-center gap-1 mb-1">
//                 📍 {turf.turfLocation}
//               </p>
//               <p className="text-gray-500 text-xs mb-3">{turf.address}</p>
//               <p className="text-gray-700 text-sm line-clamp-2 mb-3">{turf.description}</p>
//               <p className="text-green-600 font-black text-lg">
//                 ₹{turf.pricePerSlot} / slot
//               </p>

//               <div className="flex gap-3 mt-4">
//                 <button
//                   onClick={() => handleEdit(turf)}
//                   className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-md"
//                 >
//                   ✏️ Edit
//                 </button>
//                 <button
//                   onClick={() => handleDelete(turf.turfid)}
//                   className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105 shadow-md"
//                 >
//                   🗑️ Delete
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* No Turfs Message */}
//       {turfs.length === 0 && (
//         <div className="text-center py-16">
//           <p className="text-2xl font-bold text-gray-400">No turfs available</p>
//           <p className="text-gray-500 mt-2">All turfs have been deleted</p>
//         </div>
//       )}

//       {/* Edit Modal */}
//       {editingTurfId && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
//           <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md border-2 border-green-200">
//             <h2 className="text-3xl font-black mb-6 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent text-center">
//               ✏️ Edit Turf
//             </h2>

//             <input
//               type="text"
//               name="turfName"
//               value={formData.turfName}
//               onChange={handleChange}
//               placeholder="Turf Name"
//               className="w-full border-2 border-gray-300 focus:border-green-500 p-3 rounded-lg mb-3 outline-none transition-all"
//             />
//             <input
//               type="text"
//               name="turfLocation"
//               value={formData.turfLocation}
//               onChange={handleChange}
//               placeholder="Location"
//               className="w-full border-2 border-gray-300 focus:border-green-500 p-3 rounded-lg mb-3 outline-none transition-all"
//             />
//             <input
//               type="text"
//               name="address"
//               value={formData.address}
//               onChange={handleChange}
//               placeholder="Address"
//               className="w-full border-2 border-gray-300 focus:border-green-500 p-3 rounded-lg mb-3 outline-none transition-all"
//             />
//             <textarea
//               name="description"
//               value={formData.description}
//               onChange={handleChange}
//               placeholder="Description"
//               rows="3"
//               className="w-full border-2 border-gray-300 focus:border-green-500 p-3 rounded-lg mb-3 outline-none transition-all resize-none"
//             />
//             <input
//               type="number"
//               name="pricePerSlot"
//               value={formData.pricePerSlot}
//               onChange={handleChange}
//               placeholder="Price per slot (₹)"
//               className="w-full border-2 border-gray-300 focus:border-green-500 p-3 rounded-lg mb-5 outline-none transition-all"
//             />

//             <div className="flex gap-3">
//               <button
//                 onClick={handleUpdate}
//                 className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-lg font-bold hover:from-green-600 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
//               >
//                 ✅ Update
//               </button>
//               <button
//                 onClick={handleCancel}
//                 className="flex-1 bg-gradient-to-r from-gray-500 to-gray-600 text-white px-6 py-3 rounded-lg font-bold hover:from-gray-600 hover:to-gray-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
//               >
//                 ❌ Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AllTurf;
