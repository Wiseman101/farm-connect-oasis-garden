
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface User {
  name: string;
  email: string;
  location: string;
  xp: number;
  level: number;
  bio?: string;
  phone?: string;
  preferredProduce: string[];
}

interface SettingsViewProps {
  user: User;
  onUpdateProfile: (updatedUser: Partial<User>) => void;
}

const SettingsView: React.FC<SettingsViewProps> = ({ user, onUpdateProfile }) => {
  const [profile, setProfile] = useState(user);
  const [activeTab, setActiveTab] = useState('profile');

  const produceOptions = [
    '🍅 Tomatoes', '🥕 Carrots', '🥬 Lettuce', '🥔 Potatoes', '🌽 Corn',
    '🍎 Apples', '🍌 Bananas', '🥒 Cucumbers', '🧅 Onions', '🫛 Beans',
    '🌶️ Peppers', '🥦 Broccoli', '🍓 Strawberries', '🍊 Oranges', '🥭 Mangoes',
    '🫐 Blueberries', '🍇 Grapes', '🥥 Coconuts', '🍑 Cherries', '🥝 Kiwi'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile(profile);
  };

  const toggleProduce = (produce: string) => {
    const currentProduce = profile.preferredProduce || [];
    if (currentProduce.includes(produce)) {
      setProfile({
        ...profile,
        preferredProduce: currentProduce.filter(p => p !== produce)
      });
    } else {
      setProfile({
        ...profile,
        preferredProduce: [...currentProduce, produce]
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-800 flex items-center">
          <span className="mr-3">⚙️</span>
          Settings
        </h2>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'profile', label: 'Profile', emoji: '👨‍🌾' },
              { id: 'produce', label: 'Preferred Produce', emoji: '🌾' },
              { id: 'preferences', label: 'Preferences', emoji: '⚙️' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <span>{tab.emoji}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'profile' && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="location">Farm Location</Label>
                  <Input
                    id="location"
                    value={profile.location}
                    onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={profile.phone || ''}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  placeholder="Tell us about your farm..."
                  value={profile.bio || ''}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                />
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-800 mb-2">Farm Stats</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Level:</span>
                    <span className="ml-2 font-semibold">{profile.level}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">XP:</span>
                    <span className="ml-2 font-semibold">{profile.xp}</span>
                  </div>
                </div>
              </div>

              <Button type="submit" className="bg-green-500 hover:bg-green-600">
                Save Profile Changes 💾
              </Button>
            </form>
          )}

          {activeTab === 'produce' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Select Your Preferred Produce</h3>
                <p className="text-gray-600 mb-4">Choose the types of produce you typically grow or plan to grow.</p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {produceOptions.map((produce) => {
                  const isSelected = (profile.preferredProduce || []).includes(produce);
                  return (
                    <button
                      key={produce}
                      onClick={() => toggleProduce(produce)}
                      className={`p-3 rounded-lg border-2 text-sm font-medium transition-colors ${
                        isSelected
                          ? 'border-green-500 bg-green-50 text-green-700'
                          : 'border-gray-200 bg-white text-gray-700 hover:border-green-300'
                      }`}
                    >
                      {produce}
                    </button>
                  );
                })}
              </div>
              
              <Button 
                onClick={() => onUpdateProfile({ preferredProduce: profile.preferredProduce })}
                className="bg-green-500 hover:bg-green-600"
              >
                Save Produce Preferences 🌱
              </Button>
            </div>
          )}

          {activeTab === 'preferences' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-800">Application Preferences</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-800">Weather Notifications</h4>
                    <p className="text-sm text-gray-600">Get alerts about weather changes</p>
                  </div>
                  <button className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm">
                    Enabled
                  </button>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-800">Order Notifications</h4>
                    <p className="text-sm text-gray-600">Get notified about new orders</p>
                  </div>
                  <button className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm">
                    Enabled
                  </button>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-800">Weekly Reports</h4>
                    <p className="text-sm text-gray-600">Receive weekly farm performance reports</p>
                  </div>
                  <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm">
                    Disabled
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsView;
