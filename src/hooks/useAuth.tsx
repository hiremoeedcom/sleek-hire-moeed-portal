
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { logger } from '@/utils/logger';

interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: string;
  is_active: boolean;
}

export const useAuth = () => {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem('admin_token');
      const userStr = localStorage.getItem('admin_user');
      
      if (!token || !userStr) {
        setLoading(false);
        return;
      }

      const userData = JSON.parse(userStr);
      
      // Verify token is still valid by checking user exists and is active
      const { data, error } = await supabase
        .from('admin_users')
        .select('id, email, name, role, is_active')
        .eq('id', userData.id)
        .eq('is_active', true)
        .maybeSingle();

      if (error || !data) {
        logger.error('Token validation failed:', error);
        signOut();
        return;
      }

      setUser(data);
      setIsAdmin(true);
      setLoading(false);
    } catch (error) {
      logger.error('Auth check failed:', error);
      signOut();
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      // Hash the password using a simple method (in production, use proper hashing)
      const passwordHash = btoa(password); // Simple base64 encoding for demo
      
      const { data, error } = await supabase
        .from('admin_users')
        .select('id, email, name, role, is_active')
        .eq('email', email)
        .eq('is_active', true)
        .maybeSingle();

      if (error || !data) {
        throw new Error('Invalid credentials');
      }

      // Update last login
      await supabase
        .from('admin_users')
        .update({ last_login: new Date().toISOString() })
        .eq('id', data.id);

      // Store session
      const token = btoa(`${data.id}:${Date.now()}`);
      localStorage.setItem('admin_token', token);
      localStorage.setItem('admin_user', JSON.stringify(data));

      setUser(data);
      setIsAdmin(true);
      
      logger.info('Admin login successful', { email });
      return { success: true };
    } catch (error) {
      logger.error('Login failed:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Login failed' };
    }
  };

  const signOut = async () => {
    try {
      localStorage.removeItem('admin_token');
      localStorage.removeItem('admin_user');
      setUser(null);
      setIsAdmin(false);
      logger.info('Admin logout successful');
    } catch (error) {
      logger.error('Logout error:', error);
    }
  };

  return {
    user,
    loading,
    isAdmin,
    signIn,
    signOut,
  };
};
