'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const timelineData = [
  {
    year: "2019",
    title: "Planting Seeds",
    subtitle: "A Mother's Vision",
    content: "Our Founder, Hannah Ha. begins teaching her children typing and coding using MIT Scratch, witnessing their transformation from tech consumers to creators.",
    type: "foundation",
    icon: "🌱"
  },
  {
    year: "2020",
    title: "Pandemic Pivot",
    subtitle: "Career Change & Teaching",
    content: "During the pandemic, Hannah commits to learning how to code at Woz-U while continuing to teach her children, planting seeds for future tech education in underserved communities.",
    type: "foundation",
    icon: "💻"
  },
  {
    year: "2021",
    title: "Professional Growth",
    subtitle: "Tech Industry Entry",
    content: "Secures position at a top-tier tech company, immersing in exciting projects and pushing technological boundaries while mentoring youth in basic coding skills.",
    type: "foundation",
    icon: "🚀"
  },
  {
    year: "2022",
    title: "Chicago Relocation",
    subtitle: "Expanding Horizons",
    content: "Relocates to Chicago's West Loop, bringing the vision closer to urban communities with high digital divide needs, continuing informal tech education.",
    type: "foundation",
    icon: "🏙️"
  },
  {
    year: "2023",
    title: "Layoff & Reflection",
    subtitle: "Turning Challenge into Opportunity",
    content: "Faces layoff alongside 19,000 colleagues, uses this moment to reflect on the digital divide and the need for accessible tech education in underserved communities.",
    type: "foundation",
    icon: "🔄"
  },
  {
    year: "Mar 2024",
    title: "FOUNDATION",
    subtitle: "Community Partnerships",
    content: "Begins forging strategic partnerships with local community organizations, schools, and youth centers to expand reach and create sustainable impact in underserved neighborhoods.",
    type: "foundation",
    icon: "🤝"
  },
  {
    year: "Mar 2024",
    title: "Foundation Launch",
    subtitle: "myCoder FOUNDATION Established",
    content: "Officially launches myCoder FOUNDATION as a 501(c)(3) nonprofit, committed to advancing coding literacy among underrepresented youth and bridging the digital divide.",
    type: "foundation",
    icon: "🏛️"
  },
  {
    year: "2025",
    title: "Agency Formation",
    subtitle: "myCoderAGENCY Created",
    content: "Establishes myCoderAGENCY to deliver AI-powered business solutions for small businesses in the digital economy.",
    type: "agency",
    icon: "🤖"
  },
  {
    year: "2025",
    title: "Vision to Impact",
    subtitle: "myCoderHQ Community Hub",
    content: "Establishes myCoderHQ Community Hub in Chicago, providing a physical space for tech education, collaboration, and community empowerment.",
    type: "agency",
    icon: "🏢"
  },
  {
    year: "2025",
    title: "Portfolio Platform",
    subtitle: "myCoderFound.Me Launch",
    content: "Launches portfolio hub showcasing member projects, apps, and professional growth with personal profiles and opportunity connections.",
    type: "agency",
    icon: "📊"
  },
  {
    year: "2026",
    title: "Vision 2026",
    subtitle: "Expansion Goals",
    content: "Sets ambitious goals: 5 new communities, 2,500+ participants, 3 new programs, targeting urban centers with high digital divide.",
    type: "vision",
    icon: "🎯"
  },
  {
    year: "2026",
    title: "Sustainable Impact",
    subtitle: "Closed-Loop Ecosystem",
    content: "Achieves self-sustaining cycle linking business success to community empowerment through integrated nonprofit + agency model.",
    type: "vision",
    icon: "♻️"
  }
];

// const statsData = [
//   { label: "Participants", value: "600+", icon: "👥" },
//   { label: "Community Partners", value: "12+", icon: "🤝" },
//   { label: "Membership Tiers", value: "6", icon: "📋" },
//   { label: "Community Hub", value: "Chicago", icon: "🏢" },
//   { label: "Goal 2026", value: "2,500+", icon: "🎯" }
// ];

export default function AboutUs() {
  const [activeSection, setActiveSection] = useState('all');
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredTimeline = activeSection === 'all' 
    ? timelineData 
    : timelineData.filter(item => item.type === activeSection);

  const getTypeColor = (type: string) => {
    switch(type) {
      case 'foundation': return 'border-purple-500 bg-purple-500/10';
      case 'agency': return 'border-blue-500 bg-blue-500/10';
      case 'vision': return 'border-green-500 bg-green-500/10';
      default: return 'border-gray-500 bg-gray-500/10';
    }
  };

  const getTypeBadgeColor = (type: string) => {
    switch(type) {
      case 'foundation': return 'bg-purple-500 hover:bg-purple-600';
      case 'agency': return 'bg-blue-500 hover:bg-blue-600';
      case 'vision': return 'bg-green-500 hover:bg-green-600';
      default: return 'bg-gray-500 hover:bg-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-800 z-50">
        <div 
          className="h-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/40 to-transparent"></div>
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="mb-8">
            <div className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-green-400 bg-clip-text text-transparent mb-4">
              myCoder
            </div>
            <div className="text-2xl md:text-4xl font-light text-gray-300 mb-8">
              FOUNDATION | ME | AGENCY 
            </div>
          </div>
          
          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed">
            myCoder Foundation was born from a mother’s determination to teach her children during the pandemic. 
            What started as a simple kitchen-table lesson has grown into a powerful movement, 
            planting seeds of digital literacy and sparking a passion for change in underserved communities.
            </p>
        </div>
        <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Button
              variant={activeSection === 'all' ? 'default' : 'outline'}
              onClick={() => setActiveSection('all')}
              className="border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white"
            >
              All Timeline
            </Button>
            <Button 
              variant={activeSection === 'foundation' ? 'default' : 'outline'}
              onClick={() => setActiveSection('foundation')}
              className="border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white"
            >
              myCoderFOUND
            </Button>
            <Button 
              variant={activeSection === 'agency' ? 'default' : 'outline'}
              onClick={() => setActiveSection('agency')}
              className="border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white"
            >
              myCoderAGENCY
            </Button>
            <Button 
              variant={activeSection === 'vision' ? 'default' : 'outline'}
              onClick={() => setActiveSection('vision')}
              className="border-green-500 text-green-400 hover:bg-green-500 hover:text-white"
            >
              VISION to IMPACT
            </Button>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-purple-500 via-blue-500 to-green-500 opacity-20"></div>
            
            {/* Timeline Items */}
            <div className="space-y-12">
              {filteredTimeline.map((item, index) => (
                <div 
                  key={index}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  } flex-col md:flex-row`}
                >
                  {/* Timeline Node */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full border-4 border-gray-900 z-10"></div>
                  
                  {/* Year Badge */}
                  <div className={`md:w-1/2 flex ${index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'} mb-4 md:mb-0`}>
                    <div className={`px-4 py-2 rounded-lg ${getTypeColor(item.type)} border backdrop-blur-sm`}>
                      <div className="text-2xl font-bold">{item.year}</div>
                    </div>
                  </div>
                  
                  {/* Content Card */}
                  <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pl-12' : 'md:pr-12'} w-full`}>
                    <Card className="bg-gray-800/80 border-gray-700 backdrop-blur-sm hover:bg-gray-800/90 transition-all duration-300 hover:scale-105">
                      <CardHeader>
                        <div className="flex items-center justify-between mb-2">
                          <Badge className={`${getTypeBadgeColor(item.type)} text-white text-sm px-3 py-1.5`}>
                            {item.type.toUpperCase()}
                          </Badge>
                          <div className="text-3xl">{item.icon}</div>
                        </div>
                        <CardTitle className="text-xl md:text-2xl text-white">
                          {item.title}
                        </CardTitle>
                        <CardDescription className="text-gray-400 text-base">
                          {item.subtitle}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-300 leading-relaxed">
                          {item.content}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-gray-800/40 to-gray-700/40">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {/* myCoder FOUNDATION */}
            <Card className="bg-gray-800/80 border-purple-500/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl text-purple-400 flex items-center gap-3">
                  <span className="text-3xl">🏛️</span>
                  myCoder FOUNDATION
                </CardTitle>
                <CardDescription className="text-gray-400 text-lg">
                  Planting seeds of digital literacy through teaching and mentorship
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 text-gray-300">
                  <span className="text-purple-400">🌱</span>
                  <span>Born from a mother's journey teaching during the pandemic</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <span className="text-purple-400">🤝</span>
                  <span>Strategic local community partnerships</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <span className="text-purple-400">👥</span>
                  <span>Community First Approach</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <span className="text-purple-400">💰</span>
                  <span>Inclusive Growth & Economic Empowerment</span>
                </div>
                <Separator className="bg-purple-500/20" />
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-purple-400">600+</div>
                    <div className="text-sm text-gray-400">Participants</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-400">Feb 2024</div>
                    <div className="text-sm text-gray-400">Established</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* myCoderAGENCY */}
            <Card className="bg-gray-800/80 border-blue-500/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl text-blue-400 flex items-center gap-3">
                  <span className="text-3xl">🤖</span>
                  myCoderAGENCY
                </CardTitle>
                <CardDescription className="text-gray-400 text-lg">
                  Deliver AI-powered solutions for any small businesses, 
                  organization or creators and find your digital edge
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 text-gray-300">
                  <span className="text-blue-400">🚀</span>
                  <span>AI Powered Results Driven Future Ready</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <span className="text-blue-400">🔄</span>
                  <span>Create self-sustaining cycle linking business success to community</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <span className="text-blue-400">📊</span>
                  <span>Professional, scalable solutions with built-in social impact</span>
                </div>
                <Separator className="bg-blue-500/20" />
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-blue-400">AI AUTOMATED</div>
                    <div className="text-sm text-gray-400">Powered Solutions</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-400">2025</div>
                    <div className="text-sm text-gray-400">Formation</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Ready to Make an Impact?
          </h2>
          <p className="text-xl text-gray-400 mb-12 leading-relaxed">
            "Technology should be a bridge, not a barrier. Together, we build a more inclusive digital future."
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4">
              Join Our Movement
            </Button>
            <Button size="lg" variant="outline" className="border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white px-8 py-4">
              Get Started
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-gray-800">
        <div className="max-w-6xl mx-auto text-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-4">
            myCoderFOUND
          </div>
          <p className="text-gray-400 mb-8">
            Planting seeds of digital literacy, empowering communities through teaching, innovation, and collaborative growth
          </p>
          <div className="flex justify-center gap-6 text-gray-400">
            <span>📧 contactus@mycoderfound.org</span>
            <span>📍 Chicago, IL</span>
            <span>🌐 mycoderfound.org</span>
          </div>
        </div>
      </footer>
    </div>
  );
}