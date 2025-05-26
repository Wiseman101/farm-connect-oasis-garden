
import React, { useState } from 'react';

interface Produce {
  id: number;
  name: string;
  quantity: number;
  location: string;
  addedAt: string;
}

interface ProduceViewProps {
  produce: Produce[];
  onAddProduce: (produce: any) => void;
}

const ProduceView: React.FC<ProduceViewProps> = ({ produce, onAddProduce }) => {
  const [showAddForm, setShowAddForm] = useState(false);

  const getProduceEmoji = (name: string) => {
    const emojiMap: { [key: string]: string } = {
      tomatoes: '🍅',
      carrots: '🥕',
      lettuce: '🥬',
      potatoes: '🥔',
      corn: '🌽',
      apples: '🍎',
      bananas: '🍌',
      cucumbers: '🥒',
      onions: '🧅',
      beans: '🫛',
      peppers: '🌶️',
      broccoli: '🥦',
      strawberries: '🍓',
      oranges: '🍊',
      mangoes: '🥭',
    };
    return emojiMap[name.toLowerCase()] || '🥬';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-800 flex items-center">
          <span className="mr-3">🥬</span>
          My Produce
        </h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center space-x-2"
        >
          <span>➕</span>
          <span>Add Produce</span>
        </button>
      </div>

      {produce.length === 0 ? (
        <div className="bg-white rounded-xl shadow-lg p-12 text-center">
          <div className="text-6xl mb-4">🌱</div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">No produce added yet</h3>
          <p className="text-gray-600 mb-6">Start by adding your first produce item to track your farm inventory</p>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-lg font-medium transition-colors"
          >
            Add Your First Produce 🌽
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {produce.map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="text-4xl">{getProduceEmoji(item.name)}</div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-800">{item.quantity}kg</div>
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-gray-800 mb-2 capitalize">
                {item.name}
              </h3>
              
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center">
                  <span className="mr-2">📍</span>
                  <span>{item.location}</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-2">📅</span>
                  <span>Added {formatDate(item.addedAt)}</span>
                </div>
              </div>
              
              <div className="mt-4 flex space-x-2">
                <button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-3 rounded-lg text-sm font-medium transition-colors">
                  Edit
                </button>
                <button className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 px-3 rounded-lg text-sm font-medium transition-colors">
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProduceView;
