// src/pages/user/ReviewSection.jsx
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createReview } from '../../services/reviewService';

// const ReviewSection = (//{ bookingId }//) => { // bookingId passed as prop
const ReviewSection = () => { // bookingId passed as prop
  const [stars, setStars] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [description, setDescription] = useState('');
  const [postingReview, setPostingReview] = useState(false);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    
    // Validation: Check if rating is selected
    if (stars === 0) {
      toast.warning('⭐ Please select a rating!', { position: 'top-right' });
      return;
    }

    // // Validation: Check if bookingId is provided
    // if (!bookingId) {
    //   toast.error('❌ Booking ID is missing. Cannot submit review.', { position: 'top-right' });
    //   return;
    // }

    setPostingReview(true);
    
    try {
      // Prepare review data - backend will fetch turfId from booking service
      const reviewDTO = {
        // bookingId: bookingId,
        bookingId: 1,
        rating: stars,
        description: description.trim()
      };

      // Call backend API to create review
      const response = await createReview(reviewDTO);
      
      console.log('Review created successfully:', response);
      toast.success('🎉 Review submitted successfully! Thank you for your feedback.', { 
        position: 'top-right',
        autoClose: 4000 
      });
      
      // Reset form after successful submission
      setStars(0);
      setDescription('');
    } catch (error) {
      console.error('Error submitting review:', error);
      
      // Handle specific error cases
      let errorMessage = 'Failed to submit review. Please try again.';
      
      if (error.response?.status === 404) {
        errorMessage = 'Booking not found. Please check your booking details.';
      } else if (error.response?.status === 400) {
        errorMessage = error.response?.data?.message || 'Invalid review data.';
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      
      toast.error(`❌ ${errorMessage}`, { position: 'top-right' });
    } finally {
      setPostingReview(false);
    }
  };

  const StarIcon = ({ filled, index }) => (
    <svg
      className={`w-7 h-7 cursor-pointer transition-all duration-200 transform hover:scale-110 ${
        filled ? 'text-yellow-400 drop-shadow-md' : 'text-gray-300'
      }`}
      onMouseEnter={() => setHoveredStar(index)}
      onMouseLeave={() => setHoveredStar(0)}
      onClick={() => setStars(index)}
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
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-5 py-3">
            <h3 className="text-xl font-bold text-white flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              Add Your Review
            </h3>
            {/* <p className="text-green-100 text-sm mt-1">Booking ID: #{bookingId}</p> */}
            <p className="text-green-100 text-sm mt-1">Booking ID: #1</p>
          </div>

          <form onSubmit={handleReviewSubmit} className="p-6">
            {/* Star Rating */}
            <div className="mb-5">
              <label className="block text-sm font-bold text-gray-800 mb-3 uppercase tracking-wide">Rating</label>
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((index) => (
                    <StarIcon key={index} index={index} filled={index <= (hoveredStar || stars)} />
                  ))}
                </div>
                {stars > 0 && (
                  <span className="ml-2 px-3 py-1 bg-yellow-100 text-yellow-700 rounded-lg font-semibold text-sm">
                    {stars} {stars === 1 ? 'Star' : 'Stars'}
                  </span>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="mb-5">
              <label htmlFor="reviewDesc" className="block text-sm font-bold text-gray-800 mb-2 uppercase tracking-wide">
                Your Feedback
              </label>
              <div className="relative">
                <textarea
                  id="reviewDesc"
                  placeholder="Share your experience with the turf and facilities..."
                  rows={4}
                  maxLength={250}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  disabled={postingReview}
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-100 transition-all resize-none disabled:opacity-50"
                />
                <span className="absolute bottom-2 right-3 text-xs text-gray-400">
                  {description.length}/100
                </span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={postingReview}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
            >
              {postingReview ? (
                <>
                  <svg className="animate-spin h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  Submit Review
                </>
              )}
            </button>

            {/* Footer Info */}
            <div className="mt-5 pt-4 border-t border-gray-200">
              <div className="bg-green-50 rounded-lg px-4 py-3 flex items-start gap-3">
                <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <div className="text-sm text-gray-700 leading-relaxed">
                  <p className="mb-1">
                    <span className="font-semibold text-green-700">Your feedback matters!</span> Help us improve our services and assist other customers in making informed decisions.
                  </p>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ReviewSection;
