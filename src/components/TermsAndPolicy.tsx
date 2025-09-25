import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Shield, Home, LogIn, UserPlus, CreditCard, Settings } from 'lucide-react';

const TermsAndPolicy = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen ultra-dark-bg text-white">
      {/* Navigation Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-black text-white tracking-wider">
              DISCORD VOUCHES
            </div>
            <div className="flex items-center gap-4">
              <Button
                onClick={() => navigate('/')}
                variant="outline"
                className="border-gray-600 text-gray-300 hover:border-[#00FFC2] hover:text-[#00FFC2]"
              >
                <Home className="w-4 h-4 mr-2" />
                HOME
              </Button>
              <Button
                onClick={() => navigate('/tokens')}
                variant="outline"
                className="border-[#00FFC2] text-[#00FFC2] hover:bg-[#00FFC2] hover:text-black font-bold"
              >
                <CreditCard className="w-4 h-4 mr-2" />
                BUY TOKENS
              </Button>
              <Button
                onClick={() => navigate('/dashboard')}
                variant="outline"
                className="border-[#FF7A00] text-[#FF7A00] hover:bg-[#FF7A00] hover:text-black font-bold"
              >
                <Settings className="w-4 h-4 mr-2" />
                CONTROL PANEL
              </Button>
              <Button
                onClick={() => navigate('/login')}
                variant="outline"
                className="border-[#FF2D9C] text-[#FF2D9C] hover:bg-[#FF2D9C] hover:text-white font-bold"
              >
                <LogIn className="w-4 h-4 mr-2" />
                LOGIN
              </Button>
              <Button
                onClick={() => navigate('/register')}
                className="bg-[#00FFC2] text-black hover:bg-[#00FFC2]/90 font-bold"
              >
                <UserPlus className="w-4 h-4 mr-2" />
                REGISTER
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main content with top padding for fixed nav */}
      <div className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 glass-card border border-[#00FFC2]/40 rounded-full mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Shield className="w-4 h-4 text-[#00FFC2]" />
              <span className="text-sm font-mono text-white/90 tracking-wider">LEGAL</span>
            </motion.div>
            
            <h1 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tight">
              TERMS & POLICY
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Our commitment to transparency and fair service
            </p>
          </motion.div>

          <div className="glass-card border-gray-800 p-8 mb-12">
            <motion.div 
              className="terms-section"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h2 className="text-2xl font-bold text-white mb-4">1. Terms of Service</h2>
              <p>
                By accessing and using Discord Vouches services, you agree to comply with and be bound by the following terms and conditions. 
                Please read these terms carefully before using our services.
              </p>
              
              <h2 className="text-2xl font-bold text-white mt-8 mb-4">2. Service Description</h2>
              <p>
                Discord Vouches provides verification and credibility services for Discord users. Our service involves manual verification 
                processes conducted by our team to ensure authenticity and reliability.
              </p>
              <p>
                We offer various tiers of service with different pricing:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Starter: $0.50 per vouch</li>
                <li>Trusted: $1.00 per vouch</li>
                <li>Professional: $2.00 per vouch</li>
                <li>Elite: $3.00 per vouch</li>
              </ul>
              
              <h2 className="text-2xl font-bold text-white mt-8 mb-4">3. Account Management</h2>
              <p>
                All accounts used for verification are managed by our administrative team. Users cannot connect their own Discord accounts 
                to our service. This ensures the highest level of verification integrity and prevents misuse.
              </p>
              
              <h2 className="text-2xl font-bold text-white mt-8 mb-4">4. Token System</h2>
              <p>
                Our platform operates on a token-based payment system:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>1 Token = $1 USD</li>
                <li>Minimum purchase: 1 token</li>
                <li>Tokens are non-refundable once used for services</li>
                <li>Unused tokens remain in your account balance indefinitely</li>
              </ul>
              
              <h2 className="text-2xl font-bold text-white mt-8 mb-4">5. Privacy Policy</h2>
              <p>
                We are committed to protecting your privacy. Information collected during registration and service use is handled with strict confidentiality:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Personal information is used solely for account management and service delivery</li>
                <li>Payment information is processed securely through our payment providers</li>
                <li>We do not sell or share your data with third parties</li>
                <li>Communication records may be retained for quality assurance</li>
              </ul>
              
              <h2 className="text-2xl font-bold text-white mt-8 mb-4">6. Prohibited Activities</h2>
              <p>
                The following activities are strictly prohibited:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Using our services for fraudulent purposes</li>
                <li>Attempting to manipulate or abuse the verification system</li>
                <li>Sharing account credentials with others</li>
                <li>Using our services to violate Discord's Terms of Service</li>
                <li>Engaging in any illegal activities through our platform</li>
              </ul>
              
              <h2 className="text-2xl font-bold text-white mt-8 mb-4">7. Refund Policy</h2>
              <p>
                Our refund policy is as follows:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Unused tokens may be eligible for refund within 7 days of purchase</li>
                <li>Refund requests must be submitted through our support system</li>
                <li>Processing fees may be deducted from refunded amounts</li>
                <li>Services already delivered are not eligible for refunds</li>
              </ul>
              
              <h2 className="text-2xl font-bold text-white mt-8 mb-4">8. Service Availability</h2>
              <p>
                While we strive to maintain 24/7 service availability, we cannot guarantee uninterrupted access to our platform. 
                Maintenance periods, technical issues, or other circumstances may temporarily affect service availability.
              </p>
              
              <h2 className="text-2xl font-bold text-white mt-8 mb-4">9. Limitation of Liability</h2>
              <p>
                Discord Vouches shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting 
                from your use of or inability to use our services.
              </p>
              
              <h2 className="text-2xl font-bold text-white mt-8 mb-4">10. Changes to Terms</h2>
              <p>
                We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting to our website. 
                Continued use of our services after changes constitutes acceptance of the modified terms.
              </p>
              
              <h2 className="text-2xl font-bold text-white mt-8 mb-4">11. Contact Information</h2>
              <p>
                For questions regarding these terms or our services, please contact our support team through the platform's support system.
              </p>
            </motion.div>
          </div>

          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="glass-card p-8 rounded-lg max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-white mb-4">Have questions about our terms?</h3>
              <p className="text-gray-400 mb-6">
                Our support team is available 24/7 to assist you with any questions or concerns.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => navigate('/')}
                  className="bg-[#00FFC2] text-black hover:bg-[#00FFC2]/90 font-bold px-8 py-4 rounded-none transition-all duration-300 group"
                >
                  <span className="flex items-center gap-2">
                    RETURN TO HOME
                    <Home className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
                  </span>
                </Button>
                <Button
                  onClick={() => navigate('/tokens')}
                  variant="outline"
                  className="border-2 border-[#FF2D9C] text-[#FF2D9C] hover:bg-[#FF2D9C] hover:text-white font-bold px-8 py-4 rounded-none transition-all duration-300 group"
                >
                  <span className="flex items-center gap-2">
                    BUY TOKENS
                    <CreditCard className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
                  </span>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-8 border-t border-gray-800">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-500 text-sm font-mono">
            © {new Date().getFullYear()} DISCORD VOUCHES. ALL RIGHTS RESERVED.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default TermsAndPolicy;