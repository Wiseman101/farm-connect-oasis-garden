
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface AuthFormProps {
  mode: 'login' | 'signup';
  onSubmit: (data: { email: string; password: string; name?: string; location?: string }) => void;
  onModeSwitch: () => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ mode, onSubmit, onModeSwitch }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    location: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-lg p-8">
      <div className="text-center mb-6">
        <div className="text-4xl mb-2">🌾</div>
        <h2 className="text-2xl font-bold text-green-700">
          {mode === 'login' ? 'Welcome Back!' : 'Join FarmConnect'}
        </h2>
        <p className="text-gray-600 mt-1">
          {mode === 'login' ? 'Sign in to your farm dashboard' : 'Create your farmer account'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {mode === 'signup' && (
          <>
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="location">Farm Location</Label>
              <Input
                id="location"
                type="text"
                placeholder="e.g., Nairobi, Kenya"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                required
              />
            </div>
          </>
        )}
        
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </div>
        
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
        </div>

        <Button type="submit" className="w-full bg-green-500 hover:bg-green-600">
          {mode === 'login' ? 'Sign In 🚜' : 'Create Account 🌱'}
        </Button>
      </form>

      <div className="text-center mt-6">
        <p className="text-gray-600">
          {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
          <button
            onClick={onModeSwitch}
            className="text-green-600 hover:text-green-700 font-medium"
          >
            {mode === 'login' ? 'Sign up here' : 'Sign in here'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
