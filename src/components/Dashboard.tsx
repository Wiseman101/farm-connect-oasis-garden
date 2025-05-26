
import React, { useState } from 'react';
import WeatherWidget from './WeatherWidget';
import StatsCard from './StatsCard';
import ActivityFeed from './ActivityFeed';
import AddProduceForm from './AddProduceForm';

interface User {
  name: string;
  xp: number;
  level: number;
  location: string;
}

interface Produce {
  id: number;
  name: string;
  quantity: number;
  location: string;
  addedAt: string;
}

interface Order {
  id: number;
  produceName: string;
  quantity: number;
  buyer: string;
  status: string;
  createdAt: string;
}

interface DashboardProps {
  userProfile: User;
  onAddProduce: (produce: any) => void;
  produce: Produce[];
  orders: Order[];
}

const Dashboard: React.FC<DashboardProps> = ({ userProfile, onAddProduce, produce, orders }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  
  const stats = {
    totalProduce: produce.length,
    totalQuantity: produce.reduce((sum, item) => sum + item.quantity, 0),
    activeOrders: orders.filter(order => order.status === 'active').length,
    completedOrders: orders.filter(order => order.status === 'completed').length
  };

  const recentActivities = [
    ...produce.slice(-3).map(item => ({
      id: `produce-${item.id}`,
      action: `Added ${item.quantity}kg of ${item.name}`,
      time: new Date(item.addedAt).toLocaleDateString(),
      emoji: '🌱'
    })),
    ...orders.slice(-2).map(order => ({
      id: `order-${order.id}`,
      action: `Order for ${order.quantity}kg ${order.produceName}`,
      time: new Date(order.createdAt).toLocaleDateString(),
      emoji: '📦'
    }))
  ].sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()).slice(0, 4);

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold">Welcome back, {userProfile.name}! 👋</h2>
            <p className="text-green-100 mt-2">Ready to manage your farm today?</p>
          </div>
          <div className="text-right">
            <div className="text-4xl mb-2">🌱</div>
            <div className="text-sm text-green-100">Level {userProfile.level}</div>
            <div className="bg-green-400 rounded-full h-2 w-24 mt-1">
              <div 
                className="bg-white h-2 rounded-full transition-all duration-500"
                style={{ width: `${(userProfile.xp % 100)}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Stats Cards */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          <StatsCard
            title="Produce Items"
            value={stats.totalProduce}
            emoji="🧺"
            color="green"
          />
          <StatsCard
            title="Total Quantity"
            value={`${stats.totalQuantity}kg`}
            emoji="📦"
            color="blue"
          />
          <StatsCard
            title="Active Orders"
            value={stats.activeOrders}
            emoji="🚚"
            color="orange"
          />
          <StatsCard
            title="Completed Orders"
            value={stats.completedOrders}
            emoji="✅"
            color="purple"
          />
        </div>

        {/* Weather Widget */}
        <div className="lg:col-span-1">
          <WeatherWidget />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <span className="mr-2">⚡</span>
            Quick Actions
          </h3>
          <div className="space-y-3">
            <button
              onClick={() => setShowAddForm(true)}
              className="w-full bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
            >
              <span>🌽</span>
              <span>Add New Produce</span>
            </button>
            <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2">
              <span>📋</span>
              <span>View Orders</span>
            </button>
            <button className="w-full bg-purple-500 hover:bg-purple-600 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2">
              <span>📊</span>
              <span>Generate Report</span>
            </button>
          </div>
        </div>

        {/* Activity Feed */}
        <ActivityFeed activities={recentActivities} />
      </div>

      {/* Add Produce Modal */}
      {showAddForm && (
        <AddProduceForm
          onClose={() => setShowAddForm(false)}
          onSubmit={(produce) => {
            onAddProduce(produce);
            setShowAddForm(false);
          }}
        />
      )}
    </div>
  );
};

export default Dashboard;
