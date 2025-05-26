
import React from 'react';
import { useAuth } from '@/hooks/useAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-bounce">🌾</div>
          <p className="text-xl text-gray-600">Loading your farm dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Will be handled by the main App component
  }

  return <>{children}</>;
};

export default ProtectedRoute;
