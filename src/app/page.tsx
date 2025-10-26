'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Users, Bot, User, Instagram, Linkedin, Youtube, Github, Globe, Code, Zap, Heart, Star, ArrowRight, Sparkles, Target, Rocket } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F5F5F5] overflow-x-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black to-black" />
        
        {/* Floating Geometric Shapes */}
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-20 left-20 w-32 h-32 border-2 border-[#00BFFF]/30 rounded-lg"
        />
        <motion.div
          animate={{
            x: [0, -80, 0],
            y: [0, 80, 0],
            rotate: [0, -180, -360],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-20 right-20 w-24 h-24 border-2 border-[#8A2BE2]/30 rounded-full"
        />
        <motion.div
          animate={{
            x: [0, 60, -60, 0],
            y: [0, -60, 60, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 border-2 border-[#9370DB]/20 rotate-45"
        />
      </div>

      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 pt-16">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
          >
            <span className="text-white">Welcome To</span>
            <br/>
            <span className="bg-gradient-to-r from-[#00BFFF] via-[#8A2BE2] to-[#9370DB] bg-clip-text text-transparent">
              myCoderFOUND
            </span>
            <br />
            <span className="text-white"></span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Empowering communities through digital innovation, <br/>AI solutions, and collaborative growth
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              size="lg"
              className="group bg-gradient-to-r from-[#00BFFF] to-[#00FFFF] text-black font-semibold px-8 py-4 rounded-xl hover:shadow-lg hover:shadow-[#00BFFF]/40 transition-all duration-300 transform hover:scale-105"
              onClick={() => window.open('/login', '_blank')}
            >
              <Users className="mr-2 h-5 w-5" />
              Join myCoder Club
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>

            <Button
              size="lg"
              className="group bg-gradient-to-r from-[#8A2BE2] to-[#9370DB] text-white font-semibold px-8 py-4 rounded-xl hover:shadow-lg hover:shadow-[#8A2BE2]/40 transition-all duration-300 transform hover:scale-105"
              onClick={() => window.open('/pricing', '_blank')}
            >
              <Bot className="mr-2 h-5 w-5" />
              Business Solutions
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>

            <Button
              size="lg"
              className="group border-2 border-[#9370DB] text-[#9370DB] hover:bg-[#9370DB] hover:text-white font-semibold px-8 py-4 rounded-xl hover:shadow-lg hover:shadow-[#9370DB]/40 transition-all duration-300 transform hover:scale-105"
              onClick={() => window.open('https://mycoderfound.me', '_blank')}
            >
              <User className="mr-2 h-5 w-5" />
              .ME Profile <br />BETA DEMO!
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>

          {/* Stats
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto"
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-[#00BFFF] mb-2">10K+</div>
              <div className="text-sm text-gray-400">Community Members</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#8A2BE2] mb-2">500+</div>
              <div className="text-sm text-gray-400">Projects Launched</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#9370DB] mb-2">50+</div>
              <div className="text-sm text-gray-400">Partner Organizations</div>
            </div>
          </motion.div> */}
        </div>
      </section>

      {/* Ecosystem Section */}
      <section id="ecosystem" className="relative py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Our <span className="bg-gradient-to-r from-[#00BFFF] to-[#8A2BE2] bg-clip-text text-transparent">Digital</span> Ecosystem
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Three powerful platforms working together to create meaningful impact
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Foundation Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <Card className="h-full bg-gradient-to-br from-[#0A0A0A] to-[#1A1A1A] border border-[#00BFFF]/30 hover:border-[#00BFFF] transition-all duration-500 hover:shadow-2xl hover:shadow-[#00BFFF]/20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#00BFFF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <CardHeader className="relative z-10">
                  <div className="w-16 h-16 mb-4 rounded-2xl bg-gradient-to-br from-[#00BFFF] to-[#00FFFF] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Users className="w-8 h-8 text-black" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-[#00BFFF] mb-2">myCoder Foundation</CardTitle>
                  <CardDescription className="text-gray-400">
                    Building digital literacy and community empowerment
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="relative z-10 space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Star className="w-5 h-5 text-[#00BFFF]" />
                      <span className="text-sm">Free youth education programs</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Star className="w-5 h-5 text-[#00BFFF]" />
                      <span className="text-sm">Community workshops & events</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Star className="w-5 h-5 text-[#00BFFF]" />
                      <span className="text-sm">Digital skills certification</span>
                    </div>
                  </div>
                  
                  <Button
                    variant="outline"
                    className="w-full border-[#00BFFF]/50 text-[#00BFFF] hover:bg-[#00BFFF] hover:text-black mt-6 group-hover:shadow-lg group-hover:shadow-[#00BFFF]/30"
                    onClick={() => window.open('/login', '_blank')}
                  >
                    myCoderFound.org <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* AI Agency Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="group"
            >
              <Card className="h-full bg-gradient-to-br from-[#0A0A0A] to-[#1A1A1A] border border-[#8A2BE2]/30 hover:border-[#8A2BE2] transition-all duration-500 hover:shadow-2xl hover:shadow-[#8A2BE2]/20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#8A2BE2]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <CardHeader className="relative z-10">
                  <div className="w-16 h-16 mb-4 rounded-2xl bg-gradient-to-br from-[#00BFFF] to-[#8A2BE2] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Bot className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-[#8A2BE2] mb-2">.AI Agency</CardTitle>
                  <CardDescription className="text-gray-400">
                    Cutting-edge AI solutions for modern businesses
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="relative z-10 space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Target className="w-5 h-5 text-[#8A2BE2]" />
                      <span className="text-sm">Smart website development</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Target className="w-5 h-5 text-[#8A2BE2]" />
                      <span className="text-sm">AI automation tools</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Target className="w-5 h-5 text-[#8A2BE2]" />
                      <span className="text-sm">Intelligent branding systems</span>
                    </div>
                  </div>
                  
                  <Button
                    variant="outline"
                    className="w-full border-[#8A2BE2]/50 text-[#8A2BE2] hover:bg-[#8A2BE2] hover:text-white mt-6 group-hover:shadow-lg group-hover:shadow-[#8A2BE2]/30"
                    onClick={() => window.open('/pricing', '_blank')}
                  >
                    myCoderFOUND Agency<ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Profiles Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="group"
            >
              <Card className="h-full bg-gradient-to-br from-[#0A0A0A] to-[#1A1A1A] border border-[#9370DB]/30 hover:border-[#9370DB] transition-all duration-500 hover:shadow-2xl hover:shadow-[#9370DB]/20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#9370DB]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <CardHeader className="relative z-10">
                  <div className="w-16 h-16 mb-4 rounded-2xl bg-gradient-to-br from-[#8A2BE2] to-[#9370DB] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <User className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-[#9370DB] mb-2">.ME Profiles</CardTitle>
                  <CardDescription className="text-gray-400">
                    Your digital presence and professional network
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="relative z-10 space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Rocket className="w-5 h-5 text-[#9370DB]" />
                      <span className="text-sm">Professional portfolios</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Rocket className="w-5 h-5 text-[#9370DB]" />
                      <span className="text-sm">Skill showcase platform</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Rocket className="w-5 h-5 text-[#9370DB]" />
                      <span className="text-sm">Networking & opportunities</span>
                    </div>
                  </div>
                  
                  <Button
                    variant="outline"
                    className="w-full border-[#9370DB]/50 text-[#9370DB] hover:bg-[#9370DB] hover:text-white mt-6 group-hover:shadow-lg group-hover:shadow-[#9370DB]/30"
                    onClick={() => window.open('/login', '_blank')}
                  >
                   myCoderFound.me <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-[#0A0A0A] to-[#121212]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Why Choose <span className="bg-gradient-to-r from-[#00BFFF] to-[#9370DB] bg-clip-text text-transparent">myCoderFound</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              We're building the future of digital empowerment, one community at a time
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Users, title: "Community First", desc: "Built by and for the communities we serve", color: "#00BFFF" },
              { icon: Bot, title: "AI Powered", desc: "Leveraging cutting-edge artificial intelligence", color: "#8A2BE2" },
              { icon: Target, title: "Results Driven", desc: "Focused on measurable impact and growth", color: "#9370DB" },
              { icon: Rocket, title: "Future Ready", desc: "Preparing communities for tomorrow's challenges", color: "#00FFFF" },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <Card className="h-full bg-[#0A0A0A]/50 border border-gray-800 hover:border-gray-600 transition-all duration-300 hover:shadow-lg">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-gray-800 to-gray-700 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <feature.icon className="w-6 h-6" style={{ color: feature.color }} />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                    <p className="text-sm text-gray-400">{feature.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#00BFFF]/10 to-[#8A2BE2]/10 border border-[#00BFFF]/20">
              <Heart className="w-5 h-5 text-red-500" />
              <span className="text-sm font-medium">Our Mission</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold">
              One Platform, <span className="bg-gradient-to-r from-[#00BFFF] via-[#8A2BE2] to-[#9370DB] bg-clip-text text-transparent">Many Paths</span>
            </h2>
            
            <p className="text-xl text-gray-400 leading-relaxed">
              Empowering disconnected communities with the tools, education, and opportunities they need to thrive in the digital age. We believe technology should be a bridge, not a barrier.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <Badge variant="outline" className="border-[#00BFFF]/50 text-[#00BFFF] px-4 py-2">
                <Globe className="w-4 h-4 mr-2" />
                Sastainable Impact
              </Badge>
              <Badge variant="outline" className="border-[#8A2BE2]/50 text-[#8A2BE2] px-4 py-2">
                <Zap className="w-4 h-4 mr-2" />
                Innovation Driven
              </Badge>
              <Badge variant="outline" className="border-[#9370DB]/50 text-[#9370DB] px-4 py-2">
                <Users className="w-4 h-4 mr-2" />
                Community Focused
              </Badge>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 px-4 bg-gradient-to-r from-[#00BFFF]/5 via-[#8A2BE2]/5 to-[#9370DB]/5">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-4xl md:text-5xl font-bold">
              Ready to <span className="bg-gradient-to-r from-[#00BFFF] to-[#9370DB] bg-clip-text text-transparent">Join</span> the Movement?
            </h2>
            
            <p className="text-xl text-gray-400">
              Whether you're looking to learn, build, or connect - there's a place for you in the myCoder ecosystem.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-[#00BFFF] to-[#8A2BE2] text-white font-semibold px-8 py-4 rounded-xl hover:shadow-lg hover:shadow-[#00BFFF]/40 transition-all duration-300 transform hover:scale-105"
                onClick={() => window.open('/login', '_blank')}
              >
                Get Started Today
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-800 font-semibold px-8 py-4 rounded-xl transition-all duration-300"
              >
                Learn More
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="relative py-16 px-4 bg-[#0A0A0A] border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-[#00BFFF] to-[#8A2BE2] rounded-xl flex items-center justify-center">
                  <Code className="w-6 h-6 text-white" />
                </div>
                <span className="">
                myCoderFound
                </span>
              </div>
              <p className="text-gray-400 mb-6 max-w-md">
                Building digital bridges for communities worldwide through technology education, innovation, and collaboration.
              </p>
              <div className="flex space-x-4">
                <motion.a
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  href="#" 
                  className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-[#00BFFF] transition-all duration-300"
                >
                  <Instagram className="w-5 h-5" />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  href="https://www.instagram.com/mycoderfound/" 
                  target="_blank"
                  rel="noopener noreferrer" 
                  className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-[#00BFFF] transition-all duration-300"
                >
                  <Linkedin className="w-5 h-5" />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  href="https://www.linkedin.com/company/mycoderfound/" 
                  target="_blank"
                  rel="noopener noreferrer" 
                  className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-[#8A2BE2] transition-all duration-300"
                >
                  <Youtube className="w-5 h-5" />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  href="https://www.youtube.com/@myCoderFound" 
                  className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-[#9370DB] transition-all duration-300"
                >
                  <Github className="w-5 h-5" />
                </motion.a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-[#00BFFF]">Platform</h3>
              <div className="space-y-2">
                <a href="#" target="_blank" rel="noopener noreferrer" className="block text-gray-400 hover:text-[#00BFFF] transition-colors">
                  myCoderFOUND
                </a>
                <a href="/pricing" target="_blank" rel="noopener noreferrer" className="block text-gray-400 hover:text-[#8A2BE2] transition-colors">
                 myCoderAGENCY
                </a>
                <a href="/login" target="_blank" rel="noopener noreferrer" className="block text-gray-400 hover:text-[#9370DB] transition-colors">
                .ME Profiles
                </a>
              </div>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-[#8A2BE2]">Resources</h3>
              <div className="space-y-2">
                <a href="#" className="block text-gray-400 hover:text-[#00BFFF] transition-colors">
                  Documentation
                </a>
                <a href="#" className="block text-gray-400 hover:text-[#8A2BE2] transition-colors">
                  Blog
                </a>
                <a href="#" className="block text-gray-400 hover:text-[#9370DB] transition-colors">
                  Support
                </a>
                <a href="https://form.typeform.com/to/Vsf4OGhv" className="block text-gray-400 hover:text-[#9370DB] transition-colors">
                  Book 1:1
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm">
                © 2025 myCoder Foundation. All rights reserved.
              </p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <a href="#" className="text-gray-400 hover:text-[#00BFFF] text-sm transition-colors">
                  Privacy Policy
                </a>
                <a href="#" className="text-gray-400 hover:text-[#8A2BE2] text-sm transition-colors">
                  Terms of Service
                </a>
                <a href="#" className="text-gray-400 hover:text-[#9370DB] text-sm transition-colors">
                  Contact
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}