
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, FileText, Building, Users, Shield, Award, Calendar, DollarSign } from 'lucide-react';

interface ContractsSlideProps {
  data: any;
}

export function ContractsSlide({ data }: ContractsSlideProps) {
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
      {/* Compliance Status */}
      <motion.div variants={itemVariants}>
        <Card className="bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border-emerald-500/20 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-5 h-5 text-emerald-400" />
              <Badge variant="outline" className="text-emerald-400 border-emerald-500/30">
                {data.compliance.status}
              </Badge>
            </div>
            <CardTitle className="text-white text-xl">Government Contract Compliance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Certifications */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5 text-emerald-400" />
                  Certifications & Registrations
                </h3>
                <div className="space-y-3">
                  {data.compliance.certifications.map((cert: string, index: number) => (
                    <motion.div
                      key={cert}
                      variants={itemVariants}
                      className="flex items-center gap-3 p-3 bg-slate-700/30 rounded-lg"
                    >
                      <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                      <span className="text-slate-300">{cert}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Capabilities */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-blue-400" />
                  Core Capabilities
                </h3>
                <div className="space-y-3">
                  {data.compliance.capabilities.map((capability: string, index: number) => (
                    <motion.div
                      key={capability}
                      variants={itemVariants}
                      className="flex items-center gap-3 p-3 bg-slate-700/30 rounded-lg"
                    >
                      <Shield className="w-5 h-5 text-blue-400 flex-shrink-0" />
                      <span className="text-slate-300">{capability}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Target Contracts */}
      <motion.div variants={itemVariants}>
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <FileText className="w-6 h-6 text-blue-400" />
          Target Contract Opportunities
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {data.targetContracts.map((contract: any, index: number) => (
            <motion.div
              key={contract.type}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
            >
              <Card className="h-full bg-slate-800/50 border-slate-700/50 backdrop-blur-sm hover:border-blue-500/30 transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                      <Building className="w-5 h-5 text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-white text-lg">{contract.type}</CardTitle>
                      <Badge variant="outline" className="text-blue-400 border-blue-500/30 mt-1">
                        {contract.value}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-slate-400 mb-2">Target Agencies</div>
                      <div className="flex flex-wrap gap-2">
                        {contract.agencies.map((agency: string, idx: number) => (
                          <Badge key={idx} variant="outline" className="text-emerald-400 border-emerald-500/30 text-xs">
                            {agency}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-purple-400" />
                      <span className="text-slate-300 text-sm">Timeline: {contract.timeline}</span>
                    </div>
                    
                    <div className="bg-slate-700/30 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <DollarSign className="w-4 h-4 text-emerald-400" />
                        <span className="text-emerald-400 font-semibold text-sm">Contract Value</span>
                      </div>
                      <div className="text-white font-bold">{contract.value}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Partnerships */}
      <motion.div variants={itemVariants}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Current Partnerships */}
          <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Users className="w-5 h-5 text-emerald-400" />
                Current Partnerships
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {data.partnerships.current.map((partner: string, index: number) => (
                  <motion.div
                    key={partner}
                    variants={itemVariants}
                    className="flex items-center gap-3 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg"
                  >
                    <div className="w-2 h-2 bg-emerald-400 rounded-full" />
                    <span className="text-slate-300">{partner}</span>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Proposed Partnerships */}
          <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Building className="w-5 h-5 text-blue-400" />
                Proposed Partnerships
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {data.partnerships.proposed.map((partner: string, index: number) => (
                  <motion.div
                    key={partner}
                    variants={itemVariants}
                    className="flex items-center gap-3 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg"
                  >
                    <div className="w-2 h-2 bg-blue-400 rounded-full" />
                    <span className="text-slate-300">{partner}</span>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>

      {/* Competitive Advantages */}
      <motion.div variants={itemVariants}>
        <Card className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 border-slate-600/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-purple-400" />
              Competitive Advantages for Government Contracts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.competitive_advantages.map((advantage: string, index: number) => (
                <motion.div
                  key={advantage}
                  variants={itemVariants}
                  className="flex items-start gap-3 p-4 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-colors"
                >
                  <div className="w-6 h-6 bg-purple-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Award className="w-3 h-3 text-purple-400" />
                  </div>
                  <span className="text-slate-300 leading-relaxed">{advantage}</span>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Contract Readiness Summary */}
      <motion.div variants={itemVariants}>
        <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Contract Readiness Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-emerald-400 mb-2">100%</div>
                <div className="text-slate-400 text-sm">Compliance Ready</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-400 mb-2">$1M+</div>
                <div className="text-slate-400 text-sm">Contract Pipeline Value</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-400 mb-2">4</div>
                <div className="text-slate-400 text-sm">Active Partnerships</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-orange-400 mb-2">Q1 2024</div>
                <div className="text-slate-400 text-sm">First Contract Target</div>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <p className="text-slate-300 max-w-3xl mx-auto leading-relaxed">
                myCoderFOUND is fully prepared to execute government contracts with proven compliance, 
                established partnerships, and a track record of measurable community impact. Our hybrid 
                model ensures both mission fulfillment and operational sustainability.
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
