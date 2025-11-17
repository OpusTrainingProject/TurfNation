// src/pages/user/ViewReviews.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaStar, FaStarHalfAlt, FaRegStar, FaArrowLeft, FaUser, FaCalendarAlt } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ViewReviews = () => {
  const { turfId } = useParams();
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [turfName, setTurfName] = useState('Green Valley Sports Arena');
  const [averageRating, setAverageRating] = useState(4.5);

  useEffect(() => {
    // Simulate API call - Replace with actual API
    setTimeout(() => {
      const hardcodedReviews = [
        {
          reviewId: 1,
          userName: 'Rahul Sharma',
          rating: 5,
          description: 'Excellent turf with great facilities! The lighting is perfect for evening matches and the grass quality is top-notch. Highly recommend for football enthusiasts.',
          createdOn: '2025-11-10T18:30:00',
          userId: 101
        },
        {
          reviewId: 2,
          userName: 'Priya Patel',
          rating: 4,
          description: 'Good experience overall. The turf is well-maintained and the staff is very cooperative. Could improve the washroom facilities though.',
          createdOn: '2025-11-08T15:45:00',
          userId: 102
        },
        {
          reviewId: 3,
          userName: 'Amit Kumar',
          rating: 5,
          description: 'Best turf in the area! Clean, spacious, and the booking process is very smooth. The changing rooms are also well-equipped.',
          createdOn: '2025-11-05T10:20:00',
          userId: 103
        },
        {
          reviewId: 4,
          userName: 'Sneha Reddy',
          rating: 4.5,
          description: 'Great place for weekend games. The artificial grass feels natural and provides good grip. Parking could be better managed.',
          createdOn: '2025-11-02T20:15:00',
          userId: 104
        },
        {
          reviewId: 5,
          userName: 'Vikram Singh',
          rating: 3.5,
          description: 'Decent turf but a bit overpriced compared to others in the locality. The ground quality is good but needs better drainage during monsoons.',
          createdOn: '2025-10-28T16:00:00',
          userId: 105
        },
        {
          reviewId: 6,
          userName: 'Anjali Desai',
          rating: 5,
          description: 'Absolutely loved it! Perfect for corporate team outings. The management is professional and they provide water bottles and first aid kit. Will definitely book again!',
          createdOn: '2025-10-25T12:30:00',
          userId: 106
        }
      ];
      
      setReviews(hardcodedReviews);
      setLoading(false);
    }, 1000);
  }, [turfId]);

  // Render star rating
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} className="w-5 h-5 text-yellow-500" />);
    }
    
    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" className="w-5 h-5 text-yellow-500" />);
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} className="w-5 h-5 text-yellow-500" />);
    }
    
    return stars;
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  // Get initials for avatar
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-green-50 to-emerald-50 py-8 px-4">
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fadeInUp { animation: fadeInUp 0.6s ease-out; }
        .animate-scaleIn { animation: scaleIn 0.5s ease-out; }
        .card-hover:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
        }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
      `}</style>

      <ToastContainer />

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8 animate-fadeInUp">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-green-600 hover:text-green-700 font-semibold mb-4 transition-colors duration-300 group"
          >
            <FaArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
            Back
          </button>
          
          <div className="bg-white rounded-2xl shadow-xl border-2 border-green-100 p-6">
            <h1 className="text-4xl font-black bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">
              {turfName}
            </h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                {renderStars(averageRating)}
              </div>
              <span className="text-2xl font-bold text-gray-800">{averageRating.toFixed(1)}</span>
              <span className="text-gray-600 font-medium">({reviews.length} reviews)</span>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-100 p-16 text-center animate-scaleIn">
            <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600 font-semibold text-lg">Loading reviews...</p>
          </div>
        ) : reviews.length > 0 ? (
          /* Reviews Grid */
          <div className="space-y-6">
            {reviews.map((review, index) => (
              <div
                key={review.reviewId}
                className={`bg-white rounded-2xl shadow-lg border-2 border-green-100 hover:border-green-300 p-6 card-hover transition-all duration-300 animate-scaleIn delay-${Math.min(index, 3) * 100}`}
              >
                {/* User Info Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    {/* Avatar */}
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-white font-black text-lg shadow-lg">
                      {getInitials(review.userName)}
                    </div>
                    
                    {/* User Details */}
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                        {review.userName}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                        <FaCalendarAlt className="w-3 h-3" />
                        <span>{formatDate(review.createdOn)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Rating Badge */}
                  <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full font-bold text-lg shadow-lg flex items-center gap-2">
                    <FaStar className="w-4 h-4" />
                    {review.rating.toFixed(1)}
                  </div>
                </div>

                {/* Star Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {renderStars(review.rating)}
                </div>

                {/* Review Description - Dialog Box Style */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-5 border-2 border-green-200 relative">
                  {/* Speech bubble pointer */}
                  <div className="absolute -top-2 left-6 w-4 h-4 bg-green-50 border-l-2 border-t-2 border-green-200 transform rotate-45"></div>
                  
                  <p className="text-gray-700 leading-relaxed font-medium">
                    "{review.description}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* No Reviews State */
          <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-100 p-16 text-center animate-scaleIn">
            <FaStar className="w-20 h-20 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">No Reviews Yet</h2>
            <p className="text-gray-600 font-medium">Be the first to review this turf!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewReviews;
