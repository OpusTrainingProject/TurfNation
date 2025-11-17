

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

    // Validation
    if (!email || !password) {
      toast.warn("Please enter both email and password!", { 
        position: "top-right",
        autoClose: 3000 
      });
      return;
    }

    try {
      setLoading(true);
      const response = await signInUser(email, password);
      
      // Extract token and user from response
      // Backend returns Map: { "token": "...", "user": {...} }
      const token = response.token || response.Token;
      const user = response.user || response.User;
      
      // Validate token and user exist
      if (!token) {
        throw new Error("No token received from server");
      }

      if (!user) {
        throw new Error("No user data received from server");
      }

      // Store token in sessionStorage
      sessionStorage.setItem("token", token);
      
      // Store user object in sessionStorage
      sessionStorage.setItem("user", JSON.stringify(user));

      // Optional: Store individual user fields for easy access
      sessionStorage.setItem("userId", user.userId || user.id);
      sessionStorage.setItem("userEmail", user.email);
      sessionStorage.setItem("userName", `${user.firstName || ''} ${user.lastName || ''}`.trim());

      // Decode token to get role
      let decoded;
      try {
        decoded = jwtDecode(token);
      } catch (decodeError) {
        console.error("Token decode error:", decodeError);
        throw new Error("Invalid token format");
      }

      // Extract role from token or user object
      const role = decoded.userRole || decoded.role || user.role || user.userRole;
      
      if (!role) {
        throw new Error("No role found in token or user data");
      }

      // Show success message with user name
      const userName = user.firstName || user.name || "User";
      toast.success(`Welcome back, ${userName}! 🌿`, {
        position: "top-right",
        autoClose: 2000
      });

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
