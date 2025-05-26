
import React from 'react';

interface StatsCardProps {
  title: string;
  value: string | number;
  emoji: string;
  color: 'green' | 'blue' | 'orange' | 'purple';
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, emoji, color }) => {
  const colorClasses = {
    green: 'from-green-400 to-green-600',
    blue: 'from-blue-400 to-blue-600',
    orange: 'from-orange-400 to-orange-600',
    purple: 'from-purple-400 to-purple-600'
  };

  return (
    <div className={`bg-gradient-to-r ${colorClasses[color]} rounded-xl shadow-lg p-6 text-white transform hover:scale-105 transition-transform duration-200`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm opacity-90 mb-1">{title}</p>
          <p className="text-3xl font-bold">{value}</p>
        </div>
        <div className="text-4xl opacity-80">{emoji}</div>
      </div>
    </div>
  );
};

export default StatsCard;
