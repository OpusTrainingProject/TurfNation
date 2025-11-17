// import React, { useState, useEffect, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { FaUser, FaEnvelope, FaPhone, FaCamera, FaSave, FaTimes, FaEdit, FaFutbol, FaArrowLeft } from 'react-icons/fa';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { userService } from '../../services/UserService';

// const UserProfile = () => {
//   const navigate = useNavigate();
//   const fileInputRef = useRef(null);
  
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [avatarPreview, setAvatarPreview] = useState(null);
//   const [avatarFile, setAvatarFile] = useState(null);
  
//   const [userData, setUserData] = useState({
//     userId: '',
//     firstName: '',
//     lastName: '',
//     email: '',
//     phone: '',
//     avatar: null,
//   });

//   const [editedData, setEditedData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     phone: '',
//   });

//   // Fetch user profile on mount
//   useEffect(() => {
//     fetchUserProfile();
//   }, []);

//   const fetchUserProfile = async () => {
//     try {
//       setLoading(true);
//       const data = await userService.getUserProfile();
      
//       setUserData({
//         userId: data.userId,
//         firstName: data.firstName,
//         lastName: data.lastName,
//         email: data.email,
//         phone: data.phone,
//         avatar: data.avatar,
//       });

//       setEditedData({
//         firstName: data.firstName,
//         lastName: data.lastName,
//         email: data.email,
//         phone: data.phone,
//       });

//       if (data.avatar) {
//         setAvatarPreview(data.avatar);
//       }
//     } catch (error) {
//       toast.error('Failed to load profile. Please try again.');
//       console.error('Error fetching profile:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setEditedData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleAvatarClick = () => {
//     if (isEditing) {
//       fileInputRef.current?.click();
//     }
//   };

//   const handleAvatarChange = (e) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       // Validate file size (max 5MB)
//       if (file.size > 5 * 1024 * 1024) {
//         toast.error('Image size should be less than 5MB');
//         return;
//       }

//       // Validate file type
//       if (!file.type.startsWith('image/')) {
//         toast.error('Please select an image file');
//         return;
//       }

//       setAvatarFile(file);
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setAvatarPreview(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleEdit = () => {
//     setIsEditing(true);
//   };

//   const handleCancel = () => {
//     setIsEditing(false);
//     setEditedData({
//       firstName: userData.firstName,
//       lastName: userData.lastName,
//       email: userData.email,
//       phone: userData.phone,
//     });
//     setAvatarPreview(userData.avatar);
//     setAvatarFile(null);
//   };

//   const handleSave = async () => {
//     try {
//       setSaving(true);

//       // Upload avatar if changed
//       if (avatarFile) {
//         await userService.uploadAvatar(avatarFile);
//       }

//       // Update profile data
//       await userService.updateUserProfile(editedData);

//       setUserData(prev => ({
//         ...prev,
//         ...editedData,
//       }));

//       setIsEditing(false);
//       toast.success('Profile updated successfully!');
//     } catch (error) {
//       toast.error('Failed to update profile. Please try again.');
//       console.error('Error updating profile:', error);
//     } finally {
//       setSaving(false);
//     }
//   };

//   const getInitials = () => {
//     return `${editedData.firstName?.[0] || ''}${editedData.lastName?.[0] || ''}`.toUpperCase();
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//           <p className="text-gray-600 font-semibold">Loading profile...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
//       <style>{`
//         @keyframes fadeIn {
//           from { opacity: 0; }
//           to { opacity: 1; }
//         }
//         @keyframes slideUp {
//           from { opacity: 0; transform: translateY(30px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         @keyframes scaleIn {
//           from { opacity: 0; transform: scale(0.9); }
//           to { opacity: 1; transform: scale(1); }
//         }
//         @keyframes shimmer {
//           0% { background-position: -1000px 0; }
//           100% { background-position: 1000px 0; }
//         }
//         .animate-fadeIn { animation: fadeIn 0.6s ease-out; }
//         .animate-slideUp { animation: slideUp 0.8s ease-out; }
//         .animate-scaleIn { animation: scaleIn 0.5s ease-out; }
//         .input-focus {
//           transition: all 0.3s ease;
//         }
//         .input-focus:focus {
//           transform: translateY(-2px);
//           box-shadow: 0 4px 12px rgba(34, 197, 94, 0.2);
//         }
//         .avatar-upload-overlay {
//           opacity: 0;
//           transition: opacity 0.3s ease;
//         }
//         .avatar-container:hover .avatar-upload-overlay {
//           opacity: 1;
//         }
//         .shimmer {
//           animation: shimmer 2s infinite;
//           background: linear-gradient(
//             to right,
//             transparent 0%,
//             rgba(255, 255, 255, 0.3) 50%,
//             transparent 100%
//           );
//           background-size: 1000px 100%;
//         }
//       `}</style>

//       <ToastContainer position="top-right" autoClose={3000} />

//       {/* Header/Navbar */}
//       <nav className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 shadow-lg sticky top-0 z-40">
//         <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
//           <div className="flex items-center gap-4">
//             <button
//               onClick={() => navigate('/dashboard')}
//               className="flex items-center gap-2 hover:bg-white/10 px-3 py-2 rounded-lg transition-all duration-300"
//             >
//               <FaArrowLeft className="w-5 h-5" />
//               <span className="font-semibold">Back</span>
//             </button>
//             <div className="h-8 w-px bg-white/30"></div>
//             <div className="flex items-center gap-3">
//               <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
//                 <FaFutbol className="w-5 h-5" />
//               </div>
//               <span className="text-xl font-bold">Turf Nation</span>
//             </div>
//           </div>
          
//           <h1 className="text-2xl font-bold">My Profile</h1>
//         </div>
//       </nav>

//       {/* Main Content */}
//       <div className="max-w-4xl mx-auto px-6 py-12">
//         {/* Profile Card */}
//         <div className="bg-white rounded-3xl shadow-2xl overflow-hidden animate-slideUp border-2 border-green-100">
          
//           {/* Header Section with Gradient */}
//           <div className="h-40 bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 relative overflow-hidden">
//             <div className="absolute inset-0 bg-black/10"></div>
//             {/* Decorative Elements */}
//             <div className="absolute top-4 right-4 text-white/20 text-6xl">⚽</div>
//             <div className="absolute bottom-4 left-4 text-white/20 text-5xl">🏀</div>
//           </div>

//           {/* Avatar Section */}
//           <div className="relative px-8 pb-8">
//             <div className="flex flex-col md:flex-row md:items-end md:justify-between">
//               {/* Avatar */}
//               <div className="relative -mt-20 animate-scaleIn">
//                 <div 
//                   className={`avatar-container w-40 h-40 rounded-full border-6 border-white shadow-2xl overflow-hidden bg-gradient-to-br from-green-400 to-emerald-500 ${isEditing ? 'cursor-pointer' : ''} group`}
//                   onClick={handleAvatarClick}
//                 >
//                   {avatarPreview ? (
//                     <img 
//                       src={avatarPreview} 
//                       alt="Profile" 
//                       className="w-full h-full object-cover"
//                     />
//                   ) : (
//                     <div className="w-full h-full flex items-center justify-center text-white text-4xl font-bold">
//                       {getInitials()}
//                     </div>
//                   )}
                  
//                   {/* Upload Overlay */}
//                   {isEditing && (
//                     <div className="avatar-upload-overlay absolute inset-0 bg-black/60 flex items-center justify-center">
//                       <div className="text-center">
//                         <FaCamera className="w-8 h-8 text-white mx-auto mb-2" />
//                         <p className="text-white text-sm font-semibold">Change Photo</p>
//                       </div>
//                     </div>
//                   )}
//                 </div>
                
//                 <input
//                   ref={fileInputRef}
//                   type="file"
//                   accept="image/*"
//                   onChange={handleAvatarChange}
//                   className="hidden"
//                 />
//               </div>

//               {/* Action Buttons */}
//               <div className="mt-6 md:mt-0 md:mb-4 flex gap-3">
//                 {!isEditing ? (
//                   <button
//                     onClick={handleEdit}
//                     className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2"
//                   >
//                     <FaEdit className="w-5 h-5" />
//                     Edit Profile
//                   </button>
//                 ) : (
//                   <>
//                     <button
//                       onClick={handleCancel}
//                       className="px-6 py-3 bg-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-300 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 flex items-center gap-2"
//                       disabled={saving}
//                     >
//                       <FaTimes className="w-5 h-5" />
//                       Cancel
//                     </button>
//                     <button
//                       onClick={handleSave}
//                       className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
//                       disabled={saving}
//                     >
//                       {saving ? (
//                         <>
//                           <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                           Saving...
//                         </>
//                       ) : (
//                         <>
//                           <FaSave className="w-5 h-5" />
//                           Save Changes
//                         </>
//                       )}
//                     </button>
//                   </>
//                 )}
//               </div>
//             </div>

//             {/* Profile Form */}
//             <div className="mt-8 space-y-6">
//               {/* Name Section */}
//               <div className="grid md:grid-cols-2 gap-6">
//                 {/* First Name */}
//                 <div className="space-y-2">
//                   <label className="flex items-center gap-2 text-gray-700 font-semibold text-sm">
//                     <FaUser className="w-4 h-4 text-green-600" />
//                     First Name
//                   </label>
//                   <input
//                     type="text"
//                     name="firstName"
//                     value={editedData.firstName}
//                     onChange={handleInputChange}
//                     disabled={!isEditing}
//                     className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300 ${
//                       isEditing 
//                         ? 'border-green-300 bg-white input-focus' 
//                         : 'border-gray-200 bg-gray-50 cursor-not-allowed'
//                     }`}
//                     placeholder="Enter first name"
//                   />
//                 </div>

//                 {/* Last Name */}
//                 <div className="space-y-2">
//                   <label className="flex items-center gap-2 text-gray-700 font-semibold text-sm">
//                     <FaUser className="w-4 h-4 text-green-600" />
//                     Last Name
//                   </label>
//                   <input
//                     type="text"
//                     name="lastName"
//                     value={editedData.lastName}
//                     onChange={handleInputChange}
//                     disabled={!isEditing}
//                     className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300 ${
//                       isEditing 
//                         ? 'border-green-300 bg-white input-focus' 
//                         : 'border-gray-200 bg-gray-50 cursor-not-allowed'
//                     }`}
//                     placeholder="Enter last name"
//                   />
//                 </div>
//               </div>

//               {/* Email */}
//               <div className="space-y-2">
//                 <label className="flex items-center gap-2 text-gray-700 font-semibold text-sm">
//                   <FaEnvelope className="w-4 h-4 text-green-600" />
//                   Email Address
//                 </label>
//                 <input
//                   type="email"
//                   name="email"
//                   value={editedData.email}
//                   onChange={handleInputChange}
//                   disabled={!isEditing}
//                   className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300 ${
//                     isEditing 
//                       ? 'border-green-300 bg-white input-focus' 
//                       : 'border-gray-200 bg-gray-50 cursor-not-allowed'
//                   }`}
//                   placeholder="Enter email address"
//                 />
//               </div>

//               {/* Phone */}
//               <div className="space-y-2">
//                 <label className="flex items-center gap-2 text-gray-700 font-semibold text-sm">
//                   <FaPhone className="w-4 h-4 text-green-600" />
//                   Phone Number
//                 </label>
//                 <input
//                   type="tel"
//                   name="phone"
//                   value={editedData.phone}
//                   onChange={handleInputChange}
//                   disabled={!isEditing}
//                   className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300 ${
//                     isEditing 
//                       ? 'border-green-300 bg-white input-focus' 
//                       : 'border-gray-200 bg-gray-50 cursor-not-allowed'
//                   }`}
//                   placeholder="Enter phone number"
//                 />
//               </div>

//               {/* User ID (Read-only) */}
//               <div className="space-y-2">
//                 <label className="flex items-center gap-2 text-gray-700 font-semibold text-sm">
//                   <span className="w-4 h-4 flex items-center justify-center text-green-600 font-bold">#</span>
//                   User ID
//                 </label>
//                 <input
//                   type="text"
//                   value={userData.userId}
//                   disabled
//                   className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-gray-50 cursor-not-allowed text-gray-500"
//                 />
//               </div>
//             </div>

//             {/* Info Banner */}
//             {isEditing && (
//               <div className="mt-6 p-4 bg-green-50 border-2 border-green-200 rounded-xl animate-fadeIn">
//                 <p className="text-green-800 text-sm flex items-start gap-2">
//                   <span className="text-xl">💡</span>
//                   <span>
//                     <strong>Tip:</strong> Make sure to save your changes before leaving this page. 
//                     Click on the avatar to upload a new profile picture (max 5MB).
//                   </span>
//                 </p>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Additional Info Cards */}
//         <div className="grid md:grid-cols-2 gap-6 mt-8 animate-fadeIn" style={{ animationDelay: '0.2s' }}>
//           {/* Account Stats */}
//           <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-green-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
//             <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
//               <span className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center text-white">
//                 📊
//               </span>
//               Account Information
//             </h3>
//             <div className="space-y-3">
//               <div className="flex justify-between items-center">
//                 <span className="text-gray-600">Member Since</span>
//                 <span className="font-semibold text-gray-800">January 2025</span>
//               </div>
//               <div className="flex justify-between items-center">
//                 <span className="text-gray-600">Total Bookings</span>
//                 <span className="font-semibold text-green-600">12</span>
//               </div>
//               <div className="flex justify-between items-center">
//                 <span className="text-gray-600">Account Status</span>
//                 <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">Active</span>
//               </div>
//             </div>
//           </div>

//           {/* Quick Actions */}
//           <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-green-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
//             <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
//               <span className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center text-white">
//                 ⚡
//               </span>
//               Quick Actions
//             </h3>
//             <div className="space-y-3">
//               <button 
//                 onClick={() => navigate('/mybooking')}
//                 className="w-full px-4 py-3 bg-green-50 text-green-700 font-semibold rounded-lg hover:bg-green-100 transition-all duration-300 text-left"
//               >
//                 View My Bookings →
//               </button>
//               <button 
//                 onClick={() => navigate('/dashboard')}
//                 className="w-full px-4 py-3 bg-green-50 text-green-700 font-semibold rounded-lg hover:bg-green-100 transition-all duration-300 text-left"
//               >
//                 Browse Turfs →
//               </button>
//               <button className="w-full px-4 py-3 bg-green-50 text-green-700 font-semibold rounded-lg hover:bg-green-100 transition-all duration-300 text-left">
//                 Change Password →
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserProfile;

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaPhone, FaCamera, FaSave, FaTimes, FaEdit, FaFutbol, FaArrowLeft } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { userService } from '../../services/UserService';

const UserProfile = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  
  // Hardcoded dummy avatar URL
  const DUMMY_AVATAR = "https://i.pravatar.cc/300?img=12";
  
  const [avatarPreview, setAvatarPreview] = useState(DUMMY_AVATAR);
  const [avatarFile, setAvatarFile] = useState(null);
  
  const [userData, setUserData] = useState({
    userId: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });

  const [editedData, setEditedData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });

  // Helper function to get user from sessionStorage
  const getUserFromSession = () => {
    try {
      const userStr = sessionStorage.getItem("user");
      return userStr ? JSON.parse(userStr) : null;
    } catch (error) {
      console.error("Error parsing user data from session:", error);
      return null;
    }
  };

  // Fetch user profile on mount
  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      setLoading(true);
      
      // First, try to get user data from sessionStorage (instant load)
      const storedUser = getUserFromSession();
      
      if (storedUser) {
        console.log("Loading user from sessionStorage:", storedUser);
        
        // Set data from sessionStorage immediately
        const initialData = {
          userId: storedUser.userId || storedUser.id || '',
          firstName: storedUser.firstName || '',
          lastName: storedUser.lastName || '',
          email: storedUser.email || '',
          phone: storedUser.phone || '',
        };

        setUserData(initialData);
        setEditedData({
          firstName: initialData.firstName,
          lastName: initialData.lastName,
          email: initialData.email,
          phone: initialData.phone,
        });

        // Show UI immediately with cached data
        setLoading(false);
      }

      // Then fetch fresh data from API in background
      await fetchUserProfile();

    } catch (error) {
      toast.error('Failed to load profile. Please try again.');
      console.error('Error loading user data:', error);
      setLoading(false);
    }
  };

  const fetchUserProfile = async () => {
    try {
      const data = await userService.getUserProfile();
      
      console.log("Fresh user data from API:", data);
      
      // Update with fresh data from API
      const freshData = {
        userId: data.userId,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
      };

      setUserData(freshData);
      setEditedData({
        firstName: freshData.firstName,
        lastName: freshData.lastName,
        email: freshData.email,
        phone: freshData.phone,
      });

      // Update sessionStorage with fresh data
      const updatedUser = {
        ...getUserFromSession(),
        ...freshData
      };
      sessionStorage.setItem("user", JSON.stringify(updatedUser));

      // Always use hardcoded dummy avatar
      setAvatarPreview(DUMMY_AVATAR);
      
    } catch (error) {
      console.error('Error fetching profile from API:', error);
      // Don't show error if we already have data from sessionStorage
      const storedUser = getUserFromSession();
      if (!storedUser) {
        toast.error('Failed to load profile. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAvatarClick = () => {
    if (isEditing) {
      fileInputRef.current?.click();
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB');
        return;
      }

      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error('Please select an image file');
        return;
      }

      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedData({
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      phone: userData.phone,
    });
    // Reset to dummy avatar
    setAvatarPreview(DUMMY_AVATAR);
    setAvatarFile(null);
  };

  const handleSave = async () => {
    try {
      setSaving(true);

      // Upload avatar if changed
      if (avatarFile) {
        await userService.uploadAvatar(avatarFile);
      }

      // Update profile data
      await userService.updateUserProfile(editedData);

      // Update local state
      const updatedData = {
        ...userData,
        ...editedData,
      };

      setUserData(updatedData);

      // Update sessionStorage
      const storedUser = getUserFromSession();
      const updatedUser = {
        ...storedUser,
        ...editedData
      };
      sessionStorage.setItem("user", JSON.stringify(updatedUser));

      // Also update individual fields in sessionStorage
      sessionStorage.setItem("userName", `${editedData.firstName} ${editedData.lastName}`.trim());
      sessionStorage.setItem("userEmail", editedData.email);

      setIsEditing(false);
      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error('Failed to update profile. Please try again.');
      console.error('Error updating profile:', error);
    } finally {
      setSaving(false);
    }
  };

  const getInitials = () => {
    return `${editedData.firstName?.[0] || ''}${editedData.lastName?.[0] || ''}`.toUpperCase();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-semibold">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        .animate-fadeIn { animation: fadeIn 0.6s ease-out; }
        .animate-slideUp { animation: slideUp 0.8s ease-out; }
        .animate-scaleIn { animation: scaleIn 0.5s ease-out; }
        .input-focus {
          transition: all 0.3s ease;
        }
        .input-focus:focus {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(34, 197, 94, 0.2);
        }
        .avatar-upload-overlay {
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .avatar-container:hover .avatar-upload-overlay {
          opacity: 1;
        }
        .shimmer {
          animation: shimmer 2s infinite;
          background: linear-gradient(
            to right,
            transparent 0%,
            rgba(255, 255, 255, 0.3) 50%,
            transparent 100%
          );
          background-size: 1000px 100%;
        }
      `}</style>

      <ToastContainer position="top-right" autoClose={3000} />

      {/* Header/Navbar */}
      <nav className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 shadow-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center gap-2 hover:bg-white/10 px-3 py-2 rounded-lg transition-all duration-300"
            >
              <FaArrowLeft className="w-5 h-5" />
              <span className="font-semibold">Back</span>
            </button>
            <div className="h-8 w-px bg-white/30"></div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <FaFutbol className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold">Turf Nation</span>
            </div>
          </div>
          
          <h1 className="text-2xl font-bold">My Profile</h1>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Profile Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden animate-slideUp border-2 border-green-100">
          
          {/* Header Section with Gradient */}
          <div className="h-40 bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            {/* Decorative Elements */}
            <div className="absolute top-4 right-4 text-white/20 text-6xl">⚽</div>
            <div className="absolute bottom-4 left-4 text-white/20 text-5xl">🏀</div>
          </div>

          {/* Avatar Section */}
          <div className="relative px-8 pb-8">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between">
              {/* Avatar */}
              <div className="relative -mt-20 animate-scaleIn">
                <div 
                  className={`avatar-container w-40 h-40 rounded-full border-6 border-white shadow-2xl overflow-hidden bg-gradient-to-br from-green-400 to-emerald-500 ${isEditing ? 'cursor-pointer' : ''} group`}
                  onClick={handleAvatarClick}
                >
                  <img 
                    src={avatarPreview} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Upload Overlay */}
                  {isEditing && (
                    <div className="avatar-upload-overlay absolute inset-0 bg-black/60 flex items-center justify-center">
                      <div className="text-center">
                        <FaCamera className="w-8 h-8 text-white mx-auto mb-2" />
                        <p className="text-white text-sm font-semibold">Change Photo</p>
                      </div>
                    </div>
                  )}
                </div>
                
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
              </div>

              {/* Action Buttons */}
              <div className="mt-6 md:mt-0 md:mb-4 flex gap-3">
                {!isEditing ? (
                  <button
                    onClick={handleEdit}
                    className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2"
                  >
                    <FaEdit className="w-5 h-5" />
                    Edit Profile
                  </button>
                ) : (
                  <>
                    <button
                      onClick={handleCancel}
                      className="px-6 py-3 bg-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-300 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 flex items-center gap-2"
                      disabled={saving}
                    >
                      <FaTimes className="w-5 h-5" />
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={saving}
                    >
                      {saving ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Saving...
                        </>
                      ) : (
                        <>
                          <FaSave className="w-5 h-5" />
                          Save Changes
                        </>
                      )}
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Profile Form */}
            <div className="mt-8 space-y-6">
              {/* Name Section */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* First Name */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-gray-700 font-semibold text-sm">
                    <FaUser className="w-4 h-4 text-green-600" />
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={editedData.firstName}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300 ${
                      isEditing 
                        ? 'border-green-300 bg-white input-focus' 
                        : 'border-gray-200 bg-gray-50 cursor-not-allowed'
                    }`}
                    placeholder="Enter first name"
                  />
                </div>

                {/* Last Name */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-gray-700 font-semibold text-sm">
                    <FaUser className="w-4 h-4 text-green-600" />
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={editedData.lastName}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300 ${
                      isEditing 
                        ? 'border-green-300 bg-white input-focus' 
                        : 'border-gray-200 bg-gray-50 cursor-not-allowed'
                    }`}
                    placeholder="Enter last name"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-gray-700 font-semibold text-sm">
                  <FaEnvelope className="w-4 h-4 text-green-600" />
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={editedData.email}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300 ${
                    isEditing 
                      ? 'border-green-300 bg-white input-focus' 
                      : 'border-gray-200 bg-gray-50 cursor-not-allowed'
                  }`}
                  placeholder="Enter email address"
                />
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-gray-700 font-semibold text-sm">
                  <FaPhone className="w-4 h-4 text-green-600" />
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={editedData.phone}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300 ${
                    isEditing 
                      ? 'border-green-300 bg-white input-focus' 
                      : 'border-gray-200 bg-gray-50 cursor-not-allowed'
                  }`}
                  placeholder="Enter phone number"
                />
              </div>
            </div>

            {/* Info Banner */}
            {isEditing && (
              <div className="mt-6 p-4 bg-green-50 border-2 border-green-200 rounded-xl animate-fadeIn">
                <p className="text-green-800 text-sm flex items-start gap-2">
                  <span className="text-xl">💡</span>
                  <span>
                    <strong>Tip:</strong> Make sure to save your changes before leaving this page. 
                    Click on the avatar to upload a new profile picture (max 5MB).
                  </span>
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Additional Info Cards */}
        <div className="grid md:grid-cols-2 gap-6 mt-8 animate-fadeIn" style={{ animationDelay: '0.2s' }}>
          {/* Account Stats */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-green-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center text-white">
                📊
              </span>
              Account Information
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Member Since</span>
                <span className="font-semibold text-gray-800">January 2025</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Bookings</span>
                <span className="font-semibold text-green-600">12</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Account Status</span>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">Active</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-green-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center text-white">
                ⚡
              </span>
              Quick Actions
            </h3>
            <div className="space-y-3">
              <button 
                onClick={() => navigate('/mybooking')}
                className="w-full px-4 py-3 bg-green-50 text-green-700 font-semibold rounded-lg hover:bg-green-100 transition-all duration-300 text-left"
              >
                View My Bookings →
              </button>
              <button 
                onClick={() => navigate('/dashboard')}
                className="w-full px-4 py-3 bg-green-50 text-green-700 font-semibold rounded-lg hover:bg-green-100 transition-all duration-300 text-left"
              >
                Browse Turfs →
              </button>
              <button className="w-full px-4 py-3 bg-green-50 text-green-700 font-semibold rounded-lg hover:bg-green-100 transition-all duration-300 text-left">
                Change Password →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
