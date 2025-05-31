
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Settings, Code, BarChart } from 'lucide-react';

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
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const saveSettings = async () => {
    setLoading(true);
    try {
      // TODO: Save to database once site_settings table is created
      console.log('Settings to save:', settings);
      
      toast({
        title: "Settings Saved",
        description: "Your site settings have been updated successfully.",
      });

      // Update Google Analytics if provided
      if (settings.google_analytics_id) {
        updateGoogleAnalytics(settings.google_analytics_id);
      }

    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save settings",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateGoogleAnalytics = (analyticsId: string) => {
    // Remove existing Google Analytics scripts
    const existingScripts = document.querySelectorAll('script[src*="googletagmanager"]');
    existingScripts.forEach(script => script.remove());

    // Add new Google Analytics
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${analyticsId}`;
    document.head.appendChild(script1);

    const script2 = document.createElement('script');
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${analyticsId}');
    `;
    document.head.appendChild(script2);
  };

  const updateSetting = (key: keyof SiteSettings, value: string) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Site Settings</h2>
        <Button onClick={saveSettings} disabled={loading}>
          {loading ? "Saving..." : "Save Settings"}
        </Button>
      </div>

      <Tabs defaultValue="seo" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="seo">SEO Settings</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="code">Custom Code</TabsTrigger>
        </TabsList>

        <TabsContent value="seo">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                SEO Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="site-title">Site Title</Label>
                <Input
                  id="site-title"
                  value={settings.site_title || ''}
                  onChange={(e) => updateSetting('site_title', e.target.value)}
                  placeholder="Your Site Title"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="site-description">Meta Description</Label>
                <Textarea
                  id="site-description"
                  value={settings.site_description || ''}
                  onChange={(e) => updateSetting('site_description', e.target.value)}
                  placeholder="Brief description of your website"
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="site-keywords">Meta Keywords</Label>
                <Input
                  id="site-keywords"
                  value={settings.site_keywords || ''}
                  onChange={(e) => updateSetting('site_keywords', e.target.value)}
                  placeholder="keyword1, keyword2, keyword3"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart className="h-5 w-5" />
                Google Analytics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="analytics-id">Google Analytics Measurement ID</Label>
                <Input
                  id="analytics-id"
                  value={settings.google_analytics_id || ''}
                  onChange={(e) => updateSetting('google_analytics_id', e.target.value)}
                  placeholder="G-XXXXXXXXXX"
                />
                <p className="text-sm text-muted-foreground">
                  Enter your Google Analytics 4 Measurement ID (starts with G-)
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="code">
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5" />
                  Custom Code Injection
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="header-code">Header Code (Before &lt;/head&gt;)</Label>
                  <Textarea
                    id="header-code"
                    value={settings.header_code || ''}
                    onChange={(e) => updateSetting('header_code', e.target.value)}
                    placeholder="<!-- Custom scripts, meta tags, CSS -->"
                    rows={4}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="body-code">Body Code (After &lt;body&gt;)</Label>
                  <Textarea
                    id="body-code"
                    value={settings.body_code || ''}
                    onChange={(e) => updateSetting('body_code', e.target.value)}
                    placeholder="<!-- Custom scripts, tracking codes -->"
                    rows={4}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="footer-code">Footer Code (Before &lt;/body&gt;)</Label>
                  <Textarea
                    id="footer-code"
                    value={settings.footer_code || ''}
                    onChange={(e) => updateSetting('footer_code', e.target.value)}
                    placeholder="<!-- Custom scripts, analytics -->"
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsManager;
