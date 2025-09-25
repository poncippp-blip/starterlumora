import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { CheckIcon, XIcon, Shield, Clock, RefreshCw, Star, Zap, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ComparisonFeature {
  feature: string;
  basic: boolean | string;
  standard: boolean | string;
  premium: boolean | string;
  elite: boolean | string;
}

const ComparisonSection = () => {
  const [scrollY, setScrollY] = useState(0);
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const comparisonData: ComparisonFeature[] = [
    {
      feature: "Verification Speed",
      basic: "48 hours",
      standard: "24 hours",
      premium: "12 hours",
      elite: "6 hours",
    },
    {
      feature: "Community Placement",
      basic: "Standard",
      standard: "Priority",
      premium: "Top-tier",
      elite: "Exclusive",
    },
    {
      feature: "Credibility Report",
      basic: false,
      standard: "Basic",
      premium: "Detailed",
      elite: "Comprehensive",
    },
    {
      feature: "Support Response",
      basic: "48 hours",
      standard: "24 hours",
      premium: "12 hours",
      elite: "Instant",
    },
    {
      feature: "Refund Protection",
      basic: "24 hours",
      standard: "48 hours",
      premium: "7 days",
      elite: "Lifetime",
    },
    {
      feature: "Verification Badge",
      basic: false,
      standard: false,
      premium: true,
      elite: true,
    },
    {
      feature: "Account Manager",
      basic: false,
      standard: false,
      premium: false,
      elite: true,
    },
  ];

  const verificationSteps = [
    {
      title: "SUBMIT",
      description: "Provide your Discord details and select your preferred tier for verification",
      icon: <Clock className="h-8 w-8 text-[#00FFC2]" />,
      step: "01",
      color: "#00FFC2",
    },
    {
      title: "VERIFY",
      description: "Our team manually reviews and verifies your request using advanced protocols",
      icon: <Shield className="h-8 w-8 text-[#FF2D9C]" />,
      step: "02",
      color: "#FF2D9C",
    },
    {
      title: "DELIVER",
      description: "Receive your verified vouch with full documentation and tracking confirmation",
      icon: <RefreshCw className="h-8 w-8 text-[#FF7A00]" />,
      step: "03",
      color: "#FF7A00",
    },
  ];

  const vouchExamples = [
    {
      tier: "ELITE",
      preview: "★★★★★ Exceptional service provider...",
      timestamp: "2 min ago",
      status: "DELIVERED",
    },
    {
      tier: "PREMIUM",
      preview: "Highly recommended for quality work...",
      timestamp: "8 min ago",
      status: "PROCESSING",
    },
    {
      tier: "TRUSTED",
      preview: "Reliable and professional experience...",
      timestamp: "15 min ago",
      status: "DELIVERED",
    },
  ];

  return (
    <section className="ultra-dark-bg py-24 relative overflow-hidden">
      {/* Enhanced parallax background elements */}
      <div 
        className="absolute inset-0"
        style={{ transform: `translateY(${scrollY * 0.3}px)` }}
      >
        <div className="absolute top-1/3 left-1/5 w-[600px] h-2 bg-gradient-to-r from-transparent via-[#00FFC2]/10 to-transparent blur-xl rotate-12"></div>
        <div className="absolute bottom-1/3 right-1/5 w-[400px] h-1 bg-gradient-to-l from-transparent via-[#FF2D9C]/15 to-transparent blur-lg -rotate-12"></div>
        <div className="absolute top-2/3 left-2/3 w-[300px] h-1 bg-gradient-to-r from-transparent via-[#FF7A00]/12 to-transparent blur-2xl rotate-45"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Vouch Examples Section */}
        <motion.div
          className="mb-32"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-16">
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 glass-card border border-[#FF2D9C]/40 rounded-full mb-8"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Star className="w-4 h-4 text-[#FF2D9C]" />
              <span className="text-sm font-mono text-white/90 tracking-wider">LIVE PROOF</span>
            </motion.div>

            <h2 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tight">
              RECENT
              <br />
              <span className="text-gray-400">DELIVERIES</span>
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-[#FF2D9C] to-[#FF7A00] mx-auto mb-6"></div>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Real vouches delivered to our clients in the last hour
            </p>
          </div>

          {/* Vouch examples carousel */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {vouchExamples.map((example, index) => (
              <motion.div
                key={index}
                className="glass-card p-6 rounded-lg hover:glass-card-hover transition-all duration-300 group cursor-pointer"
                initial={{ opacity: 0, y: 30, rotateY: -5 }}
                whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ 
                  y: -8, 
                  rotateY: 1,
                  scale: 1.02,
                }}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className={`px-3 py-1 rounded-full text-xs font-mono border ${
                    example.tier === 'ELITE' 
                      ? 'border-[#00FFC2] text-[#00FFC2] bg-[#00FFC2]/10' 
                      : example.tier === 'PREMIUM'
                      ? 'border-[#FF2D9C] text-[#FF2D9C] bg-[#FF2D9C]/10'
                      : 'border-[#FF7A00] text-[#FF7A00] bg-[#FF7A00]/10'
                  }`}>
                    {example.tier}
                  </div>
                  <div className={`px-2 py-1 rounded text-xs font-mono ${
                    example.status === 'DELIVERED' 
                      ? 'bg-[#00FFC2]/20 text-[#00FFC2]' 
                      : 'bg-[#FF7A00]/20 text-[#FF7A00]'
                  }`}>
                    {example.status}
                  </div>
                </div>
                
                <div className="mb-4">
                  <p className="text-gray-300 text-sm leading-relaxed italic">
                    "{example.preview}"
                  </p>
                </div>
                
                <div className="flex justify-between items-center text-xs text-gray-500 font-mono">
                  <span>{example.timestamp}</span>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-[#00FFC2] rounded-full animate-pulse"></div>
                    <span>VERIFIED</span>
                  </div>
                </div>

                {/* Hover particle effect */}
                <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute top-2 right-2 w-1 h-1 bg-[#00FFC2] rounded-full animate-ping"></div>
                  <div className="absolute bottom-2 left-2 w-1 h-1 bg-[#FF2D9C] rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Comparison Table Section */}
        <motion.div
          className="mb-32"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-16">
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 glass-card border border-[#FF7A00]/40 rounded-full mb-8"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Shield className="w-4 h-4 text-[#FF7A00]" />
              <span className="text-sm font-mono text-white/90 tracking-wider">COMPARISON</span>
            </motion.div>

            <h2 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tight">
              TIER
              <br />
              <span className="text-gray-400">BREAKDOWN</span>
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-[#FF7A00] to-[#00FFC2] mx-auto mb-6"></div>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Detailed feature comparison across all verification tiers
            </p>
          </div>

          {/* Desktop Table */}
          <div className="hidden lg:block overflow-x-auto">
            <div className="glass-card p-8 rounded-lg">
              <Table className="w-full border-collapse">
                <TableHeader>
                  <TableRow className="border-b-2 border-gray-700">
                    <TableHead className="text-left text-white font-black text-lg py-6 w-1/6">
                      FEATURES
                    </TableHead>
                    <TableHead className="text-center text-white font-black text-lg py-6 w-1/6">
                      STARTER
                      <div className="text-[#00FFC2] text-sm font-normal mt-1">25 tokens</div>
                    </TableHead>
                    <TableHead className="text-center text-white font-black text-lg py-6 w-1/6">
                      TRUSTED
                      <div className="text-[#FF2D9C] text-sm font-normal mt-1">65 tokens</div>
                    </TableHead>
                    <TableHead className="text-center text-white font-black text-lg py-6 w-1/6">
                      PROFESSIONAL
                      <div className="text-[#FF7A00] text-sm font-normal mt-1">120 tokens</div>
                    </TableHead>
                    <TableHead className="text-center text-white font-black text-lg py-6 w-1/6">
                      ELITE
                      <div className="text-[#00FFC2] text-sm font-normal mt-1">250 tokens</div>
                    </TableHead>
                    <TableHead className="text-center text-white font-black text-lg py-6 w-1/6">
                      CUSTOM
                      <div className="text-[#9D4EDD] text-sm font-normal mt-1">500+ tokens</div>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {comparisonData.map((row, index) => (
                    <motion.tr
                      key={index}
                      className={`table-row-hover border-b border-gray-800 transition-all duration-300 ${
                        hoveredRow === index ? 'bg-gradient-to-r from-[#00FFC2]/5 via-[#FF2D9C]/5 to-[#FF7A00]/5' : ''
                      }`}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                      onMouseEnter={() => setHoveredRow(index)}
                      onMouseLeave={() => setHoveredRow(null)}
                    >
                      <TableCell className="font-bold text-white py-6 text-lg">
                        {row.feature}
                      </TableCell>
                      <TableCell className="text-center py-6">
                        {typeof row.basic === "boolean" ? (
                          row.basic ? (
                            <CheckIcon className="checkmark-pop h-6 w-6 text-[#00FFC2] mx-auto" />
                          ) : (
                            <XIcon className="h-6 w-6 text-gray-600 mx-auto" />
                          )
                        ) : (
                          <span className="text-gray-300 font-medium">{row.basic}</span>
                        )}
                      </TableCell>
                      <TableCell className="text-center py-6">
                        {typeof row.standard === "boolean" ? (
                          row.standard ? (
                            <CheckIcon className="checkmark-pop h-6 w-6 text-[#FF2D9C] mx-auto" />
                          ) : (
                            <XIcon className="h-6 w-6 text-gray-600 mx-auto" />
                          )
                        ) : (
                          <span className="text-gray-300 font-medium">{row.standard}</span>
                        )}
                      </TableCell>
                      <TableCell className="text-center py-6">
                        {typeof row.premium === "boolean" ? (
                          row.premium ? (
                            <CheckIcon className="checkmark-pop h-6 w-6 text-[#FF7A00] mx-auto" />
                          ) : (
                            <XIcon className="h-6 w-6 text-gray-600 mx-auto" />
                          )
                        ) : (
                          <span className="text-gray-300 font-medium">{row.premium}</span>
                        )}
                      </TableCell>
                      <TableCell className="text-center py-6">
                        {typeof row.elite === "boolean" ? (
                          row.elite ? (
                            <CheckIcon className="checkmark-pop h-6 w-6 text-[#00FFC2] mx-auto" />
                          ) : (
                            <XIcon className="h-6 w-6 text-gray-600 mx-auto" />
                          )
                        ) : (
                          <span className="text-white font-bold">{row.elite}</span>
                        )}
                      </TableCell>
                      <TableCell className="text-center py-6">
                        <span className="text-[#9D4EDD] font-bold">Custom</span>
                      </TableCell>
                    </motion.tr>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Mobile Cards */}
          <div className="lg:hidden space-y-6">
            {comparisonData.map((row, index) => (
              <Card key={index} className="glass-card border-gray-800">
                <CardContent className="p-6">
                  <h3 className="text-white font-bold text-lg mb-4">{row.feature}</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-gray-400 text-sm mb-2">STARTER</div>
                      {typeof row.basic === "boolean" ? (
                        row.basic ? (
                          <CheckIcon className="h-5 w-5 text-[#00FFC2] mx-auto" />
                        ) : (
                          <XIcon className="h-5 w-5 text-gray-600 mx-auto" />
                        )
                      ) : (
                        <span className="text-gray-300">{row.basic}</span>
                      )}
                    </div>
                    <div className="text-center">
                      <div className="text-gray-400 text-sm mb-2">CUSTOM</div>
                      <span className="text-[#9D4EDD] font-bold">Custom</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Verification Process Section */}
        <motion.div
          className="mb-32"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-16">
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 glass-card border border-[#00FFC2]/40 rounded-full mb-8"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <RefreshCw className="w-4 h-4 text-[#00FFC2]" />
              <span className="text-sm font-mono text-white/90 tracking-wider">PROCESS</span>
            </motion.div>

            <h3 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
              VERIFICATION
              <br />
              <span className="text-gray-400">WORKFLOW</span>
            </h3>
            <div className="w-32 h-1 bg-gradient-to-r from-[#00FFC2] to-[#FF2D9C] mx-auto mb-6"></div>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Three-step manual verification ensuring authentic credibility
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {verificationSteps.map((step, index) => (
              <motion.div
                key={index}
                className="relative group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="glass-card border-2 border-gray-800 overflow-hidden hover:glass-card-hover transition-all duration-500 group-hover:border-opacity-50 h-full"
                  style={{ 
                    borderColor: `${step.color}40`,
                    boxShadow: `0 0 0 0 ${step.color}40`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = `0 0 30px 5px ${step.color}20`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = `0 0 0 0 ${step.color}40`;
                  }}
                >
                  <CardContent className="p-8 text-center relative h-full flex flex-col">
                    {/* Step number */}
                    <div className="absolute top-4 right-4 text-6xl font-black text-gray-800 opacity-50">
                      {step.step}
                    </div>
                    
                    {/* Icon */}
                    <div className="mb-6 flex justify-center">
                      <div 
                        className="w-20 h-20 glass-card border-2 rounded-full flex items-center justify-center group-hover:scale-110 transition-all duration-300"
                        style={{ 
                          borderColor: step.color,
                          boxShadow: `0 0 20px ${step.color}30`,
                        }}
                      >
                        {step.icon}
                      </div>
                    </div>
                    
                    {/* Title */}
                    <h4 className="text-3xl font-black text-white mb-4 tracking-wider">
                      {step.title}
                    </h4>
                    
                    {/* Description */}
                    <p className="text-gray-400 leading-relaxed flex-grow">
                      {step.description}
                    </p>

                    {/* Connection line for desktop */}
                    {index < verificationSteps.length - 1 && (
                      <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-gray-600 to-transparent"></div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Payment Methods Section */}
        <motion.div
          className="mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-black text-white mb-8 tracking-wider">
              SECURE PAYMENT OPTIONS
            </h3>

            <div className="flex flex-wrap justify-center gap-6 mb-12">
              {[
                { name: "PAYPAL", icon: CreditCard, color: "#00FFC2" },
                { name: "STRIPE", icon: CreditCard, color: "#FF2D9C" },
                { name: "BITCOIN", icon: CreditCard, color: "#FF7A00" },
                { name: "ETHEREUM", icon: CreditCard, color: "#00FFC2" },
                { name: "USDT", icon: CreditCard, color: "#FF2D9C" },
              ].map((method, index) => (
                <motion.div
                  key={index}
                  className="payment-glass px-6 py-4 rounded-lg flex items-center gap-3 hover:scale-105 transition-all duration-300 cursor-pointer"
                  whileHover={{ y: -2 }}
                  style={{
                    borderColor: `${method.color}40`,
                  }}
                >
                  <method.icon className="w-5 h-5" style={{ color: method.color }} />
                  <span className="text-gray-300 text-sm font-bold tracking-wide">
                    {method.name}
                  </span>
                </motion.div>
              ))}
            </div>

            <Button
              className="bg-gradient-to-r from-[#00FFC2] to-[#FF2D9C] text-black hover:from-[#FF2D9C] hover:to-[#FF7A00] font-black px-12 py-6 text-lg rounded-none border-2 border-transparent transition-all duration-300 group"
            >
              <span className="flex items-center gap-2">
                START VERIFICATION
                <Zap className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
              </span>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ComparisonSection;