import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  Briefcase, 
  FileText, 
  Users, 
  TrendingUp, 
  Clock, 
  Star,
  ArrowUpRight,
  Calendar,
  MapPin
} from 'lucide-react';
import { mockJobs, mockApplications } from '../data/mockData';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  if (!user) return null;

  const renderJobSeekerDashboard = () => (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-teal-600 rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Welcome back, {user.name}!</h1>
        <p className="text-blue-100 mb-6">Ready to find your next opportunity?</p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            to="/jobs"
            className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors inline-flex items-center"
          >
            <Briefcase className="w-5 h-5 mr-2" />
            Browse Jobs
          </Link>
          <Link
            to="/profile"
            className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors inline-flex items-center"
          >
            <FileText className="w-5 h-5 mr-2" />
            Update Profile
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Applications</p>
              <p className="text-2xl font-bold text-gray-900">12</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <ArrowUpRight className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-green-600">+2 this week</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Interviews</p>
              <p className="text-2xl font-bold text-gray-900">3</p>
            </div>
            <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-teal-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <Clock className="w-4 h-4 text-orange-500 mr-1" />
            <span className="text-orange-600">1 pending</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Profile Views</p>
              <p className="text-2xl font-bold text-gray-900">89</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <ArrowUpRight className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-green-600">+15 this week</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Match Score</p>
              <p className="text-2xl font-bold text-gray-900">92%</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Star className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <Star className="w-4 h-4 text-yellow-500 mr-1" />
            <span className="text-yellow-600">Excellent</span>
          </div>
        </div>
      </div>

      {/* Recent Applications & Recommended Jobs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Applications */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Recent Applications</h2>
            <Link to="/applications" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              View All
            </Link>
          </div>
          <div className="space-y-4">
            {mockApplications.slice(0, 3).map((application) => {
              const job = mockJobs.find(j => j.id === application.jobId);
              return (
                <div key={application.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900">{job?.title}</h3>
                      <p className="text-sm text-gray-600">{job?.company}</p>
                      <div className="flex items-center mt-2 text-sm text-gray-500">
                        <MapPin className="w-4 h-4 mr-1" />
                        {job?.location}
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      application.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      application.status === 'reviewed' ? 'bg-blue-100 text-blue-800' :
                      application.status === 'shortlisted' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recommended Jobs */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Recommended Jobs</h2>
            <Link to="/jobs" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              View All
            </Link>
          </div>
          <div className="space-y-4">
            {mockJobs.slice(0, 3).map((job) => (
              <div key={job.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">{job.title}</h3>
                    <p className="text-sm text-gray-600">{job.company}</p>
                    <div className="flex items-center mt-2 text-sm text-gray-500">
                      <MapPin className="w-4 h-4 mr-1" />
                      {job.location}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-green-600">{job.salary}</p>
                    <div className="flex items-center mt-1">
                      <Star className="w-4 h-4 text-yellow-500 mr-1" />
                      <span className="text-xs text-gray-500">95% match</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderEmployerDashboard = () => (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-teal-600 to-blue-600 rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Welcome back!</h1>
        <p className="text-teal-100 mb-6">Manage your job postings and find the perfect candidates.</p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            to="/employer/post-job"
            className="bg-white text-teal-600 px-6 py-3 rounded-lg font-semibold hover:bg-teal-50 transition-colors inline-flex items-center"
          >
            <Briefcase className="w-5 h-5 mr-2" />
            Post New Job
          </Link>
          <Link
            to="/employer/applications"
            className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-teal-600 transition-colors inline-flex items-center"
          >
            <Users className="w-5 h-5 mr-2" />
            View Applications
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Jobs</p>
              <p className="text-2xl font-bold text-gray-900">8</p>
            </div>
            <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-teal-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Applications</p>
              <p className="text-2xl font-bold text-gray-900">156</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Interviews Scheduled</p>
              <p className="text-2xl font-bold text-gray-900">12</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Hired This Month</p>
              <p className="text-2xl font-bold text-gray-900">5</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAdminDashboard = () => (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-purple-100 mb-6">Monitor platform activity and manage users.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Users</p>
              <p className="text-2xl font-bold text-gray-900">12,543</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Jobs</p>
              <p className="text-2xl font-bold text-gray-900">1,234</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Applications Today</p>
              <p className="text-2xl font-bold text-gray-900">89</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Success Rate</p>
              <p className="text-2xl font-bold text-gray-900">94%</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Star className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {user.role === 'jobseeker' && renderJobSeekerDashboard()}
        {user.role === 'employer' && renderEmployerDashboard()}
        {user.role === 'admin' && renderAdminDashboard()}
      </div>
    </div>
  );
};

export default Dashboard;