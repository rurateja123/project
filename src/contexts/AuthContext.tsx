import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthContextType, RegisterData, JobSeekerProfile, EmployerProfile } from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, password: string, role: string): Promise<boolean> => {
    // Simulate API call
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const foundUser = users.find((u: User) => u.email === email && u.role === role);
    
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('currentUser', JSON.stringify(foundUser));
      return true;
    }
    return false;
  };

  const register = async (userData: RegisterData): Promise<boolean> => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    if (users.find((u: User) => u.email === userData.email)) {
      return false; // User already exists
    }

    const newUser: User = {
      id: Date.now().toString(),
      email: userData.email,
      name: userData.name,
      role: userData.role,
      createdAt: new Date().toISOString(),
      profile: userData.role === 'employer' 
        ? { companyName: userData.companyName || '' } as EmployerProfile
        : { skills: [], title: '', experience: '' } as JobSeekerProfile
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    setUser(newUser);
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  const updateProfile = (profileData: any) => {
    if (!user) return;
    
    const updatedUser = { ...user, profile: { ...user.profile, ...profileData } };
    setUser(updatedUser);
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex((u: User) => u.id === user.id);
    if (userIndex !== -1) {
      users[userIndex] = updatedUser;
      localStorage.setItem('users', JSON.stringify(users));
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};