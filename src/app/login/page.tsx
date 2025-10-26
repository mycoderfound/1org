'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import { Checkbox } from '@/components/ui/checkbox'
import { useToast } from '@/hooks/use-toast'

export default function AuthPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [loginData, setLoginData] = useState({ email: '', password: '', rememberMe: false })
  const [signupData, setSignupData] = useState({ 
    firstName: '', 
    lastName: '', 
    email: '', 
    password: '', 
    confirmPassword: '',
    agreeToTerms: false 
  })
  const { toast } = useToast()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Welcome back!",
        description: "You have successfully logged in.",
      })
    }, 2000)
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (signupData.password !== signupData.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match.",
        variant: "destructive",
      })
      return
    }
    
    if (!signupData.agreeToTerms) {
      toast({
        title: "Terms required",
        description: "Please agree to the terms and conditions.",
        variant: "destructive",
      })
      return
    }
    
    setIsLoading(true)
    
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Account created!",
        description: "Welcome to the future of coding.",
      })
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>

      <div className="relative z-10 w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
       
       
       
        {/* Left Side - Hero Section */}
        <div className="text-center lg:text-left space-y-8">
          <div className="space-y-6">
            <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-500/20 text-purple-300 border border-purple-500/30">
              <span className="w-2 h-2 bg-purple-400 rounded-full mr-2 animate-pulse"></span>
              Welcome to the Future
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent leading-tight">
              Login
              <span className="block text-4xl lg:text-6xl mt-2"> </span>
            </h1>
            
            <p className="text-xl text-gray-300 max-w-lg leading-relaxed">
              Join the next generation of developers. Build, create, and innovate with cutting-edge tools and a community that pushes boundaries.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="group relative p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-white">Lightning Fast</h3>
                  <p className="text-sm text-gray-400">Optimized performance</p>
                </div>
              </div>
            </div>

            <div className="group relative p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-white">Community Driven</h3>
                  <p className="text-sm text-gray-400">Connect with peers</p>
                </div>
              </div>
            </div>

            <div className="group relative p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-white">AI Powered</h3>
                  <p className="text-sm text-gray-400">Smart assistance</p>
                </div>
              </div>
            </div>

            <div className="group relative p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-white">Learn & Grow</h3>
                  <p className="text-sm text-gray-400">Continuous education</p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center space-x-8 pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">50</div>
              <div className="text-sm text-gray-400">States 1 Mission</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">100+</div>
              <div className="text-sm text-gray-400">Monitized Projects</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">2000+</div>
              <div className="text-sm text-gray-400">Members by 2027</div>
            </div>
          </div>
        </div>

        {/* Right Side - Auth Form */}
        <div className="w-full max-w-md mx-auto">
          <Card className="bg-white/10 backdrop-blur-xl border-white/20 text-white shadow-2xl relative overflow-hidden">
            {/* Card Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-purple-500/10 opacity-50"></div>
            
            <CardHeader className="space-y-2 relative z-10">
              <div className="text-center mb-4">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
                  </svg>
                </div>
              </div>
              <CardTitle className="text-2xl font-bold text-center">Get Started</CardTitle>
              <CardDescription className="text-gray-300 text-center">
                Join thousands of developers building the future
              </CardDescription>
            </CardHeader>
            <CardContent className="relative z-10">
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-white/10 p-1">
                  <TabsTrigger value="login" className="data-[state=active]:bg-white/20">Sign In</TabsTrigger>
                  <TabsTrigger value="signup" className="data-[state=active]:bg-white/20">Sign Up</TabsTrigger>
                </TabsList>
                
                <TabsContent value="login" className="space-y-4">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="login-email" className="text-gray-300">Email Address</Label>
                      <Input
                        id="login-email"
                        type="email"
                        placeholder="you@example.com"
                        value={loginData.email}
                        onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                        className="bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-purple-400"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="login-password" className="text-gray-300">Password</Label>
                      <Input
                        id="login-password"
                        type="password"
                        placeholder="••••••••"
                        value={loginData.password}
                        onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                        className="bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-purple-400"
                        required
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="remember-me"
                          checked={loginData.rememberMe}
                          onCheckedChange={(checked) => setLoginData({...loginData, rememberMe: checked as boolean})}
                        />
                        <Label htmlFor="remember-me" className="text-gray-300 text-sm">Remember me</Label>
                      </div>
                      <a href="#" className="text-sm text-purple-400 hover:text-purple-300">Forgot password?</a>
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold py-3"
                      disabled={isLoading}
                    >
                      {isLoading ? "Signing in..." : "Sign In"}
                    </Button>
                  </form>
                  
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <Separator className="w-full bg-white/20" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-transparent px-2 text-gray-400">Or continue with</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                      <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                      Google
                    </Button>
                    <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.024-.105-.949-.199-2.403.041-3.439.219-.937 1.404-5.965 1.404-5.965s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.097.118.112.221.085.345-.09.381-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.748-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.017 0z"/>
                      </svg>
                      GitHub
                    </Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="signup" className="space-y-4">
                  <form onSubmit={handleSignup} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="signup-firstname" className="text-gray-300">First Name</Label>
                        <Input
                          id="signup-firstname"
                          type="text"
                          placeholder="John"
                          value={signupData.firstName}
                          onChange={(e) => setSignupData({...signupData, firstName: e.target.value})}
                          className="bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-purple-400"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="signup-lastname" className="text-gray-300">Last Name</Label>
                        <Input
                          id="signup-lastname"
                          type="text"
                          placeholder="Doe"
                          value={signupData.lastName}
                          onChange={(e) => setSignupData({...signupData, lastName: e.target.value})}
                          className="bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-purple-400"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-email" className="text-gray-300">Email Address</Label>
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="you@example.com"
                        value={signupData.email}
                        onChange={(e) => setSignupData({...signupData, email: e.target.value})}
                        className="bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-purple-400"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-password" className="text-gray-300">Password</Label>
                      <Input
                        id="signup-password"
                        type="password"
                        placeholder="••••••••"
                        value={signupData.password}
                        onChange={(e) => setSignupData({...signupData, password: e.target.value})}
                        className="bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-purple-400"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-confirm-password" className="text-gray-300">Confirm Password</Label>
                      <Input
                        id="signup-confirm-password"
                        type="password"
                        placeholder="••••••••"
                        value={signupData.confirmPassword}
                        onChange={(e) => setSignupData({...signupData, confirmPassword: e.target.value})}
                        className="bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-purple-400"
                        required
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="agree-terms"
                        checked={signupData.agreeToTerms}
                        onCheckedChange={(checked) => setSignupData({...signupData, agreeToTerms: checked as boolean})}
                      />
                      <Label htmlFor="agree-terms" className="text-gray-300 text-sm">
                        I agree to the Terms of Service and Privacy Policy
                      </Label>
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold py-3"
                      disabled={isLoading}
                    >
                      {isLoading ? "Creating account..." : "Create Account"}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
