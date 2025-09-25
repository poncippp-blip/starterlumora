import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Shield, Zap, Clock } from "lucide-react";

interface HeroSectionProps {
  onViewTiers?: () => void;
  onViewVerification?: () => void;
}

const HeroSection = ({
  onViewTiers = () => window.scrollTo({ top: 800, behavior: "smooth" }),
  onViewVerification = () => window.scrollTo({ top: 1400, behavior: "smooth" }),
}: HeroSectionProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorTrails, setCursorTrails] = useState<Array<{id: number, x: number, y: number}>>([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const newPosition = {
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      };
      setMousePosition(newPosition);

      // Add cursor trail
      const newTrail = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY,
      };
      setCursorTrails(prev => [...prev.slice(-8), newTrail]);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Clean up old trails
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorTrails(prev => prev.slice(-5));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-screen ultra-dark-bg overflow-hidden">
      {/* Cursor trails */}
      {cursorTrails.map((trail, index) => (
        <div
          key={trail.id}
          className="cursor-trail"
          style={{
            left: trail.x,
            top: trail.y,
            opacity: (index + 1) / cursorTrails.length * 0.6,
            transform: `scale(${(index + 1) / cursorTrails.length})`,
          }}
        />
      ))}

      {/* Aurora ribbons background */}
      <div className="absolute inset-0 z-0">
        <div className="aurora-1 absolute top-1/4 left-0 w-[600px] h-32 bg-gradient-to-r from-transparent via-[#00FFC2]/10 to-transparent blur-xl"></div>
        <div className="aurora-2 absolute top-3/4 right-0 w-[500px] h-24 bg-gradient-to-l from-transparent via-[#FF2D9C]/8 to-transparent blur-lg"></div>
        <div className="aurora-1 absolute top-1/2 left-1/3 w-[400px] h-16 bg-gradient-to-r from-transparent via-[#FF7A00]/6 to-transparent blur-2xl" style={{ animationDelay: '15s' }}></div>
      </div>

      {/* Floating shards in 3D space */}
      <div className="absolute inset-0 z-1" style={{ perspective: '1000px' }}>
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className={`absolute w-3 h-8 bg-gradient-to-b from-white/20 to-transparent shard-float-${(i % 2) + 1}`}
            style={{
              left: `${15 + (i * 12)}%`,
              top: `${25 + (i * 8)}%`,
              clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
              transformStyle: 'preserve-3d',
              animationDelay: `${i * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Particle clusters with cursor reactivity */}
      <div className="absolute inset-0 z-2">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 bg-[#00FFC2] rounded-full particle-drift-${(i % 3) + 1}`}
            style={{
              left: `${8 + (i * 4.5)}%`,
              top: `${15 + (i * 4)}%`,
              transform: `translate(${mousePosition.x * 0.03}px, ${mousePosition.y * 0.02}px)`,
              transition: 'transform 0.4s ease-out',
              animationDelay: `${i * 0.3}s`,
              opacity: 0.6,
            }}
          />
        ))}
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={`magenta-${i}`}
            className={`absolute w-0.5 h-0.5 bg-[#FF2D9C] rounded-full particle-drift-${(i % 3) + 1}`}
            style={{
              left: `${20 + (i * 5)}%`,
              top: `${30 + (i * 3.5)}%`,
              transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.025}px)`,
              transition: 'transform 0.5s ease-out',
              animationDelay: `${i * 0.4}s`,
              opacity: 0.4,
            }}
          />
        ))}
      </div>

      {/* Main content - asymmetrical layout */}
      <div className="relative z-10 container mx-auto h-full flex items-center px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full max-w-7xl mx-auto">
          {/* Hero content - offset left */}
          <div className="lg:pr-12 flex flex-col justify-center">
            {/* Tier badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 glass-card border border-[#00FFC2]/40 rounded-full mb-8 w-fit"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Shield className="w-4 h-4 text-[#00FFC2]" />
              <span className="text-sm font-mono text-white/90 tracking-wider">VERIFIED SYSTEM</span>
            </motion.div>

            {/* Hero headline - removed text-neon-glow */}
            <motion.h1
              className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tight mb-6 text-white leading-none"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              VOUCHED.
              <br />
              <span className="text-gray-400">VERIFIED.</span>
              <br />
              <span className="text-[#00FFC2]">VALUED.</span>
            </motion.h1>

            {/* Subhead */}
            <motion.p
              className="text-xl md:text-2xl text-gray-300 mb-12 max-w-lg leading-relaxed font-light"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              Discord credibility in 5 tiers — instant, verified, trusted.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Button
                onClick={onViewTiers}
                className="group relative overflow-hidden bg-[#00FFC2] text-black hover:bg-[#00FFC2]/90 font-bold px-12 py-6 text-lg rounded-none border-2 border-[#00FFC2] transition-all duration-300"
              >
                <span className="relative z-10 flex items-center gap-2">
                  VIEW TIERS
                  <Zap className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              </Button>
              
              <Button
                onClick={onViewVerification}
                variant="outline"
                className="group relative overflow-hidden border-2 border-gray-400 text-gray-300 hover:border-[#FF2D9C] hover:text-white font-bold px-12 py-6 text-lg rounded-none glass-card transition-all duration-300"
              >
                <span className="relative z-10 flex items-center gap-2">
                  HOW VERIFICATION WORKS
                  <Clock className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#FF2D9C]/10 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </Button>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              className="mt-16 flex flex-wrap gap-6 text-gray-500 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              {[
                { icon: Shield, text: "MANUAL VERIFICATION" },
                { icon: Zap, text: "INSTANT DELIVERY" },
                { icon: Clock, text: "24/7 SUPPORT" },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-2 px-3 py-2 glass-card rounded-full hover:border-[#00FFC2]/40 transition-all duration-300 cursor-pointer"
                  whileHover={{ scale: 1.05, y: -2 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <item.icon className="w-4 h-4 text-[#00FFC2]" />
                  <span className="font-mono tracking-wide">{item.text}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right side - examples/proof section */}
          <div className="hidden lg:flex flex-col justify-center">
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              <div className="text-right mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">RECENT DELIVERIES</h3>
                <p className="text-gray-400 font-mono text-sm">LIVE VERIFICATION FEED</p>
              </div>

              {/* Mock verification cards */}
              {[
                { tier: "ELITE", time: "2 min ago", status: "DELIVERED" },
                { tier: "PREMIUM", time: "8 min ago", status: "PROCESSING" },
                { tier: "STANDARD", time: "15 min ago", status: "DELIVERED" },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="glass-card p-4 rounded-lg border-l-4 border-[#00FFC2] hover:glass-card-hover transition-all duration-300"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 + (index * 0.2) }}
                  whileHover={{ x: -5, scale: 1.02 }}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-white font-bold text-sm">{item.tier} TIER</p>
                      <p className="text-gray-400 text-xs font-mono">{item.time}</p>
                    </div>
                    <div className={`px-2 py-1 rounded text-xs font-mono ${
                      item.status === 'DELIVERED' 
                        ? 'bg-[#00FFC2]/20 text-[#00FFC2]' 
                        : 'bg-[#FF7A00]/20 text-[#FF7A00]'
                    }`}>
                      {item.status}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.5 }}
      >
        <div className="w-6 h-12 border-2 border-gray-400 rounded-full flex justify-center glass-card">
          <motion.div
            className="w-1 h-3 bg-[#00FFC2] rounded-full mt-2"
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default HeroSection;