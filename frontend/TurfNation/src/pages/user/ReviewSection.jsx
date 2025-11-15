import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const ReviewSection = ({ bookingId = 1 }) => {
  const [stars, setStars] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [description, setDescription] = useState("");
  const [postingReview, setPostingReview] = useState(false);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    if (stars === 0) {
      toast.warning("⭐ Please select a rating!", { position: "top-right" });
      return;
    }

    try {
      setPostingReview(true);

      const reviewDTO = {
        bookingId,
        rating: stars,
        description: description.trim(),
      };

      await createReview(reviewDTO);

      toast.success("🎉 Review submitted successfully!", {
        position: "top-right",
        autoClose: 3000,
      });

      setStars(0);
      setDescription("");
    } catch (error) {
      const msg =
        error?.response?.data?.message ||
        "Failed to submit review. Please try again.";

      toast.error(`❌ ${msg}`, { position: "top-right" });
    } finally {
      setPostingReview(false);
    }
  };

  const StarIcon = ({ filled, index }) => (
    <svg
      onMouseEnter={() => setHoveredStar(index)}
      onMouseLeave={() => setHoveredStar(0)}
      onClick={() => setStars(index)}
      className={`w-7 h-7 cursor-pointer transition-all duration-200 hover:scale-110 ${
        filled ? "text-yellow-400 drop-shadow-md" : "text-gray-300"
      }`}
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );

  return (
    <>
      <ToastContainer />

      <div className="max-w-2xl mx-auto px-4 py-6">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden transition-shadow duration-300 hover:shadow-xl">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-5 py-3">
            <h3 className="text-xl font-bold text-white flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              Add Your Review
            </h3>
            <p className="text-green-100 text-sm mt-1">Booking ID: #{bookingId}</p>
          </div>

          {/* Form */}
          <form onSubmit={handleReviewSubmit} className="p-6">
            
            {/* Rating */}
            <div className="mb-5">
              <label className="block text-sm font-bold text-gray-800 mb-3 uppercase tracking-wide">
                Rating
              </label>

              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <StarIcon key={i} index={i} filled={i <= (hoveredStar || stars)} />
                ))}

                {stars > 0 && (
                  <span className="ml-2 px-3 py-1 bg-yellow-100 text-yellow-700 rounded-lg text-sm font-semibold">
                    {stars} {stars === 1 ? "Star" : "Stars"}
                  </span>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="mb-5">
              <label className="block text-sm font-bold text-gray-800 mb-2 uppercase tracking-wide">
                Your Feedback
              </label>

              <div className="relative">
                <textarea
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Share your experience with the turf..."
                  maxLength={250}
                  disabled={postingReview}
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all resize-none disabled:opacity-50"
                />
                <span className="absolute bottom-2 right-3 text-xs text-gray-400">
                  {description.length}/250
                </span>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={postingReview}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-3 px-6 rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all shadow-md disabled:opacity-50"
            >
              {postingReview ? "Submitting..." : "Submit Review"}
            </button>

            {/* Footer Helper */}
            <div className="mt-5 pt-4 border-t border-gray-200">
              <div className="bg-green-50 rounded-lg px-4 py-3 flex gap-3">
                <svg className="w-5 h-5 text-green-600 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" />
                </svg>
                <p className="text-sm text-gray-700">
                  <span className="font-semibold text-green-700">Your feedback matters!</span>{" "}
                  Help us improve our services and help others choose better turfs.
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ReviewSection;
