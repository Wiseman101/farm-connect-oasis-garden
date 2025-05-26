
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

const AuthPage: React.FC = () => {
  const [mode, setMode] = useState<'login' | 'signup'>('signup');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    location: '',
    bio: '',
    phone: '',
    farmSize: [5] // Default 5 acres
  });
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === 'signup') {
        const { error } = await signUp(formData.email, formData.password, {
          name: formData.name,
          location: formData.location,
          bio: formData.bio,
          phone: formData.phone,
          farm_size: formData.farmSize[0]
        });
        
        if (error) throw error;
        toast.success('Account created successfully! Welcome to FarmConnect! 🌱');
      } else {
        const { error } = await signIn(formData.email, formData.password);
        if (error) throw error;
        toast.success('Welcome back to FarmConnect! 🚜');
      }
    } catch (error: any) {
      toast.error(error.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header with animated farm scene */}
        <div className="bg-gradient-to-r from-green-500 to-green-600 p-8 text-white text-center">
          <div className="text-6xl mb-4 animate-bounce">🌾</div>
          <h1 className="text-3xl font-bold mb-2">FarmConnect</h1>
          <p className="text-green-100">
            {mode === 'login' ? 'Welcome back, farmer!' : 'Join the farming revolution!'}
          </p>
        </div>

        <div className="p-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              {mode === 'login' ? 'Sign In 🚜' : 'Create Account 🌱'}
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {mode === 'signup' && (
              <>
                <div>
                  <Label htmlFor="name" className="flex items-center">
                    <span className="mr-2">👨‍🌾</span>
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="location" className="flex items-center">
                    <span className="mr-2">📍</span>
                    Farm Location
                  </Label>
                  <Input
                    id="location"
                    type="text"
                    placeholder="e.g., Nairobi, Kenya"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    required
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="phone" className="flex items-center">
                    <span className="mr-2">📱</span>
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="e.g., +254712345678"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label className="flex items-center mb-3">
                    <span className="mr-2">🚜</span>
                    Farm Size: {formData.farmSize[0]} acres
                  </Label>
                  <Slider
                    value={formData.farmSize}
                    onValueChange={(value) => setFormData({ ...formData, farmSize: value })}
                    max={100}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>1 acre</span>
                    <span>100+ acres</span>
                  </div>
                </div>

                <div>
                  <Label htmlFor="bio" className="flex items-center">
                    <span className="mr-2">📝</span>
                    Tell us about your farm (optional)
                  </Label>
                  <Textarea
                    id="bio"
                    placeholder="What do you grow? What are your goals?"
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    className="mt-1 resize-none"
                    rows={3}
                  />
                </div>
              </>
            )}
            
            <div>
              <Label htmlFor="email" className="flex items-center">
                <span className="mr-2">📧</span>
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="password" className="flex items-center">
                <span className="mr-2">🔐</span>
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                className="mt-1"
              />
            </div>

            <Button 
              type="submit" 
              className="w-full bg-green-500 hover:bg-green-600 text-lg py-3"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  {mode === 'login' ? 'Signing in...' : 'Creating account...'}
                </span>
              ) : (
                mode === 'login' ? 'Sign In 🚜' : 'Create Account 🌱'
              )}
            </Button>
          </form>

          <div className="text-center mt-6">
            <p className="text-gray-600">
              {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
              <button
                onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                className="text-green-600 hover:text-green-700 font-medium"
              >
                {mode === 'login' ? 'Sign up here' : 'Sign in here'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
