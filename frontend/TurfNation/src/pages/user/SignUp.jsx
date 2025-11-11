import React, { useState } from "react";
import sportsKit from "../../assets/images/image3.jpg";
import { sendOtp, verifyOtp, signUp } from "../../services/authservice/Register";
import toast from "react-hot-toast";

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

  // ✅ Send OTP
  const handleSendOtp = async () => {
    if (!email) {
      toast.error("Please enter your email first!");
      return;
    }
    await sendOtp(email, setOtpSent);
  };

  // ✅ Verify OTP
  const handleVerifyOtp = async () => {
    if (!otp) {
      toast.error("Please enter the otp")
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
      toast.error("Please verify OTP before signing up!");
      return;
    }

    if (passwordError) {
      toast.error("Please fix password issues before submitting!");
      return;
    }

    const userData = { firstName, lastName, email, phone, password };
    await signUp(userData);
  };

  return (
    <div
      className="h-screen w-screen bg-cover bg-center bg-no-repeat flex items-center justify-start relative overflow-hidden"
      style={{ backgroundImage: `url(${sportsKit})` }}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Signup Form */}
      <div className="relative z-10 w-full sm:w-3/5 md:w-2/5 lg:w-1/3 h-full flex flex-col justify-center p-10 bg-white/15 backdrop-blur-lg rounded-r-3xl shadow-2xl animate-slideInLeft">
        <h2 className="text-4xl font-bold text-white mb-6 text-center">
          Sign Up
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-white">
          {/* Name Fields */}
          <div className="flex gap-2">
            <div className="flex-1">
              <label className="block font-medium mb-2">First Name</label>
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-xl bg-white/30 text-black placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-300"
              />
            </div>
            <div className="flex-1">
              <label className="block font-medium mb-2">Last Name</label>
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-xl bg-white/30 text-black placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-300"
              />
            </div>
          </div>

          {/* Email & OTP Section */}
          <div>
            <label className="block font-medium mb-2">Email</label>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="you@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 p-3 border border-gray-300 rounded-xl bg-white/30 text-black placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-300"
              />
              <button
                type="button"
                onClick={handleSendOtp}
                disabled={otpSent}
                className={`${
                  otpSent ? "bg-gray-500" : "bg-green-600 hover:bg-green-700"
                } text-white px-4 py-3 rounded-xl transition-all duration-300 font-semibold`}
              >
                {otpSent ? "Sent" : "Send OTP"}
              </button>
            </div>

            {otpSent && (
              <div className="mt-2 flex gap-2">
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-1/2 p-2 border border-gray-300 rounded-xl bg-white/30 text-black placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-300 text-center"
                />
                <button
                  type="button"
                  onClick={handleVerifyOtp}
                  disabled={isOtpVerified}
                  className={`${
                    isOtpVerified ? "bg-gray-500" : "bg-green-600 hover:bg-green-700"
                  } text-white px-4 py-3 rounded-xl transition-all duration-300 font-semibold`}
                >
                  {isOtpVerified ? "Verified" : "Verify"}
                </button>
              </div>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="block font-medium mb-2">Phone</label>
            <input
              type="tel"
              placeholder="123-456-7890"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-xl bg-white/30 text-black placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-300"
            />
          </div>

          {/* Password Fields */}
          <div>
            <label className="block font-medium mb-2">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={handlePasswordChange}
              className="w-full p-3 border border-gray-300 rounded-xl bg-white/30 text-black placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-300"
            />
          </div>

          <div>
            <label className="block font-medium mb-2">Verify Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={verifyPassword}
              onChange={handleVerifyPasswordChange}
              className="w-full p-3 border border-gray-300 rounded-xl bg-white/30 text-black placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-300"
            />
            {passwordError && (
              <p className="text-red-400 text-sm mt-1">{passwordError}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-green-600 text-white py-3 rounded-xl mt-4 hover:bg-green-700 transform hover:scale-[1.03] transition-all duration-300 shadow-md hover:shadow-green-400/50 font-semibold"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-white mt-6">
          Already have an account?{" "}
          <a
            href="/signin"
            className="text-green-300 hover:underline font-semibold"
          >
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
}
