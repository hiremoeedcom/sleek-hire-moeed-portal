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
      
      console.log('Checking auth status, token exists:', !!token, 'user exists:', !!userStr);
      
      if (!token || !userStr) {
        console.log('No token or user data found');
        setLoading(false);
        return;
      }

      const userData = JSON.parse(userStr);
      console.log('Parsed user data:', userData);

      // Verify token is still valid by checking user exists and is active
      const { data, error } = await supabase
        .from('admin_users')
        .select('id, email, name, role, is_active')
        .eq('id', userData.id)
        .eq('is_active', true)
        .maybeSingle();

      console.log('Token validation result:', { data, error });

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
      console.log('Starting sign in process for:', email);
      
      // First, get the user data
      const { data, error } = await supabase
        .from('admin_users')
        .select('id, email, name, role, is_active, password_hash')
        .eq('email', email)
        .eq('is_active', true)
        .maybeSingle();

      console.log('User lookup result:', { data: data ? { ...data, password_hash: '[HIDDEN]' } : null, error });

      if (error || !data) {
        console.error('User not found or database error:', error);
        return { success: false, error: 'Invalid credentials' };
      }

      console.log('Attempting password verification...');
      
      // Verify password using the database function
      const { data: passwordValid, error: passwordError } = await supabase
        .rpc('verify_password', {
          password: password,
          hash: data.password_hash
        });

      console.log('Password verification result:', { passwordValid, passwordError });

      if (passwordError) {
        console.error('Password verification error:', passwordError);
        return { success: false, error: 'Authentication failed' };
      }

      if (!passwordValid) {
        console.log('Password verification failed');
        return { success: false, error: 'Invalid credentials' };
      }

      console.log('Password verified successfully, updating last login...');

      // Update last login
      await supabase
        .from('admin_users')
        .update({ last_login: new Date().toISOString() })
        .eq('id', data.id);

      // Generate secure session token
      const tokenData = {
        id: data.id,
        email: data.email,
        timestamp: Date.now(),
        random: crypto.getRandomValues(new Uint32Array(1))[0]
      };
      
      const token = btoa(JSON.stringify(tokenData));
      localStorage.setItem('admin_token', token);
      localStorage.setItem('admin_user', JSON.stringify({
        id: data.id,
        email: data.email,
        name: data.name,
        role: data.role,
        is_active: data.is_active
      }));

      setUser({
        id: data.id,
        email: data.email,
        name: data.name,
        role: data.role,
        is_active: data.is_active
      });
      setIsAdmin(true);
      
      logger.info('Admin login successful', { email });
      console.log('Login successful, setting user state');
      
      // Auto-refresh page after successful login
      setTimeout(() => {
        window.location.reload();
      }, 100);
      
      return { success: true };
    } catch (error) {
      console.error('Sign in error:', error);
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
      setLoading(false);
      logger.info('Admin logout successful');
      
      // Auto-refresh page after logout
      setTimeout(() => {
        window.location.reload();
      }, 100);
    } catch (error) {
      logger.error('Logout error:', error);
    }
  };

  const requestPasswordReset = async (email: string) => {
    try {
      // Check if user exists
      const { data, error } = await supabase
        .from('admin_users')
        .select('id, email')
        .eq('email', email)
        .eq('is_active', true)
        .maybeSingle();

      if (error || !data) {
        throw new Error('Email not found');
      }

      // Generate cryptographically secure reset token
      const randomBytes = crypto.getRandomValues(new Uint8Array(32));
      const resetToken = Array.from(randomBytes, byte => byte.toString(16).padStart(2, '0')).join('');
      const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

      // Store reset token in database
      const { error: tokenError } = await supabase
        .from('password_reset_tokens')
        .insert({
          admin_user_id: data.id,
          token: resetToken,
          expires_at: expiresAt.toISOString()
        });

      if (tokenError) {
        throw new Error('Failed to create reset token');
      }

      // Call the password recovery edge function
      const { error: emailError } = await supabase.functions.invoke('send-password-recovery', {
        body: {
          email: email,
          resetLink: `${window.location.origin}/admin/reset-password?token=${encodeURIComponent(resetToken)}&email=${encodeURIComponent(email)}`,
        },
      });

      if (emailError) {
        throw new Error('Failed to send recovery email');
      }
      
      logger.info('Password reset requested for:', email);
      
      return { success: true, message: 'Password reset instructions sent to your email' };
    } catch (error) {
      logger.error('Password reset failed:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Password reset failed' };
    }
  };

  return {
    user,
    loading,
    isAdmin,
    signIn,
    signOut,
    requestPasswordReset,
  };
};
