
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { DollarSign, TrendingUp, PieChart, Target, BarChart3 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell } from 'recharts';

interface FinancialSlideProps {
  data: any;
}

export function FinancialSlide({ data }: FinancialSlideProps) {
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

  // Prepare chart data
  const quarterlyData = data.breakdown.map((item: any) => ({
    quarter: item.category.includes('Foundation') ? 'Foundation' : 
             item.category.includes('Agency') ? 'Agency' : 'Total',
    Q1: item.q1,
    Q2: item.q2,
    Q3: item.q3,
    Q4: item.q4,
    Total: item.total
  }));

  const expenseData = Object.entries(data.expenses).map(([key, value]: [string, any]) => ({
    name: key.charAt(0).toUpperCase() + key.slice(1),
    value: value.percentage,
    amount: value.amount
  }));

  const COLORS = ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444', '#06b6d4'];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Revenue Overview */}
      <motion.div variants={itemVariants}>
        <Card className="bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border-emerald-500/20 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-emerald-400" />
              Annual Revenue Strategy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-400 mb-2">
                  {data.annualRevenue.foundation.target}
                </div>
                <div className="text-slate-300 font-semibold mb-2">Foundation Revenue</div>
                <div className="space-y-1">
                  {data.annualRevenue.foundation.sources.map((source: string, index: number) => (
                    <Badge key={index} variant="outline" className="text-emerald-400 border-emerald-500/30 text-xs">
                      {source}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400 mb-2">
                  {data.annualRevenue.agency.target}
                </div>
                <div className="text-slate-300 font-semibold mb-2">Agency Revenue</div>
                <div className="space-y-1">
                  {data.annualRevenue.agency.sources.map((source: string, index: number) => (
                    <Badge key={index} variant="outline" className="text-blue-400 border-blue-500/30 text-xs">
                      {source}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">
                  {data.annualRevenue.combined.target}
                </div>
                <div className="text-slate-300 font-semibold mb-2">Combined Target</div>
                <Badge variant="outline" className="text-purple-400 border-purple-500/30">
                  {data.annualRevenue.combined.growth}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quarterly Breakdown Chart */}
      <motion.div variants={itemVariants}>
        <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-blue-400" />
              Quarterly Revenue Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={quarterlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="quarter" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1f2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar dataKey="Q1" fill="#10b981" />
                  <Bar dataKey="Q2" fill="#3b82f6" />
                  <Bar dataKey="Q3" fill="#8b5cf6" />
                  <Bar dataKey="Q4" fill="#f59e0b" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Expense Breakdown */}
      <motion.div variants={itemVariants}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Expense Chart */}
          <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <PieChart className="w-5 h-5 text-purple-400" />
                Expense Allocation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1f2937', 
                        border: '1px solid #374151',
                        borderRadius: '8px'
                      }}
                    />
                    <RechartsPieChart data={expenseData}>
                      {expenseData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </RechartsPieChart>
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Expense Details */}
          <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Expense Breakdown</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {expenseData.map((expense, index) => (
                <div key={expense.name} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300 text-sm">{expense.name}</span>
                    <div className="text-right">
                      <div className="text-white font-semibold">
                        ${expense.amount.toLocaleString()}
                      </div>
                      <div className="text-xs" style={{ color: COLORS[index % COLORS.length] }}>
                        {expense.value}%
                      </div>
                    </div>
                  </div>
                  <Progress 
                    value={expense.value} 
                    className="h-2 bg-slate-700"
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </motion.div>

      {/* ROI & Impact */}
      <motion.div variants={itemVariants}>
        <Card className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 border-slate-600/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Target className="w-5 h-5 text-emerald-400" />
              Return on Investment & Impact
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="w-8 h-8 text-emerald-400" />
                </div>
                <div className="text-lg font-bold text-emerald-400 mb-1">
                  {data.roi.socialImpact}
                </div>
                <div className="text-slate-400 text-sm">Social Impact</div>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <DollarSign className="w-8 h-8 text-blue-400" />
                </div>
                <div className="text-lg font-bold text-blue-400 mb-1">
                  {data.roi.economicImpact}
                </div>
                <div className="text-slate-400 text-sm">Economic Impact</div>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <BarChart3 className="w-8 h-8 text-purple-400" />
                </div>
                <div className="text-lg font-bold text-purple-400 mb-1">
                  {data.roi.businessGrowth}
                </div>
                <div className="text-slate-400 text-sm">Business Growth</div>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Target className="w-8 h-8 text-orange-400" />
                </div>
                <div className="text-lg font-bold text-orange-400 mb-1">
                  {data.roi.sustainability}
                </div>
                <div className="text-slate-400 text-sm">Sustainability Model</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Financial Summary */}
      <motion.div variants={itemVariants}>
        <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Financial Summary & Projections</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-emerald-400 mb-2">$750K</div>
                <div className="text-slate-400 text-sm mb-2">Year 1 Revenue Target</div>
                <Progress value={75} className="h-2 bg-slate-700" />
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-400 mb-2">$1M+</div>
                <div className="text-slate-400 text-sm mb-2">Year 2 Projection</div>
                <Progress value={85} className="h-2 bg-slate-700" />
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-400 mb-2">35%</div>
                <div className="text-slate-400 text-sm mb-2">YoY Growth Rate</div>
                <Progress value={90} className="h-2 bg-slate-700" />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
