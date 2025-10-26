
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { GraduationCap, Shield, Code, Building, DollarSign, FileText } from 'lucide-react';

interface FoundationSlideProps {
  data: any;
}

export function FoundationSlide({ data }: FoundationSlideProps) {
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

  const programIcons = [Shield, Code, GraduationCap, Building];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Mission Statement */}
      <motion.div variants={itemVariants}>
        <Card className="bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border-emerald-500/20 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 bg-emerald-400 rounded-full" />
              <Badge variant="outline" className="text-emerald-400 border-emerald-500/30">
                501(c)(3) Tax-Exempt
              </Badge>
            </div>
            <CardTitle className="text-white text-xl">Mission Statement</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-300 text-lg leading-relaxed">
              {data.mission}
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Core Programs */}
      <motion.div variants={itemVariants}>
        <h2 className="text-2xl font-bold text-white mb-6">Core Programs</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {data.programs.map((program: any, index: number) => {
            const IconComponent = programIcons[index];
            return (
              <motion.div
                key={program.name}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
              >
                <Card className="h-full bg-slate-800/50 border-slate-700/50 backdrop-blur-sm hover:border-emerald-500/30 transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                        <IconComponent className="w-5 h-5 text-emerald-400" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-white text-lg">{program.name}</CardTitle>
                        <Badge variant="outline" className="text-emerald-400 border-emerald-500/30 mt-1">
                          {program.participants}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-300 mb-4 leading-relaxed">
                      {program.description}
                    </p>
                    <div className="bg-slate-700/30 rounded-lg p-3">
                      <div className="text-sm text-slate-400 mb-1">Impact Achieved</div>
                      <div className="text-emerald-400 font-semibold">{program.impact}</div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Revenue Streams */}
      <motion.div variants={itemVariants}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Revenue Breakdown */}
          <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-emerald-400" />
                Revenue Streams ($500K+ Target)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {data.revenueStreams.map((stream: any, index: number) => (
                <div key={stream.source} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300 text-sm">{stream.source}</span>
                    <div className="text-right">
                      <div className="text-white font-semibold">{stream.amount}</div>
                      <div className="text-emerald-400 text-xs">{stream.percentage}%</div>
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

          {/* Contract Opportunities */}
          <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-400" />
                Government Contract Opportunities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {data.contractOpportunities.map((opportunity: string, index: number) => (
                  <motion.div
                    key={opportunity}
                    variants={itemVariants}
                    className="flex items-center gap-3 p-3 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-colors"
                  >
                    <div className="w-2 h-2 bg-blue-400 rounded-full" />
                    <span className="text-slate-300 text-sm">{opportunity}</span>
                  </motion.div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-lg">
                <div className="text-blue-400 font-semibold mb-2">Contract Readiness Status</div>
                <div className="text-slate-300 text-sm">
                  ✅ SAM.gov Registered<br />
                  ✅ DUNS Number Active<br />
                  ✅ 501(c)(3) Certified<br />
                  ✅ Compliance Documentation Complete
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>

      {/* Impact Summary */}
      <motion.div variants={itemVariants}>
        <Card className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 border-slate-600/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Foundation Impact Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-emerald-400 mb-2">500+</div>
                <div className="text-slate-400 text-sm">Annual Participants</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-400 mb-2">50</div>
                <div className="text-slate-400 text-sm">States Targeted</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-400 mb-2">100+</div>
                <div className="text-slate-400 text-sm">Apps Monetized</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-orange-400 mb-2">$2M+</div>
                <div className="text-slate-400 text-sm">Economic Impact</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
