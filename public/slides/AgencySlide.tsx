
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Zap, Globe, Shield, TrendingUp, DollarSign, Users } from 'lucide-react';

interface AgencySlideProps {
  data: any;
}

export function AgencySlide({ data }: AgencySlideProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const serviceIcons = [Zap, Globe, Shield, TrendingUp];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Mission & Overview */}
      <motion.div variants={itemVariants}>
        <Card className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/20 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 bg-blue-400 rounded-full" />
              <Badge variant="outline" className="text-blue-400 border-blue-500/30">
                For-Profit Arm
              </Badge>
            </div>
            <CardTitle className="text-white text-xl">Agency Mission</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-300 text-lg leading-relaxed mb-4">
              {data.mission}
            </p>
            <div className="bg-slate-700/30 rounded-lg p-4">
              <div className="text-blue-400 font-semibold mb-2">Reinvestment Model</div>
              <div className="text-slate-300 text-sm">
                10% of all agency revenue is reinvested directly into Foundation programs, 
                creating a sustainable funding loop for community impact.
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Service Categories */}
      <motion.div variants={itemVariants}>
        <h2 className="text-2xl font-bold text-white mb-6">Productized Service Categories</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {data.services.map((service: any, index: number) => {
            const IconComponent = serviceIcons[index];
            return (
              <motion.div
                key={service.category}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
              >
                <Card className="h-full bg-slate-800/50 border-slate-700/50 backdrop-blur-sm hover:border-blue-500/30 transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                        <IconComponent className="w-5 h-5 text-blue-400" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-white text-lg">{service.category}</CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-blue-400 border-blue-500/30">
                            {service.pricing}
                          </Badge>
                          <Badge variant="outline" className="text-emerald-400 border-emerald-500/30">
                            {service.clients}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {service.offerings.map((offering: string, idx: number) => (
                        <div key={idx} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                          <span className="text-slate-300 text-sm">{offering}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Pricing Tiers */}
      <motion.div variants={itemVariants}>
        <h2 className="text-2xl font-bold text-white mb-6">Pricing Structure</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {data.pricingTiers.map((tier: any, index: number) => (
            <motion.div
              key={tier.level}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
            >
              <Card className={`h-full backdrop-blur-sm transition-all duration-300 ${
                tier.level === 'Level 3' 
                  ? 'bg-gradient-to-br from-purple-500/20 to-blue-500/20 border-purple-500/30' 
                  : 'bg-slate-800/50 border-slate-700/50 hover:border-blue-500/30'
              }`}>
                <CardHeader className="text-center">
                  <CardTitle className={`text-lg ${
                    tier.level === 'Level 3' ? 'text-purple-400' : 'text-white'
                  }`}>
                    {tier.level}
                  </CardTitle>
                  <div className={`text-2xl font-bold ${
                    tier.level === 'Level 3' ? 'text-purple-400' : 'text-blue-400'
                  }`}>
                    {tier.range}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-300 text-sm text-center leading-relaxed">
                    {tier.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Revenue Breakdown */}
      <motion.div variants={itemVariants}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Revenue Streams */}
          <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-blue-400" />
                Revenue Streams ($250K+ Target)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {data.revenueStreams.map((stream: any, index: number) => (
                <div key={stream.source} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300 text-sm">{stream.source}</span>
                    <div className="text-right">
                      <div className="text-white font-semibold">{stream.amount}</div>
                      <div className="text-blue-400 text-xs">{stream.percentage}%</div>
                    </div>
                  </div>
                  <Progress 
                    value={stream.percentage} 
                    className="h-2 bg-slate-700"
                  />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Client Success Metrics */}
          <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Users className="w-5 h-5 text-emerald-400" />
                Client Success Metrics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-emerald-400 mb-2">110+</div>
                  <div className="text-slate-400 text-sm">Active Clients</div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-xl font-bold text-blue-400 mb-1">92%</div>
                    <div className="text-slate-400 text-xs">Client Retention</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-purple-400 mb-1">4.8/5</div>
                    <div className="text-slate-400 text-xs">Satisfaction Score</div>
                  </div>
                </div>

                <div className="bg-slate-700/30 rounded-lg p-4">
                  <div className="text-blue-400 font-semibold mb-2">Partnership Network</div>
                  <div className="text-slate-300 text-sm space-y-1">
                    <div>• Google Cloud Partner</div>
                    <div>• Stripe Technology Partner</div>
                    <div>• Mailchimp Expert</div>
                    <div>• Play.ai Integration Specialist</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>

      {/* Impact & Reinvestment */}
      <motion.div variants={itemVariants}>
        <Card className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 border-slate-600/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Agency Impact & Reinvestment Model</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-blue-400 mb-2">$250K+</div>
                <div className="text-slate-400 text-sm">Annual Revenue Target</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-emerald-400 mb-2">$25K+</div>
                <div className="text-slate-400 text-sm">Foundation Reinvestment</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-400 mb-2">110+</div>
                <div className="text-slate-400 text-sm">Small Businesses Served</div>
              </div>
            </div>
            <div className="mt-6 text-center">
              <p className="text-slate-300 max-w-2xl mx-auto">
                Every agency project not only delivers business value but also funds community programs, 
                creating a sustainable cycle of growth and social impact.
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
