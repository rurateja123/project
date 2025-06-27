import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft,
  MapPin,
  Calendar,
  Star,
  Eye,
  Award,
  Briefcase,
  GraduationCap,
  Globe,
  Linkedin,
  Github,
  Mail,
  Phone,
  Download,
  MessageSquare,
  CheckCircle,
  Clock,
  DollarSign,
  Users,
  Target,
  Zap
} from 'lucide-react';
import { mockUsers, mockProfileViews } from '../data/mockData';
import { JobSeekerProfile } from '../types';

const ProfileDetail: React.FC = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('overview');
  
  const user = mockUsers.find(u => u.id === id && u.role === 'jobseeker');
  const profile = user?.profile as JobSeekerProfile;
  const profileViews = mockProfileViews.filter(view => view.profileId === id);

  if (!user || !profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Profile not found</h2>
          <Link to="/profiles" className="btn-primary">
            Back to Profiles
          </Link>
        </div>
      </div>
    );
  }

  const getProfileCompleteness = () => {
    let completeness = 0;
    const fields = ['title', 'experience', 'skills', 'education', 'location', 'bio'];
    fields.forEach(field => {
      if (profile[field as keyof JobSeekerProfile]) completeness += 16.67;
    });
    return Math.round(completeness);
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Eye },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'skills', label: 'Skills & Certifications', icon: Award },
    { id: 'activity', label: 'Recent Activity', icon: Clock }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link 
          to="/profiles" 
          className="inline-flex items-center text-gray-600 hover:text-violet-600 transition-colors mb-8 font-medium"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Profiles
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Sidebar */}
          <div className="lg:col-span-1">
            <div className="glass-effect rounded-3xl p-8 border border-white/20 sticky top-8">
              {/* Profile Header */}
              <div className="text-center mb-8">
                <div className="relative inline-block mb-4">
                  <img
                    src={user.avatar || `https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=120&h=120&dpr=2`}
                    alt={user.name}
                    className="w-24 h-24 rounded-3xl object-cover"
                  />
                  {user.isVerified && (
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">{user.name}</h1>
                <p className="text-lg text-violet-600 font-semibold mb-3">{profile.title}</p>
                <div className="flex items-center justify-center text-gray-600 mb-4">
                  <MapPin className="w-4 h-4 mr-1" />
                  {profile.location}
                </div>
                
                {/* Rating */}
                <div className="flex items-center justify-center space-x-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                  ))}
                  <span className="ml-2 text-sm font-medium text-gray-600">(4.9)</span>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button className="w-full btn-primary flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 mr-2" />
                    Send Message
                  </button>
                  <button className="w-full btn-secondary flex items-center justify-center">
                    <Download className="w-5 h-5 mr-2" />
                    Download Resume
                  </button>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-gray-600">
                    <Eye className="w-4 h-4 mr-2" />
                    <span className="text-sm">Profile Views</span>
                  </div>
                  <span className="font-semibold text-gray-900">{profile.profileViews || 0}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-gray-600">
                    <Award className="w-4 h-4 mr-2" />
                    <span className="text-sm">Profile Complete</span>
                  </div>
                  <span className="font-semibold text-green-600">{getProfileCompleteness()}%</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-gray-600">
                    <DollarSign className="w-4 h-4 mr-2" />
                    <span className="text-sm">Salary Range</span>
                  </div>
                  <span className="font-semibold text-gray-900 text-sm">{profile.salary}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-gray-600">
                    <Target className="w-4 h-4 mr-2" />
                    <span className="text-sm">Availability</span>
                  </div>
                  <span className="font-semibold text-gray-900 text-sm capitalize">{profile.availability}</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="border-t border-white/20 pt-6">
                <h3 className="font-semibold text-gray-900 mb-4">Connect</h3>
                <div className="flex items-center space-x-3">
                  {profile.linkedinUrl && (
                    <a
                      href={profile.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-blue-100 text-blue-600 rounded-xl hover:bg-blue-200 transition-colors"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                  )}
                  {profile.githubUrl && (
                    <a
                      href={profile.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                  )}
                  {profile.portfolioUrl && (
                    <a
                      href={profile.portfolioUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-violet-100 text-violet-600 rounded-xl hover:bg-violet-200 transition-colors"
                    >
                      <Globe className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Tab Navigation */}
            <div className="glass-effect rounded-2xl p-2 mb-8 border border-white/20">
              <div className="flex space-x-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex-1 flex items-center justify-center px-4 py-3 rounded-xl font-medium transition-all ${
                        activeTab === tab.id
                          ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg'
                          : 'text-gray-600 hover:text-violet-600 hover:bg-white/20'
                      }`}
                    >
                      <Icon className="w-4 h-4 mr-2" />
                      <span className="hidden sm:inline">{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Tab Content */}
            <div className="space-y-8">
              {activeTab === 'overview' && (
                <>
                  {/* About */}
                  <div className="glass-effect rounded-3xl p-8 border border-white/20">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">About</h2>
                    <p className="text-gray-700 leading-relaxed text-lg">
                      {profile.bio || 'This professional is passionate about their field and looking for new opportunities to grow and contribute.'}
                    </p>
                  </div>

                  {/* Key Skills */}
                  <div className="glass-effect rounded-3xl p-8 border border-white/20">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Skills</h2>
                    <div className="flex flex-wrap gap-3">
                      {profile.skills?.map((skill, index) => (
                        <span key={index} className="px-4 py-2 bg-gradient-to-r from-violet-100 to-purple-100 text-violet-700 rounded-xl font-medium">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Achievements */}
                  {profile.achievements && profile.achievements.length > 0 && (
                    <div className="glass-effect rounded-3xl p-8 border border-white/20">
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Achievements</h2>
                      <div className="space-y-4">
                        {profile.achievements.map((achievement, index) => (
                          <div key={index} className="flex items-start space-x-3">
                            <div className="w-2 h-2 bg-gradient-to-r from-violet-600 to-purple-600 rounded-full mt-3"></div>
                            <p className="text-gray-700 leading-relaxed">{achievement}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}

              {activeTab === 'experience' && (
                <>
                  {/* Experience */}
                  <div className="glass-effect rounded-3xl p-8 border border-white/20">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Experience</h2>
                    <div className="flex items-center space-x-3 mb-4">
                      <Briefcase className="w-6 h-6 text-violet-600" />
                      <span className="text-lg font-semibold text-gray-900">{profile.experience}</span>
                    </div>
                    <p className="text-gray-600">
                      Experienced professional with a proven track record in their field.
                    </p>
                  </div>

                  {/* Education */}
                  <div className="glass-effect rounded-3xl p-8 border border-white/20">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Education</h2>
                    <div className="flex items-center space-x-3">
                      <GraduationCap className="w-6 h-6 text-violet-600" />
                      <span className="text-lg font-semibold text-gray-900">{profile.education}</span>
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'skills' && (
                <>
                  {/* Skills */}
                  <div className="glass-effect rounded-3xl p-8 border border-white/20">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Technical Skills</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {profile.skills?.map((skill, index) => (
                        <div key={index} className="bg-white/50 backdrop-blur-sm rounded-xl p-4 text-center">
                          <div className="w-12 h-12 bg-gradient-to-r from-violet-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                            <Zap className="w-6 h-6 text-white" />
                          </div>
                          <p className="font-medium text-gray-900">{skill}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Certifications */}
                  {profile.certifications && profile.certifications.length > 0 && (
                    <div className="glass-effect rounded-3xl p-8 border border-white/20">
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">Certifications</h2>
                      <div className="space-y-4">
                        {profile.certifications.map((cert, index) => (
                          <div key={index} className="flex items-center space-x-3 p-4 bg-white/50 backdrop-blur-sm rounded-xl">
                            <Award className="w-6 h-6 text-yellow-500" />
                            <span className="font-medium text-gray-900">{cert}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Languages */}
                  {profile.languages && profile.languages.length > 0 && (
                    <div className="glass-effect rounded-3xl p-8 border border-white/20">
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">Languages</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {profile.languages.map((language, index) => (
                          <div key={index} className="flex items-center space-x-3 p-4 bg-white/50 backdrop-blur-sm rounded-xl">
                            <Globe className="w-5 h-5 text-blue-500" />
                            <span className="font-medium text-gray-900">{language}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}

              {activeTab === 'activity' && (
                <>
                  {/* Recent Profile Views */}
                  <div className="glass-effect rounded-3xl p-8 border border-white/20">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Profile Views</h2>
                    <div className="space-y-4">
                      {profileViews.map((view) => (
                        <div key={view.id} className="flex items-center space-x-4 p-4 bg-white/50 backdrop-blur-sm rounded-xl">
                          <img
                            src={view.viewerAvatar}
                            alt={view.viewerName}
                            className="w-12 h-12 rounded-xl object-cover"
                          />
                          <div className="flex-1">
                            <p className="font-medium text-gray-900">{view.viewerName}</p>
                            <p className="text-sm text-gray-600">{view.viewerTitle} at {view.viewerCompany}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-500">
                              {new Date(view.viewedAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Activity Stats */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="glass-effect rounded-3xl p-8 border border-white/20 text-center">
                      <div className="w-16 h-16 bg-gradient-to-r from-violet-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Eye className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{profile.profileViews || 0}</h3>
                      <p className="text-gray-600">Total Profile Views</p>
                    </div>
                    
                    <div className="glass-effect rounded-3xl p-8 border border-white/20 text-center">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Users className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{profileViews.length}</h3>
                      <p className="text-gray-600">Recent Viewers</p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetail;