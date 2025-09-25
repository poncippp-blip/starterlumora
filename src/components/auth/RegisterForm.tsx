import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, EyeOff, Mail, Lock, User, UserPlus, Home, CreditCard, Settings, FileText, LogIn } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface RegisterFormProps {
  onRegister?: (email: string, password: string, username: string) => void;
  onSwitchToLogin?: () => void;
}

const RegisterForm = ({ 
  onRegister = () => {}, 
  onSwitchToLogin = () => {} 
}: RegisterFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!email) newErrors.email = 'Email is required';
    if (!username) newErrors.username = 'Username is required';
    if (!password) newErrors.password = 'Password is required';
    if (password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      onRegister(email, password, username);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen ultra-dark-bg flex flex-col">
      {/* Navigation Header */}
      <nav className="glass-card border-b border-gray-800 py-4 px-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-black text-white tracking-wider">
              DISCORD VOUCHES
            </div>
            <div className="flex items-center gap-2">
              <Button
                onClick={() => navigate('/')}
                variant="outline"
                className="border-gray-600 text-gray-300 hover:border-[#00FFC2] hover:text-[#00FFC2]"
                size="sm"
              >
                <Home className="w-4 h-4 mr-2" />
                HOME
              </Button>
              <Button
                onClick={() => navigate('/tokens')}
                variant="outline"
                className="border-[#00FFC2] text-[#00FFC2] hover:bg-[#00FFC2] hover:text-black font-bold"
                size="sm"
              >
                <CreditCard className="w-4 h-4 mr-2" />
                BUY TOKENS
              </Button>
              <Button
                onClick={() => navigate('/dashboard')}
                variant="outline"
                className="border-[#FF7A00] text-[#FF7A00] hover:bg-[#FF7A00] hover:text-black font-bold"
                size="sm"
              >
                <Settings className="w-4 h-4 mr-2" />
                CONTROL PANEL
              </Button>
              <Button
                onClick={() => navigate('/login')}
                variant="outline"
                className="border-[#FF2D9C] text-[#FF2D9C] hover:bg-[#FF2D9C] hover:text-white font-bold"
                size="sm"
              >
                <LogIn className="w-4 h-4 mr-2" />
                LOGIN
              </Button>
              <Button
                onClick={() => navigate('/terms')}
                variant="outline"
                className="border-gray-600 text-gray-300 hover:border-[#FF2D9C] hover:text-[#FF2D9C]"
                size="sm"
              >
                <FileText className="w-4 h-4 mr-2" />
                TERMS
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex-1 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          <Card className="glass-card border-gray-800">
            <CardHeader className="text-center pb-8">
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 glass-card border border-[#FF2D9C]/40 rounded-full mb-6 mx-auto w-fit"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <UserPlus className="w-4 h-4 text-[#FF2D9C]" />
                <span className="text-sm font-mono text-white/90 tracking-wider">REGISTER</span>
              </motion.div>
              
              <CardTitle className="text-3xl font-black text-white tracking-wider">
                CREATE ACCOUNT
              </CardTitle>
              <p className="text-gray-400 mt-2">Join the verified community</p>
            </CardHeader>

            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-white font-bold">
                    Username
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="username"
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="pl-10 glass-card border-gray-700 text-white placeholder-gray-500 focus:border-[#FF2D9C]"
                      placeholder="your_username"
                      required
                    />
                  </div>
                  {errors.username && (
                    <p className="text-red-400 text-sm">{errors.username}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white font-bold">
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 glass-card border-gray-700 text-white placeholder-gray-500 focus:border-[#FF2D9C]"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-400 text-sm">{errors.email}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-white font-bold">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10 glass-card border-gray-700 text-white placeholder-gray-500 focus:border-[#FF2D9C]"
                      placeholder="••••••••"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-red-400 text-sm">{errors.password}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-white font-bold">
                    Confirm Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="pl-10 pr-10 glass-card border-gray-700 text-white placeholder-gray-500 focus:border-[#FF2D9C]"
                      placeholder="••••••••"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-red-400 text-sm">{errors.confirmPassword}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#FF2D9C] text-white hover:bg-[#FF2D9C]/90 font-bold py-6 text-lg rounded-none border-2 border-[#FF2D9C] transition-all duration-300 group"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      CREATING ACCOUNT...
                    </div>
                  ) : (
                    <span className="flex items-center gap-2">
                      CREATE ACCOUNT
                      <UserPlus className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </span>
                  )}
                </Button>
              </form>

              <div className="text-center pt-4 border-t border-gray-800">
                <p className="text-gray-400 text-sm">
                  Already have an account?{' '}
                  <button
                    onClick={onSwitchToLogin}
                    className="text-[#FF2D9C] hover:text-[#FF2D9C]/80 font-bold transition-colors"
                  >
                    Sign In
                  </button>
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default RegisterForm;