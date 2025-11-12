// src/pages/user/HelpSupport.jsx
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createConcern } from '../../services/helpSupportService';

const HelpSupport = () => {
  const [form, setForm] = useState({ 
    name: '', 
    email: '', 
    concernType: '', 
    message: '' 
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Call backend API to create concern
      const response = await createConcern(form);
      
      console.log('Concern created successfully:', response);
      toast.success('🎉 Support request submitted successfully!');
      
      // Reset form after successful submission
      setForm({ name: '', email: '', concernType: '', message: '' });
    } catch (error) {
      console.error('Error submitting concern:', error);
      
      // Show specific error message if available
      const errorMessage = error.response?.data?.message || 'Something went wrong. Please try again.';
      toast.error(`❌ ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-100 transition-all disabled:opacity-50";

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 py-12 px-4">
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeIn { animation: fadeIn 0.6s ease-out; }
      `}</style>
      <ToastContainer />
      
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10 animate-fadeIn">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Help & Support</h1>
          <p className="text-gray-600 max-w-md mx-auto">We're here to help! Share your concerns about bookings or turfs, and we'll respond promptly.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
          <div className="h-2 bg-gradient-to-r from-green-400 via-green-500 to-green-600"></div>
          
          <form onSubmit={handleSubmit} className="p-8">
            <div className="space-y-5">
              {/* Name Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Your Name</label>
                <input 
                  type="text" 
                  name="name" 
                  value={form.name} 
                  onChange={handleChange} 
                  required 
                  disabled={loading} 
                  className={inputClass} 
                  placeholder="John Doe" 
                />
              </div>

              {/* Email Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Your Email</label>
                <input 
                  type="email" 
                  name="email" 
                  value={form.email} 
                  onChange={handleChange} 
                  required 
                  disabled={loading} 
                  className={inputClass} 
                  placeholder="john@example.com" 
                />
              </div>

              {/* Concern Type Dropdown */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Concern Type</label>
                <div className="relative">
                  <select 
                    name="concernType" 
                    value={form.concernType} 
                    onChange={handleChange} 
                    required 
                    disabled={loading} 
                    className={inputClass + " appearance-none cursor-pointer"}
                  >
                    <option value="">Select concern type...</option>
                    <option value="BOOKING_RELATED">🎫 Booking Related</option>
                    <option value="TURF_RELATED">⚽ Turf Related</option>
                    <option value="PAYMENT_RELATED">💳 Payment Related</option>
                    <option value="OTHER">📋 Other</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Message Textarea */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Describe Your Concern</label>
                <textarea 
                  name="message" 
                  value={form.message} 
                  onChange={handleChange} 
                  required 
                  disabled={loading} 
                  rows="5" 
                  className={inputClass + " resize-none"} 
                  placeholder="Please provide details about your concern..." 
                />
              </div>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              disabled={loading} 
              className="w-full mt-7 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center focus:outline-none focus:ring-4 focus:ring-green-300"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24">
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
                  Submit Request
                </>
              )}
            </button>

            {/* Contact Info */}
            <div className="mt-6 pt-6 border-t border-gray-200 text-center">
              <p className="text-sm text-gray-600 mb-2">Need immediate assistance?</p>
              <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm">
                <a href="tel:+1234567890" className="text-green-600 hover:text-green-700 font-semibold hover:underline transition-colors">
                  📞 +123-456-7890
                </a>
                <span className="text-gray-400">|</span>
                <a href="mailto:support@turf.com" className="text-green-600 hover:text-green-700 font-semibold hover:underline transition-colors">
                  ✉️ support@turf.com
                </a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HelpSupport;
