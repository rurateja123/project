export interface User {
  id: string;
  email: string;
  name: string;
  role: 'jobseeker' | 'employer' | 'admin';
  avatar?: string;
  profile?: JobSeekerProfile | EmployerProfile;
  createdAt: string;
  isVerified?: boolean;
  lastActive?: string;
}

export interface JobSeekerProfile {
  title?: string;
  experience?: string;
  skills: string[];
  education?: string;
  location?: string;
  salary?: string;
  resume?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  portfolioUrl?: string;
  bio?: string;
  achievements?: string[];
  languages?: string[];
  certifications?: string[];
  availability?: 'immediate' | 'two-weeks' | 'one-month' | 'negotiable';
  workType?: 'remote' | 'hybrid' | 'onsite' | 'flexible';
  profileViews?: number;
  profileCompleteness?: number;
}

export interface EmployerProfile {
  companyName: string;
  companySize?: string;
  industry?: string;
  website?: string;
  description?: string;
  location?: string;
  founded?: string;
  employees?: string;
  culture?: string[];
  benefits?: string[];
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
  };
}

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'remote' | 'hybrid';
  salary: string;
  description: string;
  requirements: string[];
  benefits: string[];
  postedBy: string;
  postedAt: string;
  status: 'active' | 'closed' | 'draft';
  applicationsCount: number;
  views: number;
  featured?: boolean;
  urgent?: boolean;
  remote?: boolean;
  experienceLevel?: 'entry' | 'mid' | 'senior' | 'executive';
  category?: string;
  tags?: string[];
}

export interface Application {
  id: string;
  jobId: string;
  applicantId: string;
  status: 'pending' | 'reviewed' | 'shortlisted' | 'rejected' | 'hired';
  appliedAt: string;
  coverLetter?: string;
  resumeUrl?: string;
  matchScore?: number;
  notes?: string;
  interviewDate?: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: string) => Promise<boolean>;
  register: (userData: RegisterData) => Promise<boolean>;
  logout: () => void;
  updateProfile: (profileData: any) => void;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: 'jobseeker' | 'employer';
  companyName?: string;
}

export interface ProfileViewData {
  id: string;
  viewerId: string;
  profileId: string;
  viewedAt: string;
  viewerName: string;
  viewerTitle?: string;
  viewerCompany?: string;
  viewerAvatar?: string;
}