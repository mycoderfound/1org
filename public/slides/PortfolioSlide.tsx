
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Globe, User, Briefcase, Users, TrendingUp, DollarSign } from 'lucide-react';

interface PortfolioSlideProps {
  data: any;
}

export function PortfolioSlide({ data }: PortfolioSlideProps) {
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

  const featureIcons = [User, Globe, Briefcase, Users];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Mission & Overview */}
      <motion.div variants={itemVariants}>
        <Card className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/20 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 bg-purple-400 rounded-full" />
              <Badge variant="outline" className="text-purple-400 border-purple-500/30">
                Portfolio Hub
              </Badge>
            </div>
            <CardTitle className="text-white text-xl">myCoderFound.Me Platform</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-300 text-lg leading-relaxed">
              {data.mission}
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Platform Features */}
      <motion.div variants={itemVariants}>
        <h2 className="text-2xl font-bold text-white mb-6">Platform Features</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {data.features.map((feature: any, index: number) => {
            const IconComponent = featureIcons[index];
            return (
              <motion.div
                key={feature.name}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
              >
                <Card className="h-full bg-slate-800/50 border-slate-700/50 backdrop-blur-sm hover:border-purple-500/30 transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                        <IconComponent className="w-5 h-5 text-purple-400" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-white text-lg">{feature.name}</CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-300 mb-4 leading-relaxed">
                      {feature.description}
                    </p>
                    <div className="grid grid-cols-1 gap-3">
                      {feature.users && (
                        <div className="bg-slate-700/30 rounded-lg p-3">
                          <div className="text-sm text-slate-400 mb-1">Active Users</div>
                          <div className="text-purple-400 font-semibold">{feature.users}</div>
                        </div>
                      )}
                      {feature.revenue && (
                        <div className="bg-slate-700/30 rounded-lg p-3">
                          <div className="text-sm text-slate-400 mb-1">Revenue Generated</div>
                          <div className="text-emerald-400 font-semibold">{feature.revenue}</div>
                        </div>
                      )}
                      {feature.placements && (
                        <div className="bg-slate-700/30 rounded-lg p-3">
                          <div className="text-sm text-slate-400 mb-1">Successful Placements</div>
                          <div className="text-blue-400 font-semibold">{feature.placements}</div>
                        </div>
                      )}
                      {feature.connections && (
                        <div className="bg-slate-700/30 rounded-lg p-3">
                          <div className="text-sm text-slate-400 mb-1">Professional Connections</div>
                          <div className="text-orange-400 font-semibold">{feature.connections}</div>
                        </div>
                      )}
                      {feature.engagement && (
                        <div className="bg-slate-700/30 rounded-lg p-3">
                          <div className="text-sm text-slate-400 mb-1">Monthly Engagement</div>
                          <div className="text-purple-400 font-semibold">{feature.engagement}</div>
                        </div>
                      )}
                      {feature.growth && (
                        <div className="bg-slate-700/30 rounded-lg p-3">
                          <div className="text-sm text-slate-400 mb-1">Monthly Growth</div>
                          <div className="text-emerald-400 font-semibold">{feature.growth}</div>
                        </div>
                      )}
                      {feature.avgSalary && (
                        <div className="bg-slate-700/30 rounded-lg p-3">
                          <div className="text-sm text-slate-400 mb-1">Average Starting Salary</div>
                          <div className="text-blue-400 font-semibold">{feature.avgSalary}</div>
                        </div>
                      )}
                      {feature.mentorships && (
                        <div className="bg-slate-700/30 rounded-lg p-3">
                          <div className="text-sm text-slate-400 mb-1">Active Mentorships</div>
                          <div className="text-orange-400 font-semibold">{feature.mentorships}</div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Impact Metrics */}
      <motion.div variants={itemVariants}>
        <h2 className="text-2xl font-bold text-white mb-6">Platform Impact Metrics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {data.impactMetrics.map((metric: any, index: number) => (
            <motion.div
              key={metric.metric}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
            >
              <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm hover:border-purple-500/30 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="text-2xl font-bold text-purple-400 mb-2">
                    {metric.value}
                  </div>
                  <div className="text-slate-300 text-sm mb-2">
                    {metric.metric}
                  </div>
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${
                      metric.trend.startsWith('+') 
                        ? 'text-emerald-400 border-emerald-500/30' 
                        : 'text-red-400 border-red-500/30'
                    }`}
                  >
                    {metric.trend}
                  </Badge>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Talent Pipeline */}
      <motion.div variants={itemVariants}>
        <Card className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 border-slate-600/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-purple-400" />
              Closed-Loop Talent Pipeline
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <p className="text-slate-300 text-center mb-4">
                {data.pipeline.description}
              </p>
              <div className="bg-slate-700/30 rounded-lg p-4 text-center">
                <div className="text-purple-400 font-mono text-lg">
                  {data.pipeline.flow}
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-center">
              <div className="flex items-center gap-4 text-center">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center mb-2">
                    <Users className="w-6 h-6 text-emerald-400" />
                  </div>
                  <span className="text-sm text-slate-300">Training</span>
                </div>
                <div className="text-emerald-400 text-2xl">→</div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mb-2">
                    <User className="w-6 h-6 text-purple-400" />
                  </div>
                  <span className="text-sm text-slate-300">Portfolios</span>
                </div>
                <div className="text-purple-400 text-2xl">→</div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mb-2">
                    <Briefcase className="w-6 h-6 text-blue-400" />
                  </div>
                  <span className="text-sm text-slate-300">Opportunities</span>
                </div>
                <div className="text-blue-400 text-2xl">→</div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center mb-2">
                    <DollarSign className="w-6 h-6 text-orange-400" />
                  </div>
                  <span className="text-sm text-slate-300">Revenue</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Platform Statistics */}
      <motion.div variants={itemVariants}>
        <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Platform Success Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-purple-400 mb-2">500+</div>
                <div className="text-slate-400 text-sm">Active Member Profiles</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-emerald-400 mb-2">78%</div>
                <div className="text-slate-400 text-sm">Job Placement Rate</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-400 mb-2">$50K+</div>
                <div className="text-slate-400 text-sm">Member Revenue Generated</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-orange-400 mb-2">150+</div>
                <div className="text-slate-400 text-sm">Active Mentorships</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
