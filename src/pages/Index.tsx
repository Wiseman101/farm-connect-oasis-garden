
import React, { useState } from 'react';
import HomePage from '@/components/HomePage';
import AuthForm from '@/components/AuthForm';
import Sidebar from '@/components/Sidebar';
import Dashboard from '@/components/Dashboard';
import ProduceView from '@/components/ProduceView';
import SettingsView from '@/components/SettingsView';

interface User {
  id: string;
  name: string;
  email: string;
  location: string;
  xp: number;
  level: number;
  bio?: string;
  phone?: string;
  preferredProduce: string[];
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

const Index = () => {
  const [currentPage, setCurrentPage] = useState<'home' | 'auth' | 'dashboard'>('home');
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('signup');
  const [activeSection, setActiveSection] = useState('dashboard');
  const [user, setUser] = useState<User | null>(null);
  const [produce, setProduce] = useState<Produce[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  const handleAuthSubmit = (data: { email: string; password: string; name?: string; location?: string }) => {
    console.log('Auth submitted:', data);
    
    // Create user object
    const newUser: User = {
      id: Date.now().toString(),
      name: data.name || 'John Farmer',
      email: data.email,
      location: data.location || 'Farm Location',
      xp: authMode === 'signup' ? 0 : 250,
      level: authMode === 'signup' ? 1 : 3,
      preferredProduce: []
    };
    
    setUser(newUser);
    setCurrentPage('dashboard');
  };

  const handleGetStarted = () => {
    setCurrentPage('auth');
  };

  const handleAuthModeSwitch = () => {
    setAuthMode(authMode === 'login' ? 'signup' : 'login');
  };

  const handleLogout = () => {
    setUser(null);
    setProduce([]);
    setOrders([]);
    setCurrentPage('home');
    setActiveSection('dashboard');
  };

  const handleAddProduce = (newProduce: Omit<Produce, 'id' | 'addedAt'>) => {
    const produce = {
      ...newProduce,
      id: Date.now(),
      addedAt: new Date().toISOString()
    };
    setProduce(prev => [...prev, produce]);
    
    // Award XP for adding produce
    if (user) {
      const newXP = user.xp + 10;
      const newLevel = Math.floor(newXP / 100) + 1;
      setUser({ ...user, xp: newXP, level: newLevel });
    }
    
    console.log('Added new produce:', produce);
  };

  const handleAddOrder = (newOrder: Omit<Order, 'id' | 'createdAt'>) => {
    const order = {
      ...newOrder,
      id: Date.now(),
      createdAt: new Date().toISOString()
    };
    setOrders(prev => [...prev, order]);
    console.log('Added new order:', order);
  };

  const handleUpdateProfile = (updatedData: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...updatedData });
      console.log('Updated profile:', updatedData);
    }
  };

  const renderContent = () => {
    if (!user) return null;

    switch (activeSection) {
      case 'dashboard':
        return <Dashboard userProfile={user} onAddProduce={handleAddProduce} produce={produce} orders={orders} />;
      case 'produce':
        return <ProduceView produce={produce} onAddProduce={handleAddProduce} />;
      case 'orders':
        return (
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="text-6xl mb-4">🚚</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Orders Management</h2>
            <p className="text-gray-600 mb-4">Track and manage your produce orders</p>
            {orders.length === 0 ? (
              <p className="text-gray-500">No orders yet. Orders will appear here as customers place them.</p>
            ) : (
              <div className="space-y-4">
                {orders.map(order => (
                  <div key={order.id} className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold">{order.produceName}</h3>
                    <p>Quantity: {order.quantity}kg | Buyer: {order.buyer}</p>
                    <p>Status: {order.status}</p>
                  </div>
                ))}
              </div>
            )}
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
            <div className="max-w-md mx-auto text-left space-y-2">
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Location:</strong> {user.location}</p>
              <p><strong>Level:</strong> {user.level}</p>
              <p><strong>XP:</strong> {user.xp}</p>
            </div>
          </div>
        );
      case 'settings':
        return <SettingsView user={user} onUpdateProfile={handleUpdateProfile} />;
      default:
        return <Dashboard userProfile={user} onAddProduce={handleAddProduce} produce={produce} orders={orders} />;
    }
  };

  if (currentPage === 'home') {
    return <HomePage onGetStarted={handleGetStarted} />;
  }

  if (currentPage === 'auth') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-6">
        <AuthForm
          mode={authMode}
          onSubmit={handleAuthSubmit}
          onModeSwitch={handleAuthModeSwitch}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar 
        activeSection={activeSection} 
        onSectionChange={setActiveSection}
        onLogout={handleLogout}
      />
      
      <main className="flex-1 ml-64 p-6">
        <div className="max-w-7xl mx-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default Index;
