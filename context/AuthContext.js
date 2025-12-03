import React, { createContext, useState, useContext, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null); //Roles (Jobseeker/Employer)
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [applications, setApplications] = useState([]); 

  // JOBS DATABASE
  const [jobs, setJobs] = useState([
    { id: '1', title: 'Leaky Faucet Repair', category: 'Plumbing', pay: '₱500', postedBy: 'Walter Black', location: 'Zone 1', time: '5 mins ago', status: 'Open' },
    { id: '2', title: 'Tutor in Algebra', category: 'Tutoring', pay: '₱350/hr', postedBy: 'Walter Black', location: 'Zone 3', time: '1 hr ago', status: 'Open' },
  ]);

  // NOTIFICATIONS DATABASE
  const [notifications, setNotifications] = useState([
    { id: '1', title: 'Welcome!', message: 'Welcome to QuicKita!', targetRole: 'Both', time: 'Just now' }
  ]);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 2000); 
  }, []);

  const login = (role) => {
    setUserRole(role);
    setIsLoggedIn(true);
    setIsVerified(true); 
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserRole(null);
  };

  // --- ACTIONS ---

  const addJob = (newJob) => {
    setJobs(prev => [newJob, ...prev]);
    
    // Notify ALL Workers
    const newNotif = {
      id: Date.now().toString(),
      title: 'New Gig Alert 🚀',
      message: `A new job "${newJob.title}" was just posted in ${newJob.category}.`,
      targetRole: 'Worker',
      time: 'Just Now'
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const applyToJob = (jobId, jobTitle) => {
    // 1. Create Application Record
    const newApp = {
      id: Date.now().toString(),
      jobId: jobId,
      applicantName: 'Bensoy Gon',
      status: 'Pending'
    };
    setApplications(prev => [...prev, newApp]);

    // 2. Notify Worker
    const workerNotif = {
      id: 'w-' + Date.now(),
      title: 'Application Sent 📤',
      message: `You applied for "${jobTitle}". Waiting for employer response.`,
      targetRole: 'Worker',
      time: 'Just Now'
    };

    // 3. Notify Employer
    const employerNotif = {
      id: 'e-' + Date.now(),
      title: 'New Applicant 👤',
      message: `Bensoy Gon applied for your gig "${jobTitle}". Check details to review.`,
      targetRole: 'Employer',
      time: 'Just Now'
    };

    setNotifications(prev => [workerNotif, employerNotif, ...prev]);
  };

  const acceptApplicant = (appId, jobTitle) => {
    setApplications(prev => prev.map(app => 
      app.id === appId ? { ...app, status: 'Accepted' } : app
    ));

    const hiredNotif = {
      id: 'h-' + Date.now(),
      title: 'You got the Job! 🎉',
      message: `You have been hired for "${jobTitle}". Please contact the employer.`,
      targetRole: 'Worker',
      time: 'Just Now'
    };
    setNotifications(prev => [hiredNotif, ...prev]);
  };

  const contextValue = {
    isLoggedIn, isLoading, userRole, isVerified,
    jobs, applications, notifications,
    login, logout, addJob, applyToJob, acceptApplicant
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);