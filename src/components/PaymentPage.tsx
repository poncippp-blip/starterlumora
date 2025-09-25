import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CreditCard, Shield, Zap, Plus, Minus, DollarSign, Star } from 'lucide-react';

interface PaymentPageProps {
  selectedTier?: string;
  onPayment?: (paymentData: any) => void;
}

const PaymentPage = ({ 
  selectedTier = 'starter',
  onPayment = () => {} 
}: PaymentPageProps) => {
  const [tokenAmount, setTokenAmount] = useState(25);
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const tiers = {
    starter: { name: 'Starter', baseTokens: 25, color: '#00FFC2' },
    trusted: { name: 'Trusted', baseTokens: 65, color: '#FF2D9C' },
    professional: { name: 'Professional', baseTokens: 120, color: '#FF7A00' },
    elite: { name: 'Elite', baseTokens: 250, color: '#00FFC2' },
    custom: { name: 'Custom', baseTokens: 500, color: '#9D4EDD' }
  };

  const extraServices = [
    { id: 'priority', name: 'Priority Processing', tokens: 10, description: 'Get your vouch processed first' },
    { id: 'express', name: 'Express Delivery', tokens: 15, description: '50% faster delivery time' },
    { id: 'premium_support', name: 'Premium Support', tokens: 8, description: '24/7 dedicated support' },
    { id: 'custom_message', name: 'Custom Message', tokens: 12, description: 'Personalized vouch message' },
    { id: 'verification_badge', name: 'Verification Badge', tokens: 20, description: 'Special verified badge' }
  ];

  const paymentMethods = [
    { id: 'paypal', name: 'PayPal', icon: '💳' },
    { id: 'stripe', name: 'Credit Card', icon: '💳' },
    { id: 'bitcoin', name: 'Bitcoin', icon: '₿' },
    { id: 'ethereum', name: 'Ethereum', icon: 'Ξ' },
    { id: 'usdt', name: 'USDT', icon: '₮' }
  ];

  const currentTier = tiers[selectedTier as keyof typeof tiers];
  const extraTokens = selectedExtras.reduce((sum, extraId) => {
    const extra = extraServices.find(e => e.id === extraId);
    return sum + (extra ? extra.tokens : 0);
  }, 0);

  const totalTokens = tokenAmount + extraTokens;
  const totalPrice = totalTokens; // 1 token = $1

  const handleExtraToggle = (extraId: string) => {
    setSelectedExtras(prev => 
      prev.includes(extraId) 
        ? prev.filter(id => id !== extraId)
        : [...prev, extraId]
    );
  };

  const handlePayment = async () => {
    if (!paymentMethod) return;
    
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      onPayment({
        tier: selectedTier,
        tokens: totalTokens,
        price: totalPrice,
        extras: selectedExtras,
        paymentMethod
      });
      setIsProcessing(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen ultra-dark-bg py-12 px-4">
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
            <span className="text-sm font-mono text-white/90 tracking-wider">PAYMENT</span>
          </motion.div>
          
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tight">
            DEPOSIT TOKENS
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            1 Token = $1 USD • Secure payment processing
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Service Selection */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            {/* Tier Selection */}
            <Card className="glass-card border-gray-800">
              <CardHeader>
                <CardTitle className="text-white font-black tracking-wider">
                  SELECTED TIER
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div 
                  className="p-4 glass-card border-2 rounded-lg"
                  style={{ borderColor: `${currentTier.color}40` }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-white">{currentTier.name}</h3>
                      <p className="text-gray-400 text-sm">Base service package</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          value={tokenAmount}
                          onChange={(e) => setTokenAmount(Math.max(currentTier.baseTokens, parseInt(e.target.value) || currentTier.baseTokens))}
                          className="w-20 glass-card border-gray-700 text-white text-center"
                          min={currentTier.baseTokens}
                        />
                        <span className="text-[#00FFC2] font-bold">TOKENS</span>
                      </div>
                      <p className="text-gray-400 text-xs mt-1">Min: {currentTier.baseTokens}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Extra Services */}
            <Card className="glass-card border-gray-800">
              <CardHeader>
                <CardTitle className="text-white font-black tracking-wider">
                  EXTRA SERVICES (+10% each)
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
                        <span className="text-[#00FFC2] font-bold">+{extra.tokens} tokens</span>
                      </div>
                      <p className="text-gray-400 text-sm">{extra.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Vouch Example */}
            <Card className="glass-card border-gray-800">
              <CardHeader>
                <CardTitle className="text-white font-black tracking-wider">
                  VOUCH PREVIEW
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-4 glass-card border border-[#00FFC2]/40 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <img 
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face&q=80" 
                      alt="Vouch example"
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="text-white font-bold text-sm">VerifiedUser#1234</p>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-[#00FFC2] text-[#00FFC2]" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm italic">
                    "Excellent service provider! Fast delivery, professional communication, 
                    and high-quality work. Highly recommended for anyone looking for reliable services."
                  </p>
                  <div className="flex justify-between items-center mt-3 text-xs text-gray-500">
                    <span>2 minutes ago</span>
                    <span className="text-[#00FFC2]">✓ VERIFIED</span>
                  </div>
                </div>
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
                
                {selectedExtras.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-gray-400 text-sm">Extra Services:</p>
                    {selectedExtras.map(extraId => {
                      const extra = extraServices.find(e => e.id === extraId);
                      return extra ? (
                        <div key={extraId} className="flex justify-between items-center text-sm">
                          <span className="text-gray-300">• {extra.name}</span>
                          <span className="text-[#00FFC2]">+{extra.tokens} tokens</span>
                        </div>
                      ) : null;
                    })}
                  </div>
                )}

                <div className="border-t border-gray-700 pt-4">
                  <div className="flex justify-between items-center text-lg">
                    <span className="text-white font-bold">Total Tokens</span>
                    <span className="text-[#00FFC2] font-black">{totalTokens}</span>
                  </div>
                  <div className="flex justify-between items-center text-2xl mt-2">
                    <span className="text-white font-black">Total Price</span>
                    <span className="text-[#00FFC2] font-black">${totalPrice}</span>
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

            {/* Payment Button */}
            <Button
              onClick={handlePayment}
              disabled={!paymentMethod || isProcessing}
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
                  PAY ${totalPrice} ({totalTokens} TOKENS)
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
                Tokens are deposited instantly after successful payment.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;