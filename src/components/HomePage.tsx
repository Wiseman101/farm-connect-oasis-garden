
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface HomePageProps {
  onGetStarted: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onGetStarted }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const heroSlides = [
    {
      emoji: "🌾",
      title: "Welcome to FarmConnect",
      subtitle: "Your Digital Farm Management Platform",
      description: "Manage your produce, track orders, and grow your farming business with ease.",
      gradient: "from-green-400 to-green-600"
    },
    {
      emoji: "📊",
      title: "Track Your Progress",
      subtitle: "Real-time Analytics & Insights", 
      description: "Monitor your farm's performance with detailed analytics and weather integration.",
      gradient: "from-blue-400 to-blue-600"
    },
    {
      emoji: "🚚",
      title: "Manage Orders",
      subtitle: "Streamline Your Sales",
      description: "Keep track of customer orders and optimize your delivery processes.",
      gradient: "from-orange-400 to-orange-600"
    },
    {
      emoji: "🌱",
      title: "Grow Your Business",
      subtitle: "Level Up Your Farming",
      description: "Gain XP, unlock achievements, and build a thriving agricultural business.",
      gradient: "from-purple-400 to-purple-600"
    }
  ];

  const features = [
    { emoji: "🥬", title: "Produce Management", desc: "Track your crops and inventory" },
    { emoji: "🌤️", title: "Weather Integration", desc: "Real-time weather updates" },
    { emoji: "📈", title: "Analytics Dashboard", desc: "Insights and performance metrics" },
    { emoji: "👥", title: "Community Network", desc: "Connect with other farmers" },
    { emoji: "💰", title: "Market Insights", desc: "Track market prices and trends" },
    { emoji: "🎯", title: "Goal Setting", desc: "Set and achieve farming goals" }
  ];

  const testimonials = [
    {
      name: "John Kamau",
      location: "Nakuru, Kenya",
      text: "FarmConnect has revolutionized how I manage my farm. My productivity has increased by 40%!",
      emoji: "👨‍🌾"
    },
    {
      name: "Mary Wanjiku",
      location: "Kiambu, Kenya",
      text: "The weather integration feature saves me so much time. I can plan my farming activities perfectly.",
      emoji: "👩‍🌾"
    },
    {
      name: "David Ochieng",
      location: "Kisumu, Kenya", 
      text: "I love the community aspect. Learning from other farmers has been invaluable.",
      emoji: "👨‍🌾"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      {/* Header */}
      <header className="bg-white shadow-sm py-4 px-6 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="text-3xl animate-pulse">🌾</div>
            <div>
              <h1 className="text-2xl font-bold text-green-700">FarmConnect</h1>
              <p className="text-sm text-green-600">Farm Management Platform</p>
            </div>
          </div>
          <Button onClick={onGetStarted} className="bg-green-500 hover:bg-green-600 px-6">
            Get Started 🚜
          </Button>
        </div>
      </header>

      {/* Hero Section with Auto-sliding Carousel */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="relative h-96">
              <div className={`absolute inset-0 bg-gradient-to-r ${heroSlides[currentSlide].gradient} flex items-center justify-center transition-all duration-1000`}>
                <div className="text-center text-white max-w-4xl mx-auto px-6">
                  <div className="text-8xl mb-6 animate-bounce">
                    {heroSlides[currentSlide].emoji}
                  </div>
                  <h2 className="text-5xl font-bold mb-4 animate-fade-in">
                    {heroSlides[currentSlide].title}
                  </h2>
                  <h3 className="text-2xl mb-6 opacity-90 animate-fade-in delay-200">
                    {heroSlides[currentSlide].subtitle}
                  </h3>
                  <p className="text-xl opacity-80 max-w-2xl mx-auto animate-fade-in delay-400">
                    {heroSlides[currentSlide].description}
                  </p>
                </div>
              </div>
              
              {/* Slide indicators */}
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
                {heroSlides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-4 h-4 rounded-full transition-all duration-300 ${
                      index === currentSlide ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/75'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Why Choose FarmConnect?</h2>
            <p className="text-xl text-gray-600">Everything you need to manage your farm efficiently</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="text-5xl mb-4">{feature.emoji}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">What Farmers Say</h2>
            <p className="text-xl text-gray-600">Join thousands of successful farmers</p>
          </div>
          
          <Carousel className="w-full max-w-4xl mx-auto">
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-8 h-full">
                    <div className="text-4xl mb-4 text-center">{testimonial.emoji}</div>
                    <p className="text-gray-700 mb-6 italic">"{testimonial.text}"</p>
                    <div className="text-center">
                      <h4 className="font-bold text-gray-800">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600">{testimonial.location}</p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-6 bg-gradient-to-r from-green-500 to-green-600">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-6xl mb-6">🚀</div>
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Transform Your Farm?</h2>
          <p className="text-xl text-green-100 mb-8">Join FarmConnect today and take your farming to the next level!</p>
          <Button 
            onClick={onGetStarted} 
            size="lg" 
            className="bg-white text-green-600 hover:bg-gray-100 text-xl px-12 py-4 rounded-full font-bold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Start Your Farm Journey 🌱
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="text-3xl">🌾</div>
            <div>
              <h3 className="text-2xl font-bold">FarmConnect</h3>
              <p className="text-gray-400">Connecting Farmers to Success</p>
            </div>
          </div>
          <p className="text-gray-400">© 2024 FarmConnect. All rights reserved. Made with ❤️ for farmers.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
