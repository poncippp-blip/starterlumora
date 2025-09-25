import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import HeroSection from "./HeroSection";
import ComparisonSection from "./ComparisonSection";
import { Shield, Star, Users, Clock, Zap, CheckCircle, LogIn, UserPlus, CreditCard, Settings, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

const Home = () => {
  const [scrollY, setScrollY] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen ultra-dark-bg text-white overflow-x-hidden">
      {/* Navigation Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-black text-white tracking-wider">
              DISCORD VOUCHES
            </div>
            <div className="flex items-center gap-2">
              <Button
                onClick={() => navigate('/dashboard')}
                variant="outline"
                className="border-[#FF7A00] text-[#FF7A00] hover:bg-[#FF7A00] hover:text-black font-bold"
              >
                <Settings className="w-4 h-4 mr-2" />
                CONTROL PANEL
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
              <Button
                onClick={() => navigate('/terms')}
                variant="outline"
                className="border-gray-600 text-gray-300 hover:border-[#FF2D9C] hover:text-[#FF2D9C]"
              >
                <FileText className="w-4 h-4 mr-2" />
                TERMS
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main content with top padding for fixed nav */}
      <div className="pt-20">
        <HeroSection />
        
        {/* Pricing Section */}
        <section className="py-24 relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              className="text-center mb-20"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 glass-card border border-[#00FFC2]/40 rounded-full mb-8"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Shield className="w-4 h-4 text-[#00FFC2]" />
                <span className="text-sm font-mono text-white/90 tracking-wider">PRICING</span>
              </motion.div>

              <h2 className="text-6xl md:text-7xl font-black text-white mb-8 tracking-tight">
                SIMPLE
                <br />
                <span className="text-gray-400">PRICING</span>
              </h2>
              <div className="w-32 h-1 bg-gradient-to-r from-[#00FFC2] to-[#FF2D9C] mx-auto mb-8"></div>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                No complex tiers. Pay per vouch based on quality level.
                <br />
                Admin-managed accounts ensure authentic verification.
              </p>
            </motion.div>

            {/* Pricing Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-16">
              {[
                { name: 'Starter', price: '$0.50', color: '#00FFC2', description: 'Basic vouch service' },
                { name: 'Trusted', price: '$1.00', color: '#FF2D9C', description: 'Enhanced verification' },
                { name: 'Professional', price: '$2.00', color: '#FF7A00', description: 'Premium quality' },
                { name: 'Elite', price: '$3.00', color: '#00FFC2', description: 'Top-tier service' }
              ].map((tier, index) => (
                <motion.div
                  key={index}
                  className="glass-card hover:glass-card-hover p-6 rounded-lg border transition-all duration-300 hover-lift"
                  style={{ borderColor: `${tier.color}40` }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="text-center">
                    <h3 className="text-2xl font-black text-white mb-2">{tier.name}</h3>
                    <p className="text-gray-400 text-sm mb-4">{tier.description}</p>
                    <div className="text-4xl font-black mb-4" style={{ color: tier.color }}>
                      {tier.price}
                    </div>
                    <p className="text-gray-500 text-sm">per vouch</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA Section */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="glass-card p-8 rounded-lg max-w-2xl mx-auto">
                <h3 className="text-2xl font-bold text-white mb-4">Ready to get started?</h3>
                <p className="text-gray-400 mb-6">
                  Purchase tokens and start building your Discord credibility today.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    onClick={() => navigate('/tokens')}
                    className="bg-[#00FFC2] text-black hover:bg-[#00FFC2]/90 font-bold px-8 py-4 rounded-none transition-all duration-300 group"
                  >
                    <span className="flex items-center gap-2">
                      BUY TOKENS NOW
                      <CreditCard className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
                    </span>
                  </Button>
                  <Button
                    onClick={() => navigate('/dashboard')}
                    variant="outline"
                    className="border-2 border-[#FF7A00] text-[#FF7A00] hover:bg-[#FF7A00] hover:text-black font-bold px-8 py-4 rounded-none transition-all duration-300 group"
                  >
                    <span className="flex items-center gap-2">
                      CONTROL PANEL
                      <Settings className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
                    </span>
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
        
        <ComparisonSection />

        {/* Enhanced Stats Section */}
        <section className="py-32 relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              className="text-center mb-20"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 glass-card border border-[#00FFC2]/40 rounded-full mb-8"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Star className="w-4 h-4 text-[#00FFC2]" />
                <span className="text-sm font-mono text-white/90 tracking-wider">PROVEN RESULTS</span>
              </motion.div>

              <h2 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tight">
                TRUSTED BY
                <br />
                <span className="text-gray-400">THOUSANDS</span>
              </h2>
              <div className="w-32 h-1 bg-gradient-to-r from-[#00FFC2] to-[#FF2D9C] mx-auto"></div>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
              {[
                { value: "15,000+", label: "VOUCHES DELIVERED", icon: CheckCircle, color: "#00FFC2" },
                { value: "99.9%", label: "SUCCESS RATE", icon: Shield, color: "#FF2D9C" },
                { value: "8,500+", label: "VERIFIED CLIENTS", icon: Users, color: "#FF7A00" },
                { value: "24/7", label: "SUPPORT UPTIME", icon: Clock, color: "#00FFC2" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center p-8 glass-card hover:glass-card-hover transition-all duration-500 group cursor-pointer hover-lift"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  style={{
                    borderColor: `${stat.color}40`,
                  }}
                >
                  <div className="mb-4 flex justify-center">
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center border-2 group-hover:scale-110 transition-all duration-300"
                      style={{ 
                        borderColor: stat.color,
                        backgroundColor: `${stat.color}20`,
                      }}
                    >
                      <stat.icon className="w-6 h-6" style={{ color: stat.color }} />
                    </div>
                  </div>
                  <p className="text-4xl md:text-5xl font-black text-white mb-3 group-hover:scale-105 transition-all duration-300">
                    {stat.value}
                  </p>
                  <p className="text-sm text-gray-400 font-bold tracking-wider font-mono">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced Footer */}
        <footer className="py-20 border-t border-gray-800 relative">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
              <div className="md:col-span-2">
                <h3 className="text-3xl font-black text-white mb-6 tracking-wider">
                  DISCORD VOUCHES
                </h3>
                <p className="text-gray-400 leading-relaxed mb-6 text-lg">
                  Premium verification services for Discord communities. 
                  Building trust through authentic credibility and manual verification processes.
                </p>
                <div className="flex items-center gap-4">
                  {[
                    { icon: Shield, color: "#00FFC2", label: "VERIFIED" },
                    { icon: Zap, color: "#FF2D9C", label: "INSTANT" },
                    { icon: CheckCircle, color: "#FF7A00", label: "TRUSTED" },
                  ].map((badge, index) => (
                    <div 
                      key={index}
                      className="flex items-center gap-2 px-3 py-2 glass-card rounded-full hover:scale-105 transition-all duration-300"
                      style={{ borderColor: `${badge.color}40` }}
                    >
                      <badge.icon className="w-4 h-4" style={{ color: badge.color }} />
                      <span className="text-xs font-mono text-gray-400">{badge.label}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-black text-white mb-6 tracking-wider">
                  QUICK LINKS
                </h4>
                <ul className="text-gray-400 space-y-3 text-sm">
                  <li>
                    <button 
                      onClick={() => navigate('/tokens')}
                      className="flex items-center gap-2 hover:text-[#00FFC2] transition-colors"
                    >
                      <div className="w-1 h-1 bg-[#00FFC2] rounded-full"></div>
                      Buy Tokens
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => navigate('/login')}
                      className="flex items-center gap-2 hover:text-[#FF2D9C] transition-colors"
                    >
                      <div className="w-1 h-1 bg-[#FF2D9C] rounded-full"></div>
                      Login
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => navigate('/register')}
                      className="flex items-center gap-2 hover:text-[#FF7A00] transition-colors"
                    >
                      <div className="w-1 h-1 bg-[#FF7A00] rounded-full"></div>
                      Register
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => navigate('/dashboard')}
                      className="flex items-center gap-2 hover:text-[#00FFC2] transition-colors"
                    >
                      <div className="w-1 h-1 bg-[#00FFC2] rounded-full"></div>
                      Dashboard
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => navigate('/terms')}
                      className="flex items-center gap-2 hover:text-[#FF2D9C] transition-colors"
                    >
                      <div className="w-1 h-1 bg-[#FF2D9C] rounded-full"></div>
                      Terms & Policy
                    </button>
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-lg font-black text-white mb-6 tracking-wider">
                  SUPPORT & GUARANTEES
                </h4>
                <ul className="text-gray-400 space-y-3 text-sm">
                  <li className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-[#00FFC2] rounded-full"></div>
                    24/7 Customer Support
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-[#FF2D9C] rounded-full"></div>
                    Instant Delivery Tracking
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-[#FF7A00] rounded-full"></div>
                    Refund Protection
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-[#00FFC2] rounded-full"></div>
                    Manual Verification
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="text-center border-t border-gray-800 pt-12">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-0.5 bg-gradient-to-r from-[#00FFC2] via-[#FF2D9C] to-[#FF7A00]"></div>
              </div>
              <p className="text-gray-500 text-sm font-mono mb-2">
                © {new Date().getFullYear()} DISCORD VOUCHES. ALL RIGHTS RESERVED.
              </p>
              <p className="text-gray-600 text-xs font-mono">
                NOT AFFILIATED WITH DISCORD, INC. | MANUAL VERIFICATION SERVICES
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Home;