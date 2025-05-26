
import React from 'react';
import { Activity } from '@/types';

interface ActivityFeedProps {
  activities: Activity[];
}

const ActivityFeed: React.FC<ActivityFeedProps> = ({ activities }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
        <span className="mr-2">📊</span>
        Recent Activity
      </h3>
      
      {activities.length === 0 ? (
        <div className="text-center py-8">
          <div className="text-4xl mb-2">🌱</div>
          <p className="text-gray-500">No recent activity</p>
          <p className="text-sm text-gray-400">Start adding produce to see activity here</p>
        </div>
      ) : (
        <div className="space-y-3 max-h-80 overflow-y-auto">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-green-50 transition-colors">
              <div className="text-2xl mr-3">{activity.emoji}</div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-800">{activity.action}</p>
                <p className="text-xs text-gray-500">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ActivityFeed;
