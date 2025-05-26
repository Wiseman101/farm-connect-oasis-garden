
import React from 'react';
import { Home, Package, Truck, MessageCircle, User, Settings, LogOut } from 'lucide-react';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeSection, onSectionChange }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, emoji: '🏠' },
    { id: 'produce', label: 'My Produce', icon: Package, emoji: '🥬' },
    { id: 'orders', label: 'Orders', icon: Truck, emoji: '🚚' },
    { id: 'messages', label: 'Messages', icon: MessageCircle, emoji: '💬' },
    { id: 'profile', label: 'Profile', icon: User, emoji: '👨‍🌾' },
    { id: 'settings', label: 'Settings', icon: Settings, emoji: '⚙️' },
  ];

  return (
    <div className="bg-white shadow-lg h-full w-64 fixed left-0 top-0 z-40 border-r-2 border-green-100">
      <div className="p-6 border-b border-green-100">
        <div className="flex items-center space-x-3">
          <div className="text-3xl">🌾</div>
          <div>
            <h1 className="text-2xl font-bold text-green-700">FarmConnect</h1>
            <p className="text-sm text-green-600">Farm Management</p>
          </div>
        </div>
      </div>
      
      <nav className="mt-6">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onSectionChange(item.id)}
            className={`w-full flex items-center space-x-3 px-6 py-3 text-left hover:bg-green-50 transition-colors ${
              activeSection === item.id 
                ? 'bg-green-100 border-r-4 border-green-500 text-green-700' 
                : 'text-gray-700'
            }`}
          >
            <span className="text-xl">{item.emoji}</span>
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
        
        <div className="border-t border-green-100 mt-6 pt-6">
          <button className="w-full flex items-center space-x-3 px-6 py-3 text-left hover:bg-red-50 transition-colors text-red-600">
            <span className="text-xl">🚪</span>
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
