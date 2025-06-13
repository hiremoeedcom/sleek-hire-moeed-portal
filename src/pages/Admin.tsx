
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import LoginForm from '@/components/auth/LoginForm';
import PasswordResetForm from '@/components/auth/PasswordResetForm';
import AdminDashboard from '@/components/admin/AdminDashboard';
import { useToast } from '@/hooks/use-toast';
import { logger } from '@/utils/logger';

const Admin = () => {
  const { user, loading, isAdmin } = useAuth();
  const { toast } = useToast();
  const location = useLocation();

  // Check if this is a password reset route
  const isPasswordReset = location.pathname === '/admin/reset-password';

  useEffect(() => {
    // Show success message when user successfully logs in and becomes admin
    if (user && isAdmin && !loading) {
      logger.info('Admin user authenticated, showing dashboard');
    }
  }, [user, isAdmin, loading]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  // Show password reset form if it's a reset route
  if (isPasswordReset) {
    return <PasswordResetForm />;
  }

  if (!user || !isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <LoginForm />
      </div>
    );
  }

  return <AdminDashboard />;
};

export default Admin;
