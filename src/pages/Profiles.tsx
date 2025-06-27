import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  MapPin, 
  Filter, 
  Star, 
  Eye,
  Users,
  Briefcase,
  GraduationCap,
  Award,
  ExternalLink,
  Github,
  Linkedin,
  Globe,
  CheckCircle,
  Clock
} from 'lucide-react';
import { mockUsers } from '../data/mockData';
import { User, JobSeekerProfile } from '../types';

const Profiles: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [skillFilter, setSkillFilter] = useState('');
  const [experienceFilter, setExperienceFilter] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // Filter only job seekers
  const jobSeekers = mockUsers.filter(user => user.role === 'jobseeker');

  const filteredProfiles = useMemo(() => {
    return jobSeekers.filter(user => {
      const profile = user.profile as JobSeekerProfile;
      
      const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (profile?.title?.toLowerCase().includes(searchTerm.toLowerCase())) ||
                           (profile?.skills?.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase())));
      
      const matchesLocation = !locationFilter || (profile?.location?.toLowerCase().includes(locationFilter.toLowerCase()));
      
      const matchesSkill = !skillFilter || (profile?.skills?.some(skill => skill.toLowerCase().includes(skillFilter.toLowerCase())));
      
      const matchesExperience = !experienceFilter || (profile?.experience?.includes(experienceFilter));
      
      return matchesSearch && matchesLocation && matchesSkill && matchesExperience;
    });
  }, [searchTerm, locationFilter, skillFilter, experienceFilter, jobSeekers]);

  const getTimeAgo = (dateString: string) => {
    const days = Math.floor((new Date().getTime() - new Date(dateString).getTime()) / (1000 * 60 * 60 * 24));
    if (days === 0) return 'Active today';
    if (days === 1) return 'Active yesterday';
    return `Active ${days} days ago`;
  };

  const getProfileCompleteness = (profile: JobSeekerProfile) => {
    let completeness = 0;
    const fields = ['title', 'experience', 'skills', 'education', 'location', 'bio'];
    fields.forEach(field => {
      if (profile[field as keyof JobSeekerProfile]) completeness += 16.67;
    });
    return Math.round(completeness);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold gradient-text mb-4">Discover Talent</h1>
          <p className="text-xl text-gray-600">Connect with skilled professionals and find your next team member</p>
        </div>

        {/* Search and Filters */}
        <div className="glass-effect rounded-3xl p-8 mb-8 border border-white/20">
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            {/* Search Input */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by name, title, or skills"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/50 backdrop-blur-sm border border-white/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Location Input */}
            <div className="lg:w-64 relative">
              <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Location"
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/50 backdrop-blur-sm border border-white/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:w-auto px-8 py-4 glass-effect border border-white/30 rounded-2xl hover:bg-white/20 transition-all flex items-center justify-center font-medium"
            >
              <Filter className="w-5 h-5 mr-2" />
              Filters
            </button>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-white/20">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Skills</label>
                <input
                  type="text"
                  placeholder="e.g. React, Python, Design"
                  value={skillFilter}
                  onChange={(e) => setSkillFilter(e.target.value)}
                  className="w-full p-4 bg-white/50 backdrop-blur-sm border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Experience Level</label>
                <select
                  value={experienceFilter}
                  onChange={(e) => setExperienceFilter(e.target.value)}
                  className="w-full p-4 bg-white/50 backdrop-blur-sm border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500"
                >
                  <option value="">Any Experience</option>
                  <option value="1">1+ years</option>
                  <option value="2">2+ years</option>
                  <option value="3">3+ years</option>
                  <option value="5">5+ years</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        <div className="flex items-center justify-between mb-8">
          <p className="text-gray-600 text-lg">
            Showing <span className="font-semibold text-violet-600">{filteredProfiles.length}</span> of <span className="font-semibold">{jobSeekers.length}</span> profiles
          </p>
          <select className="p-3 bg-white/50 backdrop-blur-sm border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500">
            <option>Most Relevant</option>
            <option>Recently Active</option>
            <option>Highest Rated</option>
            <option>Most Experienced</option>
          </select>
        </div>

        {/* Profile Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredProfiles.map((user) => {
            const profile = user.profile as JobSeekerProfile;
            const completeness = getProfileCompleteness(profile);
            
            return (
              <div key={user.id} className="glass-effect rounded-3xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 group card-hover">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <img
                        src={user.avatar || `https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&dpr=2`}
                        alt={user.name}
                        className="w-16 h-16 rounded-2xl object-cover"
                      />
                      {user.isVerified && (
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                          <CheckCircle className="w-3 h-3 text-white" />
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-violet-600 transition-colors">
                        {user.name}
                      </h3>
                      <p className="text-violet-600 font-semibold">{profile?.title}</p>
                      <div className="flex items-center mt-1 text-sm text-gray-500">
                        <MapPin className="w-4 h-4 mr-1" />
                        {profile?.location}
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="flex items-center space-x-1 mb-2">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium">4.9</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="w-4 h-4 mr-1" />
                      {getTimeAgo(user.lastActive || user.createdAt)}
                    </div>
                  </div>
                </div>

                {/* Bio */}
                <p className="text-gray-700 mb-6 line-clamp-2 leading-relaxed">
                  {profile?.bio || 'Passionate professional looking for new opportunities to grow and contribute.'}
                </p>

                {/* Skills */}
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    {profile?.skills?.slice(0, 6).map((skill, index) => (
                      <span key={index} className="px-3 py-1 bg-violet-100 text-violet-700 rounded-full text-sm font-medium">
                        {skill}
                      </span>
                    ))}
                    {(profile?.skills?.length || 0) > 6 && (
                      <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                        +{(profile?.skills?.length || 0) - 6} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <Briefcase className="w-4 h-4 text-gray-500 mr-1" />
                    </div>
                    <p className="text-sm font-semibold text-gray-900">{profile?.experience}</p>
                    <p className="text-xs text-gray-500">Experience</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <Eye className="w-4 h-4 text-gray-500 mr-1" />
                    </div>
                    <p className="text-sm font-semibold text-gray-900">{profile?.profileViews || 0}</p>
                    <p className="text-xs text-gray-500">Profile Views</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <Award className="w-4 h-4 text-gray-500 mr-1" />
                    </div>
                    <p className="text-sm font-semibold text-gray-900">{completeness}%</p>
                    <p className="text-xs text-gray-500">Complete</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-6 border-t border-white/20">
                  <div className="flex items-center space-x-3">
                    {profile?.linkedinUrl && (
                      <a
                        href={profile.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                      >
                        <Linkedin className="w-5 h-5" />
                      </a>
                    )}
                    {profile?.githubUrl && (
                      <a
                        href={profile.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-gray-400 hover:text-gray-900 transition-colors"
                      >
                        <Github className="w-5 h-5" />
                      </a>
                    )}
                    {profile?.portfolioUrl && (
                      <a
                        href={profile.portfolioUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-gray-400 hover:text-violet-600 transition-colors"
                      >
                        <Globe className="w-5 h-5" />
                      </a>
                    )}
                  </div>

                  <div className="flex items-center space-x-3">
                    <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                      <Star className="w-5 h-5" />
                    </button>
                    
                    <Link
                      to={`/profile/${user.id}`}
                      className="bg-gradient-to-r from-violet-600 to-purple-600 text-white px-6 py-2 rounded-xl hover:from-violet-700 hover:to-purple-700 transition-all transform hover:scale-105 font-medium flex items-center"
                    >
                      View Profile
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Load More */}
        {filteredProfiles.length > 0 && (
          <div className="text-center mt-12">
            <button className="glass-effect border border-white/30 text-gray-700 px-8 py-4 rounded-2xl hover:bg-white/20 transition-all font-medium">
              Load More Profiles
            </button>
          </div>
        )}

        {filteredProfiles.length === 0 && (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6">
              <Users className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">No profiles found</h3>
            <p className="text-gray-600 text-lg">Try adjusting your search criteria or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profiles;