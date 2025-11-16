const TurfCard = ({ turf, onEdit, onDelete }) => {
  return (
    <div className="bg-white border border-green-200 rounded-xl shadow-md overflow-hidden">
      <img
        src={turf.turfImage}
        alt={turf.turfName}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-green-800">
          {turf.turfName}
        </h3>
        <p className="text-sm text-gray-600">{turf.turfLocation}</p>
        <p className="text-sm text-gray-500 mt-1">{turf.address}</p>
        <p className="text-green-700 font-semibold mt-2">
          ₹{turf.pricePerSlot} / slot
        </p>

        <div className="flex justify-between mt-4">
          <button
            onClick={() => onEdit(turf)}
            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(turf.id)}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
