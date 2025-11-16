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