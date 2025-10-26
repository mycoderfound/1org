

"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Building, MapPin, Calendar, DollarSign, Users, Target, Award, TrendingUp, Zap } from 'lucide-react';

interface CommunityHQSlideProps {
  data: any;
}

export function CommunityHQSlide({ data }: CommunityHQSlideProps) {
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

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Hero Section with Property Overview */}
      <motion.div variants={itemVariants}>
        <Card className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border-amber-500/20 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <Building className="w-5 h-5 text-amber-400" />
              <Badge variant="outline" className="text-amber-400 border-amber-500/30">
                Historic Landmark
              </Badge>
              <Badge variant="outline" className="text-emerald-400 border-emerald-500/30">
                Opportunity Zone
              </Badge>
            </div>
            <CardTitle className="text-white text-2xl">
              {data.property.name}
            </CardTitle>
            <p className="text-amber-400 font-semibold">{data.property.address}</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-amber-400 mb-1">{data.property.built}</div>
                <div className="text-slate-400 text-sm">Built</div>
                <div className="text-xs text-slate-500 mt-1">{data.property.style}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400 mb-1">{data.property.size}</div>
                <div className="text-slate-400 text-sm">Total Space</div>
                <div className="text-xs text-slate-500 mt-1">Multi-level layout</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-400 mb-1">{data.property.parking}</div>
                <div className="text-slate-400 text-sm">Parking Spaces</div>
                <div className="text-xs text-slate-500 mt-1">Dedicated on-site</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400 mb-1">{data.property.frontage}</div>
                <div className="text-slate-400 text-sm">Street Frontage</div>
                <div className="text-xs text-slate-500 mt-1">High visibility corner</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Strategic Location */}
      <motion.div variants={itemVariants}>
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <MapPin className="w-6 h-6 text-blue-400" />
          Strategic Location & Cultural Anchors
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Location Highlights */}
          <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Location Advantages</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {data.location.highlights.map((highlight: string, index: number) => (
                  <motion.div
                    key={highlight}
                    variants={itemVariants}
                    className="flex items-center gap-3 p-3 bg-slate-700/30 rounded-lg"
                  >
                    <div className="w-2 h-2 bg-blue-400 rounded-full" />
                    <span className="text-slate-300 text-sm">{highlight}</span>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Cultural Anchors */}
          <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Nearby Cultural Anchors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {data.location.culturalAnchors.map((anchor: any, index: number) => (
                  <motion.div
                    key={anchor.name}
                    variants={itemVariants}
                    className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg"
                  >
                    <div>
                      <div className="text-slate-300 font-semibold">{anchor.name}</div>
                      <div className="text-slate-500 text-xs">{anchor.type}</div>
                    </div>
                    <Badge variant="outline" className="text-emerald-400 border-emerald-500/30 text-xs">
                      {anchor.distance}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>

      {/* Vision & Spaces */}
      <motion.div variants={itemVariants}>
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <Zap className="w-6 h-6 text-purple-400" />
          MyCoder HQ Vision
        </h2>
        <div className="mb-6">
          <Card className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/20 backdrop-blur-sm">
            <CardContent className="p-6">
              <p className="text-slate-300 text-lg leading-relaxed text-center">
                {data.vision.concept}
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {data.vision.spaces.map((space: any, index: number) => (
            <motion.div
              key={space.name}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
            >
              <Card className="h-full bg-slate-800/50 border-slate-700/50 backdrop-blur-sm hover:border-purple-500/30 transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle className="text-white text-lg">{space.name}</CardTitle>
                    <Badge variant="outline" className="text-purple-400 border-purple-500/30 text-xs">
                      {space.floor}
                    </Badge>
                  </div>
                  <p className="text-slate-300 text-sm">{space.description}</p>
                  <div className="text-purple-400 font-semibold text-sm">{space.capacity}</div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {space.features.map((feature: string, idx: number) => (
                      <div key={idx} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-purple-400 rounded-full" />
                        <span className="text-slate-400 text-xs">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Investment & Funding */}
      <motion.div variants={itemVariants}>
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <DollarSign className="w-6 h-6 text-emerald-400" />
          Investment Strategy & Funding Sources
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Acquisition & Renovation */}
          <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Investment Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-slate-700/30 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-slate-300">Property Acquisition</span>
                    <span className="text-emerald-400 font-bold">{data.investment.acquisition.price}</span>
                  </div>
                  <div className="text-slate-500 text-sm">{data.investment.acquisition.pricePerSF}</div>
                </div>
                
                <div className="bg-slate-700/30 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-slate-300">Renovation Estimate</span>
                    <span className="text-blue-400 font-bold">{data.investment.renovation.estimated}</span>
                  </div>
                  <div className="text-slate-500 text-sm">{data.investment.renovation.timeline}</div>
                </div>
                
                <div className="bg-gradient-to-r from-emerald-500/20 to-blue-500/20 border border-emerald-500/30 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-white font-semibold">Total Investment</span>
                    <span className="text-emerald-400 font-bold text-lg">{data.investment.totalFunding}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Funding Sources */}
          <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Funding Sources</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data.investment.fundingSources.map((source: any, index: number) => (
                  <div key={source.source} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300 text-sm font-medium">{source.source}</span>
                      <span className="text-emerald-400 font-semibold">{source.amount}</span>
                    </div>
                    <p className="text-slate-500 text-xs">{source.description}</p>
                    <div className="h-1 bg-slate-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-emerald-400 to-blue-400 rounded-full"
                        style={{ width: `${25 * (index + 1)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>

      {/* Timeline & Phases */}
      <motion.div variants={itemVariants}>
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <Calendar className="w-6 h-6 text-blue-400" />
          Development Timeline
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {data.timeline.phases.map((phase: any, index: number) => (
            <motion.div
              key={phase.phase}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
            >
              <Card className="h-full bg-slate-800/50 border-slate-700/50 backdrop-blur-sm hover:border-blue-500/30 transition-all duration-300">
                <CardHeader>
                  <div className="text-center mb-2">
                    <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-blue-400 font-bold">{index + 1}</span>
                    </div>
                    <Badge variant="outline" className="text-blue-400 border-blue-500/30 text-xs">
                      {phase.duration}
                    </Badge>
                  </div>
                  <CardTitle className="text-white text-sm text-center">{phase.phase}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {phase.milestones.map((milestone: string, idx: number) => (
                      <div key={idx} className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-blue-400 rounded-full" />
                        <span className="text-slate-400 text-xs">{milestone}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Impact Projections */}
      <motion.div variants={itemVariants}>
        <Card className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 border-slate-600/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Target className="w-5 h-5 text-emerald-400" />
              Projected Community Impact
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6 text-center">
              <p className="text-slate-300 text-lg max-w-4xl mx-auto leading-relaxed">
                {data.impact.statement}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {data.impact.metrics.map((metric: any, index: number) => (
                <motion.div
                  key={metric.metric}
                  variants={itemVariants}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <TrendingUp className="w-8 h-8 text-emerald-400" />
                  </div>
                  <div className="text-2xl font-bold text-emerald-400 mb-1">{metric.target}</div>
                  <div className="text-slate-300 font-semibold text-sm mb-1">{metric.metric}</div>
                  <div className="text-slate-500 text-xs">{metric.description}</div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* ROI Summary */}
      <motion.div variants={itemVariants}>
        <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400" />
              Return on Investment Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-emerald-400 mb-2">
                  {data.investment.roi.socialImpact}
                </div>
                <div className="text-slate-400 text-sm">Social Impact</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-400 mb-2">
                  {data.investment.roi.economicImpact}
                </div>
                <div className="text-slate-400 text-sm">Economic Development</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-400 mb-2">
                  {data.investment.roi.jobCreation}
                </div>
                <div className="text-slate-400 text-sm">Job Creation</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-orange-400 mb-2">
                  {data.investment.roi.businessIncubation}
                </div>
                <div className="text-slate-400 text-sm">Businesses Supported</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}

