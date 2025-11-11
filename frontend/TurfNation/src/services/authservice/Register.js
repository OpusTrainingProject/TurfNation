const BASE_URL = "http://localhost:8888/auth";
import toast from "react-hot-toast";

// ✅ Send OTP
export const sendOtp = async (email, setOtpSent) => {
  try {
    const res = await fetch(`${BASE_URL}/send-otp/${email}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ email }),
    });

    if (res.ok) {
      toast.success("OTP sent successfully!");
      if (setOtpSent) setOtpSent(true);
    } else {
      const msg = await res.text();
      toast.error("Failed to send OTP: " + msg);
    }
  } catch (err) {
    console.error("Error sending OTP:", err);
    toast.error("Something went wrong while sending OTP");
  }
};

// ✅ Verify OTP
export const verifyOtp = async (email, otp, setIsOtpVerified) => {
  try {
    const res = await fetch(`${BASE_URL}/verify-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp }),
    });

    if (res.ok) {
      toast.success("OTP Verified!");
      if (setIsOtpVerified) setIsOtpVerified(true);
    } else {
      const msg = await res.text();
      toast.error("Invalid OTP: " + msg);
    }
  } catch (err) {
    console.error("Error verifying OTP:", err);
    toast.error("Something went wrong while verifying OTP");
  }
};

// ✅ Sign Up
export const signUp = async (userData) => {
  try {
    const res = await fetch(`${BASE_URL}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    if (res.ok) {
      toast.success("Signup successful!");
      window.location.href = "/signin";
    } else {
      const msg = await res.text();
      toast.error("Signup failed: " + msg);
    }
  } catch (err) {
    console.error("Error during signup:", err);
    toast.error("Something went wrong during signup");
  }
};
