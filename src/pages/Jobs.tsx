import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  MapPin, 
  Filter, 
  Clock, 
  DollarSign, 
  Briefcase,
  Star,
  Eye,
  Users
} from 'lucide-react';
import { mockJobs } from '../data/mockData';

const Jobs: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [salaryFilter, setSalaryFilter] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const filteredJobs = useMemo(() => {
    return mockJobs.filter(job => {
      const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           job.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesLocation = !locationFilter || job.location.toLowerCase().includes(locationFilter.toLowerCase());
      const matchesType = !typeFilter || job.type === typeFilter;
      
      return matchesSearch && matchesLocation && matchesType;
    });
  }, [searchTerm, locationFilter, typeFilter, salaryFilter]);

  const getTimeAgo = (dateString: string) => {
    const days = Math.floor((new Date().getTime() - new Date(dateString).getTime()) / (1000 * 60 * 60 * 24));
    return `${days} days ago`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Find Your Dream Job</h1>
          <p className="text-gray-600">Discover opportunities that match your skills and aspirations</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
          <div className="flex flex-col lg:flex-row gap-4 mb-4">
            {/* Search Input */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Job title, company, or keywords"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Location Input */}
            <div className="lg:w-64 relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Location"
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:w-auto px-6 py-3 border border-gray-300 rounded-lg hover:border-blue-500 transition-colors flex items-center justify-center"
            >
              <Filter className="w-5 h-5 mr-2" />
              Filters
            </button>

            {/* Search Button */}
            <button className="lg:w-auto bg-gradient-to-r from-blue-600 to-teal-600 text-white px-8 py-3 rounded-lg hover:from-blue-700 hover:to-teal-700 transition-all transform hover:scale-105">
              Search Jobs
            </button>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-200">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Job Type</label>
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Types</option>
                  <option value="full-time">Full Time</option>
                  <option value="part-time">Part Time</option>
                  <option value="contract">Contract</option>
                  <option value="remote">Remote</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Salary Range</label>
                <select
                  value={salaryFilter}
                  onChange={(e) => setSalaryFilter(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Any Salary</option>
                  <option value="0-50k">$0 - $50k</option>
                  <option value="50k-100k">$50k - $100k</option>
                  <option value="100k-150k">$100k - $150k</option>
                  <option value="150k+">$150k+</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Experience</label>
                <select className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">Any Experience</option>
                  <option value="entry">Entry Level</option>
                  <option value="mid">Mid Level</option>
                  <option value="senior">Senior Level</option>
                  <option value="executive">Executive</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            Showing {filteredJobs.length} of {mockJobs.length} jobs
          </p>
          <select className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Most Relevant</option>
            <option>Newest First</option>
            <option>Salary: High to Low</option>
            <option>Salary: Low to High</option>
          </select>
        </div>

        {/* Job Cards */}
        <div className="space-y-6">
          {filteredJobs.map((job) => (
            <div key={job.id} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border border-gray-100 group">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <Link 
                        to={`/jobs/${job.id}`}
                        className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors group-hover:text-blue-600"
                      >
                        {job.title}
                      </Link>
                      <p className="text-lg text-gray-600 font-medium">{job.company}</p>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      <div className="flex items-center text-sm text-gray-500">
                        <Star className="w-4 h-4 text-yellow-500 mr-1" />
                        <span>4.8</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {job.location}
                    </div>
                    <div className="flex items-center">
                      <Briefcase className="w-4 h-4 mr-1" />
                      {job.type.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </div>
                    <div className="flex items-center">
                      <DollarSign className="w-4 h-4 mr-1" />
                      {job.salary}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {getTimeAgo(job.postedAt)}
                    </div>
                  </div>

                  <p className="text-gray-700 mb-4 line-clamp-2">
                    {job.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {job.requirements.slice(0, 4).map((req, index) => (
                      <span key={index} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                        {req}
                      </span>
                    ))}
                    {job.requirements.length > 4 && (
                      <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                        +{job.requirements.length - 4} more
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {job.applicationsCount} applicants
                      </div>
                      <div className="flex items-center">
                        <Eye className="w-4 h-4 mr-1" />
                        {job.views} views
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                        <Star className="w-5 h-5" />
                      </button>
                      
                      <Link
                        to={`/jobs/${job.id}`}
                        className="bg-gradient-to-r from-blue-600 to-teal-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-teal-700 transition-all transform hover:scale-105 font-medium"
                      >
                        Apply Now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        {filteredJobs.length > 0 && (
          <div className="text-center mt-12">
            <button className="bg-white border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-lg hover:border-blue-500 hover:text-blue-600 transition-all">
              Load More Jobs
            </button>
          </div>
        )}

        {filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No jobs found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Jobs;