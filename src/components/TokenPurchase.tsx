import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CreditCard, Shield, Zap, DollarSign, Star, Plus, Minus, Home, LogIn, UserPlus, Settings, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface TokenPurchaseProps {
  onPurchase?: (tokenAmount: number) => void;
}

const TokenPurchase = ({ 
  onPurchase = () => {} 
}: TokenPurchaseProps) => {
  const [tokenAmount, setTokenAmount] = useState(10);
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const extraServices = [
    { id: 'priority', name: 'Priority Processing', cost: 2, description: 'Get your vouches processed first' },
    { id: 'express', name: 'Express Delivery', cost: 3, description: '50% faster delivery time' },
    { id: 'premium_support', name: 'Premium Support', cost: 1, description: '24/7 dedicated support' },
    { id: 'custom_message', name: 'Custom Message Templates', cost: 2, description: 'Personalized vouch messages' },
    { id: 'verification_badge', name: 'Verification Badge', cost: 5, description: 'Special verified badge' }
  ];

  const paymentMethods = [
    { id: 'paypal', name: 'PayPal', icon: '💳' },
    { id: 'stripe', name: 'Credit Card', icon: '💳' },
    { id: 'bitcoin', name: 'Bitcoin', icon: '₿' },
    { id: 'ethereum', name: 'Ethereum', icon: 'Ξ' },
    { id: 'usdt', name: 'USDT', icon: '₮' }
  ];

  const extraCost = selectedExtras.reduce((sum, extraId) => {
    const extra = extraServices.find(e => e.id === extraId);
    return sum + (extra ? extra.cost : 0);
  }, 0);

  const totalCost = tokenAmount + extraCost;

  const handleExtraToggle = (extraId: string) => {
    setSelectedExtras(prev => 
      prev.includes(extraId) 
        ? prev.filter(id => id !== extraId)
        : [...prev, extraId]
    );
  };

  const handlePurchase = async () => {
    if (!paymentMethod || tokenAmount < 1) return;
    
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      onPurchase(tokenAmount);
      setIsProcessing(false);
    }, 2000);
  };

  const adjustTokens = (change: number) => {
    setTokenAmount(prev => Math.max(1, prev + change));
  };

  return (
    <div className="min-h-screen ultra-dark-bg py-4 px-4">
      {/* Navigation Header */}
      <nav className="glass-card border-b border-gray-800 py-4 px-4 mb-8">
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

      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 glass-card border border-[#00FFC2]/40 rounded-full mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <CreditCard className="w-4 h-4 text-[#00FFC2]" />
            <span className="text-sm font-mono text-white/90 tracking-wider">TOKEN PURCHASE</span>
          </motion.div>
          
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tight">
            BUY TOKENS
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Purchase tokens to use our vouch services • 1 Token = $1 USD
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Token Selection */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            {/* Token Amount */}
            <Card className="glass-card border-gray-800">
              <CardHeader>
                <CardTitle className="text-white font-black tracking-wider">
                  TOKEN AMOUNT
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-center gap-4">
                    <Button
                      onClick={() => adjustTokens(-10)}
                      variant="outline"
                      size="sm"
                      className="border-[#00FFC2] text-[#00FFC2] hover:bg-[#00FFC2] hover:text-black"
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={() => adjustTokens(-1)}
                      variant="outline"
                      size="sm"
                      className="border-[#00FFC2] text-[#00FFC2] hover:bg-[#00FFC2] hover:text-black"
                    >
                      -1
                    </Button>
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        value={tokenAmount}
                        onChange={(e) => setTokenAmount(Math.max(1, parseInt(e.target.value) || 1))}
                        className="w-24 glass-card border-gray-700 text-white text-center text-xl font-bold"
                        min={1}
                      />
                      <span className="text-[#00FFC2] font-bold">TOKENS</span>
                    </div>
                    <Button
                      onClick={() => adjustTokens(1)}
                      variant="outline"
                      size="sm"
                      className="border-[#00FFC2] text-[#00FFC2] hover:bg-[#00FFC2] hover:text-black"
                    >
                      +1
                    </Button>
                    <Button
                      onClick={() => adjustTokens(10)}
                      variant="outline"
                      size="sm"
                      className="border-[#00FFC2] text-[#00FFC2] hover:bg-[#00FFC2] hover:text-black"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2">
                    {[10, 25, 50, 100, 250, 500].map((amount) => (
                      <Button
                        key={amount}
                        onClick={() => setTokenAmount(amount)}
                        variant="outline"
                        className="border-gray-600 text-gray-300 hover:border-[#00FFC2] hover:text-[#00FFC2]"
                      >
                        {amount}
                      </Button>
                    ))}
                  </div>
                  
                  <p className="text-gray-400 text-sm text-center">
                    Minimum purchase: 1 token ($1)
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Pricing Tiers Info */}
            <Card className="glass-card border-gray-800">
              <CardHeader>
                <CardTitle className="text-white font-black tracking-wider">
                  VOUCH PRICING
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 glass-card border border-[#00FFC2]/40 rounded-lg">
                    <div>
                      <p className="text-white font-bold">Starter</p>
                      <p className="text-gray-400 text-sm">Basic vouch service</p>
                    </div>
                    <span className="text-[#00FFC2] font-bold">$0.50 per vouch</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 glass-card border border-[#FF2D9C]/40 rounded-lg">
                    <div>
                      <p className="text-white font-bold">Trusted</p>
                      <p className="text-gray-400 text-sm">Enhanced verification</p>
                    </div>
                    <span className="text-[#FF2D9C] font-bold">$1.00 per vouch</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 glass-card border border-[#FF7A00]/40 rounded-lg">
                    <div>
                      <p className="text-white font-bold">Professional</p>
                      <p className="text-gray-400 text-sm">Premium quality</p>
                    </div>
                    <span className="text-[#FF7A00] font-bold">$2.00 per vouch</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 glass-card border border-[#00FFC2]/40 rounded-lg">
                    <div>
                      <p className="text-white font-bold">Elite</p>
                      <p className="text-gray-400 text-sm">Top-tier service</p>
                    </div>
                    <span className="text-[#00FFC2] font-bold">$3.00 per vouch</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Extra Services */}
            <Card className="glass-card border-gray-800">
              <CardHeader>
                <CardTitle className="text-white font-black tracking-wider">
                  EXTRA SERVICES
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {extraServices.map((extra) => (
                  <div key={extra.id} className="flex items-center space-x-3">
                    <Checkbox
                      id={extra.id}
                      checked={selectedExtras.includes(extra.id)}
                      onCheckedChange={() => handleExtraToggle(extra.id)}
                      className="border-gray-600 data-[state=checked]:bg-[#00FFC2] data-[state=checked]:border-[#00FFC2]"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <Label htmlFor={extra.id} className="text-white font-bold cursor-pointer">
                          {extra.name}
                        </Label>
                        <span className="text-[#00FFC2] font-bold">+${extra.cost}</span>
                      </div>
                      <p className="text-gray-400 text-sm">{extra.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Right Column - Payment */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            {/* Order Summary */}
            <Card className="glass-card border-gray-800">
              <CardHeader>
                <CardTitle className="text-white font-black tracking-wider">
                  ORDER SUMMARY
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Base Tokens</span>
                  <span className="text-white font-bold">{tokenAmount} tokens</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Token Cost</span>
                  <span className="text-white font-bold">${tokenAmount}</span>
                </div>
                
                {selectedExtras.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-gray-400 text-sm">Extra Services:</p>
                    {selectedExtras.map(extraId => {
                      const extra = extraServices.find(e => e.id === extraId);
                      return extra ? (
                        <div key={extraId} className="flex justify-between items-center text-sm">
                          <span className="text-gray-300">• {extra.name}</span>
                          <span className="text-[#00FFC2]">+${extra.cost}</span>
                        </div>
                      ) : null;
                    })}
                  </div>
                )}

                <div className="border-t border-gray-700 pt-4">
                  <div className="flex justify-between items-center text-2xl">
                    <span className="text-white font-black">Total</span>
                    <span className="text-[#00FFC2] font-black">${totalCost}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card className="glass-card border-gray-800">
              <CardHeader>
                <CardTitle className="text-white font-black tracking-wider">
                  PAYMENT METHOD
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                  <SelectTrigger className="glass-card border-gray-700 text-white">
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                  <SelectContent className="glass-card border-gray-700 bg-black">
                    {paymentMethods.map((method) => (
                      <SelectItem key={method.id} value={method.id} className="text-white hover:bg-gray-800">
                        <div className="flex items-center gap-2">
                          <span>{method.icon}</span>
                          <span>{method.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            {/* Purchase Button */}
            <Button
              onClick={handlePurchase}
              disabled={!paymentMethod || isProcessing || tokenAmount < 1}
              className="w-full bg-[#00FFC2] text-black hover:bg-[#00FFC2]/90 font-bold py-6 text-lg rounded-none border-2 border-[#00FFC2] transition-all duration-300 group"
            >
              {isProcessing ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  PROCESSING PAYMENT...
                </div>
              ) : (
                <span className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  PURCHASE ${totalCost} ({tokenAmount} TOKENS)
                  <Shield className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                </span>
              )}
            </Button>

            {/* Security Notice */}
            <div className="glass-card p-4 border border-[#00FFC2]/40 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-4 h-4 text-[#00FFC2]" />
                <span className="text-[#00FFC2] font-bold text-sm">SECURE PAYMENT</span>
              </div>
              <p className="text-gray-400 text-xs">
                Your payment is protected by 256-bit SSL encryption. 
                Tokens are added to your account instantly after successful payment.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default TokenPurchase;