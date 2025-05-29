
import React, { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import LoginForm from '@/components/auth/LoginForm';
import AdminDashboard from '@/components/admin/AdminDashboard';
import { useToast } from '@/hooks/use-toast';
import { logger } from '@/utils/logger';

const Admin = () => {
  const { user, loading, isAdmin } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    // Show success message when user successfully logs in and becomes admin
    if (user && isAdmin && !loading) {
      logger.info('Admin user authenticated, showing dashboard');
      toast({
        title: "Success",
        description: "Welcome to the admin dashboard!",
      });
    }
  }, [user, isAdmin, loading, toast]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
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
