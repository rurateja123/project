import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Header from './components/Layout/Header';
import Home from './pages/Home';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Dashboard from './pages/Dashboard';
import Jobs from './pages/Jobs';
import Profiles from './pages/Profiles';
import ProfileDetail from './pages/ProfileDetail';

// Initialize demo data
if (!localStorage.getItem('users')) {
  const demoUsers = [
    {
      id: '1',
      email: 'demo@jobseeker.com',
      name: 'Alex Johnson',
      role: 'jobseeker',
      createdAt: '2024-01-01T00:00:00Z',
      isVerified: true,
      lastActive: '2024-01-20T10:30:00Z',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      profile: {
        title: 'Senior Frontend Developer',
        experience: '5+ years',
        skills: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Node.js', 'GraphQL'],
        education: 'Computer Science, Stanford University',
        location: 'San Francisco, CA',
        salary: '$120,000 - $160,000',
        bio: 'Passionate frontend developer with expertise in modern web technologies. Love creating beautiful, performant user experiences.',
        achievements: ['Led team of 5 developers', 'Increased app performance by 40%', 'Built 3 award-winning web apps'],
        languages: ['English (Native)', 'Spanish (Conversational)', 'French (Basic)'],
        certifications: ['AWS Certified Developer', 'Google Cloud Professional'],
        availability: 'two-weeks',
        workType: 'hybrid',
        profileViews: 234,
        profileCompleteness: 95,
        linkedinUrl: 'https://linkedin.com/in/alexjohnson',
        githubUrl: 'https://github.com/alexjohnson',
        portfolioUrl: 'https://alexjohnson.dev'
      }
    },
    {
      id: '2',
      email: 'demo@employer.com',
      name: 'Sarah Chen',
      role: 'employer',
      createdAt: '2024-01-01T00:00:00Z',
      isVerified: true,
      lastActive: '2024-01-20T14:15:00Z',
      avatar: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      profile: {
        companyName: 'TechFlow Solutions',
        companySize: '100-500',
        industry: 'Technology',
        website: 'https://techflow.com',
        description: 'Leading technology company specializing in AI-powered solutions for businesses.',
        location: 'San Francisco, CA',
        founded: '2018',
        employees: '250+',
        culture: ['Innovation-driven', 'Remote-first', 'Diversity & Inclusion', 'Work-life balance'],
        benefits: ['Health Insurance', 'Stock Options', 'Unlimited PTO', 'Learning Budget']
      }
    },
    {
      id: '3',
      email: 'admin@demo.com',
      name: 'Admin User',
      role: 'admin',
      createdAt: '2024-01-01T00:00:00Z',
      isVerified: true,
      lastActive: '2024-01-20T16:00:00Z'
    }
  ];
  localStorage.setItem('users', JSON.stringify(demoUsers));
}

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  return user ? <>{children}</> : <Navigate to="/login" />;
};

const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  return !user ? <>{children}</> : <Navigate to="/dashboard" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-blue-50">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
            <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/profiles" element={<Profiles />} />
            <Route path="/profile/:id" element={<ProfileDetail />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;