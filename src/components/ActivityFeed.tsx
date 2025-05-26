
import React from 'react';

interface Activity {
  id: number;
  action: string;
  time: string;
  emoji: string;
}

interface ActivityFeedProps {
  activities: Activity[];
}

const ActivityFeed: React.FC<ActivityFeedProps> = ({ activities }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
        <span className="mr-2">📝</span>
        Recent Activity
      </h3>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <div className="text-2xl">{activity.emoji}</div>
            <div className="flex-1">
              <p className="text-gray-800 font-medium">{activity.action}</p>
              <p className="text-gray-500 text-sm">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
      <button className="w-full mt-4 text-green-600 hover:text-green-700 font-medium py-2 hover:bg-green-50 rounded-lg transition-colors">
        View All Activities →
      </button>
    </div>
  );
};

export default ActivityFeed;
