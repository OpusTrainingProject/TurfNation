
//  <label className="block text-gray-800 font-medium mb-2">
//                 Email
//               </label>

              

// import React, { useState } from "react";
// import img from "../../assets/images/image1.jpg";
// import { signInUser } from "../../services/authservice/SignIn";
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// export default function SignIn() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!email || !password) {
//       toast.warn("Please enter both email and password!", { id: "signin" });
//       return;
//     }

//     try {
//       setLoading(true);
//       const token = await signInUser(email, password);

//       toast.success("Welcome back 🌿");
//       sessionStorage.setItem("token", token.token || token);
//       console.log("Login success. Token:", token);
//       setTimeout(() => {
//   window.location.href = "/";
// }, 800);
//     } catch (error) {
//       toast.error("Invalid credentials 😞", { id: "signin" });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div
//       className="min-h-screen flex items-center justify-center bg-fixed bg-cover bg-center bg-no-repeat relative overflow-hidden animate-fadeIn"
//       style={{ backgroundImage: `url(${img})` }}
//     >
//       <div className="absolute inset-0 bg-gradient-to-br from-green-900/60 via-green-700/40 to-transparent"></div>

//       <div className="relative z-10 backdrop-blur-2xl bg-green-100/10 border border-green-200/40 shadow-[0_0_30px_rgba(0,128,0,0.3)] rounded-2xl flex flex-col md:flex-row w-[90%] max-w-4xl overflow-hidden animate-glow">
//         <div className="md:w-1/2 bg-green-800/70 flex flex-col items-center justify-center p-10 text-white animate-slideInLeft">
//           <h1 className="text-5xl font-extrabold mb-4 tracking-wide drop-shadow-lg">
//             Turf Nation
//           </h1>
//           <p className="text-lg text-center max-w-sm leading-relaxed">
//             🏃‍♀️‍➡️ Book your turf now 🏃‍♂️
//           </p>
//         </div>

//         <div className="md:w-1/2 p-10 flex flex-col justify-center bg-green-50/30 backdrop-blur-md animate-slideInRight">
//           <h2 className="text-3xl font-semibold text-green-800 mb-6 text-center">
//             Sign In
//           </h2>

//           <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//            <div>
//                <label className="block text-gray-800 font-medium mb-2">
//                  Email
//              </label>
//               <input
//                 type="email"
//                 placeholder="you@gmail.com"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-300 bg-white/80"
//               />
//             </div>

//             <div>
//               <label className="block text-gray-800 font-medium mb-2">
//                 Password
//               </label>
//               <input
//                 type="password"
//                 placeholder="••••••••"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-300 bg-white/80"
//               />
//             </div>

//             <button
//               type="submit"
//               disabled={loading}
//               className={`${
//                 loading
//                   ? "bg-green-400 cursor-not-allowed"
//                   : "bg-green-600 hover:bg-green-700 hover:scale-[1.03]"
//               } text-white py-3 rounded-xl mt-4 transition-all duration-300 shadow-md hover:shadow-green-400/50 font-semibold`}
//             >
//               {loading ? "Signing In..." : "Sign In"}
//             </button>
//           </form>

//           <p className="text-center text-gray-700 mt-6">
//             Don’t have an account?{" "}
//             <a
//               href="/signup"
//               className="text-green-700 hover:underline font-semibold"
//             >
//               Sign Up
//             </a>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";
import { signInUser } from "../../services/authservice/SignIn";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEnvelope, FaLock, FaArrowRight } from 'react-icons/fa';

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.warn("Please enter both email and password!", { 
        position: "top-right",
        autoClose: 3000 
      });
      return;
    }

    try {
      setLoading(true);
      const token = await signInUser(email, password);

      toast.success("Welcome back 🌿", {
        position: "top-right",
        autoClose: 2000
      });
      
      sessionStorage.setItem("token", token.token || token);
      console.log("Login success. Token:", token);
      
      setTimeout(() => {
        window.location.href = "/";
      }, 800);
    } catch (error) {
      toast.error("Invalid credentials 😞", { 
        position: "top-right",
        autoClose: 3000 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-green-100 relative overflow-hidden">
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
                  <span className="text-5xl">⚽</span>
                </div>
              </div>
              
              <h1 className="text-5xl font-black mb-4 tracking-tight drop-shadow-2xl">
                Turf Nation
              </h1>
              
              <div className="w-16 h-1 bg-white/50 mx-auto rounded-full"></div>
              
              <p className="text-lg leading-relaxed opacity-95 font-medium">
                Your ultimate destination for hassle-free turf booking
              </p>
              
              <div className="flex items-center justify-center gap-3 pt-4">
                <span className="text-3xl animate-bounce">🏃‍♂️</span>
                <span className="text-2xl">→</span>
                <span className="text-3xl animate-bounce animation-delay-1000">⚽</span>
              </div>
            </div>
          </div>

          {/* Right Panel - Login Form */}
          <div className="md:w-3/5 p-10 md:p-12 flex flex-col justify-center bg-gradient-to-br from-white via-green-50/30 to-white">
            <div className="max-w-md mx-auto w-full space-y-8 animate-fadeInRight">
              
              {/* Header */}
              <div className="text-center space-y-2">
                <h2 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
                  Welcome Back
                </h2>
                <p className="text-gray-600 font-medium">Sign in to continue your journey</p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Email Field */}
                <div className="group">
                  <label className="block text-gray-700 font-semibold mb-2 text-sm tracking-wide">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300 ${
                      focusedField === 'email' ? 'text-green-500' : 'text-gray-400'
                    }`}>
                      <FaEnvelope className="w-5 h-5" />
                    </div>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl 
                      focus:outline-none focus:border-green-400 focus:ring-4 focus:ring-green-100 
                      transition-all duration-300 bg-white/80 backdrop-blur-sm
                      placeholder:text-gray-400 font-medium
                      hover:border-green-300 hover:shadow-md"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="group">
                  <label className="block text-gray-700 font-semibold mb-2 text-sm tracking-wide">
                    Password
                  </label>
                  <div className="relative">
                    <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300 ${
                      focusedField === 'password' ? 'text-green-500' : 'text-gray-400'
                    }`}>
                      <FaLock className="w-5 h-5" />
                    </div>
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onFocus={() => setFocusedField('password')}
                      onBlur={() => setFocusedField(null)}
                      className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl 
                      focus:outline-none focus:border-green-400 focus:ring-4 focus:ring-green-100 
                      transition-all duration-300 bg-white/80 backdrop-blur-sm
                      placeholder:text-gray-400 font-medium
                      hover:border-green-300 hover:shadow-md"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-4 rounded-xl font-bold text-white text-lg
                  transition-all duration-300 transform
                  flex items-center justify-center gap-3 group
                  ${loading
                    ? "bg-green-300 cursor-not-allowed"
                    : "bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 hover:scale-[1.02] hover:shadow-xl hover:shadow-green-500/50 active:scale-[0.98]"
                  }`}
                >
                  {loading ? (
                    <>
                      <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Signing In...
                    </>
                  ) : (
                    <>
                      Sign In
                      <FaArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </>
                  )}
                </button>
              </form>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
              </div>

              {/* Sign Up Link */}
              <p className="text-center text-gray-600 font-medium">
                Don't have an account?{" "}
                <a
                  href="/signup"
                  className="text-green-600 hover:text-green-700 font-bold hover:underline 
                  decoration-2 underline-offset-4 transition-all duration-300
                  inline-flex items-center gap-1 group"
                >
                  Sign Up
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
