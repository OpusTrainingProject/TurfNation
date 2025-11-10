import img from "../../assets/images/signin.png"
export default function SignIn() {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-fixed bg-cover bg-center bg-no-repeat relative overflow-hidden animate-fadeIn"
      style={{
        backgroundImage: `url(${img})`,
      }}
    >
      {/* green color for bkgrnd */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-900/60 via-green-700/40 to-transparent"></div>

      <div className="relative z-10 backdrop-blur-2xl bg-green-100/10 border border-green-200/40 shadow-[0_0_30px_rgba(0,128,0,0.3)] rounded-2xl flex flex-col md:flex-row w-[90%] max-w-4xl overflow-hidden animate-glow">
        
        {/* moto and app name */}
        <div className="md:w-1/2 bg-green-800/70 flex flex-col items-center justify-center p-10 text-white animate-slideInLeft">
          <h1 className="text-5xl font-extrabold mb-4 tracking-wide drop-shadow-lg">
            Turf Nation
          </h1>
          <p className="text-lg text-center max-w-sm leading-relaxed">
            🏃‍♀️‍➡️ Book your turf now  🏃‍♂️
          </p>
        </div>

        {/* loginform */}
        <div className="md:w-1/2 p-10 flex flex-col justify-center bg-green-50/30 backdrop-blur-md animate-slideInRight">
          <h2 className="text-3xl font-semibold text-green-800 mb-6 text-center">
            Sign In
          </h2>

          <form className="flex flex-col gap-4">
            <div>
              <label className="block text-gray-800 font-medium mb-2">Email</label>
              <input
                type="email"
                placeholder="you@gmail.com"
                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-300 bg-white/80"
              />
            </div>

            <div>
              <label className="block text-gray-800 font-medium mb-2">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-300 bg-white/80"
              />
            </div>

            <button
              type="submit"
              className="bg-green-600 text-white py-3 rounded-xl mt-4 hover:bg-green-700 transform hover:scale-[1.03] transition-all duration-300 shadow-md hover:shadow-green-400/50 font-semibold"
            >
              Sign In
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
