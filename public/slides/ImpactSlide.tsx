
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Users, Award, Building, Smartphone, DollarSign, MapPin, TrendingUp, Star } from 'lucide-react';

interface ImpactSlideProps {
  data: any;
}

export function ImpactSlide({ data }: ImpactSlideProps) {
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

  const socialIcons = [Users, Award, Building, Smartphone];
  const economicIcons = [DollarSign, DollarSign, Users, Building];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Social Impact Metrics */}
      <motion.div variants={itemVariants}>
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <Users className="w-6 h-6 text-emerald-400" />
          Social Impact Metrics
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.socialImpact.map((metric: any, index: number) => {
            const IconComponent = socialIcons[index];
            const progressPercentage = (metric.current / metric.target) * 100;
            
            return (
              <motion.div
                key={metric.metric}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm hover:border-emerald-500/30 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                        <IconComponent className="w-5 h-5 text-emerald-400" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm text-slate-400">{metric.metric}</div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between items-end">
                        <div className="text-2xl font-bold text-white">
                          {metric.current.toLocaleString()}
                        </div>
                        <div className="text-sm text-slate-400">
                          / {metric.target.toLocaleString()} {metric.unit}
                        </div>
                      </div>
                      
                      <Progress 
                        value={progressPercentage} 
                        className="h-2 bg-slate-700"
                      />
                      
                      <div className="text-center">
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${
                            progressPercentage >= 75 
                              ? 'text-emerald-400 border-emerald-500/30' 
                              : progressPercentage >= 50
                              ? 'text-yellow-400 border-yellow-500/30'
                              : 'text-red-400 border-red-500/30'
                          }`}
                        >
                          {Math.round(progressPercentage)}% Complete
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Economic Impact Metrics */}
      <motion.div variants={itemVariants}>
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <DollarSign className="w-6 h-6 text-blue-400" />
          Economic Impact Metrics
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.economicImpact.map((metric: any, index: number) => {
            const IconComponent = economicIcons[index];
            const progressPercentage = (metric.current / metric.target) * 100;
            
            return (
              <motion.div
                key={metric.metric}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm hover:border-blue-500/30 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                        <IconComponent className="w-5 h-5 text-blue-400" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm text-slate-400">{metric.metric}</div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between items-end">
                        <div className="text-2xl font-bold text-white">
                          {metric.unit === 'dollars' 
                            ? `$${(metric.current / 1000).toFixed(0)}K`
                            : metric.current.toLocaleString()
                          }
                        </div>
                        <div className="text-sm text-slate-400">
                          / {metric.unit === 'dollars' 
                            ? `$${(metric.target / 1000).toFixed(0)}K`
                            : metric.target.toLocaleString()
                          } {metric.unit === 'dollars' ? '' : metric.unit}
                        </div>
                      </div>
                      
                      <Progress 
                        value={progressPercentage} 
                        className="h-2 bg-slate-700"
                      />
                      
                      <div className="text-center">
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${
                            progressPercentage >= 75 
                              ? 'text-blue-400 border-blue-500/30' 
                              : progressPercentage >= 50
                              ? 'text-yellow-400 border-yellow-500/30'
                              : 'text-red-400 border-red-500/30'
                          }`}
                        >
                          {Math.round(progressPercentage)}% Complete
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Geographic Reach */}
      <motion.div variants={itemVariants}>
        <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <MapPin className="w-5 h-5 text-purple-400" />
              Geographic Reach & Community Impact
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-purple-400 mb-2">
                  {data.geographicReach.currentStates}
                </div>
                <div className="text-slate-400 text-sm mb-1">Current States</div>
                <div className="text-xs text-slate-500">
                  Target: {data.geographicReach.targetStates}
                </div>
              </div>
              
              <div>
                <div className="text-3xl font-bold text-blue-400 mb-2">
                  {data.geographicReach.urbanAreas}
                </div>
                <div className="text-slate-400 text-sm">Urban Areas</div>
              </div>
              
              <div>
                <div className="text-3xl font-bold text-emerald-400 mb-2">
                  {data.geographicReach.ruralAreas}
                </div>
                <div className="text-slate-400 text-sm">Rural Areas</div>
              </div>
              
              <div>
                <div className="text-3xl font-bold text-orange-400 mb-2">
                  {data.geographicReach.underservedCommunities}
                </div>
                <div className="text-slate-400 text-sm">Underserved Communities</div>
              </div>
              
              <div>
                <div className="text-3xl font-bold text-pink-400 mb-2">
                  {Math.round((data.geographicReach.currentStates / data.geographicReach.targetStates) * 100)}%
                </div>
                <div className="text-slate-400 text-sm">Coverage Complete</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Program Effectiveness */}
      <motion.div variants={itemVariants}>
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <Star className="w-6 h-6 text-yellow-400" />
          Program Effectiveness Metrics
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {data.programEffectiveness.map((program: any, index: number) => (
            <motion.div
              key={program.program}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
            >
              <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm hover:border-yellow-500/30 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-white text-lg">{program.program}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-emerald-400 mb-1">
                        {program.completionRate}%
                      </div>
                      <div className="text-slate-400 text-xs">Completion Rate</div>
                      <Progress 
                        value={program.completionRate} 
                        className="h-1 bg-slate-700 mt-2"
                      />
                    </div>
                    
                    <div className="text-center">
                      <div className="text-2xl font-bold text-yellow-400 mb-1">
                        {program.satisfactionScore}
                      </div>
                      <div className="text-slate-400 text-xs">Satisfaction Score</div>
                      <Progress 
                        value={(program.satisfactionScore / 5) * 100} 
                        className="h-1 bg-slate-700 mt-2"
                      />
                    </div>
                    
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-400 mb-1">
                        {program.employmentRate}%
                      </div>
                      <div className="text-slate-400 text-xs">Employment Rate</div>
                      <Progress 
                        value={program.employmentRate} 
                        className="h-1 bg-slate-700 mt-2"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Overall Impact Summary */}
      <motion.div variants={itemVariants}>
        <Card className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 border-slate-600/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-400" />
              Overall Impact Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center mb-6">
              <p className="text-slate-300 text-lg max-w-3xl mx-auto leading-relaxed">
                myCoderFOUND's three-pillar ecosystem has demonstrated measurable impact across social, 
                economic, and educational dimensions, creating a sustainable model for community transformation.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="bg-slate-700/30 rounded-lg p-4">
                <div className="text-2xl font-bold text-emerald-400 mb-2">85%</div>
                <div className="text-slate-300 font-semibold mb-1">Average Program Success Rate</div>
                <div className="text-slate-400 text-sm">Across all Foundation programs</div>
              </div>
              
              <div className="bg-slate-700/30 rounded-lg p-4">
                <div className="text-2xl font-bold text-blue-400 mb-2">$2M+</div>
                <div className="text-slate-300 font-semibold mb-1">Community Economic Impact</div>
                <div className="text-slate-400 text-sm">Generated through programs and placements</div>
              </div>
              
              <div className="bg-slate-700/30 rounded-lg p-4">
                <div className="text-2xl font-bold text-purple-400 mb-2">50%</div>
                <div className="text-slate-300 font-semibold mb-1">National Coverage Progress</div>
                <div className="text-slate-400 text-sm">On track for all 50 states by 2025</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
