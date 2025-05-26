
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

interface HomePageProps {
  onGetStarted: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onGetStarted }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      image: "🌾",
      title: "Welcome to FarmConnect",
      subtitle: "Your Digital Farm Management Platform",
      description: "Manage your produce, track orders, and grow your farming business with ease."
    },
    {
      image: "📊",
      title: "Track Your Progress",
      subtitle: "Real-time Analytics & Insights", 
      description: "Monitor your farm's performance with detailed analytics and weather integration."
    },
    {
      image: "🚚",
      title: "Manage Orders",
      subtitle: "Streamline Your Sales",
      description: "Keep track of customer orders and optimize your delivery processes."
    },
    {
      image: "🌱",
      title: "Grow Your Business",
      subtitle: "Level Up Your Farming",
      description: "Gain XP, unlock achievements, and build a thriving agricultural business."
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm py-4 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="text-3xl">🌾</div>
            <div>
              <h1 className="text-2xl font-bold text-green-700">FarmConnect</h1>
              <p className="text-sm text-green-600">Farm Management Platform</p>
            </div>
          </div>
          <Button onClick={onGetStarted} className="bg-green-500 hover:bg-green-600">
            Get Started 🚜
          </Button>
        </div>
      </header>

      {/* Hero Section with Slides */}
      <main className="flex-1 flex items-center justify-center py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="relative h-96 bg-gradient-to-r from-green-400 to-green-600">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="text-8xl mb-4 animate-bounce">
                    {slides[currentSlide].image}
                  </div>
                  <h2 className="text-4xl font-bold mb-2">
                    {slides[currentSlide].title}
                  </h2>
                  <h3 className="text-xl mb-4 opacity-90">
                    {slides[currentSlide].subtitle}
                  </h3>
                  <p className="text-lg opacity-80 max-w-md mx-auto">
                    {slides[currentSlide].description}
                  </p>
                </div>
              </div>
              
              {/* Slide indicators */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentSlide ? 'bg-white' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </div>
            
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl mb-2">🥬</div>
                  <h4 className="font-semibold text-gray-800">Produce Management</h4>
                  <p className="text-gray-600 text-sm">Track your crops and inventory</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">🌤️</div>
                  <h4 className="font-semibold text-gray-800">Weather Integration</h4>
                  <p className="text-gray-600 text-sm">Real-time weather updates</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">📈</div>
                  <h4 className="font-semibold text-gray-800">Analytics Dashboard</h4>
                  <p className="text-gray-600 text-sm">Insights and performance metrics</p>
                </div>
              </div>
              
              <div className="text-center mt-8">
                <Button onClick={onGetStarted} size="lg" className="bg-green-500 hover:bg-green-600">
                  Start Your Farm Journey 🌱
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
