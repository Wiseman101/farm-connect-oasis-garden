
import React, { useState, useEffect } from 'react';
import HomePage from '@/components/HomePage';
import AuthPage from '@/components/AuthPage';
import Sidebar from '@/components/Sidebar';
import Dashboard from '@/components/Dashboard';
import ProduceView from '@/components/ProduceView';
import SettingsView from '@/components/SettingsView';
import ProtectedRoute from '@/components/ProtectedRoute';
import { AuthProvider, useAuth } from '@/hooks/useAuth';
import { User, Produce, Order } from '@/types';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const AppContent = () => {
  const { user, signOut } = useAuth();
  const [currentPage, setCurrentPage] = useState<'home' | 'auth' | 'dashboard'>('home');
  const [activeSection, setActiveSection] = useState('dashboard');
  const [userProfile, setUserProfile] = useState<User | null>(null);
  const [produce, setProduce] = useState<Produce[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (user) {
      // Create user profile from auth metadata
      const profile: User = {
        id: user.id,
        name: user.user_metadata?.name || user.email?.split('@')[0] || 'Farmer',
        email: user.email || '',
        location: user.user_metadata?.location || 'Kenya',
        xp: 0,
        level: 1,
        bio: user.user_metadata?.bio || '',
        phone: user.user_metadata?.phone || '',
        preferredProduce: []
      };
      setUserProfile(profile);
      setCurrentPage('dashboard');
    } else {
      setUserProfile(null);
      setProduce([]);
      setOrders([]);
      setCurrentPage('home');
      setActiveSection('dashboard');
    }
  }, [user]);

  const handleGetStarted = () => {
    setCurrentPage('auth');
  };

  const handleLogout = async () => {
    try {
      await signOut();
      toast.success('Logged out successfully! 👋');
    } catch (error) {
      toast.error('Error logging out');
    }
  };

  const handleAddProduce = (newProduce: Omit<Produce, 'id' | 'addedAt'>) => {
    const produce = {
      ...newProduce,
      id: Date.now(),
      addedAt: new Date().toISOString()
    };
    setProduce(prev => [...prev, produce]);
    
    // Award XP for adding produce
    if (userProfile) {
      const newXP = userProfile.xp + 10;
      const newLevel = Math.floor(newXP / 100) + 1;
      setUserProfile({ ...userProfile, xp: newXP, level: newLevel });
    }
    
    toast.success('Produce added successfully! 🌱 +10 XP');
  };

  const handleAddOrder = (newOrder: Omit<Order, 'id' | 'createdAt'>) => {
    const order = {
      ...newOrder,
      id: Date.now(),
      createdAt: new Date().toISOString()
    };
    setOrders(prev => [...prev, order]);
    toast.success('Order added successfully! 📦');
  };

  const handleUpdateProfile = (updatedData: Partial<User>) => {
    if (userProfile) {
      setUserProfile({ ...userProfile, ...updatedData });
      toast.success('Profile updated successfully! 👤');
    }
  };

  const renderContent = () => {
    if (!userProfile) return null;

    switch (activeSection) {
      case 'dashboard':
        return <Dashboard userProfile={userProfile} onAddProduce={handleAddProduce} produce={produce} orders={orders} />;
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
              <p><strong>Name:</strong> {userProfile.name}</p>
              <p><strong>Email:</strong> {userProfile.email}</p>
              <p><strong>Location:</strong> {userProfile.location}</p>
              <p><strong>Level:</strong> {userProfile.level}</p>
              <p><strong>XP:</strong> {userProfile.xp}</p>
            </div>
          </div>
        );
      case 'settings':
        return <SettingsView user={userProfile} onUpdateProfile={handleUpdateProfile} />;
      default:
        return <Dashboard userProfile={userProfile} onAddProduce={handleAddProduce} produce={produce} orders={orders} />;
    }
  };

  if (currentPage === 'home') {
    return <HomePage onGetStarted={handleGetStarted} />;
  }

  if (currentPage === 'auth') {
    return <AuthPage />;
  }

  return (
    <ProtectedRoute>
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
    </ProtectedRoute>
  );
};

const Index = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default Index;
