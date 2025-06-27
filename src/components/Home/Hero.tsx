import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Briefcase, Users, TrendingUp, ArrowRight, Sparkles, Zap, Target } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-violet-50 via-purple-50 to-blue-50 min-h-screen flex items-center">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-violet-400 to-purple-400 rounded-full opacity-20 animate-pulse-slow"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-r from-blue-400 to-teal-400 rounded-full opacity-20 animate-float"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-10 animate-pulse-slow"></div>
      </div>

      {/* Floating Icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 animate-float">
          <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
            <Briefcase className="w-6 h-6 text-violet-600" />
          </div>
        </div>
        <div className="absolute top-40 right-32 animate-float" style={{ animationDelay: '1s' }}>
          <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
            <Users className="w-5 h-5 text-purple-600" />
          </div>
        </div>
        <div className="absolute bottom-40 left-32 animate-float" style={{ animationDelay: '2s' }}>
          <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
            <TrendingUp className="w-7 h-7 text-blue-600" />
          </div>
        </div>
        <div className="absolute bottom-20 right-20 animate-float" style={{ animationDelay: '0.5s' }}>
          <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
            <Target className="w-4 h-4 text-teal-600" />
          </div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 mb-8">
            <Sparkles className="w-4 h-4 text-violet-600 mr-2" />
            <span className="text-sm font-medium text-gray-700">AI-Powered Job Matching</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Find Your{' '}
            <span className="gradient-text relative">
              Perfect
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-violet-600 to-purple-600 rounded-full"></div>
            </span>
            <br />
            Career Match
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
            Connect with top employers, discover opportunities that match your skills, 
            and accelerate your career with our intelligent job platform.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Link
              to="/register"
              className="group bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white px-10 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-violet-500/25 flex items-center justify-center"
            >
              <Zap className="mr-3 w-6 h-6 group-hover:rotate-12 transition-transform" />
              Start Your Journey
              <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/jobs"
              className="group glass-effect text-gray-700 hover:bg-white/20 px-10 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 flex items-center justify-center"
            >
              <Search className="mr-3 w-6 h-6 group-hover:scale-110 transition-transform" />
              Explore Jobs
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="glass-effect rounded-3xl p-8 hover:bg-white/20 transition-all duration-300 group">
              <div className="w-16 h-16 bg-gradient-to-r from-violet-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Briefcase className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">15,000+</h3>
              <p className="text-gray-600 font-medium">Active Job Listings</p>
            </div>
            
            <div className="glass-effect rounded-3xl p-8 hover:bg-white/20 transition-all duration-300 group">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">100K+</h3>
              <p className="text-gray-600 font-medium">Registered Users</p>
            </div>
            
            <div className="glass-effect rounded-3xl p-8 hover:bg-white/20 transition-all duration-300 group">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">98%</h3>
              <p className="text-gray-600 font-medium">Success Rate</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;