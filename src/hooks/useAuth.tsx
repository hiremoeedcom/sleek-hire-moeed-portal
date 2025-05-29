
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { User } from '@supabase/supabase-js';
import { logger } from '@/utils/logger';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    let mounted = true;

    // Get initial session
    const getInitialSession = async () => {
      try {
        logger.debug('Getting initial session...');
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          logger.error('Error getting session', error);
          if (mounted) {
            setUser(null);
            setIsAdmin(false);
            setLoading(false);
          }
          return;
        }
        
        logger.debug('Initial session retrieved', { hasSession: !!session, userId: session?.user?.id });
        
        if (mounted) {
          setUser(session?.user ?? null);
          
          if (session?.user) {
            await checkAdminStatus(session.user.id);
          } else {
            logger.debug('No user session, setting loading to false');
            setIsAdmin(false);
            setLoading(false);
          }
        }
      } catch (error) {
        logger.error('Exception in getInitialSession', error);
        if (mounted) {
          setUser(null);
          setIsAdmin(false);
          setLoading(false);
        }
      }
    };

    getInitialSession();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      logger.debug('Auth state changed', { event, hasSession: !!session, userId: session?.user?.id });
      
      if (mounted) {
        setUser(session?.user ?? null);
        
        if (session?.user) {
          await checkAdminStatus(session.user.id);
        } else {
          logger.debug('No user in auth state change, setting loading to false');
          setIsAdmin(false);
          setLoading(false);
        }
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const checkAdminStatus = async (userId: string) => {
    try {
      logger.debug('Checking admin status for user:', userId);
      
      const { data, error } = await supabase
        .from('admin_users')
        .select('id, email, role')
        .eq('id', userId)
        .maybeSingle();

      if (error) {
        logger.error('Error checking admin status:', error);
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      const isAdminUser = !!data;
      logger.debug('Admin status check complete', { isAdminUser, data, userId });
      setIsAdmin(isAdminUser);
      setLoading(false);
    } catch (error) {
      logger.error('Exception in checkAdminStatus', error);
      setIsAdmin(false);
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      logger.debug('Signing out user...');
      const { error } = await supabase.auth.signOut();
      if (error) {
        logger.error('Error signing out', error);
      } else {
        logger.info('User signed out successfully');
      }
    } catch (error) {
      logger.error('Exception during sign out', error);
    }
  };

  return {
    user,
    loading,
    isAdmin,
    signOut,
  };
};
