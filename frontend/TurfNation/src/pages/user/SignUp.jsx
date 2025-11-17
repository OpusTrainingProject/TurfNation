
// import React, { useState } from "react";
// import { sendOtp, verifyOtp, signUp } from "../../services/authservice/Register";
// import { toast } from 'react-toastify';
// import { Link } from 'react-router-dom';
// import 'react-toastify/dist/ReactToastify.css';
// import { FaEnvelope, FaLock, FaPhone, FaUser, FaCheckCircle, FaArrowRight } from 'react-icons/fa';

// export default function SignUp() {
//   const [otpSent, setOtpSent] = useState(false);
//   const [otp, setOtp] = useState("");
//   const [password, setPassword] = useState("");
//   const [verifyPassword, setVerifyPassword] = useState("");
//   const [passwordError, setPasswordError] = useState("");
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");
//   const [isOtpVerified, setIsOtpVerified] = useState(false);
//   const [focusedField, setFocusedField] = useState(null);

//   // ✅ Send OTP
//   const handleSendOtp = async () => {
//     if (!email) {
//       toast.error("Please enter your email first!", {
//         position: "top-right",
//         autoClose: 3000
//       });
//       return;
//     }
//     await sendOtp(email, setOtpSent);
//   };

//   // ✅ Verify OTP
//   const handleVerifyOtp = async () => {
//     if (!otp) {
//       toast.error("Please enter the OTP", {
//         position: "top-right",
//         autoClose: 3000
//       });
//       return;
//     }
//     await verifyOtp(email, otp, setIsOtpVerified);
//   };

//   // ✅ Handle Passwords
//   const handlePasswordChange = (e) => {
//     setPassword(e.target.value);
//     if (verifyPassword && e.target.value !== verifyPassword)
//       setPasswordError("Passwords do not match");
//     else setPasswordError("");
//   };

//   const handleVerifyPasswordChange = (e) => {
//     setVerifyPassword(e.target.value);
//     if (password && e.target.value !== password)
//       setPasswordError("Passwords do not match");
//     else setPasswordError("");
//   };

//   // ✅ Submit Signup Form
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!isOtpVerified) {
//       toast.error("Please verify OTP before signing up!", {
//         position: "top-right",
//         autoClose: 3000
//       });
//       return;
//     }

//     if (passwordError) {
//       toast.error("Please fix password issues before submitting!", {
//         position: "top-right",
//         autoClose: 3000
//       });
//       return;
//     }

//     const userData = { firstName, lastName, email, phone, password };
//     await signUp(userData);
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-green-100 relative overflow-hidden py-8">
//       {/* Animated Background Elements */}
//       <div className="absolute inset-0 overflow-hidden">
//         <div className="absolute top-0 -left-4 w-72 h-72 bg-green-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
//         <div className="absolute top-0 -right-4 w-72 h-72 bg-green-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
//         <div className="absolute -bottom-8 left-20 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
//       </div>

//       {/* Main Container */}
//       <div className="relative z-10 w-[95%] max-w-5xl">
//         <div className="backdrop-blur-xl bg-white/80 border border-green-200/50 shadow-2xl rounded-3xl flex flex-col md:flex-row overflow-hidden transform transition-all duration-500 hover:shadow-green-200/50">
          
//           {/* Left Panel - Branding */}
//           <div className="md:w-2/5 bg-gradient-to-br from-green-600 via-green-500 to-green-400 flex flex-col items-center justify-center p-12 text-white relative overflow-hidden">
//             {/* Decorative circles */}
//             <div className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-pulse"></div>
//             <div className="absolute bottom-10 left-10 w-40 h-40 bg-white/10 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
            
//             <div className="relative z-10 text-center space-y-6 animate-fadeInUp">
//               <div className="mb-6">
//                 <div className="w-20 h-20 mx-auto bg-white/20 backdrop-blur-lg rounded-2xl flex items-center justify-center mb-4 transform transition-transform duration-300 hover:scale-110 hover:rotate-6">
//                   <span className="text-5xl">🎯</span>
//                 </div>
//               </div>
              
//               <h1 className="text-5xl font-black mb-4 tracking-tight drop-shadow-2xl">
//                 Join Us
//               </h1>
              
//               <div className="w-16 h-1 bg-white/50 mx-auto rounded-full"></div>
              
//               <p className="text-lg leading-relaxed opacity-95 font-medium">
//                 Create your account and start booking your favorite turfs today
//               </p>
              
//               <div className="flex items-center justify-center gap-3 pt-4">
//                 <span className="text-3xl animate-bounce">🏃‍♀️‍➡️</span>
//                 <span className="text-2xl">→</span>
//                 <span className="text-3xl animate-bounce animation-delay-1000">🏆</span>
//               </div>
//             </div>
//           </div>

//           {/* Right Panel - Signup Form */}
//           <div className="md:w-3/5 p-8 md:p-10 flex flex-col justify-center bg-gradient-to-br from-white via-green-50/30 to-white max-h-[90vh] overflow-y-auto">
//             <div className="max-w-md mx-auto w-full space-y-6 animate-fadeInRight">
              
//               {/* Header */}
//               <div className="text-center space-y-2">
//                 <h2 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
//                   Create Account
//                 </h2>
//                 <p className="text-gray-600 font-medium">Fill in your details to get started</p>
//               </div>

//               {/* Form */}
//               <form onSubmit={handleSubmit} className="space-y-4">
                
//                 {/* Name Fields - Side by Side */}
//                 <div className="grid grid-cols-2 gap-3">
//                   <div className="group">
//                     <label className="block text-gray-700 font-semibold mb-2 text-sm tracking-wide">
//                       First Name
//                     </label>
//                     <div className="relative">
//                       <div className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-300 ${
//                         focusedField === 'firstName' ? 'text-green-500' : 'text-gray-400'
//                       }`}>
//                         <FaUser className="w-4 h-4" />
//                       </div>
//                       <input
//                         type="text"
//                         placeholder="First name"
//                         value={firstName}
//                         onChange={(e) => setFirstName(e.target.value)}
//                         onFocus={() => setFocusedField('firstName')}
//                         onBlur={() => setFocusedField(null)}
//                         className="w-full pl-10 pr-3 py-2.5 border-2 border-gray-200 rounded-xl 
//                         focus:outline-none focus:border-green-400 focus:ring-4 focus:ring-green-100 
//                         transition-all duration-300 bg-white/80 backdrop-blur-sm
//                         placeholder:text-gray-400 font-medium text-sm
//                         hover:border-green-300 hover:shadow-md"
//                       />
//                     </div>
//                   </div>

//                   <div className="group">
//                     <label className="block text-gray-700 font-semibold mb-2 text-sm tracking-wide">
//                       Last Name
//                     </label>
//                     <div className="relative">
//                       <div className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-300 ${
//                         focusedField === 'lastName' ? 'text-green-500' : 'text-gray-400'
//                       }`}>
//                         <FaUser className="w-4 h-4" />
//                       </div>
//                       <input
//                         type="text"
//                         placeholder="Last name"
//                         value={lastName}
//                         onChange={(e) => setLastName(e.target.value)}
//                         onFocus={() => setFocusedField('lastName')}
//                         onBlur={() => setFocusedField(null)}
//                         className="w-full pl-10 pr-3 py-2.5 border-2 border-gray-200 rounded-xl 
//                         focus:outline-none focus:border-green-400 focus:ring-4 focus:ring-green-100 
//                         transition-all duration-300 bg-white/80 backdrop-blur-sm
//                         placeholder:text-gray-400 font-medium text-sm
//                         hover:border-green-300 hover:shadow-md"
//                       />
//                     </div>
//                   </div>
//                 </div>

//                 {/* Email & OTP Section */}
//                 <div className="group">
//                   <label className="block text-gray-700 font-semibold mb-2 text-sm tracking-wide">
//                     Email Address
//                   </label>
//                   <div className="flex gap-2">
//                     <div className="relative flex-1">
//                       <div className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-300 ${
//                         focusedField === 'email' ? 'text-green-500' : 'text-gray-400'
//                       }`}>
//                         <FaEnvelope className="w-4 h-4" />
//                       </div>
//                       <input
//                         type="email"
//                         placeholder="you@example.com"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         onFocus={() => setFocusedField('email')}
//                         onBlur={() => setFocusedField(null)}
//                         className="w-full pl-10 pr-3 py-2.5 border-2 border-gray-200 rounded-xl 
//                         focus:outline-none focus:border-green-400 focus:ring-4 focus:ring-green-100 
//                         transition-all duration-300 bg-white/80 backdrop-blur-sm
//                         placeholder:text-gray-400 font-medium text-sm
//                         hover:border-green-300 hover:shadow-md"
//                       />
//                     </div>
//                     <button
//                       type="button"
//                       onClick={handleSendOtp}
//                       disabled={otpSent}
//                       className={`px-4 py-2.5 rounded-xl font-semibold text-sm whitespace-nowrap
//                       transition-all duration-300 transform hover:scale-105
//                       ${otpSent 
//                         ? "bg-gray-400 text-white cursor-not-allowed" 
//                         : "bg-gradient-to-r from-green-600 to-green-500 text-white hover:from-green-700 hover:to-green-600 shadow-md hover:shadow-green-500/50"
//                       }`}
//                     >
//                       {otpSent ? "✓ Sent" : "Send OTP"}
//                     </button>
//                   </div>

//                   {/* OTP Verification */}
//                   {otpSent && (
//                     <div className="mt-3 flex gap-2 animate-fadeInDown">
//                       <input
//                         type="text"
//                         placeholder="Enter 6-digit OTP"
//                         value={otp}
//                         onChange={(e) => setOtp(e.target.value)}
//                         maxLength="6"
//                         className="flex-1 p-2.5 border-2 border-gray-200 rounded-xl 
//                         focus:outline-none focus:border-green-400 focus:ring-4 focus:ring-green-100 
//                         transition-all duration-300 bg-white/80 backdrop-blur-sm
//                         placeholder:text-gray-400 font-medium text-sm text-center tracking-widest
//                         hover:border-green-300 hover:shadow-md"
//                       />
//                       <button
//                         type="button"
//                         onClick={handleVerifyOtp}
//                         disabled={isOtpVerified}
//                         className={`px-4 py-2.5 rounded-xl font-semibold text-sm whitespace-nowrap
//                         transition-all duration-300 transform hover:scale-105 flex items-center gap-2
//                         ${isOtpVerified
//                           ? "bg-green-500 text-white cursor-not-allowed"
//                           : "bg-gradient-to-r from-green-600 to-green-500 text-white hover:from-green-700 hover:to-green-600 shadow-md hover:shadow-green-500/50"
//                         }`}
//                       >
//                         {isOtpVerified ? (
//                           <>
//                             <FaCheckCircle className="w-4 h-4" />
//                             Verified
//                           </>
//                         ) : (
//                           "Verify"
//                         )}
//                       </button>
//                     </div>
//                   )}
//                 </div>

//                 {/* Phone */}
//                 <div className="group">
//                   <label className="block text-gray-700 font-semibold mb-2 text-sm tracking-wide">
//                     Phone Number
//                   </label>
//                   <div className="relative">
//                     <div className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-300 ${
//                       focusedField === 'phone' ? 'text-green-500' : 'text-gray-400'
//                     }`}>
//                       <FaPhone className="w-4 h-4" />
//                     </div>
//                     <input
//                       type="tel"
//                       placeholder="123-456-7890"
//                       value={phone}
//                       onChange={(e) => setPhone(e.target.value)}
//                       onFocus={() => setFocusedField('phone')}
//                       onBlur={() => setFocusedField(null)}
//                       className="w-full pl-10 pr-3 py-2.5 border-2 border-gray-200 rounded-xl 
//                       focus:outline-none focus:border-green-400 focus:ring-4 focus:ring-green-100 
//                       transition-all duration-300 bg-white/80 backdrop-blur-sm
//                       placeholder:text-gray-400 font-medium text-sm
//                       hover:border-green-300 hover:shadow-md"
//                     />
//                   </div>
//                 </div>

//                 {/* Password Fields */}
//                 <div className="group">
//                   <label className="block text-gray-700 font-semibold mb-2 text-sm tracking-wide">
//                     Password
//                   </label>
//                   <div className="relative">
//                     <div className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-300 ${
//                       focusedField === 'password' ? 'text-green-500' : 'text-gray-400'
//                     }`}>
//                       <FaLock className="w-4 h-4" />
//                     </div>
//                     <input
//                       type="password"
//                       placeholder="••••••••"
//                       value={password}
//                       onChange={handlePasswordChange}
//                       onFocus={() => setFocusedField('password')}
//                       onBlur={() => setFocusedField(null)}
//                       className="w-full pl-10 pr-3 py-2.5 border-2 border-gray-200 rounded-xl 
//                       focus:outline-none focus:border-green-400 focus:ring-4 focus:ring-green-100 
//                       transition-all duration-300 bg-white/80 backdrop-blur-sm
//                       placeholder:text-gray-400 font-medium text-sm
//                       hover:border-green-300 hover:shadow-md"
//                     />
//                   </div>
//                 </div>

//                 <div className="group">
//                   <label className="block text-gray-700 font-semibold mb-2 text-sm tracking-wide">
//                     Confirm Password
//                   </label>
//                   <div className="relative">
//                     <div className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-300 ${
//                       focusedField === 'verifyPassword' ? 'text-green-500' : 'text-gray-400'
//                     }`}>
//                       <FaLock className="w-4 h-4" />
//                     </div>
//                     <input
//                       type="password"
//                       placeholder="••••••••"
//                       value={verifyPassword}
//                       onChange={handleVerifyPasswordChange}
//                       onFocus={() => setFocusedField('verifyPassword')}
//                       onBlur={() => setFocusedField(null)}
//                       className={`w-full pl-10 pr-3 py-2.5 border-2 rounded-xl 
//                       focus:outline-none focus:ring-4 
//                       transition-all duration-300 bg-white/80 backdrop-blur-sm
//                       placeholder:text-gray-400 font-medium text-sm
//                       hover:shadow-md
//                       ${passwordError 
//                         ? 'border-red-400 focus:border-red-500 focus:ring-red-100' 
//                         : 'border-gray-200 focus:border-green-400 focus:ring-green-100 hover:border-green-300'
//                       }`}
//                     />
//                   </div>
//                   {passwordError && (
//                     <p className="text-red-500 text-xs mt-1 ml-1 flex items-center gap-1 animate-shake">
//                       <span>⚠️</span> {passwordError}
//                     </p>
//                   )}
//                 </div>

//                 {/* Submit Button */}
//                 <button
//                   type="submit"
//                   className="w-full py-3.5 rounded-xl font-bold text-white text-lg
//                   transition-all duration-300 transform
//                   flex items-center justify-center gap-3 group mt-6
//                   bg-gradient-to-r from-green-600 to-green-500 
//                   hover:from-green-700 hover:to-green-600 
//                   hover:scale-[1.02] hover:shadow-xl hover:shadow-green-500/50 
//                   active:scale-[0.98]"
//                 >
//                   Create Account
//                   <FaArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
//                 </button>
//               </form>

//               {/* Divider */}
//               <div className="relative">
//                 <div className="absolute inset-0 flex items-center">
//                   <div className="w-full border-t border-gray-200"></div>
//                 </div>
//               </div>

//               {/* Sign In Link */}
//               {/* <p className="text-center text-gray-600 font-medium">
//                 Already have an account?{" "}
//                 <a
//                   href="/signin"
//                   className="text-green-600 hover:text-green-700 font-bold hover:underline 
//                   decoration-2 underline-offset-4 transition-all duration-300
//                   inline-flex items-center gap-1 group"
//                 >
//                   Sign In
//                   <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
//                 </a>
//               </p> */}

//               <p className="text-center text-gray-600 font-medium">
//                   Don't have an account?{" "}
//                   <Link
//                     to="/signin"
//                     className="text-green-600 hover:text-green-700 font-bold hover:underline 
//                     decoration-2 underline-offset-4 transition-all duration-300
//                     inline-flex items-center gap-1 group"
//                   >
//                     Sign In
//                     <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
//                   </Link>
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";
import { sendOtp, verifyOtp, signUp } from "../../services/authservice/Register";
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { FaEnvelope, FaLock, FaPhone, FaUser, FaCheckCircle, FaArrowRight, FaShieldAlt } from 'react-icons/fa';

export default function SignUp() {
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Send OTP
  const handleSendOtp = async () => {
    if (!email) {
      toast.error("Please enter your email first!", {
        position: "top-right",
        autoClose: 3000
      });
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address!", {
        position: "top-right",
        autoClose: 3000
      });
      return;
    }
    
    await sendOtp(email, setOtpSent);
  };

  // Verify OTP
  const handleVerifyOtp = async () => {
    if (!otp) {
      toast.error("Please enter the OTP", {
        position: "top-right",
        autoClose: 3000
      });
      return;
    }
    
    if (otp.length !== 6) {
      toast.error("OTP must be 6 digits", {
        position: "top-right",
        autoClose: 3000
      });
      return;
    }
    
    await verifyOtp(email, otp, setIsOtpVerified);
  };

  // Handle Passwords
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (verifyPassword && e.target.value !== verifyPassword)
      setPasswordError("Passwords do not match");
    else setPasswordError("");
  };

  const handleVerifyPasswordChange = (e) => {
    setVerifyPassword(e.target.value);
    if (password && e.target.value !== password)
      setPasswordError("Passwords do not match");
    else setPasswordError("");
  };

  // Validate form
  const validateForm = () => {
    if (!firstName.trim()) {
      toast.error("First name is required!");
      return false;
    }
    if (!lastName.trim()) {
      toast.error("Last name is required!");
      return false;
    }
    if (!email.trim()) {
      toast.error("Email is required!");
      return false;
    }
    if (!phone.trim()) {
      toast.error("Phone number is required!");
      return false;
    }
    if (phone.length < 10) {
      toast.error("Phone number must be at least 10 digits!");
      return false;
    }
    if (!password) {
      toast.error("Password is required!");
      return false;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters!");
      return false;
    }
    if (!verifyPassword) {
      toast.error("Please confirm your password!");
      return false;
    }
    return true;
  };

  // Submit Signup Form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isOtpVerified) {
      toast.error("Please verify OTP before signing up!", {
        position: "top-right",
        autoClose: 3000
      });
      return;
    }

    if (passwordError) {
      toast.error("Please fix password issues before submitting!", {
        position: "top-right",
        autoClose: 3000
      });
      return;
    }

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    const userData = { firstName, lastName, email, phone, password };
    await signUp(userData);
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-emerald-50 relative overflow-hidden py-8 px-4">
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-green-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-emerald-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInRight {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
        .animation-delay-1000 { animation-delay: 1s; }
        .animate-fadeInUp { animation: fadeInUp 0.8s ease-out; }
        .animate-fadeInRight { animation: fadeInRight 0.8s ease-out; }
        .animate-fadeInDown { animation: fadeInDown 0.5s ease-out; }
        .animate-shake { animation: shake 0.5s ease-in-out; }
      `}</style>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-6xl">
        <div className="backdrop-blur-xl bg-white/90 border-2 border-green-100 shadow-2xl rounded-3xl flex flex-col lg:flex-row overflow-hidden">
          
          {/* Left Panel - Branding */}
          <div className="lg:w-2/5 bg-gradient-to-br from-green-600 via-green-500 to-emerald-500 flex flex-col items-center justify-center p-12 text-white relative overflow-hidden">
            
            {/* Decorative circles */}
            <div className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-pulse"></div>
            <div className="absolute bottom-10 left-10 w-40 h-40 bg-white/10 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
            
            <div className="relative z-10 text-center space-y-6 animate-fadeInUp">
              <div className="mb-6">
                <div className="w-24 h-24 mx-auto bg-white/20 backdrop-blur-lg rounded-2xl flex items-center justify-center mb-4 transform transition-transform duration-300 hover:scale-110 hover:rotate-6 shadow-xl">
                  <span className="text-6xl">⚽</span>
                </div>
              </div>
              
              <h1 className="text-5xl font-black mb-4 tracking-tight drop-shadow-2xl">
                Welcome to<br/>Turf Nation
              </h1>
              
              <div className="w-20 h-1 bg-white/60 mx-auto rounded-full"></div>
              
              <p className="text-lg leading-relaxed opacity-95 font-medium px-4">
                Create your account and start booking premium turfs across your city
              </p>
              
              <div className="flex items-center justify-center gap-4 pt-6">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <FaShieldAlt className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-semibold">Secure</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <FaCheckCircle className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-semibold">Verified</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center animate-bounce">
                    <span className="text-2xl">🏆</span>
                  </div>
                  <span className="text-xs font-semibold">Premium</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Signup Form */}
          <div className="lg:w-3/5 p-8 lg:p-12 flex flex-col justify-center bg-gradient-to-br from-white via-green-50/20 to-white max-h-[90vh] overflow-y-auto custom-scrollbar">
            <div className="max-w-md mx-auto w-full space-y-6 animate-fadeInRight">
              
              {/* Header */}
              <div className="text-center space-y-2 mb-8">
                <h2 className="text-4xl font-black bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">
                  Create Account
                </h2>
                <p className="text-gray-600 font-medium">Fill in your details to get started</p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* Name Fields - Side by Side */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="group">
                    <label className="block text-gray-700 font-bold mb-2 text-sm">
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300 ${
                        focusedField === 'firstName' ? 'text-green-500' : 'text-gray-400'
                      }`}>
                        <FaUser className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        placeholder="First name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        onFocus={() => setFocusedField('firstName')}
                        onBlur={() => setFocusedField(null)}
                        disabled={isSubmitting}
                        className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl 
                        focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100 
                        transition-all duration-300 bg-white
                        placeholder:text-gray-400 font-medium
                        hover:border-green-300 hover:shadow-md
                        disabled:opacity-50 disabled:cursor-not-allowed"
                        required
                      />
                    </div>
                  </div>

                  <div className="group">
                    <label className="block text-gray-700 font-bold mb-2 text-sm">
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300 ${
                        focusedField === 'lastName' ? 'text-green-500' : 'text-gray-400'
                      }`}>
                        <FaUser className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        placeholder="Last name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        onFocus={() => setFocusedField('lastName')}
                        onBlur={() => setFocusedField(null)}
                        disabled={isSubmitting}
                        className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl 
                        focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100 
                        transition-all duration-300 bg-white
                        placeholder:text-gray-400 font-medium
                        hover:border-green-300 hover:shadow-md
                        disabled:opacity-50 disabled:cursor-not-allowed"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Email & OTP Section */}
                <div className="group">
                  <label className="block text-gray-700 font-bold mb-2 text-sm">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300 ${
                        focusedField === 'email' ? 'text-green-500' : 'text-gray-400'
                      }`}>
                        <FaEnvelope className="w-4 h-4" />
                      </div>
                      <input
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                        disabled={otpSent || isSubmitting}
                        className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl 
                        focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100 
                        transition-all duration-300 bg-white
                        placeholder:text-gray-400 font-medium
                        hover:border-green-300 hover:shadow-md
                        disabled:opacity-50 disabled:cursor-not-allowed"
                        required
                      />
                    </div>
                    <button
                      type="button"
                      onClick={handleSendOtp}
                      disabled={otpSent || !email}
                      className={`px-5 py-3 rounded-xl font-bold text-sm whitespace-nowrap
                      transition-all duration-300 transform hover:scale-105
                      ${otpSent 
                        ? "bg-green-500 text-white cursor-not-allowed flex items-center gap-2" 
                        : "bg-gradient-to-r from-green-600 to-emerald-500 text-white hover:from-green-700 hover:to-emerald-600 shadow-lg hover:shadow-green-500/50"
                      } disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none`}
                    >
                      {otpSent ? (
                        <>
                          <FaCheckCircle className="w-4 h-4" />
                          Sent
                        </>
                      ) : (
                        "Send OTP"
                      )}
                    </button>
                  </div>

                  {/* OTP Verification */}
                  {otpSent && (
                    <div className="mt-3 flex gap-2 animate-fadeInDown">
                      <input
                        type="text"
                        placeholder="Enter 6-digit OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                        maxLength="6"
                        disabled={isOtpVerified || isSubmitting}
                        className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl 
                        focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100 
                        transition-all duration-300 bg-white
                        placeholder:text-gray-400 font-bold text-center tracking-widest text-lg
                        hover:border-green-300 hover:shadow-md
                        disabled:opacity-50 disabled:cursor-not-allowed"
                      />
                      <button
                        type="button"
                        onClick={handleVerifyOtp}
                        disabled={isOtpVerified || !otp || isSubmitting}
                        className={`px-5 py-3 rounded-xl font-bold text-sm whitespace-nowrap
                        transition-all duration-300 transform hover:scale-105 flex items-center gap-2
                        ${isOtpVerified
                          ? "bg-green-500 text-white cursor-not-allowed"
                          : "bg-gradient-to-r from-green-600 to-emerald-500 text-white hover:from-green-700 hover:to-emerald-600 shadow-lg hover:shadow-green-500/50"
                        } disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none`}
                      >
                        {isOtpVerified ? (
                          <>
                            <FaCheckCircle className="w-5 h-5" />
                            Verified
                          </>
                        ) : (
                          "Verify"
                        )}
                      </button>
                    </div>
                  )}
                </div>

                {/* Phone */}
                <div className="group">
                  <label className="block text-gray-700 font-bold mb-2 text-sm">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300 ${
                      focusedField === 'phone' ? 'text-green-500' : 'text-gray-400'
                    }`}>
                      <FaPhone className="w-4 h-4" />
                    </div>
                    <input
                      type="tel"
                      placeholder="1234567890"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                      onFocus={() => setFocusedField('phone')}
                      onBlur={() => setFocusedField(null)}
                      disabled={isSubmitting}
                      maxLength="10"
                      className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl 
                      focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100 
                      transition-all duration-300 bg-white
                      placeholder:text-gray-400 font-medium
                      hover:border-green-300 hover:shadow-md
                      disabled:opacity-50 disabled:cursor-not-allowed"
                      required
                    />
                  </div>
                </div>

                {/* Password Fields */}
                <div className="group">
                  <label className="block text-gray-700 font-bold mb-2 text-sm">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300 ${
                      focusedField === 'password' ? 'text-green-500' : 'text-gray-400'
                    }`}>
                      <FaLock className="w-4 h-4" />
                    </div>
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={handlePasswordChange}
                      onFocus={() => setFocusedField('password')}
                      onBlur={() => setFocusedField(null)}
                      disabled={isSubmitting}
                      className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl 
                      focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100 
                      transition-all duration-300 bg-white
                      placeholder:text-gray-400 font-medium
                      hover:border-green-300 hover:shadow-md
                      disabled:opacity-50 disabled:cursor-not-allowed"
                      required
                      minLength="6"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1 ml-1">Minimum 6 characters</p>
                </div>

                <div className="group">
                  <label className="block text-gray-700 font-bold mb-2 text-sm">
                    Confirm Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300 ${
                      focusedField === 'verifyPassword' ? (passwordError ? 'text-red-500' : 'text-green-500') : 'text-gray-400'
                    }`}>
                      <FaLock className="w-4 h-4" />
                    </div>
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={verifyPassword}
                      onChange={handleVerifyPasswordChange}
                      onFocus={() => setFocusedField('verifyPassword')}
                      onBlur={() => setFocusedField(null)}
                      disabled={isSubmitting}
                      className={`w-full pl-11 pr-4 py-3 border-2 rounded-xl 
                      focus:outline-none focus:ring-4 
                      transition-all duration-300 bg-white
                      placeholder:text-gray-400 font-medium
                      hover:shadow-md
                      disabled:opacity-50 disabled:cursor-not-allowed
                      ${passwordError 
                        ? 'border-red-400 focus:border-red-500 focus:ring-red-100' 
                        : 'border-gray-200 focus:border-green-500 focus:ring-green-100 hover:border-green-300'
                      }`}
                      required
                    />
                  </div>
                  {passwordError && (
                    <p className="text-red-500 text-sm mt-1.5 ml-1 flex items-center gap-1.5 animate-shake font-medium">
                      <span>⚠️</span> {passwordError}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting || !isOtpVerified}
                  className="w-full py-4 rounded-xl font-bold text-white text-lg
                  transition-all duration-300 transform
                  flex items-center justify-center gap-3 group mt-6
                  bg-gradient-to-r from-green-600 to-emerald-500 
                  hover:from-green-700 hover:to-emerald-600 
                  hover:scale-[1.02] hover:shadow-2xl hover:shadow-green-500/50 
                  active:scale-[0.98]
                  disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Creating Account...
                    </>
                  ) : (
                    <>
                      Create Account
                      <FaArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </>
                  )}
                </button>
              </form>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t-2 border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500 font-medium">Already registered?</span>
                </div>
              </div>

              {/* Sign In Link */}
              <p className="text-center text-gray-600 font-medium">
                Already have an account?{" "}
                <Link
                  to="/signin"
                  className="text-green-600 hover:text-green-700 font-bold hover:underline 
                  decoration-2 underline-offset-4 transition-all duration-300
                  inline-flex items-center gap-1 group"
                >
                  Sign In
                  <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #10b981;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #059669;
        }
      `}</style>
    </div>
  );
}
