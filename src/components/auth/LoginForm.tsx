import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, EyeOff, Mail, Lock, LogIn, Home, UserPlus, CreditCard, Settings, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface LoginFormProps {
  onLogin?: (email: string, password: string) => void;
  onSwitchToRegister?: () => void;
}

const LoginForm = ({ 
  onLogin = () => {}, 
  onSwitchToRegister = () => {} 
}: LoginFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      onLogin(email, password);
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
                onClick={() => navigate('/register')}
                className="bg-[#00FFC2] text-black hover:bg-[#00FFC2]/90 font-bold"
                size="sm"
              >
                <UserPlus className="w-4 h-4 mr-2" />
                REGISTER
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
                className="inline-flex items-center gap-2 px-4 py-2 glass-card border border-[#00FFC2]/40 rounded-full mb-6 mx-auto w-fit"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <LogIn className="w-4 h-4 text-[#00FFC2]" />
                <span className="text-sm font-mono text-white/90 tracking-wider">LOGIN</span>
              </motion.div>
              
              <CardTitle className="text-3xl font-black text-white tracking-wider">
                WELCOME BACK
              </CardTitle>
              <p className="text-gray-400 mt-2">Access your vouch dashboard</p>
            </CardHeader>

            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-6">
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
                      className="pl-10 glass-card border-gray-700 text-white placeholder-gray-500 focus:border-[#00FFC2]"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
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
                      className="pl-10 pr-10 glass-card border-gray-700 text-white placeholder-gray-500 focus:border-[#00FFC2]"
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
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#00FFC2] text-black hover:bg-[#00FFC2]/90 font-bold py-6 text-lg rounded-none border-2 border-[#00FFC2] transition-all duration-300 group"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                      SIGNING IN...
                    </div>
                  ) : (
                    <span className="flex items-center gap-2">
                      SIGN IN
                      <LogIn className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </span>
                  )}
                </Button>
              </form>

              <div className="text-center pt-4 border-t border-gray-800">
                <p className="text-gray-400 text-sm">
                  Don't have an account?{' '}
                  <button
                    onClick={onSwitchToRegister}
                    className="text-[#00FFC2] hover:text-[#00FFC2]/80 font-bold transition-colors"
                  >
                    Create Account
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

export default LoginForm;