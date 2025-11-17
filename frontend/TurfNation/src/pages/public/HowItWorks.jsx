import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

const HowItWorksPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeStep, setActiveStep] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 100);
  }, []);

  const steps = [
    {
      id: 1,
      icon: "🔍",
      title: "Search & Explore",
      description: "Browse through our extensive collection of premium turfs across multiple cities. Filter by location, price, and turf type to find your perfect match.",
      details: ["Search by city or turf name", "View detailed turf information", "Compare prices and amenities"]
    },
    {
      id: 2,
      icon: "📅",
      title: "Select Date & Time",
      description: "Choose your preferred date and time slot. Our real-time availability system ensures you get accurate booking options instantly.",
      details: ["Check real-time availability", "Select convenient time slots", "Flexible booking options"]
    },
    {
      id: 3,
      icon: "💳",
      title: "Secure Payment",
      description: "Complete your booking with our safe and secure payment gateway. Multiple payment options available for your convenience.",
      details: ["Multiple payment methods", "100% secure transactions", "Instant payment confirmation"]
    },
    {
      id: 4,
      icon: "✅",
      title: "Confirmation & Play",
      description: "Receive instant booking confirmation via email and SMS. Show up at the turf and enjoy your game with friends!",
      details: ["Instant booking confirmation", "Email & SMS notifications", "Easy cancellation policy"]
    }
  ];

  const features = [
    {
      icon: "⚡",
      title: "Instant Booking",
      description: "Book your turf in less than 2 minutes"
    },
    {
      icon: "🔒",
      title: "Secure Payments",
      description: "100% safe and encrypted transactions"
    },
    {
      icon: "📱",
      title: "Mobile Friendly",
      description: "Book anytime, anywhere on any device"
    },
    {
      icon: "🎯",
      title: "Best Prices",
      description: "Competitive rates with no hidden charges"
    },
    {
      icon: "🏆",
      title: "Premium Turfs",
      description: "Verified and top-rated turfs only"
    },
    {
      icon: "💬",
      title: "24/7 Support",
      description: "Always here to help you"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50">
      
      {/* Navbar
      <nav className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 shadow-lg sticky top-0 z-40">
        <div className="container mx-auto flex justify-between items-center px-6">
          <h1 
            className="text-3xl font-bold cursor-pointer hover:scale-105 transition-transform duration-300 flex items-center gap-2"
            onClick={() => navigate("/")}
          >
            <span className="text-4xl">⚽</span>
            TurfNation
          </h1>

          <div className="space-x-6 flex items-center">
            <button 
              onClick={() => navigate("/")}
              className="hover:text-green-200 transition-all duration-300 hover:scale-110 font-medium"
            >
              Home
            </button>
            <button 
              onClick={() => navigate("/mybooking")}
              className="hover:text-green-200 transition-all duration-300 hover:scale-110 font-medium"
            >
              My Bookings
            </button>
            <button className="hover:text-green-200 transition-all duration-300 hover:scale-110 font-medium">
              Help
            </button>
            <button className="bg-white text-green-600 px-5 py-2 rounded-lg hover:bg-green-50 hover:shadow-lg transform hover:scale-105 transition-all duration-300 font-semibold">
              Logout
            </button>
          </div>
        </div>
      </nav> */}

      <nav className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 shadow-lg sticky top-0 z-40">
        <div className="container mx-auto flex justify-between items-center px-6">
          <h1 
            className="text-3xl font-bold cursor-pointer hover:scale-105 transition-transform duration-300 flex items-center gap-2"
            onClick={() => navigate("/")}
          >
            <span className="text-4xl">⚽</span>
            TurfNation
          </h1>

          <div className="space-x-6 flex items-center">
            <button 
              onClick={() => navigate("/")}
              className="hover:text-green-200 transition-all duration-300 hover:scale-110 font-medium"
            >
              Home
            </button>
            
            <Link 
              to="/help"
              className="hover:text-green-200 transition-all duration-300 hover:scale-110 font-medium">
              Help
            </Link>
            <Link
                to="/signin"
                className="bg-white text-green-600 px-5 py-2 rounded-lg hover:bg-green-50 hover:shadow-lg transform hover:scale-105 transition-all duration-300 font-semibold inline-block text-center">
                SignIn
            </Link>

          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className={`text-center py-16 px-4 transform transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
        <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
          How It Works
        </h1>
        <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto">
          Book your favorite turf in 4 simple steps. Fast, secure, and hassle-free!
        </p>
      </div>

      {/* Steps Timeline */}
      <div className="max-w-5xl mx-auto px-6 pb-20">
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-green-300 via-green-400 to-green-500 transform md:-translate-x-1/2"></div>

          {/* Steps */}
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`relative mb-16 transform transition-all duration-700 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}
              style={{ transitionDelay: `${index * 200}ms` }}
              onMouseEnter={() => setActiveStep(step.id)}
              onMouseLeave={() => setActiveStep(null)}
            >
              <div className={`flex flex-col md:flex-row items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                
                {/* Content Card */}
                <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'} mb-4 md:mb-0`}>
                  <div className={`bg-white rounded-2xl shadow-lg p-6 border-2 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl ${activeStep === step.id ? 'border-green-500 shadow-green-200' : 'border-green-100'}`}>
                    
                    {/* Step Number & Icon */}
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-3xl transform transition-all duration-300 ${activeStep === step.id ? 'scale-110 rotate-12' : ''}`}>
                        {step.icon}
                      </div>
                      <div>
                        <p className="text-green-600 font-semibold text-sm">Step {step.id}</p>
                        <h3 className="text-2xl font-bold text-gray-800">{step.title}</h3>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {step.description}
                    </p>

                    {/* Details List */}
                    <div className={`space-y-2 overflow-hidden transition-all duration-500 ${activeStep === step.id ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                      {step.details.map((detail, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                          <span className="text-green-500">✓</span>
                          <span>{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Timeline Dot */}
                <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 flex items-center justify-center z-10">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 border-4 border-white shadow-lg flex items-center justify-center font-bold text-white text-xl transition-all duration-500 ${activeStep === step.id ? 'scale-125 shadow-2xl' : 'scale-100'}`}>
                    {step.id}
                  </div>
                </div>

                {/* Spacer for alignment */}
                <div className="hidden md:block w-5/12"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Features Grid */}
      <div className="bg-gradient-to-br from-green-100 to-emerald-50 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            Why Choose TurfNation?
          </h2>
          <p className="text-center text-gray-600 mb-12 text-lg">
            Experience the best turf booking platform in India
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border border-green-100 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className={`text-center py-20 px-6 transform transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <h2 className="text-4xl font-bold mb-4 text-gray-800">
          Ready to Play?
        </h2>
        <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
          Join thousands of sports enthusiasts who book their turfs with TurfNation. Start your booking journey today!
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-10 py-4 rounded-lg text-lg font-semibold hover:from-green-600 hover:to-emerald-600 transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:scale-110"
        >
          Browse Turfs Now →
        </button>
      </div>

      {/* FAQ Section */}
      <div className="max-w-4xl mx-auto px-6 pb-20">
        <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {[
            {
              q: "How do I cancel my booking?",
              a: "You can cancel your booking from 'My Bookings' section. Cancellations made 24 hours before the booking time are eligible for full refund."
            },
            {
              q: "What payment methods do you accept?",
              a: "We accept all major credit/debit cards, UPI, net banking, and digital wallets for secure payments."
            },
            {
              q: "Can I reschedule my booking?",
              a: "Yes, you can reschedule your booking subject to availability. Visit 'My Bookings' to modify your slot."
            },
            {
              q: "Do you offer group discounts?",
              a: "Yes! Contact our support team for special rates on bulk bookings and regular group sessions."
            }
          ].map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 border border-green-100 hover:border-green-300 transition-all duration-300 hover:shadow-lg"
            >
              <h3 className="font-bold text-lg text-gray-800 mb-2 flex items-start gap-2">
                <span className="text-green-500">Q.</span>
                {faq.q}
              </h3>
              <p className="text-gray-600 pl-6">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default HowItWorksPage;
