import React, { useState, useEffect } from 'react';
import { authService } from '../../services/authService';
import { AdminLoginPage } from '../../pages/AdminLoginPage';
import { AdminDashboardPage } from '../../pages/AdminDashboardPage';

type AdminView = 'login' | 'dashboard';

interface AdminAppProps {
  onGoBack: () => void;
}

export const AdminApp: React.FC<AdminAppProps> = ({ onGoBack }) => {
  const [view, setView] = useState<AdminView>(() =>
    authService.isAuthenticated() ? 'dashboard' : 'login'
  );

  useEffect(() => {
    if (authService.isAuthenticated()) {
      setView('dashboard');
    }
  }, []);

  const handleLoginSuccess = () => {
    setView('dashboard');
  };

  const handleLogout = () => {
    setView('login');
  };

  if (view === 'dashboard') {
    return <AdminDashboardPage onLogout={handleLogout} />;
  }

  return (
    <AdminLoginPage
      onLoginSuccess={handleLoginSuccess}
      onGoBack={onGoBack}
    />
  );
};
