import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaFutbol, FaCalendarCheck, FaClock, FaShieldAlt, FaEnvelope, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import chaitanya from "../../assets/images/my2.jpg"
import anand from "../../assets/images/anand.jpg"
import tushar from "../../assets/images/tushar.jpg"
import jainam from "../../assets/images/jainam.jpg"


const HomePage = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  
  // Stats animation states
  const [isStatsVisible, setIsStatsVisible] = useState(false);
  const [hasStatsAnimated, setHasStatsAnimated] = useState(false);
  const [counts, setCounts] = useState({
    turfs: 0,
    customers: 0,
    bookings: 0,
    support: 0
  });
  
  const statsRef = useRef(null);

  const statsTargets = {
    turfs: 500,
    customers: 10000,
    bookings: 50000,
    support: 24
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for Stats Section
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStatsAnimated) {
          setIsStatsVisible(true);
          setHasStatsAnimated(true);
        }
      },
      {
        threshold: 0.3,
        rootMargin: '0px'
      }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current);
      }
    };
  }, [hasStatsAnimated]);

  // Animate Stats Counter
  useEffect(() => {
    if (!isStatsVisible) return;

    const animateValue = (key, start, end, duration) => {
      const startTime = Date.now();
      const endTime = startTime + duration;

      const timer = setInterval(() => {
        const now = Date.now();
        const remaining = Math.max(0, endTime - now);
        const progress = Math.min(1, 1 - remaining / duration);
        
        // Ease-out cubic function for smooth deceleration
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentValue = Math.round(start + (end - start) * easeOut);

        setCounts(prev => ({
          ...prev,
          [key]: currentValue
        }));

        if (progress === 1) {
          clearInterval(timer);
          setCounts(prev => ({
            ...prev,
            [key]: end
          }));
        }
      }, 16); // ~60 FPS

      return timer;
    };

    // Start all animations with slight delays
    const timers = [];
    timers.push(animateValue('turfs', 0, statsTargets.turfs, 2000));
    setTimeout(() => timers.push(animateValue('customers', 0, statsTargets.customers, 2000)), 100);
    setTimeout(() => timers.push(animateValue('bookings', 0, statsTargets.bookings, 2000)), 200);
    setTimeout(() => timers.push(animateValue('support', 0, statsTargets.support, 2000)), 300);

    return () => timers.forEach(timer => clearInterval(timer));
  }, [isStatsVisible]);

  // Format large numbers with K suffix
  const formatNumber = (num) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(num % 1000 === 0 ? 0 : 1) + 'K';
    }
    return num.toString();
  };

  const teamMembers = [
    {
      name: "Jainam Shah",
      role: "Founder",
      email: "jainam.shah@turfnation.com",
      image: jainam,
      color: "from-green-400 to-emerald-500"
    },
    {
      name: "Tushar Dhamak",
      role: "CEO",
      email: "tushar.dhamak@turfnation.com",
      image: tushar,
      color: "from-emerald-400 to-teal-500"
    },
    {
      name: "Chaitanya Sonawane",
      role: "Director",
      email: "chaitanya.sonawane@turfnation.com",
      image: chaitanya,
      color: "from-teal-400 to-cyan-500"
    },
    {
      name: "Anand Parashar",
      role: "Chairman",
      email: "anand.parashar@turfnation.com",
      image: anand,
      color: "from-green-500 to-emerald-600"
    }
  ];

  const features = [
    {
      icon: <FaFutbol className="w-8 h-8" />,
      title: "Wide Range of Turfs",
      description: "Choose from premium quality turfs for football, cricket, and more"
    },
    {
      icon: <FaCalendarCheck className="w-8 h-8" />,
      title: "Easy Booking",
      description: "Book your favorite turf in just a few clicks with instant confirmation"
    },
    {
      icon: <FaClock className="w-8 h-8" />,
      title: "Flexible Timings",
      description: "Available 24/7 with flexible time slots to match your schedule"
    },
    {
      icon: <FaShieldAlt className="w-8 h-8" />,
      title: "Secure Payments",
      description: "Multiple payment options with 100% secure transaction guarantee"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-green-50 to-emerald-50">
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes pulse-scale {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        .animate-fadeInUp { animation: fadeInUp 0.8s ease-out; }
        .animate-fadeIn { animation: fadeIn 0.6s ease-out; }
        .animate-slideInLeft { animation: slideInLeft 0.8s ease-out; }
        .animate-slideInRight { animation: slideInRight 0.8s ease-out; }
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-blob { animation: blob 7s infinite; }
        .animate-scaleIn { animation: scaleIn 0.6s ease-out; }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
        .stat-number {
          display: inline-block;
        }
        .stat-number.animating {
          animation: pulse-scale 0.5s ease-in-out;
        }
        .group:hover .group-hover-scale { transform: scale(1.05); }
        .card-hover:hover { transform: translateY(-10px); box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15); }
      `}</style>

      <ToastContainer />

      {/* Navigation Bar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-lg shadow-lg py-3' 
          : 'bg-transparent py-5'
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center transform transition-transform group-hover:rotate-6 group-hover:scale-110">
              <FaFutbol className="w-6 h-6 text-white" />
            </div>
            <span className={`text-2xl font-black tracking-tight ${
              scrolled ? 'text-gray-800' : 'text-white drop-shadow-lg'
            }`}>
              Turf Nation
            </span>
          </Link>

          {/* Nav Links */}
          <div className="flex items-center gap-8">
            <Link 
              to="/" 
              className={`font-semibold transition-all duration-300 hover:scale-110 ${
                scrolled ? 'text-gray-700 hover:text-green-600' : 'text-white hover:text-green-200'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/help" 
              className={`font-semibold transition-all duration-300 hover:scale-110 ${
                scrolled ? 'text-gray-700 hover:text-green-600' : 'text-white hover:text-green-200'
              }`}
            >
              Help & Support
            </Link>
            <Link 
              to="/signin"
              className="px-6 py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-xl hover:from-green-600 hover:to-emerald-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Sign In
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=1920&h=1080&fit=crop)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-green-900/80 via-emerald-800/70 to-green-900/80"></div>
        </div>

        {/* Animated Background Blobs */}
        <div className="absolute inset-0 overflow-hidden z-0">
          <div className="absolute top-20 -left-20 w-96 h-96 bg-green-400/20 rounded-full blur-3xl animate-blob"></div>
          <div className="absolute top-40 -right-20 w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl animate-blob delay-200"></div>
          <div className="absolute -bottom-20 left-1/3 w-96 h-96 bg-green-300/20 rounded-full blur-3xl animate-blob delay-400"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <div className="animate-fadeInUp">
            <h1 className="text-6xl md:text-7xl font-black text-white mb-6 leading-tight drop-shadow-2xl">
              Book Your Dream Turf
              <br />
              <span className="bg-gradient-to-r from-green-300 to-emerald-400 bg-clip-text text-transparent">
                Anytime, Anywhere
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-green-100 mb-10 max-w-3xl mx-auto leading-relaxed font-medium">
              Experience hassle-free turf booking with real-time availability, 
              secure payments, and the best sports facilities in town
            </p>
            <div className="flex gap-4 justify-center items-center flex-wrap">
              <Link 
                to="/dashboard"
                className="px-8 py-4 bg-white text-green-600 font-bold text-lg rounded-xl hover:bg-green-50 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-green-500/50 flex items-center gap-3 group"
              >
                <FaFutbol className="w-6 h-6 group-hover:rotate-180 transition-transform duration-500" />
                Browse Turfs
              </Link>
              <Link 
                to="/guide"
                className="px-8 py-4 bg-green-600/30 backdrop-blur-lg text-white font-bold text-lg rounded-xl border-2 border-white/50 hover:bg-green-600/50 transform hover:scale-105 transition-all duration-300 shadow-xl"
              >
                How It Works
              </Link>
            </div>
          </div>

          {/* Floating Icons */}
          <div className="mt-20 flex justify-center gap-16">
            <div className="animate-float text-white text-6xl drop-shadow-2xl">⚽</div>
            <div className="animate-float delay-200 text-white text-6xl drop-shadow-2xl">🏏</div>
            <div className="animate-float delay-400 text-white text-6xl drop-shadow-2xl">🏀</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fadeInUp">
            <h2 className="text-5xl font-black text-gray-800 mb-4">
              Why Choose <span className="text-green-600">Turf Nation</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We provide the best sports facility booking experience with cutting-edge features
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl p-8 border-2 border-gray-100 hover:border-green-300 transition-all duration-300 card-hover animate-scaleIn delay-${index * 100} group`}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section with Animation */}
      <section 
        ref={statsRef}
        className="py-20 bg-gradient-to-r from-green-600 via-emerald-600 to-green-600 relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-4 gap-8 text-center text-white">
            {/* Turfs Available */}
            <div className={`transform transition-all duration-700 ${isStatsVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className={`text-5xl font-black mb-2 stat-number ${isStatsVisible ? 'animating' : ''}`}>
                {formatNumber(counts.turfs)}+
              </div>
              <div className="text-xl font-semibold opacity-90">Turfs Available</div>
            </div>

            {/* Happy Customers */}
            <div className={`transform transition-all duration-700 ${isStatsVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ transitionDelay: '100ms' }}>
              <div className={`text-5xl font-black mb-2 stat-number ${isStatsVisible ? 'animating' : ''}`} style={{ animationDelay: '100ms' }}>
                {formatNumber(counts.customers)}+
              </div>
              <div className="text-xl font-semibold opacity-90">Happy Customers</div>
            </div>

            {/* Bookings Made */}
            <div className={`transform transition-all duration-700 ${isStatsVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ transitionDelay: '200ms' }}>
              <div className={`text-5xl font-black mb-2 stat-number ${isStatsVisible ? 'animating' : ''}`} style={{ animationDelay: '200ms' }}>
                {formatNumber(counts.bookings)}+
              </div>
              <div className="text-xl font-semibold opacity-90">Bookings Made</div>
            </div>

            {/* Support Available */}
            <div className={`transform transition-all duration-700 ${isStatsVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ transitionDelay: '300ms' }}>
              <div className={`text-5xl font-black mb-2 stat-number ${isStatsVisible ? 'animating' : ''}`} style={{ animationDelay: '300ms' }}>
                {counts.support}/7
              </div>
              <div className="text-xl font-semibold opacity-90">Support Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* Meet Our Team Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-white via-green-50 to-emerald-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fadeInUp">
            <span className="text-green-600 font-bold text-lg uppercase tracking-wide">Our Team</span>
            <h2 className="text-5xl font-black text-gray-800 mt-3 mb-4">
              Meet The People Behind
              <br />
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Turf Nation
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Passionate professionals dedicated to bringing you the best turf booking experience
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className={`group relative animate-scaleIn delay-${index * 100}`}
              >
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 card-hover border-2 border-gray-100 hover:border-green-300">
                  {/* Gradient Banner */}
                  <div className={`h-32 bg-gradient-to-r ${member.color} relative`}>
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all duration-300"></div>
                    {/* Floating Emojis */}
                    <div className="absolute top-4 right-4 text-3xl opacity-60 group-hover:opacity-100 transform group-hover:scale-125 transition-all duration-300">
                      ⚽
                    </div>
                  </div>

                  {/* Profile Image */}
                  <div className="relative -mt-16 flex justify-center px-6">
                    <div className="relative">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-32 h-32 rounded-full border-4 border-white shadow-xl object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-green-400/20 to-emerald-600/20 group-hover:from-green-400/40 group-hover:to-emerald-600/40 transition-all duration-300"></div>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="text-center px-6 py-6">
                    <h3 className="text-xl font-black text-gray-800 mb-1 group-hover:text-green-600 transition-colors duration-300">
                      {member.name}
                    </h3>
                    <p className="text-sm font-semibold text-green-600 mb-4 uppercase tracking-wide">
                      {member.role}
                    </p>
                    
                    {/* Email */}
                    <div className="flex items-center justify-center gap-2 text-gray-600 mb-4 text-sm">
                      <FaEnvelope className="w-4 h-4" />
                      <span className="truncate">{member.email}</span>
                    </div>

                    {/* Social Icons */}
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={() => toast.info(`Connect with ${member.name} on LinkedIn`)}
                        className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 hover:from-green-500 hover:to-emerald-600 flex items-center justify-center text-gray-600 hover:text-white transition-all duration-300 transform hover:scale-110 shadow-md hover:shadow-lg"
                      >
                        <FaLinkedin className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => toast.info(`Follow ${member.name} on Twitter`)}
                        className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 hover:from-green-500 hover:to-emerald-600 flex items-center justify-center text-gray-600 hover:text-white transition-all duration-300 transform hover:scale-110 shadow-md hover:shadow-lg"
                      >
                        <FaTwitter className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => toast.success(`Email sent to ${member.email}`)}
                        className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 hover:from-green-500 hover:to-emerald-600 flex items-center justify-center text-gray-600 hover:text-white transition-all duration-300 transform hover:scale-110 shadow-md hover:shadow-lg"
                      >
                        <FaEnvelope className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-12 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
              <FaFutbol className="w-6 h-6 text-white" />
            </div>
            <span className="text-3xl font-black">Turf Nation</span>
          </div>
          <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
            Your trusted partner for seamless turf booking experiences. Play more, worry less.
          </p>
          <div className="border-t border-gray-700 pt-6">
            <p className="text-gray-500 text-sm">
              © 2025 Turf Nation. All rights reserved. Made with ❤️ in India
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
