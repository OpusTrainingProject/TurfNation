// import React, { useState } from "react";
// import sportsKit from "../../assets/images/image3.jpg";
// import { sendOtp, verifyOtp, signUp } from "../../services/authservice/Register";
// import toast from "react-hot-toast";

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

//   // ✅ Send OTP
//   const handleSendOtp = async () => {
//     if (!email) {
//       toast.error("Please enter your email first!");
//       return;
//     }
//     await sendOtp(email, setOtpSent);
//   };

//   // ✅ Verify OTP
//   const handleVerifyOtp = async () => {
//     if (!otp) {
//       toast.error("Please enter the otp")
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
//       toast.error("Please verify OTP before signing up!");
//       return;
//     }

//     if (passwordError) {
//       toast.error("Please fix password issues before submitting!");
//       return;
//     }

//     const userData = { firstName, lastName, email, phone, password };
//     await signUp(userData);
//   };

//   return (
//     <div
//       className="h-screen w-screen bg-cover bg-center bg-no-repeat flex items-center justify-start relative overflow-hidden"
//       style={{ backgroundImage: `url(${sportsKit})` }}
//     >
//       {/* Background Overlay */}
//       <div className="absolute inset-0 bg-black/50"></div>

//       {/* Signup Form */}
//       <div className="relative z-10 w-full sm:w-3/5 md:w-2/5 lg:w-1/3 h-full flex flex-col justify-center p-10 bg-white/15 backdrop-blur-lg rounded-r-3xl shadow-2xl animate-slideInLeft">
//         <h2 className="text-4xl font-bold text-white mb-6 text-center">
//           Sign Up
//         </h2>

//         <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-white">
//           {/* Name Fields */}
//           <div className="flex gap-2">
//             <div className="flex-1">
//               <label className="block font-medium mb-2">First Name</label>
//               <input
//                 type="text"
//                 placeholder="First Name"
//                 value={firstName}
//                 onChange={(e) => setFirstName(e.target.value)}
//                 className="w-full p-3 border border-gray-300 rounded-xl bg-white/30 text-black placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-300"
//               />
//             </div>
//             <div className="flex-1">
//               <label className="block font-medium mb-2">Last Name</label>
//               <input
//                 type="text"
//                 placeholder="Last Name"
//                 value={lastName}
//                 onChange={(e) => setLastName(e.target.value)}
//                 className="w-full p-3 border border-gray-300 rounded-xl bg-white/30 text-black placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-300"
//               />
//             </div>
//           </div>

//           {/* Email & OTP Section */}
//           <div>
//             <label className="block font-medium mb-2">Email</label>
//             <div className="flex gap-2">
//               <input
//                 type="email"
//                 placeholder="you@gmail.com"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="flex-1 p-3 border border-gray-300 rounded-xl bg-white/30 text-black placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-300"
//               />
//               <button
//                 type="button"
//                 onClick={handleSendOtp}
//                 disabled={otpSent}
//                 className={`${
//                   otpSent ? "bg-gray-500" : "bg-green-600 hover:bg-green-700"
//                 } text-white px-4 py-3 rounded-xl transition-all duration-300 font-semibold`}
//               >
//                 {otpSent ? "Sent" : "Send OTP"}
//               </button>
//             </div>

//             {otpSent && (
//               <div className="mt-2 flex gap-2">
//                 <input
//                   type="text"
//                   placeholder="Enter OTP"
//                   value={otp}
//                   onChange={(e) => setOtp(e.target.value)}
//                   className="w-1/2 p-2 border border-gray-300 rounded-xl bg-white/30 text-black placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-300 text-center"
//                 />
//                 <button
//                   type="button"
//                   onClick={handleVerifyOtp}
//                   disabled={isOtpVerified}
//                   className={`${
//                     isOtpVerified ? "bg-gray-500" : "bg-green-600 hover:bg-green-700"
//                   } text-white px-4 py-3 rounded-xl transition-all duration-300 font-semibold`}
//                 >
//                   {isOtpVerified ? "Verified" : "Verify"}
//                 </button>
//               </div>
//             )}
//           </div>

//           {/* Phone */}
//           <div>
//             <label className="block font-medium mb-2">Phone</label>
//             <input
//               type="tel"
//               placeholder="123-456-7890"
//               value={phone}
//               onChange={(e) => setPhone(e.target.value)}
//               className="w-full p-3 border border-gray-300 rounded-xl bg-white/30 text-black placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-300"
//             />
//           </div>

//           {/* Password Fields */}
//           <div>
//             <label className="block font-medium mb-2">Password</label>
//             <input
//               type="password"
//               placeholder="••••••••"
//               value={password}
//               onChange={handlePasswordChange}
//               className="w-full p-3 border border-gray-300 rounded-xl bg-white/30 text-black placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-300"
//             />
//           </div>

//           <div>
//             <label className="block font-medium mb-2">Verify Password</label>
//             <input
//               type="password"
//               placeholder="••••••••"
//               value={verifyPassword}
//               onChange={handleVerifyPasswordChange}
//               className="w-full p-3 border border-gray-300 rounded-xl bg-white/30 text-black placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-300"
//             />
//             {passwordError && (
//               <p className="text-red-400 text-sm mt-1">{passwordError}</p>
//             )}
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             className="bg-green-600 text-white py-3 rounded-xl mt-4 hover:bg-green-700 transform hover:scale-[1.03] transition-all duration-300 shadow-md hover:shadow-green-400/50 font-semibold"
//           >
//             Sign Up
//           </button>
//         </form>

//         <p className="text-center text-white mt-6">
//           Already have an account?{" "}
//           <a
//             href="/signin"
//             className="text-green-300 hover:underline font-semibold"
//           >
//             Sign In
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";
import { sendOtp, verifyOtp, signUp } from "../../services/authservice/Register";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEnvelope, FaLock, FaPhone, FaUser, FaCheckCircle, FaArrowRight } from 'react-icons/fa';

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

  // ✅ Send OTP
  const handleSendOtp = async () => {
    if (!email) {
      toast.error("Please enter your email first!", {
        position: "top-right",
        autoClose: 3000
      });
      return;
    }
    await sendOtp(email, setOtpSent);
  };

  // ✅ Verify OTP
  const handleVerifyOtp = async () => {
    if (!otp) {
      toast.error("Please enter the OTP", {
        position: "top-right",
        autoClose: 3000
      });
      return;
    }
    await verifyOtp(email, otp, setIsOtpVerified);
  };

  // ✅ Handle Passwords
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

  // ✅ Submit Signup Form
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

    const userData = { firstName, lastName, email, phone, password };
    await signUp(userData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-green-100 relative overflow-hidden py-8">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-green-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-green-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      {/* Main Container */}
      <div className="relative z-10 w-[95%] max-w-5xl">
        <div className="backdrop-blur-xl bg-white/80 border border-green-200/50 shadow-2xl rounded-3xl flex flex-col md:flex-row overflow-hidden transform transition-all duration-500 hover:shadow-green-200/50">
          
          {/* Left Panel - Branding */}
          <div className="md:w-2/5 bg-gradient-to-br from-green-600 via-green-500 to-green-400 flex flex-col items-center justify-center p-12 text-white relative overflow-hidden">
            {/* Decorative circles */}
            <div className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-pulse"></div>
            <div className="absolute bottom-10 left-10 w-40 h-40 bg-white/10 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
            
            <div className="relative z-10 text-center space-y-6 animate-fadeInUp">
              <div className="mb-6">
                <div className="w-20 h-20 mx-auto bg-white/20 backdrop-blur-lg rounded-2xl flex items-center justify-center mb-4 transform transition-transform duration-300 hover:scale-110 hover:rotate-6">
                  <span className="text-5xl">🎯</span>
                </div>
              </div>
              
              <h1 className="text-5xl font-black mb-4 tracking-tight drop-shadow-2xl">
                Join Us
              </h1>
              
              <div className="w-16 h-1 bg-white/50 mx-auto rounded-full"></div>
              
              <p className="text-lg leading-relaxed opacity-95 font-medium">
                Create your account and start booking your favorite turfs today
              </p>
              
              <div className="flex items-center justify-center gap-3 pt-4">
                <span className="text-3xl animate-bounce">🏃‍♀️‍➡️</span>
                <span className="text-2xl">→</span>
                <span className="text-3xl animate-bounce animation-delay-1000">🏆</span>
              </div>
            </div>
          </div>

          {/* Right Panel - Signup Form */}
          <div className="md:w-3/5 p-8 md:p-10 flex flex-col justify-center bg-gradient-to-br from-white via-green-50/30 to-white max-h-[90vh] overflow-y-auto">
            <div className="max-w-md mx-auto w-full space-y-6 animate-fadeInRight">
              
              {/* Header */}
              <div className="text-center space-y-2">
                <h2 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
                  Create Account
                </h2>
                <p className="text-gray-600 font-medium">Fill in your details to get started</p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Name Fields - Side by Side */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="group">
                    <label className="block text-gray-700 font-semibold mb-2 text-sm tracking-wide">
                      First Name
                    </label>
                    <div className="relative">
                      <div className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-300 ${
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
                        className="w-full pl-10 pr-3 py-2.5 border-2 border-gray-200 rounded-xl 
                        focus:outline-none focus:border-green-400 focus:ring-4 focus:ring-green-100 
                        transition-all duration-300 bg-white/80 backdrop-blur-sm
                        placeholder:text-gray-400 font-medium text-sm
                        hover:border-green-300 hover:shadow-md"
                      />
                    </div>
                  </div>

                  <div className="group">
                    <label className="block text-gray-700 font-semibold mb-2 text-sm tracking-wide">
                      Last Name
                    </label>
                    <div className="relative">
                      <div className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-300 ${
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
                        className="w-full pl-10 pr-3 py-2.5 border-2 border-gray-200 rounded-xl 
                        focus:outline-none focus:border-green-400 focus:ring-4 focus:ring-green-100 
                        transition-all duration-300 bg-white/80 backdrop-blur-sm
                        placeholder:text-gray-400 font-medium text-sm
                        hover:border-green-300 hover:shadow-md"
                      />
                    </div>
                  </div>
                </div>

                {/* Email & OTP Section */}
                <div className="group">
                  <label className="block text-gray-700 font-semibold mb-2 text-sm tracking-wide">
                    Email Address
                  </label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <div className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-300 ${
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
                        className="w-full pl-10 pr-3 py-2.5 border-2 border-gray-200 rounded-xl 
                        focus:outline-none focus:border-green-400 focus:ring-4 focus:ring-green-100 
                        transition-all duration-300 bg-white/80 backdrop-blur-sm
                        placeholder:text-gray-400 font-medium text-sm
                        hover:border-green-300 hover:shadow-md"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={handleSendOtp}
                      disabled={otpSent}
                      className={`px-4 py-2.5 rounded-xl font-semibold text-sm whitespace-nowrap
                      transition-all duration-300 transform hover:scale-105
                      ${otpSent 
                        ? "bg-gray-400 text-white cursor-not-allowed" 
                        : "bg-gradient-to-r from-green-600 to-green-500 text-white hover:from-green-700 hover:to-green-600 shadow-md hover:shadow-green-500/50"
                      }`}
                    >
                      {otpSent ? "✓ Sent" : "Send OTP"}
                    </button>
                  </div>

                  {/* OTP Verification */}
                  {otpSent && (
                    <div className="mt-3 flex gap-2 animate-fadeInDown">
                      <input
                        type="text"
                        placeholder="Enter 6-digit OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        maxLength="6"
                        className="flex-1 p-2.5 border-2 border-gray-200 rounded-xl 
                        focus:outline-none focus:border-green-400 focus:ring-4 focus:ring-green-100 
                        transition-all duration-300 bg-white/80 backdrop-blur-sm
                        placeholder:text-gray-400 font-medium text-sm text-center tracking-widest
                        hover:border-green-300 hover:shadow-md"
                      />
                      <button
                        type="button"
                        onClick={handleVerifyOtp}
                        disabled={isOtpVerified}
                        className={`px-4 py-2.5 rounded-xl font-semibold text-sm whitespace-nowrap
                        transition-all duration-300 transform hover:scale-105 flex items-center gap-2
                        ${isOtpVerified
                          ? "bg-green-500 text-white cursor-not-allowed"
                          : "bg-gradient-to-r from-green-600 to-green-500 text-white hover:from-green-700 hover:to-green-600 shadow-md hover:shadow-green-500/50"
                        }`}
                      >
                        {isOtpVerified ? (
                          <>
                            <FaCheckCircle className="w-4 h-4" />
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
                  <label className="block text-gray-700 font-semibold mb-2 text-sm tracking-wide">
                    Phone Number
                  </label>
                  <div className="relative">
                    <div className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-300 ${
                      focusedField === 'phone' ? 'text-green-500' : 'text-gray-400'
                    }`}>
                      <FaPhone className="w-4 h-4" />
                    </div>
                    <input
                      type="tel"
                      placeholder="123-456-7890"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      onFocus={() => setFocusedField('phone')}
                      onBlur={() => setFocusedField(null)}
                      className="w-full pl-10 pr-3 py-2.5 border-2 border-gray-200 rounded-xl 
                      focus:outline-none focus:border-green-400 focus:ring-4 focus:ring-green-100 
                      transition-all duration-300 bg-white/80 backdrop-blur-sm
                      placeholder:text-gray-400 font-medium text-sm
                      hover:border-green-300 hover:shadow-md"
                    />
                  </div>
                </div>

                {/* Password Fields */}
                <div className="group">
                  <label className="block text-gray-700 font-semibold mb-2 text-sm tracking-wide">
                    Password
                  </label>
                  <div className="relative">
                    <div className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-300 ${
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
                      className="w-full pl-10 pr-3 py-2.5 border-2 border-gray-200 rounded-xl 
                      focus:outline-none focus:border-green-400 focus:ring-4 focus:ring-green-100 
                      transition-all duration-300 bg-white/80 backdrop-blur-sm
                      placeholder:text-gray-400 font-medium text-sm
                      hover:border-green-300 hover:shadow-md"
                    />
                  </div>
                </div>

                <div className="group">
                  <label className="block text-gray-700 font-semibold mb-2 text-sm tracking-wide">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <div className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-300 ${
                      focusedField === 'verifyPassword' ? 'text-green-500' : 'text-gray-400'
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
                      className={`w-full pl-10 pr-3 py-2.5 border-2 rounded-xl 
                      focus:outline-none focus:ring-4 
                      transition-all duration-300 bg-white/80 backdrop-blur-sm
                      placeholder:text-gray-400 font-medium text-sm
                      hover:shadow-md
                      ${passwordError 
                        ? 'border-red-400 focus:border-red-500 focus:ring-red-100' 
                        : 'border-gray-200 focus:border-green-400 focus:ring-green-100 hover:border-green-300'
                      }`}
                    />
                  </div>
                  {passwordError && (
                    <p className="text-red-500 text-xs mt-1 ml-1 flex items-center gap-1 animate-shake">
                      <span>⚠️</span> {passwordError}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl font-bold text-white text-lg
                  transition-all duration-300 transform
                  flex items-center justify-center gap-3 group mt-6
                  bg-gradient-to-r from-green-600 to-green-500 
                  hover:from-green-700 hover:to-green-600 
                  hover:scale-[1.02] hover:shadow-xl hover:shadow-green-500/50 
                  active:scale-[0.98]"
                >
                  Create Account
                  <FaArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </form>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
              </div>

              {/* Sign In Link */}
              <p className="text-center text-gray-600 font-medium">
                Already have an account?{" "}
                <a
                  href="/signin"
                  className="text-green-600 hover:text-green-700 font-bold hover:underline 
                  decoration-2 underline-offset-4 transition-all duration-300
                  inline-flex items-center gap-1 group"
                >
                  Sign In
                  <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
