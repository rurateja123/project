import React from 'react';
import { 
  Search, 
  Target, 
  Shield, 
  Zap, 
  Users, 
  Award,
  MessageSquare,
  BarChart3,
  Star
} from 'lucide-react';

const Features: React.FC = () => {
  const features = [
    {
      icon: Search,
      title: 'Smart Job Matching',
      description: 'Our AI-powered algorithm matches you with jobs that fit your skills, experience, and preferences.',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Target,
      title: 'Targeted Applications',
      description: 'Apply to jobs that matter with personalized application tracking and status updates.',
      color: 'from-teal-500 to-teal-600'
    },
    {
      icon: Shield,
      title: 'Verified Companies',
      description: 'All employers are verified to ensure legitimate opportunities and safe job searching.',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Zap,
      title: 'Instant Notifications',
      description: 'Get real-time alerts for new job matches, application updates, and interview invitations.',
      color: 'from-yellow-500 to-yellow-600'
    },
    {
      icon: Users,
      title: 'Network Building',
      description: 'Connect with industry professionals and expand your professional network.',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Award,
      title: 'Career Growth',
      description: 'Access career resources, skill assessments, and professional development tools.',
      color: 'from-red-500 to-red-600'
    },
    {
      icon: MessageSquare,
      title: 'Direct Messaging',
      description: 'Communicate directly with recruiters and hiring managers through our secure platform.',
      color: 'from-indigo-500 to-indigo-600'
    },
    {
      icon: BarChart3,
      title: 'Analytics Dashboard',
      description: 'Track your job search progress with detailed analytics and insights.',
      color: 'from-pink-500 to-pink-600'
    },
    {
      icon: Star,
      title: 'Premium Support',
      description: '24/7 customer support with career counseling and resume optimization services.',
      color: 'from-orange-500 to-orange-600'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose JobPortal Pro?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We provide everything you need to accelerate your career and find the perfect job opportunity.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
              >
                <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-3xl p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Ready to Transform Your Career?
            </h3>
            <p className="text-lg text-gray-600 mb-8">
              Join thousands of professionals who have found their dream jobs through our platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-blue-600 to-teal-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-teal-700 transition-all transform hover:scale-105">
                Start Your Journey
              </button>
              <button className="border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-xl font-semibold hover:border-blue-500 hover:text-blue-600 transition-all">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;