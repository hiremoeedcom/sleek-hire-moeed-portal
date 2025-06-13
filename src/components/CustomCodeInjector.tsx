
import React from 'react';
import { useSiteSettings } from '@/hooks/useSiteSettings';

const CustomCodeInjector: React.FC = () => {
  const { settings, loading } = useSiteSettings();

  if (loading) {
    return null;
  }

  return (
    <>
      {/* Custom Body Code */}
      {settings.body_code && (
        <div dangerouslySetInnerHTML={{ __html: settings.body_code }} />
      )}
      
      {/* Custom Footer Code */}
      {settings.footer_code && (
        <div dangerouslySetInnerHTML={{ __html: settings.footer_code }} />
      )}
    </>
  );
};

export default CustomCodeInjector;
