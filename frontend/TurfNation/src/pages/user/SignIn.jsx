// import img from "../../assets/images/image1.jpg"
// export default function SignIn() {
//   return (
//     <div
//       className="min-h-screen flex items-center justify-center bg-fixed bg-cover bg-center bg-no-repeat relative overflow-hidden animate-fadeIn"
//       style={{
//         backgroundImage: `url(${img})`,
//       }}
//     >
//       {/* green color for bkgrnd */}
//       <div className="absolute inset-0 bg-gradient-to-br from-green-900/60 via-green-700/40 to-transparent"></div>

//       <div className="relative z-10 backdrop-blur-2xl bg-green-100/10 border border-green-200/40 shadow-[0_0_30px_rgba(0,128,0,0.3)] rounded-2xl flex flex-col md:flex-row w-[90%] max-w-4xl overflow-hidden animate-glow">
        
//         {/* moto and app name */}
//         <div className="md:w-1/2 bg-green-800/70 flex flex-col items-center justify-center p-10 text-white animate-slideInLeft">
//           <h1 className="text-5xl font-extrabold mb-4 tracking-wide drop-shadow-lg">
//             Turf Nation
//           </h1>
//           <p className="text-lg text-center max-w-sm leading-relaxed">
//             🏃‍♀️‍➡️ Book your turf now  🏃‍♂️
//           </p>
//         </div>

//         {/* loginform */}
//         <div className="md:w-1/2 p-10 flex flex-col justify-center bg-green-50/30 backdrop-blur-md animate-slideInRight">
//           <h2 className="text-3xl font-semibold text-green-800 mb-6 text-center">
//             Sign In
//           </h2>

//           <form className="flex flex-col gap-4">
//             <div>
//               <label className="block text-gray-800 font-medium mb-2">Email</label>
//               <input
//                 type="email"
//                 placeholder="you@gmail.com"
//                 className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-300 bg-white/80"
//               />
//             </div>

//             <div>
//               <label className="block text-gray-800 font-medium mb-2">Password</label>
//               <input
//                 type="password"
//                 placeholder="••••••••"
//                 className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-300 bg-white/80"
//               />
//             </div>

            
//           {/* Role */}
//           {/* <div>
//             <label className="block font-medium mb-2">Role</label>
//             <select className="w-full p-3 border border-gray-300 rounded-xl bg-white/30 text-black focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-300">
//               <option className="" value="USER">User</option>
//               <option className="" value="ADMIN">Admin</option>
//             </select>
//           </div> */}

//           {/* <div>
//   <label className="block font-semibold mb-2 text-gray-700 tracking-wide">
//     Role
//   </label>
//   <div className="relative">
//     <select
//       className="w-full p-3 border border-gray-300 rounded-xl 
//       bg-gradient-to-r from-white/70 to-green-50 
//       text-gray-800 font-medium 
//       shadow-md backdrop-blur-md 
//       focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-300
//       appearance-none transition-all duration-300 ease-in-out 
//       hover:scale-[1.02] hover:shadow-lg cursor-pointer"
//     >
//       <option
//         className="bg-white text-gray-800 hover:bg-green-100 transition-all"
//         value="USER"
//       >
//         🧍 User
//       </option>
//       <option
//         className="bg-white text-gray-800 hover:bg-green-100 transition-all"
//         value="ADMIN"
//       >
//         ⚙️ Admin
//       </option>
//     </select>

//   </div>
// </div> */}


//             <button
//               type="submit"
//               className="bg-green-600 text-white py-3 rounded-xl mt-4 hover:bg-green-700 transform hover:scale-[1.03] transition-all duration-300 shadow-md hover:shadow-green-400/50 font-semibold"
//             >
//               Sign In
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
// import React, { useState } from "react";
// import img from "../../assets/images/image1.jpg";
// import { signInUser } from "../../services/authservice/SignIn";
// import toast from "react-hot-toast";

// export default function SignIn() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!email || !password) {
//       toast.error("Please enter both email and password!");
//       return;
//     }

//     try {
//       setLoading(true);
//       toast.loading("Signing in...", { id: "signin" });

//       const res = await signInUser(email, password);

//       // Try parsing response as JSON, or get text if not JSON
//       const text = await res.body();
//       const data = text ? JSON.parse(text) : null;

//       if (res.ok) {
//         toast.success("Welcome back 🌿", { id: "signin" });

//         // Store JWT token if present
//         if (data?.token) {
//           sessionStorage.setItem("token", data.token);
//         }

//         // Redirect after a short delay
//         setTimeout(() => {
//           window.location.href = "/";
//         }, 1000);
//       } else {
//         toast.error(data?.message || "Invalid credentials 😞", { id: "signin" });
//       }
//     } catch (error) {
//       console.error("Error during sign in:", error);
//       toast.error("Server error. Try again later.", { id: "signin" });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div
//       className="min-h-screen flex items-center justify-center bg-fixed bg-cover bg-center bg-no-repeat relative overflow-hidden animate-fadeIn"
//       style={{
//         backgroundImage: `url(${img})`,
//       }}
//     >
//       {/* background overlay */}
//       <div className="absolute inset-0 bg-gradient-to-br from-green-900/60 via-green-700/40 to-transparent"></div>

//       <div className="relative z-10 backdrop-blur-2xl bg-green-100/10 border border-green-200/40 shadow-[0_0_30px_rgba(0,128,0,0.3)] rounded-2xl flex flex-col md:flex-row w-[90%] max-w-4xl overflow-hidden animate-glow">
//         {/* Left side - Branding */}
//         <div className="md:w-1/2 bg-green-800/70 flex flex-col items-center justify-center p-10 text-white animate-slideInLeft">
//           <h1 className="text-5xl font-extrabold mb-4 tracking-wide drop-shadow-lg">
//             Turf Nation
//           </h1>
//           <p className="text-lg text-center max-w-sm leading-relaxed">
//             🏃‍♀️‍➡️ Book your turf now 🏃‍♂️
//           </p>
//         </div>

//         {/* Right side - Form */}
//         <div className="md:w-1/2 p-10 flex flex-col justify-center bg-green-50/30 backdrop-blur-md animate-slideInRight">
//           <h2 className="text-3xl font-semibold text-green-800 mb-6 text-center">
//             Sign In
//           </h2>

//           <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//             <div>
//               <label className="block text-gray-800 font-medium mb-2">
//                 Email
//               </label>
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

 <label className="block text-gray-800 font-medium mb-2">
                Email
              </label>

              

import React, { useState } from "react";
import img from "../../assets/images/image1.jpg";
import { signInUser } from "../../services/authservice/SignIn";
import toast from "react-hot-toast";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please enter both email and password!", { id: "signin" });
      return;
    }

    try {
      setLoading(true);
      const token = await signInUser(email, password);

      toast.success("Welcome back 🌿");
      sessionStorage.setItem("token", token.token || token);
      console.log("Login success. Token:", token);
      setTimeout(() => {
  window.location.href = "/";
}, 800);
    } catch (error) {
      toast.error("Invalid credentials 😞", { id: "signin" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-fixed bg-cover bg-center bg-no-repeat relative overflow-hidden animate-fadeIn"
      style={{ backgroundImage: `url(${img})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-green-900/60 via-green-700/40 to-transparent"></div>

      <div className="relative z-10 backdrop-blur-2xl bg-green-100/10 border border-green-200/40 shadow-[0_0_30px_rgba(0,128,0,0.3)] rounded-2xl flex flex-col md:flex-row w-[90%] max-w-4xl overflow-hidden animate-glow">
        <div className="md:w-1/2 bg-green-800/70 flex flex-col items-center justify-center p-10 text-white animate-slideInLeft">
          <h1 className="text-5xl font-extrabold mb-4 tracking-wide drop-shadow-lg">
            Turf Nation
          </h1>
          <p className="text-lg text-center max-w-sm leading-relaxed">
            🏃‍♀️‍➡️ Book your turf now 🏃‍♂️
          </p>
        </div>

        <div className="md:w-1/2 p-10 flex flex-col justify-center bg-green-50/30 backdrop-blur-md animate-slideInRight">
          <h2 className="text-3xl font-semibold text-green-800 mb-6 text-center">
            Sign In
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
           <div>
               <label className="block text-gray-800 font-medium mb-2">
                 Email
             </label>
              <input
                type="email"
                placeholder="you@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-300 bg-white/80"
              />
            </div>

            <div>
              <label className="block text-gray-800 font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-300 bg-white/80"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`${
                loading
                  ? "bg-green-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700 hover:scale-[1.03]"
              } text-white py-3 rounded-xl mt-4 transition-all duration-300 shadow-md hover:shadow-green-400/50 font-semibold`}
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          <p className="text-center text-gray-700 mt-6">
            Don’t have an account?{" "}
            <a
              href="/signup"
              className="text-green-700 hover:underline font-semibold"
            >
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
