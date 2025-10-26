
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, Users, Globe, DollarSign, Target } from 'lucide-react';

interface ExecutiveSlideProps {
  data: any;
}

export function ExecutiveSlide({ data }: ExecutiveSlideProps) {
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
      {/* Hero Section */}
      <motion.div variants={itemVariants} className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full mb-6">
          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
          <span className="text-emerald-400 text-sm font-medium">Contract Ready</span>
        </div>
        <h1 className="text-4xl font-bold text-white mb-4">
          Transforming Communities Through
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-400 block">
            Digital Innovation
          </span>
        </h1>
        <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
          {data.overview}
        </p>
      </motion.div>

      {/* Key Metrics */}
      <motion.div variants={itemVariants}>
        <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-400" />
              Key Performance Indicators
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {data.keyMetrics.map((metric: any, index: number) => (
                <motion.div
                  key={metric.label}
                  variants={itemVariants}
                  className={`text-center p-4 rounded-lg ${
                    metric.highlight 
                      ? 'bg-gradient-to-br from-emerald-500/20 to-blue-500/20 border border-emerald-500/30' 
                      : 'bg-slate-700/30'
                  }`}
                >
                  <div className={`text-2xl font-bold mb-2 ${
                    metric.highlight ? 'text-emerald-400' : 'text-white'
                  }`}>
                    {metric.value}
                  </div>
                  <div className="text-sm text-slate-400">{metric.label}</div>
                  {metric.highlight && (
                    <div className="mt-2">
                      <Badge variant="outline" className="text-emerald-400 border-emerald-500/30">
                        Primary Target
                      </Badge>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Three Pillars */}
      <motion.div variants={itemVariants}>
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Three-Pillar Ecosystem
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {data.pillars.map((pillar: any, index: number) => (
            <motion.div
              key={pillar.name}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="group"
            >
              <Card className="h-full bg-slate-800/50 border-slate-700/50 backdrop-blur-sm hover:border-emerald-500/30 transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge 
                      variant="outline" 
                      className={`${
                        index === 0 ? 'text-emerald-400 border-emerald-500/30' :
                        index === 1 ? 'text-blue-400 border-blue-500/30' :
                        'text-purple-400 border-purple-500/30'
                      }`}
                    >
                      {pillar.type}
                    </Badge>
                    <div className={`text-lg font-bold ${
                      index === 0 ? 'text-emerald-400' :
                      index === 1 ? 'text-blue-400' :
                      'text-purple-400'
                    }`}>
                      {pillar.revenue}
                    </div>
                  </div>
                  <CardTitle className="text-white group-hover:text-emerald-400 transition-colors">
                    {pillar.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-300 leading-relaxed">
                    {pillar.description}
                  </p>
                  <div className="mt-4 flex items-center gap-2">
                    {index === 0 && <Users className="w-4 h-4 text-emerald-400" />}
                    {index === 1 && <DollarSign className="w-4 h-4 text-blue-400" />}
                    {index === 2 && <Globe className="w-4 h-4 text-purple-400" />}
                    <span className="text-sm text-slate-400">
                      {index === 0 ? 'Community Impact' : 
                       index === 1 ? 'Revenue Generation' : 
                       'Talent Pipeline'}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Closed Loop Impact */}
      <motion.div variants={itemVariants}>
        <Card className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 border-slate-600/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Target className="w-5 h-5 text-emerald-400" />
              Closed-Loop Impact Model
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center">
              <div className="flex items-center gap-4 text-center">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center mb-2">
                    <Users className="w-6 h-6 text-emerald-400" />
                  </div>
                  <span className="text-sm text-slate-300">Foundation Programs</span>
                </div>
                <div className="text-emerald-400 text-2xl">→</div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mb-2">
                    <Globe className="w-6 h-6 text-blue-400" />
                  </div>
                  <span className="text-sm text-slate-300">Portfolio Showcase</span>
                </div>
                <div className="text-blue-400 text-2xl">→</div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mb-2">
                    <DollarSign className="w-6 h-6 text-purple-400" />
                  </div>
                  <span className="text-sm text-slate-300">Agency Revenue</span>
                </div>
                <div className="text-purple-400 text-2xl">→</div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center mb-2">
                    <TrendingUp className="w-6 h-6 text-emerald-400" />
                  </div>
                  <span className="text-sm text-slate-300">Reinvestment</span>
                </div>
              </div>
            </div>
            <p className="text-center text-slate-400 mt-6 max-w-2xl mx-auto">
              Every dollar invested creates a self-reinforcing loop: clients fund revenue, revenue funds programs, 
              programs create talent, talent feeds business pipeline growth.
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
