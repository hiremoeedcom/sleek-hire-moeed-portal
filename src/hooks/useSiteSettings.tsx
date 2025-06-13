
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface SiteSettings {
  google_analytics_id?: string;
  header_code?: string;
  body_code?: string;
  footer_code?: string;
  site_title?: string;
  site_description?: string;
  site_keywords?: string;
}

export const useSiteSettings = () => {
  const [settings, setSettings] = useState<SiteSettings>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const { data, error } = await supabase
          .from('site_settings')
          .select('*')
          .eq('id', 1)
          .maybeSingle();

        if (error) {
          console.error('Error fetching site settings:', error);
          return;
        }

        if (data) {
          setSettings(data);
        }
      } catch (error) {
        console.error('Exception fetching site settings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  return { settings, loading };
};
