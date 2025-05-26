
import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Dashboard from '@/components/Dashboard';
import ProduceView from '@/components/ProduceView';
import AddProduceForm from '@/components/AddProduceForm';

const Index = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [userProfile] = useState({
    name: 'John Farmer',
    xp: 750,
    level: 8
  });
  
  const [produce, setProduce] = useState([
    {
      id: 1,
      name: 'tomatoes',
      quantity: 45.5,
      location: 'North Field',
      addedAt: new Date().toISOString()
    },
    {
      id: 2,
      name: 'carrots',
      quantity: 32.0,
      location: 'East Garden',
      addedAt: new Date(Date.now() - 86400000).toISOString()
    }
  ]);

  const handleAddProduce = (newProduce: any) => {
    setProduce([...produce, newProduce]);
    console.log('Added new produce:', newProduce);
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard userProfile={userProfile} onAddProduce={handleAddProduce} />;
      case 'produce':
        return <ProduceView produce={produce} onAddProduce={handleAddProduce} />;
      case 'orders':
        return (
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="text-6xl mb-4">🚚</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Orders Management</h2>
            <p className="text-gray-600">Track and manage your produce orders</p>
          </div>
        );
      case 'messages':
        return (
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="text-6xl mb-4">💬</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Messages</h2>
            <p className="text-gray-600">Communicate with buyers and suppliers</p>
          </div>
        );
      case 'profile':
        return (
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="text-6xl mb-4">👨‍🌾</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Farmer Profile</h2>
            <p className="text-gray-600">Manage your profile and farm information</p>
          </div>
        );
      case 'settings':
        return (
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="text-6xl mb-4">⚙️</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Settings</h2>
            <p className="text-gray-600">Configure your farm management preferences</p>
          </div>
        );
      default:
        return <Dashboard userProfile={userProfile} onAddProduce={handleAddProduce} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      
      <main className="flex-1 ml-64 p-6">
        <div className="max-w-7xl mx-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default Index;
