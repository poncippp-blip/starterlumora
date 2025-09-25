import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Settings, 
  MessageSquare, 
  Users, 
  Send, 
  Shield, 
  Clock, 
  CheckCircle,
  AlertCircle,
  CreditCard,
  Home,
  LogOut,
  DollarSign,
  FileText,
  UserPlus,
  LogIn
} from 'lucide-react';

interface ControlDashboardProps {
  tokenBalance?: number;
}

const ControlDashboard = ({ 
  tokenBalance = 0 
}: ControlDashboardProps) => {
  const navigate = useNavigate();
  const [vouchMessage, setVouchMessage] = useState('');
  const [customMessage, setCustomMessage] = useState('');
  const [vouchTier, setVouchTier] = useState('starter');
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState('');

  const vouchTiers = {
    starter: { name: 'Starter', cost: 0.5, color: '#00FFC2', description: 'Basic vouch service' },
    trusted: { name: 'Trusted', cost: 1.0, color: '#FF2D9C', description: 'Enhanced verification' },
    professional: { name: 'Professional', cost: 2.0, color: '#FF7A00', description: 'Premium quality' },
    elite: { name: 'Elite', cost: 3.0, color: '#00FFC2', description: 'Top-tier service' }
  };

  const currentTier = vouchTiers[vouchTier as keyof typeof vouchTiers];

  const vouchTemplates = [
    "Excellent service provider! Fast delivery and professional communication.",
    "Highly recommended! Great quality work and reliable service.",
    "Outstanding experience! Will definitely work with them again.",
    "Professional and trustworthy. Delivered exactly as promised.",
    "Top-tier service! Exceeded all expectations."
  ];

  const mockAccounts = [
    { id: 'acc1', name: 'Premium Vouch Account #1', type: 'Elite', status: 'Available' },
    { id: 'acc2', name: 'Standard Vouch Account #2', type: 'Trusted', status: 'Available' },
    { id: 'acc3', name: 'Premium Vouch Account #3', type: 'Professional', status: 'Available' },
    { id: 'acc4', name: 'Basic Vouch Account #4', type: 'Starter', status: 'Available' },
    { id: 'acc5', name: 'Premium Vouch Account #5', type: 'Elite', status: 'In Use' },
  ];

  const handleSendVouch = async () => {
    if (!vouchMessage || tokenBalance < currentTier.cost || !selectedAccount) return;
    
    setIsProcessing(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      setVouchMessage('');
      // Show success message
    }, 2000);
  };

  const canAffordVouch = tokenBalance >= currentTier.cost;
  const canSendVouch = canAffordVouch && selectedAccount && vouchMessage;

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
                onClick={() => navigate('/tokens')}
                variant="outline"
                className="border-[#00FFC2] text-[#00FFC2] hover:bg-[#00FFC2] hover:text-black font-bold"
                size="sm"
              >
                <CreditCard className="w-4 h-4 mr-2" />
                BUY TOKENS
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

      <div className="container mx-auto max-w-6xl">
        {/* Header with Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 glass-card border border-[#00FFC2]/40 rounded-full mb-4"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Settings className="w-4 h-4 text-[#00FFC2]" />
                <span className="text-sm font-mono text-white/90 tracking-wider">DASHBOARD</span>
              </motion.div>
              
              <h1 className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tight">
                CONTROL PANEL
              </h1>
              <p className="text-gray-400">Manage your vouches and account balance</p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-3xl font-black text-white">
                  ${tokenBalance.toFixed(2)} <span className="text-[#00FFC2] text-lg">USD</span>
                </div>
                <p className="text-gray-400 text-sm">Account Balance</p>
              </div>
              
              <div className="flex flex-col gap-2">
                <Button
                  onClick={() => navigate('/tokens')}
                  className="bg-[#00FFC2] text-black hover:bg-[#00FFC2]/90 font-bold"
                  size="sm"
                >
                  <CreditCard className="w-4 h-4 mr-2" />
                  BUY TOKENS
                </Button>
                <Button
                  onClick={() => navigate('/')}
                  variant="outline"
                  className="border-gray-600 text-gray-300 hover:border-[#FF2D9C] hover:text-[#FF2D9C]"
                  size="sm"
                >
                  <Home className="w-4 h-4 mr-2" />
                  HOME
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        <Tabs defaultValue="vouches" className="space-y-6">
          <TabsList className="glass-card border-gray-800 bg-transparent">
            <TabsTrigger value="vouches" className="data-[state=active]:bg-[#FF2D9C] data-[state=active]:text-black">
              <MessageSquare className="w-4 h-4 mr-2" />
              Send Vouches
            </TabsTrigger>
            <TabsTrigger value="history" className="data-[state=active]:bg-[#00FFC2] data-[state=active]:text-black">
              <Clock className="w-4 h-4 mr-2" />
              History
            </TabsTrigger>
            <TabsTrigger value="account" className="data-[state=active]:bg-[#FF7A00] data-[state=active]:text-black">
              <Users className="w-4 h-4 mr-2" />
              Account
            </TabsTrigger>
          </TabsList>

          {/* Vouches Tab */}
          <TabsContent value="vouches" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Vouch Composer */}
              <Card className="glass-card border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white font-black tracking-wider">
                    SEND VOUCH
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Account Selection */}
                  <div className="space-y-2">
                    <Label className="text-white font-bold">Select Account</Label>
                    <Select value={selectedAccount} onValueChange={setSelectedAccount}>
                      <SelectTrigger className="glass-card border-gray-700 text-white">
                        <SelectValue placeholder="Choose an account" />
                      </SelectTrigger>
                      <SelectContent className="glass-card border-gray-700 bg-black">
                        {mockAccounts.map((account) => (
                          <SelectItem 
                            key={account.id} 
                            value={account.id} 
                            className="text-white hover:bg-gray-800"
                            disabled={account.status === 'In Use'}
                          >
                            <div className="flex items-center justify-between w-full">
                              <span>{account.name}</span>
                              <Badge 
                                className={`ml-2 ${
                                  account.status === 'Available' 
                                    ? 'bg-green-500' 
                                    : 'bg-gray-500'
                                }`}
                              >
                                {account.status}
                              </Badge>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {!selectedAccount && (
                      <p className="text-amber-400 text-xs">Please select an account to send vouches from</p>
                    )}
                  </div>

                  {/* Tier Selection */}
                  <div className="space-y-2">
                    <Label className="text-white font-bold">Vouch Quality</Label>
                    <Select value={vouchTier} onValueChange={setVouchTier}>
                      <SelectTrigger className="glass-card border-gray-700 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="glass-card border-gray-700 bg-black">
                        {Object.entries(vouchTiers).map(([key, tier]) => (
                          <SelectItem key={key} value={key} className="text-white hover:bg-gray-800">
                            <div className="flex items-center justify-between w-full">
                              <span>{tier.name}</span>
                              <span className="ml-4" style={{ color: tier.color }}>
                                ${tier.cost}
                              </span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">{currentTier.description}</span>
                      <span 
                        className="font-bold"
                        style={{ color: currentTier.color }}
                      >
                        Cost: ${currentTier.cost}
                      </span>
                    </div>
                  </div>

                  {/* Balance Check */}
                  {!canAffordVouch && (
                    <div className="p-4 glass-card border border-red-500/40 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertCircle className="w-4 h-4 text-red-400" />
                        <span className="text-red-400 font-bold text-sm">INSUFFICIENT BALANCE</span>
                      </div>
                      <p className="text-gray-400 text-xs">
                        You need ${currentTier.cost} to send this vouch. Current balance: ${tokenBalance.toFixed(2)}
                      </p>
                      <Button
                        onClick={() => navigate('/tokens')}
                        className="mt-3 bg-[#00FFC2] text-black hover:bg-[#00FFC2]/90 font-bold"
                        size="sm"
                      >
                        <CreditCard className="w-4 h-4 mr-2" />
                        BUY TOKENS
                      </Button>
                    </div>
                  )}

                  {/* Quick Templates */}
                  <div className="space-y-2">
                    <Label className="text-white font-bold">Quick Templates</Label>
                    <div className="grid grid-cols-1 gap-2 max-h-40 overflow-y-auto">
                      {vouchTemplates.map((template, index) => (
                        <button
                          key={index}
                          onClick={() => setVouchMessage(template)}
                          className="text-left p-3 glass-card border border-gray-700 hover:border-[#00FFC2] text-gray-300 text-sm rounded-lg transition-all duration-300"
                        >
                          {template}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Vouch Message */}
                  <div className="space-y-2">
                    <Label htmlFor="vouchMessage" className="text-white font-bold">
                      Vouch Message
                    </Label>
                    <Textarea
                      id="vouchMessage"
                      value={vouchMessage}
                      onChange={(e) => setVouchMessage(e.target.value)}
                      className="glass-card border-gray-700 text-white min-h-[120px]"
                      placeholder="Type your vouch message here..."
                    />
                    <div className="text-right text-gray-500 text-sm">
                      {vouchMessage.length} / 500 characters
                    </div>
                  </div>

                  {/* Custom Message */}
                  <div className="space-y-2">
                    <Label htmlFor="customMessage" className="text-white font-bold">
                      Custom Message (Optional)
                    </Label>
                    <Input
                      id="customMessage"
                      value={customMessage}
                      onChange={(e) => setCustomMessage(e.target.value)}
                      className="glass-card border-gray-700 text-white"
                      placeholder="Add custom message or signature"
                    />
                  </div>

                  {/* Send Button */}
                  <Button
                    onClick={handleSendVouch}
                    disabled={isProcessing || !canSendVouch}
                    className="w-full bg-[#FF2D9C] text-white hover:bg-[#FF2D9C]/90 font-bold py-4"
                  >
                    {isProcessing ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        SENDING VOUCH...
                      </div>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send className="w-4 h-4" />
                        SEND VOUCH (${currentTier.cost})
                      </span>
                    )}
                  </Button>
                </CardContent>
              </Card>

              {/* Account Info */}
              <Card className="glass-card border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white font-black tracking-wider">
                    ACCOUNT STATUS
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center p-6 glass-card border border-[#00FFC2]/40 rounded-lg">
                    <div className="w-16 h-16 bg-[#00FFC2]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Shield className="w-8 h-8 text-[#00FFC2]" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">ADMIN MANAGED</h3>
                    <p className="text-gray-400 text-sm">
                      Your vouches are sent through admin-managed accounts for maximum authenticity and credibility.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 glass-card border border-gray-700 rounded-lg">
                      <span className="text-gray-400">Account Balance</span>
                      <span className="text-[#00FFC2] font-bold">${tokenBalance.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 glass-card border border-gray-700 rounded-lg">
                      <span className="text-gray-400">Account Status</span>
                      <Badge className="bg-[#00FFC2] text-black font-bold">ACTIVE</Badge>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 glass-card border border-gray-700 rounded-lg">
                      <span className="text-gray-400">Vouches Sent</span>
                      <span className="text-white font-bold">0</span>
                    </div>
                  </div>

                  <Button
                    onClick={() => navigate('/tokens')}
                    className="w-full bg-[#00FFC2] text-black hover:bg-[#00FFC2]/90 font-bold py-4"
                  >
                    <DollarSign className="w-4 h-4 mr-2" />
                    ADD FUNDS
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* History Tab */}
          <TabsContent value="history" className="space-y-6">
            <Card className="glass-card border-gray-800">
              <CardHeader>
                <CardTitle className="text-white font-black tracking-wider">
                  VOUCH HISTORY
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Clock className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">No Vouches Yet</h3>
                  <p className="text-gray-400 max-w-md mx-auto">
                    Your vouch history will appear here once you start sending vouches.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Account Tab */}
          <TabsContent value="account" className="space-y-6">
            <Card className="glass-card border-gray-800">
              <CardHeader>
                <CardTitle className="text-white font-black tracking-wider">
                  ACCOUNT SETTINGS
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-white">Account Information</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 glass-card border border-gray-700 rounded-lg">
                        <span className="text-gray-400">Email</span>
                        <span className="text-white">user@example.com</span>
                      </div>
                      <div className="flex justify-between items-center p-3 glass-card border border-gray-700 rounded-lg">
                        <span className="text-gray-400">Member Since</span>
                        <span className="text-white">Today</span>
                      </div>
                      <div className="flex justify-between items-center p-3 glass-card border border-gray-700 rounded-lg">
                        <span className="text-gray-400">Total Spent</span>
                        <span className="text-white">$0.00</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-white">Quick Actions</h3>
                    <div className="space-y-3">
                      <Button
                        onClick={() => navigate('/tokens')}
                        className="w-full bg-[#00FFC2] text-black hover:bg-[#00FFC2]/90 font-bold"
                      >
                        <CreditCard className="w-4 h-4 mr-2" />
                        Purchase Tokens
                      </Button>
                      <Button
                        onClick={() => navigate('/')}
                        variant="outline"
                        className="w-full border-gray-600 text-gray-300 hover:border-[#FF2D9C] hover:text-[#FF2D9C]"
                      >
                        <Home className="w-4 h-4 mr-2" />
                        Back to Home
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full border-red-600 text-red-400 hover:border-red-500 hover:text-red-300"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Sign Out
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ControlDashboard;