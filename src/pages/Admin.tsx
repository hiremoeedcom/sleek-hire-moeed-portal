
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import LoginForm from '@/components/auth/LoginForm';
import AdminDashboard from '@/components/admin/AdminDashboard';
import { useToast } from '@/hooks/use-toast';
import { logger } from '@/utils/logger';

const Admin = () => {
  const { user, loading, isAdmin } = useAuth();
  const { toast } = useToast();
  const [hasTimedOut, setHasTimedOut] = useState(false);

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

  // Add timeout fallback to prevent infinite loading
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (loading) {
        logger.warn('Auth loading timed out after 10 seconds');
        setHasTimedOut(true);
      }
    }, 10000); // 10 second timeout

    return () => clearTimeout(timeout);
  }, [loading]);

  // Reset timeout when loading changes
  useEffect(() => {
    if (!loading) {
      setHasTimedOut(false);
    }
  }, [loading]);

  if (loading && !hasTimedOut) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (hasTimedOut) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-4">Loading timed out</h2>
          <p className="text-gray-600 mb-4">Please try refreshing the page or logging in again.</p>
          <LoginForm />
        </div>
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
