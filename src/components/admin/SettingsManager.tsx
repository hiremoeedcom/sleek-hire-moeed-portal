
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Settings, Save, BarChart3, Code } from 'lucide-react';

interface SiteSettings {
  google_analytics_id?: string;
  header_code?: string;
  body_code?: string;
  footer_code?: string;
  site_title?: string;
  site_description?: string;
  site_keywords?: string;
}

const SettingsManager = () => {
  const [settings, setSettings] = useState<SiteSettings>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .eq('id', 1)
        .maybeSingle();

      if (error) {
        console.error('Error fetching settings:', error);
        toast({
          title: "Error",
          description: "Failed to load settings",
          variant: "destructive",
        });
        return;
      }

      if (data) {
        setSettings(data);
      }
    } catch (error) {
      console.error('Exception fetching settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveSettings = async () => {
    setSaving(true);
    try {
      const { error } = await supabase
        .from('site_settings')
        .upsert({
          id: 1,
          ...settings,
          updated_at: new Date().toISOString()
        });

      if (error) {
        console.error('Error saving settings:', error);
        toast({
          title: "Error",
          description: "Failed to save settings",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Success",
        description: "Settings saved successfully",
      });
    } catch (error) {
      console.error('Exception saving settings:', error);
    } finally {
      setSaving(false);
    }
  };

  const updateSetting = (key: keyof SiteSettings, value: string) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center h-64">
          <div className="text-lg">Loading settings...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Settings className="h-6 w-6" />
            Site Settings
          </h2>
          <p className="text-gray-600">Configure your website settings and tracking</p>
        </div>
        <Button onClick={saveSettings} disabled={saving}>
          <Save className="mr-2 h-4 w-4" />
          {saving ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>

      {/* SEO Settings */}
      <Card>
        <CardHeader>
          <CardTitle>SEO & Meta Information</CardTitle>
          <CardDescription>
            Configure your website's meta information for better search engine visibility
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="site_title">Site Title</Label>
            <Input
              id="site_title"
              value={settings.site_title || ''}
              onChange={(e) => updateSetting('site_title', e.target.value)}
              placeholder="Your website title"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="site_description">Site Description</Label>
            <Textarea
              id="site_description"
              value={settings.site_description || ''}
              onChange={(e) => updateSetting('site_description', e.target.value)}
              placeholder="Brief description of your website"
              rows={3}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="site_keywords">Keywords</Label>
            <Input
              id="site_keywords"
              value={settings.site_keywords || ''}
              onChange={(e) => updateSetting('site_keywords', e.target.value)}
              placeholder="keyword1, keyword2, keyword3"
            />
          </div>
        </CardContent>
      </Card>

      {/* Analytics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Analytics
          </CardTitle>
          <CardDescription>
            Configure tracking and analytics for your website
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="google_analytics_id">Google Analytics ID</Label>
            <Input
              id="google_analytics_id"
              value={settings.google_analytics_id || ''}
              onChange={(e) => updateSetting('google_analytics_id', e.target.value)}
              placeholder="G-XXXXXXXXXX"
            />
            <p className="text-sm text-gray-500">
              Enter your Google Analytics 4 measurement ID
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Custom Code */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="h-5 w-5" />
            Custom Code
          </CardTitle>
          <CardDescription>
            Add custom HTML, CSS, or JavaScript to your website
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="header_code">Header Code</Label>
            <Textarea
              id="header_code"
              value={settings.header_code || ''}
              onChange={(e) => updateSetting('header_code', e.target.value)}
              placeholder="Code to be inserted in the <head> section"
              rows={4}
              className="font-mono text-sm"
            />
            <p className="text-sm text-gray-500">
              This code will be inserted in the head section of your website
            </p>
          </div>

          <Separator />

          <div className="space-y-2">
            <Label htmlFor="body_code">Body Code</Label>
            <Textarea
              id="body_code"
              value={settings.body_code || ''}
              onChange={(e) => updateSetting('body_code', e.target.value)}
              placeholder="Code to be inserted after <body> tag"
              rows={4}
              className="font-mono text-sm"
            />
            <p className="text-sm text-gray-500">
              This code will be inserted at the beginning of the body section
            </p>
          </div>

          <Separator />

          <div className="space-y-2">
            <Label htmlFor="footer_code">Footer Code</Label>
            <Textarea
              id="footer_code"
              value={settings.footer_code || ''}
              onChange={(e) => updateSetting('footer_code', e.target.value)}
              placeholder="Code to be inserted before </body> tag"
              rows={4}
              className="font-mono text-sm"
            />
            <p className="text-sm text-gray-500">
              This code will be inserted at the end of the body section
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsManager;
