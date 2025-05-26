
import React, { useState, useEffect } from 'react';

const WeatherWidget: React.FC = () => {
  const [weather, setWeather] = useState({
    temperature: 26,
    humidity: 65,
    condition: 'Partly Cloudy',
    location: 'Nairobi, Kenya',
    emoji: '⛅'
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call - in real app, you'd call OpenWeatherMap API
    const fetchWeather = async () => {
      try {
        // Mock weather data - replace with actual API call
        setTimeout(() => {
          setWeather({
            temperature: Math.floor(Math.random() * 10) + 22,
            humidity: Math.floor(Math.random() * 30) + 50,
            condition: ['Sunny', 'Partly Cloudy', 'Cloudy', 'Light Rain'][Math.floor(Math.random() * 4)],
            location: 'Nairobi, Kenya',
            emoji: ['☀️', '⛅', '☁️', '🌦️'][Math.floor(Math.random() * 4)]
          });
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Weather fetch error:', error);
        setLoading(false);
      }
    };

    fetchWeather();
    const interval = setInterval(fetchWeather, 300000); // Update every 5 minutes
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl shadow-lg p-6 text-white">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold">🌤️ Weather</h3>
        <div className="text-2xl">{weather.emoji}</div>
      </div>
      
      <div className="space-y-3">
        <div>
          <div className="text-3xl font-bold">{weather.temperature}°C</div>
          <div className="text-blue-100">{weather.condition}</div>
        </div>
        
        <div className="flex justify-between items-center pt-3 border-t border-blue-300">
          <div className="text-center">
            <div className="text-2xl">💧</div>
            <div className="text-sm text-blue-100">Humidity</div>
            <div className="font-bold">{weather.humidity}%</div>
          </div>
          <div className="text-center">
            <div className="text-2xl">📍</div>
            <div className="text-sm text-blue-100">Location</div>
            <div className="font-bold text-xs">{weather.location}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;
