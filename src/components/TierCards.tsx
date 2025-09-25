import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckIcon, Star, Zap, Shield, Clock } from "lucide-react";

interface TierFeature {
  text: string;
}

interface TierCardProps {
  name: string;
  price: string;
  features: TierFeature[];
  deliveryEta: string;
  socialProof: string;
  tier: number;
  isVisible: boolean;
  description: string;
  highlight?: boolean;
}

const TierCard = ({
  name,
  price,
  features,
  deliveryEta,
  socialProof,
  tier,
  isVisible,
  description,
  highlight = false,
}: TierCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [edgeParticles, setEdgeParticles] = useState<Array<{id: number, progress: number}>>([]);

  useEffect(() => {
    if (isHovered) {
      const interval = setInterval(() => {
        setEdgeParticles(prev => [
          ...prev.filter(p => p.progress < 100),
          { id: Date.now(), progress: 0 }
        ]);
      }, 800);

      const animationInterval = setInterval(() => {
        setEdgeParticles(prev => 
          prev.map(p => ({ ...p, progress: p.progress + 2 }))
        );
      }, 16);

      return () => {
        clearInterval(interval);
        clearInterval(animationInterval);
      };
    } else {
      setEdgeParticles([]);
    }
  }, [isHovered]);

  const tierColors = {
    1: { primary: '#00FFC2', secondary: '#00FFC2/20', glow: 'neon-teal-glow' },
    2: { primary: '#FF2D9C', secondary: '#FF2D9C/20', glow: 'neon-magenta-glow' },
    3: { primary: '#FF7A00', secondary: '#FF7A00/20', glow: 'neon-orange-glow' },
    4: { primary: '#00FFC2', secondary: '#00FFC2/30', glow: 'neon-teal-glow' },
  };

  const color = tierColors[tier as keyof typeof tierColors];

  return (
    <motion.div
      className={`h-full opacity-0 tier-entrance-${tier} ${highlight ? 'lg:scale-105 lg:-mt-4' : ''}`}
      style={{ animationDelay: `${tier * 0.15}s` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card
        className={`tier-card-hover relative h-full overflow-hidden glass-card ${isHovered ? `glass-card-hover ${color.glow}` : ''} ${highlight ? 'border-2' : 'border'} transition-all duration-500`}
        style={{
          borderColor: isHovered ? color.primary : 'rgba(255, 255, 255, 0.1)',
          transform: isHovered ? 'translateY(-12px) rotateY(2deg)' : 'translateY(0) rotateY(0deg)',
        }}
      >
        {/* Tier number indicator with rotation */}
        <div 
          className={`price-badge-rotate absolute top-6 right-6 w-10 h-10 rounded-full flex items-center justify-center font-black text-sm border-2 transition-all duration-300`}
          style={{
            backgroundColor: color.primary,
            color: '#000',
            borderColor: color.primary,
            boxShadow: isHovered ? `0 0 20px ${color.primary}40` : 'none',
          }}
        >
          {tier}
        </div>

        {/* Highlight badge for premium tier */}
        {highlight && (
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="bg-gradient-to-r from-[#FF2D9C] to-[#FF7A00] px-4 py-1 rounded-full">
              <span className="text-black font-bold text-xs tracking-wider">MOST POPULAR</span>
            </div>
          </div>
        )}

        {/* Edge particles animation */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {edgeParticles.map(particle => (
            <div
              key={particle.id}
              className="absolute w-1 h-1 rounded-full"
              style={{
                backgroundColor: color.primary,
                left: `${particle.progress}%`,
                top: '0px',
                opacity: particle.progress < 90 ? 1 : (100 - particle.progress) / 10,
                boxShadow: `0 0 4px ${color.primary}`,
              }}
            />
          ))}
        </div>

        <CardContent className="flex h-full flex-col p-8 relative z-10">
          {/* Tier name and description */}
          <div className="mb-6">
            <h3 className="text-3xl font-black text-white tracking-wider mb-2">
              {name.toUpperCase()}
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">{description}</p>
            <div className="w-16 h-0.5" style={{ backgroundColor: color.primary }}></div>
          </div>

          {/* Price with enhanced styling */}
          <div className="mb-8">
            <div className="flex items-baseline gap-2">
              <p className="text-5xl font-black text-white">
                {price}
              </p>
              <div className="text-gray-500">
                <p className="text-xs font-mono tracking-wider">ONE-TIME</p>
                <p className="text-xs font-mono tracking-wider">PAYMENT</p>
              </div>
            </div>
          </div>

          {/* Features with enhanced icons */}
          <ul className="mb-8 space-y-4 text-sm flex-grow">
            {features.map((feature, index) => (
              <motion.li
                key={index}
                className="flex items-start gap-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: (tier * 0.1) + (index * 0.05) }}
              >
                <div 
                  className="mt-0.5 h-5 w-5 shrink-0 rounded-full flex items-center justify-center border-2"
                  style={{ 
                    borderColor: color.primary,
                    backgroundColor: `${color.primary}20`,
                  }}
                >
                  <CheckIcon className="h-3 w-3" style={{ color: color.primary }} />
                </div>
                <span className="text-gray-300 leading-relaxed">{feature.text}</span>
              </motion.li>
            ))}
          </ul>

          {/* Delivery info with icon */}
          <div className="mb-6 p-4 glass-card border" style={{ borderColor: `${color.primary}40` }}>
            <div className="flex items-center gap-2 mb-2">
              <Clock className="h-4 w-4" style={{ color: color.primary }} />
              <p className="text-xs text-gray-400 uppercase tracking-wide font-mono">
                DELIVERY TIME
              </p>
            </div>
            <p className="text-white font-bold">{deliveryEta}</p>
          </div>

          {/* Social proof with enhanced styling */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-2">
              <Star className="h-4 w-4" style={{ color: color.primary }} />
              <p className="text-xs text-gray-400 uppercase tracking-wide font-mono">
                TRUSTED BY
              </p>
            </div>
            <p className="text-gray-300 text-sm font-medium">{socialProof}</p>
          </div>

          {/* CTA Button with enhanced effects */}
          <Button
            className={`cta-neon-flash cta-shrink-pulse w-full font-black py-6 text-lg tracking-wider rounded-none border-2 transition-all duration-300 relative overflow-hidden group`}
            style={{
              backgroundColor: color.primary,
              borderColor: color.primary,
              color: '#000',
            }}
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              SELECT {name.toUpperCase()}
              <Zap className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
          </Button>
        </CardContent>

        {/* Hover glow overlay */}
        {isHovered && (
          <div 
            className="absolute inset-0 pointer-events-none transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle at center, ${color.primary}10 0%, transparent 70%)`,
            }}
          />
        )}
      </Card>
    </motion.div>
  );
};

const TierCards = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    const element = document.getElementById('tier-cards-section');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const tiers = [
    {
      name: "Starter",
      price: "25 Tokens",
      description: "Quick vouch, basic visibility",
      features: [
        { text: "Standard Discord vouch verification" },
        { text: "Basic credibility boost" },
        { text: "Community placement" },
        { text: "48-hour support response" },
      ],
      deliveryEta: "24-48 hours",
      socialProof: "1,200+ satisfied customers",
      tier: 1,
    },
    {
      name: "Trusted",
      price: "65 Tokens",
      description: "Curated vouches, moderate reach",
      features: [
        { text: "Enhanced vouch verification" },
        { text: "Priority community placement" },
        { text: "Detailed credibility report" },
        { text: "24-hour support response" },
        { text: "Refund protection" },
      ],
      deliveryEta: "12-24 hours",
      socialProof: "2,800+ verified vouches",
      tier: 2,
    },
    {
      name: "Professional",
      price: "120 Tokens",
      description: "High-quality vouches, manual checks",
      features: [
        { text: "Premium vouch verification" },
        { text: "Top-tier community placement" },
        { text: "Comprehensive credibility package" },
        { text: "12-hour support response" },
        { text: "Extended refund protection" },
        { text: "Custom verification badge" },
      ],
      deliveryEta: "6-12 hours",
      socialProof: "950+ premium clients",
      tier: 3,
      highlight: true,
    },
    {
      name: "Elite",
      price: "250 Tokens",
      description: "Verified endorsements, priority delivery",
      features: [
        { text: "Elite-tier vouch verification" },
        { text: "Exclusive community placement" },
        { text: "Full credibility transformation" },
        { text: "Instant support response" },
        { text: "Lifetime refund protection" },
        { text: "Premium verification badge" },
        { text: "Personal account manager" },
      ],
      deliveryEta: "1-6 hours",
      socialProof: "200+ elite members",
      tier: 4,
    },
    {
      name: "Custom",
      price: "500+ Tokens",
      description: "Fully customized vouch packages",
      features: [
        { text: "Completely customized vouch strategy" },
        { text: "Multiple platform verification" },
        { text: "Custom verification timeline" },
        { text: "Dedicated project manager" },
        { text: "Unlimited revisions" },
        { text: "White-glove service" },
        { text: "Custom branding options" },
        { text: "Priority support channel" },
      ],
      deliveryEta: "Custom timeline",
      socialProof: "50+ custom projects",
      tier: 5,
    },
  ];

  const tierColors = {
    1: { primary: '#00FFC2', secondary: '#00FFC2/20' },
    2: { primary: '#FF2D9C', secondary: '#FF2D9C/20' },
    3: { primary: '#FF7A00', secondary: '#FF7A00/20' },
    4: { primary: '#00FFC2', secondary: '#00FFC2/30' },
    5: { primary: '#9D4EDD', secondary: '#9D4EDD/20' },
  };

  return (
    <section id="tier-cards-section" className="ultra-dark-bg py-24 relative overflow-hidden">
      {/* Enhanced background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00FFC2]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#FF2D9C]/8 rounded-full blur-2xl"></div>
        <div className="absolute top-3/4 left-3/4 w-48 h-48 bg-[#FF7A00]/6 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
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
            <span className="text-sm font-mono text-white/90 tracking-wider">TIER SELECTION</span>
          </motion.div>

          <h2 className="text-6xl md:text-7xl font-black text-white mb-8 tracking-tight">
            CHOOSE YOUR
            <br />
            <span className="text-gray-400">TIER</span>
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-[#00FFC2] to-[#FF2D9C] mx-auto mb-8"></div>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Five distinct tiers of Discord credibility verification.
            <br />
            Each crafted for different levels of community trust and recognition.
          </p>
        </motion.div>

        {/* Tier cards grid - now 5 cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 max-w-8xl mx-auto">
          {tiers.map((tier, index) => {
            const color = tierColors[tier.tier as keyof typeof tierColors];
            return (
              <motion.div
                key={index}
                className={`h-full opacity-0 tier-entrance-${tier.tier} ${tier.highlight ? 'lg:scale-105 lg:-mt-4' : ''}`}
                style={{ animationDelay: `${tier.tier * 0.15}s` }}
              >
                <Card
                  className={`relative h-full overflow-hidden glass-card hover:glass-card-hover ${tier.highlight ? 'border-2' : 'border'} transition-all duration-500`}
                  style={{
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                  }}
                >
                  {/* Tier number indicator */}
                  <div 
                    className={`absolute top-6 right-6 w-10 h-10 rounded-full flex items-center justify-center font-black text-sm border-2 transition-all duration-300`}
                    style={{
                      backgroundColor: color.primary,
                      color: '#000',
                      borderColor: color.primary,
                    }}
                  >
                    {tier.tier}
                  </div>

                  {/* Highlight badge for premium tier */}
                  {tier.highlight && (
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <div className="bg-gradient-to-r from-[#FF2D9C] to-[#FF7A00] px-4 py-1 rounded-full">
                        <span className="text-black font-bold text-xs tracking-wider">MOST POPULAR</span>
                      </div>
                    </div>
                  )}

                  <CardContent className="flex h-full flex-col p-8 relative z-10">
                    {/* Tier name and description */}
                    <div className="mb-6">
                      <h3 className="text-3xl font-black text-white tracking-wider mb-2">
                        {tier.name.toUpperCase()}
                      </h3>
                      <p className="text-gray-400 text-sm leading-relaxed mb-4">{tier.description}</p>
                      <div className="w-16 h-0.5" style={{ backgroundColor: color.primary }}></div>
                    </div>

                    {/* Price */}
                    <div className="mb-8">
                      <div className="flex items-baseline gap-2">
                        <p className="text-4xl font-black text-white">
                          {tier.price}
                        </p>
                      </div>
                      <p className="text-xs font-mono tracking-wider text-gray-500 mt-1">
                        1 TOKEN = $1 USD
                      </p>
                    </div>

                    {/* Features */}
                    <ul className="mb-8 space-y-4 text-sm flex-grow">
                      {tier.features.map((feature, featureIndex) => (
                        <motion.li
                          key={featureIndex}
                          className="flex items-start gap-3"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: (tier.tier * 0.1) + (featureIndex * 0.05) }}
                        >
                          <div 
                            className="mt-0.5 h-5 w-5 shrink-0 rounded-full flex items-center justify-center border-2"
                            style={{ 
                              borderColor: color.primary,
                              backgroundColor: `${color.primary}20`,
                            }}
                          >
                            <CheckIcon className="h-3 w-3" style={{ color: color.primary }} />
                          </div>
                          <span className="text-gray-300 leading-relaxed">{feature.text}</span>
                        </motion.li>
                      ))}
                    </ul>

                    {/* Delivery info */}
                    <div className="mb-6 p-4 glass-card border" style={{ borderColor: `${color.primary}40` }}>
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="h-4 w-4" style={{ color: color.primary }} />
                        <p className="text-xs text-gray-400 uppercase tracking-wide font-mono">
                          DELIVERY TIME
                        </p>
                      </div>
                      <p className="text-white font-bold">{tier.deliveryEta}</p>
                    </div>

                    {/* Social proof */}
                    <div className="mb-8">
                      <div className="flex items-center gap-2 mb-2">
                        <Star className="h-4 w-4" style={{ color: color.primary }} />
                        <p className="text-xs text-gray-400 uppercase tracking-wide font-mono">
                          TRUSTED BY
                        </p>
                      </div>
                      <p className="text-gray-300 text-sm font-medium">{tier.socialProof}</p>
                    </div>

                    {/* CTA Button */}
                    <Button
                      className={`w-full font-black py-6 text-lg tracking-wider rounded-none border-2 transition-all duration-300 relative overflow-hidden group`}
                      style={{
                        backgroundColor: color.primary,
                        borderColor: color.primary,
                        color: '#000',
                      }}
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        SELECT {tier.name.toUpperCase()}
                        <Zap className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Enhanced bottom CTA */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="glass-card p-8 rounded-lg max-w-2xl mx-auto">
            <p className="text-gray-400 mb-6 text-lg">
              Not sure which tier is right for you?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="outline"
                className="border-2 border-[#00FFC2] text-[#00FFC2] hover:bg-[#00FFC2] hover:text-black font-bold px-8 py-4 rounded-none glass-card transition-all duration-300 group"
              >
                <span className="flex items-center gap-2">
                  COMPARE ALL TIERS
                  <Shield className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
                </span>
              </Button>
              <Button
                variant="outline"
                className="border-2 border-[#FF2D9C] text-[#FF2D9C] hover:bg-[#FF2D9C] hover:text-black font-bold px-8 py-4 rounded-none glass-card transition-all duration-300 group"
              >
                <span className="flex items-center gap-2">
                  CONTACT SUPPORT
                  <Zap className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
                </span>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TierCards;